"use strict";

var express = require('express');
var { check, validationResult } = require("express-validator");

var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var env = require('../config/env');
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

// user list
router.post('/userList', function (req, res) {
    loggerData(req);
    var role = req.body.role;
    User.getAllAdminUsers(role,function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var userList = result.map(data => {
                let retObj = {};
                retObj['id'] = data.id;
                retObj['name'] = data.name;
                retObj['phone'] = data.phone;
                retObj['created_at'] = moment(data.created_at).format('YYYY-MM-DD');
                retObj['role'] = data.role;
                retObj['email'] = data.email;                
                retObj['status'] = data.status;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: userList } });
        }
    });
});

router.post('/csvuserList', function (req, res) {
    loggerData(req);
    var role = req.body.role;
    User.getAllAdminUsers(role, function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var userList = result.map(data => {
                let retObj = {};
                retObj['name'] = data.name;
                retObj['email'] = data.email;
                retObj['phone'] = data.phone;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: userList } });
        }
    });
});




//get user data - adminside
router.post('/getuserData', [
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
                    userList['name'] = result[0].name;
                    userList['phone'] = result[0].phone;
                    userList['email'] = result[0].email;
                    userList['password'] = result[0].password;
                    return res.json({ 'status': 1, 'response': { 'data': userList, 'msg': 'data found' } });
                } else {
                    return res.json({ 'status': 1, 'response': { 'data': userList, 'msg': 'data found' } });
                }
            }
        });
    }
});


router.post('/changeuserStatus', [
    check('id', 'User id is required').notEmpty(),
    check('status', 'Please enter status').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let id = req.body.id;
        let record = {
            status: req.body.status
        }
        User.userStatusUpdate(record, id, function (err, result) {
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



router.post('/adduserByadmin', [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Email is required').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {

        let overview = {};
        asyn.waterfall([
            function (done) {
                var email = req.body.email;
                User.checkUserRegistration(email, function (err, data) {
                    let totalrecord = data.length;
                    if (totalrecord) {
                        return res.json({ status: 0, 'response': { msg: 'Sorry, email already exists.' } });
                    } else {
                        let password = bcrypt.hashSync(req.body.password, 10);
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(req.body.password, salt, (err, hash) => {
                                let record = {
                                    name: req.body.name,
                                    phone: (req.body.phone) ? req.body.phone : '',
                                    email: (req.body.email) ? req.body.email : '',
                                    password: hash,
                                    created_at: moment().format('YYYY-MM-DD'),
                                    role: req.body.role
                                };
                                overview['data'] = record;
                                done(err, overview);
                            })
                        })
                    }
                });
            },
            function (overview, done1) {
                User.adduserByadmin(overview.data, function (err, data) {
                    if (err) {
                        return res.json({ 'status': 0, 'response': { 'msg': error } });
                    } else {
                        return res.json({ 'status': 1, 'response': { 'msg': 'user added successfully.', data: data } });
                    }
                });
            }
        ]);
    }
});

router.post('/updateuserByadmin', function (req, res) {
    var user_id = req.body.user_id;
    let update_value = [req.body.name, req.body.phone]
    let record = {
        name: req.body.name,
        phone: (req.body.phone) ? req.body.phone : ''
    };
    User.updateuserByadmin(record, user_id, update_value, function (err, data) {
        if (err) {
            return res.json({ 'status': 0, 'response': { 'msg': err } });
        } else {
            return res.json({ 'status': 1, 'response': { 'msg': 'User updated successfully.', data: data } });
        }
    });
});


   

    



module.exports = router;

