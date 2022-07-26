import './About.css'
import {gsap} from 'gsap'
import {useRef, useEffect} from 'react'

function About() {

  const about = useRef()

  useEffect(() => {
    gsap.from(about.current, {x: "-700px"});
    gsap.to(about.current, {duration: 1, x: "0px", ease: "bounce"});
  })

  return (
    <div ref={about} className='about-parent'>
        About
    </div>
  )
}

export default About