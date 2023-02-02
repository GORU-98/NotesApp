const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes"); //our schema
const fetchuser=require("../middleware/fetchuser") 
const {body,validationResult}=require("express-validator")
//route to get al the notes

router.get("/getnotes", fetchuser, async (req,res)=>{
            try{
    const notes=await Notes.find({user:req.user.id})
         res.send(notes);
        }
         catch (error) {
      res.status(401).send("internal server error");
    }

})

//route to add notes 
router.post("/addnote", fetchuser,[
    body("title","title must be of 2 characters").isLength({min:5}),
    body("description","description must be of 3 characters").isLength({min:3})
], async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
    const {title,description,tag}=req.body
    const notes=new Notes({
        title,description,tag,user:req.user.id
    })
      const savednotes=await notes.save();
      res.send(savednotes)
    }
      catch (error) {
        res.status(401).send("internal server error");
      }
})

//to update notes

router.put("/updatenote/:id",fetchuser,async(req,res)=>{
  const {title,description,tag}=req.body
  //making a new note object
  let newNote={title,description,tag}    
  if(title){newNote.title===title}
  if(description){newNote.description==description}
  if(tag){newNote.tag==tag}

  let notes= await Notes.findById(req.params.id);
  if(!notes){
    res.status(404).send("notes not found")

  }
   if(notes.user.toString()!==req.user.id){
    res.status(401).send("action not allowed")
   }
     notes= await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
     res.json({notes})
})
router.delete("/deletenote/:id",fetchuser,async(req,res)=>{
  const {title,description,tag}=req.body
  //making a new note object
  let newNote={title,description,tag}    
  if(title){newNote.title===title}
  if(description){newNote.description==description}
  if(tag){newNote.tag==tag}

  let notes= await Notes.findById(req.params.id);
  if(!notes){
    res.status(404).send("notes not found")

  }
   if(notes.user.toString()!==req.user.id){
    res.status(401).send("action not allowed")
   }
     notes= await Notes.findByIdAndDelete(req.params.id)
     res.json({notes})
})

module.exports=router