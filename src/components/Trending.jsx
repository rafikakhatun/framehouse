import { ArrowRight, ChevronLeft, ChevronRight, Play, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { Link } from 'react-router-dom'
import { titles } from '../utils/content'
import Artwork from './Artwork'

export default function Trending({ browse = false }) {
  const track = useRef(null)
  const dialog = useRef(null)
  const [selected, setSelected] = useState(null)
  const [showPreview, setShowPreview] = useState(false)
  const [previewError, setPreviewError] = useState(false)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  function updateControls() {
    const { scrollLeft, scrollWidth, clientWidth } = track.current
    setAtStart(scrollLeft <= 1)
    setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1)
  }

  function move(direction) {
    const list = track.current
    list.scrollBy({ left: direction * list.clientWidth * 0.8 })
  }

  function openDetails(title) {
    flushSync(() => {
      setSelected(title)
      setShowPreview(false)
      setPreviewError(false)
    })
    dialog.current.showModal()
  }

  return (
    <section id="trending" className="section shell" aria-labelledby="trending-title">
      <div className="section-heading flex items-end justify-between gap-4">
        <h2 id="trending-title">Trending now</h2>
        <div className="flex gap-2">
          <button className="icon-button" type="button" aria-label="Previous titles" aria-controls="trending-track" disabled={atStart} onClick={() => move(-1)}><ChevronLeft size={20} /></button>
          <button className="icon-button" type="button" aria-label="Next titles" aria-controls="trending-track" disabled={atEnd} onClick={() => move(1)}><ChevronRight size={20} /></button>
        </div>
      </div>
      <ol id="trending-track" className="trending-track" ref={track} onScroll={updateControls} tabIndex={0} aria-labelledby="trending-title">
        {titles.map((title) => (
          <li className="poster" key={title.title}>
            <Artwork artwork={title} />
            <div className="poster-copy">
              <h3>{title.title}</h3>
              <p>{title.genre} <span aria-hidden="true">·</span> {title.year}</p>
            </div>
            <button className="poster-trigger" type="button" aria-label={`View details for ${title.title}`} aria-haspopup="dialog" onClick={() => openDetails(title)} />
          </li>
        ))}
      </ol>
      <dialog ref={dialog} className="title-dialog" aria-labelledby="title-dialog-heading" aria-describedby="title-dialog-synopsis" onClose={() => setShowPreview(false)}>
        <button type="button" className="icon-button title-dialog-close" aria-label="Close details" autoFocus onClick={() => dialog.current.close()}><X size={20} aria-hidden="true" /></button>
        {selected && (
          <div className="title-dialog-layout">
            <div className="title-dialog-art" style={selected.src ? { '--poster-backdrop': `url("${selected.src}")` } : undefined}>
              {showPreview ? (
                <video className="artwork artwork-image" src={selected.preview} poster={selected.src} controls autoPlay playsInline
                  aria-label={`${selected.title} preview`} onError={() => { setShowPreview(false); setPreviewError(true) }} />
              ) : <Artwork artwork={selected} featured />}
            </div>
            <div className="title-dialog-copy">
              <h3 id="title-dialog-heading">{selected.title}</h3>
              <ul className="title-dialog-meta" aria-label="Title information">
                <li>{selected.genre}</li>
                <li>{selected.year}</li>
              </ul>
              <p id="title-dialog-synopsis">{selected.synopsis}</p>
              {(selected.preview || !browse) && <div className="title-dialog-actions">
                {selected.preview && (
                <button className="outline-button title-dialog-action" type="button" onClick={() => {
                  setPreviewError(false)
                  setShowPreview((visible) => !visible)
                }}>
                  {!showPreview && <Play size={16} aria-hidden="true" />}
                  {showPreview ? 'Show poster' : 'Watch preview'}
                </button>
                )}
                {!browse && <Link className="primary-button title-dialog-action" to="/login" onClick={() => dialog.current.close()}>
                  Get started <ArrowRight size={17} aria-hidden="true" />
                </Link>}
              </div>}
              {previewError && <p className="auth-error" role="alert">Couldn’t play the preview. Please try again.</p>}
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}
