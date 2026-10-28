// Mobile nav
const toggle=document.querySelector('.nav-toggle');
const links=document.getElementById('nav-links');
toggle.addEventListener('click',()=>{
  const open=links.classList.toggle('open');
  toggle.setAttribute('aria-expanded',open);
  toggle.setAttribute('aria-label',open?'Close menu':'Open menu');
});
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  links.classList.remove('open');toggle.setAttribute('aria-expanded','false');
}));

// Footer year
document.getElementById('year').textContent=new Date().getFullYear();

// Scroll reveal (content is visible by default if JS/observer is unavailable)
const targets=document.querySelectorAll('.section h2, .prose, .journey, .stat, .win, .tl-item, .lab-card, .otc, .photo, .contact-card');
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if('IntersectionObserver' in window && !reduce){
  targets.forEach(t=>t.classList.add('reveal'));
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{threshold:.12});
  targets.forEach(t=>io.observe(t));

  // Count-up for numeric stats
  const counters=document.querySelectorAll('.stat-num[data-count]');
  const co=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      const el=e.target, end=+el.dataset.count, pre=el.dataset.prefix||'', suf=el.dataset.suffix||'';
      const t0=performance.now(), dur=1200;
      const step=now=>{
        const p=Math.min((now-t0)/dur,1), v=Math.round(end*(1-Math.pow(1-p,3)));
        el.textContent=pre+v+suf;
        if(p<1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step); co.unobserve(el);
    });
  },{threshold:.6});
  counters.forEach(c=>co.observe(c));
}
