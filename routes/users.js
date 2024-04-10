var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController')
var auth = require('./auth')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', auth.grantAccess('admin','data'),function(req, res) {
  usersController.create(req,res);
});

router.post('/login', function(req, res) {
  usersController.login(req,res);
});

router.get('/list',auth.grantAccess('admin','data'), function(req, res) {
  usersController.list(req,res);
});

router.get('/userDetails/:id', function(req, res) {
  usersController.userDetailsByID(req,res);
});

router.post('/updateUser/:id',auth.grantAccess('admin','data'), function(req, res) {
  usersController.updateUser(req,res);
});


module.exports = router;
