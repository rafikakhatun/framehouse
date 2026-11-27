import { ArrowRight } from 'lucide-react'
import { useId } from 'react'

export default function EmailForm({ initialEmail = '', label = 'Get started', onSubmit, stacked = false }) {
  const id = useId()

  function submit(event) {
    event.preventDefault()
    onSubmit(new FormData(event.currentTarget).get('email').trim())
  }

  return (
    <form className={`email-form ${stacked ? 'email-form-stacked' : ''}`} onSubmit={submit}>
      <label className="sr-only" htmlFor={id}>Email address</label>
      <input id={id} name="email" type="email" autoComplete="email" placeholder="Email address" defaultValue={initialEmail} required />
      <button className="primary-button" type="submit">{label}<ArrowRight size={18} aria-hidden="true" /></button>
    </form>
  )
}
