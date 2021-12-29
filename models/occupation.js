//methods for fetching mysql data
var connection = require('../config/database');
var env = require('../config/env');


function Occupation() {
    connection.init();

    this.getAllAdminoccupation = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM occupation order by UPPER(name) ASC', function (err, result) {
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

    
    this.addoccupationByadmin = function (record, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM occupation where name=$1', [record.occupation_name], function (err, result) {
                if (result.rows.length === 0) { 
                    const sql = 'INSERT INTO occupation(name,status) VALUES($1,$2) RETURNING *'
                    const values = [record.occupation_name, 1]
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
                    callback('occupation name is already exist.', null);
                }
            });
            
        });
    };

    function updateProductByID(occupation_id, cols) {
        // Setup static beginning of query
        var query = ['UPDATE occupation'];
        query.push('SET');

        // Create another array storing each set command
        // and assigning a number value for parameterized query
        var set = [];
        
        Object.keys(cols).map(function (key, i) {
            set.push(key + ' = ($' + (i + 1) + ')');
        });
        query.push(set.join(', '));
        
        // Add the WHERE statement to look up by id
        query.push('WHERE occupation_id = ' + occupation_id);

        // Return a complete query string
        return query.join(' ');
    }

    this.updateoccupationByadmin = function (record, occupation_id, update_value, callback) {
        connection.acquire(function (err, con) {

            var query = updateProductByID(occupation_id, record);
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

            // con.query("UPDATE occupation SET title =$1,description =$2,role =$3,purchase_type =$4,image =$5 WHERE occupation_id = $6", [record.title, record.description, record.role, record.purchase_type, record.image, occupation_id], function (err, result) {
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

    this.changeoccupationStatus = function (record, occupation_id, callback) {
        connection.acquire(function (err, con) {
            con.query("UPDATE occupation SET status =$1 WHERE occupation_id = $2", [record.status, occupation_id], function (err, result) {
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

    this.getoccupationDataById = function (id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM occupation where occupation_id = $1', [id], function (err, result) {
                con.release();
                if (result.rows.length === 0) {
                    msg = 'User does not exist.';
                    callback(msg, null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    }

    

}
module.exports = new Occupation();