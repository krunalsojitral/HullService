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
var mustache = require('mustache');
var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
const nodeMailerCredential = require('./../EmailCredential');

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
                retObj['created_on'] = (data.forum_date) ? moment(data.forum_date).format('YYYY-MM-DD') : '';
                retObj['status'] = data.forum_status;
                retObj['user_status'] = data.user_status;
                retObj['created_by'] = (data.first_name) ? data.first_name + ' ' + data.last_name : 'Admin';
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
                            forum['description'] = result[0].description;
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

router.post('/getforumViewDataById', [check('forum_id', 'forum is required').notEmpty()], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let forum_id = req.body.forum_id;

        asyn.waterfall([
            function (done) {
                Forum.getforumViewDataById(forum_id, function (err, result) {
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
                            forum['description'] = result[0].description;
                            forum['heading'] = result[0].forumheading_name;
                            forum['category'] = result[0].category_name;
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


router.post('/getForumHeadingList', function (req, res) {
    loggerData(req);
    Forum.getForumHeadingList(function (err, results) {
        if (err) {
            return res.json({ 'status': 0, 'response': { 'data': [], 'msg': 'data not found' } });
        } else {

            let search = (req.body.search) ? req.body.search : '';            
            var forum_id = [];
            var forum_tag_id = [];
            var forumHeading = [];

            asyn.waterfall([
                function (done) {
                    if (req.body.search){
                        Forum.getTagSearchList(search, function (err, data) {
                            if (err) {
                                done(null, data)
                            } else {
                                data.forEach(function (d) {
                                    forum_id.push(d.forum_id);
                                    forum_tag_id.push(d.tag_id);
                                });
                                done(null, forum_id)
                            }
                        });
                    }else{
                        done(null, null)
                    }
                },
                function (forum_id, done1) {
                    if (results.length > 0) {
                        let temparray = new Promise(async (resolve, reject) => {                            
                            for (let heading of results) {
                                await Forum.getForumListByForumHeading(heading.forumheading_id, search, forum_id, function (err, data) {
                                    if (data && data.length > 0) {
                                        heading.forum = data;
                                        forumHeading.push(heading);
                                    }                                    
                                });
                            }
                            setTimeout(() => resolve(forumHeading), 50)
                        });
                        temparray.then(data => {
                            done1(null, data)                        
                        })
                    } else {
                        done1('Data Not Found', null)                        
                    }
                },
                function (forum, done2) {
                    if (forum.length > 0) {                        
                        let temparray = new Promise(async (resolve, reject) => {                           
                            for (let datas of forum) {
                                for (let dataf of datas.forum) {
                                    await Forum.getLastComment(dataf.forum_id, function (err, data) {
                                        if (data.length > 0) {
                                            var forumList = data.map(comment => {
                                                let retObj = {};
                                                retObj['created_at'] = helper.timeSince(comment.created_at)
                                                retObj['forum_comment_count'] = comment.forum_comment_count
                                                return retObj;
                                            });

                                            dataf.comment = forumList;
                                        }
                                    });
                                }
                            }
                            setTimeout(() => resolve(forum), 50)
                        });
                        temparray.then(data => {
                            done2(null, data)
                        })
                    } else {
                        done2(null, forum)
                    }
                }
            ],
            function (error, finalData) {
                if (error) {
                    return res.json({ 'status': 0, 'response': { 'msg': error } });
                } else {
                    return res.json({ 'status': 1, 'response': { 'data': finalData, 'forum_id': forum_tag_id, 'msg': 'data found' } });
                }
            });            
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
        var forum = [];
        var forum_id = [];
        var forum_tag_id = [];
        var forum_heading_id = req.body.forum_heading_id;

        let search = (req.body.search) ? req.body.search : '';

        asyn.waterfall([
            function (done) {
                if (req.body.search) {
                    Forum.getSubForumTagSearchList(forum_heading_id, search, function (err, data) {
                        if (err) {
                            done(null, data)
                        } else {                           
                            data.forEach(function (d) {
                                forum_id.push(d.forum_id);
                                forum_tag_id.push(d.tag_id);
                            });
                            done(null, forum_id)
                        }
                    });
                } else {
                    done(null, null)
                }
            },
            function (forum_id, done1) {                
                Forum.getSubForumListByForumHeading(forum_heading_id, search, forum_id, function (err, results) {
                    if (err) {
                        return res.json({ 'status': 0, 'response': { 'data': [], 'msg': 'data not found' } });
                    } else {
                        if (results.length > 0) {
                            forum.push(results)
                            let temparray = new Promise(async (resolve, reject) => {
                                for (let datas of results) {
                                    await Forum.getLastComment(datas.forum_id, function (err, data) {
                                        if (data.length > 0) {

                                            var forumList = data.map(comment => {
                                                let retObj = {};
                                                retObj['created_at'] = helper.timeSince(comment.created_at)
                                                retObj['forum_comment_count'] = comment.forum_comment_count
                                                return retObj;
                                            });

                                            datas.comment = forumList;
                                        }
                                    });
                                }
                                setTimeout(() => resolve(forum), 50)
                            });
                            temparray.then(data => {
                                done1(null, data)
                            })
                        } else {
                            done1(null, forum)
                        }
                    }
                });
            }
        ],
        function (error, finalData) {
            if (error) {
                return res.json({ 'status': 0, 'response': { 'msg': error } });
            } else {
                return res.json({ 'status': 1, 'response': { 'data': finalData[0], 'forum_id': forum_tag_id, 'msg': 'data found' } });
            }
        });        
    }
});

router.get('/getForumTagList', function (req, res) {
    loggerData(req);
    Forum.getForumTagList(function (err, results) {
        if (err){
            return res.json({ 'status': 0, 'response': [], 'msg': err });
        }else{
            var newarray = [...new Map(results.map(v => [v.tag_id, v])).values()]
            return res.json({ 'status': 1, 'response': { 'msg': 'Tag list successfully.', data: newarray }  });
        }        
    });
});

router.post('/getSubForumTagList', [
    check('forum_heading_id', 'Heading is required').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        var forum_heading_id = req.body.forum_heading_id;
        Forum.getSubForumTagList(forum_heading_id, function (err, results) {
            if (err) {
                return res.json({ 'status': 0, 'response': [], 'msg': err });
            } else {
                var newarray = [...new Map(results.map(v => [v.tag_id, v])).values()]
                return res.json({ 'status': 1, 'response': { 'msg': 'Tag list successfully.', data: newarray } });
            }
        });
    }
});

router.post('/addforumByuser', passport.authenticate('jwt', { session: false }), [
    check('topic', 'Topic is required').notEmpty(),
    check('heading', 'Heading is required').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let record = {
            topic: req.body.topic,
            heading: (req.body.heading) ? req.body.heading : '',
            description: (req.body.description) ? req.body.description : '',
            category: (req.body.category) ? req.body.category : '',
            created_at: moment().format('YYYY-MM-DD'),
            created_by: req.user.id
        };
        let tag = (req.body.tag) ? req.body.tag : [];
        Forum.addforumByuser(record, tag, function (err, data) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': error } });
            } else {
                return res.json({ 'status': 1, 'response': { 'msg': 'Forum added successfully.', data: data } });
            }
        });
    }
});


router.post('/approveRejectedRequest', [
    check('id', 'Please enter valid id').isEmail(),
    check('status', 'Please enter status').notEmpty(),
    check('comment', 'Please enter comment').notEmpty()
], (req, res) => {

    var forum_id = req.body.id;
    var status = req.body.status;
    var comment = req.body.comment;

    if (status == 1) {
        Forum.getforumRequestDataById(forum_id, function (err, result) {
            if (err) {
                return res.json({ status: 0, 'response': { msg: err } });
            } else {       
                var obj = {
                    id: forum_id,
                    user_status: status,
                    status: 1,
                    admin_comment: comment
                }
                
                Forum.updateComment(obj, function (err, updateresult) {
                    if (err) {
                        return res.json({ status: 0, 'msg': err, 'response': { msg: err } });
                    } else {
                        var logo;
                        var home_url;
                        var hostname = req.headers.host;
                        if (hostname == env.LIVE_HOST_USER_APP) {
                            home_url = env.APP_URL
                            logo = env.APP_URL + '/assets/img/brand_logo.png';
                        } else {
                            home_url = env.APP_URL
                            logo = env.APP_URL + '/assets/img/brand_logo.png';
                        }
                        var htmlUser = fs.readFileSync(__dirname + '/templates/forumRequest/approved_forum.html', 'utf8');
                        var dynamicHtml = {
                            logo: logo,
                            home_url: home_url,
                            comment: comment,
                            fullName: result[0].first_name + ' ' + result[0].last_name,
                        }
                        var view = { data: dynamicHtml };
                        var finalHtmlUser = mustache.render(htmlUser, view);

                        let transporter = nodemailer.createTransport(nodeMailerCredential); // node mailer credentials
                        let mailOptions = {
                            from: env.MAIL_FROM,
                            to: result[0].email,
                            subject: 'Your new forum topic has been approved.',
                            html: finalHtmlUser.replace(/&#x2F;/g, '/')
                        };

                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                console.log(error);
                            } else {
                            }
                        });
                        return res.json({ status: 1, 'msg': 'Forum approved successfully.', 'response': { data: status } });
                    }
                });

               
            }
        });
    } else {

        Forum.getforumRequestDataById(forum_id, function (err, result) {

            var obj = {
                id: forum_id,
                user_status: status,
                status: 0,
                admin_comment: comment
            }
            Forum.updateComment(obj, function (err, results) {
                if (err) {
                    return res.json({ status: 0, 'msg': err, 'response': { msg: err } });
                } else {

                    var logo;
                    var home_url;
                    var hostname = req.headers.host;
                    if (hostname == env.LIVE_HOST_USER_APP) {
                        home_url = env.APP_URL
                        logo = env.APP_URL + '/assets/img/brand_logo.png';
                    } else {
                        home_url = env.APP_URL
                        logo = env.APP_URL + '/assets/img/brand_logo.png';
                    }
                    var htmlUser = fs.readFileSync(__dirname + '/templates/forumRequest/reject_forum.html', 'utf8');
                    var dynamicHtml = {
                        logo: logo,
                        home_url: home_url,
                        fullName: result[0].first_name + ' ' + result[0].last_name,
                        comment: comment
                    }
                    var view = { data: dynamicHtml };
                    var finalHtmlUser = mustache.render(htmlUser, view);

                    let transporter = nodemailer.createTransport(nodeMailerCredential); // node mailer credentials
                    let mailOptions = {
                        from: env.MAIL_FROM,
                        to: result[0].email,
                        subject: 'Your new forum topic has been rejected.',
                        html: finalHtmlUser.replace(/&#x2F;/g, '/')
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log(error);
                        } else {
                        }
                    });

                    return res.json({ status: 1, 'msg': 'Forum rejected successfully.', 'response': { data: status } });
                }
            });
        });

    }
});

router.post('/getForumCommentList', [
    check('forum_id', 'Please enter valid id').notEmpty()
], (req, res) => {
    var forum_id = req.body.forum_id;
    Forum.getForumCommentList(forum_id, function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {            
            return res.json({ 'status': 1, 'response': { 'msg': 'Forum added successfully.', data: result } });
        }
    });
});


router.get('/forumRequestList', function (req, res) {
    loggerData(req);
    Forum.forumRequestList(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var forumList = result.map(data => {
                let retObj = {};
                retObj['forum_id'] = data.forum_id;
                retObj['topic'] = data.topic;
                retObj['total_view'] = data.total_view;
                retObj['created_on'] = (data.forum_date) ? moment(data.forum_date).format('YYYY-MM-DD') : '';
                retObj['status'] = data.forum_status;
                retObj['user_status'] = data.user_status;
                retObj['created_by'] = (data.first_name) ? data.first_name + ' ' + data.last_name : 'Admin';
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: forumList } });
        }
    });
});



module.exports = router;