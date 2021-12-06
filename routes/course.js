"use strict";

var express = require('express');
var { check, validationResult } = require("express-validator");

var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var env = require('../config/env');
var Course = require('../models/course');
var path = require('path');
var fs = require('fs');
var asyn = require('async');
var helper = require('../config/helper');
var moment = require('moment');
var formidable = require('formidable');


function loggerData(req) {
    if (env.DEBUG) {
        var URL = "Url:-" + JSON.stringify(req.originalUrl, null, 4) + "\n";
        //  console.log(moment().format('YYYY-MM-DD h:m:s A') + ": " + URL);
    }
}


// video list
//passport.authenticate('jwt', { session: false }), 
router.get('/courseList', function (req, res) {
    loggerData(req);
    Course.getAllAdminCourse(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var courseList = result.map(data => {
                let retObj = {};
                retObj['course_id'] = data.course_id;
                retObj['title'] = data.title;
                retObj['description'] = data.description;
                retObj['created_at'] = moment(data.created_at).format('YYYY-MM-DD');
                retObj['role'] = data.role;
                retObj['status'] = data.status;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: courseList } });
        }
    });
});


//get video data - adminside
router.post('/getcourseDataById', [check('course_id', 'Course is required').notEmpty()], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let course_id = req.body.course_id;

        asyn.waterfall([
            function (done) {
                Course.getcourseDataById(course_id, function (err, result) {
                    if (err) {
                        done({ 'status': 0, 'response': { 'msg': 'Something went wrong.' } });
                    } else {
                        if (result != '') {
                            var courseLink;
                            if (req.headers.host == env.ADMIN_LIVE_URL) {
                                courseLink = env.ADMIN_LIVE_URL;
                            } else {
                                courseLink = env.ADMIN_LIVE_URL;
                            }
                            let course = {};
                            course['course_id'] = result[0].course_id;
                            course['title'] = result[0].title;
                            course['description'] = result[0].description;
                            course['created_at'] = result[0].created_at;
                            course['image'] = (result[0].image) ? courseLink + env.COURSE_VIEW_PATH + result[0].image : '';
                            course['role'] = result[0].role;
                            course['status'] = result[0].status;
                            course['learn_description'] = result[0].learn_description;
                            course['prerequisites_description'] = result[0].prerequisites_description;
                            course['session_type'] = result[0].session_type;
                            course['video_content_title'] = result[0].video_content_title;
                            course['video_title_first'] = result[0].video_title_first;
                            course['video_url_first'] = result[0].video_url_first;
                            course['video_time_first'] = result[0].video_time_first;
                            course['video_title_second'] = result[0].video_title_second;
                            course['video_url_second'] = result[0].video_url_second;
                            course['video_time_second'] = result[0].video_time_second;
                            course['video_title_third'] = result[0].video_title_third;
                            course['video_url_third'] = result[0].video_url_third;
                            course['video_time_third'] = result[0].video_time_third;
                            course['video_title_fourth'] = result[0].video_title_fourth;
                            course['video_url_fourth'] = result[0].video_url_fourth;
                            course['video_time_fourth'] = result[0].video_time_fourth;
                            course['video_title_five'] = result[0].video_title_five;
                            course['video_url_five'] = result[0].video_url_five;
                            course['video_time_five'] = result[0].video_time_five;
                            course['video_title_six'] = result[0].video_title_six;
                            course['video_url_six'] = result[0].video_url_six;
                            course['video_time_six'] = result[0].video_time_six;
                            course['video_title_seven'] = result[0].video_title_seven;
                            course['video_url_seven'] = result[0].video_url_seven;
                            course['video_time_seven'] = result[0].video_time_seven;
                            course['video_title_eight'] = result[0].video_title_eight;
                            course['video_url_eight'] = result[0].video_url_eight;
                            course['video_time_eight'] = result[0].video_time_eight;
                            course['video_title_nine'] = result[0].video_title_nine;
                            course['video_url_nine'] = result[0].video_url_nine;
                            course['video_time_nine'] = result[0].video_time_nine;
                            course['video_title_ten'] = result[0].video_title_ten;
                            course['video_url_ten'] = result[0].video_url_ten;
                            course['video_time_ten'] = result[0].video_time_ten;
                            course['content_title_one'] = result[0].content_title_one;
                            course['content_description_one'] = result[0].content_description_one;
                            course['content_title_two'] = result[0].content_title_two;
                            course['content_description_two'] = result[0].content_description_two;
                            course['content_title_third'] = result[0].content_title_third;
                            course['content_description_third'] = result[0].content_description_third;
                            course['content_title_four'] = result[0].content_title_four;
                            course['content_description_four'] = result[0].content_description_four;
                            course['content_title_five'] = result[0].content_title_five;
                            course['content_description_five'] = result[0].content_description_five;
                            course['trainer'] = result[0].trainer;
                            course['purchase_type'] = result[0].purchase_type;
                            course['main_cost'] = result[0].main_cost;
                            course['sale_cost'] = result[0].sale_cost;                            
                            course['live_session_url'] = result[0].live_session_url;
                            course['live_session_date'] = result[0].live_session_date;
                            course['live_session_time'] = result[0].live_session_time;
                            course['live_session_minute'] = result[0].live_session_minute;
                            done(err, course)
                        } else {
                            done('data not found', null);
                        }
                    }
                });
            }
        ],
        function (error, video) {
            if (error) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                return res.json({ 'status': 1, 'response': { 'data': video, 'msg': 'data found' } });
            }
        });
        
    }
});


router.post('/changecourseStatus', [
    check('course_id', 'course id is required').notEmpty(),
    check('status', 'Please enter status').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let course_id = req.body.course_id;
        let record = {
            status: req.body.status
        }
        Course.changecourseStatus(record, course_id, function (err, result) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': 'Error Occured.' } });
            } else {
                if (result) {
                    return res.json({ 'status': 1, 'response': { 'msg': 'Status Changed successfully.' } });
                } else {
                    return res.json({ 'status': 0, 'response': { 'msg': 'Data not found.' } });
                }
            }
        });
    }

});

router.post('/addcourseByadmin', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) return res.json({ status: 1, 'response': { msg: err } });
        var validationErrors = false;
        if (validationErrors == false) {

            var json = fields.data;
            let obj = JSON.parse(json);
            let record = {
                title: obj.title,
                live_session_url: (obj.live_session_url) ? obj.live_session_url:'',
                live_session_date: (obj.live_session_date) ? obj.live_session_date : '',
                live_session_time: (obj.live_session_time) ? obj.live_session_time : '',
                live_session_minute: (obj.live_session_minute) ? obj.live_session_minute : '',
                description: obj.description,
                learn_description: obj.learn_description,
                prerequisites_description: obj.prerequisites_description,
                session_type: obj.session_type,
                video_content_title: obj.video_content_title,
                video_title_first: obj.video_title_first,
                video_url_first: obj.video_url_first,
                video_time_first: obj.video_time_first,
                video_title_second: obj.video_title_second,
                video_url_second: obj.video_url_second,
                video_time_second: obj.video_time_second,
                video_title_third: obj.video_title_third,
                video_url_third: obj.video_url_third,
                video_time_third: obj.video_time_third,
                video_title_fourth: obj.video_title_fourth,
                video_url_fourth: obj.video_url_fourth,
                video_time_fourth: obj.video_time_fourth,
                video_title_five: obj.video_title_five,
                video_url_five: obj.video_url_five,
                video_time_five: obj.video_time_five,
                video_title_six: obj.video_title_six,
                video_url_six: obj.video_url_six,
                video_time_six: obj.video_time_six,
                video_title_seven: obj.video_title_seven,
                video_url_seven: obj.video_url_seven,
                video_time_seven: obj.video_time_seven,
                video_title_eight: obj.video_title_eight,
                video_url_eight: obj.video_url_eight,
                video_time_eight: obj.video_time_eight,
                video_title_nine: obj.video_title_nine,
                video_url_nine: obj.video_url_nine,
                video_time_nine: obj.video_time_nine,
                video_title_ten: obj.video_title_ten,
                video_url_ten: obj.video_url_ten,
                video_time_ten: obj.video_time_ten,
                content_title_one: obj.content_title_one,
                content_description_one: obj.content_description_one,
                content_title_two: obj.content_title_two,
                content_description_two: obj.content_description_two,
                content_title_third: obj.content_title_third,
                content_description_third: obj.content_description_third,
                content_title_four: obj.content_title_four,
                content_description_four: obj.content_description_four,
                content_title_five: obj.content_title_five,
                content_description_five: obj.content_description_five,
                trainer: obj.trainer,
                created_at: moment().format('YYYY-MM-DD'),
                role: obj.user_role,
                purchase_type: obj.purchase_type,
                main_cost: obj.main_cost,
                sale_cost: obj.sale_cost
            };
            asyn.waterfall([
                function (done) {
                    let overview = {};
                    if (typeof files.image !== 'undefined') {
                        let file_ext = files.image.name.split('.').pop();
                        let CourseImage = Date.now() + '-' + files.image.name.split(" ").join("");
                        let tmp_path = files.image.path;
                        
                        if (file_ext == 'png' || file_ext == 'Png' || file_ext == 'jpg' || file_ext == 'JPG' || file_ext == 'jpeg' || file_ext == 'JPEG') {
                            fs.rename(tmp_path, path.join(__dirname, env.VIDEO_PATH + CourseImage), function (err) {
                                overview['image'] = CourseImage;
                                done(err, overview)
                                fs.unlink(tmp_path, function () {
                                    if (err) {
                                        return res.json({ status: 1, 'response': { msg: err } });
                                    }
                                });
                            });
                        } else {
                            return res.json({ status: 0, response: { msg: 'Only image with jpg, jpeg and png format are allowed', } });
                        }
                    } else {
                        overview['image'] = '';
                        done(err, overview);
                    }
                },
                function (overview, done1) {
                    if (overview.image != '') { record.image = overview.image; }
                    Course.addcourseByadmin(record, function (err, data) {
                        if (err) {
                            done1(err, overview)
                        } else {
                            done1(err, data);
                        }
                    });
                }
            ],
            function (error, userList) {
                if (error) {
                    return res.json({ 'status': 0, 'response': { 'msg': error } });
                } else {
                    return res.json({ 'status': 1, 'response': { 'msg': 'Course successfully added', data: userList } });
                }
            });
        }
    });
});

router.post('/updatecourseByadmin', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) return res.json({ status: 1, 'response': { msg: err } });
        var validationErrors = false;
        if (validationErrors == false) {

            var json = fields.data;
            let obj = JSON.parse(json);
            let update_value = [obj.title, obj.live_session_url, obj.live_session_date,
                obj.live_session_time, obj.live_session_minute, obj.description, 
                obj.learn_description, obj.prerequisites_description, obj.session_type,
                obj.video_content_title,
                obj.video_title_first,obj.video_url_first,obj.video_time_first,
                obj.video_title_second,obj.video_url_second,obj.video_time_second,
                obj.video_title_third,obj.video_url_third,obj.video_time_third,
                obj.video_title_fourth,obj.video_url_fourth,obj.video_time_fourth,
                obj.video_title_five,obj.video_url_five,obj.video_time_five,
                obj.video_title_six,obj.video_url_six,obj.video_time_six,
                obj.video_title_seven,obj.video_url_seven,obj.video_time_seven,
                obj.video_title_eight,obj.video_url_eight,obj.video_time_eight,
                obj.video_title_nine,obj.video_url_nine,obj.video_time_nine,
                obj.video_title_ten,obj.video_url_ten,obj.video_time_ten,
                obj.content_title_one,obj.content_description_one,
                obj.content_title_two,obj.content_description_two,
                obj.content_title_third,obj.content_description_third,
                obj.content_title_four,obj.content_description_four,
                obj.content_title_five,obj.content_description_five,
                obj.trainer,obj.user_role,obj.purchase_type,obj.main_cost,obj.sale_cost]
            let record = {
                title: obj.title,
                live_session_url: (obj.live_session_url) ? obj.live_session_url : '',
                live_session_date: (obj.live_session_date) ? obj.live_session_date : '',
                live_session_time: (obj.live_session_time) ? obj.live_session_time : '',
                live_session_minute: (obj.live_session_minute) ? obj.live_session_minute : '',
                description: obj.description,
                learn_description: obj.learn_description,
                prerequisites_description: obj.prerequisites_description,
                session_type: obj.session_type,
                video_content_title: obj.video_content_title,
                video_title_first: obj.video_title_first,
                video_url_first: obj.video_url_first,
                video_time_first: obj.video_time_first,
                video_title_second: obj.video_title_second,
                video_url_second: obj.video_url_second,
                video_time_second: obj.video_time_second,
                video_title_third: obj.video_title_third,
                video_url_third: obj.video_url_third,
                video_time_third: obj.video_time_third,
                video_title_fourth: obj.video_title_fourth,
                video_url_fourth: obj.video_url_fourth,
                video_time_fourth: obj.video_time_fourth,
                video_title_five: obj.video_title_five,
                video_url_five: obj.video_url_five,
                video_time_five: obj.video_time_five,
                video_title_six: obj.video_title_six,
                video_url_six: obj.video_url_six,
                video_time_six: obj.video_time_six,
                video_title_seven: obj.video_title_seven,
                video_url_seven: obj.video_url_seven,
                video_time_seven: obj.video_time_seven,
                video_title_eight: obj.video_title_eight,
                video_url_eight: obj.video_url_eight,
                video_time_eight: obj.video_time_eight,
                video_title_nine: obj.video_title_nine,
                video_url_nine: obj.video_url_nine,
                video_time_nine: obj.video_time_nine,
                video_title_ten: obj.video_title_ten,
                video_url_ten: obj.video_url_ten,
                video_time_ten: obj.video_time_ten,
                content_title_one: obj.content_title_one,
                content_description_one: obj.content_description_one,
                content_title_two: obj.content_title_two,
                content_description_two: obj.content_description_two,
                content_title_third: obj.content_title_third,
                content_description_third: obj.content_description_third,
                content_title_four: obj.content_title_four,
                content_description_four: obj.content_description_four,
                content_title_five: obj.content_title_five,
                content_description_five: obj.content_description_five,
                trainer: obj.trainer,                
                role: obj.user_role,
                purchase_type: obj.purchase_type,
                main_cost: obj.main_cost,
                sale_cost: obj.sale_cost
            };
            let course_id = obj.course_id;
            
            
            asyn.waterfall([
                function (done) {
                    let overview = {};
                    if (typeof files.image !== 'undefined') {
                        let file_ext = files.image.name.split('.').pop();
                        let CourseImage = Date.now() + '-' + files.image.name.split(" ").join("");
                        let tmp_path = files.image.path;

                        if (file_ext == 'png' || file_ext == 'Png' || file_ext == 'jpg' || file_ext == 'JPG' || file_ext == 'jpeg' || file_ext == 'JPEG') {
                            fs.rename(tmp_path, path.join(__dirname, env.COURSE_PATH + CourseImage), function (err) {
                                overview['image'] = CourseImage;
                                done(err, overview)
                                fs.unlink(tmp_path, function () {
                                    if (err) {
                                        return res.json({ status: 1, 'response': { msg: err } });
                                    }
                                });
                            });
                        } else {
                            return res.json({ status: 0, response: { msg: 'Only image with jpg, jpeg and png format are allowed', } });
                        }
                    } else {
                        overview['image'] = '';
                        done(err, overview);
                    }
                },
                function (overview, done1) {
                    if (overview.image != '') {
                        record.image = overview.image;
                        update_value.push(overview.image);
                    }
                    Course.updatecourseByadmin(record, course_id, update_value, function (err, data) {
                        if (err) {
                            done1(err, overview)
                        } else {
                            done1(err, data);
                        }
                    });
                }
            ],
            function (error, userList) {
                if (error) {
                    return res.json({ 'status': 0, 'response': { 'msg': error } });
                } else {
                    return res.json({ 'status': 1, 'response': { 'msg': 'Course updated successfully.', data: userList } });
                }
            });
        }
    });
});

router.post('/getPaidCourseList', passport.authenticate('jwt', { session: false }), function (req, res) {
    loggerData(req);
    var user_role = req.user.userrole;
    let search = (req.body.search) ? req.body.search : '';
    let sortby = (req.body.sortby) ? req.body.sortby : '';
    Course.getPaidCourseList(user_role, search, sortby, function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var imageLink;
            if (req.headers.host == env.ADMIN_LIVE_URL) {
                imageLink = env.ADMIN_LIVE_URL;
            } else {
                imageLink = env.ADMIN_LIVE_URL;
            }
            var courseList = result.map(data => {
                let retObj = {};
                retObj['course_id'] = data.course_id;
                retObj['title'] = data.title;
                retObj['created_at'] = moment(data.course_date).format('MMMM DD, YYYY');
                retObj['role'] = data.role;
                retObj['image'] = (data.image) ? imageLink + env.COURSE_VIEW_PATH + data.image : '';
                retObj['status'] = data.status;
                retObj['main_cost'] = data.main_cost;
                retObj['sale_cost'] = data.sale_cost;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: courseList } });
        }
    });
});


router.post('/getUnpaidCourseList', function (req, res) {
    loggerData(req);
    let search = (req.body.search) ? req.body.search : '';
    let sortby = (req.body.sortby) ? req.body.sortby : '';
    Course.getUnpaidCourseList(search, sortby, function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var imageLink;
            if (req.headers.host == env.ADMIN_LIVE_URL) {
                imageLink = env.ADMIN_LIVE_URL;
            } else {
                imageLink = env.ADMIN_LIVE_URL;
            }
            var courseList = result.map(data => {
                let retObj = {};
                retObj['course_id'] = data.course_id;
                retObj['title'] = data.title;
                retObj['image'] = (data.image) ? imageLink + env.COURSE_VIEW_PATH + data.image : '';
                retObj['created_at'] = moment(data.course_date).format('MMMM DD, YYYY');
                retObj['role'] = data.role;
                retObj['status'] = data.status;
                retObj['main_cost'] = data.main_cost;
                retObj['sale_cost'] = data.sale_cost;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: courseList } });
        }
    });
});



module.exports = router;