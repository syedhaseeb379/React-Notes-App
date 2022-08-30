import React, {useEffect, useState} from 'react';
// import notes from "../assests/data";
import { ReactComponent as ArrowLeft } from "../assests/arrow-left.svg";
import { Link, useParams } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import { createHashHistory } from 'history';

const NotePage = () => {
    const { id } = useParams();
    // let note = notes.find(note => note.id === Number(id))
    let [note, setNote] = useState(null)
    const history = createHashHistory()

    useEffect(()=>{
        getNote()
    }, [id])

    let getNote = async () => {
        if (id === 'new') return
        let response = await fetch(`http://localhost:5000/notes/${id}`)
        let data = await response.json()
        setNote(data)
    }

    let createNote = async () => {
        await fetch(`http://localhost:5000/notes/`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({...note, 'updated':new Date()})
        })
    }

    let updateNote = async () => {
        await fetch(`http://localhost:5000/notes/${id}`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({...note, 'updated':new Date()})
        })
    }

    let deleteNote = async () => {
        await fetch(`http://localhost:5000/notes/${id}`, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        history.push('/')
    }

    let handleSubmit = () => {

        if(id !== 'new' && !note.body){
            deleteNote()
        }else if(id !== 'new'){
            updateNote()
        }else if(id === 'new' && note !== null){
            createNote()
        }
        history.push('/')
    }

    return ( <div className='note'>
        <div className='note-header'>
            <h3>
                <Link to="/">
                    <ArrowLeft onClick={handleSubmit} />
                </Link>
            </h3>

            {id !== 'new' ? (
                <button onClick={deleteNote}>Delete</button>
            ):(
                <button onClick={handleSubmit}>Done</button>
            )}
            
        </div>
        <textarea onChange={(e) => { setNote({...note, 'body': e.target.value})}} value={note?.body}>
            </textarea>
    </div> );
}
 
export default NotePage;