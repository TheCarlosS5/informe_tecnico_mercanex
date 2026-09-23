/**
 * MERCANEX ZERO-BYTE PROCEDURAL ACOUSTIC SYNTHESIZER
 * Built using the native Web Audio API (0 KB external assets, 0 HTTP network calls)
 * Muted by default to respect accessibility and WCAG standards.
 */

class SoundSynthesizer {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    
    // Check localStorage preference safely
    try {
      const stored = localStorage.getItem('mercanex_audio_muted');
      if (stored !== null) {
        this.isMuted = stored === 'true';
      }
    } catch {
      // Default to muted
    }
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem('mercanex_audio_muted', String(this.isMuted));
    } catch {
      // Ignore
    }
    if (!this.isMuted) {
      this.init();
      this.playChime(523.25, 0.12); // C5 soft confirmation chime
    }
    return this.isMuted;
  }

  getMuted() {
    return this.isMuted;
  }

  playTone(freq, type = 'sine', duration = 0.1, gainVal = 0.08) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(freq * 2, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Ignore audio glitches
    }
  }

  playClick() {
    this.playTone(600, 'sine', 0.04, 0.03);
  }

  playChime(freq = 440, duration = 0.2) {
    this.playTone(freq, 'sine', duration, 0.05);
  }

  playReveal() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      // Two-tone arpeggio (C5 -> G5)
      const now = this.ctx.currentTime;
      [523.25, 783.99].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.06, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.25);
      });
    } catch {
      // Ignore
    }
  }

  playSuccess() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      // Triad chord (C5, E5, G5)
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.05, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.35);
      });
    } catch {
      // Ignore
    }
  }
}

export const sound = new SoundSynthesizer();
