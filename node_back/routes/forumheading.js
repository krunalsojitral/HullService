"use strict";

var express = require('express');
var { check, validationResult } = require("express-validator");

var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var env = require('../config/env');
var Forumheading = require('../models/forumheading');
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


// forumheading list
//passport.authenticate('jwt', { session: false }), 
router.get('/forumheadingList', function (req, res) {
    loggerData(req);
    var status = req.query.status;
    Forumheading.getAllAdminforumheading(status, function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var forumheadingList = result.map(data => {
                let retObj = {};
                retObj['forumheading_id'] = data.forumheading_id;
                retObj['Heading'] = data.forumheading_name;
                retObj['status'] = data.status;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: forumheadingList } });
        }
    });
});

//get forumheading data - adminside
router.post('/getforumheadingDataById', [check('forumheading_id', 'forumheading is required').notEmpty()], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let forumheading_id = req.body.forumheading_id;
        Forumheading.getforumheadingDataById(forumheading_id, function (err, result) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                var imageLink;
                if (req.headers.host == env.ADMIN_LIVE_URL) {
                    imageLink = env.ADMIN_LIVE_URL;
                } else {
                    imageLink = env.ADMIN_LIVE_URL;
                }
                let forumheading = {};
                forumheading['forumheading_id'] = result[0].forumheading_id;
                forumheading['forumheading_name'] = result[0].forumheading_name;                
                forumheading['status'] = result[0].status;
                return res.json({ 'status': 1, 'response': { 'data': forumheading, 'msg': 'data found' } });
            }
        });
    }
});


router.post('/changeforumheadingStatus', [
    check('forumheading_id', 'forumheading id is required').notEmpty(),
    check('status', 'Please enter status').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let forumheading_id = req.body.forumheading_id;
        let record = {
            status: req.body.status
        }
        Forumheading.changeforumheadingStatus(record, forumheading_id, function (err, result) {
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

router.post('/addforumheadingByadmin', [
    check('forumheading_name', 'forumheading name is required').notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else { 
        let record = {
            forumheading_name: req.body.forumheading_name
        };
        Forumheading.addforumheadingByadmin(record, function (err, data) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                return res.json({ 'status': 1, 'response': { 'msg': 'Topic added successfully.', data: data } });
            }
        });
    }
});

router.post('/updateforumheadingByadmin', [
    check('forumheading_name', 'forumheading name is required').notEmpty(),
    check('forumheading_id', 'forumheading id is required').notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let record = {
            forumheading_name: req.body.forumheading_name
        };
        let update_value = [req.body.forumheading_name]
        let forumheading_id = req.body.forumheading_id
        Forumheading.updateforumheadingByadmin(record, forumheading_id, update_value, function (err, data) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                return res.json({ 'status': 1, 'response': { 'msg': 'Topic updated successfully.', data: data } });
            }
        });
    }
});



router.post('/deleteForumheading', [
    check('forumheading', 'forumheading is required').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        loggerData(req);
        let forumheading = req.body.forumheading;
        Forumheading.deleteForumheading(forumheading, function (err, result) {
            if (err) {
                return res.json({ status: 0, 'response': { msg: err } });
            } else {
                return res.json({ status: 1, 'response': { msg: 'Topic(s) deleted successfully', data: result } });
            }
        });
    }
});

module.exports = router;