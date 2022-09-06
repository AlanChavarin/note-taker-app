import './styles/Edit.css'
import {useState, useEffect, useRef, useContext} from 'react'
import {useParams} from 'react-router-dom'
import { gsap } from 'gsap'
import ClipLoader from "react-spinners/ClipLoader"
import {FaCheck} from 'react-icons/fa'
import StatusBox from '../assets/StatusBox'
import GlobalContext from '../../context/GlobalContext'
import {useNavigate} from 'react-router-dom'

function Edit({isPublic}) {
    const {GLOBAL_API_URL, loggedInUserData} = useContext(GlobalContext)
    const API_URL = GLOBAL_API_URL + (isPublic ? '/api/publicnotes/' : '/api/privatenotes/')
    const navigate = useNavigate()

    
    const [noteName, setNoteName] = useState('')
    const [noteBody, setNoteBody] = useState('')
    const [submitButtonState, setSubmitButtonState] = useState(0)

    const [status, setStatus] = useState('')
    const [isError, setIsError] = useState(false)

    const {id} = useParams()
    const form = useRef()

    useEffect(() => {
        if(!isPublic && !loggedInUserData.name){
            navigate('/accessdenied')
        } else {
            fetchData() 
        }
        gsap.from(form.current, {x: "-100vw"})
        gsap.to(form.current, {duration: 1, x: "0vw", ease: "bounce"})
       
    }, [])

    const fetchData = () => {
        fetch(API_URL + id, {
            method: 'GET',
            headers: {
                "Content-type" : "application/json",
                "authorization": "Bearer " + localStorage.getItem('user')
            }
        })
        .then((res) => {
            if(res.ok){
                setIsError(false)
            }
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
            setStatus(error.message)
            setIsError(true)
        })
    }

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
            setStatus(error.message)
            setIsError(true)
        })

        setTimeout(() => {
            setSubmitButtonState(0)
        }, 1000)
    }

    return (
        <div className='edit-form-parent'>
            <StatusBox statusMessage={status} isError={isError}/>
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