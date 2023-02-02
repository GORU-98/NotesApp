import React ,{useContext, useEffect,useRef,useState}from 'react'
import noteContext from './context/notes/noteContext'
import NotesItem from  "./NotesItem";


const Notes = (e) => {
  
    const context=useContext(noteContext)
    const {notes,fetchnote,editnote}=context   
    useEffect(() => {
      if(localStorage.getItem('token')){
        fetchnote() }
        else{
window.location.href="/login/user"
        }
      //eslint-disable-next-line
    },[]);
    const modal=useRef('');
    const closeRef=useRef('');
    
    //updatenote functionm initialyzed by props from notesitem
    const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:"",})
    const updatenote = (currentnote)=>{
      // if( modal.current.style.display==="none"){
      //   modal.current.style.display="block"
      // }else{
      //   modal.current.style.display="none"

      // }
      modal.current.click()
      setNote({
        id:currentnote._id,
        etitle:currentnote.title,
        edescription:currentnote.description,
        etag:currentnote.tag,
      
      })  

    }
    const handleadd =()=>{

      editnote(note.id,note.etitle,note.edescription,note.etag)
      closeRef.current.click()

    }
    const onchange=(e)=>{
      setNote({...note,[e.target.name]:e.target.value})

    }
    


  return (
    <>
<button ref={modal} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModalCenter">
    Launch demo modal
  </button>
  
  <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLongTitle">Update Your Note</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
        <div className="mb-3">
  <label htmlFor="etitle" className="form-label">Title</label>
  <input type="text" className="form-control" value={note.etitle} id="etitle" name="etitle" onChange={onchange}/>
</div>
<div className="mb-3">
  <label htmlFor="edescription" className="form-label">Description</label>
  <textarea className="form-control"  value={note.edescription} id="edescription" name="edescription" rows="3" onChange={onchange}></textarea>
</div>
<div className="mb-3">
  <label htmlFor="etag" className="form-label">Tag</label>
  <textarea className="form-control" value={note.etag}  id="etag" name="etag" rows="3" onChange={onchange}></textarea>

</div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal" ref={closeRef} >Close</button>
          <button type="button" className="btn btn-primary" disabled={note.etitle.length <=5 || note.edescription.length <= 3} onClick={handleadd}>Update Note</button>
        </div>
      </div>
    </div>
  </div>
   

    <div className='row my-3'>
     {notes.map((note)=>{
       return <NotesItem updatenote={updatenote} note={note} key={note._id} id={note._id} title={note.title} description={note.description} tag={note.tag}/>
      })}
    </div>
      </>
  )
}

export default Notes
