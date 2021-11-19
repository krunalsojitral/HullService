"use strict";

var express = require('express');
var { check, validationResult } = require("express-validator");
var router = express.Router();
var env = require('../config/env');
var CMS = require('../models/cms');
var formidable = require('formidable');
var asyn = require('async');
var fs = require('fs');
var path = require('path');

function loggerData(req) {
    if (env.DEBUG) {
        var URL = "Url:-" + JSON.stringify(req.originalUrl, null, 4) + "\n";
        //  console.log(moment().format('YYYY-MM-DD h:m:s A') + ": " + URL);
    }
}


//get home content data - adminside
router.get('/getHomeContentData', (req, res, next) => {
    CMS.getHomeContentData(function (err, result) {
        if (err) {
            return res.json({ 'status': 0, 'response': { 'msg': err } });
        } else {            
            if (result.length > 0) {
                let contentList = {};
                contentList['home_content_id'] = result[0].home_content_id;
                contentList['first_section_title'] = result[0].first_section_title;
                contentList['first_section_sub_title'] = result[0].first_section_sub_title;
                contentList['first_section_upper_paragraph'] = result[0].first_section_upper_paragraph;
                contentList['first_section_lower_paragraph'] = result[0].first_section_lower_paragraph;
                contentList['second_section_title'] = result[0].second_section_title;
                contentList['second_section_sub_title'] = result[0].second_section_sub_title;
                contentList['video_url'] = result[0].video_url;
                contentList['third_section_title'] = result[0].third_section_title;
                contentList['third_section_sub_title'] = result[0].third_section_sub_title;
                contentList['third_section_upper_paragraph'] = result[0].third_section_upper_paragraph;
                contentList['third_section_lower_paragraph'] = result[0].third_section_lower_paragraph;
                return res.json({ 'status': 1, 'response': { 'data': contentList, 'msg': 'data found' } });
            } else {
                return res.json({ 'status': 1, 'response': { 'data': '', 'msg': 'data found' } });
            }
        }
    });
});

router.post('/updatecontentByadmin', function (req, res) {
    
    let update_value = [req.body.first_section_title, req.body.first_section_sub_title, req.body.first_section_upper_paragraph, req.body.first_section_lower_paragraph,
        req.body.second_section_title, req.body.second_section_sub_title,req.body.video_url, req.body.third_section_title,
        req.body.third_section_sub_title, req.body.third_section_upper_paragraph, req.body.third_section_lower_paragraph]
    let record = {        
        first_section_title: (req.body.first_section_title) ? req.body.first_section_title : '',
        first_section_sub_title: (req.body.first_section_sub_title) ? req.body.first_section_sub_title : '',
        first_section_upper_paragraph: (req.body.first_section_upper_paragraph) ? req.body.first_section_upper_paragraph : '',
        first_section_lower_paragraph: (req.body.first_section_lower_paragraph) ? req.body.first_section_lower_paragraph : '',
        second_section_title: (req.body.second_section_title) ? req.body.second_section_title : '',
        second_section_sub_title: (req.body.second_section_sub_title) ? req.body.second_section_sub_title : '',
        video_url: (req.body.video_url) ? req.body.video_url : '',
        third_section_title: (req.body.third_section_title) ? req.body.third_section_title : '',
        third_section_sub_title: (req.body.third_section_sub_title) ? req.body.third_section_sub_title : '',
        third_section_upper_paragraph: (req.body.third_section_upper_paragraph) ? req.body.third_section_upper_paragraph : '',
        third_section_lower_paragraph: (req.body.third_section_lower_paragraph) ? req.body.third_section_lower_paragraph : ''
    };
    CMS.updatecontentByadmin(record, 1, update_value, function (err, data) {
        if (err) {
            return res.json({ 'status': 0, 'response': { 'msg': err } });
        } else {
            return res.json({ 'status': 1, 'response': { 'msg': 'Content updated successfully.', data: data } });
        }
    });
});




// partner list
//passport.authenticate('jwt', { session: false }), 
router.get('/partnerList', function (req, res) {
    loggerData(req);
    CMS.getAllAdminpartner(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var partnerLink;
            if (req.headers.host == env.ADMIN_LIVE_URL) {
                partnerLink = env.ADMIN_LIVE_URL;
            } else {
                partnerLink = env.ADMIN_LIVE_URL;
            }
            var partnerList = result.map(data => {
                let retObj = {};
                retObj['partner_id'] = data.partner_id;
                retObj['partner'] = (data.name) ? partnerLink + env.PARTNER_VIEW_PATH + data.name : '';
                retObj['partner_url'] = (data.name) ? partnerLink + env.PARTNER_VIEW_PATH + data.name : '';
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: partnerList } });
        }
    });
});

router.post('/addpartnerByadmin', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) return res.json({ status: 1, 'response': { msg: err } });
        var json = fields.data;
        let record = {};
        asyn.waterfall([
            function (done) {
                let overview = {};
                if (typeof files.image !== 'undefined') {
                    let file_ext = files.image.name.split('.').pop();
                    let ProfileImage = Date.now() + '-' + files.image.name.split(" ").join("");
                    let tmp_path = files.image.path;
                    if (file_ext == 'png' || file_ext == 'PNG' || file_ext == 'jpg' || file_ext == 'JPG' || file_ext == 'jpeg' || file_ext == 'JPEG') {
                        fs.rename(tmp_path, path.join(__dirname, env.PARTNER_PATH + ProfileImage), function (err) {
                            overview['name'] = ProfileImage;
                            done(err, overview)
                            fs.unlink(tmp_path, function () {
                                if (err) {
                                    return res.json({ status: 1, 'response': { msg: err } });
                                }
                            });
                        });
                    } else {
                        return res.json({ status: 0, response: { msg: 'Only image with jpg, jpeg and png format are allowed', } });
                    }
                } else {
                    overview['name'] = '';
                    done(err, overview);
                }
            },
            function (overview, done1) {
                if (overview.name != '') {
                    record.name = overview.name;
                    CMS.addpartnerByadmin(record, function (err, data) {
                        if (err) {
                            done1(err, overview)
                        } else {
                            done1(err, data);
                        }
                    });
                } else {
                    overview['name'] = '';
                    done1('Image is required.', overview);
                }

            }
        ],
            function (error, userList) {
                if (error) {
                    return res.json({ 'status': 0, 'response': { 'msg': error } });
                } else {
                    return res.json({ 'status': 1, 'response': { 'msg': 'partner added successfully.', data: userList } });
                }
            });
    });
});

router.post('/deletepartner', [check('partner_id', 'partner is required').notEmpty()], (req, res, next) => {
    let partner_id = req.body.partner_id
    CMS.deletepartner(partner_id, function (err, data) {
        if (err) {
            return res.json({ 'status': 0, 'response': { 'msg': err } });
        } else {
            return res.json({ 'status': 1, 'response': { 'msg': 'partner deleted successfully.', data: data } });
        }
    });
});




module.exports = router;

