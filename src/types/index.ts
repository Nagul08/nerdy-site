export interface Project {
  id: string
  name: string
  folder: string
  tagline: string
  description: string
  tech: string[]
  category: 'web' | 'systems' | 'ai' | 'tools'
  githubUrl: string
  liveUrl?: string
  stars: number
  commits: number
  featured?: boolean
  stats: {
    language: string
    linesOfCode: string
    version: string
  }
}

export interface SkillCategory {
  name: string
  command: string
  skills: {
    name: string
    progressBlocks: string
    percentage: number
    level: 'familiar with' | 'working with' | 'currently learning'
    highlightTech: string
    color: string
  }[]
}

export interface GitCommit {
  hash: string
  message: string
  author: string
  date: string
  branch: string
  changes: {
    added: number
    removed: number
  }
  diffSnippet: string
}

export interface AudioTrack {
  id: string
  title: string
  artist: string
  album: string
  duration: number // in seconds
  bpm: number
  genre: string
}

export interface TerminalCommandOutput {
  id: string
  command: string
  output: string | React.ReactNode
  isError?: boolean
  timestamp: string
}

export type ThemeName = 'sunset' | 'dusk' | 'crimson' | 'noir'
