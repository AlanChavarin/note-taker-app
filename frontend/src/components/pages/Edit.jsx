import './Edit.css'
import {useState, useEffect, useRef} from 'react'
import {useParams} from 'react-router-dom'
import { gsap } from 'gsap'
import ClipLoader from "react-spinners/ClipLoader"
import {FaCheck} from 'react-icons/fa'

function Edit() {
    let API_URL
    if(process.env.NODE_ENV === 'production'){
        API_URL = '/api/notes/'
    } else {
        API_URL = 'http://localhost:5000/api/notes/'
    }
    const [fetchedNote, setFetchedNote] = useState('')
    const [fetchedName, setFetchedName] = useState('')
    const [submitButtonState, setSubmitButtonState] = useState(0)
    const {id} = useParams()
    const form = useRef()

    useEffect(() => {

        gsap.from(form.current, {x: "-700px"})
        gsap.to(form.current, {duration: 1, x: "0px", ease: "bounce"})

        fetch(API_URL + id, {
            method: 'GET',
            headers: {
                "Content-type" : "application/json"
            }
        })
        .then((r) => r.json())
        .then((data) => {
            setFetchedNote(data[0].text)
            setFetchedName(data[0].name)
        })

    }, [])

    

    const handleSubmit = (e) => {
        setSubmitButtonState(1)
        e.preventDefault()
        const value = e.target.querySelector("#note-body").value
        const valueName = e.target.querySelector("#note-name").value
        fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "text": value,
                "name": valueName,
                "id": id
            })
        }).then((res) => {
            if(res.ok){
                console.log('updated')
                setSubmitButtonState(2)
            }
        })
        setTimeout(() => {
            setSubmitButtonState(0)
        }, 1000)
    }

    return (
        <div>
            <form ref={form} className='edit-form' onSubmit={handleSubmit}>
                <input className="edit-note-name" maxLength="20" type="text" id="note-name" defaultValue={fetchedName} />
                <textarea className="edit-note-body" name="" id="note-body" cols="40" rows="15" defaultValue={fetchedNote} ></textarea>
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