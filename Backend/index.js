//function to connect with mongodb

const mongoose=require("mongoose")
mongoose.set('strictQuery', true)
const ConnectToMongo=require("./db")

ConnectToMongo()
// cors policy
//express

const express=require("express");
const app=express()
app.use(express.json())
const port=5000;

const cors=require("cors")
app.use(cors())
//all routes 

app.get("/",(req,res)=>{
    //res.send("HLLO")
    res.send(req.body)
    
    console.log(req.body)

})

//1. route for user.js(route,require(path))
app.use("/createuser",require("./routes/user"))
app.use("/login",require("./routes/user"))//route=>/login/user
app.use("/",require("./routes/user"))//route for=>/getuser/getinfo
app.use("/",require("./routes/notes"))//route for=> /getnotes
app.use("/auth",require("./routes/notes"))//route for=> /addnotes
app.use("/notes",require("./routes/notes"))//route for=> /addnotes


//schemas or models
//const user=require("./models/User")

app.listen(port,()=>{
    console.log("hey I am your new server")
})