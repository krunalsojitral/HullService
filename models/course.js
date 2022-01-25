//methods for fetching mysql data
var connection = require('../config/database');
var env = require('../config/env');
var asyn = require('async');

function Course() {
    connection.init();

    
    this.getcourseDataById = function (id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM course where course_id = $1', [id], function (err, result) {
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

    this.getAllAdminCourse = function (status, callback) {
        connection.acquire(function (err, con) {

            var sql = '';
            var array = [];
            if (status) {
                sql = 'SELECT * FROM course where status = $1 and draft_status IS NULL order by course_id DESC';
                array = [status];
            } else {
                sql = 'SELECT * FROM course where draft_status IS NULL order by course_id DESC';
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

    
    this.addcourseByadmin = function (record, callback) {
        connection.acquire(function (err, con) {
           
            const sql = 'INSERT INTO course(title,live_session_url,live_session_date,live_session_time,live_session_minute,image,learn_description,prerequisites_description,description,session_type,video_content_title,video_title_first,video_url_first,video_time_first,video_title_second,video_url_second,video_time_second,video_title_third,video_url_third,video_time_third,video_title_fourth,video_url_fourth,video_time_fourth,video_title_five,video_url_five,video_time_five,video_title_six,video_url_six,video_time_six,video_title_seven,video_url_seven,video_time_seven,video_title_eight,video_url_eight,video_time_eight,video_title_nine,video_url_nine,video_time_nine,video_title_ten,video_url_ten,video_time_ten,content_title_one,content_description_one,content_title_two,content_description_two,content_title_third,content_description_third,content_title_four,content_description_four,content_title_five,content_description_five,trainer,created_at,role,purchase_type,main_cost,sale_cost,draft_status,status) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,$43,$44,$45,$46,$47,$48,$49,$50,$51,$52,$53,$54,$55,$56,$57,$58,$59) RETURNING *'
            const values = [record.title, record.live_session_url, record.live_session_date, record.live_session_time, record.live_session_minute, record.image, record.learn_description, record.prerequisites_description, record.description, record.session_type, record.video_content_title, record.video_title_first, record.video_url_first, record.video_time_first, record.video_title_second, record.video_url_second, record.video_time_second, record.video_title_third, record.video_url_third, record.video_time_third, record.video_title_fourth, record.video_url_fourth, record.video_time_fourth, record.video_title_five, record.video_url_five, record.video_time_five, record.video_title_six, record.video_url_six, record.video_time_six, record.video_title_seven, record.video_url_seven, record.video_time_seven, record.video_title_eight, record.video_url_eight, record.video_time_eight, record.video_title_nine, record.video_url_nine, record.video_time_nine, record.video_title_ten, record.video_url_ten, record.video_time_ten, record.content_title_one, record.content_description_one, record.content_title_two, record.content_description_two, record.content_title_third, record.content_description_third, record.content_title_four, record.content_description_four, record.content_title_five, record.content_description_five, record.trainer, record.created_at, record.role, record.purchase_type, record.main_cost, record.sale_cost, record.draft, 1]
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

    function updateProductByID(course_id, cols) {
        // Setup static beginning of query
        var query = ['UPDATE course'];
        query.push('SET');

        // Create another array storing each set command
        // and assigning a number value for parameterized query
        var set = [];
        
        Object.keys(cols).map(function (key, i) {
            set.push(key + ' = ($' + (i + 1) + ')');
        });
        query.push(set.join(', '));
        
        // Add the WHERE statement to look up by id
        query.push('WHERE course_id = ' + course_id);

        // Return a complete query string
        
        return query.join(' ');
    }

    this.updatecourseByadmin = function (record, course_id, update_value, callback) {
        connection.acquire(function (err, con) {

            var query = updateProductByID(course_id, record);
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

    this.changecourseStatus = function (record, course_id, callback) {
        connection.acquire(function (err, con) {
            con.query("UPDATE course SET status =$1 WHERE course_id = $2", [record.status, course_id], function (err, result) {
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

    this.getPaidCourseList = function (role, search, sortby, callback) {
        connection.acquire(function (err, con) {
            if (search) {

                var order_by = '';

                if (sortby == "low") {
                    order_by += 'order by course.main_cost ASC';
                } else if (sortby == "high") {
                    order_by += 'order by course.main_cost DESC';
                } else {
                    order_by += 'order by course.course_id desc';
                }

                if (sortby == "paid") {

                    var sql = 'SELECT *,course.created_at as course_date FROM course where course.draft_status IS NULL and course.status = $1 and course.purchase_type = $2 and (role ILIKE $3) and ( title ILIKE $4) ' + order_by;
                    var values = [1, 'paid', '%' + role + '%', '%' + search + '%'];
                } else if (sortby == "unpaid") {

                    var sql = 'SELECT *,course.created_at as course_date FROM course where course.draft_status IS NULL and course.status = $1 and course.purchase_type = $2 and (role ILIKE $3) and ( title ILIKE $4) ' + order_by;
                    var values = [1, 'unpaid', '%' + role + '%', '%' + search + '%'];
                } else {

                    var sql = 'SELECT *,course.created_at as course_date FROM course where course.draft_status IS NULL and course.status = $1 and (role ILIKE $2) and ( title ILIKE $3) ' + order_by;
                    var values = [1, '%' + role + '%', '%' + search + '%'];
                }

            } else {

                var order_by = '';

                if (sortby == "low") {
                    order_by += 'order by course.main_cost ASC';
                } else if (sortby == "high") {
                    order_by += 'order by course.main_cost DESC';
                } else {
                    order_by += 'order by course.course_id desc';
                }


                if (sortby == "paid") {
                    var sql = 'SELECT *,course.created_at as course_date FROM course where course.draft_status IS NULL and course.status = $1 and course.purchase_type = $2 and (role ILIKE $3) ' + order_by;
                    var values = [1, 'paid', '%' + role + '%'];
                } else if (sortby == "unpaid") {
                    var sql = 'SELECT *,course.created_at as course_date FROM course where course.draft_status IS NULL and course.status = $1 and course.purchase_type = $2 and (role ILIKE $3) ' + order_by;
                    var values = [1, 'unpaid', '%' + role + '%'];
                } else {
                    var sql = 'SELECT *,course.created_at as course_date FROM course where course.draft_status IS NULL and course.status = $1 and (role ILIKE $2) ' + order_by;
                    var values = [1, '%' + role + '%'];
                }                

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

    this.getUnpaidCourseList = function (search, sortby, callback) {
        connection.acquire(function (err, con) {
            if (search) {               

                var order_by = '';

                if (sortby == "low") {
                    order_by += 'order by course.main_cost ASC';
                } else if (sortby == "high") {
                    order_by += 'order by course.main_cost DESC';
                } else {
                    order_by += 'order by course.course_id desc';
                }

                if (sortby == "paid") {

                    var sql = 'SELECT *,course.created_at as course_date FROM course where course.draft_status IS NULL and course.status = $1 and course.purchase_type = $2 and (role ILIKE $3) and ( title ILIKE $4) ' + order_by;
                    var values = [1,'paid','%4%', '%' + search + '%'];
                } else if (sortby == "unpaid") {

                    var sql = 'SELECT *,course.created_at as course_date FROM course where course.draft_status IS NULL and course.status = $1 and course.purchase_type = $2 and (role ILIKE $3) and ( title ILIKE $4) ' + order_by;
                    var values = [1, 'unpaid','%4%', '%' + search + '%'];
                } else {

                    var sql = 'SELECT *,course.created_at as course_date FROM course where course.draft_status IS NULL and course.status = $1 and (role ILIKE $2) and ( title ILIKE $3) ' + order_by;                    
                    var values = [1, '%4%', '%' + search + '%'];
                }
                

            } else {

                var order_by = '';

                

                if (sortby == "low") {  
                    order_by += 'order by course.main_cost ASC';
                } else if (sortby == "high") {
                    order_by += 'order by course.main_cost DESC';
                } else {
                    order_by += 'order by course.course_id DESC';
                }

                if (sortby == "paid") {
                    var sql = 'SELECT *,course.created_at as course_date FROM course where course.draft_status IS NULL and course.status = $1 and course.purchase_type = $2 and (role ILIKE $3) ' + order_by;
                    var values = [1,'paid', '%4%'];
                } else if (sortby == "unpaid") {
                    var sql = 'SELECT *,course.created_at as course_date FROM course where course.draft_status IS NULL and course.status = $1 and course.purchase_type = $2 and (role ILIKE $3) ' + order_by;
                    var values = [1, 'unpaid', '%4%'];
                } else {
                    var sql = 'SELECT *,course.created_at as course_date FROM course where course.draft_status IS NULL and course.status = $1 and (role ILIKE $2) ' + order_by;
                    var values = [1, '%4%'];
                }
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

    this.purchase_course = function (record, callback) {
        connection.acquire(function (err, con) {            
            const sql = 'INSERT INTO course_order(user_id,order_id,course_id,created_at) VALUES($1,$2,$3,$4) RETURNING *'
            const values = [record.user_id, record.order_id, record.course_id, record.created_at]
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

    this.getMyCourseList = function (user_id, search, sortby, callback) {
        connection.acquire(function (err, con) {
            if (search) {

                var order_by = '';

                if (sortby == "low") {
                    order_by += 'order by course.main_cost ASC';
                } else if (sortby == "high") {
                    order_by += 'order by course.main_cost DESC';
                } else {
                    order_by += 'order by course.course_id desc';
                }

                if (sortby == "paid") {

                    var sql = 'SELECT *,course.created_at as course_date FROM course inner join course_order on course_order.course_id = course.course_id where course_order.user_id = $1 and course.status = $2 and ( title ILIKE $3) ' + order_by;
                    var values = [user_id, 1, '%' + search + '%'];
                } else if (sortby == "unpaid") {

                    var sql = 'SELECT *,course.created_at as course_date FROM course inner join course_order on course_order.course_id = course.course_id where course_order.user_id = $1 and course.status = $2 and ( title ILIKE $3) ' + order_by;
                    var values = [user_id, 1, '%' + search + '%'];
                } else {

                    var sql = 'SELECT *,course.created_at as course_date FROM course inner join course_order on course_order.course_id = course.course_id where course_order.user_id = $1 and course.status = $2 and ( title ILIKE $3) ' + order_by;
                    var values = [user_id, 1, '%' + search + '%'];
                }



            } else {

                var order_by = '';

                if (sortby == "low") {
                    order_by += 'order by course.main_cost ASC';
                } else if (sortby == "high") {
                    order_by += 'order by course.main_cost DESC';
                } else {
                    order_by += 'order by course.course_id desc';
                }


                if (sortby == "paid") {
                    var sql = 'SELECT *,course.created_at as course_date FROM course inner join course_order on course_order.course_id = course.course_id where course_order.user_id = $1 and course.status = $2 ' + order_by;
                    var values = [user_id,1];
                } else if (sortby == "unpaid") {
                    var sql = 'SELECT *,course.created_at as course_date FROM course inner join course_order on course_order.course_id = course.course_id where course_order.user_id = $1 and course.status = $2 ' + order_by;
                    var values = [user_id,1];
                } else {
                    var sql = 'SELECT *,course.created_at as course_date FROM course inner join course_order on course_order.course_id = course.course_id where course_order.user_id = $1 and course.status = $2 ' + order_by;
                    var values = [user_id,1];
                }



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

    this.getUserPurchaseCourseOrNot = function (user_id, course_id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM course_order where user_id = $1 and course_id = $2', [user_id, course_id], function (err, result) {
                con.release();
                callback(null, result.rows);
            });
        });
    }
    

    this.draftcourseList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM course where draft_status = $1 order by course_id desc', [1], function (err, result) {
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

    this.changeDraftCourseStatus = function (record, course_id, callback) {
        connection.acquire(function (err, con) {
            con.query("UPDATE course SET draft_status =$1 WHERE course_id = $2", [record.status, course_id], function (err, result) {
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
    
    this.deleteCourse = function (course, callback) {
        connection.acquire(function (err, con) {
            course.map(data => {
                con.query('DELETE FROM course where course_id = $1', [data.course_id], function (err, results) {});
            });
            con.release()
            callback(null, course);
        });
    };
}
module.exports = new Course();