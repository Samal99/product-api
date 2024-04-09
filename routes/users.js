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


module.exports = router;
