const { token } = require('morgan')
var User = require('../models/usersModel')
var userController = {}



userController.create = async function (req, res) {
    const reqBody = req.body
    // const { f_name, contact, email, password } = req.body
    try {
        await User.createUser(reqBody.f_name, reqBody.contact, reqBody.email, reqBody.password, reqBody.position, reqBody.role, reqBody.ref_id);
        res.status(201).send({
            status: 1,
            message: "User created successfully",
            data: req.body
        });
    } catch (error) {
        res.status(400).send({
            status: 0,
            message: 'Unable to add user',
            error: error.sqlMessage
        }
        );
    }
}

userController.login = async function (req, res) {
    const reqBody = req.body
    User.loginUser(reqBody.email, reqBody.password, (err, user) => {
        if (user) {
            console.log(user)
            res.status(201).json({ status: 1, message: 'Login Successfuly',data : user.user[0]['user_id'], token: user.token });
        } else {
            res.status(400).json({
                status: 0,
                message: err
            });
        }
    });

}

userController.list = async function (req, res) {
    const limit = 2
    User.userList(req, (err, data) => {
        try {
            res.status(201).send({ status: 1, message: 'List of users', totalRecords: data.totalRecords, data: data.data });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to fetch users',
                error: err
            });
        }
    });
}

userController.userDetailsByID = async function (req, res) {
    User.userDetails(req, (err, data) => {
        try {
            res.status(201).send({ 
                status: 1, 
                message: 'User Details', 
                data: data.data 
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to fetch user details',
                error: err
            });
        }
    });


    
}


userController.updateUser = async function (req, res) {
    User.updateUser(req, (err, data) => {
        try {
            res.status(201).send({ 
                status: 1, 
                message: 'User Details updated', 
                data: data.data 
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to update user details',
                error: err
            });
        }
    });    
}

userController.resetPasswordByUser = async function (req, res) {
    User.resetPasswordByUser(req, (err, data) => {
        try {
            res.status(201).send({ 
                status: 1, 
                message: 'Password has been reset successfully', 
                data: data.data 
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to reset your password',
                error: err
            });
        }
    });    
}

userController.updatePasswordByAdmin = async function (req, res) {
    User.updatePasswordByAdmin(req, (err, data) => {
        try {
            res.status(201).send({ 
                status: 1, 
                message: 'Password has been updated successfully', 
                data: data.data 
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to update your password',
                error: err
            });
        }
    });    
}

module.exports = userController