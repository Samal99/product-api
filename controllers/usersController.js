const { token } = require('morgan')
var User = require('../models/usersModel')
var userController = {}


userController.creates = async function (req, res) {
    const reqBody = req.body
    try {
        const record = new User(reqBody)
        const saveRecord = await record.save()
        res.status(200).send({
            status: 1,
            messages: 'User Crerated Successfuly.',
            data: saveRecord
        })
    } catch (e) {
        res.status(400).send({
            status: 0,
            messages: 'Failed to create user.',
            error: e
        })
    }
}


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
            res.status(201).json({ status: 1, message: 'Login Successfuly', token : user.token });
        } else {
            res.status(400).json({
                status: 0,
                message: err
            });
        }
    });

}



module.exports = userController