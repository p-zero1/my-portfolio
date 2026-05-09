export const contact = {
  // The two-line heading in the contact section
  heading: {
    line1: "Let's build",
    line2: 'something real.',  // rendered with gradient styling
  },

  // The paragraph below the heading
  description: 'Open to backend engineering roles, system design conversations, and interesting ideas at scale.',

  // Terminal window details
  terminalFile: 'contacts.sh',
  prompt: 'prasad@systems:~$',

  // Contact links — each becomes a terminal command line
  // cmd: the command word shown (e.g. "send-mail", "open-profile")
  links: [
    {
      label: 'phone',
      value: '+91-8669791305',
      href: 'tel:+918669791305',
      cmd: 'call',
    },
    {
      label: 'email',
      value: 'prasadgundawar2002@gmail.com',
      href: 'mailto:prasadgundawar2002@gmail.com',
      cmd: 'send-mail',
    },
    {
      label: 'github',
      value: 'github.com/p-zero1',
      href: 'https://github.com/p-zero1',
      cmd: 'open-profile',
    },
    {
      label: 'linkedin',
      value: 'linkedin.com/in/prasad-gundawar',
      href: 'https://www.linkedin.com/in/prasad-gundawar',
      cmd: 'connect',
    },
    {
      label: 'leetcode',
      value: 'leetcode.com/u/user2718j',
      href: 'https://leetcode.com/u/user2718j/',
      cmd: 'view-profile',
    },
  ],

  // Resume download entry
  resume: {
    filename: 'resume.pdf',  // must match filename in /public
    displaySize: '2.4KB',                     // shown on hover, update if file changes
  },

  // Footer text at the very bottom of the page
  footer: {
    name: 'PRASAD GUNDAWAR',
    role: 'BACKEND ENGINEER',
    location: 'PUNE, INDIA',
    year: '2026',
  },
}
