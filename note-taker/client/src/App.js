import './App.scss';
import { useState, useEffect } from 'react';
import List from './Components/List';
import Editor from './Components/Editor';

function App() {
  const [notes, setNotes] = useState([]);
  const [isNoteSelected, setIsNoteSelected] = useState(false);
  const [selectedNote, setSelectedNote] = useState({});
  const [loaded, setLoaded] = useState(false);

  // Load from local storage
  useEffect(() => {
    // Check for web storage compatability
    if (typeof (Storage) !== "undefined") {
      // If there are no notes stored - initialize storage
      if (localStorage.getItem("notes") === null) {
        localStorage.setItem("notes", JSON.stringify({ "notes": [] })); // CHANGE THIS EVENTUALLY
        setNotes(JSON.parse(localStorage.getItem("notes")).notes);
      } else {
        setNotes(JSON.parse(localStorage.getItem("notes")).notes);
      }
    } else {
      alert("This app requires the use of the Web Storage API - you should update to a newer browser or this app won't work.");
    }

    setLoaded(true);
  }, [])

  // Saves to the local storage when notes are modified in any way.
  useEffect(() => {
    saveToLocalStorage();
  }, [notes])

  const createNote = (noteTitle) => {
    const randomId = Math.random().toString(36).replace("0.", "");
    setNotes(oldNotes => [...oldNotes, { "id": randomId, "title": noteTitle, "content": "" }]);
  }

  // Removes the note with the ID given in props
  const deleteNote = (noteId) => {
    if (window.confirm("Are you sure you wish to delete this note? ")) {
      // If deleting currently selected note - deselect it first
      if (selectedNote.id === noteId) {
        deselectNote();
        setNotes(notes.filter(item => item.id !== noteId));
      } else {
        setNotes(notes.filter(item => item.id !== noteId));
      }

    }
  }

  // Select note - gets index of item with matching id
  const selectNote = (noteId) => {
    // Deselects current note before selecting another one
    if (isNoteSelected === true) {
      deselectNote();
    }
    setSelectedNote(notes[notes.findIndex(item => item.id === noteId)]);
    setIsNoteSelected(true);
  }

  const deselectNote = () => {
    setSelectedNote({});
    setIsNoteSelected(false);
  }

  // Saves to the state array
  const saveNote = (noteId, content) => {

    // Either updates the desired object or returns the whole object unmodified
    setNotes(notes.map(item => {
      if (item.id === noteId) {
        return { ...item, content: content }
      } else {
        return item;
      }
    }));
  }

  // Saves the notes to localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem("notes", JSON.stringify({ "notes": notes }));
  }

 // {isNoteSelected === true && <Editor note={selectedNote} saveNote={saveNote} />}
  if (loaded === true) {
    return (
      <div className="App">
        <List
          notes={notes}
          createNote={createNote}
          deleteNote={deleteNote}
          selectNote={selectNote} />
        {isNoteSelected ? <Editor note={selectedNote} saveNote={saveNote} isNoteSelected={isNoteSelected}/> : null}


      </div>
    );
  }
  else {
    return (
      <div>Loading TEMP</div>
    )
  }

}

export default App;
