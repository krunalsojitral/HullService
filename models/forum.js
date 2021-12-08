//methods for fetching mysql data
var connection = require('../config/database');
var env = require('../config/env');
var asyn = require('async');

function forum() {
    connection.init();

    this.getTagByForumId = function (id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM forum_tag inner join tag on forum_tag.tag_id = tag.tag_id where forum_tag.forum_id = $1', [id], function (err, result) {
                con.release();
                if (result.rows.length === 0) {
                    callback('Tag does not exist.', null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    }

    this.getAllAdminforum = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT *, forum.status as forum_status, forum.created_at as forum_date FROM forum left join users on users.id = forum.created_by order by forum_id desc', function (err, result) {
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

    this.getAllForumComment = function (id,callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM forum_comment inner join users on users.id= forum_comment.user_id where forum_id = $1', [id], function (err, result) {
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

    
    this.addforumByadmin = function (record, tag, callback) {
        connection.acquire(function (err, con) {
           
            const sql = 'INSERT INTO forum(topic,heading,category,status,created_at,total_view) VALUES($1,$2,$3,$4,$5,$6) RETURNING *'
            const values = [record.topic, record.heading, record.category, 1, record.created_at,0]
            con.query(sql, values, function (err, result) {
                con.release()
                if (err) {
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    callback(err, null);
                } else {
                    if (tag.length > 0) {
                        tag.map(data => {
                            var records = {
                                tag_id: data.value,
                                forum_id: result.rows[0].forum_id
                            }
                            const sql = 'INSERT INTO forum_tag(forum_id,tag_id) VALUES($1,$2) RETURNING *'
                            const values = [records.forum_id, records.tag_id]
                            con.query(sql, values, function (err, result) { });
                        });
                    }
                    callback(null, result.rows[0]);
                }
            });
        });
    };

    this.addforumByuser = function (record, tag, callback) {
        connection.acquire(function (err, con) {

            const sql = 'INSERT INTO forum(topic,heading,category,status,created_at,total_view, created_by,user_status) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *'
            const values = [record.topic, record.heading, record.category, 0, record.created_at, 0, record.created_by,0]
            con.query(sql, values, function (err, result) {
                con.release()
                if (err) {
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    callback(err, null);
                } else {
                    if (tag.length > 0) {
                        tag.map(data => {
                            var records = {
                                tag_id: data.value,
                                forum_id: result.rows[0].forum_id
                            }
                            const sql = 'INSERT INTO forum_tag(forum_id,tag_id) VALUES($1,$2) RETURNING *'
                            const values = [records.forum_id, records.tag_id]
                            con.query(sql, values, function (err, result) { });
                        });
                    }
                    callback(null, result.rows[0]);
                }
            });
        });
    };

    

    function updateProductByID(forum_id, cols) {
        // Setup static beginning of query
        var query = ['UPDATE forum'];
        query.push('SET');

        // Create another array storing each set command
        // and assigning a number value for parameterized query
        var set = [];
        
        Object.keys(cols).map(function (key, i) {
            set.push(key + ' = ($' + (i + 1) + ')');
        });
        query.push(set.join(', '));
        
        // Add the WHERE statement to look up by id
        query.push('WHERE forum_id = ' + forum_id);

        // Return a complete query string
        
        return query.join(' ');
    }

    this.updateforumByadmin = function (record, forum_id, update_value, tag, callback) {
        connection.acquire(function (err, con) {

            var query = updateProductByID(forum_id, record);
            con.query(query, update_value, function (err, result) {               
                if (err) {
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    con.release()
                    callback(err, null);
                } else {
                    if (tag.length > 0) {
                        const sql = 'DELETE FROM forum_tag where forum_id = $1'
                        const values = [forum_id]
                        con.query(sql, values, function (err, results) {
                            tag.map(data => {
                                var records = {
                                    tag_id: data.value,
                                    forum_id: forum_id
                                }
                                const sql = 'INSERT INTO forum_tag(forum_id,tag_id) VALUES($1,$2) RETURNING *'
                                const values = [records.forum_id, records.tag_id]
                                con.query(sql, values, function (err, result) { });
                            });
                        });
                    } else {
                        const sql = 'DELETE FROM forum_tag where forum_id = $1'
                        const values = [forum_id]
                        con.query(sql, values, function (err, results) { });
                    }
                    con.release()
                    callback(null, record);
                }
            });

            // con.query("UPDATE forum SET title =$1,description =$2,role =$3,purchase_type =$4,image =$5 WHERE forum_id = $6", [record.title, record.description, record.role, record.purchase_type, record.image, forum_id], function (err, result) {
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

    this.changeforumStatus = function (record, forum_id, callback) {
        connection.acquire(function (err, con) {
            con.query("UPDATE forum SET status =$1 WHERE forum_id = $2", [record.status, forum_id], function (err, result) {
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

    this.getforumDataById = function (id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM forum where forum_id = $1', [id], function (err, result) {
                con.release();
                if (result.rows.length === 0) {
                    msg = 'forum does not exist.';
                    callback(msg, null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    }

    this.deleteForum = function (comment_id, callback) {
        connection.acquire(function (err, con) {
            const sql = 'DELETE FROM forum_comment where forum_comment_id = $1'
            const values = [comment_id]
            con.query(sql, values, function (err, result) {
                con.release()
                if (err) {
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        });
    };


    this.getForumHeadingList = function (callback) {
        connection.acquire(function (err, con) {
            const sql = 'SELECT * FROM forumheading where forumheading.status = $1'
            const values = [1]
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

    this.getForumListByForumHeading = function (heading, search, forum_id, callback) {
        connection.acquire(function (err, con) {

            if (search) {
                if (forum_id && forum_id.length > 0) {

                    var sql = 'SELECT * FROM forum inner join category on category.category_id = forum.category where forum.status = 1 and forum.heading = $1 and ((forum.forum_id = ANY($2::int[])) OR (forum.topic LIKE $3 OR category.category_name LIKE $4)) order by forum.forum_id desc limit 5';
                    var values = [heading, forum_id, '%' + search + '%', '%' + search + '%'];

                } else {
                    var sql = 'SELECT * FROM forum inner join category on category.category_id = forum.category where forum.status = 1 and forum.heading = $1 and ( forum.topic LIKE $2 or category.category_name LIKE $3) order by forum.forum_id desc limit 5';
                    var values = [heading, '%' + search + '%', '%' + search + '%'];
                }                    
            } else {
                var sql = 'SELECT * FROM forum inner join category on category.category_id = forum.category where forum.status = 1 and forum.heading = $1 order by forum.forum_id desc limit 5';
                var values = [heading];
            }            

            con.query(sql, values, function (err, result) {
                con.release();
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

    this.getSubForumListByForumHeading = function (heading, search, forum_id, callback) {
        connection.acquire(function (err, con) {

            if (search) {
                if (forum_id && forum_id.length > 0) {

                    var sql = 'SELECT * FROM forum inner join category on category.category_id = forum.category where forum.status = 1 and forum.heading = $1 and ((forum.forum_id = ANY($2::int[])) OR (forum.topic LIKE $3 OR category.category_name LIKE $4)) order by forum.forum_id desc';
                    var values = [heading, forum_id, '%' + search + '%', '%' + search + '%'];

                } else {
                    var sql = 'SELECT * FROM forum inner join category on category.category_id = forum.category where forum.status = 1 and forum.heading = $1 and ( forum.topic LIKE $2 or category.category_name LIKE $3) order by forum.forum_id desc';
                    var values = [heading, '%' + search + '%', '%' + search + '%'];
                }
            } else {
                var sql = 'SELECT * FROM forum inner join category on category.category_id = forum.category where forum.status = 1 and forum.heading = $1 order by forum.forum_id desc';
                var values = [heading];
            }

            con.query(sql, values, function (err, result) {
                con.release();
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
  

    this.getLastComment = function (forum_id, callback) {
        connection.acquire(function (err, con) {
            const sql = 'SELECT *, (select count(*) from forum_comment where forum_id = $1) as forum_comment_count FROM forum_comment where forum_id = $2 order by forum_comment_id DESC limit 1'
            const values = [forum_id, forum_id]
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


    this.getForumTagList = function (callback) {
        connection.acquire(function (err, con) {
            const sql = 'SELECT * FROM forum_tag inner join tag on tag.tag_id = forum_tag.tag_id where tag.status = $1'
            const values = [1]
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


    this.getTagSearchList = function (search,callback) {
        connection.acquire(function (err, con) {
            const sql = 'SELECT * FROM forum_tag inner join tag on tag.tag_id = forum_tag.tag_id where tag.tag_name LIKE $1 and tag.status = $2'
            const values = ['%' + search + '%',1]
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


    this.getSubForumTagList = function (heading, callback) {
        connection.acquire(function (err, con) {
            const sql = 'SELECT * FROM forum_tag inner join forum on forum.forum_id = forum_tag.forum_id inner join tag on tag.tag_id = forum_tag.tag_id where forum.heading = $1 and tag.status = $2'
            const values = [heading, 1]
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
    

    this.getSubForumTagSearchList = function (heading, search, callback) {
        connection.acquire(function (err, con) {
            const sql = 'SELECT * FROM forum_tag inner join tag on tag.tag_id = forum_tag.tag_id inner join forum on forum.forum_id = forum_tag.forum_id where forum.heading = $1 and tag.tag_name LIKE $2 and tag.status = $3'
            const values = [heading,'%' + search + '%', 1]
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

    this.updateComment = function (record, callback) {
        connection.acquire(function (err, con) {
            const values = [record.status, record.user_status, record.admin_comment, record.id]
            con.query("UPDATE forum SET status =$1, user_status =$2,comment =$3 WHERE forum_id = $4", values, function (err, result) {
                if (err) {
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        });
    };

    this.getforumRequestDataById = function (id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM forum inner join users on users.id = forum.created_by where forum_id = $1', [id], function (err, result) {
                con.release();
                if (result.rows.length === 0) {
                    msg = 'forum does not exist.';
                    callback(msg, null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    }

   

    

}
module.exports = new forum();