import './Home.css'
import {useState, useEffect, useRef} from 'react'
import NoteListItem from '../assets/NoteListItem'
import { gsap } from 'gsap'
import ClipLoader from "react-spinners/ClipLoader"

function Home() {
    const homeParent = useRef()

    const [notesArray, setNotesArray] = useState([])
    const [createNewNoteIconState, setCreateNewNoteIconState] = useState(0)

    const fetchData = () => {
        fetch(`https://jsonserver22.herokuapp.com/database`)
        .then((res) => {
            if(!res.ok){
                throw Error('Could not fetch data from server')
            }
            return res.json()
        })
        .then((data) => {
            setNotesArray(data)
        })
        .catch((error) => {
            console.log(error.message)
        })
    }

    useEffect(() => {
        gsap.from(homeParent.current, {x: "-700px"})
        gsap.to(homeParent.current, {duration: 1, x: "0px", ease: "bounce"})
        fetchData()
    }, [])
    

    const handleAddNewNote = () => {
        setCreateNewNoteIconState(1)
        fetch(`https://jsonserver22.herokuapp.com/database`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "text": "New note body.",
                "name": "New note!"
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
        fetch(`https://jsonserver22.herokuapp.com/database/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'json/application'
            }
        })
        .then((res) => {
            if(res.ok){
                fetchData()
            }
        })
    }

    return (
        <div className='home-parent' ref={homeParent}>  
            <button className="home-button" onClick={handleAddNewNote}>
                {(createNewNoteIconState == 0) && <i className="gg-add-r home-add-icon"></i>}
                {(createNewNoteIconState == 1) && <ClipLoader />}
                Create Note
                </button>
            {notesArray.map((notes) => (
                <NoteListItem handleDeleteNote={handleDeleteNote} key={notes.id} id={notes.id} name={notes.name}/>
            ))}
        </div>
    )
}

export default Home