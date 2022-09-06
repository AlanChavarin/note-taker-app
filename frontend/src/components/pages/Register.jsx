import './styles/Register.css'
import {useState, useRef, useEffect, useContext} from 'react'
import {gsap} from 'gsap'
import ClipLoader from "react-spinners/ClipLoader"
import {FaCheck} from 'react-icons/fa'
import StatusBox from '../assets/StatusBox'
import GlobalContext from '../../context/GlobalContext'
import {Link} from 'react-router-dom'
import Info from '../assets/Info'
 
function Register() {
    const {GLOBAL_API_URL} = useContext(GlobalContext)
    const API_URL = GLOBAL_API_URL + '/api/users/register'


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const [formStatus, setFormStatus] = useState('')
    const [submitButtonState, setSubmitButtonState] = useState(0)
    const [isError, setIsError] = useState(false)

    const form = useRef()
    const p = useRef()
    
    useEffect(() =>{
        gsap.from(form.current, {x: "-100vw"})
        gsap.to(form.current, {duration: 1, x: "0vw", ease: "bounce"})
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitButtonState(1)
        if(password === password2){
            fetch(API_URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            })
            })
            .then((res) => {
                if(res.ok){
                    setFormStatus('Registration successful!')
                    setSubmitButtonState(2)
                    setIsError(false)
                }
                return res.json()
            })
            .then((data) => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
            })
            .catch((error) => {
                setFormStatus(error.message)
                setIsError(true)
            })
        }
        else{
            setFormStatus('Error! Please double check your passwords match!')
            setIsError(true)
        }

        setTimeout(() => {
            setSubmitButtonState(0)
        }, 1000)
        
    }

    return (
        <>
            <div className='register-parent'>
                <StatusBox statusMessage={formStatus} isError={isError}/>
                <form className='register-form' onSubmit={handleSubmit} ref={form}>
                    <input className='register-input register-form-item' type="text" placeholder='Name' value={name} 
                    onChange={e => setName(e.target.value)} required/>
                    <input className='register-input register-form-item' type="email" placeholder='Email' value={email} 
                    onChange={e => setEmail(e.target.value)}  required/>
                    <input className='register-input register-form-item' type="password" placeholder='Password' value={password}
                    onChange={e => setPassword(e.target.value)}  required/>
                    <input className='register-input register-form-item' type="password" placeholder='Confirm Password' value={password2}
                    onChange={e => setPassword2(e.target.value)}  required/>
                    <button className="register-button register-form-item" type="submit">
                        {(submitButtonState === 0) && <div>submit</div>}
                        {(submitButtonState === 1) && <ClipLoader size={10}/>}
                        {(submitButtonState === 2) && <FaCheck/>}
                    </button>
                </form>
            </div>
            <Info paragraph={<p>This is the registration page! Keep in mind you don't have to enter your real email. There are no real password requirements. After registering, you will have to head over to <Link className='home-link' to='/login'>Login</Link> to login afterwards.</p>}/>
        </>
    )
}
export default Register