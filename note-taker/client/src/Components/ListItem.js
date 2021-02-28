import React from 'react';

export default function ListItem (props) {


    return (
        <div className="list-item">
            <p>{props.note.title}</p>
            <button onClick={() => props.deleteNote(props.note.id)}>Delete</button>
        </div>
    ) 
}
