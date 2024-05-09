var mongoose = require('mongoose')
let jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const config = require('../config.js')
var multer = require('multer');
const connection = require('../db.js')

const express = require('express');

const exphbs = require('express-handlebars');
const fileUpload = require('express-fileupload');
const handlebars = exphbs.create({ extname: '.hbs', });
const nodemailer = require('nodemailer');
var app = express();
app.use(fileUpload());

app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, `${__dirname}/upload`)
    },
    filename: function (req, file, cb) {
        return cb(null, `${new Date().toISOString()}_${file.originalname}`)
    }
})

let transporter = nodemailer.createTransport({
    service: 'Gmail', // Use the Gmail SMTP transport
    auth: {
        user: 'samalbikram1999@gmail.com', // Your email address
        pass: 'hfck vppe xfot texl' // Your password (You might need an App Password if 2FA is enabled)
    }
});

const upload = multer({ storage })

class userModel {

    static sendPassword(req, callback) {
        const reqBody = req.body
        console.log('req', reqBody)
        return new Promise(async (resolve, reject) => {


            connection.query(
                `SELECT * FROM users where email = '${reqBody.email}'`,
                async (error, results) => {
                    console.log('results', results)
                    const data = Object.values(JSON.parse(JSON.stringify(results)))
                    console.log('data len', data.length)
                    if (error) {
                        console.log(error)
                        return callback('Unable to fetch users details now', null)
                    } else {
                        if (data) {
                            if (!data.length) {
                                return callback('User is not present. Or you might have entered wrong email address', null)
                            } else {
                                const userDetails = data[0]
                                const newPassword = `${userDetails.f_name.substring(0, userDetails.f_name.indexOf(' '))}${userDetails.user_id}${userDetails.email.substring(4, 8)}`
                                console.log('newPassword', newPassword)
                                const encryptedPassword = await bcrypt.hash(newPassword, saltRounds)
                                connection.query(
                                    `UPDATE users
                                            SET PASSWORD = '${encryptedPassword}'
                                            WHERE email = '${userDetails.email}'`,
                                    (error, results) => {
                                        const data = results
                                        if (error) {
                                            console.log(error)
                                            return callback('Unable to reset password now', null)
                                        } else {
                                            if (data) {
                                                let mailOptions = {
                                                    from: 'samalbikram1999@gmail.com', // Sender address
                                                    to: reqBody.email, // List of recipients
                                                    subject: 'Login Password', // Subject line
                                                    text: `Dear ${userDetails.f_name},
                                
Your new password is: ${newPassword}

Please keep it secure and do not share it with anyone.

Regards,
Rakolkota Software Services PVT LTD`
                                                };
                                                transporter.sendMail(mailOptions, function (error, info) {
                                                    if (error) {
                                                        console.log('error', error)
                                                        return callback(error, null)
                                                    } else {
                                                        return callback(null, { data: info.response });
                                                    }
                                                });
                                            } else {
                                                return callback('Unable to update users password now', null)
                                            }
                                        }
                                    }
                                );


                            }
                        } else {
                            return callback('Unable to fetch users details now', null)
                        }
                    }
                }
            );




        });
    }


    static image(req, callback) {
        return new Promise(async (resolve, reject) => {
            const userId = req.params.id
            connection.query(
                `SELECT * FROM users where user_id = ${userId}`,
                (error, results) => {
                    if (error) {
                        console.log(error)
                        return callback('Unable to fetch users details now', null)
                    } else {
                        const data = Object.values(JSON.parse(JSON.stringify(results)))

                        if (data) {
                            return callback(null, { data: data });
                        } else {
                            return callback('Unable to fetch users details now', null)
                        }
                    }
                }
            );
        });
    }

    static getAadhar(req, callback) {
        return new Promise(async (resolve, reject) => {
            const userId = req.params.id
            connection.query(
                `SELECT * FROM users where user_id = ${userId}`,
                (error, results) => {
                    if (error) {
                        console.log(error)
                        return callback('Unable to fetch users details now', null)
                    } else {
                        const data = Object.values(JSON.parse(JSON.stringify(results)))

                        if (data) {
                            return callback(null, { data: data });
                        } else {
                            return callback('Unable to fetch users details now', null)
                        }
                    }
                }
            );
        });
    }

    static getPan(req, callback) {
        return new Promise(async (resolve, reject) => {
            const userId = req.params.id
            connection.query(
                `SELECT * FROM users where user_id = ${userId}`,
                (error, results) => {
                    if (error) {
                        console.log(error)
                        return callback('Unable to fetch users details now', null)
                    } else {
                        const data = Object.values(JSON.parse(JSON.stringify(results)))

                        if (data) {
                            return callback(null, { data: data });
                        } else {
                            return callback('Unable to fetch users details now', null)
                        }
                    }
                }
            );
        });
    }

    static getAddress(req, callback) {
        return new Promise(async (resolve, reject) => {
            const userId = req.params.id
            connection.query(
                `SELECT * FROM users where user_id = ${userId}`,
                (error, results) => {
                    if (error) {
                        console.log(error)
                        return callback('Unable to fetch users details now', null)
                    } else {
                        const data = Object.values(JSON.parse(JSON.stringify(results)))

                        if (data) {
                            return callback(null, { data: data });
                        } else {
                            return callback('Unable to fetch users details now', null)
                        }
                    }
                }
            );
        });
    }


    static createUser(f_name, l_name, contact, email, password, position, role, ref_id, isActive) {
        return new Promise(async (resolve, reject) => {
            const isActive = true
            const encryptedPassword = await bcrypt.hash(password, saltRounds)
            connection.query(
                "INSERT INTO users (f_name , l_name, contact, email, password, position,role, ref_id,isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)",
                [f_name, l_name, contact, email, encryptedPassword, position, role, ref_id, isActive],
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
                    if (results) {
                        if (results && results.length === 0) {
                            return callback('User not found', null);
                        }
                        const user = results[0];
                        console.log('user.isActive', user.isActive)
                        if (!user.isActive) {
                            return callback('You account is not yet verified, Please contact with your admin for approval', null);
                        }
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
                            return callback(null, { user: Object.values(JSON.parse(JSON.stringify(results))), token: token });
                        })
                    }else{
                        return callback(error, null);
                    }

                }
            );
        });
    }

    static userList(req, callback) {
        return new Promise(async (resolve, reject) => {
            const reqBody = req.body
            const resultsPerPage = reqBody['itemPerPage'] > 0 ? reqBody['itemPerPage'] : 5;
            const page = reqBody['page'] >= 1 ? reqBody['page'] : 1;
            const skip = resultsPerPage * (page - 1);
            let email = ''
            let contact = ''
            if (reqBody.email) {
                email = reqBody.email
            }
            if (reqBody.contact) {
                contact = reqBody.contact
            }
            console.log('email & contact', email, contact)
            let totalRecords = 0
            connection.query(
                `SELECT COUNT(*) FROM users 
                ${email || contact ? 'where' : ''}
                ${email ? `email LIKE '%${email}%'` : ''} 
                ${email && contact ? '&&' : ''}
                ${contact ? `contact LIKE '%${contact}%'` : ''}`,
                (error, results) => {
                    totalRecords = Object.values(JSON.parse(JSON.stringify(results)))
                }
            );
            connection.query(
                `SELECT user_id,f_name,l_name,email,contact,role,ref_id,position,state,city,address,pin,profile_image_name, isActive FROM users 
                ${email || contact ? 'where' : ''}
                ${email ? `email LIKE '%${email}%'` : ''} 
                ${email && contact ? '&&' : ''}
                ${contact ? `contact LIKE '%${contact}%'` : ''} 
                ORDER BY user_id DESC
                limit ${skip},${resultsPerPage}`,
                (error, results) => {

                    if (error) {
                        console.log(error)
                        return callback(error.sqlMessage, null)
                    } else {
                        const data = Object.values(JSON.parse(JSON.stringify(results)))
                        if (data) {
                            return callback(null, { data: data, totalRecords: totalRecords[0]['COUNT(*)'] });
                        } else {
                            return callback('Unable to fetch users details now', null)
                        }
                    }
                }
            );
        });
    }

    static userDetails(req, callback) {
        return new Promise(async (resolve, reject) => {
            const userId = req.params.id
            connection.query(
                `SELECT * FROM users where user_id = ${userId}`,
                (error, results) => {
                    if (error) {
                        console.log(error)
                        return callback('Unable to fetch users details now', null)
                    } else {
                        const data = Object.values(JSON.parse(JSON.stringify(results)))

                        if (data) {
                            return callback(null, { data: data });
                        } else {
                            return callback('Unable to fetch users details now', null)
                        }
                    }
                }
            );
        });
    }

    static updateUser(req, callback) {
        return new Promise(async (resolve, reject) => {
            const userId = req.params.id
            const reqBody = req.body

            connection.query(
                `UPDATE users
                SET f_name = '${reqBody.f_name}',
                l_name = '${reqBody.l_name}',
                email = '${reqBody.email}',
                contact = '${reqBody.contact}',
                city = '${reqBody.city}',
                state = '${reqBody.state}',
                address = '${reqBody.address}',
                position = '${reqBody.position}',
                role = '${reqBody.role}',
                ref_id = '${reqBody.ref_id}',
                isActive = '${reqBody.isActive}',
                pin = '${reqBody.pin}'
                WHERE user_id = ${userId}`,
                (error, results) => {
                    const data = results
                    if (error) {
                        console.log(error)
                        return callback('Unable to update users details now', null)
                    } else {
                        if (data) {
                            return callback(null, { data: data });
                        } else {
                            return callback('Unable to update users details now', null)
                        }
                    }
                }
            );
        });
    }

    static resetPasswordByUser(req, callback) {
        return new Promise(async (resolve, reject) => {
            const userId = req.params.id
            const reqBody = req.body
            console.log(reqBody)
            let email = '';
            let password = '';
            let newPassword = '';
            if (reqBody.email) {
                email = reqBody.email
            } if (reqBody.password) {
                password = reqBody.password
            } if (reqBody.newPassword) {
                newPassword = reqBody.newPassword
            } if (!newPassword) {
                return callback('Please enter your new password', null);
            }
            connection.query(
                'SELECT * FROM users WHERE user_id = ?',
                [userId],
                (error, results) => {
                    if (results.length === 0) {
                        return callback('User not found', null);
                    }
                    const user = results[0];
                    bcrypt.compare(password, user.password, async (err, isValid) => {
                        if (err) {
                            return callback(null, null);
                        }
                        if (!isValid) {
                            return callback('Your Current Password Is incorrect', null);
                        } if (isValid) {
                            const encryptedPassword = await bcrypt.hash(newPassword, saltRounds)
                            connection.query(
                                `UPDATE users
                                SET PASSWORD = '${encryptedPassword}'
                                WHERE user_id = ${userId}`,
                                (error, results) => {
                                    const data = results
                                    if (error) {
                                        console.log(error)
                                        return callback('Unable to reset password now', null)
                                    } else {
                                        if (data) {
                                            return callback(null, { data: data });
                                        } else {
                                            return callback('Unable to update users password now', null)
                                        }
                                    }
                                }
                            );
                        }

                        // return callback(null, { user: Object.values(JSON.parse(JSON.stringify(results))), token: token });
                    })
                }
            );
        });
    }


    static updatePasswordByAdmin(req, callback) {
        return new Promise(async (resolve, reject) => {
            const reqBody = req.body
            let email = '';
            let newPassword = '';
            if (reqBody.email) {
                email = reqBody.email
            } if (reqBody.newPassword) {
                newPassword = reqBody.newPassword
            }
            connection.query(
                'SELECT * FROM users WHERE email = ?',
                [email],
                async (error, results) => {
                    if (results.length === 0) {
                        return callback('User not found', null);
                    }
                    const user = results[0];
                    const encryptedPassword = await bcrypt.hash(newPassword, saltRounds)
                    connection.query(
                        `UPDATE users
                                SET PASSWORD = '${encryptedPassword}'
                                WHERE email = '${email}'`,

                        (error, results) => {
                            const data = results
                            if (error) {
                                console.log(error)
                                return callback('Unable to reset password now', null)
                            } else {
                                if (data) {
                                    return callback(null, { data: data });
                                } else {
                                    return callback('Unable to update users password now', null)
                                }
                            }
                        }
                    );

                }
            );
        });
    }

    static deleteUser(req, callback) {
        return new Promise(async (resolve, reject) => {
            const userId = req.params.id
            const reqBody = req.body
            connection.query(
                `SELECT * FROM users
                WHERE user_id = ${userId}`,
                (error, results) => {
                    const data = Object.values(JSON.parse(JSON.stringify(results)))
                    if (error) {
                        console.log(error)
                        return callback('User is not found.', null)
                    } else {
                        if (data.length) {
                            connection.query(
                                `DELETE FROM users
                                WHERE user_id = ${userId}`,
                                (error, results) => {
                                    const data = results
                                    if (error) {
                                        console.log(error)
                                        return callback('Unable to delete user now', null)
                                    } else {
                                        if (data) {
                                            return callback(null, { data: data });
                                        } else {
                                            return callback('Unable to delete users now', null)
                                        }
                                    }
                                }
                            );
                        } else {
                            return callback('Unable to find the user at this moment.', null)
                        }
                    }
                }
            );

        });
    }

    static updateRole(req, callback) {
        return new Promise(async (resolve, reject) => {
            const userId = req.params.id
            const reqBody = req.body
            let role = '';
            if (reqBody.role) {
                role = reqBody.role
            } if (!role) {
                return callback('Please add the role.', null)
            }
            connection.query(
                `SELECT * FROM users where user_id = ${userId}`,
                (error, results) => {
                    const data = Object.values(JSON.parse(JSON.stringify(results)))
                    if (error) {
                        console.log(error)
                        return callback('Unable to fetch users details now', null)
                    } else {
                        if (data.length) {
                            connection.query(
                                `UPDATE users
                                SET role = '${role}'
                                WHERE user_id = ${userId}`,
                                (error, results) => {
                                    const data = results
                                    if (error) {
                                        console.log(error)
                                        return callback('Unable to update users details now', null)
                                    } else {
                                        if (data) {
                                            return callback(null, { data: data });
                                        } else {
                                            return callback('Unable to update users details now', null)
                                        }
                                    }
                                }
                            );
                        } else {
                            return callback('User not found', null)
                        }
                    }
                }
            );

        });
    }

    static userRegistratios(f_name, l_name, contact, email, password, position, ref_id) {
        return new Promise(async (resolve, reject) => {
            const encryptedPass = await bcrypt.hash(password, saltRounds)
            connection.query(
                "INSERT INTO users (f_name ,  contact, email, password, position, ref_id,l_name) VALUES (?, ?,?, ?, ?, ?, ?)",
                [f_name, contact, email, encryptedPass, position, ref_id, l_name],
                (error, results) => {
                    if (error) {
                        console.log('err', error)
                        reject(error);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    }


    static accoutApprovalList(req, callback) {
        return new Promise(async (resolve, reject) => {
            connection.query(
                `SELECT * FROM users where isActive = 0`,
                (error, results) => {
                    const data = Object.values(JSON.parse(JSON.stringify(results)))
                    if (error) {
                        console.log(error)
                        return callback('Unable to fetch users details now', null)
                    } else {
                        if (data) {
                            return callback(null, { data: data });
                        } else {
                            return callback('Unable to fetch users details now', null)
                        }
                    }
                }
            );
        });
    }

    static activeAccount(req, callback) {
        return new Promise(async (resolve, reject) => {
            const userId = req.params.id
            const reqBody = req.body
            connection.query(
                `SELECT * FROM users where user_id = ${userId}`,
                (error, results) => {
                    const data = Object.values(JSON.parse(JSON.stringify(results)))
                    console.log(data.length)
                    if (error) {
                        console.log(error)
                        return callback('Unable to fetch users details now', null)
                    } else {
                        if (data.length) {
                            connection.query(
                                `UPDATE users
                                SET isActive = ${reqBody.isActive}
                                WHERE user_id = ${userId}`,
                                (error, results) => {
                                    console.log(results)
                                    const data = Object.values(JSON.parse(JSON.stringify(results)))
                                    if (error) {
                                        console.log(error)
                                        return callback('Unable to active accout right now', null)
                                    } else {
                                        if (data) {
                                            return callback(null, { data: data });
                                        } else {
                                            return callback('Unable to fetch users details now', null)
                                        }
                                    }
                                }
                            );
                        } else {
                            return callback('User is not present', null)
                        }
                    }
                }
            );
        });
    }

    static uploadImage(req, callback) {
        return new Promise(async (resolve, reject) => {
            const userId = req.params.id
            const reqBody = req.files
            console.log(reqBody)
            let sampleFile;
            let uploadPath;
            if (!req.files || Object.keys(req.files).length === 0) {
                return callback('No files were uploaded', null)
            }
            sampleFile = req.files.file;
            console.log('sampleFile.name', sampleFile.name)
            let num = 9898989
            const fullFile = `${userId}${sampleFile.name}`
            console.log('fullFile', fullFile)
            console.log('path', `${__dirname}/upload/${fullFile}`)
            uploadPath = __dirname + '/upload/' + fullFile;
            console.log('uploadPath', uploadPath)
            // upload.single(sampleFile)
            connection.query(
                `SELECT * FROM users where user_id = ${userId}`,
                (error, results) => {
                    const data = Object.values(JSON.parse(JSON.stringify(results)))
                    if (error) {
                        console.log(error)
                        return callback('Unable to fetch users details now', null)
                    } else {
                        if (data.length) {
                            sampleFile.mv(uploadPath, function (err) {
                                console.log('sample file', sampleFile.name)
                                if (err) return callback(err, null)
                                console.log('err', err)
                                console.log('fullFile in query', fullFile)
                                connection.query(`UPDATE users SET profile_image = ${sampleFile.name} ,profile_image_name = '${fullFile}' WHERE user_id =${userId}`, (err, rows) => {
                                    if (!err) {
                                        return callback(null, { data: data });
                                    } else {
                                        console.log(err);
                                    }
                                });
                            });

                            // sampleFile.mv(`${__dirname}/upload/${sampleFile.name}`, err => {
                            //     if (err) {
                            //         return callback(err, null)
                            //     }
                            //     return callback( null, 'Image uploaded successfulty.',)
                            //    });
                        } else {
                            return callback('User is not present', null)
                        }
                    }
                }
            );
        });
    }

    static uploadAadhar(req, callback) {
        return new Promise(async (resolve, reject) => {
            const userId = req.params.id
            const reqBody = req.files
            console.log(reqBody)
            let sampleFile;
            let uploadPath;
            if (!req.files || Object.keys(req.files).length === 0) {
                return callback('No files were uploaded', null)
            }
            sampleFile = req.files.file;
            console.log('sampleFile.name', sampleFile.name)
            const fullFile = `${userId}aadhar${new Date().getTime()}${sampleFile.name}`
            console.log('fullFile', fullFile)
            console.log('path', `${__dirname}/upload/${fullFile}`)
            uploadPath = __dirname + '/upload/' + fullFile;
            console.log('uploadPath', uploadPath)
            // upload.single(sampleFile)
            connection.query(
                `SELECT * FROM users where user_id = ${userId}`,
                (error, results) => {
                    if (error) {
                        console.log(error)
                        return callback('Unable to fetch users details now', null)
                    } else {
                        const data = Object.values(JSON.parse(JSON.stringify(results)))

                        if (data.length) {
                            sampleFile.mv(uploadPath, function (err) {
                                console.log('sample file', sampleFile.name)
                                if (err) return callback(err, null)
                                console.log('err', err)
                                console.log('fullFile in query', fullFile)
                                connection.query(`UPDATE users SET aadhar_card = ? ,aadhar_image_name = '${fullFile}' WHERE user_id =${userId}`, [sampleFile.name], (err, rows) => {
                                    if (!err) {
                                        return callback(null, { data: data });
                                    } else {
                                        console.log(err);
                                    }
                                });
                            });

                            // sampleFile.mv(`${__dirname}/upload/${sampleFile.name}`, err => {
                            //     if (err) {
                            //         return callback(err, null)
                            //     }
                            //     return callback( null, 'Image uploaded successfulty.',)
                            //    });
                        } else {
                            return callback('User is not present', null)
                        }
                    }
                }
            );
        });
    }

    static uploadPan(req, callback) {
        return new Promise(async (resolve, reject) => {
            const userId = req.params.id
            const reqBody = req.files
            console.log(reqBody)
            let sampleFile;
            let uploadPath;
            if (!req.files || Object.keys(req.files).length === 0) {
                return callback('No files were uploaded', null)
            }
            sampleFile = req.files.file;
            console.log('sampleFile.name', sampleFile.name)
            const fullFile = `${userId}pan${new Date().getTime()}${sampleFile.name}`
            console.log('fullFile', fullFile)
            console.log('path', `${__dirname}/upload/${fullFile}`)
            uploadPath = __dirname + '/upload/' + fullFile;
            console.log('uploadPath', uploadPath)
            // upload.single(sampleFile)
            connection.query(
                `SELECT * FROM users where user_id = ${userId}`,
                (error, results) => {
                    if (error) {
                        console.log(error)
                        return callback('Unable to fetch users details now', null)
                    } else {
                        const data = Object.values(JSON.parse(JSON.stringify(results)))

                        if (data.length) {
                            sampleFile.mv(uploadPath, function (err) {
                                console.log('sample file', sampleFile.name)
                                if (err) return callback(err, null)
                                console.log('err', err)
                                console.log('fullFile in query', fullFile)
                                connection.query(`UPDATE users SET pan_card = ? ,pan_image_name = '${fullFile}' WHERE user_id =${userId}`, [sampleFile.name], (err, rows) => {
                                    if (!err) {
                                        return callback(null, { data: data });
                                    } else {
                                        console.log(err);
                                    }
                                });
                            });

                            // sampleFile.mv(`${__dirname}/upload/${sampleFile.name}`, err => {
                            //     if (err) {
                            //         return callback(err, null)
                            //     }
                            //     return callback( null, 'Image uploaded successfulty.',)
                            //    });
                        } else {
                            return callback('User is not present', null)
                        }
                    }
                }
            );
        });
    }

    static uploadAddress(req, callback) {
        return new Promise(async (resolve, reject) => {
            const userId = req.params.id
            const reqBody = req.files
            console.log(reqBody)
            let sampleFile;
            let uploadPath;
            if (!req.files || Object.keys(req.files).length === 0) {
                return callback('No files were uploaded', null)
            }
            sampleFile = req.files.file;
            console.log('sampleFile.name', sampleFile.name)
            const fullFile = `${userId}address${new Date().getTime()}${sampleFile.name}`
            console.log('fullFile', fullFile)
            console.log('path', `${__dirname}/upload/${fullFile}`)
            uploadPath = __dirname + '/upload/' + fullFile;
            console.log('uploadPath', uploadPath)
            // upload.single(sampleFile)
            connection.query(
                `SELECT * FROM users where user_id = ${userId}`,
                (error, results) => {
                    if (error) {
                        console.log(error)
                        return callback('Unable to fetch users details now', null)
                    } else {
                        const data = Object.values(JSON.parse(JSON.stringify(results)))

                        if (data.length) {
                            sampleFile.mv(uploadPath, function (err) {
                                console.log('sample file', sampleFile.name)
                                if (err) return callback(err, null)
                                console.log('err', err)
                                console.log('fullFile in query', fullFile)
                                connection.query(`UPDATE users SET address_proof = ? ,address_image_name = '${fullFile}' WHERE user_id =${userId}`, [sampleFile.name], (err, rows) => {
                                    if (!err) {
                                        return callback(null, { data: data });
                                    } else {
                                        console.log(err);
                                    }
                                });
                            });

                            // sampleFile.mv(`${__dirname}/upload/${sampleFile.name}`, err => {
                            //     if (err) {
                            //         return callback(err, null)
                            //     }
                            //     return callback( null, 'Image uploaded successfulty.',)
                            //    });
                        } else {
                            return callback('User is not present', null)
                        }
                    }
                }
            );
        });
    }

}



module.exports = userModel

