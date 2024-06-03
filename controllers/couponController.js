var Coupon = require('../models/couponModel')
var couponController = {}


couponController.create = async function (req, res){
    Coupon.createCoupon(req, (err, data) => {
        try {
            res.status(201).send({
                status: 1,
                message: 'Coupon has been created successfully.',
                data: data.data
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to create the Coupon right now',
                error: err
            });
        }
    });
}


couponController.list = async function (req, res){
    Coupon.listCoupon(req, (err, data) => {
        try {
            res.status(201).send({
                status: 1,
                message: 'List Of Coupons..',
                data: data.data
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to fetch Coupons',
                error: err
            });
        }
    });
}

couponController.CouponbyID = async function (req, res){
    Coupon.CouponByID(req, (err, data) => {
        try {
            res.status(201).send({
                status: 1,
                message: 'Coupon Details.',
                data: data.data
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to fetch Coupon details now',
                error: err
            });
        }
    });
}

couponController.updateCoupon = async function (req, res){
    Coupon.updateCoupon(req, (err, data) => {
        try {
            res.status(201).send({
                status: 1,
                message: 'Coupon Details Updated.',
                data: data.data
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to update Coupon details now',
                error: err
            });
        }
    });
}

couponController.deleteCoupon = async function (req, res){
    Coupon.deleteCoupon(req, (err, data) => {
        try {
            res.status(201).send({
                status: 1,
                message: 'Coupon Has Been Deleted',
                data: data.data
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to delete Coupon now',
                error: err
            });
        }
    });
}

module.exports = couponController