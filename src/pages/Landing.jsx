import { ArrowDown, Download, MonitorPlay, Plus, Smartphone, Users } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeroVideo from '../components/HeroVideo'
import EmailForm from '../components/EmailForm'
import Trending from '../components/Trending'
import { featured, questions } from '../utils/content'

const features = [
  [MonitorPlay, 'Made for movie night', 'Settle in with a big-screen experience.'],
  [Download, 'Take it offline', 'Keep your favourites close for the journey.'],
  [Smartphone, 'Pick up anywhere', 'Explore on your phone, tablet, or computer.'],
  [Users, 'Room for everyone', 'Find a story for every kind of viewer.'],
]

export default function Landing() {
  const navigate = useNavigate()
  const [openQuestion, setOpenQuestion] = useState(null)
  const start = (email) => navigate('/login', { state: { email } })

  return (
    <main id="main" className="page-enter">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-layout shell">
          <div className="hero-copy">
            <h1 id="hero-title">Find your next <em>great watch.</em></h1>
            <p>Discover movies, series, and stories worth staying up for.</p>
            <EmailForm onSubmit={start} />
            <a className="explore-link" href="#trending"><ArrowDown size={15} aria-hidden="true" /> Explore trending</a>
          </div>
          <HeroVideo artwork={featured} />
        </div>
      </section>

      <Trending />

      <section id="features" className="section shell" aria-labelledby="features-title">
        <h2 id="features-title" className="section-heading">Make it your movie night</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(([Icon, title, description]) => (
            <article className="feature" key={title}>
              <Icon size={24} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className="section shell faq-layout" aria-labelledby="faq-title">
        <h2 id="faq-title">Frequently asked questions</h2>
        <div>
          {questions.map(([question, answer], index) => {
            const isOpen = openQuestion === index
            return (
              <article className="faq-item" key={question} data-open={isOpen}>
                <h3><button type="button" id={`question-${index}`} aria-expanded={isOpen} aria-controls={`answer-${index}`} onClick={() => setOpenQuestion(isOpen ? null : index)}>
                  {question}<Plus size={20} aria-hidden="true" />
                </button></h3>
                <div id={`answer-${index}`} className="faq-answer" aria-hidden={!isOpen}><div><p>{answer}</p></div></div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="shell section">
        <div className="closing-panel">
          <h2>Ready to explore?</h2>
          <EmailForm onSubmit={start} />
        </div>
      </section>
    </main>
  )
}
