const Order = require('../models/ordersModal')
const orderController = {}

orderController.create = async function ( req, res ){
    Order.createOrder(req, (err, data)=> {
        try{
            // console.log('data',data)
            res.status(201).send({
                    status : 1,
                    message : 'Order has been placed successfully.',
                    data :  data && data.data ? data.data : {}
            })
        }catch(e){
            console.log('e',e)
            res.status(401).send({
                status : 0,
                message : 'Unable to place order.',
                error : err
            })
        }
    })
}


module.exports = orderController