const { Router } = require('express');
const { check } = require('express-validator');

const { ValidInOut } = require('../middlewares/verify-jwt')

const { Addtruck, All_trucks ,Deltruck , Reltruck,  } = require('../controllers/trucks.controller');
 
const router = Router();


router.post('/new_truck', [
    
    check('year').isString(),
    check('color' ).isString(),
    check('plates').isString()
],ValidInOut,Addtruck);

router.post('/refresh_truck', [

    check('year').isString().optional(),
    check('color' ).isString().optional(),
    check('plates').isString().optional()
],ValidInOut,Reltruck);

router.get('/all_trucks',ValidInOut,All_trucks);

router.post('/del_truck',ValidInOut,Deltruck);




module.exports = router