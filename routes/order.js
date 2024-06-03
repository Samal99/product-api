var express = require('express');
var router = express.Router();
var orderController = require('../controllers/ordedController')
var auth = require('./auth');

router.post('/create', auth.grantAccess(), function (req, res) {
    orderController.create(req, res);
});

module.exports = router