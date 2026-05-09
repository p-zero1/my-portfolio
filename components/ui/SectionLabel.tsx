import { cn } from '@/lib/utils'

interface Props {
  index: string
  label: string
  className?: string
}

export default function SectionLabel({ index, label, className }: Props) {
  return (
    <div className={cn('flex items-center gap-3 mb-12', className)}>
      <span className="font-mono text-xs text-text-3 tabular-nums">{index}</span>
      <div className="w-6 h-px bg-purple/40" />
      <span className="font-mono text-xs tracking-widest text-text-3 uppercase">{label}</span>
    </div>
  )
}
