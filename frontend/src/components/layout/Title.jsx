import {Route, Routes} from 'react-router-dom'
import './styles/Title.css'
import {gsap} from 'gsap'
import {useRef} from 'react'
import { useEffect } from 'react'

function Title() {

  const h1 = useRef()

  useEffect(() => {
    gsap.from(h1.current, {y: "-10vh"})
    gsap.to(h1.current, {y: "0vh", duration: 1, ease: "bounce"})
  }, [])

  return (
    <div className='title-parent'>
        <h1 className='title-h1' ref={h1}>
            <Routes>
              <Route path='/' element='Welcome to my Note Taker app!' /> 
              <Route path='/notes/public' element='Public Notes' /> 
              <Route path='/notes/private' element='Your Notes' /> 
              <Route path='/edit/*' element='Edit' /> 
              <Route path='/register' element='Register' /> 
              <Route path='/login' element='Login' /> 
              <Route path='/logout' element='Logout' /> 
              <Route path='/me' element='My Details' /> 
              <Route path='/accessdenied' element='Access Denied' /> 
              <Route path='/*' element='Not Found' /> 
            </Routes>
        </h1>
    </div>
  )
 }

export default Title