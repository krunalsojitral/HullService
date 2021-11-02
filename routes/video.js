"use strict";

var express = require('express');
var { check, validationResult } = require("express-validator");

var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var env = require('../config/env');
var Video = require('../models/video');
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
router.get('/videoList', function (req, res) {
    loggerData(req);
    Video.getAllAdminVideo(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var videoList = result.map(data => {
                let retObj = {};
                retObj['video_id'] = data.video_id;
                retObj['title'] = data.title;
                retObj['description'] = data.description;
                retObj['created_at'] = moment(data.created_at).format('YYYY-MM-DD');
                retObj['role'] = data.role;
                retObj['status'] = data.status;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: videoList } });
        }
    });
});

//get video data - adminside
router.post('/getvideoDataById', [check('video_id', 'video is required').notEmpty()], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let video_id = req.body.video_id;

        asyn.waterfall([
            function (done) {
                Video.getvideoDataById(video_id, function (err, result) {
                    if (err) {
                        done({ 'status': 0, 'response': { 'msg': 'Something went wrong.' } });
                    } else {
                        if (result != '') {
                            var videoLink;
                            if (req.headers.host == env.ADMIN_LIVE_URL) {
                                videoLink = env.ADMIN_LIVE_URL;
                            } else {
                                videoLink = env.ADMIN_LIVE_URL;
                            }
                            let video = {};
                            video['video_id'] = result[0].video_id;
                            video['title'] = result[0].title;
                            video['description'] = result[0].description;
                            video['created_at'] = result[0].created_at;
                            video['overview'] = result[0].overview;
                            video['qna'] = result[0].qna;
                            video['notes'] = result[0].notes;
                            video['information'] = result[0].information;
                            video['purchase_type'] = result[0].purchase_type;
                            video['video'] = (result[0].video) ? videoLink + env.VIDEO_VIEW_PATH + result[0].video : '';
                            video['role'] = result[0].role;
                            video['status'] = result[0].status;
                            video['tag'] = [];
                            done(err, video)
                        } else {
                            done('data not found', null);
                        }
                    }
                });
            },
            function (video, done) {
                if (video['video_id'] != '') {
                    Video.getTagByVideoId(video['video_id'], function (err, result) {
                        
                        if (result && result.length > 0) {
                            var obj = result.map((data, index) => {
                                let retObj = {};
                                retObj['id'] = (index + 1);
                                retObj['label'] = data.tag_name;
                                retObj['value'] = data.tag_id;
                                return retObj;
                            });
                            video['tag'] = obj;
                            done(null, video)
                        } else {
                            done(null, video)
                        }
                    });
                } else {
                    done(null, video)
                }
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


router.post('/changevideoStatus', [
    check('video_id', 'video id is required').notEmpty(),
    check('status', 'Please enter status').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let video_id = req.body.video_id;
        let record = {
            status: req.body.status
        }
        Video.changevideoStatus(record, video_id, function (err, result) {
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

router.post('/addVideoByadmin', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) return res.json({ status: 1, 'response': { msg: err } });
        var validationErrors = false;
        if (validationErrors == false) {

            var json = fields.data;
            let obj = JSON.parse(json);
            let record = {
                title: obj.title,
                description: obj.description,
                qna: obj.qna,
                notes: obj.notes,
                overview: obj.overview,
                information: obj.information,
                created_at: moment().format('YYYY-MM-DD'),
                role: obj.user_role,
                tag: obj.tag,
                purchase_type: obj.purchase_type
            };
            asyn.waterfall([
                function (done) {
                    let overview = {};
                    if (typeof files.video !== 'undefined') {
                        let file_ext = files.video.name.split('.').pop();
                        let ProfileVideo = Date.now() + '-' + files.video.name.split(" ").join("");
                        let tmp_path = files.video.path;
                        
                        if (file_ext == 'WMV' || file_ext == 'wmv' || file_ext == 'FLV' || file_ext == 'flv' || file_ext == 'AVI' || file_ext == 'avi' || file_ext == '3G2' || file_ext == '3g2' || file_ext == '3GP' || file_ext == '3gp' || file_ext == 'MPG' || file_ext == 'mpg' || file_ext == 'MOV' || file_ext == 'mov' || file_ext == 'mp3' || file_ext == 'MP3' || file_ext == 'mp4' || file_ext == 'MP4') {
                            fs.rename(tmp_path, path.join(__dirname, env.VIDEO_PATH + ProfileVideo), function (err) {
                                overview['video'] = ProfileVideo;
                                done(err, overview)
                                fs.unlink(tmp_path, function () {
                                    if (err) {
                                        return res.json({ status: 1, 'response': { msg: err } });
                                    }
                                });
                            });
                        } else {
                            return res.json({ status: 0, response: { msg: 'Only video with jpg, jpeg and png format are allowed', } });
                        }
                    } else {
                        overview['video'] = '';
                        done(err, overview);
                    }
                },
                function (overview, done1) {
                    if (overview.video != '') { record.video = overview.video; }
                    Video.addVideoByadmin(record, function (err, data) {
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
                    return res.json({ 'status': 1, 'response': { 'msg': 'Added video successfully.', data: userList } });
                }
            });
        }
    });
});

router.post('/updatevideoByadmin', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) return res.json({ status: 1, 'response': { msg: err } });
        var validationErrors = false;
        if (validationErrors == false) {

            var json = fields.data;
            let obj = JSON.parse(json);
            let update_value = [obj.title, obj.description, obj.qna, obj.notes, obj.overview, obj.information, moment().format('YYYY-MM-DD'), obj.user_role, obj.purchase_type]
            let record = {
                title: obj.title,
                description: obj.description,
                qna: obj.qna,
                notes: obj.notes,
                overview: obj.overview,
                information: obj.information,
                created_at: moment().format('YYYY-MM-DD'),
                role: obj.user_role,
                purchase_type: obj.purchase_type
            };
            let video_id = obj.video_id;
            let tag = (obj.tag) ? obj.tag:[];
            
            asyn.waterfall([
                function (done) {
                    let overview = {};
                    
                    if (typeof files.video !== 'undefined') {
                        let file_ext = files.video.name.split('.').pop();
                        let ProfileVideo = Date.now() + '-' + files.video.name.split(" ").join("");
                        let tmp_path = files.video.path;
                        if (file_ext == 'WMV' || file_ext == 'wmv' || file_ext == 'FLV' || file_ext == 'flv' || file_ext == 'AVI' || file_ext == 'avi' || file_ext == '3G2' || file_ext == '3g2' || file_ext == '3GP' || file_ext == '3gp' || file_ext == 'MPG' || file_ext == 'mpg' || file_ext == 'MOV' || file_ext == 'mov' || file_ext == 'mp3' || file_ext == 'MP3' || file_ext == 'mp4' || file_ext == 'MP4') {
                            fs.rename(tmp_path, path.join(__dirname, env.VIDEO_PATH + ProfileVideo), function (err) {
                                overview['video'] = ProfileVideo;
                                done(err, overview)
                                fs.unlink(tmp_path, function () {
                                    if (err) {
                                        return res.json({ status: 1, 'response': { msg: err } });
                                    }
                                });
                            });
                        } else {
                            return res.json({ status: 0, response: { msg: 'Only video with jpg, jpeg and png format are allowed', } });
                        }
                    } else {
                        overview['video'] = '';
                        done(err, overview);
                    }
                },
                function (overview, done1) {
                    if (overview.video != '') { 
                        record.video = overview.video;
                        update_value.push(overview.video);
                    }
                    Video.updatevideoByadmin(record, video_id, update_value, tag, function (err, data) {
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
                    return res.json({ 'status': 1, 'response': { 'msg': 'Video updated successfully.', data: userList } });
                }
            });
        }
    });
});

module.exports = router;