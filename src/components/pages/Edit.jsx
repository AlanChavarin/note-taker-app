import './Edit.css'
import {useState, useEffect, useRef} from 'react'
import {useParams} from 'react-router-dom'
import { gsap } from 'gsap'
import ClipLoader from "react-spinners/ClipLoader"
import {FaCheck} from 'react-icons/fa'

function Edit() {
    const [fetchedNote, setFetchedNote] = useState('')
    const [fetchedName, setFetchedName] = useState('')
    const [submitButtonState, setSubmitButtonState] = useState(0)
    const {id} = useParams()
    const form = useRef()

    useEffect(() => {

        console.log(submitButtonState)

        gsap.from(form.current, {x: "-700px"})
        gsap.to(form.current, {duration: 1, x: "0px", ease: "bounce"})

        fetch(`http://localhost:5000/notes/${id}`)
        .then((r) => r.json())
        .then((data) => {
            setFetchedNote(data.text)
            setFetchedName(data.name)
        })

    }, [])

    

    const handleSubmit = (e) => {
        setSubmitButtonState(1)
        e.preventDefault()
        const value = e.target.querySelector("#note-body").value
        const valueName = e.target.querySelector("#note-name").value
        fetch(`http://localhost:5000/notes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "text": value,
                "name": valueName
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
                <input className="edit-note-name" maxlength="20" type="text" id="note-name" defaultValue={fetchedName} />
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