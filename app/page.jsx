'use client'

import { useEffect, useState } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [user, setUser] = useState(undefined)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then(({ user }) => setUser(user ?? null))
      .catch(() => setUser(null))
  }, [])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --black: #000000;
          --near-black: #030303;
          --surface: #080808;
          --card: #0a0a0a;
          --border: rgba(255,255,255,0.07);
          --border-dim: rgba(255,255,255,0.04);
          --btn-bg: #0a1628;
          --btn-border: #0f2040;
          --btn-hover: #0d1e38;
          --white: #ffffff;
          --off-white: #e2e8f0;
          --grey: #4a5568;
          --grey-mid: #64748b;
          --grey-light: #94a3b8;
        }
        html { scroll-behavior: smooth; }
        body {
          background: var(--black);
          color: var(--white);
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 15px;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        nav {
          position: fixed;
          inset: 0 0 auto 0;
          z-index: 50;
          height: 60px;
          display: flex;
          align-items: center;
          padding: 0 40px;
          background: transparent;
          transition: background 0.3s, border-color 0.3s;
          border-bottom: 1px solid transparent;
        }
        nav.scrolled {
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom-color: var(--border-dim);
        }
        .nav-wrap { width: 100%; max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
        .nav-brand { display: flex; align-items: center; gap: 9px; text-decoration: none; }
        .nav-brand img { width: 26px; height: 26px; object-fit: contain; }
        .nav-brand-name { font-size: 15px; font-weight: 600; color: var(--white); letter-spacing: -0.02em; }
        .nav-center { position: absolute; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 32px; }
        .nav-center a { font-size: 13px; font-weight: 400; color: var(--grey-mid); text-decoration: none; transition: color 0.15s; }
        .nav-center a:hover { color: var(--off-white); }
        .nav-right { display: flex; align-items: center; gap: 8px; }
        .nav-text-link { font-size: 13px; font-weight: 400; color: var(--grey-mid); text-decoration: none; padding: 6px 12px; border-radius: 6px; transition: color 0.15s, background 0.15s; }
        .nav-text-link:hover { color: var(--off-white); background: rgba(255,255,255,0.04); }
        .nav-avatar { width: 28px; height: 28px; border-radius: 50%; object-fit: cover; border: 1px solid var(--border); cursor: pointer; }
        .nav-btn { font-size: 13px; font-weight: 500; color: var(--off-white); text-decoration: none; padding: 7px 15px; border-radius: 7px; background: var(--btn-bg); border: 1px solid var(--btn-border); transition: background 0.15s, border-color 0.15s; }
        .nav-btn:hover { background: var(--btn-hover); border-color: #152d4f; }
        .hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 130px 24px 110px; }
        .hero-content { max-width: 740px; }
        .hero h1 { font-size: clamp(44px, 7.5vw, 76px); font-weight: 700; line-height: 1.04; letter-spacing: -0.04em; color: var(--white); margin-bottom: 24px; }
        .hero h1 .dim { color: var(--grey-mid); font-weight: 300; }
        .hero-sub { font-size: 16px; font-weight: 300; color: var(--grey-mid); max-width: 420px; margin: 0 auto 52px; line-height: 1.75; letter-spacing: -0.005em; }
        .hero-actions { display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap; }
        .btn-dark { display: inline-flex; align-items: center; gap: 8px; padding: 12px 22px; background: var(--btn-bg); border: 1px solid var(--btn-border); border-radius: 8px; font-size: 14px; font-weight: 500; color: var(--off-white); text-decoration: none; transition: background 0.15s, border-color 0.15s, transform 0.1s; letter-spacing: -0.01em; }
        .btn-dark:hover { background: var(--btn-hover); border-color: #152d4f; transform: translateY(-1px); }
        .btn-ghost { display: inline-flex; align-items: center; gap: 8px; padding: 12px 22px; background: transparent; border: 1px solid var(--border-dim); border-radius: 8px; font-size: 14px; font-weight: 400; color: var(--grey-mid); text-decoration: none; transition: border-color 0.15s, color 0.15s, transform 0.1s; letter-spacing: -0.01em; }
        .btn-ghost:hover { border-color: var(--border); color: var(--off-white); transform: translateY(-1px); }
        .rule { width: 100%; height: 1px; background: var(--border-dim); }
        .section { padding: 88px 24px; }
        .wrap { max-width: 1100px; margin: 0 auto; }
        .label { font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--grey); margin-bottom: 20px; }
        .heading { font-size: clamp(24px, 3.2vw, 36px); font-weight: 700; letter-spacing: -0.03em; line-height: 1.1; color: var(--white); margin-bottom: 12px; }
        .body-text { font-size: 14px; font-weight: 300; color: var(--grey-mid); line-height: 1.75; max-width: 400px; }
        .module-header { margin-bottom: 48px; }
        .module-grid { display: grid; grid-template-columns: repeat(3, 1fr); border: 1px solid var(--border-dim); border-radius: 12px; overflow: hidden; }
        .module { padding: 32px 28px; border-right: 1px solid var(--border-dim); border-bottom: 1px solid var(--border-dim); transition: background 0.15s; }
        .module:nth-child(3n) { border-right: none; }
        .module:nth-child(4), .module:nth-child(5), .module:nth-child(6) { border-bottom: none; }
        .module:hover { background: var(--surface); }
        .module-name { font-size: 13px; font-weight: 600; color: var(--off-white); margin-bottom: 8px; letter-spacing: -0.01em; }
        .module-desc { font-size: 12px; font-weight: 300; color: var(--grey); line-height: 1.65; }
        .module-tag { display: inline-block; font-size: 9px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--grey); border: 1px solid var(--border-dim); border-radius: 4px; padding: 2px 7px; margin-bottom: 16px; }
        .split-wrap { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: start; }
        .check-list { list-style: none; margin-top: 28px; display: flex; flex-direction: column; gap: 10px; }
        .check-list li { font-size: 13px; font-weight: 300; color: var(--grey-mid); display: flex; align-items: center; gap: 10px; }
        .check-list li::before { content: ''; flex-shrink: 0; width: 14px; height: 14px; border-radius: 50%; border: 1px solid var(--border); background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10' fill='none' stroke='%2364748b' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='2,5 4.5,7.5 9,2.5'/%3E%3C/svg%3E"); background-size: 8px; background-repeat: no-repeat; background-position: center; }
        .terminal { background: var(--near-black); border: 1px solid var(--border-dim); border-radius: 10px; overflow: hidden; font-family: 'SF Mono', 'Fira Code', monospace; }
        .term-bar { display: flex; align-items: center; gap: 6px; padding: 11px 14px; border-bottom: 1px solid var(--border-dim); }
        .term-dot { width: 9px; height: 9px; border-radius: 50%; }
        .term-dot.r { background: #3d1515; } .term-dot.y { background: #2d2510; } .term-dot.g { background: #0f2010; }
        .term-label { margin-left: 6px; font-size: 10px; color: var(--grey); font-family: 'Inter', sans-serif; letter-spacing: 0.02em; }
        .term-body { padding: 16px 14px; display: flex; flex-direction: column; }
        .trow { display: grid; grid-template-columns: 48px 62px 1fr; gap: 10px; align-items: baseline; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.025); }
        .trow:last-child { border-bottom: none; }
        .trow-ts { font-size: 9px; color: var(--grey); letter-spacing: 0.02em; }
        .trow-tag { font-size: 9px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; padding: 2px 7px; border-radius: 3px; text-align: center; }
        .trow-tag.b { background: rgba(153,27,27,0.2); color: #7f1d1d; border: 1px solid rgba(153,27,27,0.15); }
        .trow-tag.w { background: rgba(120,100,20,0.2); color: #78350f; border: 1px solid rgba(120,100,20,0.15); }
        .trow-tag.o { background: rgba(20,50,30,0.3); color: #166534; border: 1px solid rgba(20,50,30,0.2); }
        .trow-msg { font-size: 10px; color: var(--grey); line-height: 1.5; font-family: 'Inter', sans-serif; font-weight: 300; }
        .cta { padding: 0 24px 100px; }
        .cta-wrap { max-width: 1100px; margin: 0 auto; border: 1px solid var(--border-dim); border-radius: 12px; padding: 72px 56px; text-align: center; }
        .cta-wrap h2 { font-size: clamp(26px, 3.8vw, 42px); font-weight: 700; letter-spacing: -0.035em; line-height: 1.1; margin-bottom: 12px; }
        .cta-wrap p { font-size: 14px; font-weight: 300; color: var(--grey-mid); margin-bottom: 36px; }
        .cta-actions { display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap; }
        footer { border-top: 1px solid var(--border-dim); padding: 32px 24px; }
        .footer-wrap { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
        .footer-brand { display: flex; align-items: center; gap: 8px; text-decoration: none; }
        .footer-brand img { width: 18px; height: 18px; object-fit: contain; opacity: 0.3; }
        .footer-brand-name { font-size: 13px; font-weight: 500; color: var(--grey); }
        .footer-links { display: flex; gap: 22px; list-style: none; }
        .footer-links a { font-size: 12px; color: var(--grey); text-decoration: none; transition: color 0.15s; }
        .footer-links a:hover { color: var(--grey-light); }
        .footer-copy { font-size: 11px; color: var(--grey); opacity: 0.5; }
        @media (max-width: 860px) {
          nav { padding: 0 20px; }
          .nav-center { display: none; }
          .module-grid { grid-template-columns: 1fr; }
          .module { border-right: none; }
          .module:nth-child(n) { border-bottom: 1px solid var(--border-dim); }
          .module:last-child { border-bottom: none; }
          .split-wrap { grid-template-columns: 1fr; gap: 48px; }
          .cta-wrap { padding: 48px 24px; }
          .footer-wrap { flex-direction: column; gap: 20px; text-align: center; }
        }
        @media (max-width: 500px) {
          .hero-actions { flex-direction: column; width: 100%; }
          .btn-dark, .btn-ghost { width: 100%; justify-content: center; }
          .cta-actions { flex-direction: column; width: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { transition: none !important; }
        }
      `}</style>

      <nav className={scrolled ? 'scrolled' : ''}>
        <div className="nav-wrap">
          <a className="nav-brand" href="/">
            <img src="/vertex.png" alt="Vertex" />
            <span className="nav-brand-name">Vertex</span>
          </a>
          <div className="nav-center">
            <a href="#modules">Modules</a>
            <a href="#protection">Protection</a>
            <a href="#">Docs</a>
            <a href="https://discord.gg/vte" target="_blank" rel="noopener noreferrer">Support</a>
          </div>
          <div className="nav-right">
            {user === undefined ? null : user ? (
              <>
                <a href="/api/auth/logout" className="nav-text-link">Logout</a>
                <img
                  src={user.avatar_url}
                  alt={user.global_name || user.username}
                  title={user.global_name || user.username}
                  className="nav-avatar"
                />
              </>
            ) : (
              <>
                <a href="/api/auth/login" className="nav-text-link">Login</a>
                <a href="#" className="nav-btn">Add to Server</a>
              </>
            )}
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1>Moderation infrastructure<br /><span className="dim">for servers that operate.</span></h1>
          <p className="hero-sub">Vertex runs antinuke, antiraid, and threat interception modules independently — built to hold when your server is under attack.</p>
          <div className="hero-actions">
            <a href="#" className="btn-dark">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.057a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
              Add to Server
            </a>
            <a href="#modules" className="btn-ghost">View modules</a>
          </div>
        </div>
      </section>

      <div className="rule"></div>

      <section className="section" id="modules">
        <div className="wrap">
          <div className="module-header">
            <div className="label">Modules</div>
            <h2 className="heading">Six independent systems.<br />Zero shared failure points.</h2>
            <p className="body-text">Each module runs its own event pipeline. One going down does not affect the others.</p>
          </div>
          <div className="module-grid">
            <div className="module">
              <div className="module-tag">core</div>
              <div className="module-name">Antinuke</div>
              <div className="module-desc">Intercepts mass bans, channel deletions, role wipes, and permission escalations the moment they fire. No delay, no polling.</div>
            </div>
            <div className="module">
              <div className="module-tag">core</div>
              <div className="module-name">Antiraid</div>
              <div className="module-desc">Monitors join velocity, account age, and behavioral patterns. Triggers verification gates and server lockdown on threshold breach.</div>
            </div>
            <div className="module">
              <div className="module-tag">core</div>
              <div className="module-name">Permission Control</div>
              <div className="module-desc">Zero-trust defaults with explicit whitelisting for trusted operators. Unauthorized privilege escalation is blocked at the event level.</div>
            </div>
            <div className="module">
              <div className="module-tag">detection</div>
              <div className="module-name">Threat Detection</div>
              <div className="module-desc">Cross-event behavioral analysis. Surfaces anomalous actors to your moderation team before an action completes.</div>
            </div>
            <div className="module">
              <div className="module-tag">moderation</div>
              <div className="module-name">Moderation Suite</div>
              <div className="module-desc">Tempbans, timeouts, role management, purge, and persistent case logs with paginated modlog history across your team.</div>
            </div>
            <div className="module">
              <div className="module-tag">logging</div>
              <div className="module-name">Audit Logging</div>
              <div className="module-desc">Immutable event records across every action taken — by users, bots, and Vertex itself — with full actor and target attribution.</div>
            </div>
          </div>
        </div>
      </section>

      <div className="rule"></div>

      <section className="section" id="protection">
        <div className="split-wrap">
          <div>
            <div className="label">Active Defense</div>
            <h2 className="heading">Interception happens<br />at the event layer.</h2>
            <p className="body-text">Vertex does not poll for changes. It listens to gateway events and evaluates every destructive action the moment the intent is registered — before execution reaches your server state.</p>
            <ul className="check-list">
              <li>Mass ban and kick interception</li>
              <li>Channel and role deletion prevention</li>
              <li>Webhook creation and abuse blocking</li>
              <li>Unauthorized bot additions</li>
              <li>Administrator privilege escalation</li>
              <li>Automatic lockdown on breach threshold</li>
              <li>Trusted operator whitelist with zero-trust fallback</li>
            </ul>
          </div>
          <div className="terminal">
            <div className="term-bar">
              <div className="term-dot r"></div>
              <div className="term-dot y"></div>
              <div className="term-dot g"></div>
              <span className="term-label">vertex / event-stream</span>
            </div>
            <div className="term-body">
              <div className="trow"><span className="trow-ts">00:00:01</span><span className="trow-tag b">blocked</span><span className="trow-msg">guildMemberRemove — mass ban sequence, 47 targets, untrusted actor</span></div>
              <div className="trow"><span className="trow-ts">00:00:03</span><span className="trow-tag b">blocked</span><span className="trow-msg">channelDelete — bulk queue intercepted, 12 channels pending</span></div>
              <div className="trow"><span className="trow-ts">00:00:04</span><span className="trow-tag w">flagged</span><span className="trow-msg">guildIntegrationCreate — bot added without trusted authorization</span></div>
              <div className="trow"><span className="trow-ts">00:00:06</span><span className="trow-tag b">blocked</span><span className="trow-msg">webhookCreate — rate threshold exceeded, antiraid module triggered</span></div>
              <div className="trow"><span className="trow-ts">00:00:08</span><span className="trow-tag b">blocked</span><span className="trow-msg">roleUpdate — Administrator grant to untrusted user rejected</span></div>
              <div className="trow"><span className="trow-ts">00:00:10</span><span className="trow-tag o">resolved</span><span className="trow-msg">lockdown lifted — threat neutralized, full audit written</span></div>
            </div>
          </div>
        </div>
      </section>

      <div className="rule"></div>

      <section className="cta" style={{ paddingTop: '88px' }}>
        <div className="cta-wrap">
          <h2>Deploy Vertex<br />to your server.</h2>
          <p>Takes thirty seconds. Every module activates on invite.</p>
          <div className="cta-actions">
            <a href="#" className="btn-dark">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.057a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
              Add to Server
            </a>
            <a href="https://discord.gg/vte" className="btn-ghost" target="_blank" rel="noopener noreferrer">Join Support Server</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-wrap">
          <a className="footer-brand" href="/">
            <img src="/vertex.png" alt="Vertex" />
            <span className="footer-brand-name">Vertex</span>
          </a>
          <ul className="footer-links">
            <li><a href="#">Terms</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Docs</a></li>
            <li><a href="#">Discord</a></li>
          </ul>
          <span className="footer-copy">&copy; 2026 Vertex</span>
        </div>
      </footer>
    </>
  )
}