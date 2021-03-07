import React from 'react';

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
                <p className="content-preview">{props.note.content}</p>
            </div>
            <button onClick={clickDelete} className="delete">Delete</button>
        </div>
    )
}
