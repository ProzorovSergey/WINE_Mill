/**
 * main.js — Винная мельница
 * Fixes: slider, burger, filters, sort, cart, qty, forms, scroll shadow
 */
'use strict';

/* ─── 1. HERO SLIDER ─────────────────────────────────────────────────── */
(function () {
  var track  = document.querySelector('.js-slider-track');
  var dots   = document.querySelectorAll('.js-slider-dot');
  var prevBtn = document.querySelector('.js-slider-prev');
  var nextBtn = document.querySelector('.js-slider-next');

  if (!track) return;

  var slides  = track.querySelectorAll('.hero__slide');
  if (slides.length < 2) return;   // single-slide pages don't need slider

  var current = 0;
  var timer   = null;
  var DELAY   = 5000;

  function goTo(idx) {
    current = (idx + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    dots.forEach(function (d, i) {
      d.classList.toggle('is-active', i === current);
      d.setAttribute('aria-selected', i === current ? 'true' : 'false');
    });
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }
  function start() { stop(); timer = setInterval(next, DELAY); }
  function stop()  { clearInterval(timer); }

  if (prevBtn) prevBtn.addEventListener('click', function () { stop(); prev(); start(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { stop(); next(); start(); });

  dots.forEach(function (d, i) {
    d.addEventListener('click', function () { stop(); goTo(i); start(); });
  });

  // Touch swipe
  var tx = 0;
  track.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   function (e) {
    var dx = tx - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) { stop(); dx > 0 ? next() : prev(); start(); }
  }, { passive: true });

  track.addEventListener('mouseenter', stop);
  track.addEventListener('mouseleave', start);

  goTo(0);
  start();
}());

/* ─── 2. MOBILE BURGER / NAV ─────────────────────────────────────────── */
(function () {
  var burger = document.querySelector('.js-burger');
  var nav    = document.querySelector('.js-nav');
  if (!burger || !nav) return;

  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    burger.classList.toggle('is-active', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  });

  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      burger.classList.remove('is-active');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}());

/* ─── 3. FILTER ACCORDION ────────────────────────────────────────────── */
(function () {
  document.querySelectorAll('.js-filter-header').forEach(function (hdr) {
    hdr.addEventListener('click', function () {
      var body   = hdr.nextElementSibling;
      var toggle = hdr.querySelector('.filters__toggle');
      if (!body) return;
      var hidden = body.classList.toggle('is-hidden');
      if (toggle) toggle.classList.toggle('is-collapsed', hidden);
    });
  });
}());

/* ─── 4. MOBILE FILTER PANEL ─────────────────────────────────────────── */
(function () {
  var openBtn  = document.querySelector('.js-filter-open');
  var sidebar  = document.querySelector('.js-filters');
  if (!openBtn || !sidebar) return;

  openBtn.addEventListener('click', function () {
    sidebar.classList.toggle('is-open');
  });

  document.addEventListener('click', function (e) {
    if (window.innerWidth > 768) return;
    if (!sidebar.contains(e.target) && !openBtn.contains(e.target)) {
      sidebar.classList.remove('is-open');
    }
  });
}());

/* ─── 5. SORT BUTTONS ────────────────────────────────────────────────── */
(function () {
  var btns = document.querySelectorAll('.catalog__sort-btn');
  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      btns.forEach(function (b) { b.classList.remove('catalog__sort-btn--active'); });
      btn.classList.add('catalog__sort-btn--active');
    });
  });
}());

/* ─── 6. ADD TO CART FEEDBACK ────────────────────────────────────────── */
(function () {
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.product-card__btn');
    if (!btn) return;
    var orig = btn.textContent;
    btn.textContent = '✓ Добавлено';
    btn.style.backgroundColor = '#2d7d46';
    setTimeout(function () { btn.textContent = orig; btn.style.backgroundColor = ''; }, 1500);

    // update header badge
    var badge = document.querySelector('.header__cart-count');
    if (badge) badge.textContent = (parseInt(badge.textContent, 10) || 0) + 1;
  });
}());

/* ─── 7. NEWSLETTER FORMS ────────────────────────────────────────────── */
(function () {
  document.querySelectorAll('.newsletter__form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('.newsletter__input');
      if (!input || !input.value.trim()) return;
      var btn = form.querySelector('.newsletter__submit');
      if (btn) { btn.textContent = 'Отправлено ✓'; btn.style.backgroundColor = '#2d7d46'; btn.disabled = true; }
      input.value = '';
    });
  });
}());

/* ─── 8. ABOUT CONTACT FORM ──────────────────────────────────────────── */
(function () {
  var form = document.querySelector('.about-page__contact-form form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('.about-page__form-submit');
    if (btn) { btn.textContent = 'Отправлено ✓'; btn.style.backgroundColor = '#2d7d46'; btn.disabled = true; }
  });
}());

/* ─── 9. STICKY HEADER SHADOW ────────────────────────────────────────── */
(function () {
  var hdr = document.querySelector('.header');
  if (!hdr) return;
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        hdr.style.boxShadow = window.scrollY > 8 ? '0 2px 20px rgba(0,0,0,.6)' : '';
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}());
