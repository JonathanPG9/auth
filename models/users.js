const mongoose = require("mongoose")

const fecha = new Date;
const dia = fecha.getDate()
const mes = fecha.getMonth()
const year = fecha.getFullYear()


const user  = mongoose.Schema({

     nombre : {
         type: String,
         required: true,
         min: 4,
         max:20
     },
     password:{
         type: String,
         required: true,
         min:6,
         max:100
     }
     ,
     email:{
         type: String,
         required:true,
         min:6,
         max:100
     },
     fecha:{
         type: String,
         default:`${dia}/${mes}/${year}`
     }
})

module.exports = mongoose.model("usuariosPractica", user)