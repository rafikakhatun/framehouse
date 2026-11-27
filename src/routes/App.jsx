import { CircleCheck, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../auth/firebase'
import { Footer, Navbar } from '../components/SiteChrome'
import Browse from '../pages/Browse'
import Landing from '../pages/Landing'
import Login from '../pages/Login'

export default function App() {
  const { pathname, hash } = useLocation()
  const [user, setUser] = useState(null)
  const [authReady, setAuthReady] = useState(!auth)
  const [signingOut, setSigningOut] = useState(false)
  const [signOutError, setSignOutError] = useState(false)
  const [showSignInToast, setShowSignInToast] = useState(false)
  const signOutDialog = useRef(null)

  useEffect(() => {
    if (!showSignInToast) return
    const timer = window.setTimeout(() => setShowSignInToast(false), 4500)
    return () => window.clearTimeout(timer)
  }, [showSignInToast])

  useEffect(() => {
    if (!auth) return
    return onAuthStateChanged(auth, (account) => {
      setUser(account)
      setAuthReady(true)
    })
  }, [])

  async function logOut() {
    if (signingOut) return
    setSigningOut(true)
    setSignOutError(false)
    try {
      await signOut(auth)
      signOutDialog.current.close()
      setShowSignInToast(false)
    } catch {
      setSignOutError(true)
    } finally {
      setSigningOut(false)
    }
  }

  const loading = <main id="main" className="shell section" role="status">Checking your session…</main>

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash])

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar home={pathname === '/'} user={user} signingOut={signingOut} onSignOut={() => {
        setSignOutError(false)
        signOutDialog.current.showModal()
      }} />
      <div className="signin-toast-region">
        <span role="status" className="sr-only">{showSignInToast ? 'Signed in successfully.' : ''}</span>
        {showSignInToast && (
          <div className="signin-toast">
            <CircleCheck size={19} aria-hidden="true" />
            <span>Signed in successfully</span>
            <button type="button" aria-label="Dismiss message" onClick={() => setShowSignInToast(false)}><X size={17} aria-hidden="true" /></button>
          </div>
        )}
      </div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={!authReady ? loading : user ? <Navigate to="/browse" replace /> : <Login onSignIn={() => setShowSignInToast(true)} />} />
        <Route path="/browse" element={!authReady ? loading : user ? <Browse /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<main id="main" className="shell section page-enter"><h1>Page unavailable</h1><Link className="outline-button mt-6" to="/">Back to home</Link></main>} />
      </Routes>
      <Footer />
      <dialog ref={signOutDialog} className="signout-dialog" aria-labelledby="signout-title" aria-describedby="signout-description"
        onCancel={(event) => { if (signingOut) event.preventDefault() }}>
        <h2 id="signout-title">Sign out of Framehouse?</h2>
        <p id="signout-description">You’ll need to sign in again to access Browse.</p>
        {signOutError && <p className="auth-error" role="alert">Sign-out failed. Please try again.</p>}
        <div className="signout-actions">
          <button type="button" className="outline-button" disabled={signingOut} onClick={() => signOutDialog.current.close()} autoFocus>Cancel</button>
          <button type="button" className="primary-button" disabled={signingOut} onClick={logOut}>{signingOut ? 'Signing out…' : 'Sign out'}</button>
        </div>
      </dialog>
    </>
  )
}
