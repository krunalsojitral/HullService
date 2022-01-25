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

    this.getAllAdminBlog = function (status, callback) {
        connection.acquire(function (err, con) {            
            var sql = '';
            var array = [];
            if (status) {                
                sql = 'SELECT * FROM blog where status = $1 and draft_status IS NULL order by blog_id DESC';
                array = [status];                
            }else{                
                sql = 'SELECT * FROM blog where draft_status IS NULL order by blog_id DESC';                
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

    
    this.getBlogRoleName = function (id, role, callback) {
        connection.acquire(function (err, con) {            
            if (role){                
                var sql = "select string_agg(user_role.role, ',') from (select blog_id, unnest(string_to_array(role, ',')):: INT as name_id from blog) s1 join user_role on s1.name_id = user_role.role_id where s1.blog_id = $1";
                con.query(sql, [id], function (err, result) {
                    con.release()
                    if (err) {
                        if (env.DEBUG) {                            
                            console.log(err);
                        }
                        callback(err, null);
                    } else {
                        callback(null, result.rows);
                    }
                });
            }else{
                con.release()
                callback(null, null);
            }           
        });
    }

    
    this.addBlogByadmin = function (record, callback) {
        connection.acquire(function (err, con) {
            const sql = 'INSERT INTO blog(title,description,created_at,role,purchase_type,image,cost,draft_status,status) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *'
            const values = [record.title, record.description, record.created_at, record.role, record.purchase_type, record.image, record.cost, record.draft, 1]
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

    this.changeDraftBlogStatus = function (record, blog_id, callback) {
        connection.acquire(function (err, con) {
            con.query("UPDATE blog SET draft_status =$1 WHERE blog_id = $2", [record.status, blog_id], function (err, result) {
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
                if (err) {                    
                    callback(err, null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    }

    this.getPaidBlogList = function (role, user_id, callback) {
        connection.acquire(function (err, con) {
            console.log(role);
            //con.query('SELECT *,blog.blog_id as b_id, blog.created_at as blog_date FROM blog left join bookmark_blog on blog.blog_id = bookmark_blog.blog_id and bookmark_blog.user_id = $1 where blog.draft_status IS NULL and blog.status = $2 and (blog.role ILIKE $3 or blog.role ILIKE $4) order by blog.blog_id desc', [user_id, 1, '%' + role + '%', '%4%'], function (err, result) {
            con.query('SELECT *,blog.blog_id as b_id, blog.created_at as blog_date FROM blog left join bookmark_blog on blog.blog_id = bookmark_blog.blog_id and bookmark_blog.user_id = $1 where blog.draft_status IS NULL and blog.status = $2 and (blog.role ILIKE $3) order by blog.blog_id desc', [user_id, 1, '%' + role + '%'], function (err, result) {
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
            con.query('SELECT *,blog.created_at as blog_date FROM blog where blog.draft_status IS NULL and blog.status = $1 and (role ILIKE $2) order by blog.blog_id desc', [1, '%4%'], function (err, result) {
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
            var sql = 'SELECT *,blog.created_at as blog_date FROM blog where blog.draft_status IS NULL and blog.status = $1 and (role ILIKE $2) and blog.blog_id != $3 order by blog.blog_id desc limit 5';
            var values = [1, '%4%', blog_id];
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
            var sql = 'SELECT *,blog.created_at as blog_date FROM blog where blog.draft_status IS NULL and blog.status = $1 and (role ILIKE $2 or role ILIKE $3) and blog.blog_id != $4 order by blog.blog_id desc limit 5';
            var values = [1, '%' + role + '%', '%4%', blog_id];
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

            var obj = {
                type:'',
                result:[]
            }
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
                            obj.type = 'remove';
                            obj.result = result.rows[0];
                            callback(null, obj);
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
                            obj.type = 'add';
                            obj.result = result.rows[0];
                            callback(null, obj);
                        }
                    });
                }
            });
        });
    };
    
    this.purchase_blog = function (record, callback) {
        connection.acquire(function (err, con) {
            const sql = 'INSERT INTO blog_order(user_id,order_id,blog_id,created_at) VALUES($1,$2,$3,$4) RETURNING *'
            const values = [record.user_id, record.order_id, record.blog_id, record.created_at]
            con.query(sql, values, function (err, result) {
                con.release()
                if (err) {
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    callback(err, null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    };
    

    this.getBookMarkBlog = function (user_id, role, callback) {
        connection.acquire(function (err, con) {
            console.log(role);
            con.query('SELECT *,blog.blog_id as b_id, blog.created_at as blog_date FROM bookmark_blog inner join blog on blog.blog_id = bookmark_blog.blog_id where bookmark_blog.user_id = $1 and blog.status = $2 order by blog.blog_id desc', [user_id, 1], function (err, result) {
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

    
    this.draftblogList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM blog where draft_status = $1 order by blog_id desc', [1], function (err, result) {
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

    this.deleteBlog = function (blog, callback) {
        connection.acquire(function (err, con) {
            blog.map(data => {                                
                con.query('DELETE FROM blog where blog_id = $1', [data.blog_id], function (err, results) {                  
                    con.query('DELETE FROM blog_tag where blog_id = $1', [data.blog_id], function (err, results) {
                    });
                });
            });
            con.release()
            callback(null, blog);
        });
    };

}
module.exports = new User();