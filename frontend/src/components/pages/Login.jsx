import './styles/Register.css'
import {useState, useRef, useEffect, useContext} from 'react'
import {gsap} from 'gsap'
import ClipLoader from "react-spinners/ClipLoader"
import {FaCheck} from 'react-icons/fa'
import StatusBox from '../assets/StatusBox'
import GlobalContext from '../../context/GlobalContext'
import Info from '../assets/Info'

function Register() {
    const {GLOBAL_API_URL, updateLoggedInUserData} = useContext(GlobalContext)
    const API_URL = GLOBAL_API_URL + '/api/users/login'
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [formStatus, setFormStatus] = useState('')
    const [submitButtonState, setSubmitButtonState] = useState(0)
    const [isError, setIsError] = useState(false)
    
    const form = useRef()
    
    useEffect(() =>{
        gsap.from(form.current, {x: "-100vw"})
        gsap.to(form.current, {duration: 1, x: "0vw", ease: "bounce"})
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitButtonState(1)
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then((res) => {
            if(res.ok){
                setSubmitButtonState(2)
                setFormStatus('Login Successful!')
                setIsError(false)
            }
            return res.json()
        })
        .then((data) => {
            if(data.errorMessage){
                throw new Error(data.errorMessage)
            } else {
                localStorage.setItem('user', data.token)
                updateLoggedInUserData()
            }
        })
        .catch((error) => {
            setFormStatus(error.message)
            setIsError(true)
        })

        setTimeout(() => {
            setSubmitButtonState(0)
        }, 1000)
    }

    return (
        <>
            <div className='register-parent'>  
                <StatusBox statusMessage={formStatus} isError={isError}/>
                <form className='register-form' onSubmit={handleSubmit} ref={form}>
                    <input className='register-input' type="email" placeholder='Email' value={email} 
                    onChange={e => setEmail(e.target.value)}  required/>
                    <input className='register-input' type="password" placeholder='Password' value={password}
                    onChange={e => setPassword(e.target.value)}  required/>
                    <button className="register-button register-form-item" type="submit">
                        {(submitButtonState === 0) && <div>submit</div>}
                        {(submitButtonState === 1) && <ClipLoader size={10}/>}
                        {(submitButtonState === 2) && <FaCheck/>}
                    </button>
                </form>
            </div>
            <Info paragraph={<p>This is the login page! After you login you will have access to your private notes.</p>}/>
        </>
    )
}
export default Register