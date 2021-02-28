const joi = require("joi")




const validationRegister = (data) =>{
  
    const schema = joi.object({
        nombre: joi.string().min(4).max(20).required(),
        email: joi.string().min(6).max(100).required().email(),
        password: joi.string().min(6).max(100).required()
    })
    
    return schema.validate(data)
}





const validationLogin = (data) =>{
  
    const schema = joi.object({
        nombre: joi.string().min(4).max(20).required(), 
        password: joi.string().min(6).max(100).required()
    })
    
    return schema.validate(data)
}


module.exports.validationLogin = validationLogin;
module.exports.validationRegister = validationRegister;