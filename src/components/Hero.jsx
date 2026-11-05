import { site } from '../data/content.js'
import portrait from '../assets/portrait.png'
import { Behance, Linkedin, Figma, Github } from './Icons.jsx'
export default function Hero() {
  const s = site.socials
  return (
    <section id="home" className="hero">
      <svg className="hero-name" viewBox="0 0 1260 300" role="img" aria-label={site.name} preserveAspectRatio="xMidYMid meet">
        <text x="0" y="292" fontSize="392" textLength="1255" lengthAdjust="spacingAndGlyphs">{site.name.toUpperCase()}</text>
      </svg>
      <img className="hero-img" src={portrait} alt="Portrait of Vanshika in a denim jacket under neon light" />
      <p className="hero-left">{site.tagLeft}</p>
      <p className="hero-right">{site.tagRight[0]}<br/>{site.tagRight[1]}</p>
      <div className="hero-social">
        <a href={s.behance} target="_blank" rel="noreferrer" aria-label="Behance"><Behance/></a>
        <a href={s.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a>
        <a href={s.figma} target="_blank" rel="noreferrer" aria-label="Figma"><Figma/></a>
        <a href={s.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github/></a>
      </div>
      <svg className="star" viewBox="-50 -50 100 100" aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => <ellipse key={i} cx="0" cy="-30" rx="6.5" ry="17" transform={`rotate(${i * 45})`}/>)}
      </svg>
    </section>
  )
}
