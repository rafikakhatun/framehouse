import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const motionQuery = '(prefers-reduced-motion: reduce)'
const videoPath = import.meta.env.BASE_URL + 'after-the-signal.mp4'
const posterPath = import.meta.env.BASE_URL + 'after-the-signal.jpg'

export default function HeroVideo({ artwork }) {
  const video = useRef(null)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia(motionQuery).matches)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)
  const showVideo = !reducedMotion && !failed && !artwork.src

  useEffect(() => {
    const preference = window.matchMedia(motionQuery)
    const update = () => {
      setReducedMotion(preference.matches)
      if (preference.matches) setPlaying(false)
    }
    preference.addEventListener('change', update)
    return () => preference.removeEventListener('change', update)
  }, [])

  function toggle() {
    const player = video.current
    if (player.paused) {
      player.play().catch(() => setPlaying(false))
    } else {
      player.pause()
    }
  }

  return (
    <figure className="hero-art" data-still={Boolean(artwork.src)}>
      <img className="hero-media" src={artwork.src ?? posterPath} alt={artwork.alt} fetchPriority="high" />
      {showVideo && (
        <>
          <video ref={video} className="hero-media" src={videoPath} poster={posterPath} autoPlay muted playsInline loop aria-hidden="true"
            onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)} />
          <button className="icon-button signal-toggle" type="button" aria-label={playing ? 'Pause hero video' : 'Play hero video'} onClick={toggle}>
            {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
          </button>
        </>
      )}
      {!artwork.src && <figcaption><span>{artwork.title}</span><small>{artwork.genre} · {artwork.year}</small></figcaption>}
    </figure>
  )
}
