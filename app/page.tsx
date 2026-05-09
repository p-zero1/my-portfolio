import BootSequence from '@/components/sections/BootSequence'
import CorePresence from '@/components/sections/CorePresence'
import PhilosophyField from '@/components/sections/PhilosophyField'
import ArchitectureView from '@/components/sections/ArchitectureView'
import TerminalExplorer from '@/components/sections/TerminalExplorer'
import SignalGraph from '@/components/sections/SignalGraph'
import EOFSection from '@/components/sections/EOFSection'

export default function Home() {
  return (
    <main>
      <BootSequence />
      <CorePresence />
      <PhilosophyField />
      <ArchitectureView />
      <TerminalExplorer />
      <SignalGraph />
      <EOFSection />
    </main>
  )
}
