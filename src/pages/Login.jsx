import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, authMessage } from '../auth/firebase'
import googleLogo from '../assets/google-g.png'

const headings = { signin: 'Sign in', signup: 'Create account', reset: 'Reset password' }
const descriptions = {
  signin: 'Welcome back to Framehouse.',
  signup: 'Join Framehouse to explore the film collection.',
  reset: 'Enter your email to request a reset link.',
}

export default function Login({ onSignIn }) {
  const { state } = useLocation()
  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState(state?.email ?? '')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  function changeMode(next) {
    setMode(next)
    setPassword('')
    setShowPassword(false)
    setStatus('')
    setError('')
  }

  async function run(action, provider = 'email') {
    if (!auth || busy) return
    setBusy(true)
    setStatus('')
    setError('')
    setShowPassword(false)
    try {
      await action()
      if (mode !== 'reset') onSignIn()
    } catch (failure) {
      if (mode === 'reset' && failure.code === 'auth/user-not-found') {
        setStatus('If an account exists for this email, you’ll receive a reset link.')
      } else {
        setError(authMessage(failure, provider))
      }
    } finally {
      setBusy(false)
    }
  }

  function submit(event) {
    event.preventDefault()
    const address = email.trim()
    run(async () => {
      if (mode === 'reset') {
        await sendPasswordResetEmail(auth, address)
        setStatus('If an account exists for this email, you’ll receive a reset link.')
      } else if (mode === 'signup') {
        await createUserWithEmailAndPassword(auth, address, password)
      } else {
        await signInWithEmailAndPassword(auth, address, password)
      }
    })
  }

  return (
    <main id="main" className="login-layout shell page-enter">
      <section className="login-panel" aria-labelledby="login-title">
        <h1 id="login-title">{headings[mode]}</h1>
        <p>{descriptions[mode]}</p>
        {!auth && <p role="status">Sign-in needs Firebase configuration.</p>}
        <form className="auth-form" onSubmit={submit}>
          <label htmlFor="auth-email">Email address</label>
          <input id="auth-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          {mode !== 'reset' && (
            <>
              <label htmlFor="auth-password">Password</label>
              <div className="auth-password-field">
                <input id="auth-password" type={showPassword ? 'text' : 'password'} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  aria-describedby={mode === 'signup' ? 'auth-password-hint' : undefined}
                  minLength={mode === 'signup' ? 6 : undefined} value={password} onChange={(event) => setPassword(event.target.value)} required />
                <button className="auth-password-toggle" type="button" aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-controls="auth-password" onClick={() => setShowPassword((visible) => !visible)}>
                  {showPassword ? <EyeOff size={19} aria-hidden="true" /> : <Eye size={19} aria-hidden="true" />}
                </button>
              </div>
              {mode === 'signup' && <p id="auth-password-hint" className="auth-hint">Use at least 6 characters.</p>}
            </>
          )}
          <button className="primary-button" type="submit" disabled={busy || !auth}>
            {busy ? 'Please wait…' : mode === 'reset' ? 'Send reset link' : headings[mode]}<ArrowRight size={17} aria-hidden="true" />
          </button>
        </form>
        {mode !== 'reset' && (
          <>
            <div className="auth-divider" aria-hidden="true">or</div>
            <button className="auth-google" type="button" disabled={busy || !auth} onClick={() => run(() => signInWithPopup(auth, new GoogleAuthProvider()), 'google')}>
              <img src={googleLogo} alt="" width="18" height="18" /> Continue with Google
            </button>
          </>
        )}
        {error && <p className="auth-error" role="alert">{error}</p>}
        {status && <p className="auth-status" role="status">{status}</p>}
        <div className="auth-links">
          {mode === 'signin' ? (
            <>
              <button type="button" disabled={busy} onClick={() => changeMode('signup')}>Create account</button>
              <button type="button" disabled={busy} onClick={() => changeMode('reset')}>Forgot password?</button>
            </>
          ) : (
            <>
              {mode === 'signup' && <span>Already have an account?</span>}
              <button type="button" disabled={busy} onClick={() => changeMode('signin')}>{mode === 'signup' ? 'Sign in' : 'Back to sign in'}</button>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
