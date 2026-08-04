// Journey ambient bed — native Web Audio (no Howler filter hacks): a seamless
// looping pad → lowpass → gain → out. The lowpass opens and the level lifts as
// the story warms, and a single chime marks the ch6→ch7 turn. Everything is
// created lazily on the first user gesture (autoplay policy) and torn down on
// disable. If the pad file is missing, enable() fails cleanly and stays off.
const clamp01 = (v) => Math.max(0, Math.min(1, v));
const dbToGain = (db) => Math.pow(10, db / 20);

export default class JourneyAudio {
  constructor({ padSrc, chimeSrc }) {
    this.padSrc = padSrc;
    this.chimeSrc = chimeSrc;
    this.ctx = null;
    this.pad = null;
    this.filter = null;
    this.gain = null;
    this.chimeBuffer = null;
    this.ready = false;
    this.chimed = false;
  }

  async enable() {
    if (this.ready) return true;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC || !this.padSrc) return false;
      this.ctx = new AC();
      await this.ctx.resume();

      const res = await fetch(this.padSrc);
      if (!res.ok) throw new Error("pad missing");
      const padBuffer = await this.ctx.decodeAudioData(await res.arrayBuffer());

      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = "lowpass";
      this.filter.frequency.value = 400;
      this.filter.Q.value = 0.7;

      this.gain = this.ctx.createGain();
      this.gain.gain.value = dbToGain(-18);

      this.pad = this.ctx.createBufferSource();
      this.pad.buffer = padBuffer;
      this.pad.loop = true;
      this.pad.connect(this.filter);
      this.filter.connect(this.gain);
      this.gain.connect(this.ctx.destination);
      this.pad.start();

      // Optional chime sample; otherwise a synth bell stands in.
      if (this.chimeSrc) {
        try {
          const cr = await fetch(this.chimeSrc);
          if (cr.ok)
            this.chimeBuffer = await this.ctx.decodeAudioData(
              await cr.arrayBuffer()
            );
        } catch {
          /* fall back to the synth chime */
        }
      }

      this.ready = true;
      return true;
    } catch {
      this.disable();
      return false;
    }
  }

  disable() {
    try {
      this.pad?.stop();
    } catch {
      /* already stopped */
    }
    try {
      this.ctx?.close();
    } catch {
      /* already closed */
    }
    this.ctx = null;
    this.pad = null;
    this.filter = null;
    this.gain = null;
    this.ready = false;
  }

  // Scroll progress 0..1 → cutoff 400Hz→8kHz (exponential) and level −18→−10dB.
  setProgress(p) {
    if (!this.ready) return;
    const t = this.ctx.currentTime;
    const cutoff = 400 * Math.pow(8000 / 400, clamp01(p));
    const level = dbToGain(-18 + 8 * clamp01(p));
    this.filter.frequency.setTargetAtTime(cutoff, t, 0.25);
    this.gain.gain.setTargetAtTime(level, t, 0.25);
  }

  // Once, as the story lifts out of the low point.
  chime() {
    if (!this.ready || this.chimed) return;
    this.chimed = true;
    const t = this.ctx.currentTime;
    if (this.chimeBuffer) {
      const s = this.ctx.createBufferSource();
      s.buffer = this.chimeBuffer;
      const g = this.ctx.createGain();
      g.gain.value = dbToGain(-12);
      s.connect(g);
      g.connect(this.ctx.destination);
      s.start(t);
      return;
    }
    // Synth bell: a soft struck sine, quick attack, long decay.
    const o = this.ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = 880;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(dbToGain(-14), t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 2.4);
    o.connect(g);
    g.connect(this.ctx.destination);
    o.start(t);
    o.stop(t + 2.5);
  }
}
