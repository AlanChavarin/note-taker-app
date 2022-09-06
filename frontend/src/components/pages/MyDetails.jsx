import './styles/MyDetails.css'
import {useEffect, useState, useRef, useContext} from 'react'
import {gsap} from 'gsap'
import GlobalContext from '../../context/GlobalContext'
import {useNavigate} from 'react-router-dom'

function MyDetails() {
    const {loggedInUserData, updateLoggedInUserData} = useContext(GlobalContext)
    const navigate = useNavigate()
    const parent = useRef()

    useEffect(() => {
        updateLoggedInUserData()
        if(!loggedInUserData.name){
            navigate('/accessdenied')
        }
        gsap.from(parent.current, {y: "100vw"})
        gsap.to(parent.current, {duration: 1, y: "0vw"})

    }, [])

    return (
        <>
            <div className='mydetails-parent' ref={parent}>
                <div className='mydetails-item'>Name: {loggedInUserData.name}</div>
                <div className='mydetails-item'>Email: {loggedInUserData.email}</div>
            </div>
        </>
    )
}
export default MyDetails