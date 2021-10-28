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
            con.query('SELECT * FROM blog', function (err, result) {
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
            const sql = 'INSERT INTO blog(title,description,created_at,role,purchase_type,status) VALUES($1,$2,$3,$4,$5,$6) RETURNING *'
            const values = [record.title, record.description, record.created_at, record.role, record.purchase_type, 1]
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

    this.updateBlogByadmin = function (record, blog_id, callback) {
        connection.acquire(function (err, con) {
            con.query("UPDATE blog SET title =$1 WHERE blog_id = $2", [record.title, blog_id], function (err, result) {
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

}
module.exports = new User();