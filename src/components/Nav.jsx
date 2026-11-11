// import { useState, useEffect } from 'react'
// import { nav, site } from '../data/content.js'
// export default function Nav() {
//   const [open, setOpen] = useState(false)
//   useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])
//   return (
//     <>
//       <header className="topbar">
//         <a href="#home" className="brand">{site.name.toUpperCase()}</a>
//         <button className={`burger ${open ? 'x' : ''}`} aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}><i/><i/><i/></button>
//       </header>
//       <nav className={`menu ${open ? 'open' : ''}`} aria-hidden={!open}>
//         {nav.map(([id, label], i) => <a key={id} href={`#${id}`} tabIndex={open ? 0 : -1} style={{ transitionDelay: open ? i * 50 + 'ms' : '0ms' }} onClick={() => setOpen(false)}>{label}</a>)}
//       </nav>
//     </>
//   )
// }


import { useState, useEffect } from 'react'
import { nav, site } from '../data/content.js'
import resumePdf from '../assets/UIUX Resume Vanshika Yadav.pdf'

export default function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <>
      <header className="topbar">
        <a href="#home" className="brand" onClick={() => setOpen(false)}>
          {site.name.toUpperCase()}<span>.</span>
        </a>

        <div className="topbar-actions">
          <a
            href={resumePdf}
            download="Vanshika_Yadav_Resume.pdf"
            className="resume-btn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Resume"
          >
            <span>RESUME</span>
            <svg
              className="download-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>

          <button
            className={`menu-trigger ${open ? 'active' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
          >
            <span>{open ? 'CLOSE' : 'MENU'}</span>
            <div className="menu-icon">
              <i />
              <i />
            </div>
          </button>
        </div>
      </header>

      <nav className={`nav-overlay ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="nav-top">
          <span className="nav-label">PORTFOLIO / 2026</span>
          <span className="nav-label">CREATIVE DEVELOPER & DESIGNER</span>
        </div>

        <div className="nav-content">
          <div className="nav-heading">
            <span>TAKE A LOOK AROUND</span>
            <h2>Explore<span>.</span></h2>
          </div>

          <div className="nav-links">
            {nav.map(([id, label], i) => (
              <a
                key={id}
                href={`#${id}`}
                tabIndex={open ? 0 : -1}
                style={{ '--i': i }}
                onClick={() => setOpen(false)}
              >
                <span className="nav-number">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span className="nav-link-text">{label}</span>

                <span className="nav-arrow">↗</span>
              </a>
            ))}
          </div>
        </div>

        <div className="nav-bottom">
          <span>DESIGNED WITH CURIOSITY © 2026</span>
          <span>LET'S CREATE SOMETHING GOOD.</span>
          <a href="#contact" onClick={() => setOpen(false)}>
            GET IN TOUCH ↗
          </a>
        </div>
      </nav>
    </>
  )
}

