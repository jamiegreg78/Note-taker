import React, { useState, useEffect, useCallback } from 'react';
import ReactQuill from 'react-quill';
import debounce from 'lodash.debounce';
import 'react-quill/dist/quill.snow.css';
import SaveNotification from './SaveNotification';


export default function NoteEditor(props) {
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'ordered' }, { 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'link': 'image' }],
            ['clean']
        ]
    }

    // Initialize the text field, updates when the note updates
    useEffect(() => {
        setLoaded(false);
        setId(props.note.id);
        setText(props.note.content);
        setTitle(props.note.title);
    }, [props.note])

    useEffect(() => {
        setLoaded(true);
    }, [id, title, text])

    // Debounces the saving, prevents too much happening at once
    const autoSave =
        useCallback(
            debounce(input => {
                props.saveNote(props.note.id, ...input);

                // Shows and hides the save notification
                setShowNotification(true);
                setTimeout(() => {
                    setShowNotification(false);
                }, 2500);
            }, 1500), [props.note.id]);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
        autoSave([event.target.value, text]);
        autoSize(event.target);
    }

    const handleTextChange = (text) => {
        setText(text);
        autoSave([title, text]);
    }

    const autoSize = (element) => {
        let offset = element.offsetHeight - element.clientHeight;
        element.style.height = element.scrollHeight + offset + 'px';
    }

    if (loaded === true) {
        return (
            <div className="note-container">
                <textarea id="title" value={title} onChange={handleTitleChange} maxLength="100"></textarea>
                <ReactQuill
                    theme="snow"
                    modules={modules}
                    value={text}
                    onChange={handleTextChange} />
                {showNotification ?
                    <SaveNotification text="Note Saved" /> : null
                }

            </div>
        )
    } else {
        return <div className="loader"></div>
    }

}