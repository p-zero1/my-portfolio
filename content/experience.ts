import type { ExperienceEntry } from '@/lib/types'

export const experiences: ExperienceEntry[] = [
  {
    company: 'Barclays',
    role: 'Software Engineer',
    period: 'Jul 2024 — Present',
    location: 'Pune, India',
    tagline: 'Enterprise-scale backend modernization — microservices, performance optimization, and production reliability at scale.',
    impact: [
      { metric: '25+',  label: 'Services Modernized' },
      { metric: '60%',  label: 'Response Time Reduction' },
      { metric: '35%',  label: 'Processing Efficiency Gain' },
      { metric: '50%',  label: 'Fewer Production Failures' },
    ],
    systems: [
      'Microservices Architecture',
      'Async Processing (Kafka)',
      'Region-based Routing',
      'REST API Optimization',
      'Legacy Modernization',
      'Production Reliability',
    ],
    stack: ['Java', 'Spring Boot', 'Spring MVC', 'Spring JPA', 'Apache Kafka', 'REST APIs', 'MySQL', 'Oracle', 'JUnit 5', 'Mockito'],
    highlights: [
      'Modernized 4+ legacy applications (25+ services) to latest Java & Spring Boot — 40% stability gain, 30% less maintenance',
      'Replaced third-party platform with custom Spring Boot microservice — improved request processing efficiency by 35%',
      'Integrated 10+ microservices via RESTful APIs — scaled transaction throughput by 20% with zero infra cost',
      'Implemented region-based routing and async processing — 60% faster response time, 2× throughput, $200K+ revenue impact',
      'Resolved 15+ high-severity production incidents — reduced recurring failures by 50%',
      'Refactored 15+ APIs with modular architecture — 40% less debugging effort, 25% faster release velocity',
    ],
    showArchDiagram: true,
  },

  {
    company: 'Barclays',
    role: 'Software Engineer Intern',
    period: 'Jun 2023 — Aug 2023',
    location: 'Pune, India',
    tagline: 'CI/CD automation and database optimization during internship at Barclays Pune.',
    impact: [
      { metric: '20+',  label: 'Builds/Week Automated' },
      { metric: '40%',  label: 'Query Performance Gain' },
      { metric: '30%',  label: 'Faster Deployment Cycles' },
      { metric: '20%',  label: 'System Uptime Increase' },
    ],
    systems: [
      'CI/CD Automation',
      'Windows Service (.NET)',
      'Database Optimization',
      'MS SQL Indexing',
      'Data Processing Workflows',
    ],
    stack: ['C#', '.NET', 'MS SQL', 'Jenkins', 'SQL'],
    highlights: [
      'Built a Windows service in C# and .NET to replace Jenkins pipelines — automated CI/CD supporting 20+ builds/week',
      'Designed and optimized MS SQL schemas and indexing strategies — improved query performance by 40%',
      'Streamlined data-processing workflows — reduced deployment cycle time by 30% and increased uptime by 20%',
    ],
    showArchDiagram: false,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ADD YOUR NEXT EXPERIENCE HERE — copy a block above and fill in details.
  // Set showArchDiagram: true to show an architecture diagram on the right.
  // ─────────────────────────────────────────────────────────────────────────
]
