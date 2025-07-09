document.addEventListener('DOMContentLoaded', function() {
  // Модальное окно авторизации
  const loginBtn = document.getElementById('login-btn');
  const modal = document.getElementById('auth-modal');
  const closeBtn = document.getElementById('modal-close');
  
  loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  
  closeBtn.addEventListener('click', function() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Модальное окно регистрации
  const registerBtn = document.getElementById('register-btn');
  const registerModal = document.getElementById('register-modal');
  const registerCloseBtn = document.getElementById('register-modal-close');
  const registerOkBtn = document.getElementById('register-ok-btn');
  
  registerBtn.addEventListener('click', function(e) {
    e.preventDefault();
    registerModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  
  registerCloseBtn.addEventListener('click', function() {
    registerModal.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  registerOkBtn.addEventListener('click', function() {
    registerModal.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  registerModal.addEventListener('click', function(e) {
    if (e.target === registerModal) {
      registerModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Бегущая строка партнеров
  const partners = [
    { name: "Мольберт и братья", logo: "molbert.png" },
    { name: "Iltedema", logo: "iltedema.png" },
    { name: "Дент Сервис", logo: "dentservis.png" },
    { name: "Дельта Те", logo: "delta-te.png" },
    { name: "Специалист", logo: "specialist.png" },
  ];

  const partnersTrack = document.getElementById('partnersTrack');
  
  // Добавляем партнеров (3 раза для бесконечного эффекта)
  for (let i = 0; i < 3; i++) {
    partners.forEach(partner => {
      const partnerElement = document.createElement('div');
      partnerElement.className = 'partner-logo';
      partnerElement.innerHTML = `
        <img src="img/partners/${partner.logo}" alt="${partner.name}" title="${partner.name}">
      `;
      partnersTrack.appendChild(partnerElement);
    });
  }

  // Анимация бегущей строки
  let position = 0;
  const speed = 1;
  let animationId;
  const trackWidth = partnersTrack.scrollWidth / 3;

  function animate() {
    position -= speed;
    
    if (-position >= trackWidth) {
      position = 0;
    }
    
    partnersTrack.style.transform = `translateX(${position}px)`;
    animationId = requestAnimationFrame(animate);
  }

  // Запускаем анимацию
  animate();

  // Останавливаем анимацию при наведении
  partnersTrack.addEventListener('mouseenter', () => {
    cancelAnimationFrame(animationId);
  });

  // Возобновляем анимацию при уходе курсора
  partnersTrack.addEventListener('mouseleave', () => {
    animate();
  });

  // Остановка анимации при скрытии вкладки
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animate();
    }
  });

  // 3D бонусная карта с переворотом
  const bonusCard = document.getElementById('bonus-card');
  
  if (bonusCard) {
    // Переворот карты при клике
    bonusCard.addEventListener('click', function() {
      this.classList.toggle('flipped');
    });

    // Параллакс-эффект
    bonusCard.addEventListener('mousemove', function(e) {
      if (this.classList.contains('flipped')) return;
      
      const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      this.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    bonusCard.addEventListener('mouseleave', function() {
      if (this.classList.contains('flipped')) return;
      
      this.style.transition = 'transform 0.5s ease';
      this.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  }
});