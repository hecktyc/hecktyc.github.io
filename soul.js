/* Draws the soul page from soul-data.js. You should not need to edit this file. */
(function () {
  var DATA = window.SOUL || { types: {}, items: [] };
  var types = DATA.types || {};
  var typeKeys = Object.keys(types);

  var ICONS = {
    song:  '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    movie: '<rect x="2" y="2" width="20" height="20" rx="2.2"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5"/>',
    anime: '<polygon points="12 2 15.1 8.3 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 8.9 8.3 12 2"/>',
    other: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/>'
  };

  var items = (DATA.items || []).map(function (it, i) {
    var r = parseFloat(it.rating);
    return {
      order: i,
      type: String(it.type || ''),
      title: String(it.title || 'Untitled'),
      by: it.by ? String(it.by) : '',
      year: it.year ? String(it.year) : '',
      rating: isNaN(r) ? null : Math.min(10, Math.max(0, r)),
      note: it.note ? String(it.note) : '',
      link: /^(https?:\/\/|[\w./-]+\.html)/i.test(it.link || '') ? it.link : '',
      cover: it.cover ? String(it.cover) : '',
      added: it.added ? String(it.added) : ''
    };
  });

  var state = { type: 'all', sort: 'new', q: '' };
  var elFilters = document.getElementById('filters');
  var elSort = document.getElementById('sort');
  var elQ = document.getElementById('q');
  var elStats = document.getElementById('stats');
  var elGrid = document.getElementById('grid');

  function svg(key) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[key] || ICONS.other) + '</svg>';
  }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }
  function fmt(r) { return (Math.round(r * 10) / 10).toString(); }
  function label(key) { return (types[key] && types[key].label) || key; }

  /* ---------- filter buttons ---------- */
  function buildFilters() {
    elFilters.textContent = '';
    ['all'].concat(typeKeys).forEach(function (key) {
      var count = key === 'all' ? items.length : items.filter(function (it) { return it.type === key; }).length;
      var b = el('button', 'chip', (key === 'all' ? 'all' : label(key)) + ' ');
      b.type = 'button';
      b.dataset.type = key;
      b.appendChild(el('span', 'count', String(count)));
      b.setAttribute('aria-pressed', String(state.type === key));
      b.addEventListener('click', function () { setType(key); });
      elFilters.appendChild(b);
    });
  }
  function setType(key) {
    state.type = key;
    try { history.replaceState(null, '', key === 'all' ? location.pathname + location.search : '#' + key); } catch (e) {}
    Array.prototype.forEach.call(elFilters.children, function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.type === key));
    });
    render();
  }

  /* ---------- cards ---------- */
  function card(it) {
    var a = el('article', 'card');
    a.dataset.type = it.type;
    if (it.rating !== null && it.rating >= 10) a.dataset.top = '';

    var cover = el('div', 'cover');
    if (it.cover) {
      var img = new Image();
      img.src = it.cover; img.alt = ''; img.loading = 'lazy'; img.decoding = 'async';
      img.addEventListener('error', function () { img.remove(); cover.insertAdjacentHTML('afterbegin', '<div class="ph">' + svg(it.type) + '</div>'); });
      cover.appendChild(img);
    } else {
      cover.insertAdjacentHTML('afterbegin', '<div class="ph">' + svg(it.type) + '</div>');
    }
    var score = el('span', 'score', it.rating === null ? '–' : fmt(it.rating));
    score.style.setProperty('--p', it.rating === null ? 0 : it.rating * 10);
    score.title = it.rating === null ? 'not rated yet' : 'my rating: ' + fmt(it.rating) + ' / 10';
    cover.appendChild(score);
    a.appendChild(cover);

    var body = el('div', 'body');
    var h = el('h2', 't');
    if (it.link) {
      var l = el('a', '', it.title);
      l.href = it.link;
      if (/^https?:/i.test(it.link)) { l.target = '_blank'; l.rel = 'noopener noreferrer'; l.appendChild(el('span', 'ext', ' \u2197')); }
      h.appendChild(l);
    } else h.textContent = it.title;
    body.appendChild(h);

    var meta = [it.by, it.year, (types[it.type] && types[it.type].one) || it.type].filter(Boolean).join(' \u00b7 '); // "song", not "songs"
    body.appendChild(el('p', 'meta', meta));
    if (it.note) body.appendChild(el('p', 'note', it.note));
    a.appendChild(body);
    return a;
  }

  /* ---------- list ---------- */
  function sortFn() {
    return {
      new:  function (a, b) { return (b.added > a.added ? 1 : b.added < a.added ? -1 : a.order - b.order); }, // later date first; same day: higher in the file first
      top:  function (a, b) { return (b.rating === null ? -1 : b.rating) - (a.rating === null ? -1 : a.rating) || a.order - b.order; },
      az:   function (a, b) { return a.title.localeCompare(b.title) || a.order - b.order; },
      year: function (a, b) { return (parseInt(b.year, 10) || 0) - (parseInt(a.year, 10) || 0) || a.order - b.order; }
    }[state.sort];
  }
  function render() {
    var q = state.q.trim().toLowerCase();
    var list = items.filter(function (it) {
      return (state.type === 'all' || it.type === state.type) &&
             (!q || (it.title + ' ' + it.by + ' ' + it.note).toLowerCase().indexOf(q) > -1);
    }).sort(sortFn());

    elGrid.textContent = '';
    var frag = document.createDocumentFragment();
    list.forEach(function (it) { frag.appendChild(card(it)); });
    elGrid.appendChild(frag);

    var rated = list.filter(function (it) { return it.rating !== null; });
    var avg = rated.length ? fmt(rated.reduce(function (s, it) { return s + it.rating; }, 0) / rated.length) : '–';
    elStats.textContent = list.length
      ? list.length + (list.length === 1 ? ' title' : ' titles') + ' \u00b7 average rating ' + avg
      : 'Nothing here yet.';
  }

  /* ---------- start ---------- */
  var fromHash = location.hash.replace('#', '');
  if (typeKeys.indexOf(fromHash) > -1) state.type = fromHash;
  buildFilters();
  elSort.addEventListener('change', function () { state.sort = elSort.value; render(); });
  elQ.addEventListener('input', function () { state.q = elQ.value; render(); });
  render();
  window.addEventListener('hashchange', function () { // e.g. soul.html#anime typed or linked while the page is open
    var k = location.hash.replace('#', '');
    setType(typeKeys.indexOf(k) > -1 ? k : 'all');
  });
})();
