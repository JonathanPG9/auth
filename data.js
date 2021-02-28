const mongoose = require("mongoose")


mongoose.connect(process.env.DATA,{ useNewUrlParser: true ,useUnifiedTopology:true } 
, () =>{ 
console.log("Conectado a la base de datos")
})