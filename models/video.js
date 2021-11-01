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

    this.getAllAdminVideo = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM video order by video_id desc', function (err, result) {
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

    
    this.addVideoByadmin = function (record, callback) {
        connection.acquire(function (err, con) {
            const sql = 'INSERT INTO video(title,description,overview,qna,notes,information,created_at,role,purchase_type,video,status) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *'
            const values = [record.title, record.description, record.overview, record.qna, record.notes, record.information, record.created_at, record.role, record.purchase_type, record.video, 1]
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

    function updateProductByID(video_id, cols) {
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

    this.updatevideoByadmin = function (record, video_id, update_value, callback) {
        connection.acquire(function (err, con) {

            var query = updateProductByID(video_id, record);
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