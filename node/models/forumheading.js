//methods for fetching mysql data
var connection = require('../config/database');
var env = require('../config/env');


function Forumheading() {
    connection.init();

    this.getAllAdminforumheading = function (status, callback) {
        connection.acquire(function (err, con) {
            var sql = '';
            var array = [];
            if (status) {
                sql = 'SELECT * FROM forumheading where status = $1 order by UPPER(forumheading_name) ASC';
                array = [status];
            } else {
                sql = 'SELECT * FROM forumheading order by UPPER(forumheading_name) ASC';
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

    
    this.addforumheadingByadmin = function (record, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM forumheading where forumheading_name=$1', [record.forumheading_name], function (err, result) {
                if (result.rows.length === 0) { 
                    const sql = 'INSERT INTO forumheading(forumheading_name,status) VALUES($1,$2) RETURNING *'
                    const values = [record.forumheading_name, 1]
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
                    callback('forumheading name is already exist.', null);
                }
            });
            
        });
    };

    function updateProductByID(forumheading_id, cols) {
        // Setup static beginning of query
        var query = ['UPDATE forumheading'];
        query.push('SET');

        // Create another array storing each set command
        // and assigning a number value for parameterized query
        var set = [];
        
        Object.keys(cols).map(function (key, i) {
            set.push(key + ' = ($' + (i + 1) + ')');
        });
        query.push(set.join(', '));
        
        // Add the WHERE statement to look up by id
        query.push('WHERE forumheading_id = ' + forumheading_id);

        // Return a complete query string
        return query.join(' ');
    }

    this.updateforumheadingByadmin = function (record, forumheading_id, update_value, callback) {
        connection.acquire(function (err, con) {

            var query = updateProductByID(forumheading_id, record);
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

            // con.query("UPDATE forumheading SET title =$1,description =$2,role =$3,purchase_type =$4,image =$5 WHERE forumheading_id = $6", [record.title, record.description, record.role, record.purchase_type, record.image, forumheading_id], function (err, result) {
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

    this.changeforumheadingStatus = function (record, forumheading_id, callback) {
        connection.acquire(function (err, con) {
            con.query("UPDATE forumheading SET status =$1 WHERE forumheading_id = $2", [record.status, forumheading_id], function (err, result) {
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

    this.getforumheadingDataById = function (id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM forumheading where forumheading_id = $1', [id], function (err, result) {
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
module.exports = new Forumheading();