import React, { useState } from 'react';


export default function NewNote(props) {
    const [newTitle, setNewTitle] = useState("");
    const [buttonMode, setButtonMode] = useState(0);

    const handleChange = (event) => {
        setNewTitle(event.target.value);
    }

    const createNote = (event) => {
        event.preventDefault();
        if (newTitle !== "") {
            setNewTitle("");
            props.createNote(newTitle);

            switchButtonMode();
        } else {
            alert("Title cannot be blank")
        }

    }

    const switchButtonMode = () => {
        // show the text field and add note button
        if (!buttonMode) {
            document.getElementById("new-note-title").style.display = "inline-block";
            document.getElementById("add-note").style.display = "inline-block";
            document.getElementById("create-new-note").style.display = "none";

            setButtonMode(1);
        } else {
            document.getElementById("new-note-title").style.display = "none";
            document.getElementById("add-note").style.display = "none";
            document.getElementById("create-new-note").style.display = "inline-block";

            setButtonMode(0);
        }
    }


    const newNote = (event) => {
        event.preventDefault();
        switchButtonMode();
    }

    return (
        <div>
            <form>
                <input
                    id="new-note-title"
                    type="text"
                    value={newTitle}
                    maxLength="100"
                    onChange={handleChange}
                    placeholder="Title"
                    style={{ display: "none" }}>

                </input>
                <button className="new-note" id="add-note" onClick={createNote} style={{ display: "none" }}>Create Note</button>
                <button className="new-note" id="create-new-note" onClick={newNote}>New Note</button>

            </form>
        </div>
    )
}