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
            con.query('SELECT * FROM forum order by forum_id desc', function (err, result) {
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

    this.getForumListByForumHeading = function (heading, callback) {
        connection.acquire(function (err, con) {
            const sql = 'SELECT * FROM forum inner join category on category.category_id = forum.category where forum.heading = $1'
            const values = [heading]
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


    


    this.getForumComment = function (forum_id, callback) {
        connection.acquire(function (err, con) {
            console.log(forum_id);
            console.log('------------');
            const sql = 'SELECT count(*) as cont FROM forum_comment where forum_id = $1'
            const values = [forum_id]
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

    

    

    

}
module.exports = new forum();