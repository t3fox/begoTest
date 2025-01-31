const { request, response } = require('express')
const jwt = require('jsonwebtoken');

const ValidInOut = (req = request, res = response,next) => {
  
    const token = req.header('tkn');

    if(!token){
        
        return res.status(404).json({
           msg:'No hay sesion existente'
       });
   } 
    
   try{

    const { id } = jwt.verify(token,process.env.SECRET_WKY);

    if(id){

        req.id = id;
    }
   }
   catch(err){
    
    return res.status(401).json({
        msg: 'sesión  no valida'
    });

   }

   next();




}

module.exports = {ValidInOut}