const Router = require("express")
const router = Router()
const bcrypt = require("bcrypt")
const jtw = require("jsonwebtoken")
const cookieParser = require('cookie-parser')
const users = require("../models/users")
const {validationRegister, validationLogin} = require("../models/validation") 
const {authValidate} = require("./auth")
router.get("/" , async (req,res) =>{
  
    const allUsers = await users.find()
    res.send(allUsers)

})

router.post("/register", async (req,res) =>{

    const {error} = validationRegister(req.body)
     
    if(error) return res.status(400).send(error.details[0].message)

    const encriptando = await bcrypt.genSalt(10)
    const encriptado = await bcrypt.hash(req.body.password,encriptando)

   const newUser = new users({
       nombre : req.body.nombre,
       email:req.body.email,
       password: encriptado
   })

   try{
       const savedUser = await newUser.save()
       res.send(savedUser)
   }
   catch(err){
       res.status(400).send(`Error ${savedUser}`)
   }

})

router.post("/login" , async (req,res) =>{
  
    
    const {error} = validationLogin(req.body)
     
    if(error) return res.status(400).send(error.details[0].message)

    const user = await users.findOne({nombre: req.body.nombre})
     
    if(!user) return res.status(400).send(`No existe usuario`)
    
    const matchPass = await bcrypt.compare(req.body.password,user.password) 
    
    if(!matchPass) return res.status(400).send(`La contraseña no es correcta`)
    
      const token = jtw.sign({_id:user._id} , "hola")
      
      res.cookie("jwt", token)
    
     res.send(`Bienvenido ${user.nombre}`)
     const cookie = req.cookies
     console.log(cookie)
 
})
 

router.get("/logout",  (req,res) =>{
    
     res.cookie("jwt", "", {maxAge: 1})
     res.redirect("/login")

})
router.get("/authtest", authValidate ,(req,res) =>{
    
     res.send("holi")

})

module.exports = router