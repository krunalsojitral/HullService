"use strict";

var express = require('express');
var { check, validationResult } = require("express-validator");

var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var env = require('../config/env');
var Researcherinterestarea = require('../models/researcherinterestarea');
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


// researcherinterestarea list
//passport.authenticate('jwt', { session: false }), 
router.get('/researcherinterestareaList', function (req, res) {
    loggerData(req);
    var status = req.query.status;
    Researcherinterestarea.getAllAdminresearcherinterestarea(status, function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var researcherinterestareaList = result.map(data => {
                let retObj = {};
                retObj['researcherinterestarea_id'] = data.researcher_interest_area_id;
                retObj['name'] = data.name;
                retObj['status'] = data.status;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: researcherinterestareaList } });
        }
    });
});

//get researcherinterestarea data - adminside
router.post('/getresearcherinterestareaDataById', [check('researcherinterestarea_id', 'researcherinterestarea is required').notEmpty()], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let researcherinterestarea_id = req.body.researcherinterestarea_id;
        Researcherinterestarea.getresearcherinterestareaDataById(researcherinterestarea_id, function (err, result) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                var imageLink;
                if (req.headers.host == env.ADMIN_LIVE_URL) {
                    imageLink = env.ADMIN_LIVE_URL;
                } else {
                    imageLink = env.ADMIN_LIVE_URL;
                }
                let researcherinterestarea = {};
                researcherinterestarea['researcherinterestarea_id'] = result[0].researcherinterestarea_id;
                researcherinterestarea['researcherinterestarea_name'] = result[0].name;                
                researcherinterestarea['status'] = result[0].status;
                return res.json({ 'status': 1, 'response': { 'data': researcherinterestarea, 'msg': 'data found' } });
            }
        });
    }
});


router.post('/changeresearcherinterestareaStatus', [
    check('researcherinterestarea_id', 'researcherinterestarea id is required').notEmpty(),
    check('status', 'Please enter status').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let researcherinterestarea_id = req.body.researcherinterestarea_id;
        let record = {
            status: req.body.status
        }
        Researcherinterestarea.changeresearcherinterestareaStatus(record, researcherinterestarea_id, function (err, result) {
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

router.post('/addresearcherinterestareaByadmin', [
    check('researcherinterestarea_name', 'researcherinterestarea name is required').notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else { 
        let record = {
            name: req.body.researcherinterestarea_name
        };
        Researcherinterestarea.addresearcherinterestareaByadmin(record, function (err, data) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                return res.json({ 'status': 1, 'response': { 'msg': 'Researcher interest area added successfully.', data: data } });
            }
        });
    }
});

router.post('/updateresearcherinterestareaByadmin', [
    check('researcherinterestarea_name', 'researcherinterestarea name is required').notEmpty(),
    check('researcherinterestarea_id', 'researcherinterestarea id is required').notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let record = {
            name: req.body.researcherinterestarea_name
        };
        let update_value = [req.body.researcherinterestarea_name]
        let researcherinterestarea_id = req.body.researcherinterestarea_id
        Researcherinterestarea.updateresearcherinterestareaByadmin(record, researcherinterestarea_id, update_value, function (err, data) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                return res.json({ 'status': 1, 'response': { 'msg': 'Researcher interest area updated successfully.', data: data } });
            }
        });
    }
});



router.post('/deleteResearcherinterestarea', [
    check('researcherinterestarea', 'Checkbox selection is required').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        loggerData(req);
        let researcherinterestarea = req.body.researcherinterestarea;
        Researcherinterestarea.deleteResearcherinterestarea(researcherinterestarea, function (err, result) {
            if (err) {
                return res.json({ status: 0, 'response': { msg: err } });
            } else {
                return res.json({ status: 1, 'response': { msg: 'Researcher interest area deleted successfully', data: result } });
            }
        });
    }
});


module.exports = router;