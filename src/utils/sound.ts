'use client';

const STORAGE_KEY_MUTED = 'quiz_2010_muted';

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_MUTED);
        this.isMuted = saved === 'true';
      } catch {
        this.isMuted = false;
      }
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    try {
      localStorage.setItem(STORAGE_KEY_MUTED, String(muted));
      window.dispatchEvent(new Event('quiz_sound_mute_changed'));
    } catch {
      // Ignore
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  private initContext(): AudioContext | null {
    if (this.isMuted || typeof window === 'undefined') return null;
    try {
      if (!this.ctx) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  /**
   * Sound event: Game Start
   * Rising melodic chime (C4 -> E4 -> G4 -> C5)
   */
  public playStart(): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    const notes = [261.63, 329.63, 392.0, 523.25];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + i * 0.07;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.12, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.22);
    });
  }

  /**
   * Sound event: Correct Answer
   * Cheerful high double chime (E5 -> B5)
   */
  public playCorrect(): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    const notes = [659.25, 987.77];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + i * 0.09;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });
  }

  /**
   * Sound event: Wrong Answer
   * Gentle descending buzz
   */
  public playWrong(): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.25);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  /**
   * Sound event: Timeout
   * Dual alert blips
   */
  public playTimeout(): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    [0, 0.1].forEach((offset) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + offset;
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, startTime);
      gain.gain.setValueAtTime(0.07, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.07);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.07);
    });
  }

  /**
   * Sound event: Result Screen
   * Victory celebratory fanfare chord sequence
   */
  public playResult(): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    const chord = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99];
    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + idx * 0.06;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.12, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.55);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.55);
    });
  }
}

export const soundManager = new SoundManager();

export function subscribeSoundMute(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('quiz_sound_mute_changed', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('quiz_sound_mute_changed', callback);
  };
}

export function getSoundMuteSnapshot(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(STORAGE_KEY_MUTED) === 'true';
  } catch {
    return false;
  }
}

export function getServerSoundMuteSnapshot(): boolean {
  return false;
}
