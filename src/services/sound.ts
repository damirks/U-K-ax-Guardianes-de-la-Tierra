/**
 * Servicio de Sonido para U K'áax: Guardianes de la Tierra
 * Implementa síntesis Web Audio API sin dependencias externas:
 * - Bucle ambiental de selva tropical maya (viento en el dosel, grillos, gotas y aves exóticas)
 * - Clics táctiles de piedra tallada (stone click)
 * - Sonidos de éxito y error con estética ancestral
 * - Control estricto del estado de silencio (isMuted)
 */

class SoundSystem {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = false;

  // Rainforest ambience state
  private isAmbienceActive: boolean = false;
  private ambienceGain: GainNode | null = null;
  private ambienceWindNode: AudioNode | null = null;
  private ambienceLfo: OscillatorNode | null = null;
  private birdCallTimer: number | null = null;
  private cricketTimer: number | null = null;

  // Custom MP3 background music state (/assets/musica/tema.mp3)
  private isThemeMusicActive: boolean = false;
  private bgMusic: HTMLAudioElement | null = null;
  private bgMusicUnavailable: boolean = false;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  /**
   * Inicializa o reanuda el AudioContext (requerido por políticas de navegadores)
   */
  public init() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.85, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  /**
   * Activa o desactiva el silencio global
   */
  public toggleMute(): boolean {
    return this.setMuted(!this.isMuted);
  }

  /**
   * Establece explícitamente el estado de silencio
   */
  public setMuted(muted: boolean): boolean {
    this.isMuted = muted;

    if (this.ctx && this.masterGain) {
      const targetGain = this.isMuted ? 0 : 0.85;
      this.masterGain.gain.setValueAtTime(targetGain, this.ctx.currentTime);
    }

    if (this.isMuted) {
      this.stopAmbienceNodes();
      this.pauseThemeMusic();
    } else {
      // Si la ambientación o la música estaban activas previamente, reanudar
      if (this.isAmbienceActive) {
        this.playJungleAmbience();
      }
      if (this.isThemeMusicActive) {
        this.playThemeMusic();
      }
    }

    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // ==========================================================================
  // BUCLE AMBIENTAL DE SELVA TROPICAL (TROPICAL RAINFOREST AMBIENCE)
  // ==========================================================================

  /**
   * Inicia el bucle ambiental de selva tropical maya:
   * 1. Brisa suave y follaje meciéndose (ruido rosa con filtro paso bajo modulado por LFO)
   * 2. Grillos y cigarras nocturnas del sotobosque
   * 3. Trinos y silbidos distantes de aves tropicales (Quetzal / Guacamaya)
   */
  public playJungleAmbience() {
    this.isAmbienceActive = true;
    if (this.isMuted) return;

    this.init();
    if (!this.ctx || !this.masterGain) return;

    // Detener instancias anteriores si existían
    this.stopAmbienceNodes();

    try {
      // 1. Nodo de ganancia para la ambientación (suave para convivir con la música)
      this.ambienceGain = this.ctx.createGain();
      this.ambienceGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      // Entrada suave (fade-in) de 1.8 segundos
      this.ambienceGain.gain.exponentialRampToValueAtTime(0.1, this.ctx.currentTime + 1.8);
      this.ambienceGain.connect(this.masterGain);

      // 2. Generador de brisa en el follaje selvático (biquad filtered pink/canopy noise)
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2) * 0.12;
      }

      const whiteNoiseSource = this.ctx.createBufferSource();
      whiteNoiseSource.buffer = noiseBuffer;
      whiteNoiseSource.loop = true;

      // Filtro paso bajo suave que simula hojas y viento en la copa de los árboles
      const canopyFilter = this.ctx.createBiquadFilter();
      canopyFilter.type = 'lowpass';
      canopyFilter.frequency.setValueAtTime(450, this.ctx.currentTime);

      // LFO para oscilar lentamente la frecuencia del viento (0.12 Hz = ciclo de 8 segundos)
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(180, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(canopyFilter.frequency);

      whiteNoiseSource.connect(canopyFilter);
      canopyFilter.connect(this.ambienceGain);

      whiteNoiseSource.start();
      lfo.start();

      this.ambienceWindNode = whiteNoiseSource;
      this.ambienceLfo = lfo;

      // 3. Generación periódica de cantos de aves de la selva y grillos
      this.scheduleBirdCalls();
      this.scheduleCrickets();
    } catch {}
  }

  /**
   * Programa trinos sutiles y melodiosos de aves tropicales a intervalos aleatorios
   */
  private scheduleBirdCalls() {
    if (!this.isAmbienceActive || this.isMuted) return;

    // Próximo canto de ave en 4.5 a 8.5 segundos
    const nextInterval = 4500 + Math.random() * 4000;
    this.birdCallTimer = window.setTimeout(() => {
      if (!this.isAmbienceActive || this.isMuted) return;
      this.triggerTropicalBirdCall();
      this.scheduleBirdCalls();
    }, nextInterval);
  }

  /**
   * Sintetiza un silbido armónico de ave tropical (frecuencia ascendente y descendente)
   */
  private triggerTropicalBirdCall() {
    if (!this.ctx || !this.ambienceGain || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const birdGain = this.ctx.createGain();

      // Frecuencias típicas de aves selváticas (2200Hz - 2900Hz)
      const baseFreq = 2100 + Math.random() * 600;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.linearRampToValueAtTime(baseFreq + 550, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(baseFreq - 200, now + 0.28);

      birdGain.gain.setValueAtTime(0, now);
      birdGain.gain.linearRampToValueAtTime(0.045, now + 0.05);
      birdGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

      osc.connect(birdGain);
      birdGain.connect(this.ambienceGain);

      osc.start(now);
      osc.stop(now + 0.35);

      // A veces agregar una segunda nota en eco
      if (Math.random() > 0.4) {
        setTimeout(() => {
          if (!this.ctx || !this.ambienceGain || this.isMuted) return;
          try {
            const echoNow = this.ctx.currentTime;
            const osc2 = this.ctx.createOscillator();
            const gain2 = this.ctx.createGain();
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(baseFreq + 300, echoNow);
            osc2.frequency.exponentialRampToValueAtTime(baseFreq + 800, echoNow + 0.18);
            gain2.gain.setValueAtTime(0.035, echoNow);
            gain2.gain.exponentialRampToValueAtTime(0.0001, echoNow + 0.22);
            osc2.connect(gain2);
            gain2.connect(this.ambienceGain);
            osc2.start(echoNow);
            osc2.stop(echoNow + 0.25);
          } catch {}
        }, 180);
      }
    } catch {}
  }

  /**
   * Programa sutiles pulsaciones rítmicas de grillos y chicharras de la selva
   */
  private scheduleCrickets() {
    if (!this.isAmbienceActive || this.isMuted) return;

    const nextInterval = 2800 + Math.random() * 3200;
    this.cricketTimer = window.setTimeout(() => {
      if (!this.isAmbienceActive || this.isMuted) return;
      this.triggerCricketPulse();
      this.scheduleCrickets();
    }, nextInterval);
  }

  private triggerCricketPulse() {
    if (!this.ctx || !this.ambienceGain || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(4200 + Math.random() * 400, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.018, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ambienceGain);

      osc.start(now);
      osc.stop(now + 0.38);
    } catch {}
  }

  /**
   * Detiene el bucle ambiental con una atenuación suave
   */
  public stopJungleAmbience() {
    this.isAmbienceActive = false;
    this.stopAmbienceNodes();
  }

  private stopAmbienceNodes() {
    if (this.birdCallTimer !== null) {
      clearTimeout(this.birdCallTimer);
      this.birdCallTimer = null;
    }
    if (this.cricketTimer !== null) {
      clearTimeout(this.cricketTimer);
      this.cricketTimer = null;
    }

    if (this.ambienceGain && this.ctx) {
      try {
        this.ambienceGain.gain.setValueAtTime(this.ambienceGain.gain.value, this.ctx.currentTime);
        this.ambienceGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
      } catch {}
    }

    setTimeout(() => {
      if (this.ambienceWindNode) {
        try { (this.ambienceWindNode as AudioBufferSourceNode).stop(); } catch {}
        this.ambienceWindNode = null;
      }
      if (this.ambienceLfo) {
        try { this.ambienceLfo.stop(); } catch {}
        this.ambienceLfo = null;
      }
      this.ambienceGain = null;
    }, 600);
  }

  // ==========================================================================
  // MÚSICA PRINCIPAL: ECOS DEL MAYAB (BUCLE CONTINUO)
  // ==========================================================================

  /**
   * Reproduce en bucle infinito la pista principal del juego (/assets/aistudio/Ecos_del_Mayab_bc3e5928.mp3).
   * Retorna true si el navegador permitió iniciar la reproducción de inmediato.
   */
  public async playThemeMusic(): Promise<boolean> {
    this.isThemeMusicActive = true;
    if (this.isMuted || this.bgMusicUnavailable) return false;

    try {
      if (!this.bgMusic) {
        const audio = new Audio('./assets/aistudio/Ecos_del_Mayab_bc3e5928.mp3');
        audio.loop = true;
        audio.preload = 'auto';
        audio.volume = 0.5;
        audio.addEventListener('error', () => {
          this.bgMusicUnavailable = true;
        });
        audio.addEventListener('ended', () => {
          if (!this.isMuted && this.isThemeMusicActive) {
            audio.currentTime = 0;
            audio.play().catch(() => {});
          }
        });
        this.bgMusic = audio;
      }

      this.bgMusic.loop = true;
      this.bgMusic.muted = this.isMuted;

      if (!this.bgMusic.paused) {
        return true;
      }

      await this.bgMusic.play();
      if (this.isMuted || !this.isThemeMusicActive) {
        this.bgMusic.pause();
        return false;
      }
      return !this.bgMusic.paused;
    } catch {
      return false;
    }
  }

  public stopThemeMusic() {
    this.isThemeMusicActive = false;
    this.pauseThemeMusic();
  }

  private pauseThemeMusic() {
    if (this.bgMusic && !this.bgMusic.paused) {
      try {
        this.bgMusic.pause();
      } catch {}
    }
  }

  // ==========================================================================
  // SONIDOS DE INTERACCIÓN ESPECÍFICOS (SFX)
  // ==========================================================================

  /**
   * Clic de piedra tallada maya (Stone Click):
   * Sonido táctil orgánico de dos bloques de jade o piedra caliza chocando suavemente.
   */
  public playStoneClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;

      // 1. Componente de impacto (transitorio con descenso rápido de tono)
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(340, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.045);

      oscGain.gain.setValueAtTime(0.16, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      osc.connect(oscGain);
      oscGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.05);

      // 2. Componente de textura de piedra (ráfaga corta filtrada en banda resonante)
      const noiseBuffer = this.ctx.createBuffer(1, Math.floor(this.ctx.sampleRate * 0.035), this.ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (data.length * 0.25));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1150, now);
      filter.Q.setValueAtTime(4.2, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.18, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      noise.start(now);
      noise.stop(now + 0.04);
    } catch {}
  }

  /**
   * Alias de compatibilidad para clics en botones de la interfaz
   */
  public playClick() {
    this.playStoneClick();
  }

  /**
   * Sonido de éxito (Success):
   * Acorde pentatónico maya brillante, gratificante y armonioso (C5, E5, G5, C6).
   */
  public playSuccess() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    try {
      const chord = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const now = this.ctx.currentTime;

      chord.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const noteTime = now + idx * 0.065;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0, noteTime);
        gain.gain.linearRampToValueAtTime(0.13, noteTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.38);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(noteTime);
        osc.stop(noteTime + 0.42);
      });
    } catch {}
  }

  /**
   * Sonido de error (Error / Intentar de nuevo):
   * Tono hueco y suave de madera/piedra descendente que orienta sin ser estridente.
   */
  public playError() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(130, now + 0.22);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, now);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch {}
  }

  /**
   * Sonido de recolección de elemento sagrado (Agua, semilla, etc.)
   */
  public playPickup() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.16);
    } catch {}
  }

  /**
   * Fanfarria ancestral de victoria al completar un santuario
   */
  public playFanfare() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    try {
      const notes = [440, 554.37, 659.25, 880, 783.99, 1046.5];
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const noteTime = now + idx * 0.11;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0, noteTime);
        gain.gain.linearRampToValueAtTime(0.14, noteTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.45);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(noteTime);
        osc.stop(noteTime + 0.5);
      });
    } catch {}
  }

  /**
   * Sonido de pérdida de oportunidad / vida
   */
  public playLifeLoss() {
    this.playError();
  }
}

export const soundService = new SoundSystem();
