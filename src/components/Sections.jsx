import { useState } from 'react'
import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import { Behance, Linkedin, Figma, Github, IconDesign, IconLanguages, IconFrameworks, IconTools } from './Icons.jsx'
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
              <div className="project-links">
    <div className="project-links">
  <a className="link" href={w.demo} target="_blank" rel="noreferrer">
    View on Behance →
  </a>

  {w.Figma && (
    <a className="link" href={w.Figma} target="_blank" rel="noreferrer">
      View on Figma →
    </a>
  )}
</div>
</div>
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
  Design: IconDesign,
  Languages: IconLanguages,
  Frameworks: IconFrameworks,
  Tools: IconTools,
}
const techAccents = {
  Design:     ['#e8a0cc', '#4b4bc8'],
  Languages:  ['#4b4bc8', '#a9d8f8'],
  Frameworks: ['#a9d8f8', '#e8a0cc'],
  Tools:      ['#b9c3ea', '#4b4bc8'],
}

export const Tech = () => (
  <Section id="tech" n="04" title="Beyond the pixels — my technical side" tone="b">
    <div className="tech-grid">
      {Object.entries(C.tech).map(([g, items], i) => {
        const Icon = techIcons[g]
        return (
          <Reveal key={g} delay={i * 90}>
            <div className="tech-card" style={{ '--c1': techAccents[g]?.[0] ?? '#e8a0cc', '--c2': techAccents[g]?.[1] ?? '#4b4bc8' }}>
              <div className="tech-card-header">
                <span className="tech-icon">{Icon && <Icon />}</span>
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
        )
      })}
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
      const res = await fetch('https://formspree.io/f/xwpbgkve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name: f.name, email: f.email, message: f.message, _replyto: f.email }),
      })
      if (res.ok) {
        setSent(true)
        setF({ name: '', email: '', message: '' })
      } else {
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
  )
}
