/**
 * cv.js — CV Page Specific Scripts
 *
 * Contains:
 * 1. Download/Print button handler
 */

(function () {
  'use strict';

  /* ═══════════════════════════════════════════
     Download Button — triggers print dialog
  ═══════════════════════════════════════════ */

  const downloadBtn = document.querySelector('.cv-download');

  if (downloadBtn) {
    downloadBtn.addEventListener('click', function () {
      window.print();
    });
  }

})();
