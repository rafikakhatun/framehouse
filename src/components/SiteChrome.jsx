import { ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function Brand() {
  return (
    <Link to="/" className="brand" aria-label="Framehouse home">
      <img className="brand-mark" src={import.meta.env.BASE_URL + 'favicon.svg'} alt="" width="32" height="32" />
      <span className="brand-wordmark">Frame<span>house</span></span>
    </Link>
  )
}

export function Navbar({ home, user, signingOut, onSignOut }) {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 16)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="header-glass">
        <div className="shell flex items-center justify-between gap-4">
          <Brand />
          {home && <nav aria-label="Main navigation" className="hidden items-center gap-8 text-sm text-muted sm:flex">
            <a href="#trending">Trending</a><a href="#features">Features</a><a href="#faq">FAQ</a>
          </nav>}
          {user && !home ? (
            <button className="outline-button" type="button" disabled={signingOut} onClick={onSignOut}>{signingOut ? 'Signing out…' : 'Sign out'}</button>
          ) : (
            <Link className="outline-button" to={home ? (user ? '/browse' : '/login') : '/'}>
              {home ? (user ? 'Browse' : 'Sign in') : 'Back to home'}<ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="site-footer shell flex flex-wrap items-center justify-between gap-6">
      <Brand />
      <span className="text-sm text-muted">Streaming interface portfolio preview</span>
      <Link className="text-sm text-muted" to="/#faq">Help & FAQ</Link>
    </footer>
  )
}
