"use strict";

var express = require('express');
var { check, validationResult } = require("express-validator");

var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var env = require('../config/env');
var sector = require('../models/sector');
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


// sector list
//passport.authenticate('jwt', { session: false }), 
router.get('/sectorList', function (req, res) {
    loggerData(req);
    sector.getAllAdminsector(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var sectorList = result.map(data => {
                let retObj = {};
                retObj['sector_id'] = data.sector_id;
                retObj['sector_name'] = data.name;
                retObj['status'] = data.status;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: sectorList } });
        }
    });
});

//get sector data - adminside
router.post('/getsectorDataById', [check('sector_id', 'sector is required').notEmpty()], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let sector_id = req.body.sector_id;
        sector.getsectorDataById(sector_id, function (err, result) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                var imageLink;
                if (req.headers.host == env.ADMIN_LIVE_URL) {
                    imageLink = env.ADMIN_LIVE_URL;
                } else {
                    imageLink = env.ADMIN_LIVE_URL;
                }
                let sector = {};
                sector['sector_id'] = result[0].sector_id;
                sector['sector_name'] = result[0].name;                
                sector['status'] = result[0].status;
                return res.json({ 'status': 1, 'response': { 'data': sector, 'msg': 'data found' } });
            }
        });
    }
});


router.post('/changesectorStatus', [
    check('sector_id', 'sector id is required').notEmpty(),
    check('status', 'Please enter status').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let sector_id = req.body.sector_id;
        let record = {
            status: req.body.status
        }
        sector.changesectorStatus(record, sector_id, function (err, result) {
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

router.post('/addsectorByadmin', [
    check('sector_name', 'sector name is required').notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else { 
        let record = {
            sector_name: req.body.sector_name
        };
        sector.addsectorByadmin(record, function (err, data) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                return res.json({ 'status': 1, 'response': { 'msg': 'Sector added successfully.', data: data } });
            }
        });
    }
});

router.post('/updatesectorByadmin', [
    check('sector_name', 'sector name is required').notEmpty(),
    check('sector_id', 'sector id is required').notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let record = {
            name: req.body.sector_name
        };
        let update_value = [req.body.sector_name]
        let sector_id = req.body.sector_id
        sector.updatesectorByadmin(record, sector_id, update_value, function (err, data) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                return res.json({ 'status': 1, 'response': { 'msg': 'Sector updated successfully.', data: data } });
            }
        });
    }
});


module.exports = router;