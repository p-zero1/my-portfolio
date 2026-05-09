import type { BootLine } from '@/lib/types'

export const hero = {
  // The command that types out character by character in the terminal
  command: '$ init prasad.gundawar --env=production --build=backend-systems',

  // The title bar of the terminal window
  terminalTitle: 'prasad.gundawar — bash — 80×24',

  // Lines that appear after the command finishes typing.
  // 'delay' is milliseconds from page load. Keep gaps of ~250ms between lines.
  // Types: success (✓ green) | info (⚡ purple) | separator (blank gap) | name (huge) | role | tagline
  bootLines: [
    { type: 'success',   text: '✓  identity module loaded',                                       delay: 2400 },
    { type: 'success',   text: '✓  25+ enterprise services modernized',                           delay: 2650 },
    { type: 'success',   text: '✓  distributed architecture runtime: online',                     delay: 2880 },
    { type: 'success',   text: '✓  barclays — optimized 15+ APIs for enterprise systems',          delay: 3100 },
    { type: 'info',      text: '⚡  backend core: fully operational',                             delay: 3400 },
    { type: 'separator', text: '',                                                                  delay: 3700 },
    { type: 'name',      text: 'PRASAD GUNDAWAR',                                                  delay: 4100 },
    { type: 'role',      text: 'Backend Engineer & Systems Builder',                               delay: 4500 },
    { type: 'tagline',   text: 'Building scalable systems that power modern digital experiences.', delay: 4850 },
  ] as BootLine[],
}
