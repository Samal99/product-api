
const connection = require('../db.js')


class cartModel {


    static createCart(req, callback) {
        const reqBody = req.body
        // console.log(reqBody)

        return new Promise(async (resolve, reject) => {
            let user = {}
            let product = {}
            connection.query(
                `SELECT * FROM users WHERE USER_ID = ${reqBody.user}`,
                (error, results) => {
                    if (error) {
                        return callback(error && error.sqlMessage ? error.sqlMessage : error, null)
                    } else {
                        const data = Object.values(JSON.parse(JSON.stringify(results)))
                        if (data && data.length) {
                            user = data
                            connection.query(
                                `SELECT * FROM products WHERE PROD_ID = ${reqBody.product}`,
                                (error, results) => {
                                    if (error) {
                                        return callback(error && error.sqlMessage ? error.sqlMessage : error, null)
                                    } else {
                                        const data = Object.values(JSON.parse(JSON.stringify(results)))
                                        // console.log('data',data)
                                        if (data && data.length) {
                                            product = data
                                            // console.log('cart and product', product,user)
                                            connection.query(
                                                `INSERT INTO carts (users, product,users_id,product_id,price_per_unit,total) VALUES (?,?,?,?,?,?)`,
                                                [JSON.stringify(user[0]), JSON.stringify(product[0]), user[0].user_id, product[0].prod_id, product[0].price, product[0].price],
                                                (error, results) => {
                                                    if (error) {
                                                        console.log('error', error)
                                                        return callback(error && error.sqlMessage ? error.sqlMessage : error, null)
                                                    } else {
                                                        // console.log('results cart', results)
                                                        return callback(null, { data: Object.values(JSON.parse(JSON.stringify(results))) });
                                                    }
                                                }
                                            );
                                        } else {
                                            return callback(`No product found !!!`, null)
                                        }
                                    }
                                }
                            )
                        } else {
                            return callback(`No user found !!!`, null)
                        }
                    }
                }
            )


        });
    }

    static listCart(req, callback) {
        const reqBody = req.body
        const resultsPerPage = reqBody['itemPerPage'] > 0 ? reqBody['itemPerPage'] : 10;
        const page = reqBody['page'] >= 1 ? reqBody['page'] : 1;
        const skip = resultsPerPage * (page - 1);
        // console.log(reqBody)
        let userID = ''
        if (reqBody.userID) {
            userID = reqBody.userID
        }
        let totalRecords = 0
        let sqlQueryCount = `SELECT COUNT(*) FROM carts ${userID ? `WHERE users_id = ${userID} and isPlaced = 0` : ''}`;
        const searchString = `WHERE user_id = ${userID} and isPlaced = 0`
        return new Promise(async (resolve, reject) => {
            connection.query(
                sqlQueryCount,
                (error, results) => {
                    totalRecords = Object.values(JSON.parse(JSON.stringify(results)))
                    // console.log('totalRecords',totalRecords)
                }
            );
            connection.query(
                `SELECT * FROM carts ${userID ? `WHERE users_id = ${userID} and isPlaced = 0` : ''}
                ORDER BY cart_id DESC
                limit ${skip},${resultsPerPage}`,
                (error, results) => {
                    if (error) {
                        console.log('error', error)
                        return callback(error && error.sqlMessage ? error.sqlMessage : error, null)
                    } else {
                        return callback(null, { data: results , totalRecords : totalRecords[0]['COUNT(*)'] });
                    }
                }
            );
        });
    }

    static updateCartItems(req, callback) {
        const reqBody = req.body
        const cartID = req.params.id
        // console.log('reqBody',reqBody)
        return new Promise(async (resolve, reject) => {
            connection.query(
                `SELECT * FROM carts where cart_id = ${cartID}`,
                (error, results) => {
                    if (error) {
                        return callback(error && error.sqlMessage ? error.sqlMessage : error, null)
                    } else {
                        const data = Object.values(JSON.parse(JSON.stringify(results)))
                        // console.log('data', data[0])
                        
                        if (data.length) {
                            let unit = data[0]['units']
                            // console.log('unit ++',unit)
                            // if(reqBody.type === 'plus'){
                            //     unit = unit + 1
                            // }else{
                            //     if(unit < 2)  return callback('Can not set unit value bellow 1', null)
                            //     unit = unit - 1
                            // }
                            // return callback(null, { data: results });
                            connection.query(
                                `UPDATE carts SET units = ?, total = ? where cart_id = ${cartID}`,
                                [reqBody.type, data[0]['price_per_unit'] * reqBody.type ],
                                (error, results) => {
                                    if (error) {
                                        console.log('error', error)
                                        return callback(error && error.sqlMessage ? error.sqlMessage : error, null)
                                    } else {
                                        return callback(null, { data: results });
                                    }
                                }
                            );
                        } else {
                            return callback('Unable to fetch carts now', null)
                        }
                    }
                }
            )
        });
    }
















    static offerByID(req, callback) {
        const reqBody = req.body
        const offerID = req.params.id
        // console.log(reqBody)
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


    static deleteCart(req, callback) {
        const reqBody = req.body
        const cartID = req.params.id
        // console.log(reqBody)
        return new Promise(async (resolve, reject) => {
            connection.query(
                `DELETE FROM carts where cart_id = ${cartID}`,
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

module.exports = cartModel