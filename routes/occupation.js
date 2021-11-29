"use strict";

var express = require('express');
var { check, validationResult } = require("express-validator");

var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var env = require('../config/env');
var Occupation = require('../models/occupation');
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


// occupation list
//passport.authenticate('jwt', { session: false }), 
router.get('/occupationList', function (req, res) {
    loggerData(req);
    Occupation.getAllAdminoccupation(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var occupationList = result.map(data => {
                let retObj = {};
                retObj['occupation_id'] = data.occupation_id;
                retObj['occupation_name'] = data.name;
                retObj['status'] = data.status;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: occupationList } });
        }
    });
});

//get occupation data - adminside
router.post('/getoccupationDataById', [check('occupation_id', 'occupation is required').notEmpty()], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let occupation_id = req.body.occupation_id;
        Occupation.getoccupationDataById(occupation_id, function (err, result) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                var imageLink;
                if (req.headers.host == env.ADMIN_LIVE_URL) {
                    imageLink = env.ADMIN_LIVE_URL;
                } else {
                    imageLink = env.ADMIN_LIVE_URL;
                }
                let occupation = {};
                occupation['occupation_id'] = result[0].occupation_id;
                occupation['occupation_name'] = result[0].name;                
                occupation['status'] = result[0].status;
                return res.json({ 'status': 1, 'response': { 'data': occupation, 'msg': 'data found' } });
            }
        });
    }
});


router.post('/changeoccupationStatus', [
    check('occupation_id', 'occupation id is required').notEmpty(),
    check('status', 'Please enter status').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let occupation_id = req.body.occupation_id;
        let record = {
            status: req.body.status
        }
        Occupation.changeoccupationStatus(record, occupation_id, function (err, result) {
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

router.post('/addoccupationByadmin', [
    check('occupation_name', 'occupation name is required').notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else { 
        let record = {
            occupation_name: req.body.occupation_name
        };
        Occupation.addoccupationByadmin(record, function (err, data) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                return res.json({ 'status': 1, 'response': { 'msg': 'Occupation added successfully.', data: data } });
            }
        });
    }
});

router.post('/updateoccupationByadmin', [
    check('occupation_name', 'occupation name is required').notEmpty(),
    check('occupation_id', 'occupation id is required').notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let record = {
            name: req.body.occupation_name
        };
        let update_value = [req.body.occupation_name]
        let occupation_id = req.body.occupation_id
        Occupation.updateoccupationByadmin(record, occupation_id, update_value, function (err, data) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                return res.json({ 'status': 1, 'response': { 'msg': 'Occupation updated successfully.', data: data } });
            }
        });
    }
});


module.exports = router;