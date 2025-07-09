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
    // Авторизация
    const loginBtn = document.getElementById('login-btn');
    const modal = document.getElementById('auth-modal');
    const closeBtn = document.getElementById('modal-close');
    const switchToRegister = document.getElementById('switch-to-register');

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

    switchToRegister?.addEventListener('click', function (e) {
      e.preventDefault();
      modal?.classList.remove('active');
      document.getElementById('register-modal')?.classList.add('active');
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
      { name: "Вариус", logo: "varius.png" },
    ];

    partnersTrack.innerHTML = '';

    for (let i = 0; i < 4; i++) {
      partners.forEach(partner => {
        const partnerElement = document.createElement('div');
        partnerElement.className = 'partner-logo';
        partnerElement.innerHTML = `<img src="img/partners/${partner.logo}" alt="${partner.name}" title="${partner.name}" loading="lazy">`;
        partnersTrack.appendChild(partnerElement);
      });
    }

    let position = 0;
    const speed = 1;
    let animationId;
    const trackWidth = partnersTrack.scrollWidth / 3;

    function animate() {
      position -= speed;
      if (-position >= trackWidth) position = 0;
      partnersTrack.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    }

    animate();

    partnersTrack.addEventListener('mouseenter', () => cancelAnimationFrame(animationId));
    partnersTrack.addEventListener('mouseleave', () => animate());

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(animationId);
      else animate();
    });
  }

  // 3D бонусная карта
  function initBonusCard() {
    const bonusCard = document.getElementById('bonus-card');
    if (!bonusCard) return;

    bonusCard.addEventListener('click', function () {
      this.classList.toggle('flipped');
    });

    if (window.innerWidth > 768) {
      bonusCard.addEventListener('mousemove', function (e) {
        if (this.classList.contains('flipped')) return;
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        this.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
      });

      bonusCard.addEventListener('mouseleave', function () {
        if (this.classList.contains('flipped')) return;
        this.style.transition = 'transform 0.5s ease';
        this.style.transform = 'rotateY(0deg) rotateX(0deg)';
        setTimeout(() => {
          this.style.transition = '';
        }, 500);
      });
    }
  }

  // Инициализация
  initMobileMenu();
  initModals();
  initPartnersMarquee();
  initBonusCard();
});
