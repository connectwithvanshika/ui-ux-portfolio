
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import SmoothScroll from './components/SmoothScroll.jsx'
import { Analytics } from '@vercel/analytics/react'

import {
  About,
  Education,
  Works,
  OtherProjects,
  Process,
  Tech,
  Experience,
  Personality,
  Contact
} from './components/Sections.jsx'

export default function App() {
  return (
    <>
      <Analytics />

      <SmoothScroll>
        <Nav />

        <main>
          <Hero />
          <About />
          <Education />
          <Works />
          <OtherProjects />
          <Process />
          <Tech />
          <Experience />
          <Personality />
          <Contact />
        </main>
      </SmoothScroll>
    </>
  )
}
