const config = require('../config.js')

const connection = require('../db.js')


class productModel {

    static createProduct(req, callback) {
        const reqBody = req.body
        console.log(reqBody)
        return new Promise(async (resolve, reject) => {
            let prodName = ''
            let prodDesc = ''
            let price = reqBody && reqBody.price ? reqBody.price : 0
            let sku = ''
            let category = ''
            let img_total = 0
            let stocks = reqBody && reqBody.stocks ? reqBody.stocks : 0
            if (reqBody.prod_name) {
                prodName = reqBody.prod_name
            } if (reqBody.prod_desc) {
                prodDesc = reqBody.prod_desc
            } if (reqBody.sku) {
                sku = reqBody.sku
            }
            if (reqBody.category) {
                category = reqBody.category
            }
            connection.query(
                `INSERT INTO products(prod_name,prod_desc,sku,price,stocks,category,img_total) VALUES (?,?,?,?,?,?,?) `,
                [prodName, prodDesc, sku, price, stocks, category, img_total],
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
                `SELECT COUNT(*) FROM products  ${prod_name ? 'where' : ''}
                ${prod_name ? `prod_name LIKE '%${prod_name}%'` : ''}`,
                (error, results) => {
                    totalRecords = Object.values(JSON.parse(JSON.stringify(results)))
                }
            );
            connection.query(
                `SELECT * FROM products 
                ${prod_name ? 'where' : ''}
                ${prod_name ? `prod_name LIKE '%${prod_name}%'` : ''} 
                ORDER BY prod_id DESC
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
                                    prod_desc = '${reqBody.prod_desc}',
                                    price = ${reqBody.price},
                                    stocks = ${reqBody.stocks},
                                    category = '${reqBody.category}',
                                    sku = '${reqBody.sku}'
                                    WHERE prod_id = ${prodId}`,
                                    (error, results) => {
                                        if (error) {
                                            console.log(error)
                                            return callback('Unable to update product details now', null)
                                        } else {
                                            const data = results
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


    static uploadImage(req, callback) {
        return new Promise(async (resolve, reject) => {
            const prodID = req.params.id
            const reqBody = req.files
            console.log(reqBody)
            let sampleFile;
            let uploadPath;
            if (!req.files || Object.keys(req.files).length === 0) {
                return callback('No files were uploaded', null)
            }
            sampleFile = req.files.file;
            console.log('sampleFile.name', sampleFile.name)
            const fullFile = `${prodID}productimage${new Date().getTime()}${sampleFile.name}`
            console.log('fullFile', fullFile)
            console.log('path', `${__dirname}/upload/${fullFile}`)
            uploadPath = __dirname + '/product/' + fullFile;
            console.log('uploadPath', uploadPath)
            // upload.single(sampleFile)
            connection.query(
                `SELECT * FROM products where prod_id = ${prodID}`,
                (error, results) => {
                    if (error) {
                        console.log(error)
                        return callback('Unable to fetch products details now', null)
                    } else {
                        const data = Object.values(JSON.parse(JSON.stringify(results)))
                        if (data.length) {
                            sampleFile.mv(uploadPath, function (err) {
                                console.log('sample file', sampleFile.name)
                                if (err) return callback(err, null)
                                    let imglist = JSON.parse(data[0]['img_list'])
                                    const imgTotal = data[0]['img_total'] ?  data[0]['img_total'] : 0
                                    console.log('img_list',imglist)
                                    console.log('imgTotal',imgTotal)
                                    let newImg = {}
                                    if(imglist === null){ 
                                        console.log('imglist null')
                                        imglist = {} 
                                        let total = imgTotal+1
                                        newImg[total] = fullFile
                                    }else{
                                        let total = imgTotal+1
                                        let newList = []
                                        newList[total]= fullFile
                                        newImg = Object.assign(imglist,newList)
                                        
                                    }
                                    console.log('fullFile in query', fullFile)
                                
                                connection.query(`UPDATE products SET prod_image = ? ,img_list = '${JSON.stringify(newImg)}', img_total = ${imgTotal+1}, recent_image = '${fullFile}'  WHERE prod_id =${prodID}`, [sampleFile.name], (err, rows) => {
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
                            return callback('Product is not present', null)
                        }
                    }
                }
            );
        });
    }



}

module.exports = productModel