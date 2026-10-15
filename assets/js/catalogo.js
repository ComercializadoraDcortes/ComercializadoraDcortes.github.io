/* Catálogo: filtros, búsqueda, orden y URL compartible */
(function () {
  const DC = window.DC, $ = DC.$, $$ = DC.$$;
  const norm = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const params = new URLSearchParams(location.search);
  const S = { cat: params.get('cat') || '', q: params.get('q') || '', sort: params.get('orden') || '', brand: '' };
  if (S.cat && !DC.CATS.some(c => c.id === S.cat)) S.cat = '';

  // índice de búsqueda
  DC.PRODUCTS.forEach((p, i) => {
    p._i = i;
    p._h = norm([p.n, DC.catName(p.cat), p.d, p.brand, (p.v || []).map(v => v.l).join(' ')].join(' '));
  });
  const counts = {};
  DC.PRODUCTS.forEach(p => { counts[p.cat] = (counts[p.cat] || 0) + 1; });

  // categorías (lateral y chips móviles)
  const catList = [{ id: '', n: 'Todo el catálogo' }].concat(DC.CATS);
  $('#side').innerHTML = catList.map(c => `<li><button type="button" data-cat="${c.id}"><b style="font-weight:inherit">${DC.esc(c.n)}</b><span>${c.id ? counts[c.id] : DC.PRODUCTS.length}</span></button></li>`).join('');
  $('#mchips').innerHTML = catList.map(c => `<button type="button" data-cat="${c.id}">${DC.esc(c.id ? c.n : 'Todo')}</button>`).join('');
  $$('[data-cat]').forEach(b => b.addEventListener('click', () => { S.cat = b.dataset.cat; S.brand = ''; render(true); }));

  const qi = $('#q'), so = $('#sort');
  qi.value = S.q; so.value = S.sort;
  let t;
  qi.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => { S.q = qi.value.trim(); render(); }, 140); });
  so.addEventListener('change', () => { S.sort = so.value; render(); });

  function filtered() {
    const toks = norm(S.q).split(/\s+/).filter(Boolean);
    let list = DC.PRODUCTS.filter(p => (!S.cat || p.cat === S.cat) && toks.every(tk => p._h.includes(tk)));
    const brandsHere = [...new Set(list.map(p => p.brand).filter(Boolean))];
    if (S.brand) list = list.filter(p => p.brand === S.brand);
    const pr = (p) => { const v = DC.priceOf(p, 0); return v === null || v === undefined ? Infinity : v; };
    if (S.sort === 'asc') list.sort((a, b) => pr(a) - pr(b));
    else if (S.sort === 'desc') list.sort((a, b) => (pr(b) === Infinity ? -1 : pr(b)) - (pr(a) === Infinity ? -1 : pr(a)));
    else if (S.sort === 'az') list.sort((a, b) => a.n.localeCompare(b.n, 'es'));
    return { list, brandsHere };
  }

  function syncURL() {
    const u = new URLSearchParams();
    if (S.cat) u.set('cat', S.cat);
    if (S.q) u.set('q', S.q);
    if (S.sort) u.set('orden', S.sort);
    const s = u.toString();
    try { history.replaceState(null, '', location.pathname + (s ? '?' + s : '') + location.hash); } catch (e) {}
  }

  function render(scroll) {
    $$('[data-cat]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.cat === S.cat)));
    const active = $(`#mchips [data-cat="${S.cat}"]`);
    if (active && active.scrollIntoView) active.scrollIntoView({ block: 'nearest', inline: 'center' });
    const { list, brandsHere } = filtered();
    const out = $('#resultados');
    out.innerHTML = '';
    const catN = S.cat ? DC.catName(S.cat) : 'todo el catálogo';
    $('#count').textContent = list.length ? `${list.length} producto${list.length === 1 ? '' : 's'} en ${catN}${S.q ? ` para “${S.q}”` : ''}` : '';
    // marcas
    const br = $('#brands');
    br.innerHTML = S.cat && brandsHere.length > 1 ? ['', ...brandsHere].map(b => `<button type="button" class="pill" aria-pressed="${S.brand === b}" data-brand="${DC.esc(b)}">${b ? DC.esc(b) : 'Todas las marcas'}</button>`).join('') : '';
    $$('[data-brand]', br).forEach(b => b.onclick = () => { S.brand = b.dataset.brand; render(); });

    if (!list.length) {
      out.innerHTML = `<div class="empty"><img alt="" src="${DC.artURL({ k: 'mug', c: '#f6f6f3' })}"><h2>No encontramos “${DC.esc(S.q)}” ${S.cat ? 'en ' + DC.esc(DC.catName(S.cat)) : ''}</h2><p>Revisa la ortografía, busca en todo el catálogo o pregúntanos: si lo manejamos, te lo conseguimos.</p><div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><button type="button" class="btn btn-ink" id="reset">Ver todo el catálogo</button><a class="btn btn-wa" target="_blank" rel="noopener" href="https://wa.me/${DC.CFG.wa}?text=${encodeURIComponent('Hola, ¿manejan ' + S.q + '?')}">Preguntar por WhatsApp</a></div></div>`;
      $('#reset').onclick = () => { S.q = ''; S.cat = ''; qi.value = ''; render(); };
    } else if (!S.cat && !S.q && !S.sort) {
      DC.CATS.forEach(c => {
        const items = list.filter(p => p.cat === c.id);
        if (!items.length) return;
        const g = document.createElement('section');
        g.className = 'group';
        g.id = 'cat-' + c.id;
        g.innerHTML = `<div class="group-hd"><h2 class="d3">${DC.esc(c.n)}</h2><p>${items.length} productos</p></div><div class="grid"></div>`;
        const grid = $('.grid', g);
        items.forEach(p => grid.appendChild(DC.card(p)));
        out.appendChild(g);
      });
    } else {
      const grid = document.createElement('div');
      grid.className = 'grid';
      list.forEach(p => grid.appendChild(DC.card(p)));
      out.appendChild(grid);
    }
    syncURL();
    if (scroll) {
      const top = $('.layout').getBoundingClientRect().top + window.scrollY - ($('.toolbar').offsetHeight + $('.hdr').offsetHeight + 8);
      if (window.scrollY > top) window.scrollTo({ top, behavior: 'smooth' });
    }
  }
  render();
})();
