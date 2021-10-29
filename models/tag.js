//methods for fetching mysql data
var connection = require('../config/database');
var env = require('../config/env');


function Tag() {
    connection.init();

    
    this.getUserById = function (id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM users where id = $1', [id], function (err, result) {
                con.release();
                if (result.rows.length === 0) {
                    msg = 'User does not exist.';
                    callback(msg, null);
                }else{
                    callback(null, result.rows);
                }                
            });
        });
    }

    this.getAllAdmintag = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM tag order by tag_id desc', function (err, result) {
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

    
    this.addtagByadmin = function (record, callback) {
        connection.acquire(function (err, con) {
            const sql = 'INSERT INTO tag(tag_name,status) VALUES($1,$2) RETURNING *'
            const values = [record.tag_name,1]
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
        });
    };

    function updateProductByID(tag_id, cols) {
        // Setup static beginning of query
        var query = ['UPDATE tag'];
        query.push('SET');

        // Create another array storing each set command
        // and assigning a number value for parameterized query
        var set = [];
        
        Object.keys(cols).map(function (key, i) {
            set.push(key + ' = ($' + (i + 1) + ')');
        });
        query.push(set.join(', '));
        
        // Add the WHERE statement to look up by id
        query.push('WHERE tag_id = ' + tag_id);

        // Return a complete query string
        return query.join(' ');
    }

    this.updatetagByadmin = function (record, tag_id, update_value, callback) {
        connection.acquire(function (err, con) {

            var query = updateProductByID(tag_id, record);
            con.query(query, update_value, function (err, result) {
                if (err) {
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    callback(err, null);
                } else {
                    callback(null, record);
                }
            });

            // con.query("UPDATE tag SET title =$1,description =$2,role =$3,purchase_type =$4,image =$5 WHERE tag_id = $6", [record.title, record.description, record.role, record.purchase_type, record.image, tag_id], function (err, result) {
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

    this.changetagStatus = function (record, tag_id, callback) {
        connection.acquire(function (err, con) {
            con.query("UPDATE tag SET status =$1 WHERE tag_id = $2", [record.status, tag_id], function (err, result) {
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

    this.gettagDataById = function (id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM tag where tag_id = $1', [id], function (err, result) {
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
module.exports = new Tag();