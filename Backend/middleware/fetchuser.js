const jwt = require("jsonwebtoken");

const JWT_SEC = "this is my jwt file to create a token";

const fetchuser = (req,res,next) =>{
    const token = req.header('auth-tokenn')
    if(!token){
        res.status(401).send("please enter a valid token")
    }
    try {
    const data = jwt.verify(token,JWT_SEC);
    req.user=data.user;
    next();
} catch (error) {
    res.status(401).send("internal server error");
}
}
module.exports=fetchuser