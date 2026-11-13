/* Dinner Deck app shell: state, rendering, events. Recipe logic lives in engine.js. */
(function () {
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]);
  const KEY = 'dinner-deck:v2';
  const TIMES = [[0, 'Any'], [20, '20 min'], [30, '30 min'], [45, '45 min']];
  const HEAT = ['Mild', 'Medium heat', 'Spicy'];
  const ALL_P = PROTEINS.map(p => p.id), ALL_B = BASES.map(b => b.id);
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fmtN = n => n.toLocaleString('en-US');

  const state = { pids: ['chicken'], bases: ['rice'], time: 0, skips: [], servings: 2, wake: false };
  try {
    const src = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (src) {
      const pids = (src.pids || []).filter(id => PMAP[id]), bases = (src.bases || []).filter(id => BMAP[id]);
      Object.assign(state, {
        pids: pids.length ? pids : state.pids, bases: bases.length ? bases : state.bases,
        time: Number(src.time) || 0, skips: Array.isArray(src.skips) ? src.skips.filter(k => SKIPS.some(s => s.id === k)) : [],
        servings: Math.min(8, Math.max(1, Number(src.servings) || 2))
      });
    }
  } catch (e) { /* storage unavailable */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify({ pids: state.pids, bases: state.bases, time: state.time, skips: state.skips, servings: state.servings })); } catch (e) { /* ignore */ } };
  const S = () => new Set(state.skips);
  const order = (ids, all) => all.filter(id => ids.includes(id));

  let deck = [], idx = 0, wakeLock = null, toastTimer = null;

  function toast(msg) {
    const t = $('toast'); t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, 2400);
  }

  function rebuild(keepId) {
    const pool = (state.pids.length && state.bases.length) ? recipesFor(state.pids, state.bases, S(), state.time) : [];
    const keep = keepId ? pool.find(r => r.id === keepId) : null;
    deck = keep ? [keep, ...spreadShuffle(pool.filter(r => r !== keep))] : spreadShuffle(pool);
    idx = 0;
  }

  function chip(id, label, sub, count, on) {
    return `<button type="button" class="chip${count ? '' : ' empty'}" aria-pressed="${on}" data-id="${id}">
      <span class="nm">${esc(label)}${sub ? `<span class="sb">${esc(sub)}</span>` : ''}</span><span class="ct" aria-label="${count} recipes">${on ? '✓ ' : ''}${count}</span></button>`;
  }

  function renderControls() {
    const s = S();
    $('proteins').innerHTML = PROTEINS.map(p => chip(p.id, p.chip, p.sub, state.bases.length ? recipesFor([p.id], state.bases, s, state.time).length : 0, state.pids.includes(p.id))).join('');
    $('bases').innerHTML = BASES.map(b => chip(b.id, b.chip, b.sub, state.pids.length ? recipesFor(state.pids, [b.id], s, state.time).length : 0, state.bases.includes(b.id))).join('');
    $('allP').textContent = state.pids.length === ALL_P.length ? 'Clear' : 'Select all';
    $('allB').textContent = state.bases.length === ALL_B.length ? 'Clear' : 'Select all';
    $('times').querySelectorAll('button').forEach(b => b.setAttribute('aria-checked', String(Number(b.dataset.t) === state.time)));
    $('toggles').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(state.skips.includes(b.dataset.s))));
    $('skipnote').textContent = state.skips.length ? `${state.skips.length} skipped` : 'None skipped';

    const names = (ids, map, all) => ids.length === all.length ? [`any ${map === PMAP ? 'protein' : 'base'}`] : ids.map(id => map[id].chip.toLowerCase());
    const have = state.pids.length && state.bases.length;
    const pick = have
      ? `${list(names(state.pids, PMAP, ALL_P))} with ${list(names(state.bases, BMAP, ALL_B))}`.replace(/^./, ch => ch.toUpperCase())
      : 'Pick a protein and a base';
    $('sumText').textContent = pick;
    const timeTxt = state.time ? `Ready in ${state.time} min` : 'Any time';
    $('sumMeta').textContent = have ? `${timeTxt} · ${fmtN(deck.length)} dinner${deck.length === 1 ? '' : 's'}` : 'Tap Filters to choose';
    const nf = state.skips.length + (state.time ? 1 : 0);
    const badge = $('filterBadge'); badge.hidden = !nf; badge.textContent = nf;
    $('sheetCount').textContent = have ? `${fmtN(deck.length)} dinner${deck.length === 1 ? '' : 's'} match` : 'Pick at least one protein and one base';
  }

  function macroHtml(m) {
    const cal = { p: m.p * 4, c: m.c * 4, f: m.f * 9 }, sum = cal.p + cal.c + cal.f || 1;
    const pct = k => Math.round(cal[k] / sum * 100);
    const extra = m.opt.kcal >= 10 ? `+${m.opt.kcal} kcal with the optional finish. ` : '';
    return `<section class="macros" aria-label="Estimated nutrition per serving">
      <div class="mbar" role="img" aria-label="Calories from protein ${pct('p')}%, carbs ${pct('c')}%, fat ${pct('f')}%"><span class="p" style="width:${pct('p')}%"></span><span class="c" style="width:${pct('c')}%"></span><span class="f" style="width:${pct('f')}%"></span></div>
      <dl class="mlegend">
        <div><i class="dot p"></i><dt>Protein</dt><dd>${m.p} g</dd></div>
        <div><i class="dot c"></i><dt>Carbs</dt><dd>${m.c} g</dd></div>
        <div><i class="dot f"></i><dt>Fat</dt><dd>${m.f} g</dd></div>
      </dl>
      <p class="mnote">Per serving. ${extra}Estimated from USDA values, cooking oil included.</p>
    </section>`;
  }

  function renderCard(dir) {
    const stage = $('stage');
    const r = deck[idx];
    $('prev').disabled = !deck.length || idx === 0;
    $('next').disabled = deck.length < 2;
    $('pos').textContent = deck.length ? `${fmtN(idx + 1)} of ${fmtN(deck.length)}` : 'No matches';
    if (!r) {
      const none = !state.pids.length || !state.bases.length;
      const msg = none
        ? `<h3>Pick a protein and a base</h3><p>Open Filters and tap at least one of each. Pick several and the deck mixes them.</p>`
        : `<h3>No dinners fit these picks</h3><p>${state.time ? `Nothing here is ready in ${state.time} minutes${state.skips.length ? ' with those skips' : ''}.` : 'Those skipped ingredients rule out every recipe in these picks.'} Loosen a filter or add another protein or base.</p>`;
      const fixes = none ? '<button class="btn primary" type="button" data-fix="open">Open filters</button>'
        : `${state.time ? '<button class="btn" type="button" data-fix="time">Allow any time</button>' : ''}${state.skips.length ? '<button class="btn" type="button" data-fix="skips">Clear skips</button>' : ''}`;
      stage.innerHTML = `<article class="card"><div class="empty">${msg}<div class="row">${fixes}</div></div></article>`;
      return;
    }
    const s = state.servings, m = r.macros, ck = r.cooked;
    const ing = r.groups.map(gr => `<h5>${esc(gr.title)}</h5><ul>${gr.items.map(i => { const l = line(i, s); return `<li><span class="amt">${esc(l.amt)}</span><span class="it">${esc(l.item)}</span><span class="gr">${esc(l.g)}</span></li>`; }).join('')}</ul>`).join('');
    const portionRows = ck.rows.map(p => `<li${p.opt ? ' class="opt"' : ''}><span>${esc(p.label)}</span><span class="gr">${p.opt ? '+' : ''}${fmtG(p.g)}</span></li>`).join('');
    const steps = r.steps.map((t, i) => `<li><span class="n">${i + 1}</span><span class="tx">${esc(t)}</span></li>`).join('');
    const thermo = r.id.startsWith('eggs|') ? '' : ' Check the thickest piece with an instant-read thermometer.';
    stage.innerHTML = `<article class="card${dir ? (dir > 0 ? ' drawn' : ' drawnBack') : ''}" id="card">
      <header class="hero">
        <div class="tags"><span class="tag">${esc(r.cuisine)}</span><span class="tag">${esc(r.format)}</span><span class="tag h${r.heat}">${HEAT[r.heat]}</span></div>
        <h2 class="rtitle">${esc(r.title)}</h2>
        <div class="stats">
          <div class="stat"><span class="k">Calories</span><span class="v">${fmtN(m.kcal)}</span></div>
          <div class="stat"><span class="k">Ready in</span><span class="v">${r.time} <small>min</small></span></div>
          <div class="stat"><span class="k">Servings</span><div class="stepper"><button type="button" id="sminus" aria-label="Fewer servings"${s <= 1 ? ' disabled' : ''}>−</button><output id="sout" aria-live="polite">${s}</output><button type="button" id="splus" aria-label="More servings"${s >= 8 ? ' disabled' : ''}>+</button></div></div>
        </div>
        ${macroHtml(m)}
      </header>
      <section class="sec ing" aria-label="Ingredients"><h4>Ingredients</h4>${ing}</section>
      <section class="sec steps" aria-label="Steps"><h4>Steps</h4><ol>${steps}</ol></section>
      <section class="sec portion" aria-label="Portion by weight"><h4>One serving, cooked</h4>
        <ul>${portionRows}<li class="tot"><span>Your plate</span><span class="gr">≈${fmtG(ck.total)}</span></li></ul>
        <p class="note">Estimated from USDA raw weights and typical cooking loss. For an exact split, weigh the finished ${s > 1 ? `batch and divide by ${s}` : 'dish'}.</p>
        <p class="safety"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 14.8V4a2 2 0 1 0-4 0v10.8a4 4 0 1 0 4 0z"/></svg><span><b>Safe temp.</b> ${esc(r.temp)}${thermo}</span></p>
      </section>
      <footer class="actions">
        <button class="btn primary" type="button" id="copyall"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>Copy full recipe</button>
        <button class="btn" type="button" id="copy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/></svg>Copy grocery list</button>
        <label class="wake">Keep screen on while cooking<span class="switch"><input type="checkbox" id="wake" role="switch"${state.wake ? ' checked' : ''}><span></span></span></label>
        <textarea class="fallback" id="fallback" aria-label="Copied text" readonly hidden></textarea>
      </footer>
    </article>`;
    if (dir) {
      const top = $('card').getBoundingClientRect().top;
      if (top < 0) window.scrollTo({ top: window.scrollY + top - 12, behavior: reduced ? 'auto' : 'smooth' });
    }
  }

  function recipeText(r, s) {
    const m = r.macros, ck = r.cooked, out = [];
    out.push(r.title, `${r.cuisine} · ${r.format} · ${HEAT[r.heat]} · Ready in ${r.time} min`, '');
    out.push('PER SERVING (estimated)', `${fmtN(m.kcal)} kcal · ${m.p} g protein · ${m.c} g carbs · ${m.f} g fat`);
    if (m.opt.kcal >= 10) out.push(`+${m.opt.kcal} kcal with the optional finish`);
    out.push(`Cooked portion ≈ ${fmtG(ck.total)} (${ck.rows.filter(x => !x.opt).map(x => `${x.label} ${fmtG(x.g)}`).join(', ')})`, '');
    out.push(`INGREDIENTS (${s} serving${s > 1 ? 's' : ''})`);
    for (const gr of r.groups) {
      out.push(gr.title);
      for (const i of gr.items) {
        const l = line(i, s), grams = l.g && l.g !== '<1 g' ? ` (${l.g})` : '';
        out.push(`- ${l.amt ? l.amt + ' ' : ''}${l.item}${grams}`);
      }
    }
    out.push('', 'STEPS', ...r.steps.map((t, i) => `${i + 1}. ${t}`), '', `Safe temp: ${r.temp}`);
    return out.join('\n');
  }

  function copyText(text, okMsg) {
    const fb = () => { const ta = $('fallback'); ta.hidden = false; ta.value = text; ta.focus(); ta.select(); toast('Select the text below and copy it.'); };
    try { navigator.clipboard.writeText(text).then(() => toast(okMsg), fb); } catch (err) { fb(); }
  }

  function refresh(keepId) { rebuild(keepId); renderControls(); renderCard(0); save(); }
  function step(d) {
    if (!deck.length) return;
    if (d > 0) {
      if (idx === deck.length - 1) {
        const cur = deck[idx];
        deck = [cur, ...spreadShuffle(deck.filter(r => r !== cur))]; idx = 1;
        toast(`You've seen all ${fmtN(deck.length)}. Reshuffled.`);
      } else idx++;
    } else if (idx > 0) idx--;
    renderCard(d);
  }

  async function setWake(on) {
    state.wake = on;
    if (on) {
      try {
        if (!('wakeLock' in navigator)) throw new Error('unsupported');
        wakeLock = await navigator.wakeLock.request('screen');
        wakeLock.addEventListener('release', () => { wakeLock = null; });
      } catch (e) {
        state.wake = false; const box = $('wake'); if (box) box.checked = false;
        toast('This phone won’t keep the screen on from here.');
      }
    } else if (wakeLock) { try { await wakeLock.release(); } catch (e) { /* ignore */ } wakeLock = null; }
  }
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && state.wake && !wakeLock) setWake(true); });

  // filter sheet
  const sheet = $('filters');
  let sheetSnapshot = '';
  const snap = () => JSON.stringify([state.pids, state.bases, state.time, state.skips]);
  function openSheet() {
    sheetSnapshot = snap();
    if (typeof sheet.showModal === 'function') sheet.showModal(); else sheet.setAttribute('open', '');
    document.documentElement.style.overflow = 'hidden';
  }
  function closeSheet() { if (sheet.open) { if (typeof sheet.close === 'function') sheet.close(); else { sheet.removeAttribute('open'); onSheetClosed(); } } }
  function onSheetClosed() {
    document.documentElement.style.overflow = '';
    if (snap() !== sheetSnapshot) { renderCard(0); window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }); }
  }
  sheet.addEventListener('close', onSheetClosed);
  sheet.addEventListener('click', e => { if (e.target === sheet) closeSheet(); });
  $('openFilters').addEventListener('click', openSheet);
  $('closeFilters').addEventListener('click', closeSheet);

  // while the sheet is open, only rebuild the deck and controls; the card redraws on close
  function refine(keepId) { rebuild(keepId); renderControls(); save(); if (!sheet.open) renderCard(0); }

  // static controls
  $('times').innerHTML = TIMES.map(([t, l]) => `<button type="button" role="radio" data-t="${t}" aria-checked="false">${l}</button>`).join('');
  $('toggles').innerHTML = SKIPS.map(k => `<button type="button" class="tog" data-s="${k.id}" aria-pressed="false">${k.label}</button>`).join('');
  try { $('eyebrow').textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }); } catch (e) { /* keep default */ }

  // events
  const toggleIn = (arr, id, all) => order(arr.includes(id) ? arr.filter(x => x !== id) : arr.concat(id), all);
  const cur = () => deck[idx] && deck[idx].id;
  $('proteins').addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; state.pids = toggleIn(state.pids, b.dataset.id, ALL_P); refine(); });
  $('bases').addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; state.bases = toggleIn(state.bases, b.dataset.id, ALL_B); refine(); });
  $('allP').addEventListener('click', () => { state.pids = state.pids.length === ALL_P.length ? [] : ALL_P.slice(); refine(); });
  $('allB').addEventListener('click', () => { state.bases = state.bases.length === ALL_B.length ? [] : ALL_B.slice(); refine(); });
  $('times').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; state.time = Number(b.dataset.t); refine(cur()); });
  $('toggles').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const k = b.dataset.s; state.skips = state.skips.includes(k) ? state.skips.filter(x => x !== k) : state.skips.concat(k);
    refine(cur());
  });
  $('next').addEventListener('click', () => step(1));
  $('prev').addEventListener('click', () => step(-1));
  $('stage').addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.id === 'splus' || t.id === 'sminus') {
      state.servings = Math.min(8, Math.max(1, state.servings + (t.id === 'splus' ? 1 : -1)));
      save(); const y = window.scrollY; renderCard(0); window.scrollTo(0, y);
      const again = $(t.id); if (again && !again.disabled) again.focus({ preventScroll: true });
    } else if (t.id === 'copy') {
      copyText(grocery(deck[idx], state.servings), 'Grocery list copied');
    } else if (t.id === 'copyall') {
      copyText(recipeText(deck[idx], state.servings), 'Recipe copied');
    } else if (t.dataset.fix) {
      if (t.dataset.fix === 'open') { openSheet(); return; }
      if (t.dataset.fix === 'time') state.time = 0; else state.skips = [];
      refresh();
    }
  });
  $('stage').addEventListener('change', e => { if (e.target.id === 'wake') setWake(e.target.checked); });
  document.addEventListener('keydown', e => {
    if (sheet.open || (e.target.closest && e.target.closest('input, textarea, select'))) return;
    if (e.key === 'ArrowRight') step(1); else if (e.key === 'ArrowLeft') step(-1);
  });

  refresh();

  // offline support once installed
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(() => { /* offline mode unavailable */ }); });
  }
})();
