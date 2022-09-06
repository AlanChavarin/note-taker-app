import './styles/YourNotes.css'
import {useState, useEffect, useRef, useContext} from 'react'
import NoteListItem from '../assets/NoteListItem'
import { gsap } from 'gsap'
import ClipLoader from "react-spinners/ClipLoader"
import StatusBox from '../assets/StatusBox'
import GlobalContext from '../../context/GlobalContext'
import {useNavigate} from 'react-router-dom'
import Info from '../assets/Info'

function YourNotes({isPublic}) {    
    const {GLOBAL_API_URL, loggedInUserData} = useContext(GlobalContext)
    const API_URL = GLOBAL_API_URL + (isPublic ? '/api/publicnotes/' : '/api/privatenotes/')

    const navigate = useNavigate()

    const YourNotes = useRef()
    const [notesArray, setNotesArray] = useState([])
    const [createNewNoteIconState, setCreateNewNoteIconState] = useState(0)
    const [status, setStatus] = useState('')
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        if(!isPublic && !loggedInUserData.name){
            navigate('/accessdenied');
        } else {
            fetchData()
        }
        gsap.from(YourNotes.current, {x: "-100vw"})
        gsap.to(YourNotes.current, {duration: 1, x: "0vw", ease: "bounce"})
    }, [isPublic])

    useEffect(() => {
        setTimeout(() => {
            setStatus('')
        }, 5000)
        setCreateNewNoteIconState(0)
    }, [status])

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
                setIsError(false)
                throw new Error(data.errorMessage)
            }
            setNotesArray(data)
        })
        .catch((error) => {
            setStatus(error.message)
            setIsError(true)
        })
    }
    

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
            setIsError(true)
        })
    }
    return (
        <>
            <div className='yournotes-parent'>
                <StatusBox statusMessage={status} isError={isError}/>
                <div className='yournotes' ref={YourNotes}>  
                    <button className="yournotes-button" onClick={handleAddNewNote}>
                        {(createNewNoteIconState === 0) && <i className="gg-add-r yournotes-add-icon"></i>}
                        {(createNewNoteIconState === 1) && <ClipLoader className='yournotes-cliploader'/>}
                        Create Note
                        </button>
                    {notesArray.map((notes) => (
                        <NoteListItem handleDeleteNote={handleDeleteNote} key={notes._id} id={notes._id} name={notes.name} isPublic={isPublic}/>
                    ))}
                </div>
            </div>
            {(isPublic)
            ? 
            <Info paragraph={<p>These are all public notes! Anyone may create, view, and edit any of these notes. Feel completely free to create any notes you wish. </p>}/>
            : 
            <Info paragraph={<p>These are all your private notes! No one else may see these. Make as many as you wish! </p>}/>
            }
        </>
    )
}

export default YourNotes