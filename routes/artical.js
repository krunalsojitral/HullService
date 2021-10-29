"use strict";

var express = require('express');
var { check, validationResult } = require("express-validator");

var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var env = require('../config/env');
var Artical = require('../models/artical');
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


// artical list
//passport.authenticate('jwt', { session: false }), 
router.get('/articalList', function (req, res) {
    loggerData(req);
    Artical.getAllAdminArtical(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var articalList = result.map(data => {
                let retObj = {};
                retObj['artical_id'] = data.artical_id;
                retObj['title'] = data.title;
                retObj['description'] = data.description;
                retObj['created_at'] = moment(data.created_at).format('YYYY-MM-DD');
                retObj['role'] = data.role;
                retObj['status'] = data.status;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: articalList } });
        }
    });
});

//get artical data - adminside
router.post('/getarticalDataById', [check('artical_id', 'artical is required').notEmpty()], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let artical_id = req.body.artical_id;
        Artical.getarticalDataById(artical_id, function (err, result) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                var imageLink;
                if (req.headers.host == env.ADMIN_LIVE_URL) {
                    imageLink = env.ADMIN_LIVE_URL;
                } else {
                    imageLink = env.ADMIN_LIVE_URL;
                }
                let artical = {};
                artical['artical_id'] = result[0].artical_id;
                artical['title'] = result[0].title;
                artical['description'] = result[0].description;
                artical['created_at'] = result[0].created_at;
                artical['purchase_type'] = result[0].purchase_type;
                artical['image'] = (result[0].image) ? imageLink + env.ARTICAL_VIEW_PATH + result[0].image : '';
                artical['role'] = result[0].role;
                artical['status'] = result[0].status;
                return res.json({ 'status': 1, 'response': { 'data': artical, 'msg': 'data found' } });
            }
        });
    }
});


router.post('/changearticalStatus', [
    check('artical_id', 'artical id is required').notEmpty(),
    check('status', 'Please enter status').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let artical_id = req.body.artical_id;
        let record = {
            status: req.body.status
        }
        Artical.changearticalStatus(record, artical_id, function (err, result) {
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

router.post('/addarticalByadmin', function (req, res) {
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
                created_at: moment().format('YYYY-MM-DD'),
                role: obj.user_role,
                purchase_type: obj.purchase_type
            };
            asyn.waterfall([
                function (done) {
                    let overview = {};
                    if (typeof files.image !== 'undefined') {
                        let file_ext = files.image.name.split('.').pop();
                        let ProfileImage = Date.now() + '-' + files.image.name.split(" ").join("");
                        let tmp_path = files.image.path;
                        if (file_ext == 'png' || file_ext == 'PNG' || file_ext == 'jpg' || file_ext == 'JPG' || file_ext == 'jpeg' || file_ext == 'JPEG') {
                            fs.rename(tmp_path, path.join(__dirname, env.ARTICAL_PATH + ProfileImage), function (err) {
                                overview['image'] = ProfileImage;
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
                    Artical.addarticalByadmin(record, function (err, data) {
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
                    return res.json({ 'status': 1, 'response': { 'msg': 'Profile successfully updated', data: userList } });
                }
            });
        }
    });
});

router.post('/updatearticalByadmin', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) return res.json({ status: 1, 'response': { msg: err } });
        var validationErrors = false;
        if (validationErrors == false) {

            var json = fields.data;
            let obj = JSON.parse(json);
            let update_value = [obj.title, obj.description, moment().format('YYYY-MM-DD'), obj.user_role, obj.purchase_type]
            let record = {
                title: obj.title,
                description: obj.description,
                created_at: moment().format('YYYY-MM-DD'),
                role: obj.user_role,
                purchase_type: obj.purchase_type
            };
            let artical_id = obj.artical_id;
            asyn.waterfall([
                function (done) {
                    let overview = {};
                    
                    if (typeof files.image !== 'undefined') {
                        let file_ext = files.image.name.split('.').pop();
                        let ProfileImage = Date.now() + '-' + files.image.name.split(" ").join("");
                        let tmp_path = files.image.path;
                        if (file_ext == 'png' || file_ext == 'PNG' || file_ext == 'jpg' || file_ext == 'JPG' || file_ext == 'jpeg' || file_ext == 'JPEG') {
                            
                            fs.rename(tmp_path, path.join(__dirname, env.ARTICAL_PATH + ProfileImage), function (err) {
                                overview['image'] = ProfileImage;
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
                    Artical.updatearticalByadmin(record, artical_id, update_value, function (err, data) {
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
                    return res.json({ 'status': 1, 'response': { 'msg': 'Profile successfully updated', data: userList } });
                }
            });
        }
    });
});

module.exports = router;