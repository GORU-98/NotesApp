const mongoose= require("mongoose")
const MongoURI="mongodb://localhost:27017/notesapp?directConnection=true"

const  ConnectToMongo =()=>{
    mongoose.connect(MongoURI,()=>{
        console.log("connected to database successfully")

    })

}
module.exports=ConnectToMongo