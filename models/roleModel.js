const config = require('../config.js')

const connection = require('../db.js')


class roleModel {

    static createRole(req, callback) {
        const reqBody = req.body
        console.log(reqBody)
        return new Promise(async (resolve, reject) => {
            let canCreate = false
            let canEdit = false
            let canDelete = false
            let canRead = false
            if (reqBody.canCreate) {
                canCreate = reqBody.canCreate
            } if (reqBody.canEdit) {
                canEdit = reqBody.canEdit
            } if (reqBody.canDelete) {
                canDelete = reqBody.canDelete
            } if (reqBody.canRead) {
                canRead = reqBody.canRead
            }
            connection.query(
                `INSERT INTO roles(role_name,canCreate,canRead,canEdit,canDelete) VALUES (?,?,?,?,?)`,
                [reqBody.name, canCreate, canRead, canEdit, canDelete],
                (error, results) => {
                    if (error) {
                        return callback(error && error.sqlMessage ? error.sqlMessage : error, null)
                    } else {
                        return callback(null, { data: results });
                    }
                }
            );
        });
    }

    static rolesListing(req, callback) {
        return new Promise(async (resolve, reject) => {
            const reqBody = req.body
            const resultsPerPage = reqBody['itemPerPage'] > 0 ? reqBody['itemPerPage'] : 10;
            const page = reqBody['page'] >= 1 ? reqBody['page'] : 1;
            const skip = resultsPerPage * (page - 1);
            let role_name = ''
            let contact = ''
            if (reqBody.name) {
                role_name = reqBody.name
            }
            let totalRecords = 0
            connection.query(
                `SELECT COUNT(*) FROM roles`,
                (error, results) => {
                    totalRecords = Object.values(JSON.parse(JSON.stringify(results)))
                    // if (error) {
                    //     return callback(error && error.sqlMessage ? error.sqlMessage : error, null)
                    // } else {
                    //     return callback(null, { data: results });
                    // }
                }
            );
            connection.query(
                `SELECT * FROM roles 
                ${role_name ? 'where' : ''}
                ${role_name ? `role_name = '${role_name}'` : ''} 
                limit ${skip},${resultsPerPage}`,
                (error, results) => {
                    const data = Object.values(JSON.parse(JSON.stringify(results)))
                    if (error) {
                        console.log(error)
                        return callback(error && error.sqlMessage ? error.sqlMessage : error, null)
                    } else {
                        if (data) {
                            return callback(null, { data: data, totalRecords: totalRecords[0]['COUNT(*)'] });
                        } else {
                            return callback('No record found', null)
                        }
                    }
                }
            );

        });
    }

    static updateRole(req, callback) {
        return new Promise(async (resolve, reject) => {
            const reqBody = req.body
            const roleId = req.params.id
            let role_name = ''
            if (reqBody.name) {
                role_name = reqBody.name
            }
            let data = [];
            connection.query(
                `SELECT * FROM roles where role_id = ${roleId}`,
                (error, results) => {
                    data = Object.values(JSON.parse(JSON.stringify(results)))
                    if (error) {
                        return callback(error && error.sqlMessage ? error.sqlMessage : error, null)
                    } if (data.length) {
                        connection.query(
                            `UPDATE roles
                            SET role_name = '${role_name}'
                            WHERE role_id = ${roleId}`,
                            (error, results) => {
                                console.log('results',results)
                                const data = Object.values(JSON.parse(JSON.stringify(results)))
                                if (error) {
                                    console.log('error',error)
                                    return callback('Unable to edit role right now', null)
                                } else {
                                    if (data) {
                                        return callback(null, { data: data });
                                    } else {
                                        return callback('Unable to fetch role details now', null)
                                    }
                                }
                            }
                        );
                    } else {
                        return callback('Requested role id is not present', null)
                    }
                }
            );
        });
    }

    static deleteRole(req, callback) {
        return new Promise(async (resolve, reject) => {
            const roleId = req.params.id
            const reqBody = req.body
            connection.query(
                `SELECT * FROM roles
                WHERE role_id = ${roleId}`,
                (error, results) => {
                    const data = Object.values(JSON.parse(JSON.stringify(results)))
                    if (error) {
                        console.log(error)
                        return callback('Role is not found.', null)
                    } else {
                        if (data.length) {
                            connection.query(
                                `DELETE FROM roles
                                WHERE role_id = ${roleId}`,
                                (error, results) => {
                                    const data = results
                                    if (error) {
                                        console.log(error)
                                        return callback('Unable to delete role now', null)
                                    } else {
                                        if (data) {
                                            return callback(null, { data: data });
                                        } else {
                                            return callback('Unable to delete role now', null)
                                        }
                                    }
                                }
                            );
                        } else {
                            return callback('Unable to find the role at this moment.', null)
                        }
                    }
                }
            );
            
        });
    }

}

module.exports = roleModel