import './styles/Navbar.css'
import { Link } from 'react-router-dom'
import {useContext} from 'react'
import GlobalContext from '../../context/GlobalContext'

function Navbar() {
    const {loggedInUserData} = useContext(GlobalContext)

    return (
        <div className='navbar-parent'>
            <Link className='navbar-grid-item navbar-title' to='/'>
                <i className="gg-notes navbar-note-icon"></i>
                <div>Note Taker App </div>
            </Link>
            <Link  
                to='/notes/public' 
                className='navbar-grid-item navbar-link'>
                Public Notes
            </Link>
            {(loggedInUserData.name) 
            &&
            <Link  
                to='/notes/private' 
                className='navbar-grid-item navbar-link'>
                Your Notes
            </Link>
            }
            {(!loggedInUserData.name) && 
            <Link 
                to='/register' 
                className='navbar-grid-item navbar-link'>
                Register
            </Link>
            }
            {(!loggedInUserData.name) 
            &&
            <Link 
                to='/login' 
                className='navbar-grid-item navbar-link'>
                Login
            </Link> 
            }
            {(loggedInUserData.name) && 
            <Link 
                to='/me' 
                className='navbar-grid-item navbar-link'>
                My Details
            </Link>
            }
        </div>
  )
}

export default Navbar