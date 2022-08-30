import './YourNotes.css'
import {useState, useEffect, useRef} from 'react'
import NoteListItem from '../assets/NoteListItem'
import { gsap } from 'gsap'
import ClipLoader from "react-spinners/ClipLoader"

function YourNotes() {
    let API_URL
    if(process.env.NODE_ENV === 'production'){
        API_URL = '/api/privatenotes/'
    } else {
        API_URL = 'http://localhost:5000/api/privatenotes/'
    }
    
    const YourNotesParent = useRef()
    const [notesArray, setNotesArray] = useState([])
    const [createNewNoteIconState, setCreateNewNoteIconState] = useState(0)
    const [status, setStatus] = useState('')

    const fetchData = () => {
        fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('user')
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
        gsap.from(YourNotesParent.current, {x: "-700px"})
        gsap.to(YourNotesParent.current, {duration: 1, x: "0px", ease: "bounce"})
        fetchData()
    }, [])
    

    const handleAddNewNote = () => {
        console.log(localStorage.getItem('user'))
        setCreateNewNoteIconState(1)
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('user')
            },
            body: JSON.stringify({
                text: "New note body.",
                name: "New note!"
            })
        })
        .then((res) => {
            if(res.ok){
                fetchData()
                setCreateNewNoteIconState(0)
            }
        })
    }

    const handleDeleteNote = (e, id) => {
        e.preventDefault()
        console.log(id)
        fetch(API_URL, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('user')
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
            <div className='YourNotes-parent' ref={YourNotesParent}>  
                <button className="YourNotes-button" onClick={handleAddNewNote}>
                    {(createNewNoteIconState === 0) && <i className="gg-add-r YourNotes-add-icon"></i>}
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

export default YourNotes