//methods for fetching mysql data
var connection = require('../config/database');
var env = require('../config/env');
var asyn = require('async');

function User() {
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

    this.getAllAdminBlog = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM blog order by blog_id desc', function (err, result) {
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

    
    this.addBlogByadmin = function (record, callback) {
        connection.acquire(function (err, con) {
            const sql = 'INSERT INTO blog(title,description,created_at,role,purchase_type,image,status) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *'
            const values = [record.title, record.description, record.created_at, record.role, record.purchase_type, record.image, 1]
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

    function updateProductByID(blog_id, cols) {
        // Setup static beginning of query
        var query = ['UPDATE blog'];
        query.push('SET');

        // Create another array storing each set command
        // and assigning a number value for parameterized query
        var set = [];
        
        Object.keys(cols).map(function (key, i) {
            set.push(key + ' = ($' + (i + 1) + ')');
        });
        query.push(set.join(', '));
        
        // Add the WHERE statement to look up by id
        query.push('WHERE blog_id = ' + blog_id);

        // Return a complete query string
        return query.join(' ');
    }

    this.updateBlogByadmin = function (record, blog_id, update_value, callback) {
        connection.acquire(function (err, con) {

            var query = updateProductByID(blog_id, record);
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

            // con.query("UPDATE blog SET title =$1,description =$2,role =$3,purchase_type =$4,image =$5 WHERE blog_id = $6", [record.title, record.description, record.role, record.purchase_type, record.image, blog_id], function (err, result) {
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

    this.changeBlogStatus = function (record, blog_id, callback) {
        connection.acquire(function (err, con) {
            con.query("UPDATE blog SET status =$1 WHERE blog_id = $2", [record.status, blog_id], function (err, result) {
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

    this.getBlogDataById = function (id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM blog where blog_id = $1', [id], function (err, result) {
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
module.exports = new User();