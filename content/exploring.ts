import type { ExploringTopic } from '@/lib/types'

export const exploring: ExploringTopic[] = [
  { name: 'Distributed Systems', weight: 5, category: 'architecture', description: 'Consensus algorithms, eventual consistency, partition tolerance' },
  { name: 'Event-Driven Architecture', weight: 4, category: 'architecture', description: 'CQRS, event sourcing, outbox pattern' },
  { name: 'System Design', weight: 5, category: 'architecture', description: 'Designing for scale, reliability, and operational simplicity' },
  { name: 'AI-Assisted Backends', weight: 4, category: 'ai', description: 'LLM integration patterns, RAG pipelines, vector databases' },
  { name: 'Performance Optimization', weight: 4, category: 'engineering', description: 'JVM tuning, query optimization, profiling' },
  { name: 'Redis Internals', weight: 3, category: 'engineering', description: 'Data structures, persistence, cluster mode' },
  { name: 'Kafka Patterns', weight: 3, category: 'architecture', description: 'Stream processing, consumer groups, exactly-once' },
  { name: 'Developer Tooling', weight: 3, category: 'tools', description: 'Building tools that improve engineering productivity' },
  { name: 'Go Language', weight: 2, category: 'engineering', description: 'Concurrency primitives, high-performance services' },
  { name: 'Startup Ideas', weight: 2, category: 'exploration', description: 'Developer tools and infrastructure products' },
]
