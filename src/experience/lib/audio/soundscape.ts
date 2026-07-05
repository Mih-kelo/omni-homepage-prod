import { useJourney } from "../journey/journeyStore";

/**
 * The optional sound layer (Direction §10): a generative ambience derived
 * from one scale so the machine hums in key — filtered air in the white
 * chambers, a low warm pulse from the Core, small glass chimes when the
 * machine dreams. Off by default; constructed lazily on the visitor's
 * gesture; never necessary — the piece is complete silent.
 */

/** A-minor pentatonic — every voice draws from this scale */
const CHIME_HZ = [440, 523.25, 659.25, 783.99, 587.33];

interface Voices {
  ctx: AudioContext;
  master: GainNode;
  airGain: GainNode;
  pulseGain: GainNode;
  pulseOsc: OscillatorNode;
  raf: number;
  unsubDream: () => void;
}

let voices: Voices | null = null;

function buildNoiseBuffer(ctx: AudioContext): AudioBuffer {
  const seconds = 2;
  const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < data.length; i++) {
    // brown-ish noise: integrate white noise for a soft, airy floor
    last = (last + (Math.random() * 2 - 1) * 0.02) * 0.996;
    data[i] = last * 3.2;
  }
  return buffer;
}

function chime(ctx: AudioContext, master: GainNode) {
  const note = CHIME_HZ[Math.floor(Math.random() * CHIME_HZ.length)];
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.value = note;
  gain.gain.setValueAtTime(0.0001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.028, ctx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.4);
  osc.connect(gain).connect(master);
  osc.start();
  osc.stop(ctx.currentTime + 2.6);
}

export function startSoundscape(): boolean {
  if (voices) return true;
  try {
    const ctx = new AudioContext();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    // filtered air
    const noise = ctx.createBufferSource();
    noise.buffer = buildNoiseBuffer(ctx);
    noise.loop = true;
    const airFilter = ctx.createBiquadFilter();
    airFilter.type = "lowpass";
    airFilter.frequency.value = 420;
    const airGain = ctx.createGain();
    airGain.gain.value = 0.05;
    noise.connect(airFilter).connect(airGain).connect(master);
    noise.start();

    // the Core's low warm pulse (A1), breathing on the six-second period
    const pulseOsc = ctx.createOscillator();
    pulseOsc.type = "sine";
    pulseOsc.frequency.value = 55;
    const pulseGain = ctx.createGain();
    pulseGain.gain.value = 0;
    pulseOsc.connect(pulseGain).connect(master);
    pulseOsc.start();

    // fade the master in gently
    master.gain.setTargetAtTime(0.9, ctx.currentTime, 0.8);

    // grade drives the pulse; dreams ring a glass chime
    let raf = 0;
    const tick = () => {
      const j = useJourney.getState();
      const breathe = 0.5 + 0.5 * Math.sin((performance.now() / 6000) * Math.PI * 2);
      pulseGain.gain.setTargetAtTime(j.grade * (0.03 + breathe * 0.02), ctx.currentTime, 0.4);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    let lastTick = useJourney.getState().dream.tick;
    const unsubDream = useJourney.subscribe((state) => {
      if (state.dream.tick !== lastTick) {
        lastTick = state.dream.tick;
        chime(ctx, master);
      }
    });

    voices = { ctx, master, airGain, pulseGain, pulseOsc, raf, unsubDream };
    return true;
  } catch {
    return false;
  }
}

export function stopSoundscape() {
  if (!voices) return;
  const v = voices;
  voices = null;
  cancelAnimationFrame(v.raf);
  v.unsubDream();
  v.master.gain.setTargetAtTime(0, v.ctx.currentTime, 0.3);
  window.setTimeout(() => {
    v.ctx.close().catch(() => undefined);
  }, 900);
}
