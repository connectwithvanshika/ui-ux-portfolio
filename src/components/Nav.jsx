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

