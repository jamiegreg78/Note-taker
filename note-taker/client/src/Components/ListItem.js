import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


export default function ListItem(props) {

    /* Stops the click event propagating to the parent - prevents selecting after deletion
    */
    const clickDelete = (event) => {
        event.stopPropagation();
        props.deleteNote(props.note.id);
    }

    return (
        <div className="list-item" onClick={() => props.selectNote(props.note.id)}>
            <div className="item-overview">
                <p>{props.note.title}</p>
            </div>
            <button onClick={clickDelete} className="delete">
                <FontAwesomeIcon icon={faTrash} size="2x" />
            </button>
        </div>
    )
}
