document.addEventListener('DOMContentLoaded', function () {
  // Закрытие мобильного меню
  function closeMobileMenu() {
    document.getElementById('hamburger')?.classList.remove('active');
    document.getElementById('mobile-nav')?.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Мобильное меню
  function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileClose = document.getElementById('mobile-close');
    const mobileLoginBtn = document.getElementById('mobile-login-btn');
    const mobileRegisterBtn = document.getElementById('mobile-register-btn');

    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    mobileClose?.addEventListener('click', closeMobileMenu);

    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-quick-link');
    mobileLinks.forEach(link =>
      link.addEventListener('click', closeMobileMenu)
    );

    mobileLoginBtn?.addEventListener('click', function (e) {
      e.preventDefault();
      document.getElementById('auth-modal')?.classList.add('active');
      closeMobileMenu();
      document.body.style.overflow = 'hidden';
    });

    mobileRegisterBtn?.addEventListener('click', function (e) {
      e.preventDefault();
      document.getElementById('register-modal')?.classList.add('active');
      closeMobileMenu();
      document.body.style.overflow = 'hidden';
    });
  }

  // Модальные окна
  function initModals() {
    const authOkBtn = document.getElementById('auth-ok-btn');
    authOkBtn?.addEventListener('click', () => {
      document.getElementById('auth-modal')?.classList.remove('active');
      document.body.style.overflow = '';
    });

    // Авторизация
    const loginBtn = document.getElementById('login-btn');
    const modal = document.getElementById('auth-modal');
    const closeBtn = document.getElementById('modal-close');

    loginBtn?.addEventListener('click', function (e) {
      e.preventDefault();
      modal?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    closeBtn?.addEventListener('click', () => {
      modal?.classList.remove('active');
      document.body.style.overflow = '';
    });

    modal?.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Регистрация
    const registerBtn = document.getElementById('register-btn');
    const registerModal = document.getElementById('register-modal');
    const registerCloseBtn = document.getElementById('register-modal-close');
    const registerOkBtn = document.getElementById('register-ok-btn');

    registerBtn?.addEventListener('click', function (e) {
      e.preventDefault();
      registerModal?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    registerCloseBtn?.addEventListener('click', () => {
      registerModal?.classList.remove('active');
      document.body.style.overflow = '';
    });

    registerOkBtn?.addEventListener('click', () => {
      registerModal?.classList.remove('active');
      document.body.style.overflow = '';
    });

    registerModal?.addEventListener('click', function (e) {
      if (e.target === registerModal) {
        registerModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Выбор города
    const locationSelector = document.getElementById('location-selector');
    const locationModal = document.getElementById('location-modal');
    const locationCloseBtn = document.getElementById('location-modal-close');

    locationSelector?.addEventListener('click', function (e) {
      e.preventDefault();
      locationModal?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    locationCloseBtn?.addEventListener('click', () => {
      locationModal?.classList.remove('active');
      document.body.style.overflow = '';
    });

    locationModal?.addEventListener('click', function (e) {
      if (e.target === locationModal) {
        locationModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    const citiesList = document.getElementById('cities-list');
    const cities = [
      'Калининград', 'Москва', 'Московская область'
    ];

    if (citiesList) {
      citiesList.innerHTML = '';
      cities.forEach(city => {
        const cityItem = document.createElement('div');
        cityItem.className = 'city-item';
        cityItem.textContent = city;
        cityItem.addEventListener('click', function () {
          document.querySelector('.location-text').textContent = city;
          locationModal?.classList.remove('active');
          document.body.style.overflow = '';
        });
        citiesList.appendChild(cityItem);
      });
    }

    const citySearch = document.getElementById('city-search');
    citySearch?.addEventListener('input', function () {
      const searchTerm = this.value.toLowerCase();
      const cityItems = document.querySelectorAll('.city-item');
      cityItems.forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(searchTerm) ? 'block' : 'none';
      });
    });
  }

  // Бегущая строка партнёров
  function initPartnersMarquee() {
    const partnersTrack = document.getElementById('partnersTrack');
    if (!partnersTrack) return;

    const partners = [
      { name: "Мольберт и братья", logo: "molbert.png" },
      { name: "Iltedema", logo: "iltedema.png" },
      { name: "Дент Сервис", logo: "dentservis.png" },
      { name: "Дельта Те", logo: "delta-te.png" },
      { name: "Специалист", logo: "specialist.png" },
    ];

    partnersTrack.innerHTML = '';
    
    const marqueeContainer = document.createElement('div');
    marqueeContainer.className = 'marquee-container';
    
    for (let i = 0; i < 2; i++) {
      partners.forEach(partner => {
        const partnerElement = document.createElement('div');
        partnerElement.className = 'partner-logo';
        partnerElement.innerHTML = `<img src="img/partners/${partner.logo}" alt="${partner.name}" title="${partner.name}" loading="lazy">`;
        marqueeContainer.appendChild(partnerElement);
      });
    }
    
    partnersTrack.appendChild(marqueeContainer);

    let animationFrame;
    let position = 0;
    const speed = 1;
    const containerWidth = marqueeContainer.scrollWidth / 2;

    function animate() {
      position -= speed;
      if (-position >= containerWidth) {
        position = 0;
      }
      marqueeContainer.style.transform = `translateX(${position}px)`;
      animationFrame = requestAnimationFrame(animate);
    }

    animate();

    partnersTrack.addEventListener('mouseenter', () => {
      cancelAnimationFrame(animationFrame);
    });

    partnersTrack.addEventListener('mouseleave', () => {
      animate();
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrame);
      } else {
        animate();
      }
    });
  }

  // 3D бонусная карта - исправленная версия
  function initBonusCard() {
    const bonusCard = document.getElementById('bonus-card');
    if (!bonusCard) return;

    let isAnimating = false;
    let isFlipped = false;

    // Клик для переворота
    bonusCard.addEventListener('click', function(e) {
      e.preventDefault();
      if (isAnimating) return;
      
      isFlipped = !isFlipped;
      this.classList.toggle('flipped');
      this.setAttribute('aria-pressed', isFlipped);
    });

    // 3D эффект при наведении (только для десктопов)
    if (window.innerWidth > 768) {
      bonusCard.addEventListener('mousemove', function(e) {
        if (isFlipped || isAnimating) return;
        
        const cardRect = this.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        
        const xAxis = (cardCenterY - e.clientY) / 20;
        const yAxis = (e.clientX - cardCenterX) / 20;
        
        this.style.transform = `rotateX(${xAxis}deg) rotateY(${yAxis}deg) scale(1.03)`;
      });

      bonusCard.addEventListener('mouseleave', function() {
        if (isFlipped) return;
        this.style.transform = 'rotateX(0) rotateY(0) scale(1)';
      });
    }

    // Для мобильных устройств
    bonusCard.addEventListener('touchstart', function(e) {
      e.preventDefault();
      if (isAnimating) return;
      
      isFlipped = !isFlipped;
      this.classList.toggle('flipped');
      this.setAttribute('aria-pressed', isFlipped);
    }, { passive: false });

    // Отслеживание начала и конца анимации
    bonusCard.addEventListener('transitionstart', function() {
      isAnimating = true;
    });

    bonusCard.addEventListener('transitionend', function() {
      isAnimating = false;
    });
  }

  // Инициализация всех компонентов
  initMobileMenu();
  initModals();
  initPartnersMarquee();
  initBonusCard();

  // Анимация при скролле
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  animatedElements.forEach(el => observer.observe(el));
});