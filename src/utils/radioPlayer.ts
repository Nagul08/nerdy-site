import { useSyncExternalStore } from 'react'

export interface RadioStation {
  id: string
  name: string
  genre: string
  url: string
  freq: string
  code: string
}

export const RADIO_STATIONS: RadioStation[] = [
  {
    id: 'cliamp-lofi',
    name: 'Lo-Fi Coding Beats',
    genre: 'Chill / Study / Focus',
    url: 'https://radio.cliamp.stream/lofi/stream',
    freq: '140.85 MHz',
    code: '01 LO-FI',
  },
  {
    id: 'cliamp-synthwave',
    name: 'Synthwave 80s',
    genre: 'Retro / Outrun / Neon',
    url: 'https://radio.cliamp.stream/synthwave/stream',
    freq: '141.12 MHz',
    code: '02 SYNTH',
  },
  {
    id: 'nightwave-plaza',
    name: 'Nightwave Plaza',
    genre: 'Vaporwave / Future Funk',
    url: 'https://radio.plaza.one/mp3',
    freq: '143.75 MHz',
    code: '03 PLAZA',
  },
  {
    id: 'cliamp-edm',
    name: 'Cyber EDM',
    genre: 'Electronic / Cyber Bass',
    url: 'https://radio.cliamp.stream/edm/stream',
    freq: '142.33 MHz',
    code: '04 EDM',
  },
]

interface RadioState {
  stationIndex: number
  isPlaying: boolean
  isLoading: boolean
  isMuted: boolean
  volume: number
  elapsedSeconds: number
  eqBars: number[]
  vuLeft: number
  vuRight: number
}

// Global state singleton
let state: RadioState = {
  stationIndex: 0,
  isPlaying: false,
  isLoading: false,
  isMuted: false,
  volume: 75,
  elapsedSeconds: 0,
  eqBars: [2, 4, 3, 5, 2, 6, 4, 3, 5, 2, 4, 3, 5, 3, 4, 2],
  vuLeft: 4,
  vuRight: 5,
}

const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((listener) => listener())
}

let audio: HTMLAudioElement | null = null

function getAudio(): HTMLAudioElement {
  if (!audio && typeof window !== 'undefined') {
    audio = new Audio()
    audio.crossOrigin = 'anonymous'
    audio.preload = 'none'

    audio.addEventListener('playing', () => {
      state = { ...state, isPlaying: true, isLoading: false }
      emit()
    })

    audio.addEventListener('waiting', () => {
      state = { ...state, isLoading: true }
      emit()
    })

    audio.addEventListener('error', () => {
      state = { ...state, isPlaying: false, isLoading: false }
      stopMeters()
      emit()
    })
  }
  return audio!
}

let timerInterval: ReturnType<typeof setInterval> | null = null

function startMeters() {
  stopMeters()
  timerInterval = setInterval(() => {
    state = { ...state, elapsedSeconds: state.elapsedSeconds + 1 }
    emit()
  }, 1000)
}

function stopMeters() {
  if (timerInterval) clearInterval(timerInterval)
  timerInterval = null
  state = {
    ...state,
    eqBars: [2, 4, 3, 5, 2, 6, 4, 3, 5, 2, 4, 3, 5, 3, 4, 2],
    vuLeft: 1,
    vuRight: 1,
  }
  emit()
}

export const radioPlayer = {
  getState() {
    return state
  },
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
  async togglePlay() {
    const a = getAudio()
    if (state.isPlaying) {
      a.pause()
      state = { ...state, isPlaying: false, isLoading: false }
      stopMeters()
      emit()
    } else {
      const currentStation = RADIO_STATIONS[state.stationIndex]
      state = { ...state, isLoading: true }
      emit()
      try {
        if (!a.src || a.src !== currentStation.url) {
          a.src = currentStation.url
          a.load()
        }
        await a.play()
        state = { ...state, isPlaying: true, isLoading: false }
        startMeters()
        emit()
      } catch {
        state = { ...state, isPlaying: false, isLoading: false }
        stopMeters()
        emit()
      }
    }
  },
  setStation(index: number) {
    if (index === state.stationIndex) return
    state = { ...state, stationIndex: index, elapsedSeconds: 0 }
    emit()
    const a = getAudio()
    if (state.isPlaying) {
      state = { ...state, isLoading: true }
      emit()
      a.src = RADIO_STATIONS[index].url
      a.load()
      a.play()
        .then(() => {
          state = { ...state, isPlaying: true, isLoading: false }
          emit()
        })
        .catch(() => {
          state = { ...state, isPlaying: false, isLoading: false }
          stopMeters()
          emit()
        })
    }
  },
  nextStation() {
    const nextIdx = (state.stationIndex + 1) % RADIO_STATIONS.length
    this.setStation(nextIdx)
  },
  setVolume(vol: number) {
    state = { ...state, volume: vol }
    const a = getAudio()
    if (a) {
      a.volume = state.isMuted ? 0 : vol / 100
    }
    emit()
  },
  toggleMute() {
    const nextMuted = !state.isMuted
    state = { ...state, isMuted: nextMuted }
    const a = getAudio()
    if (a) {
      a.volume = nextMuted ? 0 : state.volume / 100
    }
    emit()
  },
}

export function useRadioPlayer() {
  const snapshot = useSyncExternalStore(
    radioPlayer.subscribe,
    radioPlayer.getState,
    radioPlayer.getState
  )
  return {
    ...snapshot,
    currentStation: RADIO_STATIONS[snapshot.stationIndex],
    togglePlay: () => radioPlayer.togglePlay(),
    selectStation: (index: number) => radioPlayer.setStation(index),
    nextStation: () => radioPlayer.nextStation(),
    setVolume: (vol: number) => radioPlayer.setVolume(vol),
    toggleMute: () => radioPlayer.toggleMute(),
  }
}
