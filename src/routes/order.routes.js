const { Router } = require('express');
const { check } = require('express-validator');
const { ValidInOut } = require('../middlewares/verify-jwt');

const { AddOrder,RwOrder } = require('../controllers/order.controller');

const router = Router();

router.post('/new_order',[
    check('ide_truck').notEmpty(),
    check('ide_init').notEmpty(),
    check('ide_fin').notEmpty()

],ValidInOut,AddOrder)


router.get('/rw_order',[

    check('stats').notEmpty().isString(),
    check('ide_order').notEmpty().isString()

],ValidInOut,RwOrder)


module.exports = router;