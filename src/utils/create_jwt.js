const jwt = require('jsonwebtoken');


const GenJWT = async (id = '') => {
  
    const payload = {id};        
    return jwt.sign(payload,process.env.SECRET_WKY,{expiresIn: '8h'});
}


module.exports = {
    GenJWT
}