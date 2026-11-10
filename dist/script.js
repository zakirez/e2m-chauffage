const menu=document.querySelector('.menu');menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));document.querySelector('nav').classList.toggle('open',open);});
const logoCarousel=document.querySelector('.logo-carousel');
if(logoCarousel){const track=logoCarousel.querySelector('.logo-track'),reduce=matchMedia('(prefers-reduced-motion: reduce)');let paused=reduce.matches,hover=false,focused=false;

const move=direction=>{const step=track.querySelector('.logo-slide').getBoundingClientRect().width+parseFloat(getComputedStyle(track).gap);const max=track.scrollWidth-track.clientWidth;let left=track.scrollLeft+direction*step;if(left>max+3)left=0;if(left<0)left=max;track.scrollTo({left,behavior:reduce.matches?'instant':'smooth'});};
logoCarousel.querySelector('.logo-prev').addEventListener('click',()=>move(-1));logoCarousel.querySelector('.logo-next').addEventListener('click',()=>move(1));logoCarousel.addEventListener('mouseenter',()=>hover=true);logoCarousel.addEventListener('mouseleave',()=>hover=false);logoCarousel.addEventListener('focusin',()=>focused=true);logoCarousel.addEventListener('focusout',e=>{focused=logoCarousel.contains(e.relatedTarget);});reduce.addEventListener('change',()=>{paused=reduce.matches;});setInterval(()=>{if(!paused&&!hover&&!focused&&!document.hidden)move(1);},2800);}
const methodSteps=[...document.querySelectorAll('.method .steps>div')];
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){const stepsObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;const index=methodSteps.indexOf(entry.target);entry.target.classList.add('is-visible');entry.target.animate([{opacity:0,transform:'translateY(22px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,delay:index*100,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});stepsObserver.unobserve(entry.target);}},{threshold:.16});methodSteps.forEach(step=>stepsObserver.observe(step));}
document.querySelector('#contact-form')?.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);const body=`Nom : ${f.get('nom')}\nE-mail : ${f.get('email')}\nTéléphone : ${f.get('tel')}\nCommune : ${f.get('commune')}\n\n${f.get('message')}`;location.href=`mailto:contact@e2m-chauffage.com?subject=${encodeURIComponent('Demande — '+f.get('activite'))}&body=${encodeURIComponent(body)}`;document.querySelector('#form-status').textContent='Message préparé. Confirmez son envoi dans votre messagerie. Si elle ne s’ouvre pas, contactez-nous directement par e-mail ou téléphone.';});

if(!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.animate([{opacity:0.45,transform:'translateY(16px)'},{opacity:1,transform:'none'}],{duration:450,easing:'ease-out'});observer.unobserve(entry.target);}}},{threshold:0.12});document.querySelectorAll('section .intro-copy,section .intro-image,.card,.method .wrap').forEach(el=>observer.observe(el));}

// Apparitions des pages de prestations et de contact, sans masquer le contenu au repos.
if(document.querySelector('.subhero')){
  const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
  const entranceTargets=[...document.querySelectorAll('.subhero .wrap>div:first-child>*,.subhero .header-visual,.subhero .wrap>div:nth-child(2):not(.header-visual),.body-grid article>*,.service-sidebar>*,.contact-grid article>*,.contact-grid form,.cta .wrap>*,.logo-carousel-layout')];
  const entranceAnimations=new Set();
  const entrances=new IntersectionObserver(entries=>{
    for(const entry of entries){
      if(!entry.isIntersecting)continue;
      entrances.unobserve(entry.target);
      if(motionPreference.matches)continue;
      const siblings=[...entry.target.parentElement.children];
      const delay=Math.min(siblings.indexOf(entry.target)%3,2)*75;
      const animation=entry.target.animate([
        {opacity:0,transform:'translateY(22px)'},
        {opacity:1,transform:'translateY(0)'}
      ],{duration:650,delay,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});
      entranceAnimations.add(animation);
      animation.onfinish=()=>entranceAnimations.delete(animation);
    }
  },{threshold:0.08});
  if(!motionPreference.matches)entranceTargets.forEach(element=>entrances.observe(element));
  motionPreference.addEventListener('change',()=>{
    if(motionPreference.matches){entrances.disconnect();entranceAnimations.forEach(animation=>animation.cancel());entranceAnimations.clear();}
  });
}
