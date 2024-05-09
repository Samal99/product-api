var Product = require('../models/productModel')
var productController = {}

productController.create = async function (req, res){
    Product.createProduct(req, (err, data) => {
        try {
            res.status(201).send({
                status: 1,
                message: 'Product has been created successfully.',
                data: data.data
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to create the product right now',
                error: err
            });
        }
    });
}

productController.list = async function (req, res){
    Product.listProduct(req, (err, data) => {
        try {
            res.status(201).send({ status: 1, message: 'List of products', totalRecords: data.totalRecords, data: data.data });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to fetch products',
                error: err
            });
        }
    });
}

productController.listProductByID = async function (req, res) {
    Product.listProductByID(req, (err, data) => {
        try {
            res.status(201).send({
                status: 1,
                message: 'Product Details',
                data: data.data
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to fetch product details',
                error: err
            });
        }
    });
}



productController.updateProduct = async function (req, res) {
    Product.updateProduct(req, (err, data) => {
        try {
            res.status(201).send({
                status: 1,
                message: 'Product updated successfuly.',
                data: data.data
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to update product details',
                error: err
            });
        }
    });
}

productController.uploadImage = async function (req, res) {
    Product.uploadImage(req, (err, data) => {
        console.log('req',req.body)
        console.log('err',err)
        try {
            res.status(201).send({
                status: 1,
                message: 'Aadhar card has been uploaded successfuly.',
                data: data.data
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to upload aadhar card right now.',
                error: err
            });
        }
    });
}

productController.deleteProduct = async function (req, res) {
    Product.deleteProduct(req, (err, data) => {
        try {
            res.status(201).send({
                status: 1,
                message: 'Product deleted successfuly.',
                data: data.data
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to delete product.',
                error: err
            });
        }
    });
}


module.exports = productController