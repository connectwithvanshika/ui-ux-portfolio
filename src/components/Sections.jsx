import { useState, useEffect, useRef } from 'react'
import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import { Behance, Linkedin, Figma, Github } from './Icons.jsx'
import * as C from '../data/content.js'
import nextfitImg from '../assets/nextfit.jpg'
import verdaImg from '../assets/verda.jpg'

const projectImages = { nextfit: nextfitImg, verda: verdaImg }

export const About = () => (
  <Section id="about" n="01" title="About me — a little introduction">
    <div className="grid two">
      <Reveal>{C.about.text.map(t => <p className="lead" key={t}>{t}</p>)}
        <blockquote>{C.about.philosophy}</blockquote>
        <ul className="chips">{C.about.interests.map(i => <li key={i}>{i}</li>)}</ul></Reveal>
      <Reveal delay={120} className="stats">{C.about.facts.map(([a, b]) => <div key={b}><strong>{a}</strong><span>{b}</span></div>)}</Reveal>
    </div>
  </Section>
)

export const Works = () => (
  <Section id="works" n="02" title="Selected works — my projects" tone="b">
    <div className="grid cards">
      {C.works.map((w, i) => (
        <Reveal key={w.title} delay={i * 90}>
          <article className="card">
            <div className="shot" style={{ background: `linear-gradient(160deg,${w.colors[0]},${w.colors[1]})`, padding: 0, alignItems: 'stretch' }}>
              {projectImages[w.img]
                ? <img src={projectImages[w.img]} alt={w.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                : <><div className="phone"><b/><i/><i/><i/></div><span className="shot-title">{w.title}</span></>
              }
            </div>
            <div className="card-body">
              <h3>{w.title}<small>{w.year}</small></h3>
              <p>{w.blurb}</p>
              <p className="meta"><b>Role</b> {w.role}</p>
              <ul className="chips sm">{w.tools.map(t => <li key={t}>{t}</li>)}</ul>
              <a className="link" href={w.demo} target="_blank" rel="noreferrer">View on Behance →</a>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  </Section>
)

export const Process = () => (
  <Section id="process" n="03" title="My design process">
    <ol className="steps">
      {C.process.map(([t, d], i) => <Reveal key={t} delay={i * 80}><li><span>{i + 1}</span><h3>{t}</h3><p>{d}</p></li></Reveal>)}
    </ol>
  </Section>
)

const techIcons = {
  Design: '🎨', Languages: '💻', Frameworks: '⚙️', Tools: '🛠️'
}
const techAccents = {
  Design: ['#e8a0cc','#4b4bc8'],
  Languages: ['#4b4bc8','#a9d8f8'],
  Frameworks: ['#a9d8f8','#e8a0cc'],
  Tools: ['#b9c3ea','#4b4bc8'],
}

export const Tech = () => (
  <Section id="tech" n="04" title="Beyond the pixels — my technical side" tone="b">
    <div className="tech-grid">
      {Object.entries(C.tech).map(([g, items], i) => (
        <Reveal key={g} delay={i * 90}>
          <div className="tech-card" style={{ '--c1': techAccents[g]?.[0] ?? '#e8a0cc', '--c2': techAccents[g]?.[1] ?? '#4b4bc8' }}>
            <div className="tech-card-header">
              <span className="tech-icon">{techIcons[g] ?? '✦'}</span>
              <h3 className="tech-label">{g}</h3>
              <span className="tech-count">{items.length} skills</span>
            </div>
            <ul className="tech-chips">
              {items.map((x, j) => (
                <li key={x} className="tech-chip" style={{ animationDelay: `${j * 60}ms` }}>{x}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  </Section>
)

export const Experience = () => (
  <Section id="experience" n="05" title="Experience & achievements">
    <ul className="timeline">
      {C.experience.map((e, i) => <Reveal key={e.title} delay={i * 80}><li><time>{e.when}</time><div><h3>{e.title}</h3><em>{e.org}</em><p>{e.text}</p></div></li></Reveal>)}
    </ul>
  </Section>
)

export const Personality = () => (
  <Section id="personality" n="06" title="A little personality" tone="b">
    <Reveal><p className="lead big">{C.personality.intro}</p></Reveal>
    <div className="grid two">
      <Reveal><div className="panel"><h3>Fun facts</h3><ul className="facts">{C.personality.facts.map(f => <li key={f}>{f}</li>)}</ul></div></Reveal>
      <Reveal delay={100}><div className="panel"><h3>Hobbies</h3><ul className="chips">{C.personality.hobbies.map(h => <li key={h}>{h}</li>)}</ul></div></Reveal>
    </div>
  </Section>
)

/* ── Cinnamoroll Easter Egg ───────────────────────── */
function Cinnamoroll() {
  const [pos, setPos] = useState({ x: 60, y: window.innerHeight - 110 })
  const [visible, setVisible] = useState(false)
  const [msg, setMsg] = useState('')
  const [dragging, setDragging] = useState(false)
  const [bounce, setBounce] = useState(false)
  const ref = useRef(null)
  const dragOffset = useRef({ x: 0, y: 0 })

  const msgs = ['Hi! I\'m Cinnamoroll 🌸', 'You found me! ✨', 'Vanshika made this! 💙', 'Great portfolio, right? ☁️', 'Drag me around! 🎀', 'Design with love 💕']

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const startDrag = (e) => {
    e.preventDefault()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    dragOffset.current = { x: clientX - pos.x, y: clientY - pos.y }
    setDragging(true)
  }

  useEffect(() => {
    if (!dragging) return
    const move = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const clientY = e.touches ? e.touches[0].clientY : e.clientY
      setPos({
        x: Math.max(0, Math.min(window.innerWidth - 72, clientX - dragOffset.current.x)),
        y: Math.max(0, Math.min(window.innerHeight - 90, clientY - dragOffset.current.y)),
      })
    }
    const up = () => setDragging(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
    window.addEventListener('touchmove', move, { passive: false })
    window.addEventListener('touchend', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
      window.removeEventListener('touchmove', move)
      window.removeEventListener('touchend', up)
    }
  }, [dragging])

  const handleClick = () => {
    if (dragging) return
    setBounce(true)
    setMsg(msgs[Math.floor(Math.random() * msgs.length)])
    setTimeout(() => setBounce(false), 600)
    setTimeout(() => setMsg(''), 2500)
  }

  if (!visible) return null

  return (
    <div
      ref={ref}
      className={`cinna-wrap${bounce ? ' cinna-bounce' : ''}${dragging ? ' cinna-drag' : ''}`}
      style={{ left: pos.x, top: pos.y }}
      onMouseDown={startDrag}
      onTouchStart={startDrag}
      onClick={handleClick}
      title="Click me!"
    >
      {msg && <div className="cinna-bubble">{msg}</div>}
      <svg className="cinna-svg" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        {/* ears */}
        <ellipse cx="20" cy="22" rx="10" ry="14" fill="#fff" stroke="#c8e6f8" strokeWidth="1.5"/>
        <ellipse cx="60" cy="22" rx="10" ry="14" fill="#fff" stroke="#c8e6f8" strokeWidth="1.5"/>
        <ellipse cx="20" cy="24" rx="6" ry="9" fill="#d6eefa"/>
        <ellipse cx="60" cy="24" rx="6" ry="9" fill="#d6eefa"/>
        {/* head */}
        <circle cx="40" cy="44" r="26" fill="#fff" stroke="#c8e6f8" strokeWidth="1.5"/>
        {/* cheeks */}
        <ellipse cx="26" cy="52" rx="6" ry="4" fill="#f9c8da" opacity=".7"/>
        <ellipse cx="54" cy="52" rx="6" ry="4" fill="#f9c8da" opacity=".7"/>
        {/* eyes */}
        <ellipse cx="33" cy="44" rx="4" ry="4.5" fill="#5a9fd4"/>
        <ellipse cx="47" cy="44" rx="4" ry="4.5" fill="#5a9fd4"/>
        <circle cx="33" cy="44" r="2.2" fill="#1a3a5c"/>
        <circle cx="47" cy="44" r="2.2" fill="#1a3a5c"/>
        <circle cx="34.2" cy="42.8" r="1" fill="#fff"/>
        <circle cx="48.2" cy="42.8" r="1" fill="#fff"/>
        {/* nose */}
        <ellipse cx="40" cy="51" rx="2.5" ry="1.8" fill="#f9a8c0"/>
        {/* tail on top */}
        <ellipse cx="40" cy="20" rx="5" ry="6" fill="#c8e6f8" stroke="#a0cce8" strokeWidth="1"/>
        {/* tiny star */}
        <text x="62" y="28" fontSize="10" fill="#f9c8da">✦</text>
      </svg>
    </div>
  )
}

/* ── Contact ──────────────────────────────────────── */
export function Contact() {
  const [f, setF] = useState({ name: '', email: '', message: '' })
  const [err, setErr] = useState({})
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const on = k => e => setF({ ...f, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    const x = {}
    if (!f.name.trim()) x.name = 'Enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = 'Enter a valid email address.'
    if (f.message.trim().length < 10) x.message = 'Write at least 10 characters.'
    setErr(x)
    if (Object.keys(x).length) return

    setSending(true)
    try {
      // Send via Formspree (no backend needed)
      const res = await fetch('https://formspree.io/f/xwpbgkve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name: f.name, email: f.email, message: f.message, _replyto: f.email }),
      })
      if (res.ok) {
        setSent(true)
        setF({ name: '', email: '', message: '' })
      } else {
        // fallback to mailto
        window.location.href = `mailto:vanshika.connects@gmail.com?subject=${encodeURIComponent('Portfolio message from ' + f.name)}&body=${encodeURIComponent(f.message + '\n\nFrom: ' + f.email)}`
        setSent(true)
      }
    } catch {
      window.location.href = `mailto:vanshika.connects@gmail.com?subject=${encodeURIComponent('Portfolio message from ' + f.name)}&body=${encodeURIComponent(f.message + '\n\nFrom: ' + f.email)}`
      setSent(true)
    }
    setSending(false)
  }

  const s = C.site.socials
  return (
    <>
      <Section id="contact" n="07" title="Contact — let's make something happen">
        <div className="grid two">
          <Reveal>
            <p className="lead">Have a project, an internship or just a hello? Write to me.</p>
            <a className="mail" href={`mailto:${C.site.email}`}>{C.site.email}</a>
            <div className="social-row">
              <a href={s.behance} aria-label="Behance" target="_blank" rel="noreferrer"><Behance/></a>
              <a href={s.figma} aria-label="Figma" target="_blank" rel="noreferrer"><Figma/></a>
              <a href={s.github} aria-label="GitHub" target="_blank" rel="noreferrer"><Github/></a>
              <a href={s.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin/></a>
            </div>
          </Reveal>
          <Reveal delay={100}>
            {sent ? (
              <div className="sent-card">
                <span className="sent-emoji">🎉</span>
                <p className="ok">Message sent! I'll get back to you soon.</p>
              </div>
            ) : (
              <form className="form" onSubmit={submit} noValidate>
                {[['name', 'Your name', 'text'], ['email', 'Email', 'email']].map(([k, l, t]) => (
                  <label key={k}>{l}<input type={t} value={f[k]} onChange={on(k)} aria-invalid={!!err[k]}/><small>{err[k]}</small></label>
                ))}
                <label>Message<textarea rows="5" value={f.message} onChange={on('message')} aria-invalid={!!err.message}/><small>{err.message}</small></label>
                <button className="btn" type="submit" disabled={sending}>
                  {sending ? 'Sending…' : 'Send message'}
                </button>
              </form>
            )}
          </Reveal>
        </div>
        <footer className="foot">© {new Date().getFullYear()} {C.site.name}. Dare to dazzle.</footer>
      </Section>
      <Cinnamoroll />
    </>
  )
}
