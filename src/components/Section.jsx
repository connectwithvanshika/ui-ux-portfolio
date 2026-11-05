import Reveal from './Reveal.jsx'
export default function Section({ id, n, title, tone = 'a', children }) {
  return (
    <section id={id} className={`sec tone-${tone}`}>
      <div className="wrap">
        <Reveal><header className="sec-head"><span className="sec-n">{n}</span><h2>{title}</h2></header></Reveal>
        {children}
      </div>
    </section>
  )
}
