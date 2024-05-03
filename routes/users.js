var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController')
var auth = require('./auth')
// var img = require('../models/upload')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/image/:id', function(req, res) {
  usersController.image(req,res);
});

router.get('/getAadhar/:id', function(req, res) {
  usersController.getAadhar(req,res);
});

router.get('/getPan/:id', function(req, res) {
  usersController.getPan(req,res);
});

router.get('/getAddress/:id', function(req, res) {
  usersController.getAddress(req,res);
});

router.post('/create', auth.grantAccess('admin','data'),function(req, res) {
  usersController.create(req,res);
});

router.post('/login', function(req, res) {
  usersController.login(req,res);
});

router.post('/list', auth.grantAccess('admin','data'),function(req, res) {
  usersController.list(req,res);
});

router.get('/userDetails/:id', function(req, res) {
  usersController.userDetailsByID(req,res);
});

router.post('/updateUser/:id',auth.grantAccess(), function(req, res) {
  usersController.updateUser(req,res);
});

router.post('/resetPasswordByUser/:id',auth.grantAccess(),function(req, res) {
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

router.post('/createUserByAdmin',auth.grantAccess('admin','data'),function(req, res) {
  usersController.create(req,res);
});

router.get('/accoutApprovalList',auth.grantAccess('admin','data'),function(req, res) {
  usersController.accoutApprovalList(req,res);
});


router.post('/activeAccount/:id',auth.grantAccess('admin','data'),function(req, res) {
  usersController.activeAccount(req,res);
});

router.post('/uploadImage/:id',auth.grantAccess(),function(req, res) {
  usersController.uploadImage(req,res);
});

router.post('/uploadAadhar/:id',auth.grantAccess(),function(req, res) {
  usersController.uploadAadhar(req,res);
});

router.post('/uploadPan/:id',auth.grantAccess(),function(req, res) {
  usersController.uploadPan(req,res);
});

router.post('/uploadAddress/:id',auth.grantAccess(),function(req, res) {
  usersController.uploadAddress(req,res);
});

// uploadImage

router.post('/sendPassword',function(req, res) {
  usersController.sendPassword(req,res);
});

module.exports = router;
