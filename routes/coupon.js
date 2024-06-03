var express = require('express');
var router = express.Router();
var couponController = require('../controllers/couponController')
var auth = require('./auth');

router.post('/create', auth.grantAccess('admin','data'), function (req, res) {
    couponController.create(req, res);
});

router.get('/list', auth.grantAccess(), function (req, res) {
    couponController.list(req, res);
});

router.get('/offerDetails/:id', auth.grantAccess('admin','data'), function (req, res) {
    couponController.offerbyID(req, res);
});

router.post('/updateOffer/:id', auth.grantAccess('admin','data'), function (req, res) {
    couponController.updateOffer(req, res);
});

router.delete('/deleteOffer/:id', auth.grantAccess('admin','data'), function (req, res) {
    couponController.deleteOffer(req, res);
});

module.exports = router