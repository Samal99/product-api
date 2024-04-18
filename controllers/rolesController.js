var Role = require('../models/roleModel')
var roleController = {}

roleController.create = async function (req, res){
    Role.createRole(req, (err, data) => {
        try {
            res.status(201).send({
                status: 1,
                message: 'Role has been created successfully.',
                data: data.data
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to create the role right now',
                error: err
            });
        }
    });
}

roleController.list = async function (req, res){
    Role.rolesListing(req, (err, data) => {
        // console.log(data)
        try {
            res.status(201).send({
                status: 1,
                message: 'List of roles',
                totalRecords: data.totalRecords,
                data: data.data
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to fetch roles list',
                error: err
            });
        }
    });
}

roleController.update = async function (req, res){
    Role.updateRole(req, (err, data) => {
        // console.log(data)
        try {
            res.status(201).send({
                status: 1,
                message: 'Role has been updated successfully',
                data: data.data
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to update role right now',
                error: err
            });
        }
    });
}

roleController.deleteRole = async function (req, res) {
    Role.deleteRole(req, (err, data) => {
        try {
            res.status(201).send({
                status: 1,
                message: 'Role has been deleted successfully',
                data: data.data
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to delete role',
                error: err
            });
        }
    });
}

module.exports = roleController