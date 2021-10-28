"use strict";

var express = require('express');
var { check, validationResult } = require("express-validator");

var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var env = require('../config/env');
var Blog = require('../models/blog');
var User = require('../models/user');
var bcrypt = require('bcryptjs');

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

router.post('/login', [
    check('email', 'Please enter valid email').isEmail(),
    check('email', 'Please enter email').notEmpty(),
    check('password', 'Please enter password').notEmpty()
], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        var password = req.body.password;
        User.checkUser(req, function (err, data) {
            if (err) {
                res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                let totalrecord = data.length;
                if (totalrecord) {
                    console.log(data);
                    let dbPassword = (data[0].password).trim();
                    password = req.body.password;
                    var jsonUser = JSON.stringify(data[0]);
                    var token = jwt.sign(jsonUser, env.SECRET, {});
                    bcrypt.compare(password, dbPassword, function (err, doesMatch) {
                        if (err) {
                            res.json({ 'status': 0, 'response': { 'msg': 'Error Occured.' } });
                        } else {
                            if (doesMatch) {
                                let userList = {};

                                userList = {
                                    'id': data[0].id,
                                    // 'fullName': data[0].full_name,
                                    // 'userName': data[0].user_name,
                                    // 'phone': data[0].phone,
                                    // 'usertype': data[0].usertype,
                                    // 'country': data[0].country,
                                    'email': data[0].email,
                                    'userRole': (data[0].userrole) ? data[0].userrole : '',
                                };
                                res.json({ 'status': 1, 'response': { 'msg': 'Login successfully.', 'token': 'JWT ' + token, 'data': userList } });
                            } else {
                                res.json({ 'status': 0, 'response': { 'msg': 'Incorrect password.' } });
                            }
                        }
                    });
                } else {
                    return res.json({ 'status': 0, 'response': { 'msg': data } });
                }
            }
        });
    }
});

// blog list
router.get('/blogList', passport.authenticate('jwt', { session: false }), function (req, res) {
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
                retObj['created_at'] = data.created_at;
                retObj['role'] = data.role;
                retObj['status'] = data.status;                
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: blogList } });
        }
    });
});

//get user data - adminside
router.post('/getuserData', passport.authenticate('jwt', { session: false }),[
    check('user_id', 'User is required').notEmpty(),
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let user_id = req.body.user_id;
        User.getUserById(user_id, function (err, result) {        
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                if (result != '') {
                    let userList = {};
                    userList['id'] = result[0].id;
                    userList['fullName'] = result[0].full_name;
                    userList['userName'] = result[0].user_name;
                    userList['email'] = result[0].email;
                    userList['phone'] = result[0].phone;
                    userList['twitteraccount'] = (result[0].twitteraccount) ? result[0].twitteraccount : '';
                    userList['portfoliourl'] = (result[0].portfoliourl) ? result[0].portfoliourl : '';
                    userList['usertype'] = (result[0].usertype == 'normal') ? 'Normal User' : 'Guest User';
                    return res.json({ 'status': 1, 'response': { 'data': userList, 'msg': 'data found' } });
                } else {
                    return res.json({ 'status': 1, 'response': { 'data': userList, 'msg': 'data found' } });
                }
            }
        });
    }
});

router.post('/changeUserStatus', passport.authenticate('jwt', { session: false }), [
    check('userId', 'Please enter user id').notEmpty(),
    check('status', 'Please enter status').notEmpty(),
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let record = {
            status: req.body.status
        };
        let user_id = req.body.userId;
        User.userStatusUpdate(record, user_id, function (err, result) {
            if (err) {
                return res.json({ status: 0, 'response': { msg: err } });
            } else {
                if (record.status == 1) {
                    return res.json({ status: 1, response: { msg: 'Successfully updated record.', } });
                } else {
                    return res.json({ status: 1, 'response': { msg: 'Successfully updated record.' } });
                }
            }
        });
    }
});


   

    



module.exports = router;

