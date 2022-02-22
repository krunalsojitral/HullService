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
var Common = require('../models/common');

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
    var status = req.query.status;
    asyn.waterfall([
        function (done) {
            Video.getAllAdminVideo(status, function (err, result) {
                if (err) {
                    return res.json({ status: 0, 'response': { msg: err } });
                } else {
                    if (result.length > 0) {
                        var response = [];
                        var final_response = [];
                        Promise.all(result.map(function (item) {
                            var temparray = new Promise(function (resolve, reject) {
                                Video.getVideoRoleName(item.video_id, item.role, function (err, data) {
                                    if (data && data.length > 0) {
                                        item.role = data[0].string_agg
                                    }
                                    setTimeout(() => resolve(item), 50)
                                });
                            });
                            return temparray.then(result => {
                                response.push(result);
                                var commentList = response.map(data => {
                                    let retObj = {};
                                    retObj['video_id'] = data.video_id;
                                    retObj['video_embeded_id'] = data.video_embeded_id;
                                    retObj['title'] = data.title;
                                    retObj['description'] = data.description;
                                    retObj['created_on'] = moment(data.created_at).format('YYYY-MM-DD');
                                    retObj['role'] = data.role;
                                    retObj['status'] = data.status;
                                    retObj['views'] = (data.total_view) ? data.total_view : 0;
                                    return retObj;
                                }).sort(function (a, b) {
                                    return a.video_id - b.video_id;
                                });
                                final_response = commentList.reverse();
                            })
                        })).then(function () {
                            done(null, final_response);
                        })
                    } else {
                        done(null, final_response);
                    }
                }
            });
        }
    ],
    function (error, finalData) {
        if (error) {
            return res.json({ 'status': 0, 'response': { 'msg': error } });
        } else {
            if (finalData) {
                return res.json({ 'status': 1, 'response': { 'data': finalData, 'msg': 'data found' } });
            } else {
                return res.json({ 'status': 1, 'response': { 'data': [], 'msg': 'data found' } });
            }
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
                            video['video_url'] = result[0].video_url;
                            video['video_embeded_id'] = result[0].video_embeded_id;                            
                            // video['overview'] = result[0].overview;
                            // video['qna'] = result[0].qna;
                            // video['notes'] = result[0].notes;
                            // video['information'] = result[0].information;
                            video['purchase_type'] = result[0].purchase_type;
                            video['video'] = (result[0].video) ? videoLink + env.VIDEO_VIEW_PATH + result[0].video : '';
                            video['role'] = result[0].role;
                            video['cost'] = result[0].cost;
                            video['status'] = result[0].status;
                            video['tag'] = [];
                            video['draft_status'] = result[0].draft_status;
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
            },
            function (video, done2) {
                if (video['role']) {
                    var role = video['role'];
                    Common.getRoleAllList(function (err, result) {
                        if (result && result.length > 0) {

                            var array = [];
                            result.find((o, i) => {                                
                                if (role.includes(o.role_id)) {
                                    array.push(o);                                    
                                }
                            });

                            video['selected_role'] = array;
                            done2(null, video)
                        } else {
                            video['selected_role'] = [];
                            done2(null, video)
                        }
                    });
                } else {
                    video['selected_role'] = [];
                    done2(null, video)
                }
            }, function (video, done2) {

                if (video['selected_role'].length > 0) {
                    video['selected_role'] = video['selected_role'].map((data, index) => {
                        let retObj = {};
                        retObj['id'] = (index + 1);
                        retObj['label'] = data.role;
                        retObj['value'] = data.role_id;
                        return retObj;
                    });
                    done2(null, video)
                } else {
                    done2(null, video)
                }
            }
        ],
        function (error, video) {
            if (error) {
                return res.json({ 'status': 0, 'response': { 'msg': error } });
            } else {
                return res.json({ 'status': 1, 'response': { 'data': video, 'msg': 'data found' } });
            }
        });
        
    }
});

router.post('/getvideoDataByIdAfterLogin', passport.authenticate('jwt', { session: false }), [check('video_id', 'video is required').notEmpty()], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let video_id = req.body.video_id;
        let user_id = req.user.id;
        asyn.waterfall([
            function (done) {
                Video.getvideoDataByIdAfterLogin(video_id, user_id, function (err, result) {
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
                            video['video_id'] = video_id;
                            video['title'] = result[0].title;
                            video['description'] = result[0].description;
                            video['created_at'] = result[0].created_at;
                            video['video_url'] = result[0].video_url;
                            video['video_embeded_id'] = result[0].video_embeded_id;
                            // video['overview'] = result[0].overview;
                            // video['qna'] = result[0].qna;
                            // video['notes'] = result[0].notes;
                            // video['information'] = result[0].information;
                            video['purchase_type'] = result[0].purchase_type;
                            video['video'] = (result[0].video) ? videoLink + env.VIDEO_VIEW_PATH + result[0].video : '';
                            video['role'] = result[0].role;
                            video['cost'] = result[0].cost;
                            video['status'] = result[0].status;
                            video['video_order'] = result[0].video_order_id;
                            video['tag'] = [];
                            video['draft_status'] = result[0].draft_status;
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
            },
            function (video, done2) {
                if (video['role']) {
                    var role = video['role'];
                    Common.getRoleAllList(function (err, result) {
                        if (result && result.length > 0) {

                            var array = [];
                            result.find((o, i) => {
                                if (role.includes(o.role_id)) {
                                    array.push(o);
                                }
                            });

                            video['selected_role'] = array;
                            done2(null, video)
                        } else {
                            video['selected_role'] = [];
                            done2(null, video)
                        }
                    });
                } else {
                    video['selected_role'] = [];
                    done2(null, video)
                }
            }, function (video, done2) {

                if (video['selected_role'].length > 0) {
                    video['selected_role'] = video['selected_role'].map((data, index) => {
                        let retObj = {};
                        retObj['id'] = (index + 1);
                        retObj['label'] = data.role;
                        retObj['value'] = data.role_id;
                        return retObj;
                    });
                    done2(null, video)
                } else {
                    done2(null, video)
                }
            }
        ],
            function (error, video) {
                if (error) {
                    return res.json({ 'status': 0, 'response': { 'msg': error } });
                } else {
                    return res.json({ 'status': 1, 'response': { 'data': video, 'msg': 'data found' } });
                }
            });

    }
});

router.post('/getRelatedPaidVideoList', passport.authenticate('jwt', { session: false }), [check('video_id', 'video id is required').notEmpty()], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        loggerData(req);
        var user_role = req.user.userrole;
        let video_id = req.body.video_id;
        Video.getRelatedPaidVideoList(user_role, video_id, function (err, result) {
            if (err) {
                return res.json({ status: 0, 'response': { msg: err } });
            } else {
                var imageLink;
                if (req.headers.host == env.ADMIN_LIVE_URL) {
                    imageLink = env.ADMIN_LIVE_URL;
                } else {
                    imageLink = env.ADMIN_LIVE_URL;
                }
                var videoList = result.map(data => {
                    let retObj = {};
                    retObj['video_id'] = data.video_id;
                    retObj['title'] = data.title;
                    retObj['created_at'] = moment(data.video_date).format('MMMM DD, YYYY');
                    retObj['role'] = data.role;
                    retObj['video_embeded_id'] = data.video_embeded_id;
                    retObj['video_url'] = data.video_url;                    
                    retObj['video'] = data.video_url;
                    retObj['cost'] = data.cost;
                    retObj['status'] = data.status;
                    retObj['purchase_type'] = data.purchase_type;
                    return retObj;
                });
                return res.json({ status: 1, 'response': { data: videoList } });
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

            var videoId = '';
            if (obj.video_url) {
                var videoId = helper.getVideoId(obj.video_url);               
            }
            
            let record = {
                title: obj.title,                
                video_url: obj.video_url,
                video_embeded_id: videoId,
                description: obj.description,
                // qna: obj.qna,
                // notes: obj.notes,
                // overview: obj.overview,
                // information: obj.information,
                created_at: moment().format('YYYY-MM-DD'),
                role: (obj.user_role.length > 0) ? obj.user_role : '',
                tag: obj.tag,
                purchase_type: obj.purchase_type,
                cost: obj.cost,
                draft: obj.draft
            };

            if (obj.user_role.length > 0) {
                record.role = obj.user_role.map(data => {
                    return data.value
                }).join(',');
            }

            Video.addVideoByadmin(record, function (err, data) {
                if (err) {
                    return res.json({ 'status': 0, 'response': { 'msg': err } });
                } else {
                    return res.json({ 'status': 1, 'response': { 'msg': 'Added video successfully.', data: data } });
                }
            });

            // asyn.waterfall([
            //     function (done) {
            //         let overview = {};
            //         if (typeof files.video !== 'undefined') {
            //             let file_ext = files.video.name.split('.').pop();
            //             let ProfileVideo = Date.now() + '-' + files.video.name.split(" ").join("");
            //             let tmp_path = files.video.path;
                        
            //             if (file_ext == 'WMV' || file_ext == 'wmv' || file_ext == 'FLV' || file_ext == 'flv' || file_ext == 'AVI' || file_ext == 'avi' || file_ext == '3G2' || file_ext == '3g2' || file_ext == '3GP' || file_ext == '3gp' || file_ext == 'MPG' || file_ext == 'mpg' || file_ext == 'MOV' || file_ext == 'mov' || file_ext == 'mp3' || file_ext == 'MP3' || file_ext == 'mp4' || file_ext == 'MP4') {
            //                 fs.rename(tmp_path, path.join(__dirname, env.VIDEO_PATH + ProfileVideo), function (err) {
            //                     overview['video'] = ProfileVideo;
            //                     done(err, overview)
            //                     fs.unlink(tmp_path, function () {
            //                         if (err) {
            //                             return res.json({ status: 1, 'response': { msg: err } });
            //                         }
            //                     });
            //                 });
            //             } else {
            //                 return res.json({ status: 0, response: { msg: 'Only video with jpg, jpeg and png format are allowed', } });
            //             }
            //         } else {
            //             overview['video'] = '';
            //             done(err, overview);
            //         }
            //     },
            //     function (overview, done1) {
            //         if (overview.video != '') { record.video = overview.video; }
            //         Video.addVideoByadmin(record, function (err, data) {
            //             if (err) {
            //                 done1(err, overview)
            //             } else {
            //                 done1(err, data);
            //             }
            //         });
            //     }
            // ],
            // function (error, userList) {
            //     if (error) {
            //         return res.json({ 'status': 0, 'response': { 'msg': error } });
            //     } else {
            //         return res.json({ 'status': 1, 'response': { 'msg': 'Added video successfully.', data: userList } });
            //     }
            // });
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

            var role = '';

            if (obj.user_role.length > 0) {
                role = obj.user_role.map(data => {
                    return data.value
                }).join(',');
            }

            var videoId = '';
            if (obj.video_url) {
                var videoId = helper.getVideoId(obj.video_url);
            }

            //let update_value = [obj.title, obj.description, obj.qna, obj.notes, obj.overview, obj.information, moment().format('YYYY-MM-DD'), obj.user_role, obj.purchase_type]
            let update_value = [obj.title, obj.video_url, obj.description, videoId, moment().format('YYYY-MM-DD'), role, obj.purchase_type, obj.cost]
            let record = {
                title: obj.title,
                video_url: obj.video_url,
                description: obj.description,
                video_embeded_id: videoId,
                // qna: obj.qna,
                // notes: obj.notes,
                // overview: obj.overview,
                // information: obj.information,
                created_at: moment().format('YYYY-MM-DD'),
                role: role,
                purchase_type: obj.purchase_type,
                cost: obj.cost
            };
            
            let video_id = obj.video_id;
            let tag = (obj.tag) ? obj.tag:[];

            Video.updatevideoByadmin(record, video_id, update_value, tag, function (err, data) {
                if (err) {
                    return res.json({ 'status': 0, 'response': { 'msg': err } });
                } else {
                    return res.json({ 'status': 1, 'response': { 'msg': 'Video updated successfully.', data: data } });
                }
            });
            
            // asyn.waterfall([
            //     function (done) {
            //         let overview = {};
                    
            //         if (typeof files.video !== 'undefined') {
            //             let file_ext = files.video.name.split('.').pop();
            //             let ProfileVideo = Date.now() + '-' + files.video.name.split(" ").join("");
            //             let tmp_path = files.video.path;
            //             if (file_ext == 'WMV' || file_ext == 'wmv' || file_ext == 'FLV' || file_ext == 'flv' || file_ext == 'AVI' || file_ext == 'avi' || file_ext == '3G2' || file_ext == '3g2' || file_ext == '3GP' || file_ext == '3gp' || file_ext == 'MPG' || file_ext == 'mpg' || file_ext == 'MOV' || file_ext == 'mov' || file_ext == 'mp3' || file_ext == 'MP3' || file_ext == 'mp4' || file_ext == 'MP4') {
            //                 fs.rename(tmp_path, path.join(__dirname, env.VIDEO_PATH + ProfileVideo), function (err) {
            //                     overview['video'] = ProfileVideo;
            //                     done(err, overview)
            //                     fs.unlink(tmp_path, function () {
            //                         if (err) {
            //                             return res.json({ status: 1, 'response': { msg: err } });
            //                         }
            //                     });
            //                 });
            //             } else {
            //                 return res.json({ status: 0, response: { msg: 'Only video with jpg, jpeg and png format are allowed', } });
            //             }
            //         } else {
            //             overview['video'] = '';
            //             done(err, overview);
            //         }
            //     },
            //     function (overview, done1) {
            //         if (overview.video != '') { 
            //             record.video = overview.video;
            //             update_value.push(overview.video);
            //         }
            //         Video.updatevideoByadmin(record, video_id, update_value, tag, function (err, data) {
            //             if (err) {
            //                 done1(err, overview)
            //             } else {
            //                 done1(err, data);
            //             }
            //         });
            //     }
            // ],
            // function (error, userList) {
            //     if (error) {
            //         return res.json({ 'status': 0, 'response': { 'msg': error } });
            //     } else {
            //         return res.json({ 'status': 1, 'response': { 'msg': 'Video updated successfully.', data: userList } });
            //     }
            // });
        }
    });
});


router.post('/getPaidVideoList', passport.authenticate('jwt', { session: false }), function (req, res) {
    loggerData(req);
    var user_role = req.user.userrole;
    var user_id = req.user.id;
    let search = (req.body.search) ? req.body.search : '';
    let sortby = (req.body.sortby) ? req.body.sortby : '';
    Video.getPaidVideoList(user_id, user_role, search, sortby, function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var imageLink;
            if (req.headers.host == env.ADMIN_LIVE_URL) {
                imageLink = env.ADMIN_LIVE_URL;
            } else {
                imageLink = env.ADMIN_LIVE_URL;
            }
            var videoList = result.map(data => {
                let retObj = {};
                retObj['video_id'] = data.videoid;
                retObj['title'] = data.title;
                retObj['created_at'] = moment(data.video_date).format('MMMM DD, YYYY');
                retObj['role'] = data.role;
                retObj['video'] = data.video_url;
                retObj['video_order_id'] = data.video_order_id;
                retObj['video_embeded_id'] = data.video_embeded_id;
                retObj['bookmark_video_id'] = data.bookmark_video_id;
                retObj['cost'] = data.cost;
                retObj['purchase_type'] = data.purchase_type;                
                retObj['status'] = data.status;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: videoList } });
        }
    });
});


router.post('/getUnpaidVideoList', function (req, res) {
    loggerData(req);
    let search = (req.body.search) ? req.body.search : '';
    let sortby = (req.body.sortby) ? req.body.sortby : '';
    Video.getUnpaidVideoList(search, sortby, function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var imageLink;
            if (req.headers.host == env.ADMIN_LIVE_URL) {
                imageLink = env.ADMIN_LIVE_URL;
            } else {
                imageLink = env.ADMIN_LIVE_URL;
            }
            var videoList = result.map(data => {
                let retObj = {};
                retObj['video_id'] = data.video_id;
                retObj['title'] = data.title;
                retObj['created_at'] = moment(data.video_date).format('MMMM DD, YYYY');
                retObj['role'] = data.role;
                retObj['video_embeded_id'] = data.video_embeded_id;
                retObj['video'] = data.video_url;
                retObj['cost'] = data.cost;
                retObj['status'] = data.status;
                retObj['purchase_type'] = data.purchase_type;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: videoList } });
        }
    });
});


router.post('/getRelatedUnpaidVideoList', [ check('video_id', 'video id is required').notEmpty() ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else { 
        loggerData(req);
        let video_id = req.body.video_id;
        Video.getRelatedUnpaidVideoList(video_id, function (err, result) {
            if (err) {
                return res.json({ status: 0, 'response': { msg: err } });
            } else {
                var imageLink;
                if (req.headers.host == env.ADMIN_LIVE_URL) {
                    imageLink = env.ADMIN_LIVE_URL;
                } else {
                    imageLink = env.ADMIN_LIVE_URL;
                }
                var videoList = result.map(data => {
                    let retObj = {};
                    retObj['video_id'] = data.video_id;
                    retObj['title'] = data.title;
                    retObj['created_at'] = moment(data.video_date).format('MMMM DD, YYYY');
                    retObj['role'] = data.role;
                    retObj['video_embeded_id'] = data.video_embeded_id;
                    retObj['video'] = data.video_url;
                    retObj['cost'] = data.cost;
                    retObj['status'] = data.status;
                    return retObj;
                });
                return res.json({ status: 1, 'response': { data: videoList } });
            }
        });
    }    
});





router.post('/purchase_video', [
    check('user_id', 'User is required').notEmpty(),
    check('order_id', 'Order id is required').notEmpty(),
    check('video_id', 'video is required').notEmpty()
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        var obj = {
            user_id: req.body.user_id,
            order_id: req.body.order_id,
            video_id: req.body.video_id
        }

        Video.purchase_video(obj, function (err, result) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                if (result) {
                    return res.json({ 'status': 1, 'response': { 'data': result, 'msg': 'Data found' } });
                } else {
                    return res.json({ 'status': 0, 'response': { 'data': [], 'msg': 'Data not found' } });
                }
            }
        });
    }
});


router.get('/draftvideoList', function (req, res) {
    loggerData(req);

    asyn.waterfall([
        function (done) {
            Video.draftvideoList(function (err, result) {
                if (err) {
                    return res.json({ status: 0, 'response': { msg: err } });
                } else {
                    if (result.length > 0) {
                        var response = [];
                        var final_response = [];
                        Promise.all(result.map(function (item) {
                            var temparray = new Promise(function (resolve, reject) {
                                Video.getVideoRoleName(item.video_id, item.role,  function (err, data) {
                                    if (data && data.length > 0) {
                                        item.role = data[0].string_agg
                                    }
                                    setTimeout(() => resolve(item), 50)
                                });
                            });
                            return temparray.then(result => {
                                response.push(result);
                                var commentList = response.map(data => {
                                    let retObj = {};
                                    retObj['video_id'] = data.video_id;
                                    retObj['video_embeded_id'] = data.video_embeded_id;
                                    retObj['title'] = data.title;
                                    retObj['description'] = data.description;
                                    retObj['created_on'] = moment(data.created_at).format('YYYY-MM-DD');
                                    retObj['role'] = (data.role) ? data.role : '';
                                    retObj['status'] = data.status;
                                    retObj['purchase_type'] = data.purchase_type;
                                    retObj['cost'] = data.cost;
                                    return retObj;
                                }).sort(function (a, b) {
                                    return a.video_id - b.video_id;
                                });
                                final_response = commentList.reverse();
                            })
                        })).then(function () {
                            done(null, final_response);
                        })
                    } else {
                        done(null, final_response);
                    }
                }
            });
        }
    ],
    function (error, finalData) {
        if (error) {
            return res.json({ 'status': 0, 'response': { 'msg': error } });
        } else {
            return res.json({ 'status': 1, 'response': { 'data': finalData, 'msg': 'data found' } });
        }
    });
});


router.post('/changeDraftvideoStatus', [
    check('video_id', 'video id is required').notEmpty(),
    check('draft_status', 'Please enter status').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let video_id = req.body.video_id;
        let record = {
            draft_status: req.body.draft_status
        }
        Video.changeDraftvideoStatus(record, video_id, function (err, result) {
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


router.post('/changeDraftvideoStatus', [
    check('video_id', 'video id is required').notEmpty(),
    check('draft_status', 'Please enter status').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let video_id = req.body.video_id;
        let record = {
            draft_status: req.body.draft_status
        }
        Video.changeDraftvideoStatus(record, video_id, function (err, result) {
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

router.post('/videoBookmark', passport.authenticate('jwt', { session: false }), function (req, res) {
    loggerData(req);
    var user_id = req.user.id;
    let video_id = req.body.video_id;
    Video.videoBookmark(user_id, video_id, function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            return res.json({ status: 1, 'response': { data: result } });
        }
    });
});


router.post('/getBookMarkVideo', passport.authenticate('jwt', { session: false }), function (req, res) {

    var user_id = req.user.id;
    var user_role = req.user.userrole;
    Video.getBookMarkVideo(user_id, user_role, function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var imageLink;
            if (req.headers.host == env.ADMIN_LIVE_URL) {
                imageLink = env.ADMIN_LIVE_URL;
            } else {
                imageLink = env.ADMIN_LIVE_URL;
            }
            var videoList = result.map(data => {
                let retObj = {};
                retObj['video_id'] = data.b_id;
                retObj['title'] = data.title;
                retObj['description'] = data.description;
                retObj['created_at'] = moment(data.video_date).format('MMMM DD, YYYY');
                retObj['role'] = data.role;
                retObj['image'] = (data.image) ? imageLink + env.VIDEO_VIEW_PATH + data.image : '';
                retObj['status'] = data.status;
                retObj['purchase_type'] = data.purchase_type;
                retObj['video_embeded_id'] = data.video_embeded_id;                
                retObj['bookmark_video_id'] = data.bookmark_video_id;
                retObj['cost'] = data.cost;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: videoList } });
        }
    });
});

router.post('/deleteVideo', [
    check('video', 'Video is required').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else { 
        loggerData(req);
        let video = req.body.video;
        Video.deleteVideo(video, function (err, result) {
            if (err) {
                return res.json({ status: 0, 'response': { msg: err } });
            } else {
                return res.json({ status: 1, 'response': { msg: 'Video deleted successfully', data: result } });
            }
        });
    }    
});

router.post('/addView', [
    check('video_id', 'Blog is required').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        loggerData(req);
        let video_id = req.body.video_id;
        Video.addView(video_id, function (err, result) {
            if (err) {
                return res.json({ status: 0, 'response': { msg: err } });
            } else {
                return res.json({ status: 1, 'response': { msg: 'Video view successfully', data: result } });
            }
        });
    }
});


module.exports = router;