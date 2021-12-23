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
            con.query('SELECT *, forum.status as forum_status, forum.created_at as forum_date FROM forum inner join forumheading on forumheading.forumheading_id = forum.heading left join users on users.id = forum.created_by where (forum.user_status = $1 or forum.user_status IS NULL) order by forum_id desc', [1], function (err, result) {
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

    this.forumRequestList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT *, forum.status as forum_status, forum.created_at as forum_date FROM forum inner join forumheading on forumheading.forumheading_id = forum.heading left join users on users.id = forum.created_by where (user_status = $1 or user_status = $2) order by forum_id desc', [0, 2], function (err, result) {
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
           
            const sql = 'INSERT INTO forum(topic,description, heading,status,created_at,total_view) VALUES($1,$2,$3,$4,$5,$6) RETURNING *'
            const values = [record.topic, record.description, record.heading, 1, record.created_at,0]
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

            const sql = 'INSERT INTO forum(topic,heading,status,created_at,total_view, created_by,user_status, description) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *'
            const values = [record.topic, record.heading, 0, record.created_at, 0, record.created_by, 0, record.description]
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

    this.getforumViewDataById = function (id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM forum inner join forumheading on forumheading.forumheading_id = forum.heading where forum_id = $1', [id], function (err, result) {
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

                    var sql = 'SELECT * FROM forum where forum.status = 1 and forum.heading = $1 and ((forum.forum_id = ANY($2::int[])) OR (forum.topic ILIKE $3)) order by forum.forum_id desc limit 5';
                    var values = [heading, forum_id, '%' + search + '%'];

                } else {
                    var sql = 'SELECT * FROM forum where forum.status = 1 and forum.heading = $1 and forum.topic ILIKE $2 order by forum.forum_id desc limit 5';
                    var values = [heading, '%' + search + '%'];
                }                    
            } else {
                var sql = 'SELECT * FROM forum where forum.status = 1 and forum.heading = $1 order by forum.forum_id desc limit 5';
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

                    var sql = 'SELECT * FROM forum inner join forumheading on forumheading.forumheading_id = forum.heading where forum.status = 1 and forum.heading = $1 and ((forum.forum_id = ANY($2::int[])) OR (forum.topic ILIKE $3)) order by forum.forum_id desc';
                    var values = [heading, forum_id, '%' + search + '%'];

                } else {
                    var sql = 'SELECT * FROM forum inner join forumheading on forumheading.forumheading_id = forum.heading where forum.status = 1 and forum.heading = $1 and ( forum.topic ILIKE $2) order by forum.forum_id desc';
                    var values = [heading, '%' + search + '%'];
                }
            } else {
                var sql = 'SELECT * FROM forum inner join forumheading on forumheading.forumheading_id = forum.heading where forum.status = 1 and forum.heading = $1 order by forum.forum_id desc';
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
            const sql = 'SELECT * FROM forum_tag inner join tag on tag.tag_id = forum_tag.tag_id where tag.tag_name ILIKE $1 and tag.status = $2'
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
            const sql = 'SELECT * FROM forum_tag inner join tag on tag.tag_id = forum_tag.tag_id inner join forum on forum.forum_id = forum_tag.forum_id where forum.heading = $1 and tag.tag_name ILIKE $2 and tag.status = $3'
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

    this.getforumRequestDataById = function (user_id, id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM forum as c left join users on users.id = c.created_by where c.forum_id = $1', [id], function (err, result) {
                con.release();
                if (err) {                    
                    callback(err, null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    }

    this.getForumLikeUser = function (user_id, id, callback) {
        connection.acquire(function (err, con) {            
            con.query('SELECT * FROM forum as c inner join forum_like as fl on fl.forum_id = c.forum_id where fl.user_id = $1 and fl.action_type = $2 and c.forum_id = $3', [user_id, 'like', id], function (err, result) {
                con.release();
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    }

    this.getForumUnLikeUser = function (user_id, id, callback) {
        connection.acquire(function (err, con) {            
            con.query('SELECT * FROM forum as c inner join forum_like as ful on ful.forum_id = c.forum_id where ful.user_id = $1 and ful.action_type = $2 and c.forum_id = $3', [user_id, 'unlike', id], function (err, result) {
                con.release();
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    }

    this.getForumCommentList = function (id, user_id, callback) {
        connection.acquire(function (err, con) {                 
            
            //var sql = 'SELECT c.created_at as comment_date,ur.role,c.forum_comment_id,c.comment,c.parent_comment_id, r.comment as reply,u.first_name, u.last_name FROM forum_comment c inner join users as u on u.id = c.user_id inner join user_role as ur on ur.role_id = u.role LEFT JOIN forum_comment r ON c.forum_comment_id = r.parent_comment_id WHERE c.forum_id = $1 order by c.forum_comment_id DESC';
            var sql = 'SELECT * FROM forum_comment c inner join users as u on u.id = c.user_id inner join user_role as ur on ur.role_id = u.role left join comment_like as cl on cl.comment_id = c.forum_comment_id and cl.user_id = $1 WHERE c.parent_comment_id IS NULL and c.forum_id = $2 order by c.forum_comment_id DESC';
            con.query(sql, [user_id, id], function (err, result) {
                con.release();
                if (err) {
                    console.log(err);
                    callback(err, null);
                }else{
                    callback(null, result.rows);
                }
            });
        });
    }

    this.getForumReplyCount = function (forum_id, callback) {
        connection.acquire(function (err, con) {
            var sql = 'SELECT count(*) as cnt FROM forum_comment WHERE parent_comment_id IS NULL and forum_id = $1';
            con.query(sql, [forum_id], function (err, result) {
                con.release();
                if (err) {
                    console.log(err);
                    callback(err, null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    }

    this.getForumFollow = function (forum_id, user_id, callback) {
        connection.acquire(function (err, con) {
            var sql = 'SELECT count(*) as cnt FROM forum_follow WHERE forum_id = $1 and user_id = $2';
            con.query(sql, [forum_id, user_id], function (err, result) {
                con.release();
                if (err) {
                    console.log(err);
                    callback(err, null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    }

    this.unfollowUser = function (record, callback) {
        connection.acquire(function (err, con) {
            const sql = 'DELETE FROM forum_follow where forum_id = $1 and user_id = $2'
            const values = [record.forum_id, record.user_id]
            con.query(sql, values, function (err, results) {            
                con.release();
                if (err) {
                    console.log(err);
                    callback(err, null);
                } else {
                    callback(null, results);
                }
            });
        });
    }

    this.getForumLikeCount = function (forum_id, callback) {
        connection.acquire(function (err, con) {
            var sql = 'SELECT count(*) as cnt FROM forum_like WHERE forum_id = $1 and action_type = $2';
            con.query(sql, [forum_id, 'like'], function (err, result) {
                con.release();
                if (err) {                    
                    callback(err, null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    }

    this.getForumUnLikeCount = function (forum_id, callback) {
        connection.acquire(function (err, con) {
            var sql = 'SELECT count(*) as cnt FROM forum_like WHERE forum_id=$1 and action_type = $2';
            con.query(sql, [forum_id, 'unlike'], function (err, result) {
                con.release();
                if (err) {
                    console.log(err);
                    callback(err, null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    }

    this.getForumReplyComment = function (id, callback) {
        connection.acquire(function (err, con) {   

            var obj = {
                reply_list : [],
                comment_count: 0
            }
            asyn.waterfall([
                function (done) {                    
                    var sql = 'SELECT ur.role, u.first_name,u.last_name,c.comment,c.created_at FROM forum_comment as c inner join users as u on u.id = c.user_id inner join user_role as ur on ur.role_id = u.role where c.parent_comment_id = $1 order by c.forum_comment_id DESC';
                    con.query(sql, [id], function (err, result) {                       
                        if (err) {
                            done(err, null);
                        } else {        
                            obj.reply_list = result.rows;
                            done(err, obj);
                        }
                    });
                },    
                function (obj, done2) {
                    var sql = 'SELECT count(*) as cnt FROM forum_comment as c inner join comment_like as cl on cl.comment_id = c.forum_comment_id where c.forum_comment_id = $1';
                    con.query(sql, [id], function (err, result) {
                        con.release();
                        if (err) {
                            done2(err, null);
                        } else {
                            obj.comment_count = result.rows
                            done2(err, obj);
                        }
                    });
                }
            ],
            function (err, overview) {
                callback(null, overview);
            });
        });
    }

    

    this.followUser = function (record, callback) {
        connection.acquire(function (err, con) {
            const sql = 'INSERT INTO forum_follow(user_id,forum_id) VALUES($1,$2) RETURNING *'
            const values = [record.user_id, record.forum_id]
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

    this.getMyForumList = function (user_id, search, forum_id, callback) {
        connection.acquire(function (err, con) {
            if (search) {
                if (forum_id && forum_id.length > 0) {
                    var sql = 'SELECT * FROM forum_follow inner join forum on forum.forum_id = forum_follow.forum_id inner join forumheading on forumheading.forumheading_id = forum.heading where forum_follow.user_id = $1 and ((forum.forum_id = ANY($2::int[])) OR (forum.topic ILIKE $3)) order by forum_follow_id DESC'
                    var values = [user_id, forum_id, '%' + search + '%'];
                } else {    
                    var sql = 'SELECT * FROM forum_follow inner join forum on forum.forum_id = forum_follow.forum_id inner join forumheading on forumheading.forumheading_id = forum.heading where forum_follow.user_id = $1 and forum.topic ILIKE $2 order by forum_follow_id DESC'
                    var values = [user_id, '%' + search + '%'];
                }
            } else {
                var sql = 'SELECT * FROM forum_follow inner join forum on forum.forum_id = forum_follow.forum_id inner join forumheading on forumheading.forumheading_id = forum.heading where forum_follow.user_id = $1 order by forum_follow_id DESC'
                var values = [user_id];
            }
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

    this.addComment = function (record, callback) {
        connection.acquire(function (err, con) {
            if (record.parent_comment_id){
                var sql = 'INSERT INTO forum_comment(user_id,forum_id,comment,parent_comment_id,created_at) VALUES($1,$2,$3,$4,$5) RETURNING *'
                var values = [record.user_id, record.forum_id, record.comment, record.parent_comment_id, record.created_at]
            }else{
                var sql = 'INSERT INTO forum_comment(user_id,forum_id,comment,created_at) VALUES($1,$2,$3,$4) RETURNING *'
                var values = [record.user_id, record.forum_id, record.comment, record.created_at]
            }
            
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

    this.forumLike = function (record, callback) {
        connection.acquire(function (err, con) {
            const sql = 'SELECT * FROM forum_like WHERE user_id = $1 and forum_id = $2'
            const values = [record.user_id, record.forum_id]
            con.query(sql, values, function (err, result) {
                if (err) {
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    callback(err, null);
                } else {
                    if (result.rows.length > 0){                        
                        if (record.action_type != result.rows[0].action_type){
                            const sql = 'DELETE FROM forum_like WHERE user_id = $1 and forum_id = $2'
                            const values = [record.user_id, record.forum_id]
                            con.query(sql, values, function (err, result) {                                
                                if (err) {
                                    if (env.DEBUG) {
                                        console.log(err);
                                    }
                                    callback(err, null);
                                } else {
                                    const sql = 'INSERT INTO forum_like(user_id,forum_id,action_type) VALUES($1,$2,$3) RETURNING *'
                                    const values = [record.user_id, record.forum_id, record.action_type]
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
                                }
                            });
                        }                        
                    }else{
                        const sql = 'INSERT INTO forum_like(user_id,forum_id,action_type) VALUES($1,$2,$3) RETURNING *'
                        const values = [record.user_id, record.forum_id, record.action_type]
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
                    }
                }
            });    
        });
    };

    this.forumCommentLike = function (record, callback) {
        connection.acquire(function (err, con) {
            const sql = 'SELECT * FROM comment_like WHERE user_id = $1 and comment_id = $2'
            const values = [record.user_id, record.comment_id]
            con.query(sql, values, function (err, result) {
                if (err) {
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    callback(err, null);
                } else {
                    if (result.rows.length > 0) {
                        const sql = 'DELETE FROM comment_like WHERE user_id = $1 and comment_id = $2'
                        const values = [record.user_id, record.comment_id]
                        con.query(sql, values, function (err, result) {
                            if (err) {
                                if (env.DEBUG) {
                                    console.log(err);
                                }
                                callback(err, null);
                            } else {
                                callback(null, result.rows);
                            }
                        });
                    } else {
                        const sql = 'INSERT INTO comment_like(user_id,comment_id) VALUES($1,$2) RETURNING *'
                        const values = [record.user_id, record.comment_id]
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
                    }
                }
            });
        });
    };


    

}
module.exports = new forum();