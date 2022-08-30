import userEvent from '@testing-library/user-event';
import React, {useEffect, useState} from 'react';
import AddButton from '../components/AddButton';
// import notes from '../assests/data';
import ListItem from '../components/ListItem';

const NotesListPage = () => {

    let [notes, setNotes] = useState([]);

    useEffect(() => {
        getNotes()
    }, [])

    let getNotes = async () => {
        let response = await fetch('http://localhost:5000/notes/')
        let data = await response.json()
        setNotes(data)
    }
    
    return ( <div className='notes'>
        <div className='notes-header'>
            <h2 className='notes-title'>&#9782; Notes</h2>
            <p className='notes-count'>{notes.length}</p>
        </div>
        <AddButton />
        <div className='notes-list'>
            {notes.map((note, index) => (
                <ListItem key={index} note={note}/>
            ))}
        </div>
    </div> );
}
 
export default NotesListPage;