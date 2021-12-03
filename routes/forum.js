"use strict";

var express = require('express');
var { check, validationResult } = require("express-validator");

var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var env = require('../config/env');
var Forum = require('../models/forum');
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
router.get('/forumList', function (req, res) {
    loggerData(req);
    Forum.getAllAdminforum(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var forumList = result.map(data => {
                let retObj = {};
                retObj['forum_id'] = data.forum_id;
                retObj['topic'] = data.topic;
                retObj['total_view'] = data.total_view;
                retObj['created_at'] = moment(data.created_at).format('YYYY-MM-DD');
                retObj['status'] = data.status;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: forumList } });
        }
    });
});

router.post('/forumCommentList', function (req, res) {
    loggerData(req);
    var forum_id = req.body.forum_id;
    Forum.getAllForumComment(forum_id,function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var forumCommentList = result.map(data => {
                let retObj = {};                
                retObj['forum_comment_id'] = data.forum_comment_id;
                retObj['forum_id'] = data.forum_id;
                retObj['comment'] = data.comment;
                retObj['user_id'] = data.user_id;
                retObj['user_name'] = data.name;
                retObj['created_at'] = moment(data.created_at).format('YYYY-MM-DD');
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: forumCommentList } });
        }
    });
});



//get video data - adminside
router.post('/getforumDataById', [check('forum_id', 'forum is required').notEmpty()], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let forum_id = req.body.forum_id;

        asyn.waterfall([
            function (done) {
                Forum.getforumDataById(forum_id, function (err, result) {
                    if (err) {
                        done({ 'status': 0, 'response': { 'msg': 'Something went wrong.' } });
                    } else {
                        if (result != '') {
                            var forumLink;
                            if (req.headers.host == env.ADMIN_LIVE_URL) {
                                forumLink = env.ADMIN_LIVE_URL;
                            } else {
                                forumLink = env.ADMIN_LIVE_URL;
                            }
                            let forum = {};
                            forum['forum_id'] = result[0].forum_id;
                            forum['title'] = result[0].topic;
                            forum['heading'] = result[0].heading;
                            forum['category'] = result[0].category;
                            forum['tag'] = [];
                            done(err, forum)
                        } else {
                            done('data not found', null);
                        }
                    }
                });
            },
            function (forum, done) {
                if (forum['forum_id'] != '') {
                    Forum.getTagByForumId(forum['forum_id'], function (err, result) {
                        if (result && result.length > 0) {
                            var obj = result.map((data, index) => {
                                let retObj = {};
                                retObj['id'] = (index + 1);
                                retObj['label'] = data.tag_name;
                                retObj['value'] = data.tag_id;
                                return retObj;
                            });
                            forum['tag'] = obj;
                            done(null, forum)
                        } else {
                            done(null, forum)
                        }
                    });
                } else {
                    done(null, forum)
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


router.post('/changeforumStatus', [
    check('forum_id', 'forum id is required').notEmpty(),
    check('status', 'Please enter status').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let forum_id = req.body.forum_id;
        let record = {
            status: req.body.status
        }
        Forum.changeforumStatus(record, forum_id, function (err, result) {
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

router.post('/addforumByadmin', [
    check('title', 'Topic is required').notEmpty(),
    check('heading', 'Heading is required').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
            let record = {
                topic: req.body.title,
                heading: (req.body.heading) ? req.body.heading:'',
                category: (req.body.category) ? req.body.category : '',
                created_at: moment().format('YYYY-MM-DD'),
            };
            let tag = (req.body.tag) ? req.body.tag : [];
            Forum.addforumByadmin(record, tag, function (err, data) {
                if (err) {
                    return res.json({ 'status': 0, 'response': { 'msg': error } });
                } else {
                    return res.json({ 'status': 1, 'response': { 'msg': 'Forum added successfully.', data: data } });
                }
            });
        }
});

router.post('/updateforumByadmin', function (req, res) {
    var forum_id = req.body.forum_id;
    let update_value = [req.body.title, req.body.heading, req.body.category]
    let record = {
        topic: req.body.title,
        heading: (req.body.heading) ? req.body.heading : '',
        category: (req.body.category) ? req.body.category : ''
    };
    let tag = (req.body.tag) ? req.body.tag : [];
    Forum.updateforumByadmin(record, forum_id, update_value, tag, function (err, data) {
        if (err) {
            return res.json({ 'status': 0, 'response': { 'msg': err } });
        } else {
            return res.json({ 'status': 1, 'response': { 'msg': 'Forum updated successfully.', data: data } });
        }
    });
});

router.post('/deleteForum', [check('comment_id', 'comment id is required').notEmpty()], (req, res, next) => {
    let comment_id = req.body.comment_id
    Forum.deleteForum(comment_id, function (err, data) {
        if (err) {
            return res.json({ 'status': 0, 'response': { 'msg': err } });
        } else {
            return res.json({ 'status': 1, 'response': { 'msg': 'Comment deleted successfully.', data: data } });
        }
    });
});


router.get('/getForumHeadingList', function (req, res) {
    loggerData(req);
    Forum.getForumHeadingList(function (err, results) {
        if (err) {
            return res.json({ 'status': 0, 'response': { 'data': [], 'msg': 'data not found' } });
        } else {
            if (results.length > 0) {
                let temparray = new Promise(async (resolve, reject) => {
                    var forumHeading = [];
                    for (let heading of results) {
                        await Forum.getForumListByForumHeading(heading.forumheading_id, function (err, data) {
                            if (data.length > 0){
                                heading.forum = data;
                                forumHeading.push(heading);
                            }
                        });
                    }

                    setTimeout(() => resolve(forumHeading), 50)
                });
                temparray.then(data => {
                    return res.json({ 'status': 1, 'response': data, 'msg': 'data found' });
                })
            } else {
                return res.json({ 'status': 0, 'response': [], 'msg': 'data found' });
            }
        }
    });
});


router.post('/getForumSubHeadingList', [
    check('forum_heading_id', 'Heading is required').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else { 
        var forum_heading_id = req.body.forum_heading_id;
        Forum.getForumListByForumHeading(forum_heading_id, function (err, results) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'data': [], 'msg': 'data not found' } });
            } else {
                if (results.length > 0) {
                    return res.json({ 'status': 1, 'response': results, 'msg': 'data found' });
                } else {
                    return res.json({ 'status': 0, 'response': [], 'msg': 'data found' });
                }
            }
        });
    }
});




module.exports = router;