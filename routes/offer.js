var express = require('express');
var router = express.Router();
var offerController = require('../controllers/offerController')
var auth = require('./auth');

router.post('/create', auth.grantAccess('admin','data'), function (req, res) {
    offerController.create(req, res);
});

router.get('/list', auth.grantAccess(), function (req, res) {
    offerController.list(req, res);
});

router.get('/offerDetails/:id', auth.grantAccess('admin','data'), function (req, res) {
    offerController.offerbyID(req, res);
});

router.post('/updateOffer/:id', auth.grantAccess('admin','data'), function (req, res) {
    offerController.updateOffer(req, res);
});

router.delete('/deleteOffer/:id', auth.grantAccess('admin','data'), function (req, res) {
    offerController.deleteOffer(req, res);
});

module.exports = router