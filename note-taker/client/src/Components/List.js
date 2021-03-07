import React from 'react';
import ListItem from './ListItem';
import NewNote from './NewNote';

export default function List(props) {

    return (
        <div className="file-list">
            <NewNote createNote={props.createNote} />
            { props.notes.map(item => {
                return <ListItem
                    note={item}
                    key={item.id}
                    deleteNote={props.deleteNote}
                    selectNote={props.selectNote}/>
            })}
        </div>
    )
}
