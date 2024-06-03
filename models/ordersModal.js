const connection = require('../db.js')

class orderModal {


    static createOrder(req, callback) {
        const reqBody = req.body
        console.log( reqBody)

        return new Promise(async (resolve, reject) => {
            const cartItems = JSON.stringify(reqBody.cart)
            const cartData = reqBody.cart
            const cartIDs = cartData.map(cart => cart.cart_id)
            connection.query(
                `INSERT INTO orders(user_id,cart,email,f_name,l_name,company, address, state,postalCode, country, contact, subtotal, shipping, taxes, total) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) `,
                [reqBody.user_id, cartItems, reqBody.email,reqBody.f_name,reqBody.l_name, reqBody.company, reqBody.address, reqBody.state, reqBody.postalCode, reqBody.country, reqBody.contact, reqBody.subtotal, reqBody.shipping, reqBody.taxes, reqBody.total],
                (error, results) => {
                    if (error) {
                        console.log('error', error)
                        return callback(error && error.sqlMessage ? error.sqlMessage : error, null)
                    } else {
                        // return callback(null, { data: results });
                        const idPlaceholders = cartIDs.map(() => '?').join(',');
                        connection.query(
                            `UPDATE carts SET isPlaced = 1 WHERE cart_id IN (${idPlaceholders})`,
                            cartIDs,
                            (error, results) => {
                                if (error) {
                                    console.log('error', error)
                                    return callback(error && error.sqlMessage ? error.sqlMessage : error, null)
                                } else {
                                    return callback(null, { data: results });
                                }
                            }
                        );
                    }
                }
            );
        });
    }
}

module.exports = orderModal