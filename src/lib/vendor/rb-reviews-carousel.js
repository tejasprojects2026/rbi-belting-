/* Adapted from the supplied RB Reviews Carousel v2.0.
 * React owns mounting and cleanup; review content lives in site-data.ts.
 */
  'use strict';



  var DEFAULTS = {
    title: '',
    accent: '#D7282F',
    autoplay: 6000,
    stableHeight: true,
    maxReviews: 20,
    minRating: 1,
    data: null,
    src: null,
    live: null,
    target: null
  };

  /* ---------- helpers ---------- */

  function assign(t) {
    for (var i = 1; i < arguments.length; i++) {
      var s = arguments[i];
      for (var k in s) if (Object.prototype.hasOwnProperty.call(s, k)) t[k] = s[k];
    }
    return t;
  }

  function h(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function number(n) {
    try { return Number(n).toLocaleString('en-IN'); } catch (e) { return String(n); }
  }

  function ago(iso) {
    var then = new Date(iso).getTime();
    if (isNaN(then)) return '';
    var days = Math.floor((Date.now() - then) / 86400000);
    if (days < 1) return 'today';
    if (days < 7) return days === 1 ? 'yesterday' : days + ' days ago';
    if (days < 30) { var w = Math.floor(days / 7); return w === 1 ? 'a week ago' : w + ' weeks ago'; }
    if (days < 365) { var m = Math.round(days / 30.44); return m <= 1 ? 'a month ago' : m + ' months ago'; }
    var y = Math.floor(days / 365);
    return y === 1 ? 'a year ago' : y + ' years ago';
  }

  var COLORS = ['#1a73e8', '#188038', '#e37400', '#a142f4', '#d93025', '#007b83', '#5f6368', '#c5221f'];
  function colorFor(name) {
    var sum = 0;
    for (var i = 0; i < name.length; i++) sum += name.charCodeAt(i);
    return COLORS[sum % COLORS.length];
  }
  function initials(name) {
    var p = String(name).trim().split(/\s+/);
    return ((p[0] ? p[0][0] : '') + (p[1] ? p[1][0] : '')).toUpperCase() || '?';
  }

  /* Google image links can be resized by adding a size at the end */
  function isGoogleImg(u) { return /googleusercontent\.com/.test(u) && !/=[wsh]\d+/.test(u); }
  function photoUrl(u, w, hh) { return isGoogleImg(u) ? u + '=w' + w + '-h' + hh + '-p-k-no' : u; }
  function avatarUrl(u) { return isGoogleImg(u) ? u + '=s96-c' : u; }

  var STAR = 'M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z';
  function stars(rating, size) {
    var wrap = h('span', 'stars');
    wrap.style.setProperty('--s', (size || 16) + 'px');
    wrap.setAttribute('role', 'img');
    wrap.setAttribute('aria-label', rating + ' out of 5 stars');
    var base = h('span', 'stars-base');
    var fill = h('span', 'stars-fill');
    var svg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + STAR + '"/></svg>';
    var markup = '';
    for (var i = 0; i < 5; i++) markup += svg;
    base.innerHTML = markup;
    fill.innerHTML = markup;
    fill.style.width = Math.max(0, Math.min(100, (rating / 5) * 100)) + '%';
    wrap.appendChild(base);
    wrap.appendChild(fill);
    return wrap;
  }

  var G_LOGO =
    '<svg viewBox="0 0 48 48" aria-hidden="true">' +
    '<path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>' +
    '<path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>' +
    '<path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>' +
    '<path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>' +
    '</svg>';
  function gLogo(cls) {
    var s = h('span', cls);
    s.innerHTML = G_LOGO;
    return s;
  }

  var TICK =
    '<svg viewBox="0 0 24 24" aria-hidden="true">' +
    '<path fill="#1a73e8" d="M12 1l2.6 1.9 3.2-.1 1 3.1 2.6 1.9-1 3.1 1 3.1-2.6 1.9-1 3.1-3.2-.1L12 23l-2.6-1.9-3.2.1-1-3.1L2.6 16l1-3.1-1-3.1 2.6-1.9 1-3.1 3.2.1z"/>' +
    '<path fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" d="M8 12.3l2.7 2.6L16 9.6"/></svg>';
  var CHEV_L = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>';
  var CHEV_R = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>';
  var X_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';

  /* ---------- styles (inside a shadow root, so the website CSS cannot break them) ---------- */

  var CSS = [
    ':host{display:block}',
    '*{box-sizing:border-box}',
    '.rb{--accent:#D7282F;--ink:#1f2328;--muted:#6b7280;--card:#f3f4f6;container-type:inline-size;',
    'font-family:inherit;color:var(--ink);line-height:1.5;-webkit-font-smoothing:antialiased}',
    'button{font:inherit;color:inherit}',
    '.g-logo,.g-logo svg{display:block;width:100%;height:100%}',

    '.title{margin:0 0 22px;text-align:center;font-size:clamp(22px,5.2cqi,30px);font-weight:700;letter-spacing:-.01em;line-height:1.2}',

    /* stars */
    '.stars{position:relative;display:inline-block;line-height:0;vertical-align:middle}',
    '.stars-base,.stars-fill{display:flex}',
    '.stars svg{width:var(--s,16px);height:var(--s,16px);flex:none}',
    '.stars-base svg{fill:#d9dce1}',
    '.stars-fill{position:absolute;top:0;left:0;overflow:hidden}',
    '.stars-fill svg{fill:#fbbc04}',

    /* stage: card + arrows */
    '.stage{position:relative;padding:0 22px}',
    '.viewport{position:relative;overflow:hidden;border-radius:18px;background:var(--card);',
    'height:var(--h,260px);transition:height .35s ease;touch-action:pan-y}',
    '.slide{position:absolute;top:0;left:0;width:100%;height:100%;padding:0 56px;display:flex;align-items:center;justify-content:center;',
    'visibility:hidden;transform:translateX(calc(var(--o,0) * 100%));',
    'transition:transform .5s cubic-bezier(.22,.8,.3,1),visibility 0s linear .5s}',
    '.slide.near{visibility:visible;transition:transform .5s cubic-bezier(.22,.8,.3,1),visibility 0s}',
    '.inner{display:flex;flex-direction:column;align-items:center;text-align:center;width:100%;padding:28px 0 26px}',

    '.text{margin:14px 0 0;max-width:62ch;font-size:16px;line-height:1.55;overflow-wrap:anywhere}',
    '.text.clamped{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}',
    '.more{margin:4px 0 0;padding:2px 4px;border:0;background:none;cursor:pointer;color:var(--accent);font-weight:600;font-size:14px}',
    '.more:hover{text-decoration:underline}',
    '.more[hidden]{display:none}',

    /* review photos */
    '.photos{display:grid;gap:8px;width:100%;margin-top:14px}',
    '.photos.n1{grid-template-columns:minmax(0,1fr);max-width:230px}',
    '.photos.n2{grid-template-columns:repeat(2,minmax(0,1fr));max-width:340px}',
    '.photos.n3{grid-template-columns:repeat(3,minmax(0,1fr));max-width:400px}',
    '.ph{position:relative;display:block;width:100%;height:96px;padding:0;border:0;border-radius:12px;overflow:hidden;',
    'background:#e5e7eb;cursor:zoom-in}',
    '.n1 .ph{height:118px}',
    '.ph img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .3s ease}',
    '.ph:hover img{transform:scale(1.04)}',
    '.ph:focus-visible{outline:3px solid var(--accent);outline-offset:2px}',
    '.ph .count{position:absolute;inset:0;display:grid;place-items:center;background:rgba(15,15,18,.55);color:#fff;font-weight:700;font-size:22px}',

    /* author */
    '.author{margin-top:16px;display:flex;flex-direction:column;align-items:center;gap:3px}',
    '.av{position:relative;width:48px;height:48px;margin-bottom:6px}',
    '.av .circle{position:relative;width:100%;height:100%;border-radius:50%;overflow:hidden;display:grid;place-items:center;color:#fff;font-weight:600;font-size:17px}',
    '.av .circle img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}',
    '.av .gb{position:absolute;right:-7px;bottom:-3px;width:22px;height:22px;padding:3px;background:#fff;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,.28)}',
    '.name{display:flex;align-items:center;justify-content:center;gap:5px;font-weight:700;font-size:15px}',
    '.name .tick{display:inline-block;width:16px;height:16px;flex:none}',
    '.name .tick svg{display:block;width:100%;height:100%}',
    '.when{font-size:13px;color:var(--muted)}',

    /* arrows */
    '.arrow{position:absolute;top:50%;z-index:2;width:42px;height:42px;margin-top:-21px;border-radius:50%;border:0;background:#fff;',
    'box-shadow:0 2px 10px rgba(0,0,0,.2);display:grid;place-items:center;cursor:pointer;color:var(--ink);transition:box-shadow .2s ease}',
    '.arrow svg{width:24px;height:24px}',
    '.arrow.prev{left:1px}.arrow.next{right:1px}',
    '.arrow:hover{box-shadow:0 4px 16px rgba(0,0,0,.28)}',
    '.arrow:focus-visible{outline:3px solid var(--accent);outline-offset:2px}',

    /* dots */
    '.dots{display:flex;justify-content:center;align-items:center;gap:7px;margin-top:16px;min-height:10px}',
    '.dot{position:relative;width:8px;height:8px;padding:0;border:0;border-radius:99px;background:#cdd1d6;cursor:pointer;',
    'transition:width .25s ease,background .25s ease}',
    '.dot::before{content:"";position:absolute;inset:-9px -4px}',
    '.dot[aria-current=true]{width:22px;background:var(--accent)}',
    '.dot:focus-visible{outline:2px solid var(--accent);outline-offset:3px}',

    /* Google summary */
    '.summary{display:flex;flex-direction:column;align-items:center;gap:6px;margin-top:24px;color:inherit;text-decoration:none}',
    '.sum-top{display:flex;align-items:center;gap:8px;font-weight:700;font-size:17px}',
    '.sum-top .g-logo{width:22px;height:22px}',
    '.sum-bottom{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:4px 10px}',
    '.sum-score{font-weight:700;font-size:22px;line-height:1}',
    '.sum-count{font-size:14px;color:var(--muted)}',
    '.summary:hover .sum-count{text-decoration:underline}',
    '.summary:focus-visible{outline:3px solid var(--accent);outline-offset:4px;border-radius:8px}',

    /* photo viewer */
    '.lb{position:fixed;inset:0;z-index:2147483000;display:none;align-items:center;justify-content:center;padding:24px;background:rgba(10,10,12,.9)}',
    '.lb[data-open=true]{display:flex}',
    '.lb img{max-width:min(92vw,1100px);max-height:86vh;border-radius:8px;object-fit:contain;background:#111}',
    '.lb button{position:absolute;width:44px;height:44px;border:0;border-radius:50%;background:rgba(255,255,255,.14);color:#fff;display:grid;place-items:center;cursor:pointer}',
    '.lb button:hover{background:rgba(255,255,255,.26)}',
    '.lb button:focus-visible{outline:3px solid #fff}',
    '.lb svg{width:26px;height:26px}',
    '.lb .lb-close{top:16px;right:16px}.lb .lb-prev{left:16px}.lb .lb-next{right:16px}',

    /* narrow containers and phones */
    '@container (max-width:460px){',
    '.stage{padding:0 16px}',
    '.slide{padding:0 40px}',
    '.inner{padding:22px 0}',
    '.text{font-size:15px}',
    '.ph{height:84px}.n1 .ph{height:100px}',
    '.arrow{width:34px;height:34px;margin-top:-17px}.arrow svg{width:20px;height:20px}',
    '.arrow.prev{left:0}.arrow.next{right:0}',
    '.sum-top{font-size:16px}}',

    '@media (prefers-reduced-motion:reduce){.viewport,.slide,.slide.near,.ph img,.dot{transition:none!important}}'
  ].join('');

  /* ---------- build ---------- */

  function mount(o, data, container) {
    var disposed = false;
    var observers = [];
    var biz = data.business || {};
    var rating = Number(biz.rating) || 5;
    var total = Number(biz.total) || (data.reviews || []).length;
    var reviews = (data.reviews || [])
      .filter(function (r) { return (Number(r.rating) || 5) >= o.minRating; })
      .slice(0, o.maxReviews);
    var n = reviews.length;
    if (!n) return;

    var host = document.createElement('div');
    container.appendChild(host);
    var root = host.attachShadow({ mode: 'open' });
    var style = document.createElement('style');
    style.textContent = CSS;
    root.appendChild(style);

    var wrap = h('section', 'rb');
    wrap.style.setProperty('--accent', o.accent);
    wrap.setAttribute('aria-roledescription', 'carousel');
    wrap.setAttribute('aria-label', 'Customer reviews from Google');
    root.appendChild(wrap);

    if (o.title) wrap.appendChild(h('h2', 'title', o.title));

    var stage = h('div', 'stage');
    var viewport = h('div', 'viewport');
    var prev = h('button', 'arrow prev');
    var next = h('button', 'arrow next');
    prev.type = next.type = 'button';
    prev.setAttribute('aria-label', 'Previous review');
    next.setAttribute('aria-label', 'Next review');
    prev.innerHTML = CHEV_L;
    next.innerHTML = CHEV_R;

    var slides = [];
    var lightboxSets = [];

    reviews.forEach(function (r, i) {
      var name = r.author || 'Google user';
      var slide = h('article', 'slide');
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', (i + 1) + ' of ' + n);
      var s = h('div', 'inner');
      slide.appendChild(s);
      slide._inner = s;

      s.appendChild(stars(Number(r.rating) || 5, 22));

      if (r.text) {
        var p = h('p', 'text clamped', r.text);
        var more = h('button', 'more', 'Read more');
        more.type = 'button';
        more.hidden = true;
        more.setAttribute('aria-expanded', 'false');
        more.addEventListener('click', function () {
          var open = p.classList.toggle('clamped') === false;
          more.textContent = open ? 'Show less' : 'Read more';
          more.setAttribute('aria-expanded', String(open));
          p._expanded = open;
          stopAutoplay();
        });
        p._more = more;
        slide._text = p;
        s.appendChild(p);
        s.appendChild(more);
      }

      var photos = (r.photos || []).filter(Boolean);
      if (photos.length) {
        var shown = Math.min(photos.length, 3);
        var grid = h('div', 'photos n' + shown);
        photos.slice(0, shown).forEach(function (u, k) {
          var b = h('button', 'ph');
          b.type = 'button';
          b.setAttribute('aria-label', 'View photo ' + (k + 1) + ' of ' + photos.length + ' from ' + name);
          var im = document.createElement('img');
          im.src = photoUrl(u, 700, 500);
          im.alt = 'Photo shared by ' + name + ' in their review';
          im.loading = 'lazy';
          im.referrerPolicy = 'no-referrer';
          im.addEventListener('error', function () { b.style.display = 'none'; });
          b.appendChild(im);
          if (k === shown - 1 && photos.length > shown) {
            b.appendChild(h('span', 'count', '+' + (photos.length - shown)));
          }
          b.addEventListener('click', function () { openLightbox(photos, k, b); });
          grid.appendChild(b);
        });
        s.appendChild(grid);
      }

      var author = h('div', 'author');
      var av = h('div', 'av');
      var circle = h('div', 'circle', initials(name));
      circle.style.background = colorFor(name);
      if (r.avatar) {
        var ai = document.createElement('img');
        ai.src = avatarUrl(r.avatar);
        ai.alt = '';
        ai.loading = 'lazy';
        ai.referrerPolicy = 'no-referrer';
        ai.addEventListener('error', function () { ai.remove(); });
        circle.appendChild(ai);
      }
      av.appendChild(circle);
      av.appendChild(gLogo('g-logo gb'));
      author.appendChild(av);

      var nm = h('div', 'name');
      nm.appendChild(h('span', null, name));
      var tick = h('span', 'tick');
      tick.setAttribute('role', 'img');
      tick.setAttribute('aria-label', 'Posted on Google');
      tick.title = 'Posted on Google';
      tick.innerHTML = TICK;
      nm.appendChild(tick);
      author.appendChild(nm);
      author.appendChild(h('div', 'when', r.date ? ago(r.date) : (r.when || '')));
      s.appendChild(author);

      slides.push(slide);
      viewport.appendChild(slide);
    });

    stage.appendChild(viewport);
    if (n > 1) { stage.appendChild(prev); stage.appendChild(next); }
    wrap.appendChild(stage);

    var dots = h('div', 'dots');
    if (n > 1) wrap.appendChild(dots);

    /* Google summary, below the reviews */
    var sum = h('a', 'summary');
    sum.href = biz.url || '#';
    sum.target = '_blank';
    sum.rel = 'noopener noreferrer';
    sum.setAttribute('aria-label', 'Google reviews: rated ' + rating + ' out of 5 from ' + number(total) + ' reviews. Opens Google Maps.');
    var top = h('div', 'sum-top');
    top.appendChild(gLogo('g-logo'));
    top.appendChild(h('span', null, 'Google Reviews'));
    sum.appendChild(top);
    var bottom = h('div', 'sum-bottom');
    bottom.appendChild(h('span', 'sum-score', String(rating)));
    bottom.appendChild(stars(rating, 20));
    bottom.appendChild(h('span', 'sum-count', '(' + number(total) + ' reviews)'));
    sum.appendChild(bottom);
    wrap.appendChild(sum);

    /* photo viewer */
    var lb = h('div', 'lb');
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Review photo');
    var lbImg = document.createElement('img');
    lbImg.alt = 'Review photo';
    lbImg.referrerPolicy = 'no-referrer';
    var lbClose = h('button', 'lb-close');
    var lbPrev = h('button', 'lb-prev');
    var lbNext = h('button', 'lb-next');
    lbClose.type = lbPrev.type = lbNext.type = 'button';
    lbClose.setAttribute('aria-label', 'Close photo');
    lbPrev.setAttribute('aria-label', 'Previous photo');
    lbNext.setAttribute('aria-label', 'Next photo');
    lbClose.innerHTML = X_ICON;
    lbPrev.innerHTML = CHEV_L;
    lbNext.innerHTML = CHEV_R;
    lb.appendChild(lbImg);
    lb.appendChild(lbClose);
    lb.appendChild(lbPrev);
    lb.appendChild(lbNext);
    root.appendChild(lb);

    var lbSet = [], lbIndex = 0, lbOpener = null, lbOpen = false;
    function showLb() {
      lbImg.src = photoUrl(lbSet[lbIndex], 1600, 1200);
      var many = lbSet.length > 1;
      lbPrev.style.display = lbNext.style.display = many ? '' : 'none';
    }
    function openLightbox(set, index, opener) {
      lbSet = set; lbIndex = index; lbOpener = opener; lbOpen = true;
      showLb();
      lb.setAttribute('data-open', 'true');
      lbClose.focus();
    }
    function closeLightbox() {
      lbOpen = false;
      lb.removeAttribute('data-open');
      lbImg.removeAttribute('src');
      if (lbOpener) lbOpener.focus({ preventScroll: true });
    }
    lbClose.addEventListener('click', closeLightbox);
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
    lbPrev.addEventListener('click', function () { lbIndex = (lbIndex - 1 + lbSet.length) % lbSet.length; showLb(); });
    lbNext.addEventListener('click', function () { lbIndex = (lbIndex + 1) % lbSet.length; showLb(); });

    /* ---------- carousel behaviour ---------- */

    var active = 0;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function offsetFor(i) {
      var d = i - active, half = n / 2;
      if (d > half) d -= n;
      else if (d <= -half) d += n;
      return d;
    }

    /* The card keeps the height of the tallest review, so the page below never jumps while it rotates */
    function fit() {
      var tallest = 0;
      slides.forEach(function (s, i) {
        if (o.stableHeight || i === active) tallest = Math.max(tallest, s._inner.offsetHeight);
      });
      if (tallest) viewport.style.setProperty('--h', tallest + 'px');
    }

    function renderDots() {
      if (n < 2) return;
      dots.textContent = '';
      var max = 9;
      var start = 0, end = n;
      if (n > max) {
        start = Math.max(0, Math.min(active - Math.floor(max / 2), n - max));
        end = start + max;
      }
      for (var i = start; i < end; i++) {
        (function (idx) {
          var d = h('button', 'dot');
          d.type = 'button';
          d.setAttribute('aria-label', 'Go to review ' + (idx + 1));
          if (idx === active) d.setAttribute('aria-current', 'true');
          d.addEventListener('click', function () { go(idx, true); });
          dots.appendChild(d);
        })(i);
      }
    }

    function render() {
      slides.forEach(function (s, i) {
        var off = offsetFor(i);
        s.style.setProperty('--o', off);
        var near = Math.abs(off) <= 1;
        s.classList.toggle('near', near);
        var isActive = i === active;
        s.inert = !isActive;
        if (isActive) s.removeAttribute('aria-hidden'); else s.setAttribute('aria-hidden', 'true');
      });
      fit();
      renderDots();
    }

    function go(to, byUser) {
      active = ((to % n) + n) % n;
      render();
      if (byUser) stopAutoplay();
    }

    prev.addEventListener('click', function () { go(active - 1, true); });
    next.addEventListener('click', function () { go(active + 1, true); });

    wrap.addEventListener('keydown', function (e) {
      if (lbOpen) return;
      if (e.key === 'ArrowLeft') { go(active - 1, true); e.preventDefault(); }
      else if (e.key === 'ArrowRight') { go(active + 1, true); e.preventDefault(); }
    });
    function onLightboxKey(e) {
      if (!lbOpen) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft' && lbSet.length > 1) lbPrev.click();
      else if (e.key === 'ArrowRight' && lbSet.length > 1) lbNext.click();
    }
    document.addEventListener('keydown', onLightboxKey);

    /* swipe */
    var sx = null, sy = null;
    viewport.addEventListener('pointerdown', function (e) { sx = e.clientX; sy = e.clientY; });
    viewport.addEventListener('pointercancel', function () { sx = null; });
    viewport.addEventListener('pointerup', function (e) {
      if (sx == null) return;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      sx = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(active + (dx < 0 ? 1 : -1), true);
    });

    /* "Read more" only appears when the text is really cut off */
    function checkClamp() {
      if (disposed) return;
      slides.forEach(function (s) {
        var p = s._text;
        if (!p || p._expanded) return;
        p.classList.add('clamped');
        p._more.hidden = !(p.scrollHeight > p.clientHeight + 1);
      });
      fit();
    }

    /* autoplay: pauses on hover, focus, when off screen, and stops once the visitor takes control */
    var timer = null, stopped = false, hovering = false, onScreen = true;
    function stopAutoplay() {
      stopped = true;
      if (timer) { clearInterval(timer); timer = null; }
      viewport.setAttribute('aria-live', 'polite');
    }
    if (n > 1 && o.autoplay > 0 && !reduced) {
      viewport.setAttribute('aria-live', 'off');
      timer = setInterval(function () {
        if (stopped || hovering || !onScreen || document.hidden || lbOpen) return;
        go(active + 1, false);
      }, o.autoplay);
      wrap.addEventListener('mouseenter', function () { hovering = true; });
      wrap.addEventListener('mouseleave', function () { hovering = false; });
      wrap.addEventListener('focusin', function () { hovering = true; });
      wrap.addEventListener('focusout', function () { hovering = false; });
      if ('IntersectionObserver' in window) {
        var visibilityObserver = new IntersectionObserver(function (en) { onScreen = en[0].isIntersecting; }, { threshold: 0.3 });
        visibilityObserver.observe(wrap);
        observers.push(visibilityObserver);
      }
    }

    render();
    if ('ResizeObserver' in window) {
      var lastW = 0;
      var widthObserver = new ResizeObserver(function (entries) {
        var w = Math.round(entries[0].contentRect.width);
        if (w !== lastW) { lastW = w; checkClamp(); }
      });
      widthObserver.observe(viewport);
      observers.push(widthObserver);
      slides.forEach(function (s) {
        var slideObserver = new ResizeObserver(fit);
        slideObserver.observe(s._inner);
        observers.push(slideObserver);
      });
    }
    var frame = requestAnimationFrame(checkClamp);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(checkClamp);
    window.addEventListener('load', checkClamp);
    return function () {
      disposed = true;
      stopAutoplay();
      cancelAnimationFrame(frame);
      observers.forEach(function (observer) { observer.disconnect(); });
      document.removeEventListener('keydown', onLightboxKey);
      window.removeEventListener('load', checkClamp);
      host.remove();
    };
  }


export function mountReviews(container, data) {
  return mount(assign({}, DEFAULTS, { title: "What Our Customers Say", accent: "#850d19" }), data, container);
}
