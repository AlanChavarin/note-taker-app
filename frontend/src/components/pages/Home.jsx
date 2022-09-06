import {gsap} from 'gsap'
import {useEffect, useRef} from 'react'
import {BiNote, BiLogIn} from 'react-icons/bi'
import {MdPublic} from 'react-icons/md'
import {FiLogIn} from 'react-icons/fi'
import './styles/Home.css'
import {Link} from 'react-router-dom'

function Home() {

    const parent = useRef()
    useEffect(() => {
        gsap.from(parent.current, {y: "-100vh"})
        gsap.to(parent.current, {duration: 1, y: "0vw", ease: "bounce"})
    }, [])

    return (
        <div className='home-parent' ref={parent}>
            <h3 className='home-h3'>
                <i className="gg-notes home-icon home-h3icon"></i> 
                <div>
                    Welcome to my Note Taker app!!! 
                </div>
                <i className="gg-notes home-icon home-h3icon"></i>
            </h3>
            <p className='home-p'>
                <BiNote className='home-icon' /> As the name obviously implies, this app simply lets you create create, edit, and save your notes!
            </p>
            <p className='home-p'>
                <MdPublic className='home-icon'/> The <Link className='home-link' to='/notes/public'>Public Notes</Link> area requires no sign in at all, and lets you create, edit, and access notes made by anyone. Feel free to read and make any notes you like!
            </p>
            <p className='home-p'>
                <BiLogIn className='home-icon' /> Feel free to <Link className='home-link' to='/register'>Register</Link> You don't need to enter a real email or a real name.
            </p>
            <p className='home-p'>
                <FiLogIn className='home-icon' /> After you <Link className='home-link' to='/login'>Login</Link>, you will see "private notes" at the navbar on top. Private notes there are accessible only to you. 
            </p>
            
        </div>
  )
}
export default Home