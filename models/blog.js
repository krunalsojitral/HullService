//methods for fetching mysql data
var connection = require('../config/database');
var env = require('../config/env');
var asyn = require('async');

function User() {
    connection.init();

    this.getTagByBlogId = function (id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM blog_tag inner join tag on blog_tag.tag_id = tag.tag_id where blog_tag.blog_id = $1', [id], function (err, result) {
                con.release();
                if (result.rows.length === 0) {
                    callback('Tag does not exist.', null);
                } else {
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
            const sql = 'INSERT INTO blog(title,description,created_at,role,purchase_type,image,cost,status) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *'
            const values = [record.title, record.description, record.created_at, record.role, record.purchase_type, record.image, record.cost, 1]
            con.query(sql, values, function (err, result) {                
                if (err) {
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    con.release()
                    callback(err, null);
                } else {
                    if (record.tag.length > 0) {
                        record.tag.map(data => {
                            var records = {
                                tag_id: data.value,
                                blog_id: result.rows[0].blog_id
                            }
                            const sql = 'INSERT INTO blog_tag(blog_id,tag_id) VALUES($1,$2) RETURNING *'
                            const values = [records.blog_id, records.tag_id]
                            con.query(sql, values, function (err, result) { });
                        });
                    }
                    con.release()
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

    this.updateBlogByadmin = function (record, blog_id, update_value, tag, callback) {
        connection.acquire(function (err, con) {

            var query = updateProductByID(blog_id, record);
            con.query(query, update_value, function (err, result) {                
                if (err) {
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    con.release()
                    callback(err, null);
                } else {
                    if (tag.length > 0) {
                        const sql = 'DELETE FROM blog_tag where blog_id = $1'
                        const values = [blog_id]
                        con.query(sql, values, function (err, results) {
                            tag.map(data => {
                                var records = {
                                    tag_id: data.value,
                                    blog_id: blog_id
                                }
                                const sql = 'INSERT INTO blog_tag(blog_id,tag_id) VALUES($1,$2) RETURNING *'
                                const values = [records.blog_id, records.tag_id]
                                con.query(sql, values, function (err, result) { });
                            });
                        });
                    }else{
                        const sql = 'DELETE FROM blog_tag where blog_id = $1'
                        const values = [blog_id]
                        con.query(sql, values, function (err, results) {});
                    }
                    con.release()
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

    this.getPaidBlogList = function (role, callback) {
        connection.acquire(function (err, con) {
            console.log(role);
            con.query('SELECT *,blog.created_at as blog_date FROM blog where blog.status = $1 and (role = $2 or role = $3) order by blog.blog_id desc', [1, role, "all"], function (err, result) {
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

    this.getUnpaidBlogList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT *,blog.created_at as blog_date FROM blog where blog.status = $1 and (role = $2 or role = $3) order by blog.blog_id desc', [1, 4, "all"], function (err, result) {
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

    this.getRelatedUnpaidBlogList = function (blog_id, callback) {
        connection.acquire(function (err, con) {            
            var sql = 'SELECT *,blog.created_at as blog_date FROM blog where blog.status = $1 and (role = $2 or role = $3) and blog.blog_id != $4 order by blog.blog_id desc limit 5';
            var values = [1, 4, "all", blog_id];
            con.query(sql, values, function (err, result) {
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

    this.getRelatedPaidBlogList = function (role, blog_id, callback) {
        connection.acquire(function (err, con) {            
            var sql = 'SELECT *,blog.created_at as blog_date FROM blog where blog.status = $1 and (role = $2 or role = $3) and blog.blog_id != $4 order by blog.blog_id desc limit 5';
            var values = [1, role, "all", blog_id];
            con.query(sql, values, function (err, result) {
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

    this.blogBookmark = function (user_id, blog_id, callback) {
        connection.acquire(function (err, con) {
            var sql = 'SELECT * FROM bookmark_blog where user_id=$1 and blog_id = $2';
            var values = [user_id, blog_id];
            con.query(sql, values, function (err, result) {
                if (result && result.rows && result.rows.length > 0) {
                    const sql = 'DELETE FROM bookmark_blog where user_id=$1 and blog_id = $2'
                    con.query(sql, values, function (err, results) {
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
                } else {
                    const sql = 'INSERT INTO bookmark_blog(user_id,blog_id) VALUES($1,$2) RETURNING *'
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
                }
            });
        });
    };

    

}
module.exports = new User();