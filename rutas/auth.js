const jwt = require("jsonwebtoken");
 
const User = require("../models/users")


const authValidate = (req,res,next) =>{

  const cookie = req.cookies.jwt;

   if(cookie){

    jwt.verify(cookie,"hola" , (err,decodedToken) =>{
        if(err) return   res.status(400).send("algo salio mal")
        else{
            next()
            console.log(decodedToken)
        }
    })
   }
   else{
       res.redirect("/api/login")
   }

}

const currentUser = (req,res,next) =>{ 

    const cookie = req.cookies.jwt;

    if(cookie){

        jwt.verify(cookie,"hola" , async (err,user) =>{
            if(err) {
                res.send("null")
                next()
            }
            else{
                
                let currentUser = await User.findOne({_id:user._id})
                 res.json(currentUser) 
                next() 

            }
        })
       }
       else{
           res.redirect("/api/login")
       }
}


module.exports = {authValidate,currentUser}