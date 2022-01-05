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
                Researches.getResearchesDataById(function (err, result) {
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
                        researches['created_at'] = moment(result[0].created_at).format('MMMM DD, YYYY');
                        researches['image'] = (result[0].image) ? imageLink + env.RESEARCHES_VIEW_PATH + result[0].image : '';
                        researches['status'] = result[0].status;                        
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

            let update_value = [obj.main_title, obj.sub_title, obj.description, moment().format('YYYY-MM-DD')]

            let record = {
                main_title: obj.main_title,
                sub_title: obj.sub_title,
                description: obj.description,
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
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: researchList } });
        }
    });
});


module.exports = router;