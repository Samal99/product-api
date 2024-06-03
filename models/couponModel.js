
const connection = require('../db.js')


class couponModel {

    static createCoupon(req, callback) {
        const reqBody = req.body
        console.log(reqBody)
        return new Promise(async (resolve, reject) => {
            connection.query(
                `INSERT INTO coupon(c_code) VALUES (?) `,
                [reqBody.c_code],
                (error, results) => {
                    if (error) {
                        console.log('error', error)
                        return callback(error && error.sqlMessage ? error.sqlMessage : error, null)
                    } else {
                        return callback(null, { data: results });
                    }
                }
            );
        });
    }

    static listCoupon(req, callback) {
        const reqBody = req.body
        const resultsPerPage = reqBody['itemPerPage'] > 0 ? reqBody['itemPerPage'] : 10;
        const page = reqBody['page'] >= 1 ? reqBody['page'] : 1;
        const skip = resultsPerPage * (page - 1);
        console.log(reqBody)
        return new Promise(async (resolve, reject) => {
            connection.query(
                `SELECT * FROM coupon 
                ORDER BY c_id DESC`,
                (error, results) => {
                    if (error) {
                        console.log('error', error)
                        return callback(error && error.sqlMessage ? error.sqlMessage : error, null)
                    } else {
                        return callback(null, { data: results });
                    }
                }
            );
        });
    }

    static offerByID(req, callback) {
        const reqBody = req.body
        const offerID = req.params.id
        console.log(reqBody)
        return new Promise(async (resolve, reject) => {
            connection.query(
                `SELECT * FROM offers where offer_id = ${offerID}`,
                (error, results) => {
                    if (error) {
                        console.log('error', error)
                        return callback(error && error.sqlMessage ? error.sqlMessage : error, null)
                    } else {
                        return callback(null, { data: results });
                    }
                }
            );
        });
    }

    static updateOffer(req, callback) {
        const reqBody = req.body
        const offerID = req.params.id
        console.log(reqBody)
        return new Promise(async (resolve, reject) => {
            connection.query(
                `UPDATE offers SET offer_type = ?, offer_name = ?, offer_discount = ?, offer_color = ? , color_name= ? where offer_id = ${offerID}`,
                [reqBody.offer_type, reqBody.offer_name, reqBody.offer_discount,reqBody.offer_color, reqBody.color_name],
                (error, results) => {
                    if (error) {
                        console.log('error', error)
                        return callback(error && error.sqlMessage ? error.sqlMessage : error, null)
                    } else {
                        return callback(null, { data: results });
                    }
                }
            );
        });
    }

    static deleteOffer(req, callback) {
        const reqBody = req.body
        const offerID = req.params.id
        console.log(reqBody)
        return new Promise(async (resolve, reject) => {
            connection.query(
                `DELETE FROM offers where offer_id = ${offerID}`,
                (error, results) => {
                    if (error) {
                        console.log('error', error)
                        return callback(error && error.sqlMessage ? error.sqlMessage : error, null)
                    } else {
                        return callback(null, { data: results });
                    }
                }
            );
        });
    }
    
}

module.exports = couponModel