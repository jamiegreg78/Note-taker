import React, { useState } from 'react';


export default function NewNote(props) {
    const [newTitle, setNewTitle] = useState("");

    function handleChange(event) {
        setNewTitle(event.target.value);
    }

    function newNote(event) {
        event.preventDefault();
        if (newTitle !== "") {
            setNewTitle("");
            props.createNote(newTitle);
        } else {
            alert("Title cannot be blank")
        }

    }

    return (
        <div>
            <form>
                <input type="text"
                    value={newTitle}
                    onChange={handleChange}
                    placeholder="Title">
                </input>
                <button className="new-note" onClick={newNote}> New Note</button>

            </form>
        </div>
    )
}