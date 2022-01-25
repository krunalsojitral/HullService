"use strict";

var express = require('express');
var { check, validationResult } = require("express-validator");

var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var env = require('../config/env');
var academicdiscipline = require('../models/academicdiscipline');
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


// academicdiscipline list
//passport.authenticate('jwt', { session: false }), 
router.get('/academicdisciplineList', function (req, res) {
    loggerData(req);
    var status = req.query.status;
    academicdiscipline.getAllAdminacademicdiscipline(status, function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var academicdisciplineList = result.map(data => {
                let retObj = {};
                retObj['academicdiscipline_id'] = data.academic_discipline_id;
                retObj['academic_discipline_name'] = data.name;
                retObj['status'] = data.status;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: academicdisciplineList } });
        }
    });
});

//get academicdiscipline data - adminside
router.post('/getacademicdisciplineDataById', [check('academicdiscipline_id', 'academicdiscipline is required').notEmpty()], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let academicdiscipline_id = req.body.academicdiscipline_id;
        academicdiscipline.getacademicdisciplineDataById(academicdiscipline_id, function (err, result) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                var imageLink;
                if (req.headers.host == env.ADMIN_LIVE_URL) {
                    imageLink = env.ADMIN_LIVE_URL;
                } else {
                    imageLink = env.ADMIN_LIVE_URL;
                }
                let academicdiscipline = {};
                academicdiscipline['academicdiscipline_id'] = result[0].academic_discipline_id;
                academicdiscipline['academicdiscipline_name'] = result[0].name;                
                academicdiscipline['status'] = result[0].status;
                return res.json({ 'status': 1, 'response': { 'data': academicdiscipline, 'msg': 'data found' } });
            }
        });
    }
});


router.post('/changeacademicdisciplineStatus', [
    check('academicdiscipline_id', 'academicdiscipline id is required').notEmpty(),
    check('status', 'Please enter status').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let academicdiscipline_id = req.body.academicdiscipline_id;
        let record = {
            status: req.body.status
        }
        academicdiscipline.changeacademicdisciplineStatus(record, academicdiscipline_id, function (err, result) {
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

router.post('/addacademicdisciplineByadmin', [
    check('academicdiscipline_name', 'academicdiscipline name is required').notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else { 
        let record = {
            academicdiscipline_name: req.body.academicdiscipline_name
        };
        academicdiscipline.addacademicdisciplineByadmin(record, function (err, data) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                return res.json({ 'status': 1, 'response': { 'msg': 'Academic Discipline added successfully.', data: data } });
            }
        });
    }
});

router.post('/updateacademicdisciplineByadmin', [
    check('academicdiscipline_name', 'academicdiscipline name is required').notEmpty(),
    check('academicdiscipline_id', 'academicdiscipline id is required').notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let record = {
            name: req.body.academicdiscipline_name
        };
        let update_value = [req.body.academicdiscipline_name]
        let academicdiscipline_id = req.body.academicdiscipline_id
        academicdiscipline.updateacademicdisciplineByadmin(record, academicdiscipline_id, update_value, function (err, data) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                return res.json({ 'status': 1, 'response': { 'msg': 'Academic Discipline updated successfully.', data: data } });
            }
        });
    }
});


module.exports = router;