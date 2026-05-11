/**
 * Font & Styling Tests
 * These tests verify that the correct fonts are configured and
 * applied across the portfolio. They check source files directly —
 * no browser rendering needed.
 */

import fs from 'fs'
import path from 'path'

const root = path.join(__dirname, '..')
const read = (p: string) => fs.readFileSync(path.join(root, p), 'utf-8')

// ─── Layout: next/font imports ────────────────────────────────────────────────

describe('layout.tsx — font imports', () => {
  const layout = read('app/layout.tsx')

  it('imports Outfit for display headings', () => {
    expect(layout).toMatch(/import.*Outfit.*from 'next\/font\/google'/)
  })

  it('imports Plus_Jakarta_Sans for body text', () => {
    expect(layout).toMatch(/import.*Plus_Jakarta_Sans.*from 'next\/font\/google'/)
  })

  it('imports JetBrains_Mono for monospace text', () => {
    expect(layout).toMatch(/import.*JetBrains_Mono.*from 'next\/font\/google'/)
  })

  it('uses unique variable name --font-outfit (no circular reference)', () => {
    expect(layout).toMatch(/variable:\s*'--font-outfit'/)
  })

  it('uses unique variable name --font-jakarta (no circular reference)', () => {
    expect(layout).toMatch(/variable:\s*'--font-jakarta'/)
  })

  it('uses unique variable name --font-jetbrains (no circular reference)', () => {
    expect(layout).toMatch(/variable:\s*'--font-jetbrains'/)
  })

  it('applies all font variables to <html> element', () => {
    expect(layout).toMatch(/outfit\.variable/)
    expect(layout).toMatch(/jakarta\.variable/)
    expect(layout).toMatch(/jetbrains\.variable/)
  })
})

// ─── globals.css: font variable definitions ───────────────────────────────────

describe('globals.css — font variables', () => {
  const css = read('app/globals.css')

  it('maps --font-display to --font-outfit (no circular ref)', () => {
    expect(css).toMatch(/--font-display:\s*var\(--font-outfit\)/)
  })

  it('maps --font-sans to --font-jakarta (no circular ref)', () => {
    expect(css).toMatch(/--font-sans:\s*var\(--font-jakarta\)/)
  })

  it('maps --font-mono to --font-jetbrains (no circular ref)', () => {
    expect(css).toMatch(/--font-mono:\s*var\(--font-jetbrains\)/)
  })

  it('body uses Plus Jakarta Sans (--font-jakarta)', () => {
    expect(css).toMatch(/font-family:\s*var\(--font-jakarta\)/)
  })

  it('h1-h4 use Outfit (--font-outfit)', () => {
    expect(css).toMatch(/h1,\s*h2,\s*h3,\s*h4/)
    expect(css).toMatch(/font-family:\s*var\(--font-outfit\)/)
  })

  it('defines .font-display utility using --font-outfit', () => {
    expect(css).toMatch(/\.font-display[\s\S]*?font-family:\s*var\(--font-outfit\)/)
  })

  it('defines .font-mono utility using --font-jetbrains', () => {
    expect(css).toMatch(/\.font-mono[\s\S]*?font-family:\s*var\(--font-jetbrains\)/)
  })

  it('does NOT have circular self-references like var(--font-sans): var(--font-sans)', () => {
    expect(css).not.toMatch(/--font-sans:\s*var\(--font-sans\)/)
    expect(css).not.toMatch(/--font-display:\s*var\(--font-display\)/)
    expect(css).not.toMatch(/--font-mono:\s*var\(--font-mono\)/)
  })
})

// ─── Section components: font-display on headings ─────────────────────────────

describe('section components — font-display on headings', () => {
  const components = [
    'components/sections/PhilosophyField.tsx',
    'components/sections/ArchitectureView.tsx',
    'components/sections/SignalGraph.tsx',
    'components/sections/TerminalExplorer.tsx',
    'components/sections/EOFSection.tsx',
    'components/sections/CorePresence.tsx',
  ]

  components.forEach(file => {
    it(`${file.split('/').pop()} applies font-display to heading`, () => {
      const source = read(file)
      expect(source).toMatch(/font-display/)
    })
  })
})

// ─── Section components: font-sans on body descriptions ──────────────────────

describe('section components — font-sans on descriptions', () => {
  const components = [
    'components/sections/PhilosophyField.tsx',
    'components/sections/ArchitectureView.tsx',
    'components/sections/SignalGraph.tsx',
    'components/sections/TerminalExplorer.tsx',
    'components/sections/EOFSection.tsx',
    'components/sections/CorePresence.tsx',
  ]

  components.forEach(file => {
    it(`${file.split('/').pop()} applies font-sans to description text`, () => {
      const source = read(file)
      expect(source).toMatch(/font-sans/)
    })
  })
})

// ─── No old/stale font references ─────────────────────────────────────────────

describe('no stale font references', () => {
  it('globals.css does not reference Geist font', () => {
    const css = read('app/globals.css')
    expect(css).not.toMatch(/geist/i)
  })

  it('layout.tsx does not import Geist', () => {
    const layout = read('app/layout.tsx')
    expect(layout).not.toMatch(/Geist/i)
  })

  it('globals.css does not reference old Syne font variable', () => {
    const css = read('app/globals.css')
    expect(css).not.toMatch(/--font-syne/)
  })

  it('globals.css does not reference old DM Sans variable', () => {
    const css = read('app/globals.css')
    expect(css).not.toMatch(/--font-dm[^-]/)
  })

  it('globals.css does not reference old Fira Code variable', () => {
    const css = read('app/globals.css')
    expect(css).not.toMatch(/--font-fira/)
  })
})
