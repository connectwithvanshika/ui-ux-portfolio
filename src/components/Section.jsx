import Reveal from './Reveal.jsx'

export function SpinningFlower({ className = 'section-flower' }) {
  return (
    <svg className={className} viewBox="-50 -50 100 100" aria-hidden="true">
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse key={i} cx="0" cy="-30" rx="6.5" ry="17" transform={`rotate(${i * 45})`} />
      ))}
    </svg>
  )
}

export default function Section({ id, n, title, tone = 'a', children }) {
  return (
    <section id={id} className={`sec tone-${tone}`}>
      <div className="wrap">
        <Reveal>
          <header className="sec-head">
            <span className="sec-n">{n}</span>
            <h2>
              <SpinningFlower />
              {title}
            </h2>
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  )
}
