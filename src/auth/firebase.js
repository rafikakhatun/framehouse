import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const auth = Object.values(config).every(Boolean) ? getAuth(initializeApp(config)) : null

const messages = {
  'auth/email-already-in-use': 'An account already exists for this email. Try signing in.',
  'auth/invalid-credential': 'The email or password didn’t match. New to Framehouse? Create an account, or use Forgot password if you already have one.',
  'auth/weak-password': 'Choose a stronger password.',
  'auth/password-does-not-meet-requirements': 'This password does not meet the account requirements.',
  'auth/invalid-email': 'Enter a valid email address.',
  'auth/popup-closed-by-user': 'The Google sign-in window was closed. Try again when ready.',
  'auth/popup-blocked': 'Allow pop-ups for this site and try Google sign-in again.',
  'auth/cancelled-popup-request': 'Another Google sign-in attempt replaced this one. Try again once.',
  'auth/operation-not-supported-in-this-environment': 'Open Framehouse in a regular browser window on localhost and try again.',
  'auth/web-storage-unsupported': 'Allow cookies and site storage for this page, then retry Google sign-in.',
  'auth/operation-not-allowed': 'This sign-in method is disabled in Firebase Authentication.',
  'auth/unauthorized-domain': 'Open Framehouse on an authorized domain, such as localhost.',
  'auth/network-request-failed': 'Check your connection and try again.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
  'auth/account-exists-with-different-credential': 'Sign in using the method you originally used for this email.',
}

export function authMessage(error, provider) {
  const code = typeof error?.code === 'string' && /^auth\/[a-z0-9-]+$/.test(error.code) ? error.code : ''
  const fallback = provider === 'google' ? 'Google sign-in could not be completed.' : 'The request could not be completed.'
  if (provider !== 'google' && ['auth/user-not-found', 'auth/wrong-password'].includes(code)) {
    return messages['auth/invalid-credential']
  }
  if (provider === 'google' && code === 'auth/invalid-credential') {
    return 'Google returned a credential Firebase could not accept. Try opening the Google sign-in window again. (auth/invalid-credential)'
  }
  return messages[code] ?? `${fallback} Please try again.${code ? ` (${code})` : ''}`
}
