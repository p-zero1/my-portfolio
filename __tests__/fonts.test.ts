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

  it('imports Syne for display headings', () => {
    expect(layout).toMatch(/import.*Syne.*from 'next\/font\/google'/)
  })

  it('imports DM_Sans for body text', () => {
    expect(layout).toMatch(/import.*DM_Sans.*from 'next\/font\/google'/)
  })

  it('imports Fira_Code for monospace text', () => {
    expect(layout).toMatch(/import.*Fira_Code.*from 'next\/font\/google'/)
  })

  it('uses unique variable name --font-syne (no circular reference)', () => {
    expect(layout).toMatch(/variable:\s*'--font-syne'/)
  })

  it('uses unique variable name --font-dm (no circular reference)', () => {
    expect(layout).toMatch(/variable:\s*'--font-dm'/)
  })

  it('uses unique variable name --font-fira (no circular reference)', () => {
    expect(layout).toMatch(/variable:\s*'--font-fira'/)
  })

  it('applies all font variables to <html> element', () => {
    expect(layout).toMatch(/syne\.variable/)
    expect(layout).toMatch(/dmSans\.variable/)
    expect(layout).toMatch(/firaCode\.variable/)
  })
})

// ─── globals.css: font variable definitions ───────────────────────────────────

describe('globals.css — font variables', () => {
  const css = read('app/globals.css')

  it('maps --font-display to --font-syne (no circular ref)', () => {
    expect(css).toMatch(/--font-display:\s*var\(--font-syne\)/)
  })

  it('maps --font-sans to --font-dm (no circular ref)', () => {
    expect(css).toMatch(/--font-sans:\s*var\(--font-dm\)/)
  })

  it('maps --font-mono to --font-fira (no circular ref)', () => {
    expect(css).toMatch(/--font-mono:\s*var\(--font-fira\)/)
  })

  it('body uses DM Sans (--font-dm)', () => {
    expect(css).toMatch(/font-family:\s*var\(--font-dm\)/)
  })

  it('h1-h4 use Syne (--font-syne)', () => {
    expect(css).toMatch(/h1,\s*h2,\s*h3,\s*h4/)
    expect(css).toMatch(/font-family:\s*var\(--font-syne\)/)
  })

  it('defines .font-display utility using --font-syne', () => {
    expect(css).toMatch(/\.font-display[\s\S]*?font-family:\s*var\(--font-syne\)/)
  })

  it('defines .font-mono utility using --font-fira', () => {
    expect(css).toMatch(/\.font-mono[\s\S]*?font-family:\s*var\(--font-fira\)/)
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

  it('globals.css does not reference Chakra Petch', () => {
    const css = read('app/globals.css')
    expect(css).not.toMatch(/Chakra/i)
  })

  it('globals.css does not reference Oxanium', () => {
    const css = read('app/globals.css')
    expect(css).not.toMatch(/Oxanium/i)
  })
})
