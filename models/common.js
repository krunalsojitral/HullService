//methods for fetching mysql data
var connection = require('../config/database');
var env = require('../config/env');
var asyn = require('async');

function Common() {
    connection.init();

    this.getRoleList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM user_role where role_id != $1', [1], function (err, result) {
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

    this.getRoleAllList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM user_role', function (err, result) {
                con.release();
                if (err) {
                    if (env.DEBUG) { console.log(err); }
                    callback(err, null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    }

    this.getTagList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM tag where status = $1 order by tag_name ASC', [1], function (err, result) {
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

    this.getHeadingList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM forumheading where status = $1 order by forumheading_name ASC', [1], function (err, result) {
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

    this.getCategoryList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM category where status = $1', [1], function (err, result) {
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

    this.getAcademicDisciplineList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM academic_discipline where status = $1 order by name ASC', [1], function (err, result) {
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

    this.getOccupationList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM occupation where status = $1 order by name ASC', [1], function (err, result) {
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

    this.getSectorList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM sector where status = $1 order by name ASC', [1], function (err, result) {
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

    this.getProfessionalInterestAreaList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM professional_interest_area where status = $1 order by name ASC', [1], function (err, result) {
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
    
    this.getResearcherInterestAreaList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM researcher_interest_area where status = $1 order by name ASC', [1], function (err, result) {
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
    

    
    this.addPreview = function (record, update_value, course_record, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM preview', function (err, result) {                
                if (err) {
                    if (env.DEBUG) { console.log(err); }
                    callback(err, null);
                } else {
                    if (result){
                        if (record.module_type == 'course'){
                            var values = update_value;
                            var sql = updateProductByID(1, course_record);
                        }else{
                            var values = [record.title, record.image, record.description, record.module_type, record.created_at, record.videoId, 1]
                            var sql = "UPDATE preview SET title = $1, image = $2, description = $3, module_type = $4, created_at = $5, videoId = $6  WHERE preview_id = $7";
                        }        
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
                        
                    }else{

                        if (record.module_type == 'course') {                            
                            var sql = 'INSERT INTO preview(module_type,title,live_session_url,live_session_date,live_session_time,live_session_minute,image,learn_description,prerequisites_description,description,session_type,video_content_title,video_title_first,video_url_first,video_time_first,video_title_second,video_url_second,video_time_second,video_title_third,video_url_third,video_time_third,video_title_fourth,video_url_fourth,video_time_fourth,video_title_five,video_url_five,video_time_five,video_title_six,video_url_six,video_time_six,video_title_seven,video_url_seven,video_time_seven,video_title_eight,video_url_eight,video_time_eight,video_title_nine,video_url_nine,video_time_nine,video_title_ten,video_url_ten,video_time_ten,content_title_one,content_description_one,content_title_two,content_description_two,content_title_third,content_description_third,content_title_four,content_description_four,content_title_five,content_description_five,trainer,created_at,role,purchase_type,main_cost,sale_cost,draft_status,status) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,$43,$44,$45,$46,$47,$48,$49,$50,$51,$52,$53,$54,$55,$56,$57,$58,$59,$60) RETURNING *'
                            var values = [record.type, record.title, record.live_session_url, record.live_session_date, record.live_session_time, record.live_session_minute, record.image, record.learn_description, record.prerequisites_description, record.description, record.session_type, record.video_content_title, record.video_title_first, record.video_url_first, record.video_time_first, record.video_title_second, record.video_url_second, record.video_time_second, record.video_title_third, record.video_url_third, record.video_time_third, record.video_title_fourth, record.video_url_fourth, record.video_time_fourth, record.video_title_five, record.video_url_five, record.video_time_five, record.video_title_six, record.video_url_six, record.video_time_six, record.video_title_seven, record.video_url_seven, record.video_time_seven, record.video_title_eight, record.video_url_eight, record.video_time_eight, record.video_title_nine, record.video_url_nine, record.video_time_nine, record.video_title_ten, record.video_url_ten, record.video_time_ten, record.content_title_one, record.content_description_one, record.content_title_two, record.content_description_two, record.content_title_third, record.content_description_third, record.content_title_four, record.content_description_four, record.content_title_five, record.content_description_five, record.trainer, record.created_at, record.role, record.purchase_type, record.main_cost, record.sale_cost, record.draft, 1]
                        } else {
                            var sql = 'INSERT INTO preview(title,image,description,module_type,videoId,created_at) VALUES($1,$2,$3,$4,$5,$6) RETURNING *'
                            var values = [record.title, record.image, record.description, record.module_type, record.videoId, record.created_at]
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
                       
                    }                    
                }
            });
        });
    };


    function updateProductByID(preview_id, cols) {
        // Setup static beginning of query
        var query = ['UPDATE preview'];
        query.push('SET');

        // Create another array storing each set command
        // and assigning a number value for parameterized query
        var set = [];

        Object.keys(cols).map(function (key, i) {
            set.push(key + ' = ($' + (i + 1) + ')');
        });
        query.push(set.join(', '));

        // Add the WHERE statement to look up by id
        query.push('WHERE preview_id = ' + preview_id);

        // Return a complete query string

        return query.join(' ');
    }

    this.updatepreviewByadmin = function (record, preview_id, update_value, callback) {
        connection.acquire(function (err, con) {

            var query = updateProductByID(preview_id, record);
            con.query(query, update_value, function (err, result) {
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

            // con.query("UPDATE course SET title =$1,description =$2,role =$3,purchase_type =$4,image =$5 WHERE course_id = $6", [record.title, record.description, record.role, record.purchase_type, record.image, course_id], function (err, result) {
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


    this.getPreview = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM preview', function (err, result) {
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
    

}
module.exports = new Common();