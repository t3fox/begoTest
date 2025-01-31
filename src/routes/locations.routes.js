const { Router } = require('express');
const { check } = require('express-validator');
const { ValidInOut } = require('../middlewares/verify-jwt')

const { AddCoords, AllCoords, DelCoords, RefreshCoords } = require('../controllers/locations.controller')

const router = Router();

router.post('/new_coords',[
    check('place_id').isString().optional()

],ValidInOut,AddCoords);

router.get('/get_coords',ValidInOut,AllCoords);

router.get('/del_coords',ValidInOut,DelCoords);


router.post('/refresh_coords',[
    check('place_id').isString().optional(),
    check('new_ide').isString().optional()
],ValidInOut,RefreshCoords);


module.exports = router;