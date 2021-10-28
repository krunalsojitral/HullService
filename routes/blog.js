"use strict";

var express = require('express');
var { check, validationResult } = require("express-validator");

var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var env = require('../config/env');
var Blog = require('../models/blog');

var fs = require('fs');
var asyn = require('async');
var helper = require('../config/helper');
var moment = require('moment');



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
                if (result != '') {
                    let blog = {};
                    blog['blog_id'] = result[0].blog_id;
                    blog['title'] = result[0].title;
                    blog['description'] = result[0].description;
                    blog['created_at'] = result[0].created_at;
                    blog['role'] = result[0].role;
                    blog['status'] = result[0].status;
                    return res.json({ 'status': 1, 'response': { 'data': blog, 'msg': 'data found' } });
                } else {
                    return res.json({ 'status': 1, 'response': { 'data': blog, 'msg': 'data found' } });
                }
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

router.post('/addBlogByadmin', [
    check('title', 'Please enter title').notEmpty(),
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let record = {
            title: req.body.title,
            description: req.body.description,
            created_at: moment().format('YYYY-MM-DD'),
            role: req.body.user_role,
            purchase_type: req.body.purchase_type
        };
        Blog.addBlogByadmin(record, function (err, result) {
            if (err) {
                return res.json({ status: 0, 'response': { msg: err } });
            } else {
                return res.json({ status: 1, 'response': { msg: 'Successfully added record.' } });
            }
        });
    }
});

router.post('/updateBlogByadmin', passport.authenticate('jwt', { session: false }), [
    check('title', 'Please enter title').notEmpty(),
    check('blog_id', 'Please enter blog id').notEmpty(),
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let blog_id = req.body.blog_id;
        let record = {
            title: req.body.title,
            description: req.body.description,
            created_at: moment().format('YYYY-MM-DD'),
            role: req.body.role,
            purchase_type: req.body.purchase_type
        };
        Blog.updateBlogByadmin(record, blog_id, function (err, result) {
            if (err) {
                return res.json({ status: 0, 'response': { msg: err } });
            } else {
                return res.json({ status: 1, 'response': { msg: 'Successfully added record.' } });
            }
        });
    }
});











module.exports = router;

