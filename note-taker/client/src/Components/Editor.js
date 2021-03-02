import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';


export default function Editor(props) {
    const [text, setText] = useState("");

    function handleChange(event) {
        setText(event.target.value);
    }

    useEffect(() => {
        setText(props.note.content);
    }, [props.note])

    return (
        <div className="editor-container">
            <textarea
                className="editor"
                value={text}
                onChange={handleChange}
            >
            </textarea>
            <ReactMarkdown children={text} className="parsed-results" />
        </div>
    )
}