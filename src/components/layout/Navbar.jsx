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
                to='/' 
                className='navbar-grid-item navbar-link'
            >
                Home
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