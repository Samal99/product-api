const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');
const config = require('../config')
const connection = require('../db.js')

exports.grantAccess = function (modName = '', permName = '') {
    return async (req, res, next) => {
        try {
            const token = req.header('authorization');
            if (!token) return res.status(401).send({ status: 0, message: 'Access Denied: No Token Provided!' });
            try {
                const decoded = jwt.verify(token, config.KEY);
                if (decoded) {
                    console.log(decoded)
                    connection.query(
                        'SELECT * FROM users WHERE email = ?',
                        [decoded.user],
                        (err, results) => {
                            if (err) {
                                res.status(401).send({ status: 0, message: 'Invalid Token...', });
                            } else {
                                const userData = results[0]
                                if (userData) {
                                    req.email = userData.email;
                                    // if(modName){
                                    //     const access = modName === userData.role ? next () : res.status(401).send({ status: 0, message: 'Unauthorized Access' });
                                    // }else{}
                                    modName ? (modName && modName === userData.role ? next () : res.status(401).send({ status: 0, message: 'Unauthorized Access' })) : next ()
                                } else {
                                    res.status(401).send({ status: 0, message: 'Unable to process your request' });
                                }
                            }
                        })

                } else {
                    res.status(401).send({ status: 0, message: 'Unable to process your request' });
                }
            }
            catch (ex) {
                if (ex['name'] === 'TokenExpiredError') {
                    next();
                } else {
                    res.status(401).send({ status: 0, message: 'Invalid Token' });
                }
            }
        } catch (error) {
            next(error)
        }
    }
}
module.exports = exports;