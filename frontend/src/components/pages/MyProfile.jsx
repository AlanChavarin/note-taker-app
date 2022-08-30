import './MyProfile.css'
import {useEffect, useState} from 'react'

function MyProfile() {
    let API_URL
    if(process.env.NODE_ENV === 'production'){
        API_URL = '/api/users/me'
    } else {
        API_URL = 'http://localhost:5000/api/users/me'
    }

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        const user = localStorage.getItem('user')
        if(user){
            fetch(API_URL, {
                method: 'GET',
                headers: {
                    'authorization': 'Bearer ' + user
                }
            })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                } else {
                    setName(data.name)
                    setEmail(data.email)
                }
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }, [])

    return (
        <div className='myprofile-parent'>
            <div>Name: {name}</div>
            <div>Email: {email}</div>
        </div>
    )
}
export default MyProfile