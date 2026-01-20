/**
 * Tactiq Spark — Core Script 2026
 * Функционал: Мобильное меню, Параллакс, Scroll Reveal,
 * Аккордеон, Валидация формы, Капча, Cookies.
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. ИНИЦИАЛИЗАЦИЯ ИКОНОК ---
  if (window.lucide) {
      lucide.createIcons();
  }

  // --- 2. МОБИЛЬНОЕ МЕНЮ (БУРГЕР) ---
  const burger = document.querySelector('.burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  const toggleMenu = () => {
      burger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      // Блокируем скролл при открытом меню
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  };

  if (burger) {
      burger.addEventListener('click', toggleMenu);
  }

  // Закрытие меню при клике по ссылке
  mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
          if (mobileMenu.classList.contains('active')) toggleMenu();
      });
  });

  // --- 3. ПЛАВНЫЙ СКРОЛЛ К СЕКЦИЯМ ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;

          e.preventDefault();
          const target = document.querySelector(targetId);

          if (target) {
              const headerOffset = 80;
              const elementPosition = target.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

              window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
              });
          }
      });
  });

  // --- 4. НАЙТИВНЫЙ ПАРАЛЛАКС (HERO) ---
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
      document.addEventListener('mousemove', (e) => {
          const shapes = document.querySelectorAll('.parallax-element');
          const x = (e.clientX / window.innerWidth) - 0.5;
          const y = (e.clientY / window.innerHeight) - 0.5;

          shapes.forEach((shape, index) => {
              const speed = (index + 1) * 20;
              shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
          });
      });
  }

  // --- 5. SCROLL REVEAL (ПОЯВЛЕНИЕ БЛОКОВ) ---
  const revealOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('active');
              // Прекращаем наблюдение после активации (однократное появление)
              revealObserver.unobserve(entry.target);
          }
      });
  }, revealOptions);

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // --- 6. ИСПРАВЛЕННЫЙ АККОРДЕОН (БЕЗ КОНФЛИКТА КЛАССОВ) ---
  const accordionItems = document.querySelectorAll('.accordion__item');

  accordionItems.forEach(item => {
      const header = item.querySelector('.accordion__header');

      header.addEventListener('click', () => {
          const isOpen = item.classList.contains('is-open');

          // Закрываем другие открытые элементы (опционально)
          accordionItems.forEach(el => el.classList.remove('is-open'));

          // Тоглим текущий. Используем is-open вместо active
          if (!isOpen) {
              item.classList.add('is-open');
          }
      });
  });

  // --- 7. ФОРМА ОБРАТНОЙ СВЯЗИ ---
  const contactForm = document.getElementById('ai-form');
  const phoneInput = document.getElementById('phone');
  const captchaQ = document.getElementById('captcha-question');
  const captchaA = document.getElementById('captcha-answer');
  let correctCaptchaResult;

  // Генерация капчи
  function generateCaptcha() {
      if (!captchaQ) return;
      const n1 = Math.floor(Math.random() * 10) + 1;
      const n2 = Math.floor(Math.random() * 5) + 1;
      correctCaptchaResult = n1 + n2;
      captchaQ.innerText = `${n1} + ${n2} = ?`;
  }

  // Только цифры в телефоне
  if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
          e.target.value = e.target.value.replace(/\D/g, '');
      });
  }

  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();

          // Проверка капчи
          if (parseInt(captchaA.value) !== correctCaptchaResult) {
              alert('Неправильный ответ капчи. Попробуйте еще раз.');
              generateCaptcha();
              captchaA.value = '';
              return;
          }

          // Имитация отправки
          const btn = this.querySelector('button');
          const originalBtnText = btn.innerText;

          btn.innerText = 'Отправка...';
          btn.disabled = true;

          setTimeout(() => {
              this.classList.add('form--sent');
              console.log('Tactiq Spark: Данные успешно отправлены.');
              // Здесь можно добавить реальный fetch() запрос
          }, 1500);
      });
  }

  generateCaptcha();

  // --- 8. COOKIE POPUP ---
  const cookiePopup = document.getElementById('cookiePopup');
  const acceptBtn = document.getElementById('acceptCookies');

  if (cookiePopup && !localStorage.getItem('tactiq_cookies_accepted')) {
      // Показываем плашку с задержкой
      setTimeout(() => {
          cookiePopup.classList.add('active');
      }, 2000);
  }

  if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
          localStorage.setItem('tactiq_cookies_accepted', 'true');
          cookiePopup.classList.remove('active');
      });
  }

  // --- 9. ПАУЗА БЕГУЩЕЙ СТРОКИ ---
  const marquee = document.querySelector('.marquee');
  if (marquee) {
      marquee.addEventListener('mouseenter', () => marquee.style.animationPlayState = 'paused');
      marquee.addEventListener('mouseleave', () => marquee.style.animationPlayState = 'running');
  }
});