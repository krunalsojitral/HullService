"use strict";

var express = require('express');
var { check, validationResult } = require("express-validator");

var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var env = require('../config/env');
var Category = require('../models/category');
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


// category list
//passport.authenticate('jwt', { session: false }), 
router.get('/categoryList', function (req, res) {
    loggerData(req);
    Category.getAllAdmincategory(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var categoryList = result.map(data => {
                let retObj = {};
                retObj['category_id'] = data.category_id;
                retObj['category_name'] = data.category_name;
                retObj['status'] = data.status;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: categoryList } });
        }
    });
});

//get category data - adminside
router.post('/getcategoryDataById', [check('category_id', 'category is required').notEmpty()], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let category_id = req.body.category_id;
        Category.getcategoryDataById(category_id, function (err, result) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                var imageLink;
                if (req.headers.host == env.ADMIN_LIVE_URL) {
                    imageLink = env.ADMIN_LIVE_URL;
                } else {
                    imageLink = env.ADMIN_LIVE_URL;
                }
                let category = {};
                category['category_id'] = result[0].category_id;
                category['category_name'] = result[0].category_name;                
                category['status'] = result[0].status;
                return res.json({ 'status': 1, 'response': { 'data': category, 'msg': 'data found' } });
            }
        });
    }
});


router.post('/changecategoryStatus', [
    check('category_id', 'category id is required').notEmpty(),
    check('status', 'Please enter status').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let category_id = req.body.category_id;
        let record = {
            status: req.body.status
        }
        Category.changecategoryStatus(record, category_id, function (err, result) {
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

router.post('/addcategoryByadmin', [
    check('category_name', 'category name is required').notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else { 
        let record = {
            category_name: req.body.category_name
        };
        Category.addcategoryByadmin(record, function (err, data) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                return res.json({ 'status': 1, 'response': { 'msg': 'Category added successfully.', data: data } });
            }
        });
    }
});

router.post('/updatecategoryByadmin', [
    check('category_name', 'category name is required').notEmpty(),
    check('category_id', 'category id is required').notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let record = {
            category_name: req.body.category_name
        };
        let update_value = [req.body.category_name]
        let category_id = req.body.category_id
        Category.updatecategoryByadmin(record, category_id, update_value, function (err, data) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                return res.json({ 'status': 1, 'response': { 'msg': 'Category updated successfully.', data: data } });
            }
        });
    }
});


module.exports = router;