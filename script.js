// Simple interactions: year, theme, hamburger, project filter, contact form
document.addEventListener('DOMContentLoaded', () => {
  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Theme toggle (persist using localStorage)
  const themeToggle = document.getElementById('themeToggle');
  const current = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  if(current === 'dark') document.body.classList.add('dark');

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const t = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', t);
    themeToggle.textContent = t === 'dark' ? '☀️' : '🌙';
  });

  // Hamburger toggle for small screens
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  hamburger && hamburger.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.gap = '0.5rem';
    nav.style.position = 'absolute';
    nav.style.right = '1rem';
    nav.style.top = '64px';
    nav.style.background = 'var(--surface)';
    nav.style.padding = '0.75rem';
    nav.style.borderRadius = '8px';
    nav.style.boxShadow = '0 8px 24px rgba(11,22,52,0.08)';
  });

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const target = a.getAttribute('href');
      if(target.length>1){
        e.preventDefault();
        const el = document.querySelector(target);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Projects filter
  const projectsGrid = document.getElementById('projectsGrid');
  document.querySelectorAll('.projects-filter button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.projects-filter button').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.getAttribute('data-filter');
      document.querySelectorAll('.project-card').forEach(card=>{
        if(f === 'all') card.style.display = '';
        else {
          const types = card.getAttribute('data-type') || '';
          card.style.display = types.includes(f) ? '' : 'none';
        }
      });
    });
  });


  // Small UX: download CV opens sample (you can replace link)
  document.getElementById('downloadCv').addEventListener('click', (e)=>{
    e.preventDefault();
    // If you have a real CV file rename here. Currently opens mail compose as fallback
    window.location.href = 'mailto:youremail@example.com?subject=CV%20Request&body=Hello%20Amiru%2C%0A%0AI%20would%20like%20a%20copy%20of%20your%20CV.';
  });

});