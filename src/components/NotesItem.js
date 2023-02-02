import React ,{useContext}from 'react'
import noteContext from './context/notes/noteContext'


const NotesItem = (props) => {
const  {title,description,note,updatenote,id,tag}=props
const context=useContext(noteContext)
    const {dltnote}=context
  return (
    <>
    <div className="card col-md-3 mx-1 my-3" >
       <span class="badge text-bg-danger " style={{position:"relative",left:"12rem",width:"5rem",overflow:"hidden"}}>{tag}</span>
  <div className="card-body">
    <div className="d-flex">
    <h5 className="card-title">{title}</h5>
    <i className="fa-solid fa-trash mx-1" onClick={()=>{return dltnote(id)}}></i>    
    <i className="fa-solid fa-pen-to-square mx-1" onClick={()=>{return updatenote(note)}} ></i>
    </div>
    <p className="card-text">{description}</p>
    {/* <Link to="/go" className="btn btn-primary">Go somewhere</Link> */}
  </div>
</div>
</>
  )
}

export default NotesItem
