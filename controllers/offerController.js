var Offer = require('../models/offerModel')
var offerController = {}


offerController.create = async function (req, res){
    Offer.createOffer(req, (err, data) => {
        try {
            res.status(201).send({
                status: 1,
                message: 'Offer has been created successfully.',
                data: data.data
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to create the offer right now',
                error: err
            });
        }
    });
}


offerController.list = async function (req, res){
    Offer.listOffer(req, (err, data) => {
        try {
            res.status(201).send({
                status: 1,
                message: 'List Of Offers..',
                data: data.data
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to fetch offers',
                error: err
            });
        }
    });
}

offerController.offerbyID = async function (req, res){
    Offer.offerByID(req, (err, data) => {
        try {
            res.status(201).send({
                status: 1,
                message: 'Offer Details.',
                data: data.data
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to fetch offer details now',
                error: err
            });
        }
    });
}

offerController.updateOffer = async function (req, res){
    Offer.updateOffer(req, (err, data) => {
        try {
            res.status(201).send({
                status: 1,
                message: 'Offer Details Updated.',
                data: data.data
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to update offer details now',
                error: err
            });
        }
    });
}

offerController.deleteOffer = async function (req, res){
    Offer.deleteOffer(req, (err, data) => {
        try {
            res.status(201).send({
                status: 1,
                message: 'Offer Has Been Deleted',
                data: data.data
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to delete offer now',
                error: err
            });
        }
    });
}

module.exports = offerController