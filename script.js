// ── Scroll Restore ──
if('scrollRestoration' in history) history.scrollRestoration='manual';

// ── Countdown ──
const eventDate = new Date("February 19, 2026 10:00:00").getTime();
const cd = document.getElementById('countdown');
setInterval(()=>{
  const diff = eventDate - Date.now();
  if(diff<0){ cd.innerHTML='<strong style="color:var(--gold);font-family:var(--font-head);font-size:1.3rem;letter-spacing:3px;">THE BATTLE HAS BEGUN</strong>'; return; }
  const d=Math.floor(diff/864e5), h=Math.floor((diff/36e5)%24), m=Math.floor((diff/6e4)%60), s=Math.floor((diff/1e3)%60);
  document.getElementById('days').textContent   = String(d).padStart(2,'0');
  document.getElementById('hours').textContent  = String(h).padStart(2,'0');
  document.getElementById('minutes').textContent= String(m).padStart(2,'0');
  document.getElementById('seconds').textContent= String(s).padStart(2,'0');
},1000);

// ── Hamburger ──
document.getElementById('hamburger').addEventListener('click',()=>{
  document.getElementById('navLinks').classList.toggle('active');
});

// ── Scroll Reveal ──
const reveals = document.querySelectorAll('.reveal, .reveal-scale');
new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ e.target.classList.toggle('active', e.isIntersecting); });
},{ threshold:.12 }).observe && reveals.forEach(el=>{
  new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ e.target.classList.toggle('active', e.isIntersecting); });
  },{ threshold:.12 }).observe(el);
});

// ── Cinematic Intro removal ──
window.addEventListener('load',()=>{ setTimeout(()=>{ const i=document.getElementById('cinematic-intro'); if(i) i.remove(); },6600); });

// ── Modal data ──
const eventInfo={
  hackathon:{
    title:"The Grand Hackathon",
    rules:["Only original creations shall be accepted in the realm.","Teams of 2–4 warriors may enter.","The sorcery of AI tools is permitted for prototyping.","All work must be conceived within the battle grounds."],
    coordinators:"John Doe, Sarah Smith",
    contact:"+1 234 567 890"
  },
  Codeathon:{
    title:"Codeathon — The Lone Duel",
    rules:["Each knight fights alone — no alliances.","Only the prescribed tongues (languages) and tools are permitted.","All code must be written during the battle.","Those caught copying ancient scrolls shall be banished.","The lords' judgment is final and absolute."],
    coordinators:"Alex Rivera",
    contact:"+1 987 654 321"
  },
  ThinkersLeague:{
    title:"Thinkers League",
    rules:["Teams or lone wolves, as the elders decree.","Each riddle is bound by time — answer swiftly.","Consulting outside scrolls or ravens is forbidden.","The Quiz Master's word is law."],
    coordinators:"Emily Chen",
    contact:"design.dept@college.edu"
  }
};

function openModal(id){
  const d=eventInfo[id], body=document.getElementById('modalBody');
  body.innerHTML=`
    <h3>${d.title}</h3>
    <div class="modal-section"><h4>⚔ Laws & Decrees</h4>
      <ul>${d.rules.map(r=>`<li>${r}</li>`).join('')}</ul>
    </div>
    <div class="modal-section"><h4>🛡 Appointed Stewards</h4><p>${d.coordinators}</p></div>
    <div class="modal-section"><h4>📜 Raven Post</h4><p>${d.contact}</p></div>`;
  document.getElementById('detailsModal').classList.add('active');
  document.body.style.overflow='hidden';
}
function closeModal(){
  document.getElementById('detailsModal').classList.remove('active');
  document.body.style.overflow='auto';
}
window.onclick=e=>{ if(e.target===document.getElementById('detailsModal')) closeModal(); };

// ── Ember / Particle Canvas ──
(()=>{
  const canvas = document.getElementById('emberCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, embers=[];

  function resize(){ W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  class Ember {
    constructor(){ this.reset(true); }
    reset(initial){
      this.x = Math.random()*W;
      this.y = initial ? Math.random()*H : H + Math.random()*40;
      this.size = Math.random()*2.2 + 0.6;
      this.speedY = -(Math.random()*0.6 + 0.2);
      this.speedX = (Math.random()-0.5)*0.4;
      this.life = 1;
      this.decay = Math.random()*0.004 + 0.002;
      // color: gold → crimson
      this.hue = Math.random()<0.6 ? 40 : 10; // gold-ish or red-ish
    }
    update(){
      this.x += this.speedX;
      this.y += this.speedY;
      this.life -= this.decay;
      if(this.life<=0) this.reset(false);
    }
    draw(){
      ctx.save();
      ctx.globalAlpha = this.life * 0.7;
      ctx.fillStyle = this.hue>25
        ? `hsl(${this.hue},70%,${45+this.life*15}%)`   // gold
        : `hsl(${this.hue},80%,${35+this.life*15}%)`; // crimson
      ctx.shadowColor = this.hue>25 ? 'rgba(201,162,39,.5)' : 'rgba(139,26,26,.5)';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
      ctx.fill();
      ctx.restore();
    }
  }

  // seed
  for(let i=0;i<80;i++) embers.push(new Ember());

  function loop(){
    ctx.clearRect(0,0,W,H);
    embers.forEach(e=>{ e.update(); e.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
})();