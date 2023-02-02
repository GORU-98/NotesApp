import React, { useContext,useState } from 'react'
import { useEffect } from 'react'
import noteContext from './context/notes/noteContext'

const Addnote = () => {
  const context=useContext(noteContext)
  const {addnote}=context
  const [note, setNote] = useState({title:"",description:"",tag:""})

  const handleadd =(e)=>{
    e.preventDefault();//prevent it from reloding..
      addnote(note.title,note.description,note.tag)
setNote({title:"",description:"",tag:""})
    }
    
    
    
    const onchange=(e)=>{
      setNote({...note,[e.target.name]:e.target.value})
    }
    useEffect(()=>{
     setNote({title:"",description:"",tag:""})
    },[])
  return (
    <div className='my-5'>
      <h1>Enter Text ....</h1>
    <div className="mb-2">
  <label htmlFor="title" className="form-label">Title</label>
  <input type="text" className="form-control" id="title" name="title" minLength={5}  value={note.title} onChange={onchange}/>
</div>

<div className="mb-2">
  <label htmlFor="description" className="form-label">Description</label>
  <textarea className="form-control" id="description" name="description" rows="1" minLength={3}  value={note.description} onChange={onchange}></textarea>
</div>

<div className="mb-2">
  <label htmlFor="tag" className="form-label">Tag</label>
  <textarea className="form-control" id="tag" name="tag" rows="1" value={note.tag}  onChange={onchange}></textarea>
</div>

  <button type="button" disabled={note.title.length <=5 || note.description.length <= 3} className="btn btn-success my-3 text-center" onClick={handleadd}>Add Note</button>
    </div>
  )
}

export default Addnote
