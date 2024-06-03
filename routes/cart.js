var express = require('express');
var router = express.Router();
var cartController = require('../controllers/cartsController')
var auth = require('./auth');


router.post('/create',auth.grantAccess(), function (req, res) {
    cartController.create(req, res);
});


router.post('/list',auth.grantAccess(), function (req, res) {
    cartController.listCart(req, res);
});

router.post('/updateCartItems/:id',auth.grantAccess(), function (req, res) {
    cartController.updateCartItems(req, res);
});

router.delete('/deleteCart/:id',auth.grantAccess(), function (req, res) {
    cartController.deleteCart(req, res);
});

module.exports = router