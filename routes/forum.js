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
var Researches = require('../models/researches');
var User = require('../models/user');

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
    var status = req.query.status;
    Forum.getAllAdminforum(status, function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var forumList = result.map(data => {
                let retObj = {};
                retObj['forum_id'] = data.forum_id;
                retObj['question'] = data.topic;
                retObj['topic'] = data.forumheading_name;
                retObj['total_view'] = data.total_view;
                retObj['created_on'] = (data.forum_date) ? moment(data.forum_date).format('YYYY-MM-DD') : '';
                retObj['status'] = data.forum_status;
                retObj['user_status'] = data.user_status;
                retObj['retire'] = data.retire;
                retObj['created_by'] = (data.first_name) ? data.first_name + ' ' + data.last_name : 'Admin';
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: forumList } });
        }
    });
});


router.post('/forumCommentList', (req, res) => {
    asyn.waterfall([
        function (done) {
            var forum_id = req.body.forum_id;
            Forum.getAllForumComment(forum_id, function (err, data) {
                if (err) {
                    done(null, data)
                } else {
                    if (data.length > 0) {                        
                        let temparray = new Promise(async (resolve, reject) => {
                            for (let datas of data) {
                                await Forum.getCommentCount(datas.forum_comment_id, function (err, cntdata) {
                                    if (cntdata.length > 0) {
                                        datas.report = cntdata[0].cnt;
                                    }
                                });
                            }
                            setTimeout(() => resolve(data), 50)
                        });
                        temparray.then(finalresult => {                            
                            var forumCommentList = finalresult.map(data => {
                                let retObj = {};
                                retObj['forum_comment_id'] = data.forum_comment_id;
                                retObj['forum_id'] = data.forum_id;
                                retObj['comment'] = data.comment;
                                retObj['user_id'] = data.user_id;
                                retObj['no_of_reports'] = (data.report) ? data.report: 0;
                                retObj['user_name'] = (data.first_name) ? data.first_name : '' + " " + (data.last_name) ? data.last_name : '';
                                retObj['created_at'] = moment(data.created_at).format('YYYY-MM-DD');
                                return retObj;
                            });                            
                            done(null, forumCommentList)
                        })
                    } else {
                        done(null, [])
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


// router.post('/forumCommentList', function (req, res) {
//     loggerData(req);
//     var forum_id = req.body.forum_id;
//     Forum.getAllForumComment(forum_id,function (err, result) {
//         if (err) {
//             return res.json({ status: 0, 'response': { msg: err } });
//         } else {
//             var forumCommentList = result.map(data => {
//                 let retObj = {};                
//                 retObj['forum_comment_id'] = data.forum_comment_id;
//                 retObj['forum_id'] = data.forum_id;
//                 retObj['comment'] = data.comment;
//                 retObj['user_id'] = data.user_id;
//                 retObj['user_name'] = (data.first_name) ? data.first_name : '' + " " + (data.last_name) ? data.last_name:'';
//                 retObj['created_at'] = moment(data.created_at).format('YYYY-MM-DD');
//                 return retObj;
//             });
//             return res.json({ status: 1, 'response': { data: forumCommentList } });
//         }
//     });
// });



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
                return res.json({ 'status': 0, 'response': { 'msg': error } });
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
                    return res.json({ 'status': 0, 'response': { 'msg': error } });
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

router.post('/changeforumRetireStatus', [
    check('forum_id', 'forum id is required').notEmpty(),
    check('retire', 'Please enter retire').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let forum_id = req.body.forum_id;
        let record = {
            retire: req.body.retire
        }
        Forum.changeforumRetireStatus(record, forum_id, function (err, result) {
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
                description: req.body.description,
                heading: (req.body.heading) ? req.body.heading:'',                
                created_at: moment().format('YYYY-MM-DD'),
            };
            let tag = (req.body.tag) ? req.body.tag : [];
            Forum.addforumByadmin(record, tag, function (err, data) {
                if (err) {
                    return res.json({ 'status': 0, 'response': { 'msg': err } });
                } else {
                    return res.json({ 'status': 1, 'response': { 'msg': 'Forum added successfully.', data: data } });
                }
            });
        }
});

router.post('/updateforumByadmin', function (req, res) {
    var forum_id = req.body.forum_id;
    let update_value = [req.body.title, req.body.description, req.body.heading]
    let record = {
        topic: req.body.title,
        description: req.body.description,
        heading: (req.body.heading) ? req.body.heading : ''
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
                            setTimeout(() => resolve(forumHeading), 40)
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
            created_at: moment().format('YYYY-MM-DD'),
            created_by: req.user.id,
            read:0
        };
        let tag = (req.body.tag) ? req.body.tag : [];
        Forum.addforumByuser(record, tag, function (err, data) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
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
                    admin_comment: comment,
                    created_at: moment().format('YYYY-MM-DD')
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

router.post('/getForumCommentDetail', passport.authenticate('jwt', { session: false }), [
    check('forum_id', 'Please enter valid id').notEmpty()
], (req, res) => {
    var user_id = req.user.id;
    var forum_id = req.body.forum_id;
    var comment = {
        'started': '',
        'likes':0,
        'unlikes':0,
        'replies':0,        
        'follow': '',
        'user_like': 0,
        'user_dislike': 0,
        'retire':''
    }
    asyn.waterfall([
        function (done) {            
            Forum.getforumRequestDataById(forum_id, function (err, result) {
                if (err) {                    
                    done(err, null)
                } else {     
                    if (result.length > 0){
                        // if (result[0].forum_date) {
                        //     comment.started = helper.timeCountSince(result[0].forum_date);
                        // }
                        comment.started = moment(result[0].forum_date).format('MMMM Do, YYYY');
                        comment.forum_title = result[0].topic;
                        comment.retire = result[0].retire;
                        comment.forum_description = result[0].description;
                        done(null, comment)
                    }else{
                        done(null, comment)
                    }
                    
                }
            });
        },
        function (comment, done1) {
            Forum.getForumLikeUser(user_id, forum_id, function (err, result) {
                if (err) {
                    done1(err, null)
                } else {                   
                    if (result.length > 0){
                        comment.user_like = 1;
                        done1(null, comment)
                    }else{
                        done1(null, comment)
                    }
                }
            });
        },
        function (comment, done2) {
            Forum.getForumUnLikeUser(user_id, forum_id, function (err, result) {
                if (err) {
                    done2(err, null)
                } else {
                    if (result.length > 0) {
                        comment.user_dislike = 1;
                        done2(null, comment)
                    } else {
                        done2(null, comment)
                    }
                }
            });
        },
        function (comment, done3) {
            Forum.getForumLikeCount(forum_id, function (err, result) {
                if (err) {
                    done3(err, null)
                } else {
                    comment.likes = result[0].cnt;
                    done3(err, comment)
                }
            });
        },
        function (comment, done4) {
            Forum.getForumUnLikeCount(forum_id, function (err, result) {
                if (err) {
                    done4(err, null)
                } else {
                    comment.unlikes = result[0].cnt;
                    done4(err, comment)
                }
            });
        }, 
        function (comment, done5) {
            Forum.getForumReplyCount(forum_id, function (err, result) {
                if (err) {
                    done5(err, null)
                } else {
                    comment.replies = result[0].cnt;
                    done5(err, comment)
                }
            });
        },
        function (comment, done6) {
            Forum.getForumFollow(forum_id, user_id, function (err, result) {
                if (err) {
                    done6(err, null)
                } else {                    
                    if (result.length > 0){
                        comment.follow = 1;
                    }else{
                        comment.follow = 0;
                    }                    
                    done6(err, comment)
                }
            });
        }
    ],
    function (error, comment) {
        if (error) {
            return res.json({ 'status': 0, 'response': { 'msg': error } });
        } else {
            return res.json({ 'status': 1, 'response': { 'data': comment, 'msg': 'data found' } });
        }
    });
});

router.post('/getForumCommentList', passport.authenticate('jwt', { session: false }), [
    check('forum_id', 'Please enter valid id').notEmpty()
], (req, res) => {
    
    var forum_id = req.body.forum_id;
    var user_id = req.user.id;
    var imageLink;
    if (req.headers.host == env.ADMIN_LIVE_URL) {
        imageLink = env.ADMIN_LIVE_URL;
    } else {
        imageLink = env.ADMIN_LIVE_URL;
    }

    asyn.waterfall([        
        function (done) {
            var comment = []
            // Forum.getForumCommentList(forum_id, user_id, function (err, result) {
            //     if (err) {
            //         return res.json({ status: 0, 'response': { msg: err } });
            //     } else {
            //         if (result.length > 0){
            //             let temparray = new Promise(async (resolve, reject) => {
            //                 for (let comments of result) {
            //                     await Forum.getForumReplyComment(comments.forum_comment_id, function (err, data) {                                    
            //                         if (data && data.reply_list.length > 0) {
            //                             comments.reply = data.reply_list;
            //                         }                                   
            //                         comments.comment_count = data.comment_count[0].cnt;
            //                         comment.push(comments);
            //                     });
            //                 }
            //                 setTimeout(() => resolve(comment), 50)
            //             });
            //             temparray.then(result => {
            //                 var commentList = result.map(data => {
            //                     let retObj = {};
            //                     retObj['comment'] = data.comment;
            //                     retObj['comment_date'] = data.comment_date;
            //                     retObj['first_name'] = data.first_name;
            //                     retObj['forum_comment_id'] = data.forum_comment_id;
            //                     retObj['last_name'] = data.last_name;
            //                     //retObj['created_on'] = helper.timeSince(data.comment_date); 
            //                     retObj['created_on'] = moment(data.comment_date).format('MMMM Do, YYYY');
            //                     retObj['parent_comment_id'] = data.parent_comment_id;
            //                     retObj['comment_like_id'] = data.comment_like_id;                                
            //                     retObj['reply'] = data.reply;
            //                     retObj['comment_count'] = data.comment_count;                                
            //                     retObj['role'] = data.role;
            //                     return retObj;
            //                 });
            //                 done(null, commentList);
            //             })
            //         }else{
            //             done(null, []);
            //         }
            //     }
            // }); 


            Forum.getForumCommentList(forum_id, user_id, function (err, result) {
                if (err) {
                    return res.json({ status: 0, 'response': { msg: err } });
                } else {                    
                    if (result.length > 0) {
                        var response = [];
                        var final_response = [];
                        Promise.all(result.map(function (item) {
                            var temparray = new Promise(function (resolve, reject) {
                                Forum.getForumReplyComment(item.forum_comment_id, imageLink, user_id, function (err, data) {                                    
                                    if (data && data.reply_list.length > 0) {     
                                        item.reply = data.reply_list;
                                    }
                                    // item.like_comment_count = data.like_comment_count[0].cnt;
                                    // item.unlike_comment_count = data.unlike_comment_count[0].cnt;
                                    setTimeout(() => resolve(item), 50)
                                });
                              
                            });
                            return temparray.then(result => {
                                response.push(result);                                
                                var commentList = response.map(data => {   
                                    
                                    let retObj = {};
                                    retObj['user_id'] = data.u_id;
                                    retObj['comment'] = data.comment;
                                    retObj['comment_date'] = data.comment_date;
                                    retObj['first_name'] = data.first_name;
                                    retObj['forum_comment_id'] = data.forum_comment_id;
                                    retObj['forum_report_id'] = data.forum_report_id;
                                    retObj['last_name'] = data.last_name;
                                    //retObj['created_on'] = helper.timeSince(data.comment_date); 
                                    retObj['created_on'] = moment(data.comment_date).format('MMMM Do, YYYY');
                                    retObj['parent_comment_id'] = data.parent_comment_id;
                                    // retObj['comment_like_id'] = (data.action_type == 'like') ? data.comment_like_id :'';
                                    // retObj['comment_dislike_id'] = (data.action_type == 'unlike') ? data.comment_like_id : '';
                                    retObj['reply'] = (data.reply && data.reply.length > 0) ? data.reply: [];
                                    // retObj['like_comment_count'] = data.like_comment_count;
                                    // retObj['unlike_comment_count'] = data.unlike_comment_count;
                                    retObj['role'] = data.role;
                                    retObj['avatar'] = (data.user_image) ? imageLink + env.USER_VIEW_PATH_THUMB + data.user_image : '';
                                    return retObj;
                                }).sort(function (a, b) {                                                                                                         
                                    return a.forum_comment_id - b.forum_comment_id;
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



            // Forum.getForumCommentList(forum_id, user_id, function (err, rows) {
            //     var response = [];
            //     //doing something with rows
            //     Promise.all(rows.map(function (item) {
            //         var promise = new Promise(function (resolve, reject) {
            //             connection.query(queryItem, function (err, rows) {
            //                 //doing something
            //                 result = rows[0].field;
            //                 //and want to push it to an array
            //                 resolve(result);
            //             });
            //         });
            //         return promise.then(function (result) {
            //             console.log(result); //ok
            //             response.push(result) //ok
            //         });
            //     }).then(function () {
            //         console.log(response); //not empty
            //     })
            // })
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


router.get('/forumRequestList', function (req, res) {
    loggerData(req);
    Forum.forumRequestList(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var forumList = result.map(data => {
                let retObj = {};
                retObj['forum_id'] = data.forum_id;                
                retObj['question'] = data.topic;
                retObj['description'] = data.description;
                retObj['topic'] = data.forumheading_name;                
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


router.post('/followUser', passport.authenticate('jwt', { session: false }), [
    check('forum_id', 'Forum is required').notEmpty()
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        var obj = {
            user_id: req.user.id,
            forum_id: req.body.forum_id
        }
        Forum.followUser(obj, function (err, result) {
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


router.post('/getMyForumList', passport.authenticate('jwt', { session: false }),(req, res) => {
   
        var forum = [];
        var forum_id = [];
        var forum_tag_id = [];
        var user_id = req.user.id;
        let search = (req.body.search) ? req.body.search : '';
        asyn.waterfall([
            function (done) {
                if (req.body.search) {
                    Forum.getSubForumTagSearchList(user_id,search, function (err, data) {
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
                Forum.getMyForumList(user_id, search, forum_id, function (err, results) {
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
                return res.json({ 'status': 0, 'response': { 'data': [], 'msg': error } });
            } else {
                return res.json({ 'status': 1, 'response': { 'data': finalData[0], 'forum_id': forum_tag_id, 'msg': 'data found' } });
            }
        });    
});

router.post('/unfollowUser', passport.authenticate('jwt', { session: false }), [
    check('forum_id', 'Forum is required').notEmpty()
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        var obj = {
            user_id: req.user.id,
            forum_id: req.body.forum_id
        }
        Forum.unfollowUser(obj, function (err, result) {
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

router.post('/addComment', passport.authenticate('jwt', { session: false }), [
    check('forum_id', 'Forum is required').notEmpty()
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {

        var imageLink;
        if (req.headers.host == env.ADMIN_LIVE_URL) {
            imageLink = env.ADMIN_LIVE_URL;
        } else {
            imageLink = env.ADMIN_LIVE_URL;
        }
        
        var userDetail = req.user;
        var obj = {
            user_id: req.user.id,
            forum_id: req.body.forum_id,
            comment: req.body.comment,
            parent_comment_id: (req.body.parent_comment_id) ? req.body.parent_comment_id: '',
            created_at: moment().format('YYYY-MM-DD')
        }
        Forum.addComment(obj, function (err, result) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                if (result) {

                    if (req.body.subcomment && req.body.subcomment == 'subcomment'){
                        
                        Forum.getForumSubReplyComment(obj.parent_comment_id, imageLink, function (err, mainresult) {
                            return res.json({ 'status': 1, 'response': { 'data': mainresult, 'msg': 'Data found' } });
                        });

                        // var user_obj = {
                        //     comment: obj.comment,
                        //     created_at: obj.created_at,
                        //     first_name: userDetail.first_name,
                        //     last_name: userDetail.last_name,
                        //     role: userDetail.role,
                        //     reply_comment_id: result[0].forum_comment_id
                        // }
                        // return res.json({ 'status': 1, 'response': { 'data': user_obj, 'msg': 'Data found' } });

                    }else{

                        if (req.body.parent_comment_id) {
                            Forum.getForumReplyComment(obj.parent_comment_id, imageLink, userDetail.id, function (err, data) {
                                return res.json({ 'status': 1, 'response': { 'data': data.reply_list, 'msg': 'Data found' } });
                            });
                        } else {
                            
                            User.getUserById(userDetail.id, function (err, userdata) {
                                var user_obj = {
                                    user_id: userDetail.id,
                                    comment: obj.comment,
                                    like_comment_count: "0",
                                    comment_like_id: null,
                                    created_on: moment(result[0].created_at).format('MMMM Do, YYYY'),
                                    first_name: userDetail.first_name,
                                    last_name: userDetail.last_name,
                                    role: userDetail.role,
                                    forum_comment_id: result[0].forum_comment_id,
                                    parent_comment_id: null,
                                    reply: [],
                                    unlike_comment_count: "0",
                                    avatar: (userdata[0].user_image) ? imageLink + env.USER_VIEW_PATH_THUMB + userdata[0].user_image : ''
                                }
                                return res.json({ 'status': 1, 'response': { 'data': user_obj, 'msg': 'Data found' } });
                            });
                        }
                    }
                } else {
                    return res.json({ 'status': 0, 'response': { 'data': [], 'msg': 'Data not found' } });
                }
            }
        });
    }
});

router.post('/updateComment', [
    check('forum_comment_id', 'forum comment id is required').notEmpty()
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {           
        var obj = {
            forum_comment_id: req.body.forum_comment_id,
            comment: req.body.comment
        }
        Forum.updateComment(obj, function (err, result) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                return res.json({ 'status': 1, 'response': { 'data': result, 'msg': 'Comment updated successfully.' } });
            }
        });
    }
});

router.post('/deleteComment', [
    check('forum_comment_id', 'forum comment id is required').notEmpty()
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {        
        Forum.deleteComment(req.body.forum_comment_id, function (err, result) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                return res.json({ 'status': 1, 'response': { 'data': result, 'msg': 'Comment deleted successfully.' } });
            }
        });
    }
});



router.post('/forumLike', passport.authenticate('jwt', { session: false }), [
    check('forumid', 'Forum is required').notEmpty()
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        var obj = {
            user_id: req.user.id,
            forum_id: req.body.forumid,
            action_type: req.body.action_type,
        }
        Forum.forumLike(obj, function (err, result) {
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


router.post('/forumCommentLike', passport.authenticate('jwt', { session: false }), [
    check('comment_id', 'Forum is required').notEmpty()
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        var obj = {
            user_id: req.user.id,
            comment_id: req.body.comment_id,
            action_type: req.body.action_type,
        }
        Forum.forumCommentLike(obj, function (err, result) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {    
                if (result.length > 0) {
                    return res.json({ 'status': 1, 'response': { 'data': 'like', 'msg': 'Data found' } });
                } else {
                    return res.json({ 'status': 1, 'response': { 'data': 'unlike', 'msg': 'Data not found' } });
                }
            }
        });
    }
});


router.get('/getforumContent', function (req, res) {
    Forum.getforumContent(function (err, result) {
        if (err) {
            return res.json({ 'status': 0, 'response': { 'data': {}, 'msg': err} });
        } else {
            return res.json({ 'status': 1, 'response': { 'data': result, 'msg': 'Data found' } });
        }
    });
});

router.post('/updateForumContent', function (req, res) {
    var obj = {
        description: req.body.description
    }
    Forum.updateForumContent(obj, function (err, data) {
        if (err) {
            return res.json({ 'status': 0, 'response': { 'msg': err } });
        } else {
            return res.json({ 'status': 1, 'response': { 'msg': 'Forum content updated successfully.', data: data } });
        }
    });
});


router.post('/deleteMultipleForum', [
    check('forum', 'forum is required').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        loggerData(req);
        let forum = req.body.forum;        
        Forum.deleteMultipleForum(forum, function (err, result) {
            if (err) {
                return res.json({ status: 0, 'response': { msg: err } });
            } else {
                return res.json({ status: 1, 'response': { msg: 'Thread deleted successfully', data: result } });
            }
        });
    }
});

router.get('/getForumNotificationCount', function (req, res) {
    loggerData(req);    
    Forum.getForumNotificationCount(function (err, Count) {
        if (err) {
            return res.json({ 'status': 0, 'response': { 'msg': err } });
        } else {
            return res.json({ 'status': 1, 'response': { 'data': Count, 'msg': 'data found' } });
            
        }
    });
  
});

router.get('/updateForumRequestCount', function (req, res) {
    loggerData(req);
    Forum.updateForumRequestCount(function (err, count) {
        if (err) {
            return res.json({ 'status': 0, 'response': { 'msg': err } });
        } else {
            return res.json({ 'status': 1, 'response': { 'msg': 'updated successfully' } });
        }
    });
});


router.post('/forumReport', passport.authenticate('jwt', { session: false }), [
    check('forum_comment_id', 'forum comment id is required').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        loggerData(req);
        let forum_comment_id = req.body.forum_comment_id;
        let user_id = req.user.id;
        Forum.forumReport(forum_comment_id, user_id, function (err, result) {
            if (err) {
                return res.json({ status: 0, 'response': { msg: err } });
            } else {
                if (result.length > 0){
                    return res.json({ status: 1, 'response': { msg: 'Reported successfully', data: result } });
                }else{
                    return res.json({ status: 1, 'response': { msg: 'Unreport successfully', data: result } });
                }
            }
        });
    }
});

module.exports = router;