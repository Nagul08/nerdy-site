// Web Audio API sound synthesizer for terminal tactile clicks and lo-fi ambient audio

class SoundController {
  private ctx: AudioContext | null = null
  private isMuted: boolean = false
  private ambientOscillators: { osc: OscillatorNode; gain: GainNode }[] = []
  private isPlayingMusic: boolean = false
  private musicInterval: any = null

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
    return this.ctx
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted
    if (this.isMuted && this.isPlayingMusic) {
      this.stopMusic()
    }
    return this.isMuted
  }

  public getMuted(): boolean {
    return this.isMuted
  }

  // Tactile mechanical switch click sound
  public playClick(type: 'key' | 'enter' | 'beep' | 'tab' = 'key') {
    if (this.isMuted) return
    try {
      const ctx = this.getContext()
      if (!ctx) return

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)

      const now = ctx.currentTime

      if (type === 'key') {
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(600 + Math.random() * 200, now)
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.04)
        gain.gain.setValueAtTime(0.04, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)
        osc.start(now)
        osc.stop(now + 0.04)
      } else if (type === 'enter') {
        osc.type = 'square'
        osc.frequency.setValueAtTime(440, now)
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08)
        gain.gain.setValueAtTime(0.06, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)
        osc.start(now)
        osc.stop(now + 0.08)
      } else if (type === 'beep') {
        osc.type = 'sine'
        osc.frequency.setValueAtTime(880, now)
        gain.gain.setValueAtTime(0.08, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15)
        osc.start(now)
        osc.stop(now + 0.15)
      } else if (type === 'tab') {
        osc.type = 'sine'
        osc.frequency.setValueAtTime(520, now)
        osc.frequency.exponentialRampToValueAtTime(780, now + 0.05)
        gain.gain.setValueAtTime(0.05, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)
        osc.start(now)
        osc.stop(now + 0.05)
      }
    } catch {
      // Audio context might be restricted before user gesture
    }
  }

  // Generative chill synthwave chords for Now Playing widget
  public startMusic(trackIndex: number = 0) {
    if (this.isMuted) return
    this.stopMusic()
    try {
      const ctx = this.getContext()
      if (!ctx) return
      this.isPlayingMusic = true

      // Chord progressions based on track
      const chords = [
        // Track 1: Resonance - D minor chill (D, F, A, C)
        [146.83, 174.61, 220.00, 261.63],
        // Track 2: Cyber Drifter - A minor dream (220, 261.63, 329.63, 392.00)
        [220.00, 261.63, 329.63, 392.00],
        // Track 3: Midnight Compiler - F Major 7 (174.61, 220.00, 261.63, 329.63)
        [174.61, 220.00, 261.63, 329.63],
        // Track 4: Kernel Panic Lo-Fi - G minor 9 (196.00, 233.08, 293.66, 349.23)
        [196.00, 233.08, 293.66, 349.23],
      ]

      const currentChord = chords[trackIndex % chords.length]

      // Filter for warm analog synth tone
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(450, ctx.currentTime)
      filter.connect(ctx.destination)

      this.ambientOscillators = currentChord.map(freq => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(freq, ctx.currentTime)

        // Subtle slow detune for warm analog chorusing
        osc.detune.setValueAtTime((Math.random() - 0.5) * 8, ctx.currentTime)

        gain.gain.setValueAtTime(0.012, ctx.currentTime)
        osc.connect(gain)
        gain.connect(filter)
        osc.start()
        return { osc, gain }
      })

      // Gentle filter sweep
      let phase = 0
      this.musicInterval = setInterval(() => {
        if (!this.isPlayingMusic || !this.ctx) return
        phase += 0.05
        const targetFreq = 400 + Math.sin(phase) * 150
        filter.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.5)
      }, 500)
    } catch {
      // Audio autoplay policy
    }
  }

  public stopMusic() {
    this.isPlayingMusic = false
    if (this.musicInterval) {
      clearInterval(this.musicInterval)
      this.musicInterval = null
    }
    this.ambientOscillators.forEach(({ osc, gain }) => {
      try {
        if (this.ctx) {
          gain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.1)
          setTimeout(() => {
            try {
              osc.stop()
              osc.disconnect()
            } catch {}
          }, 150)
        }
      } catch {}
    })
    this.ambientOscillators = []
  }

  public isMusicPlaying(): boolean {
    return this.isPlayingMusic
  }
}

export const soundFx = new SoundController()
