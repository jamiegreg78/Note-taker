import './App.scss';
import { useState, useEffect } from 'react';
import List from './Components/List';
import Editor from './Components/Editor';

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(false);
  const [noteIndex, setNoteIndex] = useState(0);
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
      setSelectedNote(false);
      setNotes(notes.filter(item => item.id !== noteId));
    }
  }

  // Select note - gets index of item with matching id
  const selectNote = (noteId) => {
    setNoteIndex(notes.findIndex(item => item.id === noteId));
    setSelectedNote(true);
  }

  // Saves to the state array
  const saveNote = () => {

  }

  // Saves the notes to localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem("notes", JSON.stringify({ "notes": notes }));
  }



  if (loaded === true) {
    return (
      <div className="App">
        <List notes={notes} createNote={createNote} deleteNote={deleteNote} selectNote={selectNote} />
        {selectedNote === true && <Editor note={notes[noteIndex]} />}

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
