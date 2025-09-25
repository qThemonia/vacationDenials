class VacationWebsite{
  constructor(){
    this.setupBookingModal();
    this.setupRevealOnScroll();
    this.setYear();
  }
  setupBookingModal(){
    const bookBtn=document.getElementById('bookNowBtn');
    const modal=document.getElementById('bookModal');
    const closeBtn=modal.querySelector('.modal-close');
    const overlay=modal.querySelector('.modal-overlay');
    const open=()=>modal.classList.add('active');
    const close=()=>modal.classList.remove('active');
    bookBtn.addEventListener('click',open);
    closeBtn.addEventListener('click',close);
    overlay.addEventListener('click',close);
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('active'))close();});
  }
  setupRevealOnScroll(){
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },{threshold:.15});
    document.querySelectorAll('.reveal,.team-member,.value').forEach(el=>observer.observe(el));
  }
  setYear(){
    const y=document.getElementById('year');
    if(y)y.textContent=new Date().getFullYear();
  }
}
document.addEventListener('DOMContentLoaded',()=>{window.vacationWebsite=new VacationWebsite();});
