import './styles/Logout.css'
import {useEffect, useContext} from 'react'
import GlobalContext from '../../context/GlobalContext'
import StatusBox from '../assets/StatusBox'

function Logout() {
    const {updateLoggedInUserData} = useContext(GlobalContext)

    useEffect(() => {
        localStorage.removeItem('user')
        updateLoggedInUserData()
    }, [])

    return (
        <div className='logout-parent'>
            <StatusBox statusMessage={'You have successfully been logged out!'}/>
        </div>
    )
}
export default Logout