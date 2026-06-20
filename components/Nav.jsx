'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './Nav.module.css'

export default function Nav() {
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
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.wrap}>
        <Link href="/" className={styles.brand}>
          <img src="/vertex.png" alt="Vertex" className={styles.brandImg} />
          <span className={styles.brandName}>Vertex</span>
        </Link>

        <div className={styles.center}>
          <Link href="#modules">Modules</Link>
          <Link href="#protection">Protection</Link>
          <Link href="#">Docs</Link>
          <a href="https://discord.gg/vte" target="_blank" rel="noopener noreferrer">Support</a>
        </div>

        <div className={styles.right}>
          {user === undefined ? null : user ? (
            <>
              <a href="/api/auth/logout" className={styles.textLink}>Logout</a>
              <img
                src={user.avatar_url}
                alt={user.global_name || user.username}
                title={user.global_name || user.username}
                className={styles.avatar}
              />
            </>
          ) : (
            <>
              <a href="/api/auth/login" className={styles.textLink}>Login</a>
              <a href="#" className={styles.btn}>Add to Server</a>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}