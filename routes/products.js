var express = require('express');
var router = express.Router();
var productsController = require('../controllers/productsController')
var auth = require('./auth');

router.post('/create', auth.grantAccess(), function (req, res) {
    productsController.create(req, res);
});

router.post('/list', auth.grantAccess(), function (req, res) {
    productsController.list(req, res);
});

// randomProducts
router.post('/randomProducts',  function (req, res) {
    productsController.randomProducts(req, res);
});

router.post('/lastFourProducts',  function (req, res) {
    productsController.lastFourProducts(req, res);
});


router.post('/middleFourProducts',  function (req, res) {
    productsController.middleFourProducts(req, res);
});

router.post('/listProducts', function (req, res) {
    productsController.list(req, res);
});

router.get('/listProductByID/:id', auth.grantAccess(), function (req, res) {
    productsController.listProductByID(req, res);
});

router.post('/updateProduct/:id', auth.grantAccess(), function (req, res) {
    productsController.updateProduct(req, res);
});

router.post('/uploadImage/:id',auth.grantAccess(),function(req, res) {
    productsController.uploadImage(req,res);
  });
  
  router.post('/uploadEditorImage/:id',function(req, res) {
    productsController.uploadEditorImage(req,res);
  });

router.delete('/deleteProduct/:id', auth.grantAccess(), function (req, res) {
    productsController.deleteProduct(req, res);
});





module.exports = router
