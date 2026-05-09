import type { PhilosophyPrinciple } from '@/lib/types'

export const principles: PhilosophyPrinciple[] = [
  {
    id: '01',
    title: 'Systems over features',
    body: 'The best engineering is invisible. I build the foundation so the feature never has to think about it.',
    icon: '⬡',
  },
  {
    id: '02',
    title: 'Scale is a first-class concern',
    body: 'Code that works at 1 RPS rarely survives 10,000. I design for tomorrow from the first commit.',
    icon: '◈',
  },
  {
    id: '03',
    title: 'Reliability is the product',
    body: 'Users never notice the system when it works perfectly. That invisibility is the entire goal.',
    icon: '◎',
  },
  {
    id: '04',
    title: 'Optimize the critical path',
    body: 'Not all code is equal. Finding the bottleneck and eliminating it — that is real engineering.',
    icon: '⟶',
  },
]
