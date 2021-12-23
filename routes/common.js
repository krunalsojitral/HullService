"use strict";

var express = require('express');
var { check, validationResult } = require("express-validator");
var moment = require('moment');
var router = express.Router();
var jwt = require('jsonwebtoken');
var formidable = require('formidable');
var env = require('../config/env');
var Common = require('../models/common');
var asyn = require('async');
var path = require('path');
var fs = require('fs');
var helper = require('../config/helper');

function loggerData(req) {
    if (env.DEBUG) {
        var URL = "Url:-" + JSON.stringify(req.originalUrl, null, 4) + "\n";
        //  console.log(moment().format('YYYY-MM-DD h:m:s A') + ": " + URL);
    }
}

router.get('/sectorList', function (req, res) {
    loggerData(req);
    Common.getSectorList(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var sectorList = result.map(data => {
                let retObj = {};
                retObj['sector_id'] = data.sector_id;
                retObj['name'] = data.name;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: sectorList } });
        }
    });
});


router.get('/academicDisciplineList', function (req, res) {
    loggerData(req);
    Common.getAcademicDisciplineList(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var educationList = result.map(data => {
                let retObj = {};
                retObj['academic_discipline_id'] = data.academic_discipline_id;
                retObj['name'] = data.name;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: educationList } });
        }
    });
});

router.get('/occupationList', function (req, res) {
    loggerData(req);
    Common.getOccupationList(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var occupationList = result.map(data => {
                let retObj = {};
                retObj['occupation_id'] = data.occupation_id;
                retObj['name'] = data.name;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: occupationList } });
        }
    });
});

router.get('/roleList', function (req, res) {
    loggerData(req);
    Common.getRoleList(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {            
            var roleList = result.map(data => {
                let retObj = {};
                retObj['role_id'] = data.role_id;
                retObj['name'] = data.role;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: roleList } });
        }
    });
});

router.get('/tagList', function (req, res) {
    loggerData(req);
    Common.getTagList(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var tagList = result.map(data => {
                let retObj = {};
                retObj['tag_id'] = data.tag_id;
                retObj['tag_name'] = data.tag_name;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: tagList } });
        }
    });
});

router.get('/categoryList', function (req, res) {
    loggerData(req);
    Common.getCategoryList(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var tagList = result.map(data => {
                let retObj = {};
                retObj['category_id'] = data.category_id;
                retObj['category_name'] = data.category_name;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: tagList } });
        }
    });
});

router.get('/getHeadingList', function (req, res) {
    loggerData(req);
    Common.getHeadingList(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var headingList = result.map(data => {
                let retObj = {};
                retObj['forumheading_id'] = data.forumheading_id;
                retObj['forumheading_name'] = data.forumheading_name;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: headingList } });
        }
    });
});

router.get('/getProfessionalInterestAreaList', function (req, res) {
    loggerData(req);
    Common.getProfessionalInterestAreaList(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var headingList = result.map(data => {
                let retObj = {};
                retObj['professional_interest_area_id'] = data.professional_interest_area_id;
                retObj['name'] = data.name;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: headingList } });
        }
    });
});

router.get('/getResearcherInterestAreaList', function (req, res) {
    loggerData(req);
    Common.getResearcherInterestAreaList(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var headingList = result.map(data => {
                let retObj = {};
                retObj['researcher_interest_area_id'] = data.researcher_interest_area_id;
                retObj['name'] = data.name;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: headingList } });
        }
    });
});


router.post('/addPreview', function (req, res) {    
    loggerData(req);

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) return res.json({ status: 1, 'response': { msg: err } });
        var validationErrors = false;
        if (validationErrors == false) {

            var imageLink;
            if (req.headers.host == env.ADMIN_LIVE_URL) {
                imageLink = env.USER_LIVE_URL;
            } else {
                imageLink = env.USER_LIVE_URL;                
            }

            var json = fields.data;
            let obj = JSON.parse(json); 
            
            var videoId = '';
            if (obj.video_url) {
                videoId = helper.getVideoId(obj.video_url);
            }else{
                videoId = '';
            }

            let record = {
                title: obj.title,
                tag: obj.tag,
                description: obj.description,
                purchase_type: obj.purchase_type,
                cost: obj.cost,
                module_type: obj.type,
                videoId: videoId,
                created_at: moment().format('YYYY-MM-DD')
            };
            
            asyn.waterfall([
                function (done) {
                    let overview = {};
                    if (typeof files.image !== 'undefined') {
                        let file_ext = files.image.name.split('.').pop();
                        let ProfileImage = Date.now() + '-' + files.image.name.split(" ").join("");
                        let tmp_path = files.image.path;
                        if (file_ext == 'png' || file_ext == 'PNG' || file_ext == 'jpg' || file_ext == 'JPG' || file_ext == 'jpeg' || file_ext == 'JPEG') {
                            fs.rename(tmp_path, path.join(__dirname, env.PREVIEW_PATH + ProfileImage), function (err) {
                                overview['image'] = ProfileImage;                                
                                fs.unlink(tmp_path, function () {
                                    if (err) {                                        
                                        done(err, overview)
                                    }else{
                                        done(err, overview)
                                    }
                                });
                            });
                        } else {
                            overview['image'] = '';
                            done('Only image with jpg, jpeg and png format are allowed', overview);                            
                        }
                    } else {
                        overview['image'] = '';
                        done(err, overview);
                    }
                },
                function (overview, done1) {
                    if (overview.image != '') { record.image = overview.image; }                    
                    Common.addPreview(record, function (err, result) {
                        if (err) {
                            done1(err, overview)
                        } else {
                            done1(err, result);
                        }
                    });
                }
            ],
            function (error, userList) {
                if (error) {
                    return res.json({ 'status': 0, 'response': { 'msg': error } });
                } else {
                    return res.json({ 'status': 1, 'response': { 'msg': 'Preview added successfully.', data: userList, preview: imageLink  } });
                }
            });
        }
    });


    
});

router.get('/getPreview', function (req, res) {
    loggerData(req);
    Common.getPreview(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {

            var imageLink;
            if (req.headers.host == env.ADMIN_LIVE_URL) {
                imageLink = env.ADMIN_LIVE_URL;
            } else {
                imageLink = env.ADMIN_LIVE_URL;
            }
            
            let retObj = {};
            retObj['preview_id'] = result[0].preview_id;
            retObj['title'] = result[0].title;
            retObj['image'] = (result[0].image) ? imageLink + env.PREVIEW_VIEW_PATH + result[0].image : '';
            retObj['description'] = result[0].description;
            retObj['module_type'] = result[0].module_type;
            retObj['videoid'] = result[0].videoid;
            retObj['created_at'] = moment(result[0].created_at).format('MMMM DD, YYYY');
            
            return res.json({ status: 1, 'response': { data: retObj } });
        }
    });
});






module.exports = router;

