// Web Audio cues for the study room.
// The aesthetic is cozy-journal: warm bells, paper textures,
// and wood-block clicks — nothing sharp or arcade-y. Everything
// is synthesised on the fly so the bundle stays asset-free.

type SoundName =
  | 'tap'
  | 'correct'
  | 'wrong'
  | 'complete'
  | 'flip'
  | 'swipe'
  | 'known'
  | 'open';

const MUTE_KEY = 'studyroom:muted';

let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let muted = readMuted();

function readMuted(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(MUTE_KEY) === '1';
  } catch {
    return false;
  }
}

function writeMuted(v: boolean) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(MUTE_KEY, v ? '1' : '0');
  } catch {
    /* ignore */
  }
}

export function isMuted() {
  return muted;
}

export function setMuted(v: boolean) {
  muted = v;
  writeMuted(v);
  window.dispatchEvent(new CustomEvent('studyroom:mute', { detail: v }));
}

export function toggleMuted() {
  setMuted(!muted);
  return muted;
}

function getCtx(): { ac: AudioContext; out: GainNode } | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    type AudioCtor = typeof AudioContext;
    const W = window as unknown as {
      AudioContext?: AudioCtor;
      webkitAudioContext?: AudioCtor;
    };
    const Ctor = W.AudioContext ?? W.webkitAudioContext;
    if (!Ctor) return null;
    try {
      ctx = new Ctor();
      masterGain = ctx.createGain();
      masterGain.gain.value = 0.85;
      masterGain.connect(ctx.destination);
    } catch {
      return null;
    }
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return { ac: ctx, out: masterGain! };
}

// Shared pink-noise buffer — reused for every paper-like sound.
let pinkBuffer: AudioBuffer | null = null;
function pink(ac: AudioContext): AudioBuffer {
  if (pinkBuffer) return pinkBuffer;
  const length = ac.sampleRate * 1.2;
  const buf = ac.createBuffer(1, length, ac.sampleRate);
  const data = buf.getChannelData(0);
  // Paul Kellet's pink-noise approximation
  let b0 = 0,
    b1 = 0,
    b2 = 0,
    b3 = 0,
    b4 = 0,
    b5 = 0,
    b6 = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.969 * b2 + white * 0.153852;
    b3 = 0.8665 * b3 + white * 0.3104856;
    b4 = 0.55 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.016898;
    data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
    b6 = white * 0.115926;
  }
  pinkBuffer = buf;
  return buf;
}

// A single bell-like voice: fundamental + two overtones, each with its
// own decay curve, through a gentle lowpass. Warm but not dull.
function bell(
  ac: AudioContext,
  out: AudioNode,
  freq: number,
  {
    delay = 0,
    gain = 0.18,
    decay = 0.8,
    brightness = 3800,
  }: { delay?: number; gain?: number; decay?: number; brightness?: number } = {},
) {
  const start = ac.currentTime + delay;

  const lp = ac.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = brightness;
  lp.Q.value = 0.4;
  lp.connect(out);

  // Harmonic partials — slight inharmonicity gives bell character.
  const partials: Array<{ mult: number; amp: number; decay: number }> = [
    { mult: 1.0, amp: 1.0, decay: decay },
    { mult: 2.004, amp: 0.35, decay: decay * 0.55 },
    { mult: 3.012, amp: 0.15, decay: decay * 0.32 },
    { mult: 4.1, amp: 0.06, decay: decay * 0.22 },
  ];

  for (const p of partials) {
    const osc = ac.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq * p.mult;

    const g = ac.createGain();
    const peak = Math.min(0.35, gain * p.amp);
    g.gain.setValueAtTime(0.00001, start);
    g.gain.exponentialRampToValueAtTime(peak, start + 0.006);
    g.gain.exponentialRampToValueAtTime(0.00001, start + 0.006 + p.decay);

    osc.connect(g).connect(lp);
    osc.start(start);
    osc.stop(start + 0.008 + p.decay + 0.02);
  }
}

// A percussive wood-block — a tiny low-freq thump plus a noise crack.
function woodBlock(
  ac: AudioContext,
  out: AudioNode,
  {
    delay = 0,
    gain = 0.18,
    freq = 420,
  }: { delay?: number; gain?: number; freq?: number } = {},
) {
  const start = ac.currentTime + delay;

  // Body: short sine with rapid pitch drop.
  const osc = ac.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq * 1.6, start);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.6, start + 0.08);
  const g = ac.createGain();
  g.gain.setValueAtTime(0.00001, start);
  g.gain.exponentialRampToValueAtTime(gain, start + 0.003);
  g.gain.exponentialRampToValueAtTime(0.00001, start + 0.09);

  const lp = ac.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 2200;
  osc.connect(g).connect(lp).connect(out);
  osc.start(start);
  osc.stop(start + 0.12);

  // Click: tiny noise burst through a tight band-pass.
  const src = ac.createBufferSource();
  src.buffer = pink(ac);
  const bp = ac.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 1800;
  bp.Q.value = 2.2;
  const ng = ac.createGain();
  ng.gain.setValueAtTime(gain * 0.45, start);
  ng.gain.exponentialRampToValueAtTime(0.00001, start + 0.05);
  src.connect(bp).connect(ng).connect(out);
  src.start(start);
  src.stop(start + 0.08);
}

// A paper-like rustle: pink noise through a swept band-pass.
function paperRustle(
  ac: AudioContext,
  out: AudioNode,
  {
    duration = 0.14,
    gain = 0.12,
    peakHz = 2400,
    endHz = 1100,
  }: { duration?: number; gain?: number; peakHz?: number; endHz?: number } = {},
) {
  const start = ac.currentTime;
  const src = ac.createBufferSource();
  src.buffer = pink(ac);

  const bp = ac.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.setValueAtTime(peakHz, start);
  bp.frequency.exponentialRampToValueAtTime(endHz, start + duration);
  bp.Q.value = 0.9;

  const g = ac.createGain();
  g.gain.setValueAtTime(0.00001, start);
  g.gain.exponentialRampToValueAtTime(gain, start + duration * 0.18);
  g.gain.exponentialRampToValueAtTime(0.00001, start + duration);

  // Optional low-frequency whoomph under the rustle — gives body.
  const osc = ac.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(160, start);
  osc.frequency.exponentialRampToValueAtTime(70, start + duration);
  const og = ac.createGain();
  og.gain.setValueAtTime(0.00001, start);
  og.gain.exponentialRampToValueAtTime(gain * 0.35, start + 0.015);
  og.gain.exponentialRampToValueAtTime(0.00001, start + duration);

  src.connect(bp).connect(g).connect(out);
  osc.connect(og).connect(out);

  src.start(start);
  src.stop(start + duration + 0.05);
  osc.start(start);
  osc.stop(start + duration + 0.05);
}

// Two sines whose beating produces a warm, vocal sweep.
function warmPad(
  ac: AudioContext,
  out: AudioNode,
  freq: number,
  {
    duration = 0.45,
    gain = 0.14,
  }: { duration?: number; gain?: number } = {},
) {
  const start = ac.currentTime;
  const lp = ac.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 2400;

  for (let i = 0; i < 2; i++) {
    const osc = ac.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq * (i === 0 ? 1 : 1.005);

    const g = ac.createGain();
    g.gain.setValueAtTime(0.00001, start);
    g.gain.exponentialRampToValueAtTime(gain * 0.6, start + 0.12);
    g.gain.exponentialRampToValueAtTime(0.00001, start + duration);

    osc.connect(g).connect(lp);
    osc.start(start);
    osc.stop(start + duration + 0.04);
  }

  lp.connect(out);
}

const SOUNDS: Record<SoundName, () => void> = {
  tap: () => {
    const c = getCtx();
    if (!c) return;
    woodBlock(c.ac, c.out, { gain: 0.13, freq: 520 });
  },

  correct: () => {
    const c = getCtx();
    if (!c) return;
    // Mi → Sol: warm, clearly positive, no arcade sparkle.
    bell(c.ac, c.out, 659.25, { gain: 0.2, decay: 0.9 });
    bell(c.ac, c.out, 987.77, { delay: 0.11, gain: 0.16, decay: 0.95 });
  },

  wrong: () => {
    const c = getCtx();
    if (!c) return;
    // Two close pitches fading down — soft dissonance, not a buzzer.
    const { ac, out } = c;
    const start = ac.currentTime;
    const lp = ac.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 1400;
    lp.connect(out);

    for (const f of [330, 311]) {
      const osc = ac.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, start);
      osc.frequency.exponentialRampToValueAtTime(f * 0.78, start + 0.28);
      const g = ac.createGain();
      g.gain.setValueAtTime(0.00001, start);
      g.gain.exponentialRampToValueAtTime(0.09, start + 0.02);
      g.gain.exponentialRampToValueAtTime(0.00001, start + 0.32);
      osc.connect(g).connect(lp);
      osc.start(start);
      osc.stop(start + 0.36);
    }
  },

  complete: () => {
    const c = getCtx();
    if (!c) return;
    // Ascending major arpeggio — C5 E5 G5 C6 — with bell timbre.
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((f, i) =>
      bell(c.ac, c.out, f, {
        delay: i * 0.11,
        gain: 0.17 - i * 0.01,
        decay: 0.85 + i * 0.05,
        brightness: 4200,
      }),
    );
  },

  flip: () => {
    const c = getCtx();
    if (!c) return;
    paperRustle(c.ac, c.out, {
      duration: 0.12,
      gain: 0.11,
      peakHz: 2600,
      endHz: 1400,
    });
  },

  swipe: () => {
    const c = getCtx();
    if (!c) return;
    paperRustle(c.ac, c.out, {
      duration: 0.22,
      gain: 0.1,
      peakHz: 1600,
      endHz: 700,
    });
  },

  known: () => {
    const c = getCtx();
    if (!c) return;
    // Little "got it" — perfect fourth up, bell timbre.
    bell(c.ac, c.out, 523.25, { gain: 0.15, decay: 0.45, brightness: 4500 });
    bell(c.ac, c.out, 698.46, {
      delay: 0.08,
      gain: 0.17,
      decay: 0.55,
      brightness: 4500,
    });
  },

  open: () => {
    const c = getCtx();
    if (!c) return;
    warmPad(c.ac, c.out, 392, { duration: 0.55, gain: 0.11 });
  },
};

export function play(name: SoundName) {
  if (muted) return;
  try {
    SOUNDS[name]();
  } catch {
    /* ignore */
  }
}
