"use strict";

var express = require('express');
var { check, validationResult } = require("express-validator");

var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var env = require('../config/env');
var Researches = require('../models/researches');
var Common = require('../models/common');
var path = require('path');
var fs = require('fs');
var asyn = require('async');
var helper = require('../config/helper');
var moment = require('moment');
var formidable = require('formidable');
const gm = require('gm');
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
// researches list
//passport.authenticate('jwt', { session: false }), 
router.get('/researchesList', function (req, res) {
    loggerData(req);
    Researches.getAllAdminResearches(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var researchList = result.map(data => {
                let retObj = {};
                retObj['researches_id'] = data.researches_id;
                retObj['topic'] = data.topic;
                retObj['created_by'] = data.created_by;
                retObj['start_date'] = moment(data.start_date).format('YYYY-MM-DD');                
                retObj['status'] = data.status;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: researchList } });
        }
    });
});

router.post('/changeResearchesStatus', [
    check('researches_id', 'Researches id is required').notEmpty(),
    check('status', 'Please enter status').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let researches_id = req.body.researches_id;
        let record = {
            status: req.body.status
        }
        Researches.changeResearchesStatus(record, researches_id, function (err, result) {
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

router.get('/getResearchesDataById', (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        asyn.waterfall([
            function (done) {
                Researches.getResearchesContentDataById(function (err, result) {
                    if (err) {
                        done({ 'status': 0, 'response': { 'msg': 'Something went wrong.' } });
                    } else {
                        var imageLink;
                        if (req.headers.host == env.ADMIN_LIVE_URL) {
                            imageLink = env.ADMIN_LIVE_URL;
                        } else {
                            imageLink = env.ADMIN_LIVE_URL;
                        }
                        let researches = {};
                        researches['sub_title'] = result[0].sub_title;
                        researches['main_title'] = result[0].main_title;
                        researches['description'] = result[0].description;                        
                        researches['image'] = (result[0].image) ? imageLink + env.RESEARCHES_VIEW_PATH + result[0].image : '';                        
                        researches['future_participate_text'] = result[0].future_participate_text;
                        researches['participate_text'] = result[0].participate_text;
                        done(err, researches)
                    }
                });
            }
        ],
            function (error, researches) {
                if (error) {
                    return res.json({ 'status': 0, 'response': { 'msg': err } });
                } else {
                    return res.json({ 'status': 1, 'response': { 'data': researches, 'msg': 'data found' } });
                }
            });

    }
});

router.post('/updateResearchesByadmin', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) return res.json({ status: 1, 'response': { msg: err } });
        var validationErrors = false;
        if (validationErrors == false) {
            var json = fields.data;
            let obj = JSON.parse(json);            

            let update_value = [obj.main_title, obj.sub_title, obj.description, obj.participate_text, obj.future_participate_text,  moment().format('YYYY-MM-DD')]

            let record = {
                main_title: obj.main_title,
                sub_title: obj.sub_title,
                description: obj.description,
                participate_text: obj.participate_text,
                future_participate_text: obj.future_participate_text,
                created_at: moment().format('YYYY-MM-DD')
            };
            let researches_content_id = 1;
            asyn.waterfall([
                function (done) {
                    let overview = {};
                    if (typeof files.image !== 'undefined') {
                        let file_ext = files.image.name.split('.').pop();
                        let filename = Date.now() + '-' + files.image.name.split(" ").join("");
                        let tmp_path = files.image.path;
                        if (file_ext == 'png' || file_ext == 'PNG' || file_ext == 'jpg' || file_ext == 'JPG' || file_ext == 'jpeg' || file_ext == 'JPEG') {
                            fs.rename(tmp_path, path.join(__dirname, env.RESEARCHES_PATH + filename), function (err) {
                                overview['image'] = filename;
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
                    Researches.updateResearchesByadmin(record, researches_content_id, update_value, function (err, data) {
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
                    return res.json({ 'status': 1, 'response': { 'msg': 'Researches updated successfully.', data: userList } });
                }
            });
        }
    });
});

router.get('/getFutureParticipateResearchesList', function (req, res) {
    loggerData(req);
    Researches.getFutureParticipateResearchesList(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var researchList = result.map(data => {
                let retObj = {};
                retObj['researches_id'] = data.researches_id;
                retObj['topic'] = data.topic;
                retObj['description'] = data.description;                
                retObj['user_name'] = data.first_name + ' ' + data.last_name;
                retObj['user_role'] = data.role;
                retObj['start_date'] = moment(data.start_date).format('YYYY-MM-DD');
                retObj['status'] = data.status;
                retObj['name'] = data.name;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: researchList } });
        }
    });
});

router.post('/addParticipate', [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Email is required').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let record = {
            name: req.body.name,
            email: req.body.email,
            dob: (req.body.dob) ? moment(req.body.dob).format('YYYY-MM-DD') : '',
            created_at: moment().format('YYYY-MM-DD'),
            researches_id: req.body.researches_id
        };        
        Researches.addParticipate(record, function (err, data) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                return res.json({ 'status': 1, 'response': { 'msg': 'Your detail have been saved successfully.', data: data } });
            }
        });
    }
});

router.post('/participateList', [
    check('researches_id', 'Researches_id is required').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else { 
        loggerData(req);
        var researches_id = req.body.researches_id; 
        Researches.participateList(researches_id, function (err, result) {
            if (err) {
                return res.json({ status: 0, 'response': { msg: err } });
            } else {
                var participateList = result.map(data => {
                    let retObj = {};
                    retObj['researches_id'] = data.researches_id;
                    retObj['name'] = data.name;
                    retObj['email'] = data.email;
                    retObj['dob'] = moment(data.dob).format('YYYY-MM-DD');
                    retObj['created_at'] = moment(data.created_at).format('YYYY-MM-DD');
                    return retObj;
                });
                return res.json({ status: 1, 'response': { data: participateList } });
            }
        });
    }    
});

router.post('/csvParticipateList', [
    check('researches_id', 'Researches_id is required').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        loggerData(req);
        var researches_id = req.body.researches_id;
        Researches.participateList(researches_id, function (err, result) {
            if (err) {
                return res.json({ status: 0, 'response': { msg: err } });
            } else {
                var participateList = result.map(data => {
                    let retObj = {};
                    retObj['Name'] = data.name;
                    retObj['Email'] = data.email;
                    retObj['DOB'] = moment(data.dob).format('YYYY-MM-DD');
                    return retObj;
                });
                return res.json({ status: 1, 'response': { data: participateList } });
            }
        });
    }
});

router.get('/getMyResearchesList', passport.authenticate('jwt', { session: false }),  function (req, res) {
    loggerData(req);
    var user_id = req.user.id;
    Researches.getMyResearchesList(user_id, function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var researchList = result.map(data => {
                let retObj = {};
                retObj['researches_id'] = data.researches_id;
                retObj['topic'] = data.topic;
                retObj['description'] = data.description;
                retObj['start_date'] = moment(data.start_date).format('YYYY-MM-DD');
                retObj['created_at'] = moment(data.created_at).format('YYYY-MM-DD');
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: researchList } });
        }
    });    
});


router.post('/addResearchByuser', passport.authenticate('jwt', { session: false }), [
    check('topic', 'Topic is required').notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        var user_id = req.user.id;
        let record = {
            topic: req.body.topic,
            description: req.body.description,
            start_date: moment().format('YYYY-MM-DD'),
            created_at: moment().format('YYYY-MM-DD'),
            created_by: user_id,
            status:0
        };
        Researches.addResearchByuser(record, function (err, data) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                return res.json({ 'status': 1, 'response': { 'msg': "Your request for the research has been successfully sent to Admin.", data: data } });
            }
        });
    }
});

router.get('/researchRequestList', function (req, res) {
    loggerData(req);
    Researches.researchRequestList(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var forumList = result.map(data => {
                let retObj = {};
                retObj['researches_id'] = data.researches_id;
                retObj['topic'] = data.topic;
                retObj['description'] = data.description;                
                retObj['start_date'] = (data.start_date) ? moment(data.start_date).format('YYYY-MM-DD') : '';                
                retObj['created_on'] = (data.c_at) ? moment(data.c_at).format('YYYY-MM-DD') : '';
                retObj['status'] = data.researches_status;                
                retObj['comment'] = data.comment;
                retObj['user_status'] = data.user_status;
                retObj['created_by'] = (data.first_name) ? data.first_name + ' ' + data.last_name : 'Admin';
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: forumList } });
        }
    });
});

router.post('/approveRejectedRequest', [
    check('id', 'Please enter valid id').isEmail(),
    check('status', 'Please enter status').notEmpty(),
    check('comment', 'Please enter comment').notEmpty()
], (req, res) => {

    var researches_id = req.body.id;
    var status = req.body.status;
    var comment = req.body.comment;

    if (status == 1) {
        Researches.getResearchesDataById(researches_id, function (err, result) {
            if (err) {
                return res.json({ status: 0, 'response': { msg: err } });
            } else {                
                var obj = {
                    id: researches_id,
                    user_status: status,
                    status: 1,
                    admin_comment: comment
                }

                Researches.updateComment(obj, function (err, updateresult) {
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
                        var htmlUser = fs.readFileSync(__dirname + '/templates/researchRequest/approved_research.html', 'utf8');
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
                            subject: 'Your new research topic has been approved.',
                            html: finalHtmlUser.replace(/&#x2F;/g, '/')
                        };

                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                             //   console.log(error);
                            } else {
                            }
                        });
                        return res.json({ status: 1, 'msg': 'Research approved successfully.', 'response': { data: status } });
                    }
                });


            }
        });
    } else {

        Researches.getResearchesDataById(researches_id, function (err, result) {

            var obj = {
                id: researches_id,
                user_status: status,
                status: 0,
                admin_comment: comment
            }
            Researches.updateComment(obj, function (err, results) {
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
                    var htmlUser = fs.readFileSync(__dirname + '/templates/researchRequest/reject_research.html', 'utf8');
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
                        subject: 'Your new research topic has been rejected.',
                        html: finalHtmlUser.replace(/&#x2F;/g, '/')
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log(error);
                        } else {
                        }
                    });

                    return res.json({ status: 1, 'msg': 'Research rejected successfully.', 'response': { data: status } });
                }
            });
        });

    }
});

router.post('/changeResearchesStatus', [
    check('researches_id', 'Researches id is required').notEmpty(),
    check('status', 'Please enter status').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let researches_id = req.body.researches_id;
        let record = {
            status: req.body.status
        }
        Researches.changeResearchesStatus(record, researches_id, function (err, result) {
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

router.post('/addFutureResearchByuser', [
    check('name', 'Name is required').notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let record = {
            name: req.body.name,
            dob: req.body.dob,            
            child: req.body.child,
            created_at: moment().format('YYYY-MM-DD')
        };
        Researches.addFutureResearchByuser(record, function (err, data) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                return res.json({ 'status': 1, 'response': { 'msg': "Your future request has been successfully sent to Admin.", data: data } });
            }
        });
    }
});

module.exports = router;