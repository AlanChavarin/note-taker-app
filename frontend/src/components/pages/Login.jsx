import './Login.css'
import {useState} from 'react'

function Register() {
    let API_URL
    if(process.env.NODE_ENV === 'production'){
        API_URL = '/api/users/login'
    } else {
        API_URL = 'http://localhost:5000/api/users/login'
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [formStatus, setFormStatus] = useState('')
    

    const handleSubmit = (e) => {
        e.preventDefault()
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
                setFormStatus('Login Successful!')
            }
            return res.json()
        })
        .then((data) => {
            if(data.errorMessage){
                throw new Error(data.errorMessage)
            } else {
                localStorage.setItem('user', data.token)
            }
            
        })
        .catch((error) => {
            setFormStatus(error.message)
        })
    }

    return (
        <div>
            <form className='register-form' onSubmit={handleSubmit}>
                <input type="email" placeholder='Email' value={email} 
                onChange={e => setEmail(e.target.value)}  required/>
                <input type="password" placeholder='Password' value={password}
                onChange={e => setPassword(e.target.value)}  required/>
                <button type='submit'>Submit</button>
            </form>
            <div>{formStatus}</div>
        </div>
    )
}
export default Register