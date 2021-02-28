import List from './Components/List';
import './App.scss';
import { useState, useEffect } from 'react';

function App() {
  const [notes, setNotes] = useState([]);

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
  }, [])

  // Saves to the local storage when notes are modified in any way.
  useEffect(() => {
    saveToLocalStorage();
  }, [notes])

  const saveNote = (prop) => {
    // If the array isn't empty - calculate the new ID and add it to array
    if (notes.length !== 0) {
      const newID = notes[notes.length - 1].id + 1;
      setNotes(oldNotes => [...oldNotes, { "id": newID, "title": prop, "content": "" }])
    } else {
      setNotes(oldNotes => [...oldNotes, { "id": 1, "title": prop, "content": "" }]);
    }
  }

  // Removes the note with the ID given in props
  const deleteNote = (prop) => {
    setNotes(notes.filter(item => item.id !== prop));
  }

  const saveToLocalStorage = () => {
    localStorage.setItem("notes", JSON.stringify({ "notes": notes }));
  }

  return (
    <div className="App">
      <List notes={notes} saveNote={saveNote} deleteNote={deleteNote}/>
    </div>
  );
}

export default App;
