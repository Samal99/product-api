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

router.get('/list', function(req, res) {
  usersController.list(req,res);
});

router.get('/userDetails/:id', function(req, res) {
  usersController.userDetailsByID(req,res);
});

router.post('/updateUser/:id',auth.grantAccess('admin','data'), function(req, res) {
  usersController.updateUser(req,res);
});

router.post('/resetPasswordByUser/:id',function(req, res) {
  usersController.resetPasswordByUser(req,res);
});

router.post('/updatePasswordByAdmin',auth.grantAccess('admin','data'), function(req, res) {
  usersController.updatePasswordByAdmin(req,res);
});

router.delete('/deleteUser/:id',auth.grantAccess('admin','data'), function(req, res) {
  usersController.deleteUser(req,res);
});

router.post('/updateRole/:id',auth.grantAccess('admin','data'), function(req, res) {
  usersController.updateRole(req,res);
});

// userRegistratios
router.post('/userRegistratios',function(req, res) {
  usersController.userRegistratios(req,res);
});

router.get('/accoutApprovalList',auth.grantAccess('admin','data'),function(req, res) {
  usersController.accoutApprovalList(req,res);
});


router.post('/activeAccount/:id',auth.grantAccess('admin','data'),function(req, res) {
  usersController.activeAccount(req,res);
});

module.exports = router;
