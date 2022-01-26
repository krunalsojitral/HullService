"use strict";

var express = require('express');
var { check, validationResult } = require("express-validator");
var router = express.Router();
var env = require('../config/env');
var Organization = require('../models/organization');

function loggerData(req) {
    if (env.DEBUG) {
        var URL = "Url:-" + JSON.stringify(req.originalUrl, null, 4) + "\n";
        //  console.log(moment().format('YYYY-MM-DD h:m:s A') + ": " + URL);
    }
}


// organization list
//passport.authenticate('jwt', { session: false }), 
router.get('/organizationList', function (req, res) {
    loggerData(req);
    var status = req.query.status;
    Organization.getAllAdminorganization(status, function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var organizationList = result.map(data => {
                let retObj = {};
                retObj['organization_id'] = data.organization_id;
                retObj['organization_name'] = data.organization_name;
                retObj['status'] = data.status;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: organizationList } });
        }
    });
});

//get organization data - adminside
router.post('/getorganizationDataById', [check('organization_id', 'organization is required').notEmpty()], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let organization_id = req.body.organization_id;
        Organization.getorganizationDataById(organization_id, function (err, result) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                var imageLink;
                if (req.headers.host == env.ADMIN_LIVE_URL) {
                    imageLink = env.ADMIN_LIVE_URL;
                } else {
                    imageLink = env.ADMIN_LIVE_URL;
                }
                let organization = {};
                organization['organization_id'] = result[0].organization_id;
                organization['organization_name'] = result[0].organization_name;
                organization['status'] = result[0].status;
                return res.json({ 'status': 1, 'response': { 'data': organization, 'msg': 'data found' } });
            }
        });
    }
});


router.post('/changeOrganizationStatus', [
    check('organization_id', 'organization id is required').notEmpty(),
    check('status', 'Please enter status').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let organization_id = req.body.organization_id;
        let record = {
            status: req.body.status
        }
        Organization.changeorganizationStatus(record, organization_id, function (err, result) {
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

router.post('/addorganizationByadmin', [
    check('organization_name', 'organization name is required').notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else { 
        let record = {
            organization_name: req.body.organization_name
        };
        Organization.addorganizationByadmin(record, function (err, data) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                return res.json({ 'status': 1, 'response': { 'msg': 'Organization added successfully.', data: data } });
            }
        });
    }
});

router.post('/updateorganizationByadmin', [
    check('organization_name', 'organization name is required').notEmpty(),
    check('organization_id', 'organization id is required').notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let record = {
            organization_name: req.body.organization_name
        };
        let update_value = [req.body.organization_name]
        let organization_id = req.body.organization_id
        Organization.updateorganizationByadmin(record, organization_id, update_value, function (err, data) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                return res.json({ 'status': 1, 'response': { 'msg': 'Organization updated successfully.', data: data } });
            }
        });
    }
});

router.post('/deleteorganization', [
    check('organization', 'organization is required').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        loggerData(req);
        let organization = req.body.organization;
        Organization.deleteorganization(organization, function (err, result) {
            if (err) {
                return res.json({ status: 0, 'response': { msg: err } });
            } else {
                return res.json({ status: 1, 'response': { msg: 'Organization deleted successfully', data: result } });
            }
        });
    }
});

module.exports = router;