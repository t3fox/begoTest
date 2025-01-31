const { request,response } = require('express')
const { GenJWT } = require('../utils/create_jwt')

const dbuser = require('../models/user.schema');


const AddUser = async (req = request,res = response) => {

    const { mail_x, pssw_x } = req.body;

    try{

        // console.log('THIS: ',mail_x)
        const agent  = await dbuser.findOne({mail:mail_x });


        if (agent) {
            return res.status(410).json({
                msg: 'usuario ya existente'
            });
        }

        const usr = new dbuser({
            mail:mail_x,
            passwd:pssw_x
        });
       
        await usr.save();

        const tkn = await GenJWT(usr.id);

        res.status(200).json({
            ok:true,
            msg:'Bienvenido!!!',
            tkn
        });

    }
    catch(err){
        res.status(400).json({ok:false});
    }
   
}

const LogIn = async (req = request,res = response)=> {

    const { mail_x, pssw_x } = req.body;
    
    try{
        const agent = await dbuser.findOne({mail:mail_x });

        if( pssw_x != agent.passwd){
            res.status(200).json({
                ok:true,
                msg:'Comprueba tu contraseña'
            });
        }
        if( mail_x != agent.mail){
            res.status(200).json({
                ok:true,
                msg:'Comprueba tu correo'
            });
        }


        if( mail_x == agent.mail && pssw_x == agent.passwd ){
            
            const tkn = await GenJWT(agent.id);

            res.status(200).json({
                ok:true,
                msg:'Hola de Nuevo',
                tkn
            });
        }

    }
    catch(err){
        res.status(400).json({ok:false});
    }

}


module.exports = {
    AddUser,
    LogIn
}