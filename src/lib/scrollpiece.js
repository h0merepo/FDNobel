// Builds a scroll sequence in the idiom of the two pieces the client supplied:
// a tall column of a fixed design width, everything inside positioned in design
// pixels, scaled to whatever width it is given, with each layer drifting against
// the scroll by its own depth. The mechanics — the scale, the parallax loop, the
// arrival fades, the beat rail and the scroll cue — are the Mandela sequence's
// own, kept so the new narratives behave like siblings of it rather than like
// imitations.
//
// What is different: those two pieces were drawn in Figma and exported with
// their photography baked in. There is no archival photography for the other
// twenty-two, so the discs here are generated — the same seeded wash the atlas
// uses behind every story, deepened to sit on a coloured ground. They are
// shapes standing where a picture goes, and they should be read that way.

const W = 910

// A ground per prize, drawn from the atlas palette rather than invented, so a
// piece is recognisably part of the same work as the circle it opened from.
const GROUNDS = {
  physics: { page: '#5d5f63', slate: '#75787d', warm: '#d7d2c6' },
  chemistry: { page: '#173f51', slate: '#26566b', warm: '#cfd8d9' },
  medicine: { page: '#1f5b66', slate: '#2c7482', warm: '#d2dcda' },
  literature: { page: '#6b3a1e', slate: '#8a4d29', warm: '#e4d3c2' },
  peace: { page: '#59646d', slate: '#72808a', warm: '#d6d1c4' },
  economics: { page: '#495a3f', slate: '#5f7452', warm: '#d8dcc9' },
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Scripts are authored here, not typed by a reader, but they are still escaped
// and then given back exactly two liberties: [[a word]] is the one word a line
// turns on, and <br> is a break the writer chose rather than one the measure
// happened to fall on.
const copy = (s) =>
  esc(s)
    .replace(/\[\[(.+?)\]\]/g, '<span class="gold">$1</span>')
    .replace(/&lt;br&gt;/g, '<br>')

const n = (v) => Math.round(v * 10) / 10

// How many lines a run of copy will take in a given measure. The browser does
// the real setting; this only reserves the room, so it deliberately estimates
// wide — a block that reserves too much leaves a gap, and one that reserves too
// little puts two paragraphs on top of each other. Average advance is taken at
// 0.64em, measured off the setting this engine actually produces.
const lines = (text, measure, size) =>
  Math.max(1, Math.ceil(String(text).replace(/\[\[|\]\]/g, '').length / (measure / (size * 0.64))))

const LH = 44.2 // body, 34px on 1.3

// What the dot at the end of a piece keeps clear of the last line above it.
const END_GAP = 20

// --- the generated disc --------------------------------------------------
// The same construction as the atlas plate: a tilted base wash with four blooms
// drifting across it, seeded by name so a laureate's discs are always theirs.

function rngFrom(seed) {
  let h = 2166136261
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return () => {
    h = Math.imul(h ^ (h >>> 15), h | 1)
    h ^= h + Math.imul(h ^ (h >>> 7), h | 61)
    return ((h ^ (h >>> 14)) >>> 0) / 4294967296
  }
}

const BLOOMS = [
  { h: 40, s: 44 },
  { h: 330, s: 34 },
  { h: 192, s: 32 },
  { h: 22, s: 40 },
]

function disc(seed, ground) {
  const rng = rngFrom(seed)
  const tilt = rng() * 360
  const offset = Math.floor(rng() * BLOOMS.length)
  const id = `d${Math.floor(rng() * 1e9).toString(36)}`
  const stops = BLOOMS.map((_, i) => {
    const tone = BLOOMS[(i + offset) % BLOOMS.length]
    return {
      hue: tone.h,
      sat: tone.s,
      light: 34 + rng() * 30,
      cx: 18 + rng() * 64,
      cy: 18 + rng() * 64,
      r: 30 + rng() * 38,
      op: 0.4 + rng() * 0.42,
    }
  })

  const body = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
<defs><linearGradient id="${id}b" gradientTransform="rotate(${n(tilt)} .5 .5)">
<stop offset="0" stop-color="${ground.slate}"/><stop offset=".55" stop-color="${ground.page}"/>
<stop offset="1" stop-color="${ground.slate}"/></linearGradient>
${stops
  .map(
    (s, i) =>
      `<radialGradient id="${id}g${i}"><stop offset="0" stop-color="hsl(${s.hue} ${s.sat}% ${n(s.light)}%)" stop-opacity="${n(s.op)}"/><stop offset=".6" stop-color="hsl(${s.hue} ${n(s.sat * 0.6)}% ${n(s.light + 6)}%)" stop-opacity="${n(s.op * 0.4)}"/><stop offset="1" stop-color="hsl(${s.hue} ${s.sat}% ${n(s.light)}%)" stop-opacity="0"/></radialGradient>`,
  )
  .join('')}
<clipPath id="${id}c"><circle cx="50" cy="50" r="50"/></clipPath></defs>
<g clip-path="url(#${id}c)"><rect width="100" height="100" fill="url(#${id}b)"/>
${stops.map((s, i) => `<circle cx="${n(s.cx)}" cy="${n(s.cy)}" r="${n(s.r)}" fill="url(#${id}g${i})"/>`).join('')}</g></svg>`

  // Single-quoted, and any apostrophe escaped: this URL goes inside a style
  // attribute that is itself double-quoted, so a double quote here silently
  // truncates the attribute and the element loses its width and height.
  return `url('data:image/svg+xml;utf8,${encodeURIComponent(body).replace(/'/g, '%27')}')`
}

// --- blocks ---------------------------------------------------------------
// Each returns the markup for one beat and says how much column it consumed,
// so a script is a list of beats rather than a list of coordinates.

const BLOCK = {
  // The opening question, over a halo, with one word boxed.
  ask({ text, boxed }, y, ctx) {
    // A boxed word that is not in the line is a script that has drifted from
    // its own copy, and it fails silently otherwise.
    if (boxed && !text.includes(boxed)) throw new Error(`boxed word "${boxed}" is not in: ${text}`)
    const marked = boxed
      ? copy(text).replace(esc(boxed), `<span class="boxed">${esc(boxed)}</span>`)
      : copy(text)
    return {
      h: 900,
      title: 'The question',
      focus: y + 400,
      html: `
  <div class="halo" data-depth="34" style="left:39.5px; top:${n(y - 38)}px; width:831px; height:831px;"></div>
  <p class="ask arrive" data-depth="-46" style="left:200px; top:${n(y + 328)}px; width:560px;">${marked}</p>`,
    }
  },

  // Who this is: name, birth and country, the AWARDS chip, the prize line.
  // The awards line is dropped rather than left empty when a piece has no
  // prize to name — a story built from its own screens belongs to nobody's
  // citation — and the block gives back the height it would have taken.
  title({ name, meta, prizes }, y) {
    const awards = prizes
      ? `
  <div class="awards arrive" data-depth="-24" style="left:383.6px; top:${n(y + 230)}px; width:144px;">AWARDS</div>
  <p class="meta arrive" data-depth="-24" style="left:294.8px; top:${n(y + 282)}px; width:322px;">${copy(prizes)}</p>`
      : ''
    return {
      h: prizes ? 470 : 330,
      title: name.replace(/<br>/g, ' '),
      focus: y + 200,
      html: `
  <h1 class="name arrive" data-depth="-24" style="left:0; right:0; top:${n(y)}px;">${name}</h1>
  <p class="meta arrive" data-depth="-24" style="left:0; right:0; top:${n(y + 135)}px;">${copy(meta)}</p>${awards}`,
    }
  },

  // A year at the size the Mandela sequence sets it, with a disc behind.
  year({ year, seed, side = 'left' }, y, ctx) {
    const left = side === 'left' ? 44 : -67
    return {
      h: 1160,
      title: String(year),
      focus: y + 700,
      html: `
  <div class="disc" data-depth="72" style="background-image:${disc(seed, ctx.ground)};
       left:${left}px; top:${n(y)}px; width:824px; height:824px;"></div>
  <p class="year" data-depth="-28" style="left:40px; top:${n(y + 569)}px;">${year}</p>`,
    }
  },

  // Body copy on bright glass — the sequence's ordinary voice.
  plate({ text, title }, y) {
    const tall = 96 + lines(text, 463, 34) * LH
    return {
      h: tall + 130,
      title: title ?? 'Text',
      focus: y + tall / 2,
      html: `
  <div class="plate plate--bright arrive" data-depth="-74" style="left:${n(W - 612)}px; top:${n(y)}px; width:581px;">
    <p class="body">${copy(text)}</p>
  </div>`,
    }
  },

  // One large line, the turn of the story.
  lede({ text, title }, y) {
    const tall = lines(text, 600, 48) * 57.6
    return {
      h: tall + 300,
      title: title ?? 'The turn',
      focus: y + tall / 2 + 60,
      html: `
  <div class="plate" data-depth="-70" style="left:62.6px; top:${n(y)}px; width:600px; height:${n(tall + 120)}px;"></div>
  <p class="lede arrive" data-depth="-70" style="left:209.8px; top:${n(y + 60)}px; width:600px;">${copy(text)}</p>`,
    }
  },

  // Body copy with nothing under it, set off to the right.
  note({ text, title }, y) {
    const tall = lines(text, 493, 34) * LH
    return {
      h: tall + 150,
      title: title ?? 'Text',
      focus: y + tall / 2,
      html: `
  <p class="body arrive" data-depth="-88" style="left:365.6px; top:${n(y)}px; width:493px;">${copy(text)}</p>`,
    }
  },

  // The loud moment. One per piece, or it stops being loud.
  //
  // The plate the attribution sits on grows with it rather than clipping it, so
  // the quote below has to be pushed down by however much that came to. Body
  // copy is 34px on 1.3 in a 482px measure, which is close enough to fifty
  // characters a line to lay the block out from — the plate itself is sized by
  // the browser, and this only reserves the room.
  quote({ text, attribution, seed }, y, ctx) {
    const plate = attribution ? 96 + lines(attribution, 482, 34) * LH : 0
    const quoteY = Math.max(447, 197 + plate + 60)
    return {
      h: quoteY + 733,
      title: 'The line',
      focus: y + quoteY + 113,
      html: `
  <div class="disc" data-depth="44" style="background-image:${disc(seed + ':quote', ctx.ground)};
       left:-77px; top:${n(y)}px; width:1057px; height:1057px;"></div>
  ${
    attribution
      ? `<div class="plate plate--bright arrive" data-depth="-58" style="left:40px; top:${n(y + 197)}px; width:600px;">
    <p class="body">${copy(attribution)}</p>
  </div>`
      : ''
  }
  <div class="quote-plate" data-depth="-38" style="left:138.4px; top:${n(y + quoteY)}px; width:700px; height:385px;"></div>
  <p class="quote arrive" data-depth="-38" style="left:118px; top:${n(y + quoteY + 66)}px; width:684px;">${copy(text)}</p>`,
    }
  },

  // Body on deep glass — the quiet after the loud moment.
  deep({ text, title }, y) {
    const tall = 60 + lines(text, 503, 34) * LH
    return {
      h: tall + 150,
      title: title ?? 'Text',
      focus: y + tall / 2,
      html: `
  <div class="plate plate--deep arrive" data-depth="-66" style="left:139px; top:${n(y)}px; width:635px;">
    <p class="body" style="width:503px;">${copy(text)}</p>
  </div>`,
    }
  },

  // The citation, centred, and the dot that ends every piece.
  // The citation is the last thing read, and the dot that ends the piece sits
  // under it. Where exactly depends on how the line breaks fall, which only the
  // browser knows — so the dot is placed here from an estimate that reserves
  // enough column, and moved onto the real last line at runtime.
  close({ text, year, seed }, y, ctx) {
    const tall = lines(text, 824, 34) * LH
    return {
      h: 895 + tall + END_GAP + 21 + 150,
      title: `${year} · the prize`,
      focus: y + 900,
      html: `
  <div class="disc" data-depth="76" style="background-image:${disc(seed + ':close', ctx.ground)};
       left:44px; top:${n(y)}px; width:824px; height:824px;"></div>
  <p class="year" data-depth="-30" style="left:40px; top:${n(y + 569)}px;">${year}</p>
  <p class="body close-copy arrive" data-depth="-72" style="left:43px; top:${n(y + 895)}px; width:824px; text-align:center;">${copy(text)}</p>
  <span class="end-dot arrive" data-depth="-72" style="left:444.5px; top:${n(y + 895 + tall + END_GAP)}px;"></span>`,
    }
  },
}

export function buildPiece(script) {
  const ground = GROUNDS[script.field] ?? GROUNDS.peace
  const ctx = { ground, seed: script.id }

  let y = 0
  const parts = []
  const beats = []
  for (const beat of script.beats) {
    const make = BLOCK[beat.block]
    if (!make) throw new Error(`unknown block: ${beat.block}`)
    const built = make({ seed: script.id, ...beat }, y, ctx)
    parts.push(built.html)
    beats.push({ y: Math.round(built.focus), title: built.title })
    y += built.h
  }
  const height = y + 200

  return `<title>${esc(script.name)} — scroll sequence</title>
<style>
:root {
  --page: ${ground.page};
  --slate: ${ground.slate};
  --ink: #ffffff;
  --ink-soft: #ededea;
  --meta: #cbc6bf;
  --meta-warm: ${ground.warm};
  --gold: #cc9f52;
  --s: 1;
  --drift: 1;
}
* { box-sizing: border-box; }
html, body { margin: 0; background: var(--page); }

/* The beat rail and the cue are how this is moved through; the browser's bar
   would be a third thing saying the same, in nobody's language. */
html { scrollbar-width: none; -ms-overflow-style: none; }
html::-webkit-scrollbar, body::-webkit-scrollbar { width: 0; height: 0; display: none; }
body {
  color: var(--ink);
  font-family: 'Alfred Sans', system-ui, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
}

/* One continuous ${W} × ${height} canvas, scaled to whatever width it gets. */
.track { position: relative; height: calc(${height}px * var(--s)); }
.column {
  position: absolute; top: 0; left: 50%;
  width: ${W}px; height: ${height}px; margin-left: -${W / 2}px;
  transform: scale(var(--s)); transform-origin: top center;
  background: var(--slate); border-radius: 127px;
  overflow: hidden; isolation: isolate;
}

/* Every [data-depth] layer gets --t written each frame from where it sits in
   the viewport. Nothing is on a timer. */
[data-depth] { transform: translate3d(0, calc(var(--t, 0) * 1px), 0); will-change: transform; }
.arrive { opacity: var(--o, 1); }

/* Four tiers, so depth never decides what is readable. */
.disc, .halo                                  { z-index: 1; }
.plate, .quote-plate                          { z-index: 3; }
.ask, .name, .meta, .awards,
.year, .body, .lede, .quote                   { z-index: 4; }
/* under the copy, never over it: the dot is the last mark, not a layer on top */
.end-dot                                      { z-index: 3; }

.disc {
  position: absolute; border-radius: 50%;
  background-repeat: no-repeat; background-size: 100% 100%;
  pointer-events: none;
}
.halo {
  position: absolute; border-radius: 50%; pointer-events: none;
  background: radial-gradient(closest-side, rgba(255,255,255,0.14), rgba(255,255,255,0) 72%);
}

.ask  { position:absolute; font-size:36.4px; line-height:1.25; margin:0; }
.body { position:absolute; font-size:34px;   line-height:1.3;  margin:0; }
.lede { position:absolute; font-size:48px;   line-height:1.2;  margin:0; }
.year { position:absolute; font-size:235.5px; line-height:1.2; margin:0; color:rgba(255,255,255,0.9); }
.name {
  position:absolute; margin:0; font-size:48px; line-height:1.06;
  text-transform:uppercase; letter-spacing:0.04em; text-align:center; color:var(--meta-warm);
}
.meta { position:absolute; margin:0; font-size:24px; line-height:1.45; text-align:center; color:var(--meta); }
.awards {
  position:absolute; font-size:14px; letter-spacing:1.26px; line-height:1.45;
  color:var(--meta); text-align:center;
  background:rgba(0,0,0,0.22); border-radius:45px; padding:10px 28px;
}
.gold { color: var(--gold); }

/* the outlined word on the opening question */
.boxed {
  display:inline-block; padding:3px 13px; margin:0 -6px;
  border:1.5px solid var(--ink); border-radius:10.6px; line-height:1.2;
}

.plate { position:absolute; backdrop-filter:blur(35px); -webkit-backdrop-filter:blur(35px); border-radius:82px; }
.plate--bright {
  background:rgba(255,255,255,0.12);
  backdrop-filter:blur(61px); -webkit-backdrop-filter:blur(61px);
  border-radius:106px; padding:48px 59px;
}
.plate--bright .body { position:static; color:var(--ink-soft); }
.plate--deep {
  background:rgba(0,0,0,0.15); border:1px solid rgba(255,255,255,0.05);
  backdrop-filter:blur(37px); -webkit-backdrop-filter:blur(37px);
  border-radius:90px; display:flex; align-items:center; justify-content:center; padding:30px;
}
.plate--deep .body { position:static; }

.quote-plate {
  position:absolute; border-radius:3.2px;
  backdrop-filter:blur(46px); -webkit-backdrop-filter:blur(46px);
  filter:drop-shadow(0 6.3px 15.2px rgba(255,255,255,0.15));
}
.quote {
  position:absolute; margin:0;
  font-family:'Alfred Serif Text','Iowan Old Style','Palatino Linotype',Georgia,serif;
  font-size:70px; line-height:1.2; text-align:center; color:var(--ink);
  mix-blend-mode:plus-lighter; text-shadow:0 2.6px 8.5px rgba(255,255,255,0.25);
}

.end-dot { position:absolute; width:21px; height:21px; border-radius:50%; background:var(--ink); }

.cue {
  position:fixed; left:50%; bottom:calc(44px * var(--s));
  transform:translateX(-50%) translateY(10px);
  display:inline-flex; align-items:center; gap:calc(14px * var(--s));
  min-width:calc(156px * var(--s)); height:calc(53px * var(--s));
  padding:0 calc(24px * var(--s));
  border:calc(1.5px * var(--s)) solid var(--ink); border-radius:calc(10.6px * var(--s));
  background:rgba(0,0,0,0.24); backdrop-filter:blur(18px); -webkit-backdrop-filter:blur(18px);
  color:var(--ink); font:inherit; font-size:calc(16px * var(--s));
  cursor:pointer; opacity:0; pointer-events:none;
  transition:opacity 460ms ease, transform 460ms ease; z-index:40;
}
.cue[data-show="true"] { opacity:1; transform:translateX(-50%) translateY(0); pointer-events:auto; }
.cue .chev {
  width:calc(10px * var(--s)); height:calc(10px * var(--s));
  border-right:1.5px solid currentColor; border-bottom:1.5px solid currentColor;
  transform:translateY(-2px) rotate(45deg); animation:nudge 2.4s ease-in-out infinite;
}
@keyframes nudge {
  0%,100% { transform:translateY(-3px) rotate(45deg); opacity:.55; }
  50%     { transform:translateY(1px)  rotate(45deg); opacity:1; }
}

.rail { position:fixed; right:calc(24px * var(--s)); top:50%; transform:translateY(-50%);
        display:flex; flex-direction:column; align-items:center;
        gap:calc(14px * var(--s)); z-index:40; }
.rail button {
  width:calc(12px * var(--s)); height:calc(12px * var(--s));
  padding:0; border:0; border-radius:50%; cursor:pointer;
  background:rgba(255,255,255,0.3); transform:scale(0.62);
  transition:transform 320ms ease, background 320ms ease;
}
.rail button[aria-current="true"] { transform:scale(1); background:var(--ink); }
.rail button:hover { transform:scale(0.8); background:rgba(255,255,255,0.55); }
.rail button[aria-current="true"]:hover { transform:scale(1); background:var(--ink); }

.sr-only { position:absolute; width:1px; height:1px; margin:-1px; overflow:hidden;
           clip:rect(0 0 0 0); white-space:nowrap; }

@media (prefers-reduced-motion: reduce) {
  :root { --drift: 0; }
  .cue .chev { animation:none; }
}
</style>

<div class="track" id="track">
<div class="column" id="column">
${parts.join('\n')}
</div>
</div>

<button class="cue" id="cue" data-show="false">
  <span>Scroll to continue</span><span class="chev" aria-hidden="true"></span>
</button>
<nav class="rail" id="rail" aria-label="Story beats"></nav>
<div class="sr-only" aria-live="polite" id="announce"></div>

<script>
/* Wrapped, because the frame this is written into keeps its window between
   writes: a second write would otherwise redeclare every const in a scope that
   was never cleared. */
(function () {
const TUNING = { drift: 1.0, smoothing: 0.18, holdDelay: 1100, focus: 0.55 };
const DESIGN_W = ${W};
const BEATS = ${JSON.stringify(beats)};

const column = document.getElementById('column');
const cue = document.getElementById('cue');
const rail = document.getElementById('rail');
const announce = document.getElementById('announce');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

let s = 1, colTop = 0;
function setScale() {
  s = Math.min(1, window.innerWidth / DESIGN_W);
  document.documentElement.style.setProperty('--s', s.toFixed(4));
  document.documentElement.style.setProperty('--drift', reduced ? 0 : TUNING.drift);
  measure();
}

const layers = [];
function measure() {
  layers.length = 0;
  colTop = column.getBoundingClientRect().top + window.scrollY;
  document.querySelectorAll('[data-depth]').forEach(function (el) {
    el.style.setProperty('--t', 0);
    const r = el.getBoundingClientRect();
    layers.push({
      el: el,
      depth: parseFloat(el.dataset.depth) || 0,
      arrive: el.classList.contains('arrive'),
      cy: ((r.top + window.scrollY - colTop) + r.height / 2) / s,
      t: 0
    });
  });
}

const clamp = function (v) { return Math.min(1, Math.max(0, v)); };

function tick() {
  const vh = window.innerHeight, y = window.scrollY;
  const ease = reduced ? 1 : TUNING.smoothing;
  for (let i = 0; i < layers.length; i++) {
    const L = layers[i];
    const screenY = colTop + L.cy * s - y;
    if (screenY < -vh * 1.4 || screenY > vh * 2.4) continue;
    const nrm = screenY / vh - 0.5;
    const target = -nrm * L.depth;
    L.t += (target - L.t) * ease;
    L.el.style.setProperty('--t', L.t.toFixed(2));
    if (L.arrive) L.el.style.setProperty('--o', clamp((0.62 - nrm) / 0.3).toFixed(3));
  }
  updateBeat(y, vh);
  requestAnimationFrame(tick);
}

BEATS.forEach(function (b, i) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.setAttribute('aria-label', (i + 1) + '. ' + b.title);
  btn.addEventListener('click', function () { goTo(i); });
  rail.appendChild(btn);
});
const dots = [].slice.call(rail.children);

let activeBeat = -1, lastInput = performance.now();

function scrollFor(i) {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return Math.max(0, Math.min(max, BEATS[i].y * s - window.innerHeight * TUNING.focus));
}

function updateBeat(y, vh) {
  let nearest = 0, best = Infinity;
  for (let i = 0; i < BEATS.length; i++) {
    const d = Math.abs(scrollFor(i) - y);
    if (d < best) { best = d; nearest = i; }
  }
  if (nearest !== activeBeat) {
    activeBeat = nearest;
    dots.forEach(function (d, i) { d.setAttribute('aria-current', i === activeBeat ? 'true' : 'false'); });
    announce.textContent = BEATS[activeBeat].title;
  }
  const atEnd = y > document.documentElement.scrollHeight - vh - 240;
  const still = performance.now() - lastInput > TUNING.holdDelay;
  cue.dataset.show = (still && !atEnd) ? 'true' : 'false';
}

function goTo(i) {
  const idx = Math.max(0, Math.min(BEATS.length - 1, i));
  window.scrollTo({ top: scrollFor(idx), behavior: reduced ? 'auto' : 'smooth' });
  lastInput = performance.now();
}

cue.addEventListener('click', function () {
  const y = window.scrollY;
  let next = -1;
  for (let i = 0; i < BEATS.length; i++) { if (scrollFor(i) > y + 8) { next = i; break; } }
  goTo(next === -1 ? BEATS.length - 1 : next);
});

addEventListener('keydown', function (e) {
  if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); goTo(activeBeat + 1); }
  if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); goTo(activeBeat - 1); }
  if (e.key === 'Home') { e.preventDefault(); goTo(0); }
  if (e.key === 'End') { e.preventDefault(); goTo(BEATS.length - 1); }
});

['scroll','wheel','touchstart','touchmove','pointerdown'].forEach(function (evt) {
  addEventListener(evt, function () { lastInput = performance.now(); }, { passive: true });
});

// The dot that ends the piece is set against the real last line of the
// citation rather than against an estimate of it, so the gap is the same
// whatever the measure does to the line breaks. Both are laid out in design
// pixels inside a scaled column, so offsetHeight is already in design units.
function placeEndDot() {
  const copy = document.querySelector('.close-copy');
  const dot = document.querySelector('.end-dot');
  if (!copy || !dot) return;
  dot.style.top = (parseFloat(copy.style.top) + copy.offsetHeight + ${END_GAP}) + 'px';
}

addEventListener('resize', function () { setScale(); placeEndDot(); });
addEventListener('load', function () { placeEndDot(); measure(); });
setScale();
placeEndDot();
requestAnimationFrame(tick);
})();
</script>`
}
