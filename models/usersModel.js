var mongoose = require('mongoose')
let jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const config = require('../config.js')

const connection = require('../db.js')

class userModel {

    static createUser(f_name, contact, email, password, position, role, ref_id) {
        return new Promise(async (resolve, reject) => {
            const encryptedPassword = await bcrypt.hash(password, saltRounds)
            connection.query(
                "INSERT INTO users (f_name , contact, email, password, position,role, ref_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [f_name, contact, email, encryptedPassword, position, role, ref_id],
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    }

    static loginUser(email, password, callback) {
        return new Promise(async (resolve, reject) => {
            connection.query(
                'SELECT * FROM users WHERE email = ?',
                [email],
                (error, results) => {
                    if (results.length === 0) {
                        return callback('User not found', null);
                    }
                    const user = results[0];
                    bcrypt.compare(password, user.password, (err, isValid) => {
           
                        if (err) {
                            return callback(null, null);
                        }
                        if (!isValid) {
                            return callback('Incorrect password', null);
                        }
                        const token = jwt.sign({ user: user.email }, config.KEY, {
                            expiresIn: '1h',
                        });
                        return callback(null, {user : user, token : token});
                    })


                }
            );
        });
    }

}

module.exports = userModel

