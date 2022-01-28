//methods for fetching mysql data
var connection = require('../config/database');
var env = require('../config/env');

function Video() {

    connection.init();

    this.getTagByVideoId = function (id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM video_tag inner join tag on video_tag.tag_id = tag.tag_id where video_tag.video_id = $1', [id], function (err, result) {
                con.release();
                if (result.rows.length === 0) {
                    callback('Tag does not exist.', null);
                }else{
                    callback(null, result.rows);
                }                
            });
        });
    }

    this.getAllAdminVideo = function (status, callback) {
        connection.acquire(function (err, con) {
            var sql = '';
            var array = [];
            if (status) {
                sql = 'SELECT * FROM video where status = $1 and draft_status IS NULL order by video_id DESC';
                array = [status];
            } else {
                sql = 'SELECT * FROM video where draft_status IS NULL order by video_id desc';
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

    this.getVideoRoleName = function (id, role, callback) {
        connection.acquire(function (err, con) {

            if (role){
                var sql = "select string_agg(user_role.role, ',') from (select video_id, unnest(string_to_array(role, ',')):: INT as name_id from video) s1 join user_role on s1.name_id = user_role.role_id where s1.video_id = $1";
                con.query(sql, [id], function (err, result) {
                    con.release()
                    if (err) {
                        if (env.DEBUG) { console.log(err); }
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

    
    this.addVideoByadmin = function (record, callback) {
        connection.acquire(function (err, con) {
            // const sql = 'INSERT INTO video(title,description,overview,qna,notes,information,created_at,role,purchase_type,video,status) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *'
            // const values = [record.title, record.description, record.overview, record.qna, record.notes, record.information, record.created_at, record.role, record.purchase_type, record.video, 1]

            const sql = 'INSERT INTO video(title,description,created_at,role,purchase_type,video_url,cost,video_embeded_id,draft_status,status) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *'
            const values = [record.title, record.description, record.created_at, record.role, record.purchase_type, record.video_url, record.cost, record.video_embeded_id, record.draft, 1]
            con.query(sql, values, function (err, result) {
                if (err) {
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    con.release()
                    callback(err, null);
                } else {
                    if(record.tag.length > 0){
                        record.tag.map(data => {
                            var records = {
                                tag_id: data.value,
                                video_id: result.rows[0].video_id
                            }
                            const sql = 'INSERT INTO video_tag(video_id,tag_id) VALUES($1,$2) RETURNING *'
                            const values = [records.video_id, records.tag_id]
                            con.query(sql, values, function (err, result) {});
                        });
                    }
                    con.release()
                    callback(null, result.rows[0]);
                }
            });
        });
    };

    function updateByID(video_id, cols) {
        // Setup static beginning of query
        var query = ['UPDATE video'];
        query.push('SET');

        // Create another array storing each set command
        // and assigning a number value for parameterized query
        var set = [];
        
        Object.keys(cols).map(function (key, i) {
            set.push(key + ' = ($' + (i + 1) + ')');
        });
        query.push(set.join(', '));
        
        // Add the WHERE statement to look up by id
        query.push('WHERE video_id = ' + video_id);

        // Return a complete query string
        return query.join(' ');
    }

    this.updatevideoByadmin = function (record, video_id, update_value, tag, callback) {
        connection.acquire(function (err, con) {
            var query = updateByID(video_id, record);
            con.query(query, update_value, function (err, result) {
                if (err) {
                    if (env.DEBUG) { console.log(err); }
                    con.release()
                    callback(err, null);
                } else {
                    if (tag.length > 0) {
                        const sql = 'DELETE FROM video_tag where video_id = $1'
                        const values = [video_id]
                        con.query(sql, values, function (err, results) {
                            tag.map(data => {
                                var records = {
                                    tag_id: data.value,
                                    video_id: video_id
                                }
                                const sql = 'INSERT INTO video_tag(video_id,tag_id) VALUES($1,$2) RETURNING *'
                                const values = [records.video_id, records.tag_id]
                                con.query(sql, values, function (err, result) { });
                            });
                        });
                    }else{
                        const sql = 'DELETE FROM video_tag where video_id = $1'
                        const values = [video_id]
                        con.query(sql, values, function (err, results) {});
                    }
                    con.release()
                    callback(null, record);
                }
            });

            // con.query("UPDATE video SET title =$1,description =$2,role =$3,purchase_type =$4,image =$5 WHERE video_id = $6", [record.title, record.description, record.role, record.purchase_type, record.image, video_id], function (err, result) {
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

    this.changevideoStatus = function (record, video_id, callback) {
        connection.acquire(function (err, con) {
            con.query("UPDATE video SET status =$1 WHERE video_id = $2", [record.status, video_id], function (err, result) {
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

    this.getvideoDataById = function (id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM video where video_id = $1', [id], function (err, result) {
                con.release();
                if (result.rows.length === 0) {
                    msg = 'Video does not exist.';
                    callback(msg, null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    }


    this.getPaidVideoList = function (id, role, search, sortby, callback) {
        connection.acquire(function (err, con) {
            if (search) {

                //var sql = 'SELECT *,video.video_id as videoid,video.created_at as video_date FROM video left join bookmark_video on video.video_id = bookmark_video.video_id and bookmark_video.user_id = $1 where video.draft_status IS NULL and video.status = $2 and (role ILIKE $3 or role ILIKE $4) and ( title ILIKE $5) order by video.video_id asc';

                if (sortby == "ascending"){
                    var sql = 'SELECT *,video.video_id as videoid,video.created_at as video_date FROM video left join bookmark_video on video.video_id = bookmark_video.video_id and bookmark_video.user_id = $1 where video.draft_status IS NULL and video.status = $2 and (role ILIKE $3 or role ILIKE $4) and ( title ILIKE $5) order by video.video_id asc';
                }else{
                    var sql = 'SELECT *,video.video_id as videoid,video.created_at as video_date FROM video left join bookmark_video on video.video_id = bookmark_video.video_id and bookmark_video.user_id = $1 where video.draft_status IS NULL and video.status = $2 and (role ILIKE $3 or role ILIKE $4) and ( title ILIKE $5) order by video.video_id desc';
                }
                var values = [id, 1, '%' + role + '%', '%4%', '%' + search + '%' ];

            }else{   
                
                if (sortby == "ascending") {
                    var sql = 'SELECT *,video.video_id as videoid,video.created_at as video_date FROM video left join bookmark_video on video.video_id = bookmark_video.video_id and bookmark_video.user_id = $1 where video.draft_status IS NULL and video.status = $2 and (role ILIKE $3 or role ILIKE $4) order by video.video_id asc';
                } else {
                    var sql = 'SELECT *,video.video_id as videoid,video.created_at as video_date FROM video left join bookmark_video on video.video_id = bookmark_video.video_id and bookmark_video.user_id = $1 where video.draft_status IS NULL and video.status = $2 and (role ILIKE $3 or role ILIKE $4) order by video.video_id desc';
                }
                var values = [id, 1, '%' + role + '%', '%4%'];
            }
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

    this.getUnpaidVideoList = function (search, sortby, callback) {
        connection.acquire(function (err, con) {
            if (search) {

                if (sortby == "ascending") {
                    var sql = 'SELECT *,video.created_at as video_date FROM video where video.draft_status IS NULL and video.status = $1 and (role ILIKE $2) and (title ILIKE $3) order by video.video_id asc';
                }else{
                    var sql = 'SELECT *,video.created_at as video_date FROM video where video.draft_status IS NULL and video.status = $1 and (role ILIKE $2) and (title ILIKE $3) order by video.video_id desc';
                }
                var values = [1, '%4%', '%' + search + '%'];

            } else {

                if (sortby == "ascending") { 
                    var sql = 'SELECT *,video.created_at as video_date FROM video where video.draft_status IS NULL and video.status = $1 and (role ILIKE $2) order by video.video_id asc';
                }else{
                    var sql = 'SELECT *,video.created_at as video_date FROM video where video.draft_status IS NULL and video.status = $1 and (role ILIKE $2) order by video.video_id desc';
                }
                var values = [1, '%4%'];
            }
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

    this.getRelatedUnpaidVideoList = function (video_id, callback) {
        connection.acquire(function (err, con) {
            var sql = 'SELECT *,video.created_at as video_date FROM video where video.draft_status IS NULL and video.status = $1 and (role ILIKE $2) and video.video_id != $3 order by video.video_id asc limit 5';
            var values = [1, '%4%', video_id];
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

    this.getRelatedPaidVideoList = function (role, video_id, callback) {
        connection.acquire(function (err, con) {
            var sql = 'SELECT *,video.created_at as video_date FROM video where video.draft_status IS NULL and video.status = $1 and (role ILIKE $2 or role ILIKE $3) and video.video_id != $4 order by video.video_id asc limit 5';
            var values = [1, '%' + role + '%', '%4%', video_id];
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

    
    this.purchase_video = function (record, callback) {
        connection.acquire(function (err, con) {
            const sql = 'INSERT INTO video_order(user_id,order_id,video_id,created_at) VALUES($1,$2,$3,$4) RETURNING *'
            const values = [record.user_id, record.order_id, record.video_id, record.created_at]
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

    this.draftvideoList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM video where draft_status = $1 order by video_id desc', [1], function (err, result) {
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

    this.changeDraftVideoStatus = function (record, video_id, callback) {
        connection.acquire(function (err, con) {
            con.query("UPDATE video SET draft_status =$1 WHERE video_id = $2", [record.status, video_id], function (err, result) {
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

    this.changeDraftvideoStatus = function (record, video_id, callback) {
        connection.acquire(function (err, con) {
            con.query("UPDATE video SET draft_status =$1 WHERE video_id = $2", [record.status, video_id], function (err, result) {
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

    this.videoBookmark = function (user_id, video_id, callback) {
        connection.acquire(function (err, con) {
            var sql = 'SELECT * FROM bookmark_video where user_id=$1 and video_id = $2';
            var values = [user_id, video_id];
            var obj = {
                type: '',
                result: []
            }
            con.query(sql, values, function (err, result) {
                if (result && result.rows && result.rows.length > 0) {
                    const sql = 'DELETE FROM bookmark_video where user_id=$1 and video_id = $2'
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
                    const sql = 'INSERT INTO bookmark_video(user_id,video_id) VALUES($1,$2) RETURNING *'
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

    this.getBookMarkVideo = function (user_id, role, callback) {
        connection.acquire(function (err, con) {
            console.log(role);
            con.query('SELECT *,video.video_id as b_id, video.created_at as video_date FROM bookmark_video inner join video on video.video_id = bookmark_video.video_id where bookmark_video.user_id = $1 and video.status = $2 order by video.video_id desc', [user_id, 1], function (err, result) {
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

    this.getvideoDataByIdAfterLogin = function (id, user_id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT *,video.video_id as b_id,video.created_at as video_date FROM video left join video_order on video.video_id = video_order.video_id and video_order.user_id = $1 where video.video_id = $2', [user_id, id], function (err, result) {
                con.release();
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    }
    
    this.deleteVideo = function (video, callback) {
        connection.acquire(function (err, con) {
            video.map(data => {
                con.query('DELETE FROM video where video_id = $1', [data.video_id], function (err, results) {
                    con.query('DELETE FROM video_tag where video_id = $1', [data.video_id], function (err, results) {});
                    con.query('DELETE FROM bookmark_video where video_id = $1', [data.video_id], function (err, results) { });
                });
            });
            con.release()
            callback(null, video);
        });
    };

}
module.exports = new Video();