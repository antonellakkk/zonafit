// Web Audio API Sound Generator for ZonaFit
// Works completely offline with zero external audio assets

class SoundController {
  private audioCtx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('zonafit_sound_enabled');
      this.soundEnabled = stored !== null ? stored === 'true' : true;
    }
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public setEnabled(enabled: boolean): void {
    this.soundEnabled = enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('zonafit_sound_enabled', String(enabled));
    }
  }

  public toggle(): boolean {
    this.setEnabled(!this.soundEnabled);
    if (this.soundEnabled) {
      this.playCountdownBeep();
    }
    return this.soundEnabled;
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // Basic synthesized tone
  public playTone(frequency: number, durationSec: number = 0.15, type: OscillatorType = 'sine', volume: number = 0.3): void {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + durationSec);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + durationSec);
    } catch (e) {
      console.warn('Audio tone error:', e);
    }
  }

  // 3, 2, 1 Countdown Beep
  public playCountdownBeep(): void {
    this.playTone(800, 0.12, 'sine', 0.25);
  }

  // Start round / work beep
  public playStartBeep(): void {
    this.playTone(1200, 0.35, 'triangle', 0.35);
  }

  // Rest transition tone
  public playRestTone(): void {
    this.playTone(450, 0.25, 'sine', 0.2);
  }

  // Boxing bell effect (for round start/end)
  public playBoxingBell(): void {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const playStrike = (timeOffset: number) => {
        const frequencies = [800, 1150, 1500, 2200];
        frequencies.forEach((f) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, ctx.currentTime + timeOffset);

          gain.gain.setValueAtTime(0.18, ctx.currentTime + timeOffset);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + timeOffset + 0.8);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime + timeOffset);
          osc.stop(ctx.currentTime + timeOffset + 0.85);
        });
      };

      playStrike(0);
      playStrike(0.18);
    } catch (e) {
      console.warn('Boxing bell error:', e);
    }
  }

  // Celebratory Chime (for workout completion)
  public playSuccessChime(): void {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        const startTime = ctx.currentTime + idx * 0.12;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.25, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.65);
      });
    } catch (e) {
      console.warn('Success chime error:', e);
    }
  }

  // Subtle UI click feedback
  public playClick(): void {
    this.playTone(600, 0.04, 'sine', 0.1);
  }
}

export const sound = new SoundController();
