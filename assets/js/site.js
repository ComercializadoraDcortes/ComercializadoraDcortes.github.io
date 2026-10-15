/* =====================================================================
   D'Cortés — lógica compartida: cotización, tarjetas, modal, utilidades
   ===================================================================== */
(function () {
  const DC = window.DC;
  const CFG = DC.CFG = {
    wa: '5212223569095',
    phones: ['222 356 9095', '222 255 5200'],
    iva: 0.16,
    storeKey: 'dcortes-cotizacion-v1'
  };
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  DC.$ = $; DC.$$ = $$;

  const BY_ID = {};
  DC.PRODUCTS.forEach(p => { BY_ID[p.id] = p; });
  DC.byId = (id) => BY_ID[id];
  DC.find = (name, brand) => DC.PRODUCTS.find(p => p.n === name && (!brand || p.brand === brand));
  DC.catName = (id) => (DC.CATS.find(c => c.id === id) || {}).n || '';

  // ---------- precios ----------
  const fmt = new Intl.NumberFormat('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  DC.money = (n) => '$' + fmt.format(n);
  DC.priceHTML = (n) => {
    if (n === null || n === undefined) return '<span class="ask">Consultar</span>';
    const [a, b] = fmt.format(n).split('.');
    return `<span class="price">$${a}<small>.${b}</small></span>`;
  };
  DC.priceOf = (p, vi) => {
    const v = p.v && p.v[vi];
    return v && v.p !== undefined ? v.p : p.p;
  };
  DC.variesPrice = (p) => p.v && new Set(p.v.map((v, i) => DC.priceOf(p, i))).size > 1;
  DC.swatchColor = (v) => v.c || v.cap || v.rim || v.ribbon || v.lidc || null;
  DC.imgFor = (p, vi) => {
    const v = p.v && p.v[vi];
    return (v && v.img) || p.img || DC.artURL(DC.specFor(p, v));
  };
  DC.label = (p, vi) => p.n + (p.v && p.v[vi] ? ` (${p.v[vi].l})` : '');
  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  DC.esc = esc;

  const ICON = {
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 2.4 1 2.9.8 3.4.7.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>'
  };
  DC.ICON = ICON;

  // ---------- almacenamiento seguro ----------
  const store = {
    get() { try { return JSON.parse(localStorage.getItem(CFG.storeKey)) || { items: [], name: '', notes: '' }; } catch (e) { return { items: [], name: '', notes: '' }; } },
    set(v) { try { localStorage.setItem(CFG.storeKey, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } }
  };
  let Q = store.get();
  Q.items = (Q.items || []).filter(it => BY_ID[it.id]);
  const save = () => { store.set(Q); renderQuote(); syncCards(); };

  DC.quote = {
    items: () => Q.items,
    count: () => Q.items.reduce((a, b) => a + b.q, 0),
    has: (id, vi) => Q.items.some(it => it.id === id && it.vi === vi),
    add(id, vi = 0, q = 1) {
      const it = Q.items.find(x => x.id === id && x.vi === vi);
      if (it) it.q += q; else Q.items.push({ id, vi, q });
      save();
      const b = $('.quote-btn'); if (b) { b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); }
      toast(`Agregado: ${DC.label(BY_ID[id], vi)}`, 'Ver cotización', openDrawer);
    },
    setQty(id, vi, q) {
      const it = Q.items.find(x => x.id === id && x.vi === vi); if (!it) return;
      it.q = Math.max(0, Math.min(9999, q | 0));
      if (!it.q) Q.items = Q.items.filter(x => x !== it);
      save();
    },
    clear() { Q.items = []; save(); }
  };

  // ---------- toast ----------
  let tt;
  function toast(msg, action, fn) {
    let t = $('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.innerHTML = `<span>${esc(msg)}</span>${action ? `<button type="button">${esc(action)}</button>` : ''}`;
    if (action) $('button', t).onclick = () => { t.classList.remove('show'); fn(); };
    t.classList.add('show');
    clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 3200);
  }
  DC.toast = toast;

  // ---------- tarjeta de producto ----------
  DC.card = (p) => {
    const el = document.createElement('article');
    el.className = 'card';
    el.dataset.id = p.id;
    let vi = 0;
    const hasV = p.v && p.v.length;
    const colored = hasV && p.v.some(v => DC.swatchColor(v) || v.l === 'Tornasol color');
    let vHTML = '';
    if (hasV && colored) {
      vHTML = `<div class="swatches" role="group" aria-label="Colores">${p.v.slice(0, 9).map((v, i) => {
        const c = DC.swatchColor(v);
        return `<button type="button" class="sw${v.l === 'Tornasol color' ? ' rb' : ''}" style="${c ? `background:${c}` : ''}" aria-pressed="${i === 0}" data-vi="${i}" title="${esc(v.l)}"><span class="sr-only">${esc(v.l)}</span></button>`;
      }).join('')}${p.v.length > 9 ? `<span class="more-v">+${p.v.length - 9}</span>` : ''}</div>`;
    } else if (hasV) {
      vHTML = `<div class="pills" role="group" aria-label="Opciones">${p.v.slice(0, 4).map((v, i) => `<button type="button" class="pill" aria-pressed="${i === 0}" data-vi="${i}">${esc(v.l)}</button>`).join('')}${p.v.length > 4 ? `<span class="more-v">+${p.v.length - 4} más</span>` : ''}</div>`;
    }
    const badge = p.brand ? `<span class="card-badge">${esc(p.brand)}</span>` : p.top ? '<span class="card-badge top">Más pedido</span>' : '';
    el.innerHTML = `
      <button type="button" class="card-art" aria-label="Ver detalles de ${esc(p.n)}">${badge}<img ${p.img ? 'loading="lazy" ' : ''}decoding="async" alt="" src="${DC.imgFor(p, 0)}"></button>
      <div class="card-body">
        <h3 class="card-name"><button type="button">${esc(p.n)}</button></h3>
        ${vHTML}
        <div class="card-foot">
          <div><span class="pv">${DC.priceHTML(DC.priceOf(p, 0))}</span><span class="note">${p.p !== null || DC.priceOf(p, 0) !== null ? (p.u ? `por ${esc(p.u)}, ` : '') + 'más IVA' : 'Te lo cotizamos'}</span></div>
          <button type="button" class="add" aria-label="Agregar ${esc(p.n)} a la cotización">${ICON.plus}<span>Agregar</span></button>
        </div>
      </div>`;
    const img = $('.card-art img', el), pv = $('.pv', el), add = $('.add', el);
    const setV = (i) => {
      vi = i;
      $$('[data-vi]', el).forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.vi === i)));
      img.src = DC.imgFor(p, i);
      pv.innerHTML = DC.priceHTML(DC.priceOf(p, i));
      sync();
    };
    const sync = () => {
      const inQ = DC.quote.has(p.id, vi);
      add.classList.toggle('in', inQ);
      add.innerHTML = inQ ? `${ICON.check}<span>En cotización</span>` : `${ICON.plus}<span>Agregar</span>`;
    };
    el._sync = sync;
    $$('[data-vi]', el).forEach(b => b.addEventListener('click', () => setV(+b.dataset.vi)));
    add.addEventListener('click', () => { if (DC.quote.has(p.id, vi)) openDrawer(); else DC.quote.add(p.id, vi); });
    const open = () => openModal(p, vi);
    $('.card-art', el).addEventListener('click', open);
    $('.card-name button', el).addEventListener('click', open);
    sync();
    return el;
  };
  function syncCards() { $$('.card').forEach(c => c._sync && c._sync()); }

  // ---------- modal de producto ----------
  let modal, lastFocus;
  function ensureModal() {
    if (modal) return modal;
    modal = document.createElement('div');
    modal.className = 'modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'm-title');
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    return modal;
  }
  function openModal(p, vi = 0) {
    ensureModal();
    const tst = $('.toast'); if (tst) tst.classList.remove('show');
    lastFocus = document.activeElement;
    let q = 1;
    const hasV = p.v && p.v.length;
    const render = () => {
      const price = DC.priceOf(p, vi);
      const inQ = DC.quote.has(p.id, vi);
      modal.innerHTML = `<div class="modal-box"><span class="grab" aria-hidden="true"></span>
        <div class="modal-art"><img alt="${esc(DC.label(p, vi))}" src="${DC.imgFor(p, vi)}"></div>
        <div class="modal-info">
          <button type="button" class="x" data-close aria-label="Cerrar">${ICON.x}</button>
          <p class="kicker">${esc(DC.catName(p.cat))}${p.brand ? ` / ${esc(p.brand)}` : ''}</p>
          <h2 class="d3" id="m-title">${esc(p.n)}</h2>
          <p class="muted" style="margin:0">${esc(p.d || '')}</p>
          <div>${DC.priceHTML(price)}<div class="fine" style="margin-top:6px">${price !== null ? (p.u ? `Precio por ${esc(p.u)}, ` : 'Precio por pieza, ') + 'más IVA. Sin impresión.' : 'Escríbenos y te damos el precio del día.'}</div></div>
          ${hasV ? `<div><div class="opt-label">${p.v.some(v => DC.swatchColor(v)) ? 'Color' : 'Opción'}: ${esc(p.v[vi].l)}</div><div class="opts">${p.v.map((v, i) => {
            const c = DC.swatchColor(v);
            const pr = DC.variesPrice(p) && DC.priceOf(p, i) !== null ? `<small>${DC.money(DC.priceOf(p, i))}</small>` : '';
            return `<button type="button" class="opt" data-vi="${i}" aria-pressed="${i === vi}">${c ? `<i style="background:${c}"></i>` : v.l === 'Tornasol color' ? '<i style="background:conic-gradient(#ff6fb1,#ffd84a,#5ee0b0,#55a6ff,#b56bff,#ff6fb1)"></i>' : ''}${esc(v.l)}${pr}</button>`;
          }).join('')}</div></div>` : ''}
          <div class="modal-actions">
            <div class="stepper" aria-label="Cantidad"><button type="button" data-q="-1" aria-label="Menos">−</button><input type="number" min="1" value="${q}" aria-label="Cantidad" inputmode="numeric"><button type="button" data-q="1" aria-label="Más">+</button></div>
            <button type="button" class="btn btn-ink" data-add>${inQ ? 'Sumar a la cotización' : 'Agregar a la cotización'}</button>
            <a class="btn btn-ghost" target="_blank" rel="noopener" href="https://wa.me/${CFG.wa}?text=${encodeURIComponent(`Hola, me interesa: ${DC.label(p, vi)}. ¿Tienen disponible?`)}">${ICON.wa}Preguntar</a>
          </div>
          <p class="modal-fine">Precios sujetos a cambio y disponibilidad. Mayoreo: pregunta por precio por caja.</p>
        </div></div>`;
      $$('[data-vi]', modal).forEach(b => b.onclick = () => { vi = +b.dataset.vi; render(); $(`[data-vi="${vi}"]`, modal).focus(); });
      const inp = $('input', modal);
      inp.oninput = () => { q = Math.max(1, inp.value | 0); };
      $$('[data-q]', modal).forEach(b => b.onclick = () => { q = Math.max(1, q + (+b.dataset.q)); inp.value = q; });
      $('[data-add]', modal).onclick = () => { DC.quote.add(p.id, vi, q); closeModal(); };
      $('[data-close]', modal).onclick = closeModal;
    };
    render();
    document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(() => modal.classList.add('open'));
    $('[data-close]', modal).focus();
    try { history.replaceState(null, '', '#p=' + p.id); } catch (e) {}
  }
  function closeModal() {
    if (!modal || !modal.classList.contains('open')) return;
    modal.classList.remove('open');
    document.documentElement.style.overflow = '';
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    if (lastFocus) lastFocus.focus();
  }
  DC.openModal = openModal;

  // ---------- cotización (drawer) ----------
  let drawer, scrim;
  function buildDrawer() {
    scrim = document.createElement('div'); scrim.className = 'scrim';
    drawer = document.createElement('aside'); drawer.className = 'drawer';
    drawer.setAttribute('aria-label', 'Tu cotización'); drawer.setAttribute('role', 'dialog'); drawer.setAttribute('aria-modal', 'true');
    drawer.innerHTML = `<div class="drawer-hd"><h2>Tu cotización</h2><button type="button" class="x" aria-label="Cerrar">${ICON.x}</button></div>
      <div class="drawer-list"></div>
      <div class="drawer-ft"></div>`;
    document.body.append(scrim, drawer);
    scrim.onclick = closeDrawer;
    $('.x', drawer).onclick = closeDrawer;
    drawer.inert = true;
  }
  function openDrawer() {
    closeModal();
    const tst = $('.toast'); if (tst) tst.classList.remove('show');
    renderQuote();
    lastFocus = document.activeElement;
    drawer.inert = false;
    drawer.classList.add('open'); scrim.classList.add('open');
    document.documentElement.style.overflow = 'hidden';
    $('.x', drawer).focus();
  }
  function closeDrawer() {
    if (!drawer.classList.contains('open')) return;
    drawer.classList.remove('open'); scrim.classList.remove('open');
    drawer.inert = true;
    document.documentElement.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  DC.openDrawer = openDrawer;

  function totals() {
    let sub = 0, pending = 0;
    Q.items.forEach(it => { const pr = DC.priceOf(BY_ID[it.id], it.vi); if (pr === null || pr === undefined) pending++; else sub += pr * it.q; });
    return { sub, iva: sub * CFG.iva, tot: sub * (1 + CFG.iva), pending };
  }
  function waMessage() {
    const t = totals();
    const lines = ['Hola, quiero cotizar en Comercializadora D\'Cortés:', ''];
    Q.items.forEach(it => {
      const p = BY_ID[it.id], pr = DC.priceOf(p, it.vi);
      lines.push(`• ${it.q} × ${DC.label(p, it.vi)}${p.brand ? ' [' + p.brand + ']' : ''} — ${pr !== null && pr !== undefined ? DC.money(pr) + (p.u ? ' por ' + p.u : ' c/u') : 'precio por confirmar'}`);
    });
    lines.push('', `Subtotal: ${DC.money(t.sub)} + IVA (${DC.money(t.iva)}) = ${DC.money(t.tot)}`);
    if (t.pending) lines.push(`${t.pending} producto(s) con precio por confirmar.`);
    if (Q.name) lines.push('', `Nombre: ${Q.name}`);
    if (Q.notes) lines.push(`Notas: ${Q.notes}`);
    lines.push('', '¿Me confirman existencias y total?');
    return lines.join('\n');
  }
  function renderQuote() {
    $$('.quote-count').forEach(c => { const n = DC.quote.count(); c.textContent = n; c.dataset.n = n; });
    if (!drawer) return;
    const list = $('.drawer-list', drawer), ft = $('.drawer-ft', drawer);
    if (!Q.items.length) {
      list.innerHTML = `<div class="drawer-empty"><img alt="" src="${DC.artURL({ k: 'box' })}"><p><b style="color:var(--ink)">Tu cotización está vacía.</b><br>Agrega productos desde el catálogo y envíanos la lista por WhatsApp para confirmar existencias.</p><a class="btn btn-ink" href="catalogo.html">Ir al catálogo</a></div>`;
      ft.hidden = true; return;
    }
    ft.hidden = false;
    list.innerHTML = Q.items.map(it => {
      const p = BY_ID[it.id], pr = DC.priceOf(p, it.vi);
      return `<div class="qi" data-id="${p.id}" data-vi="${it.vi}"><img alt="" src="${DC.imgFor(p, it.vi)}"><div><b>${esc(p.n)}</b><small>${p.v && p.v[it.vi] ? esc(p.v[it.vi].l) + ' / ' : ''}${pr !== null && pr !== undefined ? DC.money(pr) + (p.u ? ' por ' + esc(p.u) : ' c/u') : 'Por confirmar'}</small></div>
        <div class="qi-side">${pr !== null && pr !== undefined ? `<span class="price">${DC.money(pr * it.q)}</span>` : ''}<div class="stepper"><button type="button" data-d="-1" aria-label="Menos">−</button><input type="number" min="0" value="${it.q}" aria-label="Cantidad de ${esc(p.n)}"><button type="button" data-d="1" aria-label="Más">+</button></div></div></div>`;
    }).join('');
    $$('.qi', list).forEach(row => {
      const id = row.dataset.id, vi = +row.dataset.vi, inp = $('input', row);
      $$('[data-d]', row).forEach(b => b.onclick = () => DC.quote.setQty(id, vi, (+inp.value) + (+b.dataset.d)));
      inp.onchange = () => DC.quote.setQty(id, vi, +inp.value);
    });
    const t = totals();
    ft.innerHTML = `<div class="sum"><div><span>Subtotal</span><span>${DC.money(t.sub)}</span></div><div class="muted"><span>IVA 16%</span><span>${DC.money(t.iva)}</span></div><div class="tot"><span>Total estimado</span><span>${DC.money(t.tot)}</span></div>${t.pending ? `<div class="fine">${t.pending} producto(s) sin precio publicado; te lo confirmamos.</div>` : ''}</div>
      <label class="field">Tu nombre (opcional)<input type="text" id="q-name" autocomplete="name" value="${esc(Q.name || '')}"></label>
      <label class="field">Notas (opcional)<textarea id="q-notes" rows="2" placeholder="Ej. lo recojo el sábado, necesito factura">${esc(Q.notes || '')}</textarea></label>
      <a class="btn btn-wa" id="q-send" target="_blank" rel="noopener" href="#">${ICON.wa}Enviar cotización por WhatsApp</a>
      <button type="button" class="clear-btn" id="q-clear">Vaciar cotización</button>`;
    $('#q-name').oninput = (e) => { Q.name = e.target.value; store.set(Q); };
    $('#q-notes').oninput = (e) => { Q.notes = e.target.value; store.set(Q); };
    $('#q-send').onclick = (e) => { e.currentTarget.href = `https://wa.me/${CFG.wa}?text=${encodeURIComponent(waMessage())}`; };
    $('#q-clear').onclick = () => { if (confirm('¿Vaciar la cotización?')) DC.quote.clear(); };
  }

  // ---------- barra inferior tipo app (teléfono) ----------
  function buildTabbar() {
    const path = location.pathname;
    const isCat = /catalogo/.test(path), isHome = !isCat && !/404/.test(document.title);
    const nav = document.createElement('nav');
    nav.className = 'tabbar'; nav.setAttribute('aria-label', 'Accesos rápidos');
    const base = /404/.test(document.title) ? '/' : '';
    nav.innerHTML = `
      <a href="${base || './'}" ${isHome ? 'aria-current="page"' : ''}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 10.5 12 4l8 6.5V20h-5.5v-5.5h-5V20H4z"/></svg>Inicio</a>
      <a href="${base}catalogo.html" ${isCat ? 'aria-current="page"' : ''}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/></svg>Catálogo</a>
      <button type="button" data-open-quote><span class="tb-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M6 7h12l-1 13H7L6 7z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg><span class="quote-count" data-n="0">0</span></span>Cotización</button>
      <a href="https://wa.me/${CFG.wa}" target="_blank" rel="noopener" class="tb-wa">${ICON.wa}WhatsApp</a>`;
    document.body.appendChild(nav);
  }

  // ---------- arranque común ----------
  document.addEventListener('DOMContentLoaded', () => {
    buildTabbar();
    buildDrawer();
    renderQuote();
    $$('[data-open-quote]').forEach(b => b.addEventListener('click', openDrawer));
    const hdr = $('.hdr');
    const onScroll = () => hdr && hdr.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    const mb = $('.menu-btn'), nav = $('.nav');
    if (mb) mb.addEventListener('click', () => { const o = nav.classList.toggle('open'); mb.setAttribute('aria-expanded', String(o)); });
    $$('.nav a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); mb && mb.setAttribute('aria-expanded', 'false'); }));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeModal(); closeDrawer(); } });
    $$('[data-copy]').forEach(b => b.addEventListener('click', async () => {
      const v = b.dataset.copy.replace(/\s/g, '');
      try { await navigator.clipboard.writeText(v); } catch (err) {
        const ta = document.createElement('textarea'); ta.value = v; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (e2) {} ta.remove();
      }
      const old = b.innerHTML; b.classList.add('ok'); b.innerHTML = `${ICON.check}Copiado`;
      setTimeout(() => { b.classList.remove('ok'); b.innerHTML = old; }, 1600);
    }));
    $$('[data-year]').forEach(e => { e.textContent = new Date().getFullYear(); });
    const m = location.hash.match(/^#p=(.+)$/);
    if (m && BY_ID[m[1]]) openModal(BY_ID[m[1]]);
  });
})();
