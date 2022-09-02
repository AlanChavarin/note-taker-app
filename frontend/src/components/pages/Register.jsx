import './styles/Register.css'
import {useState, useRef, useEffect} from 'react'
import {gsap} from 'gsap'

function Register() {
    let API_URL
    if(process.env.NODE_ENV === 'production'){
        API_URL = '/api/users/register'
    } else {
        API_URL = 'http://localhost:5000/api/users/register'
    }


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const [formStatus, setFormStatus] = useState('')

    const form = useRef()
    
    useEffect(() =>{
        gsap.from(form.current, {x: "100vw"})
        gsap.to(form.current, {duration: 1, x: "0vw", ease: "bounce"})
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
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
                }
                return res.json()
            })
            .then((data) => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
            })
            .catch((error) => {
                console.log(error.message)
                setFormStatus(error.message)
            })
        }
        else{
            setFormStatus('Error! Please double check your passwords match!')
        }
        
    }

    return (
        <div>
            <form className='register-form' onSubmit={handleSubmit} ref={form}>
                <input className='register-input register-form-item' type="text" placeholder='Name' value={name} 
                onChange={e => setName(e.target.value)} required/>
                <input className='register-input register-form-item' type="email" placeholder='Email' value={email} 
                onChange={e => setEmail(e.target.value)}  required/>
                <input className='register-input register-form-item' type="password" placeholder='Password' value={password}
                onChange={e => setPassword(e.target.value)}  required/>
                <input className='register-input register-form-item' type="password" placeholder='Confirm Password' value={password2}
                onChange={e => setPassword2(e.target.value)}  required/>
                <button className='register-button register-form-item' type='submit'>Submit</button>
            </form>
            <div className='register-form-status'>{formStatus}</div>
        </div>
    )
}
export default Register