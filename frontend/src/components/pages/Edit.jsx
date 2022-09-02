import './styles/Edit.css'
import {useState, useEffect, useRef} from 'react'
import {useParams} from 'react-router-dom'
import { gsap } from 'gsap'
import ClipLoader from "react-spinners/ClipLoader"
import {FaCheck} from 'react-icons/fa'

function Edit({isPublic}) {
    let API_URL
    if(process.env.NODE_ENV === 'production'){
        if(isPublic){
            API_URL = '/api/publicnotes/'
        } else {
            API_URL = '/api/privatenotes/'
        }
    } else {
        if(isPublic){
            API_URL = 'http://localhost:5000/api/publicnotes/'
        } else {
            API_URL = 'http://localhost:5000/api/privatenotes/'
        }
    }
    const [noteName, setNoteName] = useState('')
    const [noteBody, setNoteBody] = useState('')
    const [submitButtonState, setSubmitButtonState] = useState(0)
    const {id} = useParams()
    const form = useRef()

    useEffect(() => {

        gsap.from(form.current, {x: "-100vw"})
        gsap.to(form.current, {duration: 1, x: "0vw", ease: "bounce"})

        fetch(API_URL + id, {
            method: 'GET',
            headers: {
                "Content-type" : "application/json",
                "authorization": "Bearer " + localStorage.getItem('user')
            }
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            if(data.errorMessage){
                throw new Error(data.errorMessage)
            } else {
                setNoteName(data.name)
                setNoteBody(data.text)
            }
        })
        .catch((error) => {
            setNoteName('error')
            setNoteBody(error.message)
        })

    }, [])

    const handleSubmit = (e) => {
        setSubmitButtonState(1)
        e.preventDefault()
        fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                "authorization": "Bearer " + localStorage.getItem('user')
            },
            body: JSON.stringify({
                "name": noteName,
                "text": noteBody,
                "id": id
            })
        })
        .then((res) => {
            if(res.ok){
                setSubmitButtonState(2)
            }
            return res.json()
        })
        .then((data) => {
            if(data.errorMessage){
                throw new Error(data.errorMessage)
            }
        })
        .catch((error) => {
            setNoteName('error')
            setNoteBody(error.message)
        })

        setTimeout(() => {
            setSubmitButtonState(0)
        }, 1000)
    }

    return (
        <div>
            <form ref={form} className='edit-form' onSubmit={handleSubmit}>
                <input className="edit-note-name" maxLength="20" type="text" value={noteName} onChange={e => setNoteName(e.target.value)}/>
                <textarea className="edit-note-body" cols="40" rows="15" value={noteBody} onChange={e => setNoteBody(e.target.value)}></textarea>
                <button className="edit-note-submit" type="submit">
                    {(submitButtonState === 0) && <div>submit</div>}
                    {(submitButtonState === 1) && <ClipLoader size={10}/>}
                    {(submitButtonState === 2) && <FaCheck/>}
                </button>
                
            </form>
        </div>
  )
}

export default Edit