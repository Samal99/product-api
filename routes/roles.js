var express = require('express');
var router = express.Router();
var rolesController = require('../controllers/rolesController')
var auth = require('./auth')

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


router.post('/create', auth.grantAccess('admin', 'data'), function (req, res) {
    rolesController.create(req, res);
});

router.post('/list', auth.grantAccess('admin', 'data'), function (req, res) {
    rolesController.list(req, res);
});

router.post('/update/:id', auth.grantAccess('admin', 'data'), function (req, res) {
    rolesController.update(req, res);
});

router.delete('/deleteRole/:id', auth.grantAccess('admin', 'data'), function (req, res) {
    rolesController.deleteRole(req, res);
});

module.exports = router