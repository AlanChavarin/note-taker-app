import './PublicNotes.css'
import {useState, useEffect, useRef} from 'react'
import NoteListItem from '../assets/NoteListItem'
import { gsap } from 'gsap'
import ClipLoader from "react-spinners/ClipLoader"

function PublicNotes() {
    let API_URL
    if(process.env.NODE_ENV === 'production'){
        API_URL = '/api/notes/'
    } else {
        API_URL = 'http://localhost:5000/api/notes/'
    }
    
    const PublicNotesParent = useRef()
    const [notesArray, setNotesArray] = useState([])
    const [createNewNoteIconState, setCreateNewNoteIconState] = useState(0)
    const [status, setStatus] = useState('')

    const fetchData = () => {
        fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            }
        })
        .then((res) => {
            if(!res.ok){
                throw Error('Could not fetch data from server')
            }
            return res.json()
        })
        .then((data) => {
            if(data.errorMessage){
                throw new Error(data.errorMessage)
            }
            setNotesArray(data)
        })
        .catch((error) => {
            console.log(error.message)
        })
    }

    useEffect(() => {
        gsap.from(PublicNotesParent.current, {x: "-700px"})
        gsap.to(PublicNotesParent.current, {duration: 1, x: "0px", ease: "bounce"})
        fetchData()
    }, [])
    

    const handleAddNewNote = () => {
        setCreateNewNoteIconState(1)
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Public': 'true'
            },
            body: JSON.stringify({
                text: "New public note body.",
                name: "New public note!",
                public: true
            })
        })
        .then((res) => {
            if(res.ok){
                fetchData()
                setCreateNewNoteIconState(0)
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
        })
    }

    const handleDeleteNote = (e, id) => {
        e.preventDefault()
        console.log(id)
        fetch(API_URL, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Public': 'true'
            },
            body: JSON.stringify({
                "id": id
            })
        })
        .then((res) => {
            if(res.ok){
                fetchData()
                setStatus('Note deleted!')
            }
            return res.json()
        })
        .then((data) => {
            console.log(data)
            if(data.errorMessage){
                throw new Error(data.errorMessage)
            }
        })
        .catch((error) => {
            setStatus(error.message)
        })
    }
    return (
        <div>
            <div className='PublicNotes-parent' ref={PublicNotesParent}>  
                <button className="PublicNotes-button" onClick={handleAddNewNote}>
                    {(createNewNoteIconState === 0) && <i className="gg-add-r PublicNotes-add-icon"></i>}
                    {(createNewNoteIconState === 1) && <ClipLoader />}
                    Create Note
                    </button>
                {notesArray.map((notes) => (
                    <NoteListItem handleDeleteNote={handleDeleteNote} key={notes._id} id={notes._id} name={notes.name}/>
                ))}
            </div>
            <div>{status}</div>
        </div>
    )
}

export default PublicNotes