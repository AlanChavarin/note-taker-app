import React from 'react'
import {Link} from 'react-router-dom'
import './NoteListItem.css'

function DeleteButton({id, name, handleDeleteNote, isPublic}) {

    return (
        <div>
            <div className="note-list-item-parent" key={id}>
                <button className="note-list-item-delete-button" onClick={(e) => handleDeleteNote(e, `${id}`)}>
                    <i className="gg-trash note-list-item-trash-icon"></i>
                </button>
                    {(!isPublic) && <Link className="note-list-item-name" to={`/edit/${id}`}>{name}</Link>}
                    {(isPublic) && <Link className="note-list-item-name" to={`/editpublic/${id}`}>{name}</Link>}
            </div>
        </div>
    )
}

export default DeleteButton