class VacationWebsite {
  constructor() {
    this.setupBookingModal();
    this.setupRevealOnScroll();
    this.setupJamesGallery();
    this.setYear();
  }

  setupBookingModal() {
    const bookBtn = document.getElementById('bookNowBtn');
    const modal = document.getElementById('bookModal');
    if (!bookBtn || !modal) return;
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    const open = () => modal.classList.add('active');
    const close = () => modal.classList.remove('active');
    bookBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (overlay) overlay.addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) close();
    });
  }

  setupRevealOnScroll() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('.reveal, .team-member, .value').forEach((el) => {
      observer.observe(el);
    });
  }

  setupJamesGallery() {
    const trigger = document.getElementById('james-photo');
    if (!trigger) return;

    const overlay = document.createElement('div');
    overlay.className = 'click-gallery';

    const imgLeft = document.createElement('img');
    imgLeft.className = 'click-gallery__img';

    const imgRight = document.createElement('img');
    imgRight.className = 'click-gallery__img';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'click-gallery__close';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.textContent = '×';

    overlay.appendChild(imgLeft);
    overlay.appendChild(imgRight);
    document.body.appendChild(overlay);
    document.body.appendChild(closeBtn);

    const open = () => {
      const l = trigger.getAttribute('data-popup-left') || trigger.currentSrc || trigger.src;
      const r = trigger.getAttribute('data-popup-right') || l;
      imgLeft.src = l;
      imgLeft.alt = (trigger.alt || 'James Thompson') + ' photo 1';
      imgRight.src = r;
      imgRight.alt = (trigger.alt || 'James Thompson') + ' photo 2';
      overlay.classList.add('is-open');
      closeBtn.style.display = 'grid';
    };

    const close = () => {
      overlay.classList.remove('is-open');
      closeBtn.style.display = 'none';
    };

    trigger.addEventListener('click', open);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });
    closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }

  setYear() {
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.vacationWebsite = new VacationWebsite();
});
