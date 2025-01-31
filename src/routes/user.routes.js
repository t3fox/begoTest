const { Router } = require('express');
const { check } = require('express-validator');

const { AddUser,LogIn } = require('../controllers/user.controller')

const router = Router();



router.post('/register',[
    check('mail_x','Usa un correo valido').isEmail(),
    check('pssw_x').isLength(8),
],AddUser);


router.post('/login',[
    check('mail_x').isEmail(),
    check('pssw_x').isLength(8),

],LogIn)

module.exports = router;