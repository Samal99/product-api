const config = require('../config.js')

const connection = require('../db.js')


class productModel {

    static createProduct(req, callback) {
        const reqBody = req.body
        console.log(reqBody)
        return new Promise(async (resolve, reject) => {
            let prodName = ''
            let prodDesc = ''
            if (reqBody.prod_name) {
                prodName = reqBody.prod_name
            } if (reqBody.prod_desc) {
                prodDesc = reqBody.prod_desc
            }
            connection.query(
                `INSERT INTO products(prod_name,prod_desc) VALUES (?,?)`,
                [prodName, prodDesc],
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

    static listProduct(req, callback) {
        const reqBody = req.body
        console.log(reqBody)
        const resultsPerPage = reqBody['itemPerPage'] > 0 ? reqBody['itemPerPage'] : 10;
        const page = reqBody['page'] >= 1 ? reqBody['page'] : 1;
        const skip = resultsPerPage * (page - 1);
        let prod_name = ''
        if (reqBody.prod_name) {
            prod_name = reqBody.prod_name
        }
        let totalRecords = 0

        return new Promise(async (resolve, reject) => {
            connection.query(
                `SELECT COUNT(*) FROM products`,
                (error, results) => {
                    totalRecords = Object.values(JSON.parse(JSON.stringify(results)))
                }
            );
            connection.query(
                `SELECT * FROM products 
                ${prod_name ? 'where' : ''}
                ${prod_name ? `prod_name = '${prod_name}'` : ''} 
                limit ${skip},${resultsPerPage}`,
                (error, results) => {
                    const data = Object.values(JSON.parse(JSON.stringify(results)))
                    if (error) {
                        console.log(error)
                        return callback('Unable to fetch product details now', null)
                    } else {
                        if (data) {
                            console.log('data', data)
                            return callback(null, { data: data, totalRecords: totalRecords[0]['COUNT(*)'] });
                        } else {
                            return callback('Unable to fetch product details now', null)
                        }
                    }
                }
            );
        });
    }

    static listProductByID(req, callback) {
        const prodId = req.params.id
        console.log('prodId', prodId)

        return new Promise(async (resolve, reject) => {
            connection.query(
                `SELECT * FROM products where prod_id = ${prodId}`,
                (error, results) => {
                    const data = Object.values(JSON.parse(JSON.stringify(results)))
                    if (error) {
                        console.log(error)
                        return callback('Unable to fetch products details now', null)
                    } else {
                        if (data) {
                            return callback(null, { data: data });
                        } else {
                            return callback('Unable to fetch products details now', null)
                        }
                    }
                }
            );
        });
    }

    static updateProduct(req, callback) {
        const prodId = req.params.id
        console.log('prodId', prodId)
        const reqBody = req.body
        return new Promise(async (resolve, reject) => {
            connection.query(
                `SELECT * FROM products where prod_id = ${prodId}`,
                (error, results) => {
                    const data = Object.values(JSON.parse(JSON.stringify(results)))
                    if (error) {
                        console.log(error)
                        return callback('Unable to fetch products details now', null)
                    } else {
                        if (data) {
                            if (!data.length) {
                                return callback('Product ID is not present.', null)
                            } else {
                                connection.query(
                                    `UPDATE products
                                    SET prod_name = '${reqBody.prod_name}',
                                    prod_desc = '${reqBody.prod_desc}'
                                    WHERE prod_id = ${prodId}`,
                                    (error, results) => {
                                        const data = results
                                        if (error) {
                                            console.log(error)
                                            return callback('Unable to update product details now', null)
                                        } else {
                                            if (data) {
                                                return callback(null, { data: data });
                                            } else {
                                                return callback('Unable to update product details now', null)
                                            }
                                        }
                                    }
                                );
                            }
                        } else {
                            return callback('Unable to fetch products details now', null)
                        }
                    }
                }
            );
        });
    }

    static deleteProduct(req, callback) {
        const prodId = req.params.id
        return new Promise(async (resolve, reject) => {
            const userId = req.params.id
            const reqBody = req.body
            connection.query(
                `SELECT * FROM products
                WHERE prod_id = ${prodId}`,
                (error, results) => {
                    const data = Object.values(JSON.parse(JSON.stringify(results)))
                    if (error) {
                        console.log(error)
                        return callback(error && error.sqlMessage ? error.sqlMessage : error, null)
                    } else {
                        if (data.length) {
                            connection.query(
                                `DELETE FROM products
                                WHERE prod_id = ${prodId}`,
                                (error, results) => {
                                    const data = results
                                    if (error) {
                                        console.log(error)
                                        return callback(error && error.sqlMessage ? error.sqlMessage : error, null)
                                    } else {
                                        if (data) {
                                            return callback(null, { data: data });
                                        } else {
                                            return callback('Unable to delete products now', null)
                                        }
                                    }
                                }
                            );
                        } else {
                            return callback('Unable to find the product at this moment.', null)
                        }
                    }
                }
            );

        });
    }

}

module.exports = productModel