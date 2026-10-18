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
/* ---------- enquiry delivery (FormSubmit) + direct-contact fallbacks ---------- */
var INBOX='healora98@gmail.com',WA='447445750757';
function waLink(text){return 'https://wa.me/'+WA+(text?'?text='+encodeURIComponent(text):'');}
function mailLink(subject,body){return 'mailto:'+INBOX+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);}
function sendEnquiry(payload){
  var ctrl='AbortController' in window?new AbortController():null;
  var timer=setTimeout(function(){if(ctrl)ctrl.abort();},15000);
  return fetch('https://formsubmit.co/ajax/'+INBOX,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload),signal:ctrl?ctrl.signal:undefined})
    .then(function(r){return r.json().catch(function(){return {};}).then(function(j){if(!r.ok||String(j.success)!=='true')throw new Error(j.message||('HTTP '+r.status));return j;});})
    .finally(function(){clearTimeout(timer);});
}
window.HealOra={sendEnquiry:sendEnquiry,waLink:waLink,mailLink:mailLink};
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
var form=document.getElementById('enquiry');
if(form){
  var q=new URLSearchParams(location.search),status=document.getElementById('form-status');
  if(q.get('service')&&Array.from(form.elements.service.options).some(function(o){return o.value===q.get('service');}))form.elements.service.value=q.get('service');
  if(q.get('sent')==='1'&&status){status.className='form-status ok';status.textContent='Thanks — your enquiry has been sent. We usually reply within one working day.';}
  form.addEventListener('submit',function(ev){
    ev.preventDefault();if(!form.reportValidity())return;
    var data=new FormData(form);if(data.get('_honey'))return;
    var btn=form.querySelector('button[type="submit"]'),label=btn.innerHTML;
    var service=data.get('service')?form.elements.service.selectedOptions[0].textContent:'To discuss';
    var subject='New HealOra website enquiry — '+service;
    var body='Name: '+data.get('name')+'\nEmail: '+data.get('email')+'\nOrganisation: '+(data.get('company')||'-')+'\nService: '+service+'\n\n'+data.get('message');
    btn.disabled=true;btn.innerHTML='Sending…';status.className='form-status';status.textContent='';
    sendEnquiry({name:data.get('name'),email:data.get('email'),organisation:data.get('company')||'-',service:service,message:data.get('message'),page:location.href,_subject:subject,_replyto:data.get('email'),_template:'table'})
      .then(function(){
        form.reset();status.className='form-status ok';
        status.innerHTML='<strong>Thanks '+esc(data.get('name'))+' — your enquiry has been sent.</strong> We usually reply within one working day. Need us sooner? <a href="'+esc(waLink('Hi HealOra, I just sent an enquiry via the website.'))+'" target="_blank" rel="noopener">Message us on WhatsApp</a>.';
      })
      .catch(function(){
        status.className='form-status err';
        status.innerHTML='<strong>Sorry — we couldn’t send that just now.</strong> Your message is still in the form. Please send it directly instead: <a href="'+esc(waLink(body))+'" target="_blank" rel="noopener">WhatsApp us</a> or <a href="'+esc(mailLink(subject,body))+'">email '+INBOX+'</a>.';
      })
      .finally(function(){btn.disabled=false;btn.innerHTML=label;});
  });
}
/* ---------- floating WhatsApp + email buttons ---------- */
if(!document.querySelector('.contact-dock')){
  var dock=document.createElement('div');dock.className='contact-dock';
  dock.innerHTML='<a class="dock-btn dock-wa" href="'+esc(waLink('Hi HealOra, I’d like to discuss a project.'))+'" target="_blank" rel="noopener" aria-label="Chat with HealOra on WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3z"/></svg><span>WhatsApp</span></a>'+
    '<a class="dock-btn dock-mail" href="'+esc(mailLink('HealOra project enquiry',''))+'" aria-label="Email HealOra at '+INBOX+'"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg><span>Email</span></a>';
  document.body.appendChild(dock);
}
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
    var subj='Project estimate request — '+nameEl.value.trim(),thanks=document.getElementById('est-thanks'),H=window.HealOra;
    document.getElementById('est-mailto').href=H?H.mailLink(subj,body):'mailto:healora98@gmail.com';
    document.getElementById('est-whatsapp').href=H?H.waLink(body):'https://wa.me/447445750757';
    thanks.textContent='Sending your details to HealOra…';
    if(H)H.sendEnquiry({name:nameEl.value.trim(),email:em,project_type:TYPEL[val('type')],size:SIZEL[val('size')],timeline:TIMEL[val('time')],rough_indication:r,message:msg.value.trim(),page:location.href,_subject:subj,_replyto:em,_template:'table'})
      .then(function(){thanks.textContent='Thanks '+nameEl.value.trim()+' — we’ve received your details and will reply by email with a proper written scope, usually within one working day. Want to talk sooner? Message us on WhatsApp.';})
      .catch(function(){thanks.textContent='Thanks '+nameEl.value.trim()+'! We couldn’t send your details automatically just now — please tap WhatsApp or Email below and your brief will be pre-filled.';});
    form.hidden=true;done.hidden=false;
    done.scrollIntoView({behavior:reduced?'auto':'smooth',block:'center'});
  });
  document.getElementById('est-back').addEventListener('click',function(){
    done.hidden=true;form.hidden=false;update();
  });
}
})();
