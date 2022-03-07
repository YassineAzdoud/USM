import React, { useEffect, useState } from 'react';
import './App.css';
import Preview from './components/Preview/index';
import Message from './components/Message';
import NotesContainer from './components/Notes/NotesContainer';
import Note from './components/Notes/Note';
import NoteForm from './components/Notes/NoteForm';
import Alert from './components/Alert';

function App() {

  const [notes, setNotes] = useState([]);
  const [userName, setuserName] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [createdDate, setcreatedDate] = useState('');
  const [status, setstatus] = useState('');
  const [registrationNumber, setregistrationNumber] = useState('');
  
  const [creating, setCreating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState([])

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (localStorage.getItem('notes')) {
      setNotes(JSON.parse(localStorage.getItem('notes')))
    }else {
      localStorage.setItem('notes', JSON.stringify([]))
    }
  }, []);

  useEffect(() => {
    if (validationErrors.length !== 0) {
      setTimeout(() => {
        setValidationErrors([]);
      }, 3000)
    }
  }, [validationErrors])

  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  const validate = () => {
    const validationErrors = [];
    let passed = true;
    if (!userName) {
      validationErrors.push('please enter title of notes');
      passed = false
    }
    if (!firstName) {
      validationErrors.push('please enter content of notes');
      passed = false
    }
    setValidationErrors(validationErrors);
    return passed
  }

  const changeuserHandler = (event) => {
    setuserName(event.target.value)
  }

  const changefirstNameHandler = (event) => {
    setfirstName(event.target.value)
  }

  const changelastNameHandler = (event) => {
    setlastName(event.target.value)
  }

  const changecreatedDateHandler = (event) => {
    setcreatedDate(event.target.value)
  }

  const changestatusHandler = (event) => {
    setstatus(event.target.value)
  }

  const changeregistrationNumberHandler = (event) => {
    setregistrationNumber(event.target.value)
  }

  const saveNoteHandler = () => {

    if (!validate()) return;

    const note = {
      id: Math.floor(Math.random() * 1000000000),
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      createdDate: createdDate,
      status: status,
      registrationNumber: registrationNumber


    }

    const createdNotes = [...notes, note];
    
    saveToLocalStorage('notes', createdNotes)
    setNotes(createdNotes);
    setCreating(false);
   
    setuserName('');
    setfirstName('');
    setlastName('');
    setcreatedDate('');
    setstatus('');
    setregistrationNumber('');

  }

 

 

 

  const deleteNoteHandler = () => {
    const updatedNotes = [...notes];
    const noteIndex = updatedNotes.findIndex(note => note.id !== event);
    notes.splice(noteIndex, 1);
    saveToLocalStorage('notes', notes)
    setNotes(notes);
 
  }

  const getAddNote = () => {
 

if(isOpen){
    return (
      <NoteForm
        togglePopup = {togglePopup}
        formTitle= "New Note"
        userName = {userName}
        lastName = {lastName}
        firstName = {firstName}
        createdDate = {createdDate}
        status = {status}
        registrationNumber = {registrationNumber}
     
        userChanged = {changeuserHandler}
        firstChanged = {changefirstNameHandler}
        lastChanged = {changelastNameHandler}
        statusChanged = {changestatusHandler}
        dateChanged = {changecreatedDateHandler}
        RBChanged = {changeregistrationNumberHandler}
     
        submitText="save"
        submitClicked={saveNoteHandler}
      />
    )};
  };
  const addNoteHandler = () => {
    setCreating(true);
    setIsOpen(!isOpen);
    setuserName('');
    setfirstName('');
    setlastName('');
    setcreatedDate('');
    setstatus('');
    setregistrationNumber('');
  }

  return (
    <div className="App">
      <NotesContainer>
      <Note users={notes} deleteNoteHandler={deleteNoteHandler}/>
         <div className="add"><button className="add-button" onClick={addNoteHandler}>Ajouter utilisateur</button></div>
        
        </NotesContainer>
        <Preview>
        {creating && getAddNote()}
      </Preview>
       {validationErrors.length !== 0 && <Alert validationMessages={validationErrors}/>}
    </div>
  );
}

export default App;
