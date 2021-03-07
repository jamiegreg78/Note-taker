import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';


export default function Editor(props) {
    const [text, setText] = useState("");


    // Debounces the saving, prevents too much happening at once
    const autoSave = useCallback(
        debounce(input => props.saveNote(props.note.id, input), 1500),
        [],
    );

    const handleChange = (event) => {
        setText(event.target.value);

        console.log(props)
        autoSave(event.target.value);
    }


    // Initialize the text field, updates when the note updates
    useEffect(() => {
        setText(props.note.content);
    }, [props.note])


    return (
        <div className="note-container">
            <div className="editor-container">
                <div className="editor-controls">
                    <button className="editor-button"></button>
                    <button className="editor-button"></button>
                    <button className="editor-button"></button>
                    <button className="editor-button"></button>
                    <button className="editor-button"></button>
                </div>
                <textarea
                    className="editor"
                    value={text}
                    onChange={handleChange}
                >
                </textarea>
            </div>
        </div>
    )
}