"use strict";

var express = require('express');
var { check, validationResult } = require("express-validator");
var router = express.Router();
var env = require('../config/env');
var Media = require('../models/media');
var path = require('path');
var fs = require('fs');
var asyn = require('async');
var formidable = require('formidable');


function loggerData(req) {
    if (env.DEBUG) {
        var URL = "Url:-" + JSON.stringify(req.originalUrl, null, 4) + "\n";
    }
}


// media list
//passport.authenticate('jwt', { session: false }), 
router.get('/mediaList', function (req, res) {
    loggerData(req);
    Media.getAllAdminMedia(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var mediaLink;
            if (req.headers.host == env.ADMIN_LIVE_URL) {
                mediaLink = env.ADMIN_LIVE_URL;
            } else {
                mediaLink = env.ADMIN_LIVE_URL;
            }
            var mediaList = result.map(data => {
                let retObj = {};
                retObj['media_id'] = data.media_id;
                retObj['media'] = (data.name) ? mediaLink + env.MEDIA_VIEW_PATH + data.name : '';
                retObj['media_url'] = (data.name) ? mediaLink + env.MEDIA_VIEW_PATH + data.name : '';
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: mediaList } });
        }
    });
});

router.post('/addMediaByadmin', function (req, res) {
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
                        fs.rename(tmp_path, path.join(__dirname, env.MEDIA_PATH + ProfileImage), function (err) {
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
                    Media.addMediaByadmin(record, function (err, data) {
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
                    return res.json({ 'status': 1, 'response': { 'msg': 'Media added successfully.', data: userList } });
                }
            });
    });
});

router.post('/deleteMedia', [check('media_id', 'media is required').notEmpty()], (req, res, next) => {
    let media_id = req.body.media_id
    Media.deleteMedia(media_id, function (err, data) {
        if (err) {
            return res.json({ 'status': 0, 'response': { 'msg': err } });
        } else {
            return res.json({ 'status': 1, 'response': { 'msg': 'Media deleted successfully.', data: data } });
        }
    });
});




module.exports = router;