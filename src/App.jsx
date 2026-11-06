import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import { Analytics } from '@vercel/analytics/react';
import {
  About, Education, Works, Process,
  Tech, Experience, Personality, Contact
} from './components/Sections.jsx'
export default function App() {
  return (<><Analytics/><Nav/><main><Hero/><About/><Education/><Works/><Process/><Tech/><Experience/><Personality/><Contact/></main></>)
}
