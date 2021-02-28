const express = require("express")
const app = express()
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
require('dotenv').config()

const PORT = process.env.PORT || 5000;

app.set("json spaces", 2) 
require("./data")

app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())

 const users = require("./rutas/ruta")
 
 app.use("/api/" , users)
 
app.listen(PORT , () =>{
    console.log(`Servidor conectado en el puerto: ${PORT}`)
})

