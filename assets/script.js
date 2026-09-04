/* =========================================================
   細野賢一司法書士事務所 デモサイト
   ========================================================= */
(function () {
  'use strict';

  /* ---- デモ告知バーの高さを実測して CSS 変数に反映 ---- */
  var demoBanner = document.querySelector('.demo-banner');
  var syncDemoHeight = function () {
    if (!demoBanner) return;
    document.documentElement.style.setProperty('--demo-h', demoBanner.offsetHeight + 'px');
  };
  syncDemoHeight();
  window.addEventListener('resize', syncDemoHeight);
  window.addEventListener('load', syncDemoHeight);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncDemoHeight);
  }

  /* ---- ヘッダーのスクロール状態 ---- */
  var header = document.getElementById('siteHeader');
  var onScroll = function () {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- モバイルナビの開閉 ---- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('siteNav');
  if (toggle && nav) {
    var setNav = function (open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    };
    toggle.addEventListener('click', function () {
      setNav(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1000) setNav(false);
    });
  }

  /* ---- ライズアニメーション（セクション単位で一括） ---- */
  var risers = Array.prototype.slice.call(document.querySelectorAll('.rise'));
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce || !('IntersectionObserver' in window)) {
    risers.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    risers.forEach(function (el) { io.observe(el); });
  }

  /* ---- お問い合わせフォーム（デモ：送信しない） ---- */
  var form = document.getElementById('contactForm');
  var result = document.getElementById('formResult');
  if (form && result) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      result.hidden = false;
      result.textContent =
        'こちらはデモサイトです。フォームからの送信は行われません。実際の運用時に送信先・自動返信などの設定を行います。';
      result.focus && result.focus();
      result.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    });
  }

  /* ---- 同意リンク（デモ：遷移しない） ---- */
  var agreeLink = document.querySelector('.agree__link');
  if (agreeLink) {
    agreeLink.addEventListener('click', function (e) {
      e.preventDefault();
      window.alert('デモ表示：個人情報の取り扱いに関するページは公開前にご用意します。');
    });
  }
})();
