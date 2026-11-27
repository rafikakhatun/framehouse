import { Film, Radio } from 'lucide-react'

export default function Artwork({ artwork, featured = false }) {
  if (artwork.src) {
    return <img className="artwork artwork-image" src={artwork.src} alt={artwork.alt} loading={featured ? 'eager' : 'lazy'} />
  }

  const Icon = featured ? Radio : Film
  return (
    <div className="artwork artwork-placeholder" data-tone={artwork.tone} role="img" aria-label={artwork.alt}>
      <div className="artwork-caption" aria-hidden="true"><Icon size={19} /><span>{artwork.alt}</span></div>
    </div>
  )
}
