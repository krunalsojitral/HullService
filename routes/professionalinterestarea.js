"use strict";

var express = require('express');
var { check, validationResult } = require("express-validator");

var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var env = require('../config/env');
var Professionalinterestarea = require('../models/professionalinterestarea');
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


// professionalinterestarea list
//passport.authenticate('jwt', { session: false }), 
router.get('/professionalinterestareaList', function (req, res) {
    loggerData(req);
    Professionalinterestarea.getAllAdminprofessionalinterestarea(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var professionalinterestareaList = result.map(data => {
                let retObj = {};
                retObj['professional_interest_area_id'] = data.professional_interest_area_id;
                retObj['interest_area'] = data.name;
                retObj['status'] = data.status;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: professionalinterestareaList } });
        }
    });
});

//get professionalinterestarea data - adminside
router.post('/getprofessionalinterestareaDataById', [check('professionalinterestarea_id', 'professionalinterestarea is required').notEmpty()], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let professionalinterestarea_id = req.body.professionalinterestarea_id;
        Professionalinterestarea.getprofessionalinterestareaDataById(professionalinterestarea_id, function (err, result) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                var imageLink;
                if (req.headers.host == env.ADMIN_LIVE_URL) {
                    imageLink = env.ADMIN_LIVE_URL;
                } else {
                    imageLink = env.ADMIN_LIVE_URL;
                }
                let professionalinterestarea = {};
                professionalinterestarea['professional_interest_area_id'] = result[0].professional_interest_area_id;
                professionalinterestarea['name'] = result[0].name;
                professionalinterestarea['status'] = result[0].status;
                return res.json({ 'status': 1, 'response': { 'data': professionalinterestarea, 'msg': 'data found' } });
            }
        });
    }
});


router.post('/changeprofessionalinterestareaStatus', [
    check('professional_interest_area_id', 'professionalinterestarea id is required').notEmpty(),
    check('status', 'Please enter status').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let professional_interest_area_id = req.body.professional_interest_area_id;
        let record = {
            status: req.body.status
        }
        Professionalinterestarea.changeprofessionalinterestareaStatus(record, professional_interest_area_id, function (err, result) {
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

router.post('/addprofessionalinterestareaByadmin', [
    check('name', 'professionalinterestarea name is required').notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else { 
        let record = {
            name: req.body.name
        };
        Professionalinterestarea.addprofessionalinterestareaByadmin(record, function (err, data) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                return res.json({ 'status': 1, 'response': { 'msg': 'Interest area added successfully.', data: data } });
            }
        });
    }
});

router.post('/updateprofessionalinterestareaByadmin', [
    check('name', 'professionalinterestarea name is required').notEmpty(),
    check('professionalinterestarea_id', 'professionalinterestarea id is required').notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let record = {
            name: req.body.name
        };
        let update_value = [req.body.name]
        let professionalinterestarea_id = req.body.professionalinterestarea_id
        Professionalinterestarea.updateprofessionalinterestareaByadmin(record, professionalinterestarea_id, update_value, function (err, data) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                return res.json({ 'status': 1, 'response': { 'msg': 'Professional interest area updated successfully.', data: data } });
            }
        });
    }
});


module.exports = router;