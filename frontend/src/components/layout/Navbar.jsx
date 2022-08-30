import './Navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {

  return (
    <div className='navbar-parent'>
        <div className='navbar-container'>
            <div className='navbar-grid-item navbar-title'>
                <i className="gg-notes navbar-note-icon"></i>
                <div>Note Taker App </div>
            </div>
            <Link  
                to='/publicnotes' 
                className='navbar-grid-item navbar-link'>
                Public Notes
            </Link>
            <Link  
                to='/yournotes' 
                className='navbar-grid-item navbar-link'>
                Your Notes
            </Link>
            <Link 
                to='/register' 
                className='navbar-grid-item navbar-link'>
                Register
            </Link>
            <Link 
                to='/login' 
                className='navbar-grid-item navbar-link'>
                Login
            </Link>
            <Link 
                to='/me' 
                className='navbar-grid-item navbar-link'>
                My Profile
            </Link>
            <Link 
                to='/about' 
                className='navbar-grid-item navbar-link'>
                About
            </Link>
        </div>
    </div>
  )
}

export default Navbar