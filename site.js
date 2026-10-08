/* HealOra v4 — theme, tilt, counters, glow */
(function(){
"use strict";
var root=document.documentElement;
/* ---------- theme ---------- */
try{
  var saved=null;
  try{saved=localStorage.getItem('healora-theme');}catch(e){}
  if(saved==='light'||saved==='dark'){root.setAttribute('data-theme',saved);}
  var btn=document.getElementById('theme-toggle');
  if(btn){btn.addEventListener('click',function(){
    var next=root.getAttribute('data-theme')==='light'?'dark':'light';
    root.setAttribute('data-theme',next);
    try{localStorage.setItem('healora-theme',next);}catch(e){}
  });}
}catch(e){}
/* ---------- mobile menu ---------- */
var toggle=document.querySelector('.menu-toggle');
var menu=document.getElementById('mobile-nav');
if(toggle&&menu){toggle.addEventListener('click',function(){var open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));toggle.setAttribute('aria-label',open?'Open navigation':'Close navigation');menu.hidden=open;toggle.innerHTML=open?'Menu <span>+</span>':'Close <span>\u2212</span>';});document.addEventListener('keydown',function(ev){if(ev.key==='Escape'&&!menu.hidden){toggle.click();toggle.focus();}});}
/* ---------- contact form -> email draft ---------- */
var form=document.getElementById('enquiry');
if(form){var q=new URLSearchParams(location.search).get('service');if(q&&Array.from(form.elements.service.options).some(function(o){return o.value===q;}))form.elements.service.value=q;form.addEventListener('submit',function(ev){ev.preventDefault();if(!form.reportValidity())return;var data=new FormData(form);var service=form.elements.service.selectedOptions[0].textContent;var subject='HealOra project enquiry'+(data.get('service')?' \u2014 '+service:'');var body='Name: '+data.get('name')+'\nEmail: '+data.get('email')+'\nOrganisation: '+data.get('company')+'\nService: '+(data.get('service')?service:'To discuss')+'\n\n'+data.get('message');location.href='mailto:healora98@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);document.getElementById('form-status').textContent='Your email draft is ready to open. If your email app does not open, email your brief directly to healora98@gmail.com. Nothing has been sent by this page.';});}
/* ---------- reveal on scroll ---------- */
var revealEls=document.querySelectorAll('.rv');
if(revealEls.length&&'IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});revealEls.forEach(function(el){io.observe(el);});}else{revealEls.forEach(function(el){el.classList.add('in');});}
/* ---------- animated counters ---------- */
var counters=document.querySelectorAll('[data-count]');
if(counters.length&&'IntersectionObserver' in window){
  var cio=new IntersectionObserver(function(es){es.forEach(function(e){
    if(!e.isIntersecting)return;cio.unobserve(e.target);
    var el=e.target,target=parseInt(el.getAttribute('data-count'),10)||0,t0=null,dur=1200;
    function tick(now){if(!t0)t0=now;var p=Math.min((now-t0)/dur,1);var eased=1-Math.pow(1-p,3);el.textContent=Math.round(eased*target);if(p<1)requestAnimationFrame(tick);}
    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){requestAnimationFrame(tick);}else{el.textContent=target;}
  });},{threshold:.5});
  counters.forEach(function(el){cio.observe(el);});
}
/* ---------- 3D tilt + cursor glow (fine pointers only) ---------- */
var fine=window.matchMedia('(pointer:fine)').matches&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var stage=document.getElementById('tilt-stage');
if(stage&&fine){
  var tilts=stage.querySelectorAll('.tilt');
  var hero=stage.closest('.hero');
  var glow=hero?hero.querySelector('.cursor-glow'):null;
  var raf=null,mx=0,my=0;
  function render(){
    raf=null;
    tilts.forEach(function(el){
      var d=parseFloat(el.getAttribute('data-depth'))||20;
      var rx=(-my*d/40).toFixed(2),ry=(mx*d/40).toFixed(2);
      var base=el.classList.contains('m1')?'rotate(-1.6deg)':'rotate(1.6deg)';
      el.style.transform=base+' rotateX('+rx+'deg) rotateY('+ry+'deg)';
    });
    if(glow&&hero){var r=hero.getBoundingClientRect();glow.style.left=(mx+0.5)*r.width+'px';glow.style.top=(my+0.5)*r.height+'px';}
  }
  stage.addEventListener('mousemove',function(ev){
    var r=stage.getBoundingClientRect();
    mx=(ev.clientX-r.left)/r.width-.5;my=(ev.clientY-r.top)/r.height-.5;
    if(!raf)raf=requestAnimationFrame(render);
  });
  stage.addEventListener('mouseleave',function(){mx=0;my=0;tilts.forEach(function(el){el.style.transform='';});});
}
})();
/* ---------- uniqueness pack: estimator, magnetic buttons, progress, entrance ---------- */
(function(){
"use strict";
var fine=window.matchMedia&&window.matchMedia('(pointer:fine)').matches;
var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* hero entrance */
requestAnimationFrame(function(){requestAnimationFrame(function(){document.body.classList.add('loaded');});});

/* scroll progress */
var bar=document.createElement('div');bar.id='progress';document.body.appendChild(bar);
function onScroll(){
  var h=document.documentElement,sc=h.scrollTop||document.body.scrollTop,max=h.scrollHeight-h.clientHeight;
  bar.style.width=(max>0?(sc/max*100):0)+'%';
}
document.addEventListener('scroll',onScroll,{passive:true});onScroll();

/* magnetic buttons */
if(fine&&!reduced){
  document.querySelectorAll('.btn.lime').forEach(function(btn){
    btn.addEventListener('mousemove',function(ev){
      var r=btn.getBoundingClientRect();
      var x=(ev.clientX-r.left-r.width/2)/r.width,y=(ev.clientY-r.top-r.height/2)/r.height;
      btn.style.transform='translate('+(x*10).toFixed(1)+'px,'+(y*8).toFixed(1)+'px)';
    });
    btn.addEventListener('mouseleave',function(){btn.style.transform='';});
  });
}

/* project estimator (form version) */
var est=document.getElementById('estimator');
if(est){
  var TYPE={website:1200,webapp:4000,ai:5000,other:2500};
  var TYPEL={website:'Website',webapp:'Web app',ai:'AI system',other:'Something else'};
  var SIZEL={small:'Small',standard:'Standard',large:'Large / complex'};
  var TIMEL={flex:'Flexible',soon:'In 1\u20132 months',urgent:'Urgent'};
  var SIZE={small:1,standard:1.8,large:3};
  var TIME={flex:1,soon:1.15,urgent:1.35};
  var form=document.getElementById('est-form'),done=document.getElementById('est-done');
  var out=document.getElementById('est-range');
  function val(n){var el=form.querySelector('[name="'+n+'"]');return el?el.value:'';}
  function fmt(v){v=Math.round(v/500)*500;return v>=1000?('\u00A3'+(v/1000).toFixed(v%1000?1:0).replace(/\.0$/,'')+'k'):'\u00A3'+v;}
  function range(){var mid=TYPE[val('type')]*SIZE[val('size')]*TIME[val('time')];return fmt(mid*0.85)+' \u2013 '+fmt(mid*1.25);}
  function update(){out.textContent=range();}
  form.querySelectorAll('select').forEach(function(s){s.addEventListener('change',update);});
  update();
  form.addEventListener('submit',function(ev){
    ev.preventDefault();
    var ok=true;
    var msg=form.querySelector('#est-msg'),nameEl=form.querySelector('[name="name"]'),emailEl=form.querySelector('[name="email"]');
    [msg,nameEl].forEach(function(el){el.classList.toggle('err',!el.value.trim());if(!el.value.trim())ok=false;});
    var em=emailEl.value.trim();
    var emOk=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
    emailEl.classList.toggle('err',!emOk);if(!emOk)ok=false;
    if(!ok){(form.querySelector('.err')||form).focus();return;}
    var r=range();
    document.getElementById('est-final').textContent=r;
    document.getElementById('est-thanks').textContent='Thanks '+nameEl.value.trim()+'! Here\u2019s your starting point \u2014 send us the details and we\u2019ll come back with a proper written scope.';
    var body='Name: '+nameEl.value.trim()+'\nEmail: '+em+'\nProject type: '+TYPEL[val('type')]+'\nSize: '+SIZEL[val('size')]+'\nTimeline: '+TIMEL[val('time')]+'\nRough indication shown: '+r+'\n\nProject details:\n'+msg.value.trim();
    document.getElementById('est-mailto').href='mailto:healora98@gmail.com?subject='+encodeURIComponent('Project estimate request \u2014 '+nameEl.value.trim())+'&body='+encodeURIComponent(body);
    form.hidden=true;done.hidden=false;
    done.scrollIntoView({behavior:reduced?'auto':'smooth',block:'center'});
  });
  document.getElementById('est-back').addEventListener('click',function(){
    done.hidden=true;form.hidden=false;update();
  });
}
})();
