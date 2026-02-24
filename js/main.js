/**
 * main.js — Shared Site Scripts
 *
 * Contains:
 * 1. Language toggle (EN / FR)
 * 2. Nav — scroll frosted-glass effect
 * 3. Nav — hamburger open / close
 * 4. Scroll reveal (IntersectionObserver)
 */

(function () {
  'use strict';

  /**
   * Initialize all main functionality
   * Called after components are loaded (or immediately if no dynamic components)
   */
  function init() {

    /* ═══════════════════════════════════════════
       1. Language toggle
    ═══════════════════════════════════════════ */

    let currentLang = 'en';

    const allLangBtns = document.querySelectorAll('.nav__lang-btn, .nav__mobile-lang .nav__lang-btn');
    const translatables = document.querySelectorAll('[data-fr]');

    // Cache original English text on load
    translatables.forEach(function (el) {
      el.dataset.en = el.textContent.trim();
    });

    function applyLang(lang) {
      currentLang = lang;

      // Update all translatable elements
      translatables.forEach(function (el) {
        el.textContent = el.dataset[lang];
      });

      // Update active state on every lang button (desktop + mobile)
      allLangBtns.forEach(function (btn) {
        btn.classList.toggle('nav__lang-btn--active', btn.dataset.lang === lang);
      });

      // Update html lang attribute for accessibility
      document.documentElement.lang = lang;
    }

    allLangBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLang(btn.dataset.lang);
      });
    });


    /* ═══════════════════════════════════════════
       2. Nav — scroll frosted-glass effect
    ═══════════════════════════════════════════ */

    const nav = document.getElementById('nav');

    if (nav) {
      function onScroll() {
        nav.classList.toggle('nav--scrolled', window.scrollY > 24);
      }

      // Run once immediately in case page loads already scrolled
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }


    /* ═══════════════════════════════════════════
       3. Nav — hamburger open / close
    ═══════════════════════════════════════════ */

    const hamburger  = nav && nav.querySelector('.nav__hamburger');
    const mobileMenu = nav && nav.querySelector('.nav__mobile');

    if (hamburger && mobileMenu) {
      function openMenu() {
        mobileMenu.classList.add('nav__mobile--open');
        hamburger.classList.add('nav__hamburger--open');
        hamburger.setAttribute('aria-expanded', 'true');
        mobileMenu.setAttribute('aria-hidden', 'false');
      }

      function closeMenu() {
        mobileMenu.classList.remove('nav__mobile--open');
        hamburger.classList.remove('nav__hamburger--open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      }

      hamburger.addEventListener('click', function () {
        mobileMenu.classList.contains('nav__mobile--open') ? closeMenu() : openMenu();
      });

      // Close when clicking outside the nav
      document.addEventListener('click', function (e) {
        if (!nav.contains(e.target)) closeMenu();
      });

      // Close on Escape key
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
      });

      // Close when a mobile link is clicked
      mobileMenu.querySelectorAll('.nav__mobile-link').forEach(function (link) {
        link.addEventListener('click', closeMenu);
      });
    }


    /* ═══════════════════════════════════════════
       4. Scroll reveal (IntersectionObserver)
    ═══════════════════════════════════════════ */

    var revealEls = document.querySelectorAll('.reveal');

    if (revealEls.length > 0) {
      // Assign stagger delays to siblings within the same parent
      var parentMap = new Map();
      revealEls.forEach(function (el) {
        var parent = el.parentElement;
        if (!parentMap.has(parent)) parentMap.set(parent, []);
        parentMap.get(parent).push(el);
      });

      parentMap.forEach(function (siblings) {
        if (siblings.length > 1) {
          siblings.forEach(function (el, i) {
            el.style.transitionDelay = (i * 80) + 'ms';
          });
        }
      });

      // Fallback: if IntersectionObserver not supported, show all
      if (!('IntersectionObserver' in window)) {
        revealEls.forEach(function (el) {
          el.classList.add('reveal--visible');
        });
        return;
      }

      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('reveal--visible');
              revealObserver.unobserve(entry.target); // animate once
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -40px 0px',
        }
      );

      revealEls.forEach(function (el) {
        revealObserver.observe(el);
      });
    }

  }

  // Initialize when components are loaded (if using dynamic loading)
  // or immediately if components are already in the DOM
  if (document.querySelector('[data-component]')) {
    document.addEventListener('components:loaded', init);
  } else {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

})();
