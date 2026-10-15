/* Página de inicio */
(function () {
  const DC = window.DC, $ = DC.$;

  // ---------- escenario del hero: la taza recibe el diseño ----------
  const base = DC.art({ k: 'mug' });
  const bands = ['#E5007D', '#FFD200', '#00A0DC', '#3657E8'];
  let print = '<clipPath id="mugBody"><path d="M74 72 L154 72 L154 168 Q154 176 146 176 L82 176 Q74 176 74 168 Z"/></clipPath><g clip-path="url(#mugBody)"><g class="print">';
  bands.forEach((c, i) => {
    const x0 = 72 + i * 21, x1 = x0 + 22;
    print += `<path d="M${x0} 70 C${x0 + 9} 98 ${x0 - 9} 136 ${x0 + 2} 180 L${x1 + 2} 180 C${x1 - 9} 136 ${x1 + 9} 98 ${x1} 70 Z" fill="${c}"/>`;
  });
  print += '<rect x="60" y="60" width="110" height="130" fill="url(#sh)" opacity=".85"/></g></g>';
  print += '<g class="heat"><rect x="58" y="66" width="112" height="116" rx="8" fill="#d9622b" opacity=".9"/><rect x="58" y="66" width="112" height="116" rx="8" fill="url(#sh)"/></g>';
  $('#stageMug').innerHTML = base.replace('</svg>', print + '</svg>');
  const side = DC.find('Vaso viajero 20 oz cónico');
  if (side) $('#stageSide').src = DC.imgFor(side, 1);

  $('#f-count').textContent = `${DC.PRODUCTS.length} productos`;

  // ---------- categorías ----------
  const pick = {
    tazas: ['Taza interior de color 11 oz', 1], cristal: ['Taza de cristal 11 oz degradado', 4], termos: ['Vaso viajero 20 oz cónico', 0],
    botellas: ['Botella aro 750 ml', 0], vasos: ['Tarro cervecero de color 16 oz', 0], textiles: ['Playera hombre y mujer', 0],
    gorras: ['Gorra de malla', 0], bolsas: ['Bolsa ecológica', 0], reconocimientos: ['Plato con filo 20 cm', 0],
    rompecabezas: ['Rompecabezas corazón metalizado', 0], sublimables: ['Llavero metálico', 0], oficina: ['Porta gafete gancho perico', 0],
    empaque: ['Bolsa kraft para taza con listón', 0], serigrafia: ['Herraje para botón 5.5 cm', 0], insumos: ['Tinta Color Make 1/8 L', 1],
    vinil: ['Vinil textil sublimable tornasol', 0], resistencias: ['Resistencia 11 oz', 0], maquinaria: ['Plancha plana 38 × 38 cm semiautomática Smart Heat', 0]
  };
  const counts = {};
  DC.PRODUCTS.forEach(p => { counts[p.cat] = (counts[p.cat] || 0) + 1; });
  $('#cats').innerHTML = DC.CATS.map(c => {
    const [n, vi] = pick[c.id] || [];
    const p = DC.find(n) || DC.PRODUCTS.find(x => x.cat === c.id);
    const big = c.id === 'tazas' ? ' big' : c.id === 'maquinaria' ? ' big kraft' : '';
    return `<a class="cat${big}" href="catalogo.html?cat=${c.id}"><span class="art"><img alt="" src="${DC.imgFor(p, vi || 0)}"></span><b>${DC.esc(c.n)}</b><small>${big ? DC.esc(c.s) + '. ' : ''}${counts[c.id]} productos</small></a>`;
  }).join('');

  // ---------- más pedidos ----------
  const rail = $('#rail');
  DC.PRODUCTS.filter(p => p.top).forEach(p => rail.appendChild(DC.card(p)));

  // ---------- kit ----------
  const kit = [
    [DC.find('Impresora Epson L1210 con tintas de sublimación'), 0, 1],
    [DC.find('Plancha para tazas', 'Importada'), 0, 1],
    [DC.find('Tinta Tinec 1/8 L'), 0, 1], [DC.find('Tinta Tinec 1/8 L'), 1, 1], [DC.find('Tinta Tinec 1/8 L'), 2, 1], [DC.find('Tinta Tinec 1/8 L'), 3, 1],
    [DC.find('Papel sublimación Tinec'), 0, 1],
    [DC.find('Cinta térmica 6 mm'), 0, 1]
  ].filter(k => k[0]);
  const ink = kit.filter(k => k[0].n === 'Tinta Tinec 1/8 L');
  const rows = [];
  let total = 0;
  kit.forEach(([p, vi, q]) => { total += DC.priceOf(p, vi) * q; });
  kit.filter(k => k[0].n !== 'Tinta Tinec 1/8 L').forEach(([p, vi]) => rows.push([p.n + (p.brand && p.brand !== 'Epson' ? ` (${p.brand})` : ''), DC.priceOf(p, vi)]));
  rows.splice(2, 0, ['Tinta Tinec 1/8 L, juego de 4 colores', ink.reduce((a, [p, vi]) => a + DC.priceOf(p, vi), 0)]);
  $('#kitList').innerHTML = rows.map(([n, pr]) => `<li><span>${DC.esc(n)}</span><span>${DC.money(pr)}</span></li>`).join('') + `<li class="total"><span>Total del kit</span><span>${DC.money(total)}</span></li>`;
  $('#kitAdd').addEventListener('click', () => { kit.forEach(([p, vi, q]) => DC.quote.add(p.id, vi, q)); DC.openDrawer(); });
  const ka = [[kit[0][0], 0], [kit[1][0], 0], [ink[0][0], 2]];
  $('#kitArt').innerHTML = ka.map(([p, vi]) => `<div><img alt="" src="${DC.imgFor(p, vi)}"></div>`).join('');
})();
