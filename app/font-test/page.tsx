/**
 * Visual font test page — visit /font-test in dev to verify all fonts are loading.
 * This page is only for development verification, not part of the portfolio.
 */
export default function FontTestPage() {
  return (
    <div className="min-h-screen bg-base text-text-1 p-12 space-y-16">

      {/* Header */}
      <div className="border-b border-white/10 pb-8">
        <p className="font-mono text-xs text-terminal mb-2">$ font-test --verify-all</p>
        <h1 className="font-display text-5xl font-bold text-text-1">Font System Verification</h1>
        <p className="font-sans text-text-3 mt-2">All three fonts should look visually distinct below.</p>
      </div>

      {/* Display Font — Syne */}
      <section className="space-y-4">
        <p className="font-mono text-xs text-terminal tracking-widest uppercase">01 / Display Font — Syne</p>
        <div className="glass-1 rounded-2xl p-8 space-y-3">
          <h2 className="font-display text-7xl font-extrabold text-text-1 tracking-[0.01em]">PRASAD GUNDAWAR</h2>
          <h3 className="font-display text-4xl font-bold gradient-text">Backend Engineer</h3>
          <p className="font-display text-2xl font-medium text-text-2">Engineering philosophy</p>
          <p className="font-display text-xl font-semibold text-text-3">Projects & Explorations</p>
          <p className="font-display text-base font-normal text-text-4">Section heading — base weight</p>
        </div>
      </section>

      {/* Body Font — DM Sans */}
      <section className="space-y-4">
        <p className="font-mono text-xs text-terminal tracking-widest uppercase">02 / Body Font — DM Sans</p>
        <div className="glass-1 rounded-2xl p-8 space-y-3">
          <p className="font-sans text-xl font-light text-text-2">
            Backend Software Engineer with experience building scalable distributed systems using Java and Spring Boot.
          </p>
          <p className="font-sans text-base text-text-3 leading-relaxed">
            Skilled in designing microservices architectures, developing high-performance REST APIs, and optimizing backend services for enterprise platforms.
          </p>
          <p className="font-sans text-sm text-text-4">
            Open to backend engineering roles, system design conversations, and interesting ideas at scale.
          </p>
          <div className="flex gap-4 pt-2">
            {['font-light', 'font-normal', 'font-medium', 'font-semibold', 'font-bold'].map(w => (
              <span key={w} className={`font-sans text-sm text-text-2 ${w}`}>{w}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Mono Font — Fira Code */}
      <section className="space-y-4">
        <p className="font-mono text-xs text-terminal tracking-widest uppercase">03 / Mono Font — Fira Code</p>
        <div className="glass-1 rounded-2xl p-8 space-y-3">
          <p className="font-mono text-base text-terminal">$ init prasad.gundawar --env=production --build=backend-systems</p>
          <p className="font-mono text-sm text-text-2">✓  identity module loaded</p>
          <p className="font-mono text-sm text-purple-light">⚡  backend core: fully operational</p>
          <p className="font-mono text-xs text-text-4">thinking_model  =  "systems-first"</p>
          {/* Ligature test */}
          <p className="font-mono text-sm text-text-3">
            Ligature test: {'->'} {'-->'} {'!='} {'==='} {'>='} {'<='} {'=>'} {'::'}
          </p>
        </div>
      </section>

      {/* Contrast Check */}
      <section className="space-y-4">
        <p className="font-mono text-xs text-terminal tracking-widest uppercase">04 / All Three Together</p>
        <div className="glass-2 rounded-2xl p-8">
          <h2 className="font-display text-4xl font-bold text-text-1 mb-2">I build the systems</h2>
          <p className="font-sans text-lg text-text-2 font-light mb-6">people never see. The infrastructure that makes everything else possible.</p>
          <p className="font-mono text-xs text-terminal">$ status: AVAILABLE · location: "Pune, India"</p>
        </div>
      </section>

      {/* CSS Variable Check */}
      <section className="space-y-4">
        <p className="font-mono text-xs text-terminal tracking-widest uppercase">05 / CSS Variable Status</p>
        <div className="glass-1 rounded-2xl p-8 font-mono text-xs space-y-2">
          <p className="text-text-4">// Check browser DevTools → Elements → html → Computed → --font-syne, --font-dm, --font-fira</p>
          <p className="text-terminal">--font-syne  <span className="text-text-3">→ should show Syne font stack</span></p>
          <p className="text-terminal">--font-dm    <span className="text-text-3">→ should show DM Sans font stack</span></p>
          <p className="text-terminal">--font-fira  <span className="text-text-3">→ should show Fira Code font stack</span></p>
        </div>
      </section>

    </div>
  )
}
