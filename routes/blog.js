"use strict";

var express = require('express');
var { check, validationResult } = require("express-validator");

var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var env = require('../config/env');
var Blog = require('../models/blog');
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


// blog list
//passport.authenticate('jwt', { session: false }), 
router.get('/blogList', function (req, res) {
    loggerData(req);
    Blog.getAllAdminBlog(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var blogList = result.map(data => {
                let retObj = {};
                retObj['blog_id'] = data.blog_id;
                retObj['title'] = data.title;
                retObj['description'] = data.description;
                retObj['created_at'] = moment(data.created_at).format('YYYY-MM-DD');
                retObj['role'] = data.role;
                retObj['status'] = data.status;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: blogList } });
        }
    });
});

//get blog data - adminside
router.post('/getBlogDataById', [check('blog_id', 'Blog is required').notEmpty()], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let blog_id = req.body.blog_id;
        Blog.getBlogDataById(blog_id, function (err, result) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                var imageLink;
                if (req.headers.host == env.ADMIN_LIVE_URL) {
                    imageLink = env.ADMIN_LIVE_URL;
                } else {
                    imageLink = env.ADMIN_LIVE_URL;
                }
                let blog = {};
                blog['blog_id'] = result[0].blog_id;
                blog['title'] = result[0].title;
                blog['description'] = result[0].description;
                blog['created_at'] = result[0].created_at;
                blog['purchase_type'] = result[0].purchase_type;
                blog['image'] = (result[0].image) ? imageLink + env.BLOG_VIEW_PATH + result[0].image : '';
                blog['role'] = result[0].role;
                blog['status'] = result[0].status;
                return res.json({ 'status': 1, 'response': { 'data': blog, 'msg': 'data found' } });
            }
        });
    }
});


router.post('/changeBlogStatus', [
    check('blog_id', 'Blog id is required').notEmpty(),
    check('status', 'Please enter status').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let blog_id = req.body.blog_id;
        let record = {
            status: req.body.status
        }
        Blog.changeBlogStatus(record, blog_id, function (err, result) {
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

router.post('/addBlogByadmin', function (req, res) {
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
                    console.log(files.image);
                    if (typeof files.image !== 'undefined') {
                        let file_ext = files.image.name.split('.').pop();
                        let ProfileImage = Date.now() + '-' + files.image.name.split(" ").join("");
                        let tmp_path = files.image.path;
                        if (file_ext == 'png' || file_ext == 'PNG' || file_ext == 'jpg' || file_ext == 'JPG' || file_ext == 'jpeg' || file_ext == 'JPEG') {
                            console.log(__dirname, env.BLOG_PATH + ProfileImage);
                            fs.rename(tmp_path, path.join(__dirname, env.BLOG_PATH + ProfileImage), function (err) {
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
                    console.log(record);
                    Blog.addBlogByadmin(record, function (err, data) {
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

router.post('/updateBlogByadmin', function (req, res) {
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
            let blog_id = obj.blog_id;
            asyn.waterfall([
                function (done) {
                    let overview = {};
                    
                    if (typeof files.image !== 'undefined') {
                        let file_ext = files.image.name.split('.').pop();
                        let ProfileImage = Date.now() + '-' + files.image.name.split(" ").join("");
                        let tmp_path = files.image.path;
                        if (file_ext == 'png' || file_ext == 'PNG' || file_ext == 'jpg' || file_ext == 'JPG' || file_ext == 'jpeg' || file_ext == 'JPEG') {
                            
                            fs.rename(tmp_path, path.join(__dirname, env.BLOG_PATH + ProfileImage), function (err) {
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
                    Blog.updateBlogByadmin(record, blog_id, update_value, function (err, data) {
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