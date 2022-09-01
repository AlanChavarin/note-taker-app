import './styles/Register.css'
import {useState} from 'react'

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
    

    const handleSubmit = (e) => {
        e.preventDefault()
        if(password === password2){
            //console.log(name, email, password, password2)
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
            <form className='register-form' onSubmit={handleSubmit}>
                <input type="text" placeholder='Name' value={name} 
                onChange={e => setName(e.target.value)} required/>
                <input type="email" placeholder='Email' value={email} 
                onChange={e => setEmail(e.target.value)}  required/>
                <input type="password" placeholder='Password' value={password}
                onChange={e => setPassword(e.target.value)}  required/>
                <input type="password" placeholder='Confirm Password' value={password2}
                onChange={e => setPassword2(e.target.value)}  required/>
                <button type='submit'>Submit</button>
            </form>
            <div>{formStatus}</div>
        </div>
    )
}
export default Register