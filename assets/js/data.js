/* =====================================================================
   Catálogo Comercializadora D'Cortés
   Transcrito de la lista de precios impresa. Precios en MXN, más IVA,
   producto sin impresión. Para cambiar un precio, edita "p".
   Para usar una foto real: agrega  img:'images/productos/archivo.webp'
   (PNG/WebP con fondo transparente) y se mostrará en lugar del dibujo.
   ===================================================================== */
(function () {
  const C = {
    w: '#f6f6f3', blk: '#26262c', red: '#cc2f2f', blu: '#2457c5', pnk: '#ec6fa6',
    grn: '#2e9b52', lime: '#a6cf3b', yel: '#f6c533', org: '#f07c22', cob: '#1d3a9e',
    pur: '#7d4bb6', brn: '#7a4a2c', mint: '#93d8c3', wine: '#7a2238', gry: '#9aa1a8',
    slv: '#c9ced4', gld: '#d8b25a', rgd: '#e6a894', navy: '#1e2b4d', cyan: '#18a8d8',
    kraft: '#c49a6c', wood: '#9a6338'
  };

  const CATS = [
    { id: 'tazas', n: 'Tazas de cerámica', s: 'Blancas, mágicas, glitter, interior de color y más' },
    { id: 'cristal', n: 'Cristal y peltre', s: 'Tazas de cristal, peltre y luminiscentes' },
    { id: 'termos', n: 'Termos de acero', s: 'Vasos viajeros, latas térmicas y termos para láser' },
    { id: 'botellas', n: 'Cilindros y botellas', s: 'Latas, botellas deportivas y de aluminio' },
    { id: 'vasos', n: 'Vasos, tarros y tequileros', s: 'Cerveceros, meison, tequileros y vasos plásticos' },
    { id: 'textiles', n: 'Textiles', s: 'Playeras, pañaleros, fundas, servilletas y más' },
    { id: 'gorras', n: 'Gorras', s: 'Malla, gabardina, acrilán, safari y planas' },
    { id: 'bolsas', n: 'Bolsas y mandiles', s: 'Mandaderas, ecológicas, morrales y mandiles' },
    { id: 'reconocimientos', n: 'Reconocimientos', s: 'Placas, bases de madera, piedra y cristal' },
    { id: 'rompecabezas', n: 'Rompecabezas y MDF', s: 'Cartón, metalizados, MDF y portarretratos' },
    { id: 'sublimables', n: 'Pequeños sublimables', s: 'Llaveros, mouse pads, azulejos, lentejuelas' },
    { id: 'oficina', n: 'Oficina y credenciales', s: 'Carpetas, porta gafete, micas y bolígrafos' },
    { id: 'empaque', n: 'Empaque', s: 'Cajas de cartón sublimable y bolsas kraft' },
    { id: 'serigrafia', n: 'Serigrafía y botones', s: 'Herrajes, suajadoras, laminadoras y accesorios' },
    { id: 'insumos', n: 'Tintas y papel', s: 'Tinta de sublimación, papel, transfer y cintas' },
    { id: 'vinil', n: 'Vinil y banners', s: 'Vinil textil, transfer para rotular y banners' },
    { id: 'resistencias', n: 'Resistencias', s: 'Color Make, Tinec e importadas' },
    { id: 'maquinaria', n: 'Planchas e impresoras', s: 'Planchas de tazas, gorras, planas y combos' }
  ];

  const P = [];
  let cur = '';
  const cat = (id) => { cur = id; };
  // add(name, price, extra)
  const add = (n, p, x = {}) => P.push(Object.assign({ n, p, cat: cur }, x));
  const vv = (list) => list.map(([l, c, p]) => (p !== undefined ? { l, c, p } : { l, c }));

  /* ---------------- TAZAS DE CERÁMICA ---------------- */
  cat('tazas');
  add('Taza blanca AA 11 oz', null, { d: 'La taza clásica para sublimar, recubrimiento AA de alto brillo.', a: { k: 'mug' }, top: 1 });
  add('Taza blanca AA 11 oz Tinec', null, { d: 'Taza blanca 11 oz marca Tinec, recubrimiento AA.', a: { k: 'mug' } });
  add('Taza blanca 15 oz', 40, { d: 'Mayor capacidad para café americano.', a: { k: 'mug', tall: 1 } });
  add('Taza blanca base redonda 11 oz', 23, { d: 'Silueta con base redondeada.', a: { k: 'mug', round: 1 } });
  add('Taza blanca 6 oz', 22, { d: 'Taza chica para niños o espresso.', a: { k: 'mug', small: 1 }, v: vv([['Alta', null, 22], ['Corta', null, 25]]) });
  add('Taza 6 oz con plato blanco', 55, { d: 'Juego de taza chica con plato.', a: { k: 'mug', small: 1, saucer: 1 } });
  add('Taza mágica 11 oz', 35, { d: 'Negra al servir frío; revela el diseño con bebida caliente.', a: { k: 'mug', fin: 'matte' }, v: vv([['Negra', C.blk, 35], ['Roja', C.red, 45], ['Azul', C.blu, 45]]), top: 1 });
  add('Taza mágica glitter 11 oz', 46, { d: 'Mágica con acabado brillante tipo diamantina.', a: { k: 'mug', fin: 'glitter' }, v: vv([['Negra', C.blk], ['Roja', C.red], ['Azul', C.blu]]) });
  add('Taza mágica interior de color 11 oz', 60, { d: 'Mágica por fuera con interior en color.', a: { k: 'mug', fin: 'matte', in: C.red }, v: vv([['Negra', C.blk]]) });
  add('Taza mágica interior de color con cuchara', 80, { d: 'Mágica con interior de color y cuchara a juego.', a: { k: 'mug', fin: 'matte', in: C.blu, spoon: C.blu } });
  add('Taza mágica 3D 11 oz', 44, { d: 'Efecto mágico con textura en relieve.', a: { k: 'mug', fin: 'matte', heart: 1 }, v: vv([['Roja', C.red], ['Negra', C.blk], ['Azul', C.blu]]) });
  add('Taza mágica corazón 11 oz', 45, { d: 'Mágica con asa en forma de corazón.', a: { k: 'mug', fin: 'matte', heart: 1 }, v: vv([['Roja', C.red], ['Negra', C.blk], ['Azul', C.blu]]) });
  add('Cónica mágica 12 oz', 58, { d: 'Taza cónica con efecto mágico.', a: { k: 'conic', fin: 'matte' }, v: vv([['Azul', C.blu], ['Negra', C.blk], ['Roja', C.red]]) });
  add('Cónica mágica 17 oz negra', 60, { d: 'Cónica grande con efecto mágico.', a: { k: 'conic', fin: 'matte', tall: 1, c: C.blk } });
  add('Taza glitter 11 oz', 45, { d: 'Acabado glitter con zona blanca para sublimar.', a: { k: 'mug', fin: 'glitter' }, v: vv([['Rosa', C.pnk], ['Azul', C.blu], ['Plata', C.slv], ['Dorada', C.gld]]) });
  add('Taza glitter 11 oz combinada', 45, { d: 'Glitter en degradado de dos tonos.', a: { k: 'mug', fin: 'glitter', c: C.pnk, c2: C.cyan } });
  add('Taza ventana 11 oz', 40, { d: 'Taza de color con ventana blanca para el diseño.', a: { k: 'mug', win: 1 }, v: vv([['Negra', C.blk, 40], ['Roja', C.red, 45], ['Rosa', C.pnk, 45], ['Azul', C.blu, 45]]) });
  add('Taza neón 11 oz', 35, { d: 'Colores fluorescentes de alto impacto.', a: { k: 'mug' }, v: vv([['Rosa', '#ff4fa3'], ['Naranja', '#ff7a1a'], ['Amarilla', '#f2ec2e'], ['Verde', '#5ee04a']]) });
  add('Taza espejo 11 oz', 30, { d: 'Acabado metálico tipo espejo.', a: { k: 'mug', fin: 'metal' }, v: vv([['Plata', C.slv, 30], ['Oro', C.gld, 30], ['Rosa', C.pnk, 45], ['Azul', C.blu, 45], ['Oro rosado', C.rgd, 45]]) });
  add('Taza espejo combinada', 46, { d: 'Espejo en degradado de dos colores.', a: { k: 'mug', fin: 'metal', c: C.pnk, c2: C.blu } });
  add('Taza metálica tornasol 11 oz', 41, { d: 'Efecto arcoíris metálico.', a: { k: 'mug', fin: 'metal', rainbow: 1 }, v: vv([['Tornasol color', null], ['Blanca', C.w]]) });
  add('Taza aperlada 11 oz', 41, { d: 'Acabado perlado suave.', a: { k: 'mug', fin: 'pearl' }, v: vv([['Rosa', '#f2b8cf'], ['Azul', '#a9c8ee'], ['Plata', C.slv], ['Dorada', C.gld], ['Blanca', C.w]]) });
  add('Taza interior de color 11 oz', 26, { d: 'Blanca por fuera, interior y asa de color.', a: { k: 'mug', c: C.w, inh: 1 }, v: vv([['Rosa', C.pnk, 26], ['Azul', C.blu, 26], ['Verde limón', C.lime, 26], ['Verde bandera', C.grn, 26], ['Amarillo', C.yel, 26], ['Naranja', C.org, 26], ['Cobalto', C.cob, 26], ['Negro', C.blk, 26], ['Morada', C.pur, 36]]), top: 1 });
  add('Taza interior de color corazón 11 oz', 39, { d: 'Interior y asa corazón de color.', a: { k: 'mug', c: C.w, inh: 1, heart: 1 }, v: vv([['Roja', C.red], ['Negra', C.blk], ['Verde', C.grn], ['Azul', C.blu]]) });
  add('Taza corazón blanca 11 oz', 30, { d: 'Blanca con asa en forma de corazón.', a: { k: 'mug', heart: 1 } });
  add('Taza con tapa de silicón 11 oz', 51, { d: 'Incluye tapa y base de silicón de color.', a: { k: 'mug', lid: 1 }, v: vv([['Rosa', C.pnk], ['Negra', C.blk], ['Azul', C.blu], ['Roja', C.red]]) });
  add('Taza con cuchara semicónica 11 oz', 50, { d: 'Interior, asa y cuchara de color.', a: { k: 'mug', c: C.w, inh: 1, spoon: 1, round: 1 }, v: vv([['Rosa', C.pnk], ['Roja', C.red], ['Azul', C.blu], ['Negra', C.blk], ['Naranja', C.org], ['Verde', C.grn], ['Café', C.brn], ['Amarilla', C.yel], ['Cobalto', C.cob]]) });
  add('Taza con cuchara recta 11 oz', 40, { d: 'Cuchara recta a juego con el asa.', a: { k: 'mug', c: C.w, inh: 1, spoon: 1 }, v: vv([['Roja', C.red], ['Negra', C.blk], ['Blanca', C.w], ['Verde', C.grn]]) });
  add('Taza pareja 11 oz blanca', 74, { d: 'Par de tazas cuyas asas forman un corazón.', a: { k: 'pair' } });
  add('Taza pareja mágica 11 oz negra', 103, { d: 'Par de tazas mágicas con asas de corazón.', a: { k: 'pair', c: C.blk } });
  add('Taza cónica 12 oz blanca', 25, { d: 'Silueta cónica estilo latte.', a: { k: 'conic' } });
  add('Taza cónica 17 oz blanca', 37, { d: 'Cónica de mayor capacidad.', a: { k: 'conic', tall: 1 } });
  add('Taza cerámica tipo peltre 11 oz', 42, { d: 'Cerámica con look de peltre clásico.', a: { k: 'mug', camp: 1, rim: '#3a3a3a' } });

  /* ---------------- CRISTAL Y PELTRE ---------------- */
  cat('cristal');
  add('Taza de cristal 11 oz transparente', 34, { d: 'Cristal transparente sublimable.', a: { k: 'gmug' } });
  add('Taza de cristal 11 oz satinada', 30, { d: 'Cristal esmerilado de acabado mate.', a: { k: 'gmug', frost: 1 } });
  add('Taza de cristal 11 oz degradado', 40, { d: 'Cristal esmerilado con base de color.', a: { k: 'gmug', frost: 1 }, v: vv([['Roja', C.red], ['Rosa', C.pnk], ['Verde', C.grn], ['Amarillo', C.yel], ['Azul', C.blu]]) });
  add('Taza luminiscente 11 oz', 33, { d: 'Brilla en la oscuridad.', a: { k: 'mug', c: '#eef7d8', glow: 1 } });
  add('Taza de peltre 6 oz con filo', 31, { d: 'Peltre chico con filo de color.', a: { k: 'mug', camp: 1, small: 1 }, v: vv([['Rojo', C.red], ['Azul', C.blu], ['Negro', C.blk]]).map(x => ({ l: x.l, rim: x.c })) });
  add('Taza de peltre 11 oz con filo', 50, { d: 'Peltre clásico con filo de color.', a: { k: 'mug', camp: 1 }, v: vv([['Rojo', C.red], ['Azul', C.blu], ['Negro', C.blk]]).map(x => ({ l: x.l, rim: x.c })) });
  add('Taza de peltre 11 oz filo plata', 65, { d: 'Peltre con filo plateado.', a: { k: 'mug', camp: 1, rim: '#b9bec4' } });
  add('Taza mágica peltre glitter 11 oz', 55, { d: 'Peltre mágico con acabado glitter.', a: { k: 'mug', camp: 1, fin: 'glitter', rim: '#ddd' }, v: vv([['Roja', C.red], ['Azul', C.blu], ['Negra', C.blk]]) });

  /* ---------------- TERMOS ---------------- */
  cat('termos');
  add('Termo lata chica 300 ml', 108, { d: 'Lata térmica de acero, blanca o plata.', a: { k: 'can', lid: 1, short: 1 }, v: vv([['Blanca', C.w], ['Plata', C.slv]]) });
  add('Termo lata grande 500 ml', 132, { d: 'Lata térmica de acero, blanca o plata.', a: { k: 'can', lid: 1 }, v: vv([['Blanca', C.w], ['Plata', C.slv]]) });
  add('Taza viajera 16 oz', 100, { d: 'Taza térmica de acero con asa y tapa.', a: { k: 'travel' }, v: vv([['Blanca', C.w], ['Plata', C.slv]]) });
  add('Vaso viajero 20 oz', 153, { d: 'Tumbler recto de acero con tapa.', a: { k: 'tumbler' }, v: vv([['Blanco', C.w], ['Plata', C.slv]]), top: 1 });
  add('Vaso viajero 20 oz cónico', 155, { d: 'Tumbler cónico de acero con tapa.', a: { k: 'tumbler', conic: 1 }, v: vv([['Blanco', C.w], ['Plata', C.slv]]) });
  add('Botella lechera 500 ml', 133, { d: 'Botella térmica estilo lechera.', a: { k: 'bottle', s: 'milk' }, v: vv([['Blanca', C.w], ['Plata', C.slv]]) });
  add('Vaso de acero delgado 600 ml', 147, { d: 'Skinny tumbler con tapa y popote.', a: { k: 'tumbler', skinny: 1 } });
  add('Tarro de acero 20 oz', 184, { d: 'Tarro térmico de acero con asa.', a: { k: 'travel', big: 1 } });
  add('Vaso vinero de acero', 122, { d: 'Vaso térmico tipo copa sin tallo.', a: { k: 'wine' }, v: vv([['Plata', C.slv], ['Blanco', C.w]]) });
  add('Vaso de acero doble pared', 115, { d: 'Vaso de acero con tapa, doble pared.', a: { k: 'can', lid: 1, wide: 1 } });
  add('Vaso cónico 20 oz térmico para láser', 158, { d: 'Con pintura de color para grabado láser.', a: { k: 'tumbler', conic: 1, fin: 'matte' }, v: vv([['Menta', C.mint], ['Negro', C.blk], ['Vino', C.wine]]) });
  add('Vaso vinero 300 ml térmico para láser', 113, { d: 'Vinero de color para grabado láser.', a: { k: 'wine', fin: 'matte' }, v: vv([['Menta', C.mint], ['Negro', C.blk], ['Rosa', C.pnk]]) });

  /* ---------------- CILINDROS Y BOTELLAS ---------------- */
  cat('botellas');
  add('Lata económica chica 300 ml', 44, { d: 'Lata de aluminio, blanca o plata.', a: { k: 'can', short: 1 }, v: vv([['Blanca', C.w], ['Plata', C.slv]]) });
  add('Lata económica grande 500 ml', 56, { d: 'Lata de aluminio, blanca o plata.', a: { k: 'can' }, v: vv([['Blanca', C.w], ['Plata', C.slv]]) });
  add('Botella llavero 600 ml', 45, { d: 'Aluminio con tapa de mosquetón.', a: { k: 'bottle', s: 'clip' }, v: vv([['Blanca', C.w], ['Plata', C.slv]]), top: 1 });
  add('Botella llavero 750 ml', 55, { d: 'Aluminio con tapa de mosquetón.', a: { k: 'bottle', s: 'clip', tall: 1 }, v: vv([['Blanca', C.w], ['Plata', C.slv]]) });
  add('Botella tapa transparente 750 ml', 81, { d: 'Aluminio con tapa transparente.', a: { k: 'bottle', s: 'clear', tall: 1 }, v: vv([['Plata', C.slv], ['Blanca', C.w]]) });
  add('Botella niño 600 ml', 75, { d: 'Tapa deportiva de color.', a: { k: 'bottle', s: 'kid' }, v: vv([['Tapa roja', C.red], ['Tapa morada', C.pur], ['Tapa azul', C.blu], ['Tapa blanca', C.w]]).map(x => ({ l: x.l, cap: x.c })) });
  add('Botella aro 750 ml', 76, { d: 'Tapa con aro de color.', a: { k: 'bottle', s: 'ring', tall: 1 }, v: vv([['Aro azul', C.blu], ['Aro gris', C.gry], ['Aro naranja', C.org], ['Aro verde', C.grn]]).map(x => ({ l: x.l, cap: x.c })) });
  add('Botella de botón 750 ml', 76, { d: 'Blanca con tapa de botón de color.', a: { k: 'bottle', s: 'button', tall: 1 }, v: vv([['Negro', C.blk], ['Azul', C.blu], ['Rojo', C.red]]).map(x => ({ l: x.l, cap: x.c })) });
  add('Botella cuello de color 350 ml', 105, { d: 'Blanca o plata con cuello de color.', a: { k: 'bottle', s: 'neck', short: 1 }, v: vv([['Rosa', C.pnk], ['Azul', C.blu], ['Negro', C.blk]]).map(x => ({ l: x.l, cap: x.c })) });
  add('Botella tapa PET 750 ml', 96, { d: 'Blanca o plata con tapa PET.', a: { k: 'bottle', s: 'pet', tall: 1 }, v: vv([['Blanca', C.w], ['Plata', C.slv]]) });

  /* ---------------- VASOS, TARROS, TEQUILEROS ---------------- */
  cat('vasos');
  add('Tarro cervecero 16 oz', 61.5, { d: 'Tarro de vidrio sublimable. Por caja: $53.50 por pieza.', a: { k: 'beer' }, top: 1 });
  add('Tarro cervecero 22 oz', null, { d: 'Transparente y esmerilado.', a: { k: 'beer', big: 1 }, v: vv([['Transparente', null], ['Esmerilado', null]]).map(x => ({ l: x.l, frost: x.l === 'Esmerilado' })) });
  add('Tarro cervecero de color 16 oz', 63, { d: 'Esmerilado con base de color.', a: { k: 'beer', frost: 1, tint: C.blu } });
  add('Meison 500 ml esmerilado', 43, { d: 'Frasco tipo mason con tapa y popote.', a: { k: 'mason', frost: 1 } });
  add('Meison cuadrado', 25, { d: 'Frasco cuadrado con asa, para serigrafía.', a: { k: 'mason', square: 1 } });
  add('Vaso de cerámica 17 oz', 54, { d: 'Con tapa de silicón y cinta antiderrapante.', a: { k: 'cup', sleeve: 1 }, v: vv([['Con cinta', C.org, 54], ['Sin cinta', C.grn, 59]]).map(x => ({ l: x.l, p: x.p, lidc: x.c })) });
  add('Vaso plástico 17 oz', 90, { d: 'Vaso con tapa de color.', a: { k: 'cup', plastic: 1, lidc: C.lime } });
  add('Vaso plástico cafetero', 14, { d: 'Vaso plástico de color con tapa.', a: { k: 'pcup' }, v: vv([['Cafetero', C.blk, 14], ['Con popote', C.blu, 17], ['Con popote y glitter', C.pnk, 20]]) });
  add('Tequilero de cristal', 33, { d: 'Grande y chico.', a: { k: 'shot', glass: 1 }, v: vv([['Grande', null], ['Chico', null]]) });
  add('Tequilero de cerámica 2.5 oz', 26.5, { d: 'Cerámica con borde de color.', a: { k: 'shot', band: 1 }, v: vv([['Naranja', C.org], ['Azul', C.blu], ['Negro', C.blk], ['Amarillo', C.yel], ['Verde', C.grn], ['Rojo', C.red]]) });
  add('Tequilero glaseado interior de color', 23.5, { d: 'Cristal glaseado con interior de color.', a: { k: 'shot', glass: 1, frost: 1 }, v: vv([['Rojo', C.red], ['Rosa', C.pnk], ['Azul', C.blu], ['Verde', C.grn], ['Morado', C.pur]]) });

  /* ---------------- TEXTILES ---------------- */
  cat('textiles');
  add('Playera hombre y mujer', 68, { d: 'Poliéster para sublimar. Tallas CH, M, G y ExG.', a: { k: 'tee' }, v: vv([['CH', null], ['M', null], ['G', null], ['ExG', null]]), top: 1 });
  add('Playera niño', 50, { d: 'Tallas ExCH, CH, M, G y ExG.', a: { k: 'tee', kid: 1 }, v: vv([['ExCH', null], ['CH', null], ['M', null], ['G', null], ['ExG', null]]) });
  add('Pañalero', 50, { d: 'Tallas 3, 6, 9 y 12 meses.', a: { k: 'onesie' }, v: vv([['3 meses', null], ['6 meses', null], ['9 meses', null], ['12 meses', null]]) });
  add('Banda de edecán 14.5 × 180 cm', null, { d: 'Banda satinada sublimable.', a: { k: 'sash' } });
  add('Funda para cojín', 25, { d: 'Medida 43.5 × 28 cm.', a: { k: 'cushion' } });
  add('Funda para almohada', 50, { d: 'Medida 71.5 × 48.5 cm.', a: { k: 'cushion', wide: 1 } });
  add('Servilleta 45 × 45 cm', null, { d: 'Servilleta textil sublimable.', a: { k: 'napkin' } });
  add('Tortillero 22 cm', 16, { d: 'Tortillero de tela, 22 cm de diámetro.', a: { k: 'tortillero' } });
  add('Bandera 32 × 39.5 cm', 8, { d: 'Banderín textil sublimable.', a: { k: 'flag' } });
  add('Pantufla', 37, { d: 'Pantufla con empeine sublimable.', a: { k: 'slipper' } });

  /* ---------------- GORRAS ---------------- */
  cat('gorras');
  add('Gorra de malla', 23, { d: 'Tipo trucker, adulto y niño. Precio por pieza.', a: { k: 'cap', s: 'trucker', c: C.yel }, v: vv([['Adulto', null], ['Niño', null]]), top: 1 });
  add('Gorra de gabardina', 29, { d: 'Gabardina con frente sublimable.', a: { k: 'cap', c: C.grn } });
  add('Gorra de acrilán', 23, { d: 'Adulto y niño.', a: { k: 'cap', c: C.blu }, v: vv([['Adulto', null], ['Niño', null]]) });
  add('Gorro safari', 44, { d: 'Con o sin capa protectora.', a: { k: 'cap', s: 'safari', c: C.blk }, v: vv([['Sin capa', null, 44], ['Con capa', null, 49]]) });
  add('Gorra plana', 30, { d: 'Visera plana, acrilán o malla.', a: { k: 'cap', s: 'flat', c: C.blk, c2: C.red }, v: vv([['Acrilán', null], ['Malla', null]]) });
  add('Gorra con careta', 30, { d: 'Incluye careta protectora.', a: { k: 'cap', s: 'shield', c: C.blk } });

  /* ---------------- BOLSAS Y MANDILES ---------------- */
  cat('bolsas');
  add('Bolsa mandadera mediana', 18, { d: 'Medida 34 × 29 × 9 cm.', a: { k: 'bag', s: 'shopper', c: C.yel } });
  add('Bolsa mandadera grande', 20, { d: 'Medida 39 × 34 × 9 cm.', a: { k: 'bag', s: 'shopper', c: C.red } });
  add('Bolsa ecológica', 12, { d: 'Medida 40 × 36 × 18 cm, varios colores.', a: { k: 'bag', s: 'tote', c: C.grn }, v: vv([['Verde', C.grn], ['Azul', C.blu], ['Roja', C.red], ['Negra', C.blk], ['Naranja', C.org]]), top: 1 });
  add('Morral para sublimar', 22, { d: 'Medida 34 × 42 cm.', a: { k: 'bag', s: 'draw', c: C.yel } });
  add('Morral ecológico', 15, { d: 'Medida 34 × 42 cm.', a: { k: 'bag', s: 'draw', c: C.blu } });
  add('Morral dulcero ecológico', 8, { d: 'Medida 20.5 × 22 cm.', a: { k: 'bag', s: 'draw', c: C.grn, small: 1 } });
  add('Morral dulcero de manta', 15, { d: 'Medida 20.5 × 22 cm.', a: { k: 'bag', s: 'draw', c: '#efe6d2', small: 1 } });
  add('Mandil blanco borde de color', 30, { d: 'Blanco con ribete de color.', a: { k: 'apron', c: C.w, trim: C.red } });
  add('Mandil ecológico de color', 15, { d: 'Tela ecológica, varios colores.', a: { k: 'apron', c: C.org }, v: vv([['Naranja', C.org], ['Rojo', C.red], ['Azul', C.blu], ['Verde', C.grn], ['Amarillo', C.yel]]) });
  add('Mandil negro', 30, { d: 'Mandil negro con bolsa.', a: { k: 'apron', c: C.blk } });

  /* ---------------- RECONOCIMIENTOS ---------------- */
  cat('reconocimientos');
  add('Placa 20 × 30 cm', 30, { d: 'Aluminio sublimable blanco, oro o plata.', a: { k: 'plaque' }, v: vv([['Blanca', C.w], ['Oro', C.gld], ['Plata', C.slv]]) });
  add('Placa cepillada, espejo o glitter 20 × 30 cm', 35, { d: 'Acabados especiales.', a: { k: 'plaque', fin: 'metal' }, v: vv([['Cepillada', C.gld], ['Espejo', C.slv], ['Glitter', C.rgd]]) });
  add('Placa 40 × 60 cm', 120, { d: 'Formato grande blanco, oro o plata.', a: { k: 'plaque', big: 1 }, v: vv([['Blanca', C.w], ['Oro', C.gld], ['Plata', C.slv]]) });
  add('Placa cepillada, espejo o glitter 40 × 60 cm', 125, { d: 'Formato grande con acabados especiales.', a: { k: 'plaque', big: 1, fin: 'metal' }, v: vv([['Cepillada', C.gld], ['Espejo', C.slv], ['Glitter', C.rgd]]) });
  add('Base de madera', 110, { d: 'Base para placa.', a: { k: 'woodbase' }, v: vv([['33.5 × 24 cm', null, 110], ['66.6 × 44.7 cm', null, 350]]) });
  add('Base de madera negra 33.5 × 24 cm', 120, { d: 'Base para placa en negro.', a: { k: 'woodbase', c: '#2a2522' } });
  add('Piedra corazón 16 cm', 97, { d: 'Piedra sublimable con base.', a: { k: 'stone', heart: 1 } });
  add('Piedra mediana 30 × 15 × 2.7 cm', 110, { d: 'Piedra rectangular con base.', a: { k: 'stone' } });
  add('Piedra grande 30 × 19 × 2.7 cm', 140, { d: 'Piedra rectangular grande.', a: { k: 'stone', big: 1 } });
  add('Cristal octagonal 16 cm', 240, { d: 'Cristal sublimable con base.', a: { k: 'crystal', oct: 1 } });
  add('Cristal regular', 220, { d: 'Cristal rectangular con base.', a: { k: 'crystal' } });
  add('Plato con filo 20 cm', 85, { d: 'Plato sublimable con filo oro o plata.', a: { k: 'plate' }, v: vv([['Oro', C.gld], ['Plata', C.slv]]) });

  /* ---------------- ROMPECABEZAS Y MDF ---------------- */
  cat('rompecabezas');
  add('Rompecabezas cartón A4 blanco', 30, { d: '120 piezas.', a: { k: 'puzzle' }, v: vv([['Estándar', null, 30], ['Grueso', null, 35], ['Delgado', null, 17]]) });
  add('Rompecabezas cartón A3 blanco', 45, { d: '375 piezas.', a: { k: 'puzzle', big: 1 } });
  add('Rompecabezas cartón A5 blanco', 22, { d: 'Formato chico.', a: { k: 'puzzle', small: 1 } });
  add('Rompecabezas cartón A5 metalizado', 25, { d: '20.3 × 14.8 cm, 80 piezas.', a: { k: 'puzzle', small: 1, metal: 1 } });
  add('Rompecabezas cartón corazón', 35, { d: 'Rompecabezas en forma de corazón.', a: { k: 'puzzle', heart: 1 } });
  add('Rompecabezas corazón metalizado', 38, { d: '19.2 × 19.2 cm, 75 piezas.', a: { k: 'puzzle', heart: 1, metal: 1 } });
  add('Rompecabezas MDF corazón', 44, { d: '17.8 × 16.3 cm, 11 piezas.', a: { k: 'puzzle', heart: 1, mdf: 1 } });
  add('Rompecabezas MDF 4 piezas', 30, { d: '16 × 16 cm.', a: { k: 'puzzle', mdf: 1, few: 2 } });
  add('Rompecabezas MDF 6 piezas', 35, { d: 'Ideal para niños.', a: { k: 'puzzle', mdf: 1, few: 3 } });
  add('Rompecabezas MDF A4', 70, { d: '20 × 28.5 cm, 12 piezas.', a: { k: 'puzzle', mdf: 1, few: 4 } });
  add('Portarretrato MDF sublimable', 32, { d: 'Con soporte trasero.', a: { k: 'frame' }, v: vv([['15 × 20 cm', null, 32], ['20 × 25 cm', null, 54]]) });

  /* ---------------- PEQUEÑOS SUBLIMABLES ---------------- */
  cat('sublimables');
  add('Llavero MDF', 16, { d: 'Corazón, casa, playera, óvalo, círculo, cuadro, rectángulo, hexágono, hueso y placa.', a: { k: 'keychain', mdf: 1 }, v: vv([['Corazón', null], ['Casa', null], ['Playera', null], ['Óvalo', null], ['Círculo', null], ['Cuadro', null], ['Rectángulo', null], ['Hexágono', null], ['Hueso', null], ['Placa', null]]) });
  add('Llavero metálico', 25, { d: 'Corazón, rectángulo, escudo u óvalo.', a: { k: 'keychain' }, v: vv([['Corazón', null], ['Rectángulo', null], ['Escudo', null], ['Óvalo', null]]) });
  add('Mouse pad corazón', 22, { d: 'R = 20 cm.', a: { k: 'pad', s: 'heart' } });
  add('Mouse pad circular', 22, { d: 'R = 20 cm.', a: { k: 'pad', s: 'circle' } });
  add('Mouse pad rectangular', 16, { d: '21.7 × 18 cm.', a: { k: 'pad' }, v: vv([['Delgado', null, 16], ['Grueso', null, 22]]), top: 1 });
  add('Portavasos', 7, { d: 'Circular o rectangular de 10 cm.', a: { k: 'pad', s: 'coaster' } });
  add('Lentejuela circular', 30, { d: 'Parche de lentejuela reversible.', a: { k: 'sequin', s: 'circle' } });
  add('Lentejuela corazón', 30, { d: 'Parche de lentejuela reversible.', a: { k: 'sequin', s: 'heart' } });
  add('Lentejuela A4', 45, { d: 'Parche de lentejuela tamaño A4.', a: { k: 'sequin' } });
  add('Azulejo 10 × 10 cm', null, { d: 'Azulejo cerámico sublimable.', a: { k: 'tile', small: 1 } });
  add('Azulejo 15 × 15 cm', 21, { d: 'Azulejo cerámico sublimable.', a: { k: 'tile' } });
  add('Azulejo 20 × 30 cm', 75, { d: 'Azulejo cerámico sublimable.', a: { k: 'tile', big: 1 } });
  add('Alcancía de cerámica blanca', 50, { d: 'Alcancía sublimable.', a: { k: 'piggy' } });
  add('Destapador sublimable', 18.5, { d: 'Para botella y tarro.', a: { k: 'opener' } });

  /* ---------------- OFICINA Y CREDENCIALES ---------------- */
  cat('oficina');
  add('Carpeta carta curpiel', 80, { d: 'Negra, azul o vino.', a: { k: 'binder' }, v: vv([['Negra', C.blk], ['Azul', C.navy], ['Vino', C.wine]]) });
  add('Carpeta oficio curpiel', 90, { d: 'Negra, azul o vino.', a: { k: 'binder', tall: 1 }, v: vv([['Negra', C.blk], ['Azul', C.navy], ['Vino', C.wine]]) });
  add('Carpeta carta vinil', 60, { d: 'Negra, azul o vino.', a: { k: 'binder' }, v: vv([['Negra', C.blk], ['Azul', C.navy], ['Vino', C.wine]]) });
  add('Carpeta oficio vinil', 70, { d: 'Negra, azul o vino.', a: { k: 'binder', tall: 1 }, v: vv([['Negra', C.blk], ['Azul', C.navy], ['Vino', C.wine]]) });
  add('Porta boleta', 13, { d: 'Negra, azul, vino o verde.', a: { k: 'binder', thin: 1 }, v: vv([['Carta', C.navy, 13], ['Oficio', C.navy, 14]]) });
  add('Porta gafete gancho sencillo', 9, { d: 'Listón liso o con textura.', a: { k: 'lanyard', c: C.blk }, v: vv([['Listón liso', null, 9], ['Listón textura', null, 11]]) });
  add('Porta gafete gancho perico', 13, { d: 'Listón con textura.', a: { k: 'lanyard', c: C.grn } });
  add('Porta gafete final plástico', 18, { d: 'Terminación plástica.', a: { k: 'lanyard', c: C.cyan } });
  add('Porta gafete perico con broche', 25, { d: 'Con broche o broche para celular.', a: { k: 'lanyard', c: C.blu }, v: vv([['Broche', null], ['Broche celular', null]]) });
  add('Mica para credencial', 4, { d: 'Mica plástica protectora.', a: { k: 'card', clear: 1 } });
  add('Mica acrílico para credencial', 15, { d: 'Mica rígida de acrílico.', a: { k: 'card', clear: 1, thick: 1 } });
  add('Bolígrafo sublimable', 18, { d: 'Blanco o plata.', a: { k: 'pen' }, v: vv([['Blanco', C.w], ['Plata', C.slv]]) });
  add('Bolígrafo para serigrafía tipo Wearever', 2, { d: 'Bolígrafo económico de color.', a: { k: 'pen', c: C.blu, cheap: 1 } });

  /* ---------------- EMPAQUE ---------------- */
  cat('empaque');
  add('Caja para taza 11 oz económica', 4, { d: 'Caja de cartón sublimable.', a: { k: 'box' }, top: 1 });
  add('Caja blister 11 oz', 4, { d: 'Caja con ventana.', a: { k: 'box', win: 1 }, v: vv([['Blanca', C.w, 4], ['Plata', C.slv, 6]]) });
  add('Caja blister 17 oz y tarro', 5, { d: 'Caja con ventana para piezas grandes.', a: { k: 'box', win: 1, tall: 1 }, v: vv([['Blanca', C.w, 5], ['Plata', C.slv, 7]]) });
  add('Caja para playera blanca', 10, { d: 'Caja plana para playera.', a: { k: 'box', flat: 1 } });
  add('Folder carta económico', 6, { d: 'Folder de cartón sublimable.', a: { k: 'folder' } });
  add('Bolsa kraft para taza con listón', 140, { d: '25 × 12 cm, paquete de 10. Listón dorado, azul rey, rojo o rosa.', u: 'paq. 10', a: { k: 'kraft', ribbon: C.gld }, v: vv([['Dorado', C.gld], ['Azul rey', C.blu], ['Rojo', C.red], ['Rosa', C.pnk]]).map(x => ({ l: x.l, ribbon: x.c })) });
  add('Bolsa kraft vertical', 70, { d: 'Paquete de 10 piezas.', u: 'paq. 10', a: { k: 'kraft', tall: 1 }, v: vv([['Jumbo 30×37', null, 140], ['Boutique grande 25×35', null, 140], ['Boutique chica 20×26', null, 110], ['Grande 37×24', null, 100], ['Mediana 20×27', null, 80], ['Chica 23×17.5', null, 80], ['Locionera 24×12', null, 70]]) });
  add('Bolsa kraft horizontal', 110, { d: 'Paquete de 10 piezas.', u: 'paq. 10', a: { k: 'kraft', wide: 1 }, v: vv([['Jumbo 32×48', null, 200], ['Grande 30×40', null, 180], ['Mediana 23×32', null, 130], ['Chica 28×19', null, 110]]) });

  /* ---------------- SERIGRAFÍA Y BOTONES ---------------- */
  cat('serigrafia');
  add('Herraje para botón 5.5 cm', 2.8, { d: 'Precio por pieza.', a: { k: 'pin' } });
  add('Pulsera Tyvek', 2, { d: 'Pulsera de evento para serigrafía.', a: { k: 'band' } });
  add('Encendedor para serigrafía', 550, { d: 'Paquete de 50 piezas.', u: 'paq. 50', a: { k: 'lighter' } });
  add('Laminadora para credencial', 1300, { d: 'Laminadora de credenciales.', a: { k: 'laminator' } });
  add('Suajadora de credencial', 1000, { d: 'Corta credenciales con esquinas redondeadas.', a: { k: 'cutter' } });
  add('Suajadora de botón 5.5 cm', 2300, { d: 'Corta el papel para botón.', a: { k: 'cutter', round: 1 } });
  add('Prensa de lujo para botón 5.5 cm', 2800, { d: 'Prensa para armar botones.', a: { k: 'buttonpress' } });
  add('Molde para botón 5.6 cm', 2300, { d: 'Molde intercambiable.', a: { k: 'mold' } });
  add('Perforadora de credencial', 280, { d: 'Perforadora tipo pinza.', a: { k: 'punch' } });

  /* ---------------- INSUMOS ---------------- */
  cat('insumos');
  add('Tinta Color Make 1/8 L', 140, { d: 'Azul, roja, negra o amarilla.', a: { k: 'ink' }, v: vv([['Cian', C.cyan], ['Magenta', '#e0157f'], ['Negra', C.blk], ['Amarilla', C.yel]]), top: 1 });
  add('Tinta Color Make 1 L', 990, { d: 'Azul, roja, negra o amarilla.', a: { k: 'ink', big: 1 }, v: vv([['Cian', C.cyan], ['Magenta', '#e0157f'], ['Negra', C.blk], ['Amarilla', C.yel]]) });
  add('Bote de tinta Color Make 70 g', 108, { d: 'Precio por pieza.', a: { k: 'ink', small: 1 }, v: vv([['Cian', C.cyan], ['Magenta', '#e0157f'], ['Negra', C.blk], ['Amarilla', C.yel]]) });
  add('Doypack de tinta Color Make 125 g', 155, { d: 'Precio por pieza.', a: { k: 'doypack' }, v: vv([['Cian', C.cyan], ['Magenta', '#e0157f'], ['Negra', C.blk], ['Amarilla', C.yel]]) });
  add('Tinta Tinec 1/8 L', 140, { d: 'Negra, azul, roja o amarilla.', a: { k: 'ink' }, v: vv([['Negra', C.blk], ['Cian', C.cyan], ['Magenta', '#e0157f'], ['Amarilla', C.yel]]) });
  add('Tinta Tinec 1 L', 900, { d: 'Negra, azul, roja o amarilla.', a: { k: 'ink', big: 1 }, v: vv([['Negra', C.blk], ['Cian', C.cyan], ['Magenta', '#e0157f'], ['Amarilla', C.yel]]) });
  add('Tinta normal Epson 544', 600, { d: 'Paquete de 4 colores.', u: 'paq. 4', a: { k: 'ink', set: 1 } });
  add('Rollo de papel sublimación 21 cm × 100 m', 255, { d: 'Color Make.', a: { k: 'roll', c: '#fff' } });
  add('Papel sublimación A4 rosa 110 g', 120, { d: 'Papel de alta liberación.', a: { k: 'paper', c: '#f4c6d6' } });
  add('Papel sublimación A4 Colormake Light 70 g', 106, { d: 'Paquete A4.', a: { k: 'paper', c: '#dbe8f5' } });
  add('Papel sublimación A4 Colormake Standard 90 g', 118, { d: 'Paquete A4.', a: { k: 'paper', c: '#d5ecd8' } });
  add('Papel sublimación Colormake Premium 110 g', 125, { d: 'A4 o A3.', a: { k: 'paper', c: '#e8dcf4' }, v: vv([['A4', null, 125], ['A3', null, 320]]) });
  add('Papel sublimación Premium (caja)', 200, { d: 'A4 o A3.', a: { k: 'paper', c: '#f3e7cf', box: 1 }, v: vv([['A4', null, 200], ['A3', null, 400]]) });
  add('Papel sublimación Tinec', 115, { d: 'A4 o A3.', a: { k: 'paper', c: '#d8e3f2' }, v: vv([['A4', null, 115], ['A3', null, 130]]) });
  add('Sublicotton carta', 16, { d: 'Precio por pieza; paquete de 50 en $775.', a: { k: 'paper', c: '#fff' }, v: vv([['Pieza', null, 16], ['Paquete 50 pzas.', null, 775]]) });
  add('Papel transfer oscuro', 20, { d: 'Para telas oscuras.', a: { k: 'paper', c: '#3a3f4a' }, v: vv([['Carta', null, 20], ['Doble carta', null, 37]]) });
  add('Papel transfer claro', 11, { d: 'Para telas claras.', a: { k: 'paper', c: '#fafafa' } });
  add('Papel esmeralda', 100, { d: 'Paquete de 25 piezas.', u: 'paq. 25', a: { k: 'paper', c: '#9ad8b8' } });
  add('Papel cebolla', 20, { d: 'Paquete de 10 piezas.', u: 'paq. 10', a: { k: 'paper', c: '#f2f0e8' }, v: vv([['Carta', null, 20], ['Doble carta', null, 40]]) });
  add('Papel fotográfico Color Make 50 hojas', 110, { d: 'Papel fotográfico brillante.', a: { k: 'paper', c: '#fff', photo: 1 } });
  add('Papel adhesivo fotográfico Color Make 50 hojas', 130, { d: 'Papel fotográfico adhesivo.', a: { k: 'paper', c: '#fff', photo: 1 } });
  add('Papel fotográfico Tinec 200 g A4', 40, { d: '20 hojas.', a: { k: 'paper', c: '#fff', photo: 1 } });
  add('Papel fotográfico adhesivo Tinec', 110, { d: '50 hojas.', a: { k: 'paper', c: '#fff', photo: 1 } });
  add('Tela para sublimar tamaño carta', 25, { d: 'Hoja textil sublimable.', a: { k: 'paper', c: '#f7f3ea', fabric: 1 } });
  add('PVC credencial para sublimar', 3, { d: 'Precio por pieza.', a: { k: 'card' } });
  add('PVC credencial para laminar', 560, { d: 'Paquete.', u: 'paquete', a: { k: 'card', stack: 1 } });
  add('Poliamida ½ kg', 150, { d: 'Polvo de poliamida para transfer.', a: { k: 'poly' } });
  add('Cinta térmica 6 mm', 28, { d: '6 mm de ancho × 3.3 m.', a: { k: 'tape' } });
  add('Cinta térmica 10 mm', 44, { d: '10 mm de ancho × 3.3 m.', a: { k: 'tape', wide: 1, c: '#3aa36b' } });

  /* ---------------- VINIL Y BANNERS ---------------- */
  cat('vinil');
  add('Vinil textil sublimable brillante', 130, { d: 'Rollo de 50 cm de ancho.', u: 'metro', a: { k: 'roll', c: '#fdfdfd' } });
  add('Vinil textil sublimable tornasol', 150, { d: 'Rollo de 50 cm de ancho.', u: 'metro', a: { k: 'roll', rainbow: 1 } });
  add('Vinil textil sublimable tipo tela', 150, { d: 'Rollo de 50 cm de ancho.', u: 'metro', a: { k: 'roll', c: '#f3efe6' } });
  add('Transfer transparente para rotular', 760, { d: 'Rollo de 30 o 60 cm.', a: { k: 'roll', clear: 1 }, v: vv([['30 cm', null, 760], ['60 cm', null, 1500]]) });
  add('Banner roll-up 0.6 × 1.6 m', 140, { d: 'Estructura para banner.', a: { k: 'rollup' } });
  add('Banner roll-up 0.8 × 1.8 m', 150, { d: 'Estructura para banner.', a: { k: 'rollup', wide: 1 } });
  add('Banner de mesa 11 × 17"', 25, { d: 'Porta banner de escritorio.', a: { k: 'rollup', small: 1 } });

  /* ---------------- RESISTENCIAS ---------------- */
  cat('resistencias');
  const R = (n, p, b, s) => add(n, p, { brand: b, d: 'Resistencia de repuesto para plancha.', a: { k: 'heater', s } });
  R('Resistencia para bolígrafos', 1490, 'Color Make', 'pen');
  R('Resistencia 11 oz', 1050, 'Color Make', 'mug');
  R('Resistencia cilindro 750 ml', 1240, 'Color Make', 'tall');
  R('Resistencia cónica 12 oz', 1080, 'Color Make', 'conic');
  R('Resistencia cónica 17 oz', 1160, 'Color Make', 'conic');
  R('Resistencia 6 oz', 930, 'Color Make', 'small');
  R('Resistencia tequilero', 770, 'Color Make', 'shot');
  R('Resistencia taza 11 oz', 700, 'Importada', 'mug');
  R('Resistencia cilindro', 800, 'Importada', 'tall');
  R('Resistencia cónica 12 oz', 900, 'Importada', 'conic');
  R('Resistencia cónica 17 oz', 1050, 'Importada', 'conic');
  R('Resistencia cilindro larga', 900, 'Importada', 'tall');
  R('Resistencia 11 oz', 1140, 'Tinec', 'mug');
  R('Resistencia 12 oz', 1075, 'Tinec', 'conic');
  R('Resistencia 17 oz', 1150, 'Tinec', 'conic');
  R('Resistencia 750 ml', 1235, 'Tinec', 'tall');
  R('Resistencia tequilero', 750, 'Tinec', 'shot');

  /* ---------------- MAQUINARIA ---------------- */
  cat('maquinaria');
  const M = (n, p, b, a, d) => add(n, p, { brand: b, a, d: d || 'Plancha térmica para sublimación.' });
  M('Plancha para tazas Ferrari', 3300, 'Color Make', { k: 'mugpress', c: '#d8322c' });
  M('Plancha para tazas Bittle', 1850, 'Color Make', { k: 'mugpress', c: '#e04a2a' });
  M('Plancha para gorra', 5500, 'Color Make', { k: 'cappress', c: '#d8322c' });
  M('Plancha plana portátil', 2700, 'Color Make', { k: 'portable' });
  M('Plancha plana 29 × 38 cm Heat Press', 7600, 'Color Make', { k: 'press', c: '#d8322c' });
  M('Plancha plana 38 × 38 cm manual', 10200, 'Color Make', { k: 'press', c: '#d8322c' });
  M('Plancha plana 38 × 38 cm semiautomática Smart Heat', 11300, 'Color Make', { k: 'press', c: '#d8322c', auto: 1 });
  M('Plancha plana 32 × 45 cm manual', 9450, 'Color Make', { k: 'press', c: '#d8322c', wide: 1 });
  M('Plancha plana 40 × 60 cm', 12600, 'Color Make', { k: 'press', c: '#d8322c', wide: 1, big: 1 });
  M('Combo 9 en 1 38 × 38 cm', 18100, 'Color Make', { k: 'combo', c: '#d8322c' }, 'Plancha plana con accesorios para tazas, gorras y platos.');
  M('Combo 10 en 1 29 × 38 cm', 13100, 'Color Make', { k: 'combo', c: '#d8322c' }, 'Plancha plana con accesorios para tazas, gorras y platos.');
  M('Combo 10 en 1 324 Pro 2.0', 15700, 'Color Make', { k: 'combo', c: '#d8322c' }, 'Plancha plana con accesorios para tazas, gorras y platos.');
  M('Plancha para tazas', 2750, 'Tinec', { k: 'mugpress', c: '#2b2d33' });
  M('Plancha para gorra', 5500, 'Tinec', { k: 'cappress', c: '#2b2d33' });
  M('Plancha plana 38 × 38 cm', 8100, 'Tinec', { k: 'press', c: '#2b2d33' });
  M('Plancha plana 40 × 60 cm', 11300, 'Tinec', { k: 'press', c: '#2b2d33', wide: 1, big: 1 });
  M('Combo 8 en 1 38 × 38 cm', 11700, 'Tinec', { k: 'combo', c: '#2b2d33' }, 'Plancha plana con accesorios para tazas, gorras y platos.');
  M('Combo 8 en 1 29 × 38 cm', 10300, 'Tinec', { k: 'combo', c: '#2b2d33' }, 'Plancha plana con accesorios para tazas, gorras y platos.');
  M('Plancha para tazas', 1600, 'Importada', { k: 'mugpress', c: '#2b2d33' });
  M('Plancha para taza doble', 3000, 'Importada', { k: 'mugpress', c: '#d8322c', double: 1 });
  M('Plancha para gorra económica', 5200, 'Importada', { k: 'cappress', c: '#2b2d33' });
  M('Plancha plana económica 38 × 38 cm', 6000, 'Importada', { k: 'press', c: '#2b2d33' });
  M('Plancha plana 40 × 60 cm', 9000, 'Importada', { k: 'press', c: '#2b2d33', wide: 1, big: 1 });
  add('Impresora Epson L1210 con tintas de sublimación', 4600, { brand: 'Epson', d: 'Impresora de tanque lista para sublimar.', a: { k: 'printer' }, top: 1 });
  add('Impresora Epson L1250 con tintas de sublimación', 4300, { brand: 'Epson', d: 'Impresora de tanque con Wi-Fi lista para sublimar.', a: { k: 'printer', wifi: 1 } });

  // ids estables
  const slug = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const seen = {};
  P.forEach((p) => {
    let id = slug((p.brand ? p.brand + '-' : '') + p.n);
    if (seen[id]) id += '-' + (++seen[id]); else seen[id] = 1;
    p.id = id;
  });

  window.DC = window.DC || {};
  window.DC.CATS = CATS;
  window.DC.PRODUCTS = P;
  window.DC.COLORS = C;
})();
