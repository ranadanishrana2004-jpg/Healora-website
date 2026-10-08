/* HealOra hero — ambient particle field (Three.js).
   Soft round particles drifting slowly. No geometry, no mouse parallax.
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

    // Round soft sprite so particles render as circles, never squares
    function roundSprite() {
      var c = document.createElement('canvas');
      c.width = c.height = 64;
      var g = c.getContext('2d');
      var grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.35, 'rgba(255,255,255,.85)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = grad;
      g.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(c);
    }

    // Gentle particle field only — slow drift, no interaction
    var N = 220, pos = new Float32Array(N * 3), col = new Float32Array(N * 3), seed = new Float32Array(N);
    var palette = [new THREE.Color(LIME), new THREE.Color(CYAN), new THREE.Color(VIOLET), new THREE.Color(0xffffff)];
    for (var i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
      var c = palette[(Math.random() * palette.length) | 0];
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
      seed[i] = Math.random() * 100;
    }
    var pgeo = new THREE.BufferGeometry();
    pgeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    pgeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    var points = new THREE.Points(pgeo, new THREE.PointsMaterial({
      size: 0.14, map: roundSprite(), vertexColors: true, transparent: true, opacity: 0.55,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true
    }));
    scene.add(points);

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
      var p = pgeo.attributes.position.array;
      for (var k = 0; k < N; k++) {
        p[k * 3] += Math.cos(t * 0.4 + seed[k] * 1.3) * 0.0009;
        p[k * 3 + 1] += Math.sin(t * 0.6 + seed[k]) * 0.0012;
      }
      pgeo.attributes.position.needsUpdate = true;
      points.rotation.y = t * 0.015;
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
