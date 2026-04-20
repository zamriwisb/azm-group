/* ============================================
   AZM Group — Main JavaScript
   ============================================ */

(function () {
  'use strict';

  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');

  // ── Navbar scroll state ──────────────────────
  // If the navbar starts with navbar-scrolled in HTML (sub-pages), keep it permanently
  const navbarFixed = navbar.classList.contains('navbar-scrolled');
  let lastScrollY = 0;

  function updateNavbar() {
    const scrollY = window.scrollY;

    if (navbarFixed || scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }

    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar(); // run on load

  // ── Mobile menu toggle ───────────────────────
  let menuOpen = false;

  function toggleMenu() {
    menuOpen = !menuOpen;

    if (menuOpen) {
      mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
      iconOpen.style.opacity = '0';
      iconClose.style.opacity = '1';
    } else {
      mobileMenu.style.maxHeight = '0';
      iconOpen.style.opacity = '1';
      iconClose.style.opacity = '0';
    }
  }

  menuToggle.addEventListener('click', toggleMenu);

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (menuOpen) toggleMenu();
    });
  });

  // ── Smooth scroll for anchor links ───────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navbarHeight = navbar.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });

  // ── Scroll-triggered reveal animations ───────
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // ── iOS viewport height fix ──────────────────
  function setVh() {
    document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
  }

  window.addEventListener('resize', setVh);
  setVh();
})();
