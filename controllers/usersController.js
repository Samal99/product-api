const { token } = require('morgan')
var User = require('../models/usersModel')
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const fileUpload = require('express-fileupload');
const userModel = require('../models/usersModel');
const handlebars = exphbs.create({ extname: '.hbs', });

var app = express();
app.use(fileUpload());
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.use(express.urlencoded({ extended: false }));
var userController = {}
// const a = require('../models/upload')


userController.image = async function (req, res) {

    User.image(req, (err, data) => {
        const dirPath = path.join(__dirname, '../models/upload');
        try {
            const imageFile = data.data[0]['profile_image_name']
            res.sendFile(`${imageFile}`, { root: dirPath })

        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to fetch user details',
                error: err
            });
        }
    });
}





userController.getAadhar = async function (req, res) {
    console.log('aadhar')
    User.getAadhar(req, (err, data) => {
        const dirPath = path.join(__dirname, '../models/upload');
        try {
            const imageFile = data.data[0]['aadhar_image_name']
            res.sendFile(`${imageFile}`, { root: dirPath })

        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to fetch user details',
                error: err
            });
        }
    });
}

userController.getPan = async function (req, res) {

    User.getPan(req, (err, data) => {
        const dirPath = path.join(__dirname, '../models/upload');
        try {
            const imageFile = data.data[0]['pan_image_name']
            res.sendFile(`${imageFile}`, { root: dirPath })

        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to fetch user details',
                error: err
            });
        }
    });
}


userController.getAddress = async function (req, res) {

    User.getAddress(req, (err, data) => {
        const dirPath = path.join(__dirname, '../models/upload');
        try {
            const imageFile = data.data[0]['address_image_name']
            res.sendFile(`${imageFile}`, { root: dirPath })

        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to fetch user details',
                error: err
            });
        }
    });
}


userController.create = async function (req, res) {
    const reqBody = req.body
    // const { f_name, contact, email, password } = req.body
    try {
        await User.createUser(reqBody.f_name, reqBody.l_name, reqBody.contact, reqBody.email, reqBody.password, reqBody.position, reqBody.role, reqBody.ref_id);
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
            res.status(201).json({ status: 1, message: 'Login Successfuly', data: user.user[0]['user_id'], type: user.user[0]['role'], token: user.token });
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

userController.deleteUser = async function (req, res) {
    User.deleteUser(req, (err, data) => {
        try {
            res.status(201).send({
                status: 1,
                message: 'User has been deleted successfully',
                data: data.data
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to delete user',
                error: err
            });
        }
    });
}

// updateRole
userController.updateRole = async function (req, res) {
    User.updateRole(req, (err, data) => {
        try {
            res.status(201).send({
                status: 1,
                message: 'User role has been updated successfuly',
                data: data.data
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to update user role',
                error: err
            });
        }
    });
}

// userRegistratios
userController.userRegistratios = async function (req, res) {
    const reqBody = req.body
    try {
        await User.userRegistratios(reqBody.f_name, reqBody.l_name, reqBody.contact, reqBody.email, reqBody.password, reqBody.position, reqBody.role, reqBody.ref_id, reqBody.l_name,);
        // User.userRegistratios(reqBody.f_name, reqBody.contact, reqBody.email, reqBody.password, reqBody.position, reqBody.role, reqBody.ref_id, (err, data) => {
        res.status(201).send({
            status: 1,
            message: 'User creation request has been created successfuly',
            data: req.body
        });
    } catch (e) {
        res.status(400).send({
            status: 0,
            message: 'Unable to create user creation request.',
            error: e.sqlMessage
        });
    };
}

userController.accoutApprovalList = async function (req, res) {
    User.accoutApprovalList(req, (err, data) => {
        try {
            res.status(201).send({
                status: 1,
                message: 'List of uses need to approve',
                data: data.data
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable tofetch user details',
                error: err
            });
        }
    });
}


userController.activeAccount = async function (req, res) {
    User.activeAccount(req, (err, data) => {
        try {
            res.status(201).send({
                status: 1,
                message: 'Account has been activated successfuly.',
                data: data.data
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to active the account.',
                error: err
            });
        }
    });
}

userController.uploadImage = async function (req, res) {
    User.uploadImage(req, (err, data) => {
        console.log('req', req.body)
        try {
            res.status(201).send({
                status: 1,
                message: 'Profile image has been uploaded successfuly.',
                data: data.data
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to upload profile image right now.',
                error: err
            });
        }
    });
}

userController.uploadAadhar = async function (req, res) {
    User.uploadAadhar(req, (err, data) => {
        console.log('req', req.body)
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

userController.uploadPan = async function (req, res) {
    User.uploadPan(req, (err, data) => {
        console.log('req', req.body)
        try {
            res.status(201).send({
                status: 1,
                message: 'Pan card has been uploaded successfuly.',
                data: data.data
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to upload pan card right now.',
                error: err
            });
        }
    });
}

userController.uploadAddress = async function (req, res) {
    User.uploadAddress(req, (err, data) => {
        console.log('req', req.body)
        try {
            res.status(201).send({
                status: 1,
                message: 'Address Proof has been uploaded successfuly.',
                data: data.data
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to upload address proof right now.',
                error: err
            });
        }
    });
}

userController.sendPassword = async function (req, res) {
    User.sendPassword(req, (err, data) => {
        try {
            res.status(201).send({
                status: 1,
                message: 'Password has been send to your mail address.',
                data: data.data
            });
        } catch (e) {
            res.status(400).send({
                status: 0,
                message: 'Unable to send password right now.',
                error: err
            });
        }
    });
}


module.exports = userController