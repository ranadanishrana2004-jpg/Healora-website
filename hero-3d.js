/* HealOra hero — live 3D ambient scene (Three.js).
   Floating brand-color geometry + particles, mouse-reactive.
   Fails silently: if the CDN or WebGL is unavailable the page is unaffected. */
(function () {
  'use strict';

  function init(THREE) {
    var hero = document.querySelector('.hero');
    if (!hero) return;

    var canvas = document.createElement('canvas');
    canvas.id = 'hero-3d';
    canvas.setAttribute('aria-hidden', 'true');
    var aurora = hero.querySelector('.aurora');
    if (aurora && aurora.nextSibling) hero.insertBefore(canvas, aurora.nextSibling);
    else hero.insertBefore(canvas, hero.firstChild);

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    } catch (e) { canvas.remove(); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 11);

    var LIME = 0xcdf496, CYAN = 0x7ee0d2, VIOLET = 0xb9a7f2;

    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    var key = new THREE.DirectionalLight(0xffffff, 1.1); key.position.set(4, 6, 8); scene.add(key);
    var pLime = new THREE.PointLight(LIME, 22, 30); pLime.position.set(-6, 3, 4); scene.add(pLime);
    var pCyan = new THREE.PointLight(CYAN, 18, 30); pCyan.position.set(6, -2, 3); scene.add(pCyan);

    function mesh(geo, color, wire, opacity) {
      var mat = new THREE.MeshStandardMaterial({
        color: color, wireframe: !!wire, transparent: true,
        opacity: opacity, roughness: 0.35, metalness: 0.55,
        emissive: color, emissiveIntensity: wire ? 0.35 : 0.12
      });
      return new THREE.Mesh(geo, mat);
    }

    var shapes = [];
    // Large lime wireframe torus knot, back-left
    var knot = mesh(new THREE.TorusKnotGeometry(2.1, 0.55, 120, 18), LIME, true, 0.32);
    knot.position.set(-5.2, 0.6, -3); shapes.push({ o: knot, rs: 0.0016, fs: 0.5, fa: 0.45, y0: 0.6 });
    scene.add(knot);
    // Cyan icosahedron, right
    var ico = mesh(new THREE.IcosahedronGeometry(1.25, 0), CYAN, false, 0.85);
    ico.position.set(5.4, -1.4, -1.5); shapes.push({ o: ico, rs: 0.0028, fs: 0.7, fa: 0.55, y0: -1.4 });
    scene.add(ico);
    // Violet wireframe octahedron, top-center
    var octa = mesh(new THREE.OctahedronGeometry(0.9, 0), VIOLET, true, 0.5);
    octa.position.set(0.4, 3.1, -2.5); shapes.push({ o: octa, rs: 0.0035, fs: 0.9, fa: 0.4, y0: 3.1 });
    scene.add(octa);
    // Small lime solid gem, lower-left
    var gem = mesh(new THREE.OctahedronGeometry(0.5, 0), LIME, false, 0.9);
    gem.position.set(-2.6, -2.8, -1); shapes.push({ o: gem, rs: 0.004, fs: 1.1, fa: 0.35, y0: -2.8 });
    scene.add(gem);

    // Particle starfield
    var N = 260, pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
    var palette = [new THREE.Color(LIME), new THREE.Color(CYAN), new THREE.Color(VIOLET), new THREE.Color(0xffffff)];
    for (var i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
      var c = palette[(Math.random() * palette.length) | 0];
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    var pgeo = new THREE.BufferGeometry();
    pgeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    pgeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    var points = new THREE.Points(pgeo, new THREE.PointsMaterial({
      size: 0.055, vertexColors: true, transparent: true, opacity: 0.75,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true
    }));
    scene.add(points);

    var mouseX = 0, mouseY = 0, tMouseX = 0, tMouseY = 0;
    window.addEventListener('pointermove', function (e) {
      tMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      tMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    function resize() {
      var w = hero.clientWidth, h = hero.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize);

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var visible = true, t = Math.random() * 100;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; }, { threshold: 0 }).observe(hero);
    }

    function frame() {
      requestAnimationFrame(frame);
      if (!visible || reduced) return;
      t += 0.008;
      mouseX += (tMouseX - mouseX) * 0.04;
      mouseY += (tMouseY - mouseY) * 0.04;
      for (var k = 0; k < shapes.length; k++) {
        var s = shapes[k];
        s.o.rotation.x += s.rs; s.o.rotation.y += s.rs * 1.4;
        s.o.position.y = s.y0 + Math.sin(t * s.fs + k * 1.7) * s.fa;
      }
      points.rotation.y = t * 0.02;
      camera.position.x = mouseX * 0.9;
      camera.position.y = -mouseY * 0.6;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }
    if (reduced) { renderer.render(scene, camera); } else { frame(); }
  }

  function boot() {
    if (!('WebGLRenderingContext' in window)) return;
    var s = document.createElement('script');
    s.type = 'importmap';
    s.textContent = JSON.stringify({ imports: { three: 'https://unpkg.com/three@0.160.0/build/three.module.js' } });
    document.head.appendChild(s);
    var m = document.createElement('script');
    m.type = 'module';
    m.textContent = 'import * as THREE from "three";(' + init.toString() + ')(THREE);';
    m.onerror = function () { var c = document.getElementById('hero-3d'); if (c) c.remove(); };
    document.head.appendChild(m);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else { boot(); }
})();
