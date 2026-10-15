/* =====================================================================
   D'Cortés — ilustraciones de producto (SVG, fondo transparente)
   DC.art(spec) devuelve un string SVG; DC.artURL(spec) un data-URI.
   ===================================================================== */
(function () {
  const OL = 'rgba(22,30,52,.24)';
  const OLd = 'rgba(10,14,28,.45)';

  // ---------- utilidades de color ----------
  const hex = (h) => { h = h.replace('#', ''); if (h.length === 3) h = h.split('').map(x => x + x).join(''); return [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16)); };
  const toHex = (a) => '#' + a.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
  const mix = (a, b, t) => { const A = hex(a), B = hex(b); return toHex(A.map((v, i) => v + (B[i] - v) * t)); };
  const dk = (c, t = .25) => mix(c, '#000000', t);
  const lt = (c, t = .25) => mix(c, '#ffffff', t);
  const lum = (c) => { const [r, g, b] = hex(c); return (0.299 * r + 0.587 * g + 0.114 * b) / 255; };

  let uid = 0;
  function ctx() { return { d: [] }; }
  function lg(X, stops, v) {
    const id = 'g' + (++uid);
    X.d.push(`<linearGradient id="${id}" ${v ? 'x1="0" y1="0" x2="0" y2="1"' : 'x1="0" y1="0" x2="1" y2="0"'}>${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a !== undefined ? ` stop-opacity="${a}"` : ''}/>`).join('')}</linearGradient>`);
    return `url(#${id})`;
  }

  const BASE_DEFS = `
<linearGradient id="sh" x1="0" x2="1"><stop offset="0" stop-color="#0a1022" stop-opacity=".30"/><stop offset=".14" stop-color="#0a1022" stop-opacity=".07"/><stop offset=".3" stop-color="#fff" stop-opacity=".55"/><stop offset=".43" stop-color="#fff" stop-opacity="0"/><stop offset=".76" stop-color="#0a1022" stop-opacity=".06"/><stop offset="1" stop-color="#0a1022" stop-opacity=".34"/></linearGradient>
<linearGradient id="shm" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".32"/><stop offset=".3" stop-color="#fff" stop-opacity=".16"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".36"/></linearGradient>
<linearGradient id="mt" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".45"/><stop offset=".12" stop-color="#fff" stop-opacity=".1"/><stop offset=".22" stop-color="#fff" stop-opacity=".85"/><stop offset=".3" stop-color="#000" stop-opacity=".18"/><stop offset=".5" stop-color="#fff" stop-opacity=".25"/><stop offset=".62" stop-color="#000" stop-opacity=".28"/><stop offset=".78" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></linearGradient>
<linearGradient id="pr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".4" stop-color="#ffe9f4" stop-opacity=".25"/><stop offset=".7" stop-color="#e0f0ff" stop-opacity=".3"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></linearGradient>
<linearGradient id="vs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".16"/></linearGradient>
<linearGradient id="dg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".4"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></linearGradient>
<linearGradient id="rb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff6fb1"/><stop offset=".25" stop-color="#ffd84a"/><stop offset=".5" stop-color="#5ee0b0"/><stop offset=".75" stop-color="#55a6ff"/><stop offset="1" stop-color="#b56bff"/></linearGradient>
<radialGradient id="gs" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#1e2b4d" stop-opacity=".28"/><stop offset=".6" stop-color="#1e2b4d" stop-opacity=".08"/><stop offset="1" stop-color="#1e2b4d" stop-opacity="0"/></radialGradient>
<pattern id="gl" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r=".9" fill="#fff" opacity=".85"/><circle cx="5" cy="4.5" r=".7" fill="#fff" opacity=".5"/><circle cx="3.5" cy="6" r=".5" fill="#000" opacity=".2"/></pattern>
<pattern id="sq" width="8" height="7" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="2.2" fill="#fff" opacity=".55"/><circle cx="6" cy="5.5" r="2.2" fill="#000" opacity=".12"/></pattern>
<pattern id="mesh" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="2.5" cy="2.5" r="1.1" fill="#000" opacity=".25"/></pattern>
<pattern id="wd" width="40" height="10" patternUnits="userSpaceOnUse"><path d="M0 5 Q10 2 20 5 T40 5" stroke="#000" stroke-opacity=".12" fill="none"/></pattern>
<pattern id="stn" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2" cy="3" r="1.2" fill="#000" opacity=".12"/><circle cx="7" cy="7" r="1" fill="#fff" opacity=".2"/></pattern>`;

  const ground = (cx = 120, w = 70, y = 210) => `<ellipse cx="${cx}" cy="${y}" rx="${w}" ry="${Math.max(6, w * .12)}" fill="url(#gs)"/>`;

  // relleno + acabado sobre una forma
  function surf(X, d, c, f, o = {}) {
    let fill = c;
    if (o.rainbow) fill = 'url(#rb)';
    else if (o.c2) fill = lg(X, [[0, c], [1, o.c2]], true);
    let s = `<path d="${d}" fill="${fill}" stroke="${o.ol || OL}" stroke-width="1.2" stroke-linejoin="round"/>`;
    const ov = f === 'metal' ? 'mt' : f === 'matte' ? 'shm' : f === 'pearl' ? 'pr' : o.flat ? 'vs' : 'sh';
    s += `<path d="${d}" fill="url(#${ov})"/>`;
    if (f === 'pearl') s += `<path d="${d}" fill="url(#sh)" opacity=".6"/>`;
    if (f === 'glitter') s += `<path d="${d}" fill="url(#gl)"/>`;
    return s;
  }
  const ell = (cx, cy, rx, ry, fill, extra = '') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${OL}" stroke-width="1.1" ${extra}/>`;
  const cylPath = (x, y, w, h, r = 10) => `M${x} ${y} L${x} ${y + h - r} Q${x} ${y + h} ${x + r} ${y + h + r * .25} L${x + w - r} ${y + h + r * .25} Q${x + w} ${y + h} ${x + w} ${y + h - r} L${x + w} ${y} Z`;
  const taperPath = (cx, y, tw, bw, h, r = 10) => {
    const a = cx - tw / 2, b = cx + tw / 2, c = cx - bw / 2, d = cx + bw / 2;
    return `M${a} ${y} L${c} ${y + h - r} Q${c} ${y + h} ${c + r} ${y + h + r * .3} L${d - r} ${y + h + r * .3} Q${d} ${y + h} ${d} ${y + h - r} L${b} ${y} Z`;
  };
  const wrap = (inner, defs, vb = '0 0 240 240') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}"><defs>${BASE_DEFS}${defs.join('')}</defs>${inner}</svg>`;
  const scaleAt = (s, cx, cy, inner) => `<g transform="translate(${cx} ${cy}) scale(${s}) translate(${-cx} ${-cy})">${inner}</g>`;

  // ---------- dibujos ----------
  const D = {};

  D.mug = (a, X) => {
    const c = a.c || '#f6f6f3', f = a.fin;
    const x = a.camp ? 60 : 64, w = a.camp ? 108 : 100;
    const y = a.tall ? 48 : 62, h = a.tall ? 136 : 120;
    const r = a.round ? 26 : 10;
    const hc = a.inh ? (a.in || '#2457c5') : c;
    let s = '';
    if (a.saucer) s += `<ellipse cx="116" cy="${y + h + 6}" rx="78" ry="16" fill="${c}" stroke="${OL}"/><ellipse cx="116" cy="${y + h + 6}" rx="78" ry="16" fill="url(#vs)"/><ellipse cx="116" cy="${y + h + 2}" rx="46" ry="8" fill="${dk(c, .08)}"/>`;
    else s += ground(116, 66, y + h + 14);
    // asa
    const hx = x + w;
    if (a.heart) {
      s += `<path d="M${hx - 4} ${y + 26} C${hx + 30} ${y + 2} ${hx + 50} ${y + 40} ${hx + 18} ${y + 70} L${hx - 4} ${y + 92}" fill="none" stroke="${OLd}" stroke-opacity=".25" stroke-width="17" stroke-linecap="round"/>`;
      s += `<path d="M${hx - 4} ${y + 26} C${hx + 30} ${y + 2} ${hx + 50} ${y + 40} ${hx + 18} ${y + 70} L${hx - 4} ${y + 92}" fill="none" stroke="${hc}" stroke-width="14" stroke-linecap="round"/>`;
      s += `<path d="M${hx - 2} ${y + 30} C${hx + 26} ${y + 10} ${hx + 42} ${y + 40} ${hx + 16} ${y + 66}" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="3" stroke-linecap="round"/>`;
    } else {
      const d = `M${hx - 4} ${y + 22} C${hx + 40} ${y + 18} ${hx + 44} ${y + 84} ${hx - 4} ${y + 88}`;
      s += `<path d="${d}" fill="none" stroke="${OLd}" stroke-opacity=".25" stroke-width="17" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${hc}" stroke-width="14" stroke-linecap="round"/>`;
      s += `<path d="M${hx + 2} ${y + 26} C${hx + 30} ${y + 26} ${hx + 32} ${y + 58} ${hx + 18} ${y + 70}" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/>`;
      if (lum(hc) < .35) s += `<path d="${d}" fill="none" stroke="#000" stroke-opacity=".15" stroke-width="14" stroke-linecap="round"/>`;
    }
    if (a.spoon) {
      const sc = a.spoon === 1 ? hc : a.spoon;
      s += `<g transform="rotate(-18 96 ${y})"><rect x="90" y="${y - 52}" width="9" height="62" rx="4.5" fill="${sc}" stroke="${OL}"/><rect x="90" y="${y - 52}" width="9" height="62" rx="4.5" fill="url(#sh)"/></g>`;
    }
    s += surf(X, cylPath(x, y, w, h, r), c, f, { rainbow: a.rainbow, c2: a.c2 });
    // boca
    const inner = a.in || (a.inh ? a.in : dk(c, lum(c) > .8 ? .1 : .25));
    s += ell(x + w / 2, y, w / 2, 9, a.rim || lt(c, .1));
    s += `<ellipse cx="${x + w / 2}" cy="${y + 1}" rx="${w / 2 - (a.camp ? 5 : 4)}" ry="6.5" fill="${dk(inner, .12)}"/>`;
    s += `<ellipse cx="${x + w / 2}" cy="${y + 2.5}" rx="${w / 2 - 12}" ry="4" fill="${inner}" opacity=".9"/>`;
    if (a.camp) {
      const rc = a.rim || '#3a3a3a';
      s += `<ellipse cx="${x + w / 2}" cy="${y}" rx="${w / 2}" ry="9" fill="none" stroke="${rc}" stroke-width="3.5"/>`;
      s += `<path d="M${x + 6} ${y + h + 2} Q${x + w / 2} ${y + h + 9} ${x + w - 6} ${y + h + 2}" fill="none" stroke="${rc}" stroke-width="3"/>`;
    }
    if (a.win) {
      s += `<rect x="${x + 18}" y="${y + 24}" width="${w - 40}" height="${h - 50}" rx="10" fill="#fbfbf9"/><rect x="${x + 18}" y="${y + 24}" width="${w - 40}" height="${h - 50}" rx="10" fill="url(#sh)" opacity=".6"/>`;
    }
    if (a.lid) {
      const lc = a.c && a.c !== '#f6f6f3' ? a.c : '#ec6fa6';
      s += `<ellipse cx="${x + w / 2}" cy="${y - 4}" rx="${w / 2 + 3}" ry="11" fill="${lc}" stroke="${OL}"/><path d="M${x - 3} ${y - 4} L${x - 3} ${y + 4} A${w / 2 + 3} 11 0 0 0 ${x + w + 3} ${y + 4} L${x + w + 3} ${y - 4}" fill="${dk(lc, .15)}"/><ellipse cx="${x + w / 2}" cy="${y - 5}" rx="${w / 2 + 2}" ry="10" fill="${lc}"/><ellipse cx="${x + w / 2 + 18}" cy="${y - 6}" rx="8" ry="3" fill="${dk(lc, .3)}"/>`;
      s += `<path d="M${x} ${y + h - 14} L${x + w} ${y + h - 14} L${x + w} ${y + h - 6} Q${x + w / 2} ${y + h + 6} ${x} ${y + h - 6} Z" fill="${lc}" opacity=".95"/>`;
    }
    if (a.glow) s = `<g style="filter:drop-shadow(0 0 10px rgba(170,255,120,.8))">${s}</g>`;
    if (a.small) s = scaleAt(.74, 120, 200, s);
    return s;
  };

  D.conic = (a, X) => {
    const c = a.c || '#f6f6f3', y = a.tall ? 40 : 56, h = a.tall ? 148 : 128;
    let s = ground(116, 56, y + h + 12);
    const d = `M164 ${y + 28} C${206} ${y + 30} ${200} ${y + 92} ${150} ${y + 96}`;
    s += `<path d="${d}" fill="none" stroke="${OLd}" stroke-opacity=".25" stroke-width="16" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${c}" stroke-width="13" stroke-linecap="round"/>`;
    if (lum(c) < .35) s += `<path d="${d}" fill="none" stroke="#000" stroke-opacity=".15" stroke-width="13" stroke-linecap="round"/>`;
    s += surf(X, taperPath(116, y, 112, 70, h, 12), c, a.fin);
    s += ell(116, y, 56, 10, lt(c, .08));
    s += `<ellipse cx="116" cy="${y + 1.5}" rx="51" ry="7" fill="${dk(c, lum(c) > .8 ? .1 : .3)}"/>`;
    return s;
  };

  D.gmug = (a, X) => {
    const x = 64, w = 100, y = 62, h = 120;
    let s = ground(116, 66, 196);
    const d = `M${x + w - 4} ${y + 22} C${x + w + 40} ${y + 18} ${x + w + 44} ${y + 84} ${x + w - 4} ${y + 88}`;
    s += `<path d="${d}" fill="none" stroke="rgba(150,170,190,.55)" stroke-width="15" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="5" stroke-linecap="round"/>`;
    const p = cylPath(x, y, w, h, 12);
    s += `<path d="${p}" fill="${a.frost ? '#eef2f5' : 'rgba(225,236,244,.35)'}" stroke="rgba(110,135,160,.55)" stroke-width="1.4"/>`;
    if (a.tint) s += `<path d="${p}" fill="${lg(X, [[0, a.tint, 0], [.45, a.tint, 0], [1, a.tint, .85]], true)}"/>`;
    s += `<path d="${p}" fill="url(#sh)" opacity=".8"/>`;
    s += `<rect x="${x + 4}" y="${y + h - 10}" width="${w - 8}" height="12" rx="6" fill="rgba(170,190,210,.35)"/>`;
    s += `<path d="M${x + 16} ${y + 14} L${x + 16} ${y + h - 20}" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".7"/>`;
    s += `<ellipse cx="${x + w / 2}" cy="${y}" rx="${w / 2}" ry="9" fill="rgba(235,242,248,.6)" stroke="rgba(110,135,160,.6)" stroke-width="1.4"/>`;
    return s;
  };

  D.pair = (a, X) => {
    const c = a.c || '#f6f6f3';
    const m = (flip) => {
      const g = D.mug({ c, heart: 1, fin: a.c ? 'matte' : null }, X).replace(/<ellipse[^>]*url\(#gs\)[^>]*\/>/, '');
      return flip ? `<g transform="translate(240 0) scale(-1 1)">${g}</g>` : g;
    };
    return ground(120, 100, 202) + `<g transform="translate(-34 18) scale(.78)">${m(false)}</g><g transform="translate(86 18) scale(.78)">${m(true)}</g>`;
  };

  D.can = (a, X) => {
    const c = a.c || '#f6f6f3';
    const x = a.wide ? 74 : 82, w = a.wide ? 92 : 76;
    const y = a.short ? 80 : a.wide ? 74 : 50, h = 196 - y;
    let s = ground(120, w * .7, 204);
    s += surf(X, cylPath(x, y, w, h, 8), c, c === '#c9ced4' ? 'metal' : a.fin);
    if (a.lid) {
      s += `<path d="M${x - 2} ${y - 2} L${x - 2} ${y - 14} L${x + w + 2} ${y - 14} L${x + w + 2} ${y - 2} Z" fill="#2c2f36"/>${ell(x + w / 2, y - 14, w / 2 + 2, 8, '#3a3e47')}${ell(x + w / 2, y - 2, w / 2 + 2, 8, '#2c2f36', 'opacity=".0"')}<rect x="${x + w / 2 + 6}" y="${y - 19}" width="18" height="5" rx="2.5" fill="#15171c"/>`;
      s += `<path d="M${x - 2} ${y - 14} L${x - 2} ${y - 2} M${x + w + 2} ${y - 14} L${x + w + 2} ${y - 2}" stroke="${OL}"/>`;
    } else {
      s += ell(x + w / 2, y, w / 2, 8, '#d7dbe0');
      s += `<ellipse cx="${x + w / 2}" cy="${y}" rx="${w / 2 - 6}" ry="5" fill="#b9bfc6"/><ellipse cx="${x + w / 2 + 10}" cy="${y}" rx="8" ry="2.6" fill="#8d949c"/>`;
    }
    return s;
  };

  D.tumbler = (a, X) => {
    const c = a.c || '#f6f6f3';
    let tw = 84, bw = 68, y = 54, h = 140;
    if (a.conic) { tw = 92; bw = 58; }
    if (a.skinny) { tw = 58; bw = 54; y = 46; h = 148; }
    let s = ground(120, tw * .65, 204);
    if (a.skinny) s += `<rect x="128" y="${y - 52}" width="6" height="60" rx="3" fill="rgba(200,215,230,.7)" stroke="rgba(110,135,160,.5)"/>`;
    s += surf(X, taperPath(120, y, tw, bw, h, 10), c, c === '#c9ced4' ? 'metal' : a.fin);
    // tapa
    const lw = tw + 6;
    s += `<path d="M${120 - lw / 2} ${y} L${120 - lw / 2} ${y - 14} L${120 + lw / 2} ${y - 14} L${120 + lw / 2} ${y} Z" fill="rgba(215,225,235,.9)" stroke="${OL}"/>`;
    s += ell(120, y - 14, lw / 2, 7, 'rgba(235,242,248,.95)');
    s += `<ellipse cx="120" cy="${y}" rx="${lw / 2}" ry="7" fill="none" stroke="${OL}"/>`;
    s += `<rect x="${120 - 18}" y="${y - 19}" width="18" height="5" rx="2.5" fill="#9fb1c2"/>`;
    return s;
  };

  D.travel = (a, X) => {
    const c = a.c || '#f6f6f3';
    const y = a.big ? 58 : 62, h = a.big ? 132 : 128;
    let s = ground(112, 60, 204);
    const d = `M150 ${y + 26} C186 ${y + 22} 190 ${y + 92} 150 ${y + 96}`;
    s += `<path d="${d}" fill="none" stroke="${OLd}" stroke-opacity=".25" stroke-width="17" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${a.big ? '#c9ced4' : c}" stroke-width="14" stroke-linecap="round"/><path d="${d}" fill="none" stroke="url(#mt)" stroke-width="14" stroke-linecap="round" opacity=".5"/>`;
    s += surf(X, taperPath(112, y, a.big ? 92 : 84, a.big ? 88 : 72, h, 10), c, c === '#c9ced4' ? 'metal' : a.fin);
    s += `<path d="M64 ${y} L64 ${y - 14} L160 ${y - 14} L160 ${y} Z" fill="#2c2f36"/>` + ell(112, y - 14, 48, 8, '#3a3e47') + `<rect x="118" y="${y - 20}" width="20" height="6" rx="3" fill="#15171c"/>`;
    return s;
  };

  D.wine = (a, X) => {
    const c = a.c || '#c9ced4';
    let s = ground(120, 52, 202);
    const d = 'M82 70 C74 110 70 150 84 182 Q90 196 106 197 L134 197 Q150 196 156 182 C170 150 166 110 158 70 Z';
    s += surf(X, d, c, c === '#c9ced4' ? 'metal' : a.fin);
    s += `<path d="M78 70 L78 58 L162 58 L162 70 Z" fill="rgba(215,225,235,.9)" stroke="${OL}"/>` + ell(120, 58, 42, 7, 'rgba(240,245,250,.95)') + `<rect x="126" y="52" width="16" height="4" rx="2" fill="#9fb1c2"/>`;
    return s;
  };

  D.bottle = (a, X) => {
    const c = a.c || '#f6f6f3', st = a.s;
    const y = a.tall ? 74 : a.short ? 104 : 88, x = st === 'milk' ? 80 : 90, w = st === 'milk' ? 80 : 60;
    let s = ground(120, w * .75, 206);
    let body;
    if (st === 'milk') body = `M${x} ${y + 20} Q${x} ${y} ${x + 18} ${y - 8} L${x + 26} ${y - 22} L${x + w - 26} ${y - 22} L${x + w - 18} ${y - 8} Q${x + w} ${y} ${x + w} ${y + 20} L${x + w} 190 Q${x + w} 200 ${x + w - 10} 200 L${x + 10} 200 Q${x} 200 ${x} 190 Z`;
    else body = `M${x} ${y + 26} Q${x} ${y} ${x + 18} ${y - 6} L${x + 21} ${y - 22} L${x + w - 21} ${y - 22} L${x + w - 18} ${y - 6} Q${x + w} ${y} ${x + w} ${y + 26} L${x + w} 192 Q${x + w} 200 ${x + w - 8} 200 L${x + 8} 200 Q${x} 200 ${x} 192 Z`;
    s += surf(X, body, c, c === '#c9ced4' ? 'metal' : a.fin);
    const top = y - 22, cx = 120, cap = a.cap || '#2c2f36';
    const capRect = (h, col, wd = 22) => `<rect x="${cx - wd}" y="${top - h}" width="${wd * 2}" height="${h + 2}" rx="4" fill="${col}" stroke="${OL}"/><rect x="${cx - wd}" y="${top - h}" width="${wd * 2}" height="${h + 2}" rx="4" fill="url(#sh)"/>`;
    if (st === 'clip') s += capRect(16, '#c9ced4') + `<rect x="${cx - 22}" y="${top - 16}" width="44" height="18" rx="4" fill="url(#mt)" opacity=".6"/><path d="M${cx - 4} ${top - 16} C${cx - 4} ${top - 52} ${cx + 30} ${top - 52} ${cx + 30} ${top - 26} L${cx + 26} ${top - 16}" fill="none" stroke="#3b3f47" stroke-width="5" stroke-linecap="round"/>`;
    else if (st === 'clear') s += `<path d="M${cx - 22} ${top + 2} L${cx - 22} ${top - 16} Q${cx} ${top - 30} ${cx + 22} ${top - 16} L${cx + 22} ${top + 2} Z" fill="rgba(220,235,245,.7)" stroke="rgba(110,135,160,.6)"/><path d="M${cx - 12} ${top - 22} C${cx - 12} ${top - 48} ${cx + 12} ${top - 48} ${cx + 12} ${top - 22}" fill="none" stroke="rgba(110,135,160,.7)" stroke-width="5"/>`;
    else if (st === 'kid') s += capRect(14, cap) + `<path d="M${cx - 8} ${top - 14} L${cx - 6} ${top - 30} L${cx + 6} ${top - 30} L${cx + 8} ${top - 14} Z" fill="${dk(cap, .1)}" stroke="${OL}"/><path d="M${cx + 22} ${top - 6} C${cx + 40} ${top - 6} ${cx + 40} ${top - 34} ${cx + 6} ${top - 30}" fill="none" stroke="${cap}" stroke-width="4"/>`;
    else if (st === 'ring') s += capRect(18, '#2c2f36') + `<ellipse cx="${cx}" cy="${top - 30}" rx="16" ry="13" fill="none" stroke="${cap}" stroke-width="6"/>`;
    else if (st === 'button') s += capRect(22, cap) + `<rect x="${cx - 8}" y="${top - 30}" width="16" height="9" rx="3" fill="${dk(cap, .25)}"/>`;
    else if (st === 'neck') s = s.replace(/(<\/path>|\/>)$/, '$1') + `<path d="M${x + 18} ${y - 6} L${x + 21} ${y - 22} L${x + w - 21} ${y - 22} L${x + w - 18} ${y - 6} Z" fill="${cap}"/>` + capRect(16, '#c49a6c', 20) + `<rect x="${cx - 20}" y="${top - 16}" width="40" height="18" rx="4" fill="url(#wd)"/>`;
    else if (st === 'pet') s += capRect(20, '#2c2f36') + `<path d="M${cx - 10} ${top - 20} C${cx - 10} ${top - 40} ${cx + 10} ${top - 40} ${cx + 10} ${top - 20}" fill="none" stroke="#2c2f36" stroke-width="5"/>`;
    else if (st === 'milk') s += capRect(14, '#c9ced4', 24) + `<rect x="${cx - 24}" y="${top - 14}" width="48" height="16" rx="4" fill="url(#mt)" opacity=".6"/>`;
    return s;
  };

  D.beer = (a, X) => {
    const y = a.big ? 44 : 62, h = a.big ? 148 : 128;
    let s = ground(112, 62, 204);
    const d = `M150 ${y + 26} C190 ${y + 24} 192 ${y + 98} 150 ${y + 100}`;
    s += `<path d="${d}" fill="none" stroke="rgba(130,155,180,.55)" stroke-width="16" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="5" stroke-linecap="round"/>`;
    const p = cylPath(68, y, 88, h, 8);
    s += `<path d="${p}" fill="${a.frost ? '#eef2f5' : 'rgba(225,236,244,.35)'}" stroke="rgba(110,135,160,.55)" stroke-width="1.4"/>`;
    if (a.tint) s += `<path d="${p}" fill="${lg(X, [[0, a.tint, 0], [.5, a.tint, .05], [1, a.tint, .85]], true)}"/>`;
    s += `<path d="${p}" fill="url(#sh)" opacity=".8"/><rect x="70" y="${y + h - 16}" width="84" height="18" rx="6" fill="rgba(160,185,205,.45)"/>`;
    for (let i = 0; i < 4; i++) s += `<path d="M${82 + i * 20} ${y + 16} L${82 + i * 20} ${y + h - 24}" stroke="#fff" stroke-opacity=".45" stroke-width="5" stroke-linecap="round"/>`;
    s += ell(112, y, 44, 8, 'rgba(235,242,248,.6)');
    return s;
  };

  D.mason = (a, X) => {
    let s = ground(118, 58, 204);
    if (a.square) {
      s += `<path d="M154 92 C186 92 186 160 154 160" fill="none" stroke="rgba(130,155,180,.6)" stroke-width="12" stroke-linecap="round"/>`;
      s += `<rect x="76" y="70" width="80" height="126" rx="12" fill="rgba(225,236,244,.45)" stroke="rgba(110,135,160,.6)" stroke-width="1.4"/><rect x="76" y="70" width="80" height="126" rx="12" fill="url(#sh)" opacity=".8"/>`;
      s += `<rect x="80" y="52" width="72" height="20" rx="4" fill="#c9ced4" stroke="${OL}"/><rect x="80" y="52" width="72" height="20" rx="4" fill="url(#mt)" opacity=".7"/><rect x="126" y="12" width="7" height="46" rx="3.5" fill="#ec6fa6" transform="rotate(10 130 40)"/>`;
      return s;
    }
    s += `<rect x="128" y="10" width="7" height="58" rx="3.5" fill="#2bb673" transform="rotate(8 131 40)"/>`;
    const p = 'M80 72 Q76 82 76 96 L76 186 Q76 198 88 198 L148 198 Q160 198 160 186 L160 96 Q160 82 156 72 Z';
    s += `<path d="${p}" fill="${a.frost ? '#eef2f5' : 'rgba(225,236,244,.4)'}" stroke="rgba(110,135,160,.6)" stroke-width="1.4"/><path d="${p}" fill="url(#sh)" opacity=".8"/>`;
    s += `<path d="M168 100 C196 100 196 164 160 166" fill="none" stroke="rgba(150,170,190,.7)" stroke-width="12" stroke-linecap="round"/>`;
    s += `<rect x="78" y="54" width="80" height="22" rx="5" fill="#c9ced4" stroke="${OL}"/><rect x="78" y="54" width="80" height="22" rx="5" fill="url(#mt)" opacity=".7"/>`;
    for (let i = 0; i < 3; i++) s += `<path d="M80 ${60 + i * 6} L156 ${60 + i * 6}" stroke="#000" stroke-opacity=".12"/>`;
    return s;
  };

  D.cup = (a, X) => {
    const c = a.plastic ? '#f4f7fa' : '#f6f6f3', lc = a.lidc || '#f07c22';
    let s = ground(120, 52, 204);
    s += surf(X, taperPath(120, 66, 84, 64, 128, 10), c, null);
    if (a.plastic) s += `<path d="${taperPath(120, 66, 84, 64, 128, 10)}" fill="rgba(200,220,240,.25)"/>`;
    s += `<path d="M75 66 L75 50 Q120 40 165 50 L165 66 Z" fill="${lc}" stroke="${OL}"/><path d="M75 66 L75 50 Q120 40 165 50 L165 66 Z" fill="url(#sh)"/>` + ell(120, 48, 44, 8, lt(lc, .1)) + `<rect x="126" y="42" width="18" height="5" rx="2.5" fill="${dk(lc, .3)}"/>`;
    if (a.sleeve) s += `<path d="M80 150 L160 150 L158 176 L82 176 Z" fill="${lc}" opacity=".9"/><path d="M80 150 L160 150 L158 176 L82 176 Z" fill="url(#sh)"/>`;
    return s;
  };

  D.pcup = (a, X) => {
    const c = a.c || '#2457c5';
    let s = ground(120, 48, 204);
    if (a.c !== '#26262c') s += `<rect x="126" y="18" width="7" height="64" rx="3.5" fill="${lt(c, .2)}" transform="rotate(8 130 50)"/>`;
    s += surf(X, taperPath(120, 72, 80, 58, 124, 10), c, c === '#ec6fa6' ? 'glitter' : null);
    s += `<path d="M76 72 L76 62 L164 62 L164 72 Z" fill="${lt(c, .55)}" stroke="${OL}"/>` + ell(120, 62, 44, 7, lt(c, .7));
    return s;
  };

  D.shot = (a, X) => {
    let s = ground(120, 38, 204);
    const p = taperPath(120, 96, 64, 52, 100, 6);
    if (a.glass) {
      s += `<path d="${p}" fill="${a.frost ? '#eef2f5' : 'rgba(225,236,244,.4)'}" stroke="rgba(110,135,160,.6)" stroke-width="1.4"/>`;
      if (a.tint) s += `<path d="M93 108 L95 168 L145 168 L147 108 Z" fill="${a.tint}" opacity=".75"/>`;
      s += `<path d="${p}" fill="url(#sh)" opacity=".8"/><rect x="96" y="172" width="48" height="24" rx="5" fill="rgba(170,190,210,.45)"/>`;
      s += ell(120, 96, 32, 6, 'rgba(235,242,248,.7)');
    } else {
      s += surf(X, p, '#f6f6f3');
      s += ell(120, 96, 32, 6, '#f6f6f3');
      if (a.band || a.tint) s += `<ellipse cx="120" cy="96" rx="32" ry="6" fill="none" stroke="${a.tint || '#f07c22'}" stroke-width="5"/><ellipse cx="120" cy="97" rx="27" ry="4" fill="${a.tint || '#f07c22'}"/>`;
    }
    return s;
  };

  D.tee = (a, X) => {
    const c = a.c || '#f8f8f6';
    const p = 'M84 46 Q120 62 156 46 L198 70 L184 108 L162 100 L162 200 L78 200 L78 100 L56 108 L42 70 Z';
    let s = ground(120, 70, 208) + surf(X, p, c, null, { flat: 1 });
    s += `<path d="M84 46 Q120 76 156 46" fill="none" stroke="${OL}" stroke-width="2"/><path d="M90 48 Q120 70 150 48" fill="${dk(c, .06)}"/>`;
    s += `<path d="M78 100 L78 200 M162 100 L162 200" stroke="#000" stroke-opacity=".05" stroke-width="10"/>`;
    return a.kid ? scaleAt(.8, 120, 208, s) : s;
  };

  D.onesie = () => {
    const p = 'M90 44 Q120 60 150 44 L182 62 L172 92 L156 86 L158 150 Q158 168 140 176 L136 200 L104 200 L100 176 Q82 168 82 150 L84 86 L68 92 L58 62 Z';
    return ground(120, 56, 206) + `<path d="${p}" fill="#f8f8f6" stroke="${OL}" stroke-width="1.2"/><path d="${p}" fill="url(#vs)"/><path d="M90 44 Q120 70 150 44" fill="none" stroke="${OL}" stroke-width="2"/><circle cx="112" cy="194" r="3" fill="#d6d6d6"/><circle cx="128" cy="194" r="3" fill="#d6d6d6"/>`;
  };

  D.sash = () => `${ground(120, 70, 206)}<path d="M70 30 L108 30 L190 182 L160 196 Z" fill="#f8f8f6" stroke="${OL}"/><path d="M70 30 L108 30 L190 182 L160 196 Z" fill="url(#dg)"/><path d="M60 40 L96 34 L84 196 L50 192 Z" fill="#eeeeea" stroke="${OL}"/><path d="M150 196 L176 214 L182 190 Z" fill="#e8e8e4" stroke="${OL}"/>`;

  D.cushion = (a) => {
    const p = a.wide ? 'M30 78 Q120 64 210 78 Q216 130 210 174 Q120 188 30 174 Q24 130 30 78 Z' : 'M50 56 Q120 40 190 56 Q204 126 190 190 Q120 204 50 190 Q36 126 50 56 Z';
    return ground(120, 84, 206) + `<path d="${p}" fill="#f8f8f6" stroke="${OL}" stroke-width="1.2"/><path d="${p}" fill="url(#dg)"/><path d="${p}" fill="url(#vs)" opacity=".6"/>`;
  };

  D.napkin = () => `${ground(120, 70, 200)}<path d="M40 70 L180 54 L200 170 L60 186 Z" fill="#f8f8f6" stroke="${OL}"/><path d="M40 70 L180 54 L200 170 L60 186 Z" fill="url(#dg)"/><path d="M120 62 L200 170 L140 178 Z" fill="#ececE8" opacity=".8"/><path d="M48 76 L176 62 L194 164 L66 178 Z" fill="none" stroke="#000" stroke-opacity=".1" stroke-dasharray="3 3"/>`;

  D.tortillero = () => `${ground(120, 80, 196)}<ellipse cx="120" cy="140" rx="86" ry="44" fill="#f8f8f6" stroke="${OL}"/><ellipse cx="120" cy="140" rx="86" ry="44" fill="url(#vs)"/><ellipse cx="120" cy="128" rx="74" ry="34" fill="#fbfbf9" stroke="${OL}"/><ellipse cx="120" cy="128" rx="68" ry="29" fill="none" stroke="#000" stroke-opacity=".12" stroke-dasharray="3 3"/><path d="M196 132 Q214 118 206 102" fill="none" stroke="#c49a6c" stroke-width="3"/>`;

  D.flag = () => `${ground(70, 40, 206)}<rect x="62" y="26" width="6" height="180" rx="3" fill="#9a6338"/><rect x="62" y="26" width="6" height="180" rx="3" fill="url(#sh)"/><path d="M68 34 Q120 26 176 40 L176 124 Q120 112 68 120 Z" fill="#f8f8f6" stroke="${OL}"/><path d="M68 34 Q120 26 176 40 L176 124 Q120 112 68 120 Z" fill="url(#dg)"/><circle cx="65" cy="24" r="6" fill="#c49a6c"/>`;

  D.slipper = () => `${ground(120, 90, 192)}<path d="M28 160 Q30 128 70 122 L180 112 Q218 112 220 150 Q222 178 190 182 L60 186 Q26 186 28 160 Z" fill="#e8e8e4" stroke="${OL}"/><path d="M60 150 Q70 98 130 96 Q190 96 206 140 Q160 154 60 150 Z" fill="#f8f8f6" stroke="${OL}"/><path d="M60 150 Q70 98 130 96 Q190 96 206 140 Q160 154 60 150 Z" fill="url(#dg)"/><path d="M28 168 Q120 190 220 160" fill="none" stroke="#bbb" stroke-width="5"/>`;

  D.cap = (a) => {
    const c = a.c || '#2457c5', st = a.s;
    let s = ground(120, 86, 196);
    if (st === 'safari') {
      s += `<path d="M24 150 Q120 120 216 150 Q216 172 120 176 Q24 172 24 150 Z" fill="${c}" stroke="${OL}"/><path d="M24 150 Q120 120 216 150 Q216 172 120 176 Q24 172 24 150 Z" fill="url(#vs)"/>`;
      s += `<path d="M62 150 Q60 70 120 64 Q180 70 178 150 Z" fill="${c}" stroke="${OL}"/><path d="M62 150 Q60 70 120 64 Q180 70 178 150 Z" fill="url(#sh)"/><path d="M78 108 L162 108 L170 140 L70 140 Z" fill="#f8f8f6" opacity=".95"/><path d="M62 132 L178 132" stroke="#000" stroke-opacity=".25" stroke-width="5"/><path d="M178 150 Q200 180 192 204" fill="none" stroke="#8a8a8a" stroke-width="2"/>`;
      return s;
    }
    const front = st === 'trucker' || st === 'shield' || !st ? '#f8f8f6' : c;
    // visera
    if (st === 'flat') s += `<path d="M118 150 L222 148 L220 164 L120 170 Z" fill="${c}" stroke="${OL}"/><path d="M120 164 L220 160 L220 164 L120 170 Z" fill="${a.c2 || dk(c)}"/>`;
    else s += `<path d="M122 146 Q186 132 222 160 Q206 178 150 172 Q128 170 122 160 Z" fill="${c}" stroke="${OL}"/><path d="M122 146 Q186 132 222 160 Q206 178 150 172 Q128 170 122 160 Z" fill="url(#vs)"/>`;
    // copa
    const back = 'M30 150 Q22 70 110 56 Q170 52 170 150 Z';
    s += `<path d="${back}" fill="${c}" stroke="${OL}"/>`;
    if (st === 'trucker') s += `<path d="${back}" fill="url(#mesh)"/>`;
    s += `<path d="${back}" fill="url(#sh)"/>`;
    s += `<path d="M98 150 Q92 82 118 58 Q164 58 170 150 Z" fill="${front}" stroke="${OL}"/><path d="M98 150 Q92 82 118 58 Q164 58 170 150 Z" fill="url(#sh)" opacity=".7"/>`;
    s += `<ellipse cx="114" cy="58" rx="8" ry="4" fill="${c}"/><path d="M30 150 L170 150" stroke="${dk(c, .2)}" stroke-width="4"/>`;
    if (st === 'shield') s += `<path d="M120 160 Q180 150 226 166 L230 236 Q170 226 116 232 Z" fill="rgba(210,230,245,.45)" stroke="rgba(110,135,160,.7)" stroke-width="1.4"/><path d="M134 176 L138 220" stroke="#fff" stroke-width="4" opacity=".7"/>`;
    return s;
  };

  D.bag = (a) => {
    const c = a.c || '#2e9b52', st = a.s;
    let s = ground(120, 70, 206), g = '';
    if (st === 'draw') {
      g += `<path d="M60 40 L180 40 L184 200 L56 200 Z" fill="${c}" stroke="${OL}"/><path d="M60 40 L180 40 L184 200 L56 200 Z" fill="url(#dg)"/><path d="M60 52 L180 52" stroke="${dk(c, .2)}" stroke-width="5"/>`;
      g += `<path d="M64 46 Q50 120 58 198 M176 46 Q190 120 182 198" fill="none" stroke="${dk(c, .35)}" stroke-width="3"/>`;
    } else if (st === 'shopper') {
      g += `<path d="M88 76 Q88 30 120 30 Q152 30 152 76" fill="none" stroke="${dk(c, .1)}" stroke-width="9"/>`;
      g += `<path d="M48 72 L192 72 L186 200 L54 200 Z" fill="${c}" stroke="${OL}"/><path d="M48 72 L192 72 L186 200 L54 200 Z" fill="url(#dg)"/><path d="M52 84 L188 84" stroke="#000" stroke-opacity=".12" stroke-dasharray="3 3"/>`;
    } else {
      g += `<path d="M84 80 L90 36 Q120 26 150 36 L156 80" fill="none" stroke="${dk(c, .1)}" stroke-width="10"/>`;
      g += `<path d="M44 76 L196 76 L190 204 L50 204 Z" fill="${c}" stroke="${OL}"/><path d="M44 76 L196 76 L190 204 L50 204 Z" fill="url(#dg)"/><rect x="78" y="106" width="84" height="70" rx="3" fill="#fff" opacity=".9"/>`;
    }
    s += a.small ? scaleAt(.72, 120, 204, g) : g;
    return s;
  };

  D.apron = (a) => {
    const c = a.c || '#f6f6f3', t = a.trim || dk(c, .15);
    const p = 'M86 50 L154 50 L156 96 Q170 100 186 92 L180 206 L60 206 L54 92 Q70 100 84 96 Z';
    return ground(120, 66, 210) + `<path d="M90 50 Q120 -6 150 50" fill="none" stroke="${t}" stroke-width="5"/><path d="${p}" fill="${c}" stroke="${t}" stroke-width="${a.trim ? 4 : 1.2}"/><path d="${p}" fill="url(#dg)"/><rect x="92" y="140" width="56" height="34" rx="3" fill="none" stroke="${a.trim ? t : dk(c, .2)}" stroke-width="2"/><path d="M54 100 L22 120 M186 100 L218 120" stroke="${t}" stroke-width="4"/>`;
  };

  D.plaque = (a, X) => {
    const c = a.c || '#f6f6f3';
    const w = a.big ? 172 : 128, h = a.big ? 116 : 168, x = 120 - w / 2, y = 112 - h / 2 + 6;
    let s = ground(120, w * .55, y + h + 12);
    s += surf(X, `M${x + 8} ${y} L${x + w - 8} ${y} Q${x + w} ${y} ${x + w} ${y + 8} L${x + w} ${y + h - 8} Q${x + w} ${y + h} ${x + w - 8} ${y + h} L${x + 8} ${y + h} Q${x} ${y + h} ${x} ${y + h - 8} L${x} ${y + 8} Q${x} ${y} ${x + 8} ${y} Z`, c, a.fin === 'metal' || c !== '#f6f6f3' ? 'metal' : null, { flat: c === '#f6f6f3' });
    [[x + 10, y + 10], [x + w - 10, y + 10], [x + 10, y + h - 10], [x + w - 10, y + h - 10]].forEach(([px, py]) => { s += `<circle cx="${px}" cy="${py}" r="3" fill="#8b9198"/>`; });
    if (c === '#d8b25a' && a.fin === 'metal') s += `<path d="M${x} ${y + 30} L${x + w} ${y + 30} M${x} ${y + 60} L${x + w} ${y + 60}" stroke="#fff" stroke-opacity=".15" stroke-width="10"/>`;
    return s;
  };

  D.woodbase = (a) => {
    const c = a.c || '#9a6338';
    return ground(120, 96, 186) + `<path d="M24 120 L196 92 L222 132 L48 168 Z" fill="${lt(c, .1)}" stroke="${OL}"/><path d="M24 120 L196 92 L222 132 L48 168 Z" fill="url(#wd)"/><path d="M48 168 L222 132 L222 146 L48 184 Z" fill="${dk(c, .25)}"/><path d="M24 120 L48 168 L48 184 L24 134 Z" fill="${dk(c, .4)}"/><path d="M50 124 L190 102 L204 124 L64 150 Z" fill="none" stroke="#000" stroke-opacity=".2" stroke-width="2"/>`;
  };

  D.stone = (a) => {
    let s = ground(120, 82, 202), p;
    if (a.heart) p = 'M120 190 C60 150 36 118 46 86 C56 56 98 52 120 82 C142 52 184 56 194 86 C204 118 180 150 120 190 Z';
    else if (a.big) p = 'M30 66 L80 58 L150 62 L210 56 L214 120 L208 176 L120 182 L34 178 L28 120 Z';
    else p = 'M36 84 L92 78 L150 82 L204 76 L208 124 L202 168 L120 172 L38 168 L32 124 Z';
    s += `<path d="M98 190 L80 208 M142 190 L160 208" stroke="#2c2f36" stroke-width="5"/>`;
    s += `<path d="${p}" fill="#6f7680" stroke="${OL}"/><path d="${p}" fill="url(#stn)"/><path d="${p}" fill="url(#dg)"/>`;
    s += `<path d="${p}" fill="#f6f6f3" transform="translate(120 120) scale(.82) translate(-120 -120)" opacity=".95"/>`;
    return s;
  };

  D.crystal = (a) => {
    let s = ground(120, 70, 206);
    s += `<path d="M60 186 L180 186 L192 206 L48 206 Z" fill="#2c2f36"/><path d="M60 186 L180 186" stroke="#555" stroke-width="2"/>`;
    const p = a.oct ? 'M88 28 L152 28 L188 66 L188 146 L152 184 L88 184 L52 146 L52 66 Z' : 'M56 40 L184 40 L184 184 L56 184 Z';
    s += `<path d="${p}" fill="rgba(220,236,248,.55)" stroke="rgba(110,135,160,.7)" stroke-width="2"/><path d="${p}" fill="url(#dg)"/>`;
    s += `<path d="${p}" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="2" transform="translate(120 106) scale(.9) translate(-120 -106)"/><path d="M78 60 L108 46 M74 82 L130 54" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".8"/>`;
    return s;
  };

  D.plate = (a) => {
    const c = a.c || '#d8b25a';
    return ground(120, 70, 206) + `<path d="M104 180 L90 208 M136 180 L150 208" stroke="#2c2f36" stroke-width="4"/><circle cx="120" cy="110" r="88" fill="${c}" stroke="${OL}"/><circle cx="120" cy="110" r="88" fill="url(#mt)" opacity=".6"/><circle cx="120" cy="110" r="78" fill="#f8f8f6"/><circle cx="120" cy="110" r="62" fill="#f2f2ee" stroke="#000" stroke-opacity=".06"/><circle cx="120" cy="110" r="78" fill="url(#dg)"/>`;
  };

  D.puzzle = (a) => {
    const base = a.metal ? '#d8b25a' : a.mdf ? '#f6f6f3' : '#f8f8f6';
    let p, w = a.big ? 180 : a.small ? 120 : 150, h = a.big ? 130 : a.small ? 88 : 110;
    const x = 120 - w / 2, y = 112 - h / 2;
    if (a.heart) p = 'M120 186 C56 146 30 112 40 80 C50 48 96 44 120 76 C144 44 190 48 200 80 C210 112 184 146 120 186 Z';
    else p = `M${x} ${y} L${x + w} ${y} L${x + w} ${y + h} L${x} ${y + h} Z`;
    let s = ground(120, 80, 200);
    if (a.mdf) s += `<path d="${p}" fill="#b98a5b" transform="translate(4 6)"/>`;
    s += `<path d="${p}" fill="${base}" stroke="${OL}"/>${a.metal ? `<path d="${p}" fill="url(#mt)" opacity=".5"/>` : `<path d="${p}" fill="url(#dg)"/>`}`;
    const n = a.few || 5;
    let lines = '';
    for (let i = 1; i < n; i++) { const xx = 30 + i * (180 / n); lines += `<path d="M${xx} 30 q6 20 -4 30 q14 8 0 22 q8 14 -2 30 q12 10 0 26 q8 14 0 30 q10 10 2 30" fill="none"/>`; }
    for (let j = 1; j < Math.max(2, n - 1); j++) { const yy = 30 + j * (170 / Math.max(2, n - 1)); lines += `<path d="M20 ${yy} q20 -6 30 4 q8 -12 22 0 q14 -8 30 2 q10 -12 26 0 q14 -8 30 0 q10 -10 30 2 q12 -8 30 0" fill="none"/>`; }
    s += `<clipPath id="pc"><path d="${p}"/></clipPath><g clip-path="url(#pc)" stroke="#000" stroke-opacity=".18" stroke-width="1.4">${lines}</g>`;
    return s;
  };

  D.frame = () => `${ground(120, 70, 204)}<path d="M120 190 L160 204" stroke="#7a5536" stroke-width="5"/><rect x="58" y="34" width="124" height="160" rx="3" fill="#b98a5b"/><rect x="54" y="30" width="124" height="160" rx="3" fill="#f6f6f3" stroke="${OL}"/><rect x="54" y="30" width="124" height="160" rx="3" fill="url(#dg)"/><rect x="66" y="42" width="100" height="136" fill="none" stroke="#000" stroke-opacity=".08"/>`;

  D.keychain = (a) => {
    const c = a.mdf ? '#f6f6f3' : '#c9ced4';
    let s = ground(120, 46, 206) + `<circle cx="120" cy="40" r="22" fill="none" stroke="#9aa1a8" stroke-width="4"/><path d="M120 62 L120 82" stroke="#9aa1a8" stroke-width="3" stroke-dasharray="4 2"/>`;
    const p = a.mdf ? 'M120 196 C70 164 52 138 58 114 C64 88 98 84 120 110 C142 84 176 88 182 114 C188 138 170 164 120 196 Z' : 'M76 84 L164 84 Q172 84 172 92 L172 140 Q172 176 120 200 Q68 176 68 140 L68 92 Q68 84 76 84 Z';
    if (a.mdf) s += `<path d="${p}" fill="#b98a5b" transform="translate(3 4)"/>`;
    s += `<path d="${p}" fill="${c}" stroke="${OL}"/><path d="${p}" fill="url(#${a.mdf ? 'dg' : 'mt'})" opacity="${a.mdf ? 1 : .55}"/>`;
    if (!a.mdf) s += `<path d="M82 96 L158 96 L158 138 Q158 166 120 184 Q82 166 82 138 Z" fill="#f8f8f6"/>`;
    return s;
  };

  D.pad = (a) => {
    let s = ground(120, 88, 192);
    const sh = a.s;
    const shape = (p) => `<path d="${p}" fill="#26262c" transform="translate(0 7)"/><path d="${p}" fill="#f8f8f6" stroke="${OL}"/><path d="${p}" fill="url(#dg)"/>`;
    if (sh === 'heart') s += shape('M120 180 C54 140 28 104 40 72 C52 42 98 40 120 72 C142 40 188 42 200 72 C212 104 186 140 120 180 Z');
    else if (sh === 'circle') s += shape('M120 30 A84 72 0 1 1 119.9 30 Z');
    else if (sh === 'coaster') s += shape('M84 64 A50 44 0 1 1 83.9 64 Z') + shape('M132 98 L204 98 Q212 98 212 106 L212 170 Q212 178 204 178 L132 178 Q124 178 124 170 L124 106 Q124 98 132 98 Z');
    else s += shape('M34 52 L206 52 Q214 52 214 60 L214 168 Q214 176 206 176 L34 176 Q26 176 26 168 L26 60 Q26 52 34 52 Z');
    return s;
  };

  D.sequin = (a) => {
    let s = ground(120, 84, 200);
    let p = a.s === 'heart' ? 'M120 186 C56 146 30 112 40 80 C50 48 96 44 120 76 C144 44 190 48 200 80 C210 112 184 146 120 186 Z' : a.s === 'circle' ? 'M120 26 A82 82 0 1 1 119.9 26 Z' : 'M56 30 L184 30 L184 196 L56 196 Z';
    s += `<path d="${p}" fill="#c9ced4" stroke="${OL}"/><path d="${p}" fill="url(#sq)"/><path d="${p}" fill="url(#mt)" opacity=".45"/>`;
    s += `<clipPath id="sc"><path d="${p}"/></clipPath><path d="M0 0 L240 0 L240 110 Q120 150 0 100 Z" fill="#f8f8f6" clip-path="url(#sc)" opacity=".92"/>`;
    return s;
  };

  D.tile = (a) => {
    const w = a.big ? 120 : a.small ? 96 : 120, h = a.big ? 170 : a.small ? 96 : 120;
    const x = 120 - w / 2, y = 108 - h / 2;
    return ground(120, w * .6, y + h + 14) + `<path d="M${x + 20} ${y + h} L${x + 10} ${y + h + 14} M${x + w - 20} ${y + h} L${x + w - 10} ${y + h + 14}" stroke="#2c2f36" stroke-width="4"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#f8f8f6" stroke="${OL}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="url(#dg)"/><rect x="${x + 4}" y="${y + 4}" width="${w - 8}" height="${h - 8}" rx="2" fill="none" stroke="#fff" stroke-width="2"/>`;
  };

  D.piggy = (a, X) => {
    const p = 'M52 120 Q52 64 120 62 Q186 62 192 116 Q196 168 140 176 L140 196 L124 196 L122 178 L100 178 L98 196 L82 196 L80 172 Q52 158 52 120 Z';
    return ground(122, 70, 204) + `<path d="M190 112 Q214 104 210 128" fill="none" stroke="#e9e9e5" stroke-width="5"/>` + surf(X, p, '#f6f6f3') + `<path d="M84 74 L90 50 L106 66 Z" fill="#f2f2ee" stroke="${OL}"/><ellipse cx="54" cy="122" rx="12" ry="14" fill="#efefeb" stroke="${OL}"/><circle cx="52" cy="118" r="2" fill="#aaa"/><circle cx="52" cy="126" r="2" fill="#aaa"/><circle cx="76" cy="102" r="3.5" fill="#26262c"/><rect x="110" y="62" width="30" height="5" rx="2.5" fill="#2c2f36"/>`;
  };

  D.opener = (a, X) => ground(120, 50, 206) + surf(X, 'M84 30 L156 30 Q164 30 164 38 L164 192 Q164 200 156 200 L84 200 Q76 200 76 192 L76 38 Q76 30 84 30 Z', '#c9ced4', 'metal') + `<rect x="86" y="40" width="68" height="100" rx="4" fill="#f8f8f6"/><path d="M98 158 L142 158 Q148 178 120 182 Q92 178 98 158 Z" fill="#3a3e47"/>`;

  D.binder = (a) => {
    const c = a.c || '#26262c';
    const w = a.thin ? 120 : 132, h = a.tall ? 176 : 156, x = 120 - w / 2, y = 110 - h / 2;
    let s = ground(120, 76, y + h + 10);
    s += `<rect x="${x + 10}" y="${y + 6}" width="${w}" height="${h}" rx="6" fill="${dk(c, .3)}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${c}" stroke="${OL}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="url(#dg)"/>`;
    if (!a.thin) s += `<rect x="${x + 6}" y="${y + 6}" width="${w - 12}" height="${h - 12}" rx="4" fill="none" stroke="#fff" stroke-opacity=".25" stroke-dasharray="3 3"/>`;
    else s += `<rect x="${x + 22}" y="${y + 26}" width="${w - 44}" height="${h - 70}" rx="2" fill="#f8f8f6" opacity=".95"/>`;
    return s;
  };

  D.lanyard = (a) => {
    const c = a.c || '#26262c';
    return ground(120, 46, 210) + `<path d="M60 10 L112 150 M180 10 L128 150" stroke="${c}" stroke-width="16" stroke-linecap="round"/><path d="M60 10 L112 150 M180 10 L128 150" stroke="#fff" stroke-opacity=".2" stroke-width="4"/><rect x="108" y="146" width="24" height="16" rx="3" fill="#c9ced4" stroke="${OL}"/><path d="M120 162 L120 176" stroke="#9aa1a8" stroke-width="4"/><path d="M112 176 Q120 206 128 176" fill="none" stroke="#9aa1a8" stroke-width="5"/>`;
  };

  D.card = (a) => {
    let s = ground(120, 72, 196);
    if (a.stack) for (let i = 3; i > 0; i--) s += `<rect x="${44 + i * 5}" y="${66 - i * 6}" width="152" height="96" rx="9" fill="#f2f2ee" stroke="${OL}"/>`;
    if (a.clear) s += `<rect x="40" y="56" width="160" height="${a.thick ? 120 : 110}" rx="10" fill="rgba(215,232,245,.5)" stroke="rgba(110,135,160,.7)" stroke-width="${a.thick ? 3 : 1.4}"/><rect x="104" y="64" width="32" height="7" rx="3.5" fill="#fff" stroke="rgba(110,135,160,.7)"/><path d="M58 78 L98 64" stroke="#fff" stroke-width="5" stroke-linecap="round"/>`;
    else s += `<rect x="44" y="66" width="152" height="96" rx="9" fill="#f8f8f6" stroke="${OL}"/><rect x="44" y="66" width="152" height="96" rx="9" fill="url(#dg)"/>`;
    return s;
  };

  D.pen = (a) => {
    const c = a.c || '#f6f6f3';
    let s = ground(120, 80, 192);
    const g = `<rect x="20" y="108" width="190" height="20" rx="10" fill="${c}" stroke="${OL}"/><rect x="20" y="108" width="190" height="20" rx="10" fill="url(#${c === '#c9ced4' ? 'mt' : 'sh'})" transform="rotate(90 115 118)" opacity="0"/><path d="M30 112 L200 112" stroke="#fff" stroke-opacity=".6" stroke-width="3"/><path d="M210 112 L232 118 L210 124 Z" fill="#c9ced4" stroke="${OL}"/><rect x="20" y="108" width="34" height="20" rx="8" fill="${a.cheap ? c : '#c9ced4'}" stroke="${OL}"/><rect x="34" y="98" width="70" height="7" rx="3.5" fill="${a.cheap ? dk(c, .2) : '#c9ced4'}" stroke="${OL}"/>`;
    s += `<g transform="rotate(-24 120 118)">${g}</g>`;
    if (c !== '#c9ced4' && !a.cheap) s += `<g transform="rotate(-24 120 118) translate(0 34)"><rect x="40" y="108" width="170" height="20" rx="10" fill="#c9ced4" stroke="${OL}" opacity=".9"/></g>`;
    return s;
  };

  D.box = (a) => {
    const kc = '#f6f6f3';
    if (a.flat) return ground(120, 90, 190) + `<path d="M30 110 L130 76 L214 100 L114 136 Z" fill="${lt(kc, .3)}" stroke="${OL}"/><path d="M30 110 L114 136 L114 160 L30 132 Z" fill="${dk(kc, .08)}" stroke="${OL}"/><path d="M114 136 L214 100 L214 122 L114 160 Z" fill="${dk(kc, .14)}" stroke="${OL}"/>`;
    const h = a.tall ? 120 : 92;
    let s = ground(120, 82, 204);
    s += `<path d="M48 ${190 - h} L120 ${166 - h} L192 ${190 - h} L120 ${214 - h} Z" fill="#fbfbf9" stroke="${OL}"/>`;
    s += `<path d="M48 ${190 - h} L120 ${214 - h} L120 214 L48 190 Z" fill="#efefeb" stroke="${OL}"/><path d="M120 ${214 - h} L192 ${190 - h} L192 190 L120 214 Z" fill="#e2e2dd" stroke="${OL}"/>`;
    if (a.win) s += `<path d="M62 ${206 - h} L106 ${222 - h} L106 196 L62 180 Z" fill="rgba(200,220,240,.6)" stroke="rgba(110,135,160,.6)"/><path d="M70 ${210 - h} L80 ${216 - h} L80 188" stroke="#fff" stroke-width="3" opacity=".7"/>`;
    if (a.c === '#c9ced4') s = s.replace(/#efefeb|#e2e2dd|#fbfbf9/g, '#c9ced4');
    return s;
  };

  D.folder = () => `${ground(120, 90, 196)}<path d="M40 44 L168 44 L176 186 L48 186 Z" fill="#e8e8e4" stroke="${OL}"/><path d="M60 40 L196 40 L196 190 L60 190 Z" fill="#f8f8f6" stroke="${OL}"/><path d="M60 40 L196 40 L196 190 L60 190 Z" fill="url(#dg)"/><path d="M60 150 L196 130 L196 190 L60 190 Z" fill="#efefeb" stroke="${OL}"/>`;

  D.kraft = (a) => {
    const kc = '#c49a6c';
    const w = a.wide ? 150 : a.tall ? 104 : 92, h = a.wide ? 112 : a.tall ? 150 : 120;
    const x = 120 - w / 2, y = 204 - h;
    let s = ground(120, w * .6, 206);
    s += `<path d="M${x + w * .28} ${y + 4} Q${x + w * .28} ${y - 36} ${x + w * .5} ${y - 36} Q${x + w * .72} ${y - 36} ${x + w * .72} ${y + 4}" fill="none" stroke="${dk(kc, .25)}" stroke-width="4"/>`;
    s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${kc}" stroke="${OL}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#dg)"/><path d="M${x + w - 14} ${y} L${x + w - 14} ${y + h}" stroke="#000" stroke-opacity=".12"/><path d="M${x} ${y + 12} L${x + w} ${y + 12}" stroke="#000" stroke-opacity=".08"/>`;
    if (a.ribbon) s += `<path d="M${x + w / 2} ${y + 6} L${x + w / 2 - 22} ${y - 6} L${x + w / 2 - 20} ${y + 18} Z M${x + w / 2} ${y + 6} L${x + w / 2 + 22} ${y - 6} L${x + w / 2 + 20} ${y + 18} Z" fill="${a.ribbon}"/><path d="M${x + w / 2 - 4} ${y + 10} L${x + w / 2 - 12} ${y + 40} M${x + w / 2 + 4} ${y + 10} L${x + w / 2 + 12} ${y + 40}" stroke="${a.ribbon}" stroke-width="4"/><circle cx="${x + w / 2}" cy="${y + 7}" r="5" fill="${dk(a.ribbon, .15)}"/>`;
    return s;
  };

  D.pin = () => `${ground(120, 70, 196)}<circle cx="96" cy="110" r="60" fill="#c9ced4" stroke="${OL}"/><circle cx="96" cy="110" r="60" fill="url(#mt)" opacity=".6"/><path d="M60 104 L132 104" stroke="#555" stroke-width="3"/><circle cx="150" cy="128" r="58" fill="#f8f8f6" stroke="${OL}"/><circle cx="150" cy="128" r="58" fill="url(#dg)"/><circle cx="150" cy="128" r="50" fill="none" stroke="#fff" stroke-width="3"/>`;

  D.band = () => {
    const cols = ['#e53935', '#fb8c00', '#fdd835', '#43a047', '#1e88e5', '#8e24aa'];
    return ground(120, 90, 200) + cols.map((c, i) => `<rect x="${24 + i * 6}" y="${54 + i * 20}" width="190" height="20" rx="3" fill="${c}" stroke="${OL}"/><rect x="${24 + i * 6}" y="${54 + i * 20}" width="190" height="20" rx="3" fill="url(#vs)"/>`).join('');
  };

  D.lighter = () => {
    const cols = ['#e53935', '#1e88e5', '#fdd835', '#43a047', '#8e24aa'];
    return ground(120, 90, 204) + cols.map((c, i) => `<g transform="translate(${30 + i * 38} ${i % 2 ? 6 : 0})"><rect x="0" y="62" width="30" height="128" rx="6" fill="${c}" opacity=".85" stroke="${OL}"/><rect x="0" y="62" width="30" height="128" rx="6" fill="url(#sh)"/><rect x="2" y="42" width="26" height="24" rx="3" fill="#c9ced4" stroke="${OL}"/><circle cx="20" cy="50" r="6" fill="#3a3e47"/></g>`).join('');
  };

  const machineBody = (c = '#2b2d33') => ({ c, l: lt(c, .15), d: dk(c, .3) });

  D.laminator = () => `${ground(120, 96, 186)}<path d="M30 110 L180 80 L216 104 L66 140 Z" fill="#e7e8ea" stroke="${OL}"/><path d="M30 110 L66 140 L66 172 L30 142 Z" fill="#cfd2d6" stroke="${OL}"/><path d="M66 140 L216 104 L216 136 L66 172 Z" fill="#dcdfe2" stroke="${OL}"/><path d="M60 112 L170 90" stroke="#2b2d33" stroke-width="5"/><circle cx="196" cy="118" r="4" fill="#2bb673"/><circle cx="184" cy="121" r="4" fill="#e53935"/>`;

  D.cutter = (a) => `${ground(120, 90, 196)}<path d="M40 150 L200 150 L210 178 L30 178 Z" fill="#2b2d33"/><rect x="70" y="100" width="100" height="52" rx="6" fill="#3a3e47"/><rect x="104" y="40" width="14" height="70" rx="4" fill="#c9ced4" stroke="${OL}"/><path d="M111 46 L200 24" stroke="#c9ced4" stroke-width="9" stroke-linecap="round"/><circle cx="202" cy="24" r="10" fill="#e53935"/>${a.round ? '<ellipse cx="120" cy="150" rx="26" ry="8" fill="#9aa1a8"/>' : '<rect x="96" y="144" width="48" height="10" rx="3" fill="#9aa1a8"/>'}`;

  D.buttonpress = () => `${ground(120, 80, 200)}<rect x="56" y="170" width="128" height="22" rx="4" fill="#2b2d33"/><rect x="146" y="40" width="20" height="134" fill="#3a3e47"/><rect x="74" y="58" width="92" height="30" rx="4" fill="#3a3e47"/><rect x="96" y="88" width="24" height="40" fill="#c9ced4" stroke="${OL}"/><path d="M160 60 L212 20" stroke="#c9ced4" stroke-width="8" stroke-linecap="round"/><circle cx="214" cy="18" r="10" fill="#e53935"/><ellipse cx="108" cy="166" rx="30" ry="9" fill="#9aa1a8"/><ellipse cx="108" cy="162" rx="22" ry="6" fill="#c9ced4"/>`;

  D.mold = () => `${ground(120, 90, 196)}<ellipse cx="80" cy="150" rx="46" ry="16" fill="#9aa1a8"/><rect x="34" y="118" width="92" height="32" fill="#c9ced4"/><ellipse cx="80" cy="118" rx="46" ry="16" fill="#e2e4e7" stroke="${OL}"/><ellipse cx="80" cy="118" rx="28" ry="9" fill="#9aa1a8"/><ellipse cx="164" cy="150" rx="46" ry="16" fill="#9aa1a8"/><rect x="118" y="118" width="92" height="32" fill="#c9ced4"/><ellipse cx="164" cy="118" rx="46" ry="16" fill="#e2e4e7" stroke="${OL}"/><circle cx="164" cy="118" r="10" fill="#3a3e47"/>`;

  D.punch = () => `${ground(120, 80, 196)}<path d="M40 70 Q120 54 160 96 L176 108" fill="none" stroke="#e53935" stroke-width="16" stroke-linecap="round"/><path d="M40 156 Q120 170 160 128 L176 116" fill="none" stroke="#e53935" stroke-width="16" stroke-linecap="round"/><circle cx="168" cy="112" r="14" fill="#c9ced4" stroke="${OL}"/><path d="M176 102 L212 96 L212 128 L176 122 Z" fill="#9aa1a8" stroke="${OL}"/>`;

  D.ink = (a) => {
    const c = a.c || '#18a8d8';
    if (a.set) return ground(120, 90, 204) + ['#18a8d8', '#e0157f', '#f6c533', '#26262c'].map((k, i) => `<g transform="translate(${36 + i * 44} 0)"><rect x="0" y="80" width="36" height="118" rx="6" fill="#f4f6f8" stroke="${OL}"/><rect x="0" y="80" width="36" height="118" rx="6" fill="url(#sh)"/><rect x="0" y="120" width="36" height="52" fill="${k}"/><rect x="10" y="60" width="16" height="22" rx="3" fill="${k}"/></g>`).join('');
    const big = a.big, sm = a.small;
    const w = big ? 92 : sm ? 56 : 66, h = big ? 140 : sm ? 84 : 112, x = 120 - w / 2, y = 200 - h;
    let s = ground(120, w * .7, 206);
    s += `<path d="M${x} ${y + 18} Q${x} ${y} ${x + 18} ${y} L${x + w - 18} ${y} Q${x + w} ${y} ${x + w} ${y + 18} L${x + w} ${y + h - 6} Q${x + w} ${y + h} ${x + w - 6} ${y + h} L${x + 6} ${y + h} Q${x} ${y + h} ${x} ${y + h - 6} Z" fill="${lt(c, .55)}" stroke="${OL}"/>`;
    s += `<rect x="${x}" y="${y + h * .25}" width="${w}" height="${h * .75}" rx="4" fill="${c}" opacity=".9"/><path d="M${x} ${y + 18} Q${x} ${y} ${x + 18} ${y} L${x + w - 18} ${y} Q${x + w} ${y} ${x + w} ${y + 18} L${x + w} ${y + h - 6} Q${x + w} ${y + h} ${x + w - 6} ${y + h} L${x + 6} ${y + h} Q${x} ${y + h} ${x} ${y + h - 6} Z" fill="url(#sh)"/>`;
    s += `<rect x="${x + 8}" y="${y + h * .42}" width="${w - 16}" height="${h * .34}" rx="3" fill="#fff" opacity=".92"/><rect x="${x + 14}" y="${y + h * .5}" width="${w - 28}" height="5" rx="2" fill="${c}"/><rect x="${x + 14}" y="${y + h * .6}" width="${(w - 28) * .6}" height="4" rx="2" fill="#bbb"/>`;
    s += `<rect x="${120 - w * .2}" y="${y - 22}" width="${w * .4}" height="24" rx="4" fill="#26262c"/><rect x="${120 - w * .2}" y="${y - 22}" width="${w * .4}" height="24" rx="4" fill="url(#sh)"/>`;
    if (big) s += `<path d="M${x + w - 4} ${y + 20} C${x + w + 26} ${y + 24} ${x + w + 26} ${y + 70} ${x + w - 4} ${y + 74}" fill="none" stroke="${lt(c, .55)}" stroke-width="10"/>`;
    return s;
  };

  D.doypack = (a) => {
    const c = a.c || '#18a8d8';
    const p = 'M70 40 L170 40 L174 170 Q176 196 150 198 L90 198 Q64 196 66 170 Z';
    return ground(120, 64, 206) + `<path d="${p}" fill="${c}" stroke="${OL}"/><path d="${p}" fill="url(#sh)"/><rect x="70" y="40" width="100" height="14" fill="${dk(c, .2)}"/><rect x="84" y="96" width="72" height="56" rx="4" fill="#fff" opacity=".92"/><rect x="94" y="108" width="52" height="6" rx="3" fill="${c}"/><rect x="94" y="122" width="34" height="4" rx="2" fill="#bbb"/><rect x="142" y="56" width="16" height="22" rx="3" fill="#26262c"/>`;
  };

  D.roll = (a, X) => {
    const c = a.c || '#fdfdfd';
    let s = ground(120, 92, 186);
    const fill = a.rainbow ? 'url(#rb)' : a.clear ? 'rgba(215,232,245,.6)' : c;
    s += `<path d="M44 84 L184 84 L184 160 L44 160 Z" fill="${fill}" stroke="${OL}"/><path d="M44 84 L184 84 L184 160 L44 160 Z" fill="url(#vs)"/><path d="M44 84 L184 84 L184 160 L44 160 Z" fill="url(#sh)" transform="rotate(90 114 122)" opacity="0"/>`;
    s += `<path d="M44 92 L184 92" stroke="#fff" stroke-opacity=".6" stroke-width="5"/><path d="M44 148 L184 148" stroke="#000" stroke-opacity=".08" stroke-width="10"/>`;
    s += `<ellipse cx="184" cy="122" rx="20" ry="38" fill="${a.rainbow ? '#e9d7ff' : a.clear ? '#dfeaf3' : dk(c, .06)}" stroke="${OL}"/><ellipse cx="184" cy="122" rx="8" ry="14" fill="#c49a6c" stroke="${OL}"/><ellipse cx="184" cy="122" rx="4" ry="7" fill="#7a5536"/>`;
    s += `<ellipse cx="44" cy="122" rx="20" ry="38" fill="${a.rainbow ? '#ffc9e3' : a.clear ? '#cfe0ec' : dk(c, .12)}" opacity=".6"/><path d="M44 160 L36 188 L176 188 L184 160" fill="${fill}" stroke="${OL}" opacity=".85"/>`;
    return s;
  };

  D.paper = (a) => {
    const c = a.c || '#fff';
    let s = ground(120, 90, 196);
    if (a.fabric) return s + `<path d="M50 50 L184 40 L196 184 L60 194 Z" fill="${c}" stroke="${OL}"/><path d="M50 50 L184 40 L196 184 L60 194 Z" fill="url(#dg)"/><path d="M58 58 L178 48 L188 176 L66 186 Z" fill="none" stroke="#000" stroke-opacity=".1" stroke-dasharray="2 3"/>`;
    s += `<path d="M36 124 L132 90 L212 118 L116 154 Z" fill="${lt(c, .4)}" stroke="${OL}"/><path d="M36 124 L116 154 L116 ${a.box ? 192 : 174} L36 ${a.box ? 162 : 144} Z" fill="${c}" stroke="${OL}"/><path d="M116 154 L212 118 L212 ${a.box ? 156 : 138} L116 ${a.box ? 192 : 174} Z" fill="${dk(c, .12)}" stroke="${OL}"/>`;
    s += `<path d="M66 116 L140 90 L184 106 L110 134 Z" fill="#fff" opacity=".85"/><path d="M84 116 L140 96" stroke="#1e2b4d" stroke-width="4" opacity=".5"/>`;
    if (a.photo) s += `<path d="M90 118 L132 104 L158 114 L116 130 Z" fill="url(#rb)" opacity=".7"/>`;
    for (let i = 1; i < 4; i++) s += `<path d="M36 ${124 + i * 5} L116 ${154 + i * 5}" stroke="#000" stroke-opacity=".06"/>`;
    return s;
  };

  D.poly = () => `${ground(120, 64, 206)}<path d="M66 48 L174 48 L180 184 Q120 206 60 184 Z" fill="rgba(235,240,245,.75)" stroke="rgba(110,135,160,.6)"/><path d="M68 110 Q120 96 176 110 L180 184 Q120 206 60 184 Z" fill="#fbfbf9"/><rect x="66" y="48" width="108" height="12" fill="#c9d3dc"/><rect x="86" y="80" width="68" height="28" rx="3" fill="#1e2b4d"/><path d="M96 94 L144 94" stroke="#fff" stroke-width="4"/><path d="M60 50 L60 184" stroke="#fff" stroke-width="3" opacity=".6"/>`;

  D.tape = (a) => {
    const c = a.c || '#d98a2b';
    const t = a.wide ? 30 : 20;
    return ground(120, 74, 196) + `<ellipse cx="120" cy="${118 + t}" rx="70" ry="66" fill="${dk(c, .2)}" opacity=".9"/><rect x="50" y="118" width="140" height="${t}" fill="${dk(c, .15)}"/><ellipse cx="120" cy="118" rx="70" ry="66" fill="${c}" stroke="${OL}"/><ellipse cx="120" cy="118" rx="70" ry="66" fill="url(#dg)"/><ellipse cx="120" cy="118" rx="38" ry="36" fill="#f6f2ea" stroke="${OL}"/><ellipse cx="120" cy="118" rx="30" ry="28" fill="#fff"/><path d="M178 150 L212 196 L196 204 L164 160" fill="${c}" opacity=".7"/>`;
  };

  D.rollup = (a, X) => {
    const w = a.wide ? 100 : a.small ? 96 : 84, top = a.small ? 70 : 18, x = 120 - w / 2;
    let s = ground(120, w * .7, 206);
    const id = lg(X, [[0, '#1e2b4d'], [1, '#2c3d6b']], true);
    s += `<rect x="${x}" y="${top}" width="${w}" height="${190 - top}" fill="${id}" stroke="${OL}"/>`;
    const cy = ['#18a8d8', '#e0157f', '#f6c533'];
    cy.forEach((k, i) => { s += `<path d="M${x} ${top + 60 + i * 26} C${x + w * .3} ${top + 40 + i * 26} ${x + w * .7} ${top + 84 + i * 26} ${x + w} ${top + 64 + i * 26} L${x + w} ${top + 80 + i * 26} C${x + w * .7} ${top + 100 + i * 26} ${x + w * .3} ${top + 56 + i * 26} ${x} ${top + 76 + i * 26} Z" fill="${k}" opacity=".95"/>`; });
    s += `<rect x="${x + 10}" y="${top + 14}" width="${w * .5}" height="8" rx="2" fill="#fff" opacity=".9"/><rect x="${x + 10}" y="${top + 28}" width="${w * .35}" height="5" rx="2" fill="#c49a6c"/>`;
    s += `<rect x="${x - 6}" y="188" width="${w + 12}" height="14" rx="4" fill="#c9ced4" stroke="${OL}"/><rect x="${x - 6}" y="188" width="${w + 12}" height="14" rx="4" fill="url(#mt)" opacity=".6"/>`;
    if (!a.small) s += `<rect x="${x - 4}" y="${top - 4}" width="${w + 8}" height="6" rx="3" fill="#9aa1a8"/>`;
    else s += `<path d="M${x + w * .5} 200 L${x + w * .5 + 30} 120" stroke="#9aa1a8" stroke-width="3"/>`;
    return s;
  };

  D.heater = (a) => {
    const s0 = a.s;
    let s = ground(120, 66, 200);
    const or = '#d9622b';
    let w = 96, h = 100, y = 64, tw = 0;
    if (s0 === 'tall') { h = 140; y = 44; w = 84; }
    if (s0 === 'small') { h = 76; y = 92; w = 86; }
    if (s0 === 'shot') { h = 56; y = 112; w = 62; }
    if (s0 === 'conic') tw = 18;
    if (s0 === 'pen') return s + `<rect x="40" y="96" width="160" height="56" rx="10" fill="${or}" stroke="${OL}"/><rect x="40" y="96" width="160" height="56" rx="10" fill="url(#vs)"/><path d="M40 124 L200 124" stroke="#7a2b10" stroke-width="3"/><path d="M200 124 Q230 130 222 196" fill="none" stroke="#26262c" stroke-width="5"/>`;
    const x = 120 - w / 2;
    const p = `M${x - tw / 2} ${y} L${x + w + tw / 2} ${y} L${x + w} ${y + h} L${x} ${y + h} Z`;
    s += `<path d="${p}" fill="${or}" stroke="${OL}"/><path d="${p}" fill="url(#sh)"/>`;
    s += `<path d="M${x + w * .5} ${y} L${x + w * .5} ${y + h}" stroke="#7a2b10" stroke-opacity=".3" stroke-width="2"/>`;
    s += `<rect x="${x + w - 6}" y="${y + h * .3}" width="20" height="${h * .4}" rx="3" fill="#c9ced4" stroke="${OL}"/><path d="M${x + w + 14} ${y + h * .5} Q${x + w + 50} ${y + h * .55} ${x + w + 36} ${200}" fill="none" stroke="#26262c" stroke-width="5"/>`;
    s += `<rect x="${x - 6}" y="${y + h * .3}" width="14" height="${h * .4}" rx="3" fill="#9aa1a8"/>`;
    return s;
  };

  D.mugpress = (a) => {
    const m = machineBody(a.c || '#d8322c');
    let s = ground(120, 92, 206);
    s += `<rect x="40" y="168" width="160" height="34" rx="6" fill="${m.d}"/><rect x="40" y="160" width="160" height="34" rx="6" fill="${m.c}" stroke="${OL}"/><rect x="40" y="160" width="160" height="34" rx="6" fill="url(#vs)"/><rect x="58" y="168" width="50" height="16" rx="3" fill="#15171c"/><text x="83" y="180" fill="#ff5a3c" font-family="monospace" font-size="11" text-anchor="middle">180°</text><circle cx="128" cy="176" r="5" fill="#e2e4e7"/><circle cx="144" cy="176" r="5" fill="#e2e4e7"/>`;
    s += `<rect x="160" y="70" width="22" height="94" fill="${m.c}" stroke="${OL}"/><rect x="160" y="70" width="22" height="94" fill="url(#sh)"/>`;
    const wrap = (cx) => `<path d="M${cx - 38} 92 L${cx + 38} 92 L${cx + 38} 152 L${cx - 38} 152 Z" fill="#d9622b" stroke="${OL}"/><path d="M${cx - 38} 92 L${cx + 38} 92 L${cx + 38} 152 L${cx - 38} 152 Z" fill="url(#sh)"/><rect x="${cx - 44}" y="86" width="88" height="10" rx="4" fill="${m.l}" stroke="${OL}"/>`;
    if (a.double) { s += wrap(78) + `<rect x="114" y="98" width="40" height="48" fill="#d9622b" opacity=".85"/>`; }
    else s += wrap(108);
    s += `<path d="M170 74 L170 30 Q170 22 178 22 L214 22" fill="none" stroke="#2b2d33" stroke-width="9" stroke-linecap="round"/><circle cx="216" cy="22" r="9" fill="#15171c"/>`;
    return s;
  };

  D.cappress = (a) => {
    const m = machineBody(a.c || '#d8322c');
    let s = ground(120, 92, 206);
    s += `<rect x="36" y="166" width="168" height="34" rx="6" fill="${m.c}" stroke="${OL}"/><rect x="36" y="166" width="168" height="34" rx="6" fill="url(#vs)"/><rect x="54" y="174" width="50" height="16" rx="3" fill="#15171c"/>`;
    s += `<rect x="168" y="46" width="22" height="124" fill="${m.c}" stroke="${OL}"/><rect x="168" y="46" width="22" height="124" fill="url(#sh)"/>`;
    s += `<path d="M60 150 Q120 110 172 150 L172 160 L60 160 Z" fill="#e2e4e7" stroke="${OL}"/><path d="M58 108 Q120 70 176 108 L176 122 Q120 86 58 122 Z" fill="#c9ced4" stroke="${OL}"/><path d="M58 108 Q120 70 176 108 L176 122 Q120 86 58 122 Z" fill="url(#mt)" opacity=".5"/>`;
    s += `<rect x="100" y="56" width="76" height="30" rx="4" fill="${m.c}" stroke="${OL}"/><path d="M178 60 L218 26" stroke="#2b2d33" stroke-width="9" stroke-linecap="round"/><circle cx="220" cy="24" r="9" fill="#15171c"/>`;
    return s;
  };

  D.portable = () => `${ground(120, 86, 196)}<path d="M40 170 L120 120 L208 150 L128 200 Z" fill="#2b2d33"/><path d="M40 160 L120 110 L208 140 L128 190 Z" fill="#e2e4e7" stroke="${OL}"/><path d="M40 160 L120 110 L208 140 L128 190 Z" fill="url(#dg)"/><path d="M84 126 Q120 64 168 120" fill="none" stroke="#d8322c" stroke-width="16" stroke-linecap="round"/><rect x="104" y="140" width="40" height="14" rx="3" fill="#15171c" transform="rotate(-20 124 147)"/>`;

  D.press = (a) => {
    const m = machineBody(a.c || '#d8322c');
    const pw = a.wide ? 164 : 140, px = 120 - pw / 2 - 10;
    let s = ground(120, 100, 208);
    // base y platina inferior
    s += `<path d="M${px} 178 L${px + pw} 178 L${px + pw + 24} 196 L${px + 20} 196 Z" fill="${m.d}"/>`;
    s += `<path d="M${px + 6} 164 L${px + pw} 164 L${px + pw + 20} 180 L${px + 24} 180 Z" fill="#d6d9dc" stroke="${OL}"/><path d="M${px + 6} 164 L${px + pw} 164 L${px + pw + 20} 180 L${px + 24} 180 Z" fill="url(#dg)"/>`;
    // columna
    s += `<rect x="${px + pw - 6}" y="64" width="24" height="112" fill="${m.c}" stroke="${OL}"/><rect x="${px + pw - 6}" y="64" width="24" height="112" fill="url(#sh)"/>`;
    // platina superior
    s += `<path d="M${px} 100 L${px + pw + 4} 100 L${px + pw + 22} 116 L${px + 18} 116 Z" fill="${m.l}" stroke="${OL}"/><path d="M${px + 18} 116 L${px + pw + 22} 116 L${px + pw + 22} 128 L${px + 18} 128 Z" fill="${m.c}"/><path d="M${px} 100 L${px + 18} 116 L${px + 18} 128 L${px} 112 Z" fill="${m.d}"/><path d="M${px} 100 L${px + pw + 4} 100 L${px + pw + 22} 116 L${px + 18} 116 Z" fill="url(#dg)"/>`;
    s += `<rect x="${px + 40}" y="104" width="44" height="9" rx="2" fill="#15171c" transform="skewX(-30) translate(60 0)"/>`;
    // control
    s += `<rect x="${px + pw - 30}" y="70" width="44" height="28" rx="4" fill="#15171c"/><text x="${px + pw - 8}" y="89" fill="#ff5a3c" font-family="monospace" font-size="12" text-anchor="middle">${a.auto ? 'AUTO' : '200°'}</text>`;
    // palanca
    s += `<path d="M${px + pw + 6} 70 L${px + pw + 6} 26 Q${px + pw + 6} 18 ${px + pw - 4} 18 L${px + 30} 18" fill="none" stroke="#2b2d33" stroke-width="9" stroke-linecap="round"/><rect x="${px + 22}" y="10" width="40" height="16" rx="8" fill="#15171c"/>`;
    return a.big ? scaleAt(.96, 120, 200, s) : s;
  };

  D.combo = (a, X) => {
    let s = scaleAt(.78, 96, 200, D.press(a, X).replace(/<ellipse[^>]*url\(#gs\)[^>]*\/>/, ''));
    s = ground(120, 104, 208) + s;
    s += `<g transform="translate(150 132) scale(.5)">${D.heater({ s: 'mug' }).replace(/<ellipse[^>]*url\(#gs\)[^>]*\/>/, '')}</g>`;
    s += `<g transform="translate(176 150) scale(.36)">${D.heater({ s: 'conic' }).replace(/<ellipse[^>]*url\(#gs\)[^>]*\/>/, '')}</g>`;
    s += `<ellipse cx="200" cy="200" rx="26" ry="8" fill="#c9ced4" stroke="${OL}"/><ellipse cx="200" cy="198" rx="18" ry="5" fill="#e2e4e7"/>`;
    return s;
  };

  D.printer = (a) => {
    let s = ground(120, 104, 200);
    s += `<path d="M34 100 L176 100 L176 180 L34 180 Z" fill="#2b2d33" stroke="${OL}"/><path d="M34 100 L176 100 L176 180 L34 180 Z" fill="url(#vs)"/><path d="M50 82 L160 82 L176 100 L34 100 Z" fill="#3a3e47"/><path d="M60 64 L150 64 L160 82 L50 82 Z" fill="#f6f6f3" stroke="${OL}"/><rect x="60" y="150" width="90" height="10" rx="3" fill="#15171c"/><rect x="46" y="112" width="40" height="8" rx="2" fill="#4a4f59"/>`;
    s += `<path d="M176 110 L214 110 L214 180 L176 180 Z" fill="#3a3e47" stroke="${OL}"/>`;
    ['#26262c', '#18a8d8', '#e0157f', '#f6c533'].forEach((c, i) => { s += `<rect x="${180 + i * 8.5}" y="118" width="7" height="54" rx="2" fill="rgba(255,255,255,.2)"/><rect x="${180 + i * 8.5}" y="${130 + i * 3}" width="7" height="${42 - i * 3}" rx="2" fill="${c}"/>`; });
    if (a.wifi) s += `<path d="M150 116 q8 -8 16 0 M153 120 q5 -5 10 0" fill="none" stroke="#18a8d8" stroke-width="2"/>`;
    s += `<circle cx="160" cy="120" r="3" fill="#2bb673"/>`;
    return s;
  };

  // ---------- API ----------
  function art(spec) {
    const a = Object.assign({}, spec);
    const fn = D[a.k] || D.box;
    const X = ctx();
    let inner = '';
    try { inner = fn(a, X); } catch (e) { inner = D.box({}, X); console.warn('art', a.k, e); }
    return wrap(inner, X.d);
  }
  // aplica una variante (color, tapa, filo...) al spec del producto
  function specFor(p, v) {
    const a = Object.assign({}, p.a || {});
    if (!v) return a;
    ['cap', 'rim', 'ribbon', 'lidc', 'frost'].forEach(k => { if (v[k] !== undefined) a[k] = v[k]; });
    if (v.c) {
      if (a.inh) a.in = v.c;
      else if (a.k === 'gmug' || a.k === 'shot') a.tint = v.c;
      else if (a.k === 'pcup') a.c = v.c;
      else a.c = v.c;
    }
    if (v.l === 'Tornasol color') a.rainbow = 1;
    if (v.l === 'Blanca' && a.rainbow) { a.rainbow = 0; a.c = '#f6f6f3'; }
    return a;
  }
  const cache = new Map();
  function artURL(spec) {
    const key = JSON.stringify(spec);
    if (cache.has(key)) return cache.get(key);
    const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(art(spec));
    cache.set(key, url);
    return url;
  }
  window.DC = window.DC || {};
  Object.assign(window.DC, { art, artURL, specFor });
})();
