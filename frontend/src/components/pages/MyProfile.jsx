import './styles/MyProfile.css'
import {useEffect, useState, useRef} from 'react'
import {gsap} from 'gsap'

function MyProfile() {
    let API_URL
    if(process.env.NODE_ENV === 'production'){
        API_URL = '/api/users/me'
    } else {
        API_URL = 'http://localhost:5000/api/users/me'
    }

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const parent = useRef()

    useEffect(() => {

        gsap.from(parent.current, {y: "100vw"})
        gsap.to(parent.current, {duration: 1, y: "0vw"})


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
        <div className='myprofile-parent' ref={parent}>
            <div className='myprofile-item'>Name: {name}</div>
            <div className='myprofile-item'>Email: {email}</div>
        </div>
    )
}
export default MyProfile