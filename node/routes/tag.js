"use strict";

var express = require('express');
var { check, validationResult } = require("express-validator");

var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var env = require('../config/env');
var Tag = require('../models/tag');
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


// tag list
//passport.authenticate('jwt', { session: false }), 
router.get('/tagList', function (req, res) {
    loggerData(req);
    var status = req.query.status;
    Tag.getAllAdmintag(status, function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var tagList = result.map(data => {
                let retObj = {};
                retObj['tag_id'] = data.tag_id;
                retObj['tag_name'] = data.tag_name;
                retObj['status'] = data.status;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: tagList } });
        }
    });
});

//get tag data - adminside
router.post('/gettagDataById', [check('tag_id', 'tag is required').notEmpty()], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let tag_id = req.body.tag_id;
        Tag.gettagDataById(tag_id, function (err, result) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                var imageLink;
                if (req.headers.host == env.ADMIN_LIVE_URL) {
                    imageLink = env.ADMIN_LIVE_URL;
                } else {
                    imageLink = env.ADMIN_LIVE_URL;
                }
                let tag = {};
                tag['tag_id'] = result[0].tag_id;
                tag['tag_name'] = result[0].tag_name;                
                tag['status'] = result[0].status;
                return res.json({ 'status': 1, 'response': { 'data': tag, 'msg': 'data found' } });
            }
        });
    }
});


router.post('/changetagStatus', [
    check('tag_id', 'tag id is required').notEmpty(),
    check('status', 'Please enter status').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let tag_id = req.body.tag_id;
        let record = {
            status: req.body.status
        }
        Tag.changetagStatus(record, tag_id, function (err, result) {
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

router.post('/addtagByadmin', [
    check('tag_name', 'tag name is required').notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else { 
        let record = {
            tag_name: req.body.tag_name
        };
        Tag.addtagByadmin(record, function (err, data) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                return res.json({ 'status': 1, 'response': { 'msg': 'Tag added successfully.', data: data } });
            }
        });
    }
});

router.post('/updatetagByadmin', [
    check('tag_name', 'tag name is required').notEmpty(),
    check('tag_id', 'tag id is required').notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let record = {
            tag_name: req.body.tag_name
        };
        let update_value = [req.body.tag_name]
        let tag_id = req.body.tag_id
        Tag.updatetagByadmin(record, tag_id, update_value, function (err, data) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                return res.json({ 'status': 1, 'response': { 'msg': 'Tag updated successfully.', data: data } });
            }
        });
    }
});


module.exports = router;