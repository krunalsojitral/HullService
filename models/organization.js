//methods for fetching mysql data
var connection = require('../config/database');
var env = require('../config/env');


function Organization() {
    connection.init();

    this.getAllAdminorganization = function (status, callback) {
        connection.acquire(function (err, con) {

            var sql = '';
            var array = [];
            if (status) {
                sql = 'SELECT * FROM organization where status = $1 order by UPPER(organization_name) ASC';
                array = [status];
            } else {
                sql = 'SELECT * FROM organization order by UPPER(organization_name) ASC';
            }
            con.query(sql, array, function (err, result) {
                con.release()
                if (err) {
                    if (env.DEBUG) { console.log(err); }
                    callback(err, null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    };

    
    this.addorganizationByadmin = function (record, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM organization where organization_name=$1', [record.organization_name], function (err, result) {
                if (result.rows.length === 0) { 
                    const sql = 'INSERT INTO organization(organization_name,status) VALUES($1,$2) RETURNING *'
                    const values = [record.organization_name, 1]
                    con.query(sql, values, function (err, result) {
                        con.release()
                        if (err) {
                            if (env.DEBUG) {
                                console.log(err);
                            }
                            callback(err, null);
                        } else {
                            callback(null, result.rows[0]);
                        }
                    });
                }else{
                    con.release()
                    callback('organization name is already exist.', null);
                }
            });
            
        });
    };

    function updateProductByID(organization_id, cols) {
        // Setup static beginning of query
        var query = ['UPDATE organization'];
        query.push('SET');

        // Create another array storing each set command
        // and assigning a number value for parameterized query
        var set = [];
        
        Object.keys(cols).map(function (key, i) {
            set.push(key + ' = ($' + (i + 1) + ')');
        });
        query.push(set.join(', '));
        
        // Add the WHERE statement to look up by id
        query.push('WHERE organization_id = ' + organization_id);

        // Return a complete query string
        return query.join(' ');
    }

    this.updateorganizationByadmin = function (record, organization_id, update_value, callback) {
        connection.acquire(function (err, con) {

            var query = updateProductByID(organization_id, record);
            con.query(query, update_value, function (err, result) {
                con.release()
                if (err) {
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    callback(err, null);
                } else {
                    callback(null, record);
                }
            });

            // con.query("UPDATE organization SET title =$1,description =$2,role =$3,purchase_type =$4,image =$5 WHERE organization_id = $6", [record.title, record.description, record.role, record.purchase_type, record.image, organization_id], function (err, result) {
            //     if (err) {
            //         if (env.DEBUG) {
            //             console.log(err);
            //         }
            //         callback(err, null);
            //     } else {
            //         callback(null, record);
            //     }
            // });
        });
    }

    this.changeorganizationStatus = function (record, organization_id, callback) {
        connection.acquire(function (err, con) {
            con.query("UPDATE organization SET status =$1 WHERE organization_id = $2", [record.status, organization_id], function (err, result) {
                con.release()
                if (err) {
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    callback(err, null);
                } else {
                    callback(null, record);
                }
            });
        });
    }

    this.getorganizationDataById = function (id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM organization where organization_id = $1', [id], function (err, result) {
                con.release();
                if (result.rows.length === 0) {
                    msg = 'organization does not exist.';
                    callback(msg, null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    }

    this.deleteorganization = function (organization, callback) {
        connection.acquire(function (err, con) {
            organization.map(data => {
                con.query('DELETE FROM organization where organization_id = $1', [data.organization_id], function (err, results) {
                    con.query("UPDATE users SET organization = NULL WHERE organization = $1", [data.organization_id], function (err, result) {
                    });
                });
            });
            con.release()
            callback(null, organization);
        });
    };

    

}
module.exports = new Organization();