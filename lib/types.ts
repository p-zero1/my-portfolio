export type BootLineType = 'success' | 'info' | 'warning' | 'separator' | 'name' | 'role' | 'tagline'

export interface BootLine {
  type: BootLineType
  text: string
  delay: number
}

export interface ExperienceEntry {
  company: string
  role: string
  period: string
  location: string
  tagline: string
  impact: { metric: string; label: string }[]
  systems: string[]
  stack: string[]
  highlights: string[]
  showArchDiagram?: boolean
}

export interface PhilosophyPrinciple {
  id: string
  title: string
  body: string
  icon: string
}

export interface LabProject {
  slug: string
  name: string
  type: 'dir' | 'file'
  description: string
  longDescription?: string
  tech: string[]
  status: 'active' | 'archived' | 'idea' | 'building'
  date: string
  url?: string
  github?: string
}

export interface ExploringTopic {
  name: string
  weight: number
  category: 'architecture' | 'engineering' | 'ai' | 'tools' | 'exploration' | 'frontend'
  description?: string
}
