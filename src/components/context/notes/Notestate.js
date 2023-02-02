import React, { useState } from "react";
import NoteContext from "./noteContext";

const Notestate  =  (props) => {
  const host="http://localhost:5000"
    const initialState=[]
   const [notes, setnotes] = useState(initialState)

const token=localStorage.getItem("token")
//to fetch all notes
      const fetchnote=async()=>{
        const response = await  fetch(`${host}/getnotes`,{
          method:"GET",
          headers:{
            "Content-Type":"application/json",
            "auth-tokenn":`${token}`

          }
        })
        const data= await response.json()
        setnotes(data)
      }

    //to add notes
    const addnote=async (title,description,tag)=>{
      
      const response =await fetch(`${host}/auth/addnote`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "auth-tokenn":`${token}`

        },
        body:JSON.stringify({title,description,tag})
      })
      const data= await response.json()
      const note=  {
        "_id": data._id,
        "user": data.user,
        "title":data.title ,
        "description":data.description,
        "tag": data.tag,
        "date": data.date,
        "__v": 0
      }

      setnotes(notes.concat(note));
      
    }
    //deleting notes
    
    const dltnote=async (id)=>{
      const response =await fetch(`${host}/notes/deletenote/${id}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json",
          "auth-tokenn":`${token}`

        },
      })
      const data= await response.json()

      console.log(data+ id)
     const newnote= notes.filter((note)=>{return note._id !== id})
     setnotes(newnote);
    }
    //updating note

    const editnote= async (id,title,description,tag)=>{
      const response =await fetch(`${host}/notes/updatenote/${id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          "auth-tokenn":`${token}`

        },
        body:JSON.stringify({title,description,tag})

      })
      let  data= await response.json()
console.log(data)
   let newNote= await JSON.parse(JSON.stringify(notes))
      for (let index = 0; index < newNote.length; index++) {
        const element = newNote[index];
        if(element._id=== id){
          
          newNote[index].title=title;
          newNote[index].description=description;
          newNote[index].tag=tag;
          break;
        }
        
        setnotes(newNote);
      }
      
    }
  return (
    <NoteContext.Provider value={{notes,addnote,dltnote,editnote,fetchnote}}>
        {props.children}
    </NoteContext.Provider>
  )
}

export default Notestate
