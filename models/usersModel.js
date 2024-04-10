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
                        return callback(null, { user: user, token: token });
                    })
                }
            );
        });
    }

    static userList(req, callback) {
        return new Promise(async (resolve, reject) => {
            const reqBody = req.body
            const resultsPerPage = reqBody['itemPerPage'] > 0 ? reqBody['itemPerPage'] : 10;
            const page = reqBody['page'] >= 1 ? reqBody['page'] : 1;
            const skip = resultsPerPage * (page - 1);
            let email = ''
            let contact = ''
            if(reqBody.email){
                email = reqBody.email
            } if(reqBody.contact){
                contact = reqBody.contact
            }
            console.log('email & contact',email,contact)
            let totalRecords = 0
            connection.query(
                `SELECT COUNT(*) FROM users`,
                (error, results) => {
                    totalRecords = Object.values(JSON.parse(JSON.stringify(results)))
                }
            );
            connection.query(
                `SELECT * FROM users 
                ${email || contact ? 'where' : ''}
                ${ email ? `email = '${email}'` : '' } 
                ${email && contact ? '&&' : ''}
                ${ contact ? `contact = '${contact}'` : '' } 
                limit ${skip},${resultsPerPage}`,
                (error, results) => {
                    const data = Object.values(JSON.parse(JSON.stringify(results)))
                    if (error) {
                        console.log(error)
                        return callback('Unable to fetch users details now', null)
                    } else {
                        if (data) {
                            return callback(null, { data: data , totalRecords : totalRecords[0]['COUNT(*)']});
                        } else {
                            return callback('Unable to fetch users details now', null)
                        }
                    }
                }
            );
        });
    }

}

module.exports = userModel

