import React from 'react'
import {Link} from 'react-router-dom'
import './styles/NoteListItem.css'

function DeleteButton({id, name, handleDeleteNote, isPublic}) {

    return (
        <div>
            <div className="note-list-item-parent" key={id}>
                <button className="note-list-item-delete-button" onClick={(e) => handleDeleteNote(e, `${id}`)}>
                    <i className="gg-trash note-list-item-trash-icon"></i>
                </button>
                    {(isPublic) && <Link className="note-list-item-name" to={`/edit/public/${id}`}>{name}</Link>}
                    {(!isPublic) && <Link className="note-list-item-name" to={`/edit/private/${id}`}>{name}</Link>}
            </div>
        </div>
    )
}

export default DeleteButton