//methods for fetching mysql data
var connection = require('../config/database');
var env = require('../config/env');


function Sector() {
    connection.init();  

    this.getAllAdminsector = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM sector order by UPPER(name) ASC', function (err, result) {
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

    
    this.addsectorByadmin = function (record, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM sector where name=$1', [record.sector_name], function (err, result) {
                if (result.rows.length === 0) { 
                    const sql = 'INSERT INTO sector(name,status) VALUES($1,$2) RETURNING *'
                    const values = [record.sector_name, 1]
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
                    callback('sector name is already exist.', null);
                }
            });
            
        });
    };

    function updateProductByID(sector_id, cols) {
        // Setup static beginning of query
        var query = ['UPDATE sector'];
        query.push('SET');

        // Create another array storing each set command
        // and assigning a number value for parameterized query
        var set = [];
        
        Object.keys(cols).map(function (key, i) {
            set.push(key + ' = ($' + (i + 1) + ')');
        });
        query.push(set.join(', '));
        
        // Add the WHERE statement to look up by id
        query.push('WHERE sector_id = ' + sector_id);

        // Return a complete query string
        return query.join(' ');
    }

    this.updatesectorByadmin = function (record, sector_id, update_value, callback) {
        connection.acquire(function (err, con) {

            var query = updateProductByID(sector_id, record);
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

            // con.query("UPDATE sector SET title =$1,description =$2,role =$3,purchase_type =$4,image =$5 WHERE sector_id = $6", [record.title, record.description, record.role, record.purchase_type, record.image, sector_id], function (err, result) {
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

    this.changesectorStatus = function (record, sector_id, callback) {
        connection.acquire(function (err, con) {
            con.query("UPDATE sector SET status =$1 WHERE sector_id = $2", [record.status, sector_id], function (err, result) {
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

    this.getsectorDataById = function (id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM sector where sector_id = $1', [id], function (err, result) {
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
module.exports = new Sector();