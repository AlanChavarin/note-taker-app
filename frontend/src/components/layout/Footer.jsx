import './styles/Footer.css'
import GlobalContext from '../../context/GlobalContext'
import {useContext} from 'react'
import { Link } from 'react-router-dom'
import { MdLogout } from 'react-icons/md';

function Footer() {
  const {loggedInUserData} = useContext(GlobalContext)

  return (
    <div className='footer-parent'>
        <div className='footer-item footer-loggedin'>
          {(loggedInUserData.name) ? `Logged in as ${loggedInUserData.name}` : `Not logged in`}    
        </div>
        <p className='footer-item'>Copyright &copy; 2022 Alan Chavarin, all rights reserved</p>
        {(loggedInUserData.name) && 
          <Link
            to='/logout' 
            className='footer-item footer-logout'>
            <div>
              Logout
            </div>
             <MdLogout />
          </Link> 
        }
    </div>
  )
}

export default Footer