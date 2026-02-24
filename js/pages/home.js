/**
 * home.js — Home Page Specific Scripts
 *
 * Contains:
 * 1. Hero staggered entrance animation
 * 2. Hero mouse parallax on decorative rings
 */

(function () {
  'use strict';

  /* ═══════════════════════════════════════════
     1. Hero — staggered entrance on page load
  ═══════════════════════════════════════════ */

  const heroItems = document.querySelectorAll(
    '.hero__tag, .hero__name, .hero__bio, .hero__about, .hero__cta'
  );

  // Double rAF ensures layout is complete before we trigger transitions
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      heroItems.forEach(function (el, i) {
        el.style.transitionDelay = (i * 130) + 'ms';
        el.classList.add('hero__item--visible');
      });
    });
  });


  /* ═══════════════════════════════════════════
     2. Hero — mouse parallax on decorative rings
  ═══════════════════════════════════════════ */

  const hero      = document.querySelector('.hero');
  const ringOuter = hero && hero.querySelector('.hero__ring--outer');
  const ringInner = hero && hero.querySelector('.hero__ring--inner');

  // Only run on pointer: fine (mouse), skip on touch
  var hasFinePointer = window.matchMedia('(pointer: fine)').matches;

  if (hero && hasFinePointer) {
    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      // Normalise to -1 … +1 relative to centre
      var cx = ((e.clientX - rect.left)  / rect.width  - 0.5) * 2;
      var cy = ((e.clientY - rect.top)   / rect.height - 0.5) * 2;

      if (ringOuter) {
        ringOuter.style.transform = 'translate(' + (cx * -20) + 'px, ' + (cy * -10) + 'px)';
      }
      if (ringInner) {
        ringInner.style.transform = 'translate(' + (cx * -11) + 'px, ' + (cy * -6) + 'px)';
      }
    });

    // Reset on mouse leave
    hero.addEventListener('mouseleave', function () {
      if (ringOuter) ringOuter.style.transform = '';
      if (ringInner) ringInner.style.transform = '';
    });
  }

})();
