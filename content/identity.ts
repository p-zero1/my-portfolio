export const identity = {
  // The three large statements on the left side of the "Core" section
  statements: [
    'I build the systems people never see.',
    'The infrastructure that makes everything else possible.',
    'Backend, by choice — because the foundation matters more than the facade.',
  ],

  // The config panel on the right — rendered as key = "value" pairs
  config: [
    { key: 'thinking_model',    value: 'systems-first' },
    { key: 'default_approach',  value: 'design-for-scale' },
    { key: 'engineering_style', value: 'calm-under-complexity' },
    { key: 'current_focus',     value: 'distributed-systems' },
  ],

  // The filename shown in the config panel header
  configFile: '~/engineer.config',

  // Location and availability shown at the bottom of the config panel
  location: 'Pune, India',
  availability: 'AVAILABLE',  // Change to "EMPLOYED" or "OPEN TO WORK" etc.

  // The quote shown below the config panel
  quote: "Scalable systems aren't built by accident. They're the result of deliberate thinking about failure modes before they happen.",
}
