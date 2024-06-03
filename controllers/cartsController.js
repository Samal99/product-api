const Cart = require('../models/cartsModal')
var cartController = {}

cartController.create = async function ( req, res ){
    Cart.createCart(req, (err, data)=> {
        try{
            // console.log('data',data)
            res.status(201).send({
                    status : 1,
                    message : 'Product added to cart',
                    data :  data && data.data ? data.data : {}
            })
        }catch(e){
            console.log('e',e)
            res.status(401).send({
                status : 0,
                message : 'Unable to add products into cart',
                error : err
            })
        }
    })
}

cartController.listCart = async function (req, res){
    Cart.listCart(req, (err, data)=> {
        try{
            // console.log('data',data)
            res.status(201).send({
                    status : 1,
                    message : 'Cart Items',
                totalRecords : data.totalRecords,
                    data :  data && data.data ? data.data : {}
            })
        }catch(e){
            console.log('e',e)
            res.status(401).send({
                status : 0,
                message : 'Unable to load cart items',
                error : err
            })
        }
    })
}

cartController.updateCartItems = async function (req, res){
    Cart.updateCartItems(req, (err, data) => {
        try {
            res.status(201).send({
                status: 1,
                message: 'Cart Details',
                data: data.data
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to fetch cart details',
                error: err
            });
        }
    });
}


cartController.deleteCart = async function (req, res){
    Cart.deleteCart(req, (err, data) => {
        try {
            res.status(201).send({
                status: 1,
                message: 'Cart has been deleted successfully',
                data: data.data
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to delete cart right now',
                error: err
            });
        }
    });
}

module.exports = cartController