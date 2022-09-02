import './styles/About.css'
import {gsap} from 'gsap'
import {useRef, useEffect} from 'react'

function About() {

  const about = useRef()

  useEffect(() => {
    gsap.from(about.current, {y: "100vh"});
    gsap.to(about.current, {duration: 1, y: "0vh"});
  })

  return (
    <div ref={about} className='about-parent'>
        About
    </div>
  )
}

export default About