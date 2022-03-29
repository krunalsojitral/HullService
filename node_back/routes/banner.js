"use strict";

var express = require('express');
var { check, validationResult } = require("express-validator");

var router = express.Router();
var env = require('../config/env');
var Banner = require('../models/banner');
var path = require('path');
var fs = require('fs');
var asyn = require('async');
var moment = require('moment');
var formidable = require('formidable');
const gm = require('gm');

function loggerData(req) {
    if (env.DEBUG) {
        var URL = "Url:-" + JSON.stringify(req.originalUrl, null, 4) + "\n";
        //  console.log(moment().format('YYYY-MM-DD h:m:s A') + ": " + URL);
    }
}

router.get('/bannerList', function (req, res) {
    loggerData(req);
    var status = req.query.status;
    Banner.getAllAdminBanner(status, function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var imageLink;
            if (req.headers.host == env.ADMIN_LIVE_URL) {
                imageLink = env.ADMIN_LIVE_URL;
            } else {
                imageLink = env.ADMIN_LIVE_URL;
            }
            var bannerList = result.map(data => {
                let retObj = {};
                retObj['banner_id'] = data.banner_id;
                retObj['title'] = data.title;
                retObj['description'] = data.description;
                retObj['created_at'] = moment(data.created_at).format('YYYY-MM-DD');
                retObj['image'] = (data.banner_image) ? imageLink + env.BANNER_VIEW_PATH + data.banner_image : '';
                retObj['role'] = data.role;
                retObj['status'] = data.status;
                retObj['isChecked'] = false;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: bannerList } });
        }
    });
});

router.get('/getUserBannerList', function (req, res) {
    loggerData(req);
    Banner.getUserBannerList(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var imageLink;
            if (req.headers.host == env.ADMIN_LIVE_URL) {
                imageLink = env.ADMIN_LIVE_URL;
            } else {
                imageLink = env.ADMIN_LIVE_URL;
            }
            var bannerList = result.map(data => {
                let retObj = {};
                retObj['banner_id'] = data.banner_id;
                retObj['title'] = data.title;
                retObj['description'] = data.description;
                retObj['created_at'] = moment(data.created_at).format('YYYY-MM-DD');
                retObj['role'] = data.role;
                retObj['image'] = (data.banner_image) ? imageLink + env.BANNER_VIEW_PATH + data.banner_image : '';
                retObj['status'] = data.status;
                retObj['button_text'] = data.button_text;
                retObj['button_url'] = data.button_url;
                retObj['isChecked'] = false;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: bannerList } });
        }
    });
});

//get banner data - adminside
router.post('/getbannerDataById', [check('banner_id', 'banner is required').notEmpty()], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let banner_id = req.body.banner_id;
        Banner.getbannerDataById(banner_id, function (err, result) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                var imageLink;
                if (req.headers.host == env.ADMIN_LIVE_URL) {
                    imageLink = env.ADMIN_LIVE_URL;
                } else {
                    imageLink = env.ADMIN_LIVE_URL;
                }
                let banner = {};
                banner['banner_id'] = result[0].banner_id;
                banner['title'] = result[0].title;
                banner['description'] = result[0].description;
                banner['created_at'] = moment(result[0].created_at).format('MMMM DD, YYYY');
                banner['button_text'] = result[0].button_text;
                banner['image'] = (result[0].banner_image) ? imageLink + env.BANNER_VIEW_PATH + result[0].banner_image : '';
                banner['button_url'] = result[0].button_url;
                return res.json({ 'status': 1, 'response': { 'data': banner, 'msg': 'data found' } });
            }
        });
    }
});


router.post('/changebannerStatus', [
    check('banner_id', 'banner id is required').notEmpty(),
    check('status', 'Please enter status').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let banner_id = req.body.banner_id;
        let record = {
            status: req.body.status
        }
        Banner.changebannerStatus(record, banner_id, function (err, result) {
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

router.post('/addbannerByadmin', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) return res.json({ status: 1, 'response': { msg: err } });
            var json = fields.data;
            let obj = JSON.parse(json);
            let record = {
                title: obj.title,
                description: obj.description,
                created_at: moment().format('YYYY-MM-DD'),
                button_text: obj.button_text,
                button_url: obj.button_url,
                banner_image:''
            };
            asyn.waterfall([
                function (done) {
                    let overview = {};
                    if (typeof files.image !== 'undefined') {
                        let file_ext = files.image.name.split('.').pop();
                        let filename = Date.now() + '-' + files.image.name.split(" ").join("");
                        let tmp_path = files.image.path;
                        if (file_ext == 'png' || file_ext == 'PNG' || file_ext == 'jpg' || file_ext == 'JPG' || file_ext == 'jpeg' || file_ext == 'JPEG') {
                            // fs.rename(tmp_path, path.join(__dirname, env.banner_PATH + ProfileImage), function (err) {
                            //     overview['image'] = ProfileImage;
                            //     done(err, overview)
                            //     fs.unlink(tmp_path, function () {
                            //         if (err) {
                            //             return res.json({ status: 1, 'response': { msg: err } });
                            //         }
                            //     });
                            // });
                            fs.rename(tmp_path, path.join(__dirname, env.BANNER_PATH + filename), function (err) {
                                gm(__dirname + env.BANNER_PATH + filename).gravity('Center').thumb(1920, 800, __dirname + env.BANNER_PATH + filename, 100, function (err, data) {
                                    if (err) {
                                        console.log(err);
                                        done("Image upload error", overview)
                                    } else {
                                        overview['banner_image'] = filename;
                                        done(err, overview)
                                    }
                                });
                            });
                        } else {
                            return res.json({ status: 0, response: { msg: 'Only image with jpg, jpeg and png format are allowed', } });
                        }
                    } else {
                        overview['banner_image'] = '';
                        done(err, overview);
                    }
                },
                function (overview, done1) {
                    if (overview.banner_image != '') { record.banner_image = overview.banner_image; }
                    Banner.addbannerByadmin(record, function (err, data) {
                        if (err) {
                            done1(err, overview)
                        } else {
                            done1(err, data);
                        }
                    });
                }
            ],
            function (error, userList) {
                if (error) {
                    return res.json({ 'status': 0, 'response': { 'msg': error } });
                } else {
                    return res.json({ 'status': 1, 'response': { 'msg': 'Banner added successfully.', data: userList } });
                }
            });
        
    });
});

router.post('/updatebannerByadmin', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) return res.json({ status: 1, 'response': { msg: err } });
            var json = fields.data;
            let obj = JSON.parse(json);

        let update_value = [obj.title, obj.description, moment().format('YYYY-MM-DD'), obj.button_text, obj.button_url]
            let record = {
                title: obj.title,
                description: obj.description,
                created_at: moment().format('YYYY-MM-DD'),
                button_text: obj.button_text,
                button_url: obj.button_url
            };
            let banner_id = obj.banner_id;
            asyn.waterfall([
                function (done) {
                    let overview = {};
                    
                    if (typeof files.image !== 'undefined') {
                        let file_ext = files.image.name.split('.').pop();
                        let filename = Date.now() + '-' + files.image.name.split(" ").join("");
                        let tmp_path = files.image.path;                        
                        if (file_ext == 'png' || file_ext == 'PNG' || file_ext == 'jpg' || file_ext == 'JPG' || file_ext == 'jpeg' || file_ext == 'JPEG') {

                            fs.rename(tmp_path, path.join(__dirname, env.BANNER_PATH + filename), function (err) {
                                gm(__dirname + env.BANNER_PATH + filename).gravity('Center').thumb(1920, 800, __dirname + env.BANNER_PATH + filename, 100, function (err, data) {
                                    if (err) {
                                        done("Image upload error", overview)
                                    } else {
                                        overview['banner_image'] = filename;
                                        done(err, overview)
                                    }
                                });
                            });

                            
                            // fs.rename(tmp_path, path.join(__dirname, env.banner_PATH + ProfileImage), function (err) {
                            //     overview['image'] = ProfileImage;                                
                            //     fs.unlink(tmp_path, function () {
                            //         if (err) {
                            //             done(err, overview)
                            //             //return res.json({ status: 1, 'response': { msg: err } });
                            //         }else{
                            //             done(err, overview)
                            //         }
                            //     });
                            // });
                        } else {
                            return res.json({ status: 0, response: { msg: 'Only image with jpg, jpeg and png format are allowed', } });
                        }
                    } else {
                        overview['banner_image'] = '';
                        done(err, overview);
                    }
                },
                function (overview, done1) {
                    if (overview.banner_image != '') {
                        record.banner_image = overview.banner_image;
                        update_value.push(overview.banner_image);
                    }                    
                    Banner.updatebannerByadmin(record, banner_id, update_value, function (err, data) {
                        if (err) {
                            done1(err, overview)
                        } else {
                            done1(err, data);
                        }
                    });
                }
            ],
            function (error, userList) {
                if (error) {
                    return res.json({ 'status': 0, 'response': { 'msg': error } });
                } else {
                    return res.json({ 'status': 1, 'response': { 'msg': 'Banner updated successfully.', data: userList } });
                }
            });
        
    });
});

router.post('/updateBannerOrder', [
    check('banner', 'banner is required').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        loggerData(req);
        let banner = req.body.banner;
        Banner.updateBannerOrder(banner, function (err, result) {
            if (err) {
                return res.json({ status: 0, 'response': { msg: err } });
            } else {
                return res.json({ status: 1, 'response': { msg: 'Banner order updated successfully', data: result } });
            }
        });
    }
});



router.post('/changeDraftbannerStatus', [
    check('banner_id', 'banner id is required').notEmpty(),
    check('draft_status', 'Please enter status').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let banner_id = req.body.banner_id;
        let record = {
            draft_status: req.body.draft_status
        }
        Banner.changeDraftbannerStatus(record, banner_id, function (err, result) {
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

router.post('/deletebanner', [
    check('banner', 'banner is required').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else { 
        loggerData(req);
        let banner = req.body.banner;
        Banner.deletebanner(banner, function (err, result) {
            if (err) {
                return res.json({ status: 0, 'response': { msg: err } });
            } else {
                return res.json({ status: 1, 'response': { msg: 'Banner(s) deleted successfully', data: result } });
            }
        });
    }    
});



module.exports = router;