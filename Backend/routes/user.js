const express = require("express");
const router = express.Router();
const User = require("../models/User"); //our schema
const { body, validationResult } = require("express-validator"); //for express validator {check} it can also be used in diff ways
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SEC = "this is my jwt file to create a token";
//route => /createuser
router.post(
  "/",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const Salt = await bcrypt.genSalt(10);
    const securepass = await bcrypt.hash(req.body.password, Salt);
    // const goru=User(req.body)
    //goru.save()
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        res.status(400).send("please enter with a valid email address");
      }
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securepass,
      });
      //creating authtoken with pac. jsonwebtoken
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SEC);
      res.send({ authtoken });
    } catch (error) {
      res.status(401).send("internal server error");
    }
  }
);




//login route

router.post(
  "/user",
 
  async (req, res) => {
    

    const { email, password } = req.body;
try{
    const user = await User.findOne({ email });
    
    if (!user) {
      res.status(400).send("please sign up to login",);
    }
    const comparedpass = await bcrypt.compare(password, user.password);
    if (!comparedpass) {
      res.status(400).send("please enter valid password");
    }
    //authtoken
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SEC);
    res.send({ authtoken });
}
  
  catch (error) {
    res.status(401).send("internal server error");
  }
}
);

//get user info from authtoken PATH=>fetchuser
router.post( "/getuser/getinfo",fetchuser,async(req, res) => {
                try {
                 userID=  req.user.id;
                const user= await User.findById(userID).select("-password")
                console.log(user);
                res.send(user)
              }
                catch (error) {
                    res.status(401).send("Cannot fetch user information now");
                  }
      })


module.exports = router;
