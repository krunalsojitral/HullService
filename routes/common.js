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
const gm = require('gm');
var mustache = require('mustache');
var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
const nodeMailerCredential = require('./../EmailCredential');
// const { Token, Priviledges } = require('agora-access-token');
const { RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole } = require('agora-access-token')




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

router.get('/menuList', function (req, res) {
    loggerData(req);
    Common.getMenuList(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var menuList = result.map(data => {
                let retObj = {};
                retObj['dynamic_menu_id'] = data.dynamic_menu_id;
                retObj['menu_name'] = data.menu_name;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: menuList } });
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

router.get('/getOrganizationList', function (req, res) {
    loggerData(req);
    Common.getOrganizationList(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            if (result.length > 0){
                var list = result.map(data => {
                    let finalretObj = { organization: [] };
                    let retObj = {};
                    retObj['organization_id'] = data.organization_id;
                    retObj['organization_name'] = data.organization_name;
                    finalretObj.organization.push(retObj)
                    return finalretObj;
                });
                return res.json({ status: 1, 'response': { data: list } });
            }else{
                return res.json({ status: 1, 'response': { data: [] } });
            }
        }
    });
});

router.get('/getAdminFilterOrganizationList', function (req, res) {
    loggerData(req);
    Common.getOrganizationList(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            if (result.length > 0) {
                var list = result.map(data => {
                    let retObj = {};
                    retObj['organization_id'] = data.organization_id;
                    retObj['organization_name'] = data.organization_name;
                    return retObj;
                });
                return res.json({ status: 1, 'response': { data: list } });
            } else {
                return res.json({ status: 1, 'response': { data: [] } });
            }
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
                created_at: moment().format('YYYY-MM-DD'),
                live_session_url: (obj.live_session_url) ? obj.live_session_url : '',
                live_session_date: (obj.live_session_date) ? obj.live_session_date : '',
                live_session_time: (obj.live_session_time) ? obj.live_session_time : '',
                live_session_minute: (obj.live_session_minute) ? obj.live_session_minute : '',
                description: obj.description,
                learn_description: obj.learn_description,
                prerequisites_description: obj.prerequisites_description,
                session_type: obj.session_type,
                video_content_title: obj.video_content_title,
                video_title_first: obj.video_title_first,
                video_url_first: obj.video_url_first,
                video_time_first: obj.video_time_first,
                video_title_second: obj.video_title_second,
                video_url_second: obj.video_url_second,
                video_time_second: obj.video_time_second,
                video_title_third: obj.video_title_third,
                video_url_third: obj.video_url_third,
                video_time_third: obj.video_time_third,
                video_title_fourth: obj.video_title_fourth,
                video_url_fourth: obj.video_url_fourth,
                video_time_fourth: obj.video_time_fourth,
                video_title_five: obj.video_title_five,
                video_url_five: obj.video_url_five,
                video_time_five: obj.video_time_five,
                video_title_six: obj.video_title_six,
                video_url_six: obj.video_url_six,
                video_time_six: obj.video_time_six,
                video_title_seven: obj.video_title_seven,
                video_url_seven: obj.video_url_seven,
                video_time_seven: obj.video_time_seven,
                video_title_eight: obj.video_title_eight,
                video_url_eight: obj.video_url_eight,
                video_time_eight: obj.video_time_eight,
                video_title_nine: obj.video_title_nine,
                video_url_nine: obj.video_url_nine,
                video_time_nine: obj.video_time_nine,
                video_title_ten: obj.video_title_ten,
                video_url_ten: obj.video_url_ten,
                video_time_ten: obj.video_time_ten,
                content_title_one: obj.content_title_one,
                content_description_one: obj.content_description_one,
                content_title_two: obj.content_title_two,
                content_description_two: obj.content_description_two,
                content_title_third: obj.content_title_third,
                content_description_third: obj.content_description_third,
                content_title_four: obj.content_title_four,
                content_description_four: obj.content_description_four,
                content_title_five: obj.content_title_five,
                content_description_five: obj.content_description_five,
                trainer: obj.trainer,
                created_at: moment().format('YYYY-MM-DD'),
                role: obj.user_role,
                purchase_type: obj.purchase_type,
                main_cost: obj.main_cost,
                sale_cost: obj.sale_cost,
                start_date: obj.start_date,
                start_time: obj.start_time,
                end_date: obj.end_date,
                end_time: obj.end_time,
                speaker_name: obj.speaker_name,
                location: obj.location,
            };

            let course_record = {
                title: obj.title,
                live_session_url: (obj.live_session_url) ? obj.live_session_url : '',
                live_session_date: (obj.live_session_date) ? obj.live_session_date : '',
                live_session_time: (obj.live_session_time) ? obj.live_session_time : '',
                live_session_minute: (obj.live_session_minute) ? obj.live_session_minute : '',
                description: obj.description,
                learn_description: obj.learn_description,
                prerequisites_description: obj.prerequisites_description,
                session_type: obj.session_type,
                video_content_title: obj.video_content_title,
                video_title_first: obj.video_title_first,
                video_url_first: obj.video_url_first,
                video_time_first: obj.video_time_first,
                video_title_second: obj.video_title_second,
                video_url_second: obj.video_url_second,
                video_time_second: obj.video_time_second,
                video_title_third: obj.video_title_third,
                video_url_third: obj.video_url_third,
                video_time_third: obj.video_time_third,
                video_title_fourth: obj.video_title_fourth,
                video_url_fourth: obj.video_url_fourth,
                video_time_fourth: obj.video_time_fourth,
                video_title_five: obj.video_title_five,
                video_url_five: obj.video_url_five,
                video_time_five: obj.video_time_five,
                video_title_six: obj.video_title_six,
                video_url_six: obj.video_url_six,
                video_time_six: obj.video_time_six,
                video_title_seven: obj.video_title_seven,
                video_url_seven: obj.video_url_seven,
                video_time_seven: obj.video_time_seven,
                video_title_eight: obj.video_title_eight,
                video_url_eight: obj.video_url_eight,
                video_time_eight: obj.video_time_eight,
                video_title_nine: obj.video_title_nine,
                video_url_nine: obj.video_url_nine,
                video_time_nine: obj.video_time_nine,
                video_title_ten: obj.video_title_ten,
                video_url_ten: obj.video_url_ten,
                video_time_ten: obj.video_time_ten,
                content_title_one: obj.content_title_one,
                content_description_one: obj.content_description_one,
                content_title_two: obj.content_title_two,
                content_description_two: obj.content_description_two,
                content_title_third: obj.content_title_third,
                content_description_third: obj.content_description_third,
                content_title_four: obj.content_title_four,
                content_description_four: obj.content_description_four,
                content_title_five: obj.content_title_five,
                content_description_five: obj.content_description_five,
                trainer: obj.trainer,
                purchase_type: obj.purchase_type,
                main_cost: obj.main_cost,
                sale_cost: obj.sale_cost,
                created_at: moment().format('YYYY-MM-DD'),
                module_type: obj.type,
                start_date: obj.start_date,
                start_time: obj.start_time,
                end_date: obj.end_date,
                end_time: obj.end_time,
                speaker_name: obj.speaker_name,
                location: obj.location,
            };

            let update_value = [obj.title, obj.live_session_url, obj.live_session_date,
            obj.live_session_time, obj.live_session_minute, obj.description,
            obj.learn_description, obj.prerequisites_description, obj.session_type,
            obj.video_content_title,
            obj.video_title_first, obj.video_url_first, obj.video_time_first,
            obj.video_title_second, obj.video_url_second, obj.video_time_second,
            obj.video_title_third, obj.video_url_third, obj.video_time_third,
            obj.video_title_fourth, obj.video_url_fourth, obj.video_time_fourth,
            obj.video_title_five, obj.video_url_five, obj.video_time_five,
            obj.video_title_six, obj.video_url_six, obj.video_time_six,
            obj.video_title_seven, obj.video_url_seven, obj.video_time_seven,
            obj.video_title_eight, obj.video_url_eight, obj.video_time_eight,
            obj.video_title_nine, obj.video_url_nine, obj.video_time_nine,
            obj.video_title_ten, obj.video_url_ten, obj.video_time_ten,
            obj.content_title_one, obj.content_description_one,
            obj.content_title_two, obj.content_description_two,
            obj.content_title_third, obj.content_description_third,
            obj.content_title_four, obj.content_description_four,
            obj.content_title_five, obj.content_description_five,
            obj.trainer, obj.purchase_type, obj.main_cost, obj.sale_cost, moment().format('YYYY-MM-DD'), obj.type,
            obj.start_date,obj.start_time,obj.end_date,obj.end_time,obj.speaker_name,obj.location]

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
                    Common.addPreview(record, update_value, course_record, function (err, result) {
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

            if (result.length > 0){
                let retObj = {};
                retObj['preview_id'] = result[0].preview_id;
                retObj['title'] = result[0].title;
                retObj['image'] = (result[0].image) ? imageLink + env.PREVIEW_VIEW_PATH + result[0].image : '';
                retObj['description'] = result[0].description;
                retObj['module_type'] = result[0].module_type;
                retObj['videoid'] = result[0].videoid;
                retObj['created_at'] = moment(result[0].created_at).format('MMMM DD, YYYY');
                retObj['role'] = result[0].role;
                retObj['status'] = result[0].status;
                retObj['learn_description'] = result[0].learn_description;
                retObj['prerequisites_description'] = result[0].prerequisites_description;
                retObj['session_type'] = result[0].session_type;
                retObj['video_content_title'] = result[0].video_content_title;
                retObj['video_title_first'] = result[0].video_title_first;
                retObj['video_url_first'] = result[0].video_url_first;
                retObj['video_time_first'] = result[0].video_time_first;
                retObj['video_title_second'] = result[0].video_title_second;
                retObj['video_url_second'] = result[0].video_url_second;
                retObj['video_time_second'] = result[0].video_time_second;
                retObj['video_title_third'] = result[0].video_title_third;
                retObj['video_url_third'] = result[0].video_url_third;
                retObj['video_time_third'] = result[0].video_time_third;
                retObj['video_title_fourth'] = result[0].video_title_fourth;
                retObj['video_url_fourth'] = result[0].video_url_fourth;
                retObj['video_time_fourth'] = result[0].video_time_fourth;
                retObj['video_title_five'] = result[0].video_title_five;
                retObj['video_url_five'] = result[0].video_url_five;
                retObj['video_time_five'] = result[0].video_time_five;
                retObj['video_title_six'] = result[0].video_title_six;
                retObj['video_url_six'] = result[0].video_url_six;
                retObj['video_time_six'] = result[0].video_time_six;
                retObj['video_title_seven'] = result[0].video_title_seven;
                retObj['video_url_seven'] = result[0].video_url_seven;
                retObj['video_time_seven'] = result[0].video_time_seven;
                retObj['video_title_eight'] = result[0].video_title_eight;
                retObj['video_url_eight'] = result[0].video_url_eight;
                retObj['video_time_eight'] = result[0].video_time_eight;
                retObj['video_title_nine'] = result[0].video_title_nine;
                retObj['video_url_nine'] = result[0].video_url_nine;
                retObj['video_time_nine'] = result[0].video_time_nine;
                retObj['video_title_ten'] = result[0].video_title_ten;
                retObj['video_url_ten'] = result[0].video_url_ten;
                retObj['video_time_ten'] = result[0].video_time_ten;
                retObj['content_title_one'] = result[0].content_title_one;
                retObj['content_description_one'] = result[0].content_description_one;
                retObj['content_title_two'] = result[0].content_title_two;
                retObj['content_description_two'] = result[0].content_description_two;
                retObj['content_title_third'] = result[0].content_title_third;
                retObj['content_description_third'] = result[0].content_description_third;
                retObj['content_title_four'] = result[0].content_title_four;
                retObj['content_description_four'] = result[0].content_description_four;
                retObj['content_title_five'] = result[0].content_title_five;
                retObj['content_description_five'] = result[0].content_description_five;
                retObj['trainer'] = result[0].trainer;
                retObj['purchase_type'] = result[0].purchase_type;
                retObj['main_cost'] = result[0].main_cost;
                retObj['sale_cost'] = result[0].sale_cost;
                retObj['live_session_url'] = result[0].live_session_url;
                retObj['live_session_date'] = result[0].live_session_date;
                retObj['live_session_time'] = result[0].live_session_time;
                retObj['live_session_minute'] = result[0].live_session_minute;
                retObj['update_at'] = (result[0].update_at) ? moment(result[0].update_at).format('MM/YYYY') : '';
                retObj['course_purchase'] = 0;
                retObj['draft_status'] = result[0].draft_status;
                retObj['start_date'] = result[0].start_date;
                retObj['start_time'] = result[0].start_time;
                retObj['end_date'] = result[0].end_date;
                retObj['end_time'] = result[0].end_time;
                retObj['speaker_name'] = result[0].speaker_name;
                retObj['location'] = result[0].location;
                return res.json({ status: 1, 'response': { data: retObj } });
            }else{
                return res.json({ status: 1, 'response': { data: {} } });
            }


        }
    });
});

router.post('/addPageByadmin', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) return res.json({ status: 1, 'response': { msg: err } });
        var validationErrors = false;
        if (validationErrors == false) {

            var json = fields.data;
            let obj = JSON.parse(json);
            let record = {
                title: obj.title,
                description: obj.description,
                created_at: moment().format('YYYY-MM-DD'),
                menu_id: obj.menu,
                slug: obj.title.replace(/[^a-zA-Z ]/g, "")
            };
            asyn.waterfall([
                function (done) {
                    let overview = {};

                    if (typeof files.image !== 'undefined') {
                        let file_ext = files.image.name.split('.').pop();
                        let filename = Date.now() + '-' + files.image.name.split(" ").join("");
                        let tmp_path = files.image.path;
                        if (file_ext == 'png' || file_ext == 'PNG' || file_ext == 'jpg' || file_ext == 'JPG' || file_ext == 'jpeg' || file_ext == 'JPEG') {

                            fs.rename(tmp_path, path.join(__dirname, env.BLOG_PATH + filename), function (err) {
                                gm(__dirname + env.BLOG_PATH + filename).gravity('Center').thumb(258, 195, __dirname + env.BLOG_PATH_THUMB + filename, 100, function (err, data) {
                                    if (err) {
                                        done("Image upload error", overview)
                                    } else {
                                        overview['image'] = filename;
                                        done(err, overview)
                                    }
                                });
                            });

                        } else {
                            return res.json({ status: 0, response: { msg: 'Only image with jpg, jpeg and png format are allowed', } });
                        }
                    } else {
                        overview['image'] = '';
                        done(err, overview);
                    }
                },
                function (overview, done1) {
                    if (overview.image != '') { record.image = overview.image; }
                    Common.addPageByadmin(record, function (err, data) {
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
                    return res.json({ 'status': 1, 'response': { 'msg': 'Page added successfully.', data: userList } });
                }
            });
        }
    });
});

router.get('/dynamicPageList', function (req, res) {
    loggerData(req);
    Common.dynamicPageList(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var blogList = result.map(data => {
                let retObj = {};
                retObj['dynamic_page_id'] = data.dynamic_page_id;
                retObj['title'] = data.title;
                retObj['description'] = data.description;
                retObj['created_at'] = moment(data.created_at).format('YYYY-MM-DD');
                retObj['menu_id'] = data.menu_id;
                retObj['status'] = data.status;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: blogList } });
        }
    });
});

router.post('/getDynamicPageDataByMenu', [check('menu', 'menu is required').notEmpty()], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let menu = req.body.menu;
        asyn.waterfall([
            function (done) {
                Common.getDynamicPageDataByMenu(menu, function (err, result) {
                    if (err) {
                        done({ 'status': 0, 'response': { 'msg': 'Something went wrong.' } });
                    } else {
                        var imageLink;
                        if (req.headers.host == env.ADMIN_LIVE_URL) {
                            imageLink = env.ADMIN_LIVE_URL;
                        } else {
                            imageLink = env.ADMIN_LIVE_URL;
                        }
                        let page = {};
                        page['dynamic_page_id'] = result[0].dynamic_page_id;
                        page['menu_id'] = result[0].menu_id;
                        page['title'] = result[0].title;
                        page['created_at'] = moment(result[0].created_at).format('MMMM DD, YYYY');
                        page['description'] = result[0].description;
                        page['image'] = (result[0].image) ? imageLink + env.BLOG_VIEW_PATH + result[0].image : '';
                        page['status'] = result[0].status;
                        done(err, page)
                    }
                });
            }
        ],
        function (error, page) {
            if (error) {
                return res.json({ 'status': 0, 'response': { 'msg': error } });
            } else {
                return res.json({ 'status': 1, 'response': { 'data': page, 'msg': 'data found' } });
            }
        });
    }
});


router.get('/getDynamicMenu', function (req, res) {
    loggerData(req);
    Common.getDynamicMenu(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var menuList = result.map(data => {
                let retObj = {};
                retObj['dynamic_menu_id'] = data.dynamic_menu_id;
                retObj['menu_name'] = data.menu_name;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: menuList } });
        }
    });
});


router.get('/getBecomeMemberContent', (req, res, next) => {
    asyn.waterfall([
        function (done) {
            Common.getBecomeMemberContent(function (err, result) {
                if (err) {
                    done({ 'status': 0, 'response': { 'msg': 'Something went wrong.' } });
                } else {
                    var imageLink;
                    if (req.headers.host == env.ADMIN_LIVE_URL) {
                        imageLink = env.ADMIN_LIVE_URL;
                    } else {
                        imageLink = env.ADMIN_LIVE_URL;
                    }
                    if (result.length > 0){
                        let data = {};
                        data['sub_title'] = result[0].sub_title;
                        data['main_title'] = result[0].main_title;
                        data['description'] = result[0].description;
                        data['second_description'] = result[0].second_description;
                        data['image'] = (result[0].image) ? imageLink + env.MEMBER_VIEW_PATH + result[0].image : '';
                        data['testimonials'] = result[0].testimonials;
                        data['become_member_title'] = result[0].become_member_title;
                        data['become_member_description'] = result[0].become_member_description;
                        data['email_us_description'] = result[0].email_us_description;
                        done(err, data)
                    }else{
                        done(err, null)
                    }
                }
            });
        }
    ],
    function (error, result1) {
        if (error) {
            return res.json({ 'status': 0, 'response': { 'msg': error } });
        } else {
            return res.json({ 'status': 1, 'response': { 'data': result1, 'msg': 'data found' } });
        }
    });
});


router.post('/updateBecomeMemberByadmin', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) return res.json({ status: 1, 'response': { msg: err } });
        var validationErrors = false;
        if (validationErrors == false) {
            var json = fields.data;
            let obj = JSON.parse(json);

            let update_value = [obj.main_title, obj.sub_title, obj.description, obj.second_description, obj.testimonials, obj.become_member_title, obj.become_member_description, obj.email_us_description, moment().format('YYYY-MM-DD')]

            let record = {
                main_title: obj.main_title,
                sub_title: obj.sub_title,
                description: obj.description,
                second_description: obj.second_description,
                testimonials: obj.testimonials,
                become_member_title: obj.become_member_title,
                become_member_description: obj.become_member_description,
                email_us_description: obj.email_us_description,
                created_at: moment().format('YYYY-MM-DD')
            };
            let become_member_id = 1;
            asyn.waterfall([
                function (done) {
                    let overview = {};
                    if (typeof files.image !== 'undefined') {
                        let file_ext = files.image.name.split('.').pop();
                        let filename = Date.now() + '-' + files.image.name.split(" ").join("");
                        let tmp_path = files.image.path;
                        if (file_ext == 'png' || file_ext == 'PNG' || file_ext == 'jpg' || file_ext == 'JPG' || file_ext == 'jpeg' || file_ext == 'JPEG') {
                            fs.rename(tmp_path, path.join(__dirname, env.MEMBER_PATH + filename), function (err) {
                                overview['image'] = filename;
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
                        overview['image'] = '';
                        done(err, overview);
                    }
                },
                function (overview, done1) {
                    if (overview.image != '') {
                        record.image = overview.image;
                        update_value.push(overview.image);
                    }
                    Common.updateBecomeMemberByadmin(record, become_member_id, update_value, function (err, data) {
                        if (err) {
                            done1(err, overview)
                        } else {
                            done1(err, data);
                        }
                    });
                }
            ],
            function (error, result) {
                if (error) {
                    return res.json({ 'status': 0, 'response': { 'msg': error } });
                } else {
                    return res.json({ 'status': 1, 'response': { 'msg': 'Become a Member content updated successfully.', data: result } });
                }
            });
        }
    });
});


router.post('/updateMembershipFees', function (req, res) {
    var record = { membership_fees: req.body.membership_fees  }
    Common.updateMembershipFees(record, function (err, result) {
        if (err) {
            return res.json({ 'status': 0, 'response': { 'msg': err } });
        } else {
            return res.json({ 'status': 1, 'response': { 'msg': 'Membership fees updated successfully.', data: result } });
        }
    });
});

router.get('/getMembershipFees', function (req, res) {
    Common.getMembershipFees(function (err, result) {
        if (err) {
            return res.json({ 'status': 0, 'response': { 'msg': err } });
        } else {
            return res.json({ 'status': 1, 'response': { 'msg': 'get membership fees.', data: result } });
        }
    });
});

router.post('/sendEmail', function (req, res) {
    var logo;
    var home_url;
    var hostname = req.headers.host;
    if (hostname == env.LIVE_HOST_USER_APP) {
        home_url = env.APP_URL
        logo = env.APP_URL + '/assets/img/brand_logo.png';
    } else {
        home_url = env.APP_URL
        logo = env.APP_URL + '/assets/img/brand_logo.png';
    }
    var htmlUser = fs.readFileSync(__dirname + '/templates/EmailSend.html', 'utf8');
    var dynamicHtml = {
        logo: logo,
        home_url: home_url,
        name: req.body.name,
        email: req.body.email,
        description: req.body.description
    }
    var view = { data: dynamicHtml };
    var finalHtmlUser = mustache.render(htmlUser, view);

    let transporter = nodemailer.createTransport(nodeMailerCredential); // node mailer credentials
    let mailOptions = {
        from: env.MAIL_FROM,
        to: env.MAIL_FROM,
        subject: 'Email US.',
        html: finalHtmlUser.replace(/&#x2F;/g, '/')
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
        }
    });
    return res.json({ status: 1, 'msg': 'Send mail successfully.'});
});

router.get('/access_token', function (req, res) {

    const appID = '076cd275e3274e84b0daa2322e5180e4';
    const appCertificate = 'd4e4ca76b2124b8ea6170c92747d4a7f';
    const channelName = req.query.channel;
    const uid = req.query.uid;
    const account = "";
    const role = RtcRole.PUBLISHER;

    const expirationTimeInSeconds = 3600

    const currentTimestamp = Math.floor(Date.now() / 1000)

    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

    // IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.

    // Build token with uid
    const tokenA = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);
    

    // Build token with user account
    const tokenB = RtcTokenBuilder.buildTokenWithAccount(appID, appCertificate, channelName, account, role, privilegeExpiredTs);
    


    return res.json({ 'status': 0, 'response': { "token_with_integer_number_uid": tokenA, "token_with_userAccount":tokenB } });


    // var channel = req.query.channel;
    // if (!channel) {
    //     return resp.status(500).json({ 'error': 'channel name is required' });
    // }

    // var uid = req.query.uid;
    // if (!uid) {
    //     uid = 0;
    // }

    // var expiredTs = req.query.expiredTs;
    // if (!expiredTs) {
    //     expiredTs = 0;
    // }



    // var token = new Token("076cd275e3274e84b0daa2322e5180e4", "d4e4ca76b2124b8ea6170c92747d4a7f", channel, uid);
    // console.log('==============');
    // console.log(token);
    // // typically you will ONLY need join channel priviledge
    // token.addPriviledge(Priviledges.kJoinChannel, expiredTs);
    // return resp.json({ 'token': token.build() });
});


router.get('/timezone-list', function (req, res) { 
    var timezoneList = [
        { "label": "(GMT-12:00) International Date Line West", "value": "Etc/GMT+12" },
        { "label": "(GMT-11:00) Midway Island, Samoa", "value": "Pacific/Midway" },
        { "label": "(GMT-10:00) Hawaii", "value": "Pacific/Honolulu" },
        { "label": "(GMT-09:00) Alaska", "value": "US/Alaska" },
        { "label": "(GMT-08:00) Pacific Time (US & Canada)", "value": "America/Los_Angeles" },
        { "label": "(GMT-08:00) Tijuana, Baja California", "value": "America/Tijuana" },
        { "label": "(GMT-07:00) Arizona", "value": "US/Arizona" },
        { "label": "(GMT-07:00) Chihuahua, La Paz, Mazatlan", "value": "America/Chihuahua" },
        { "label": "(GMT-07:00) Mountain Time (US & Canada)", "value": "US/Mountain" },
        { "label": "(GMT-06:00) Central America", "value": "America/Managua" },
        { "label": "(GMT-06:00) Central Time (US & Canada)", "value": "US/Central" },
        { "label": "(GMT-06:00) Guadalajara, Mexico City, Monterrey", "value": "America/Mexico_City" },
        { "label": "(GMT-06:00) Saskatchewan", "value": "Canada/Saskatchewan" },
        { "label": "(GMT-05:00) Bogota, Lima, Quito, Rio Branco", "value": "America/Bogota" },
        { "label": "(GMT-05:00) Eastern Time (US & Canada)", "value": "US/Eastern" },
        { "label": "(GMT-05:00) Indiana (East)", "value": "US/East-Indiana" },
        { "label": "(GMT-04:00) Atlantic Time (Canada)", "value": "Canada/Atlantic" },
        { "label": "(GMT-04:00) Caracas, La Paz", "value": "America/Caracas" },
        { "label": "(GMT-04:00) Manaus", "value": "America/Manaus" },
        { "label": "(GMT-04:00) Santiago", "value": "America/Santiago" },
        { "label": "(GMT-03:30) Newfoundland", "value": "Canada/Newfoundland" },
        { "label": "(GMT-03:00) Brasilia", "value": "America/Sao_Paulo" },
        { "label": "(GMT-03:00) Buenos Aires, Georgetown", "value": "America/Argentina/Buenos_Aires" },
        { "label": "(GMT-03:00) Greenland", "value": "America/Godthab" },
        { "label": "(GMT-03:00) Montevideo", "value": "America/Montevideo" },
        { "label": "(GMT-02:00) Mid-Atlantic", "value": "America/Noronha" },
        { "label": "(GMT-01:00) Cape Verde Is.", "value": "Atlantic/Cape_Verde" },
        { "label": "(GMT-01:00) Azores", "value": "Atlantic/Azores" },
        { "label": "(GMT+00:00) Casablanca, Monrovia, Reykjavik", "value": "Africa/Casablanca" },
        { "label": "(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London", "value": "Etc/Greenwich" },
        { "label": "(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna", "value": "Europe/Amsterdam" },
        { "label": "(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague", "value": "Europe/Belgrade" },
        { "label": "(GMT+01:00) Brussels, Copenhagen, Madrid, Paris", "value": "Europe/Brussels" },
        { "label": "(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb", "value": "Europe/Sarajevo" },
        { "label": "(GMT+01:00) West Central Africa", "value": "Africa/Lagos" },
        { "label": "(GMT+02:00) Amman", "value": "Asia/Amman" },
        { "label": "(GMT+02:00) Athens, Bucharest, Istanbul", "value": "Europe/Athens" },
        { "label": "(GMT+02:00) Beirut", "value": "Asia/Beirut" },
        { "label": "(GMT+02:00) Cairo", "value": "Africa/Cairo" },
        { "label": "(GMT+02:00) Harare, Pretoria", "value": "Africa/Harare" },
        { "label": "(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius", "value": "Europe/Helsinki" },
        { "label": "(GMT+02:00) Jerusalem", "value": "Asia/Jerusalem" },
        { "label": "(GMT+02:00) Minsk", "value": "Europe/Minsk" },
        { "label": "(GMT+02:00) Windhoek", "value": "Africa/Windhoek" },
        { "label": "(GMT+03:00) Kuwait, Riyadh, Baghdad", "value": "Asia/Kuwait" },
        { "label": "(GMT+03:00) Moscow, St. Petersburg, Volgograd", "value": "Europe/Moscow" },
        { "label": "(GMT+03:00) Nairobi", "value": "Africa/Nairobi" },
        { "label": "(GMT+03:00) Tbilisi", "value": "Asia/Tbilisi" },
        { "label": "(GMT+03:30) Tehran", "value": "Asia/Tehran" },
        { "label": "(GMT+04:00) Abu Dhabi, Muscat", "value": "Asia/Muscat" },
        { "label": "(GMT+04:00) Baku", "value": "Asia/Baku" },
        { "label": "(GMT+04:00) Yerevan", "value": "Asia/Yerevan" },
        { "label": "(GMT+04:30) Kabul", "value": "Asia/Kabul" },
        { "label": "(GMT+05:00) Yekaterinburg", "value": "Asia/Yekaterinburg" },
        { "label": "(GMT+05:00) Islamabad, Karachi, Tashkent", "value": "Asia/Karachi" },
        { "label": "(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi", "value": "Asia/Calcutta" },
        { "label": "(GMT+05:45) Kathmandu", "value": "Asia/Katmandu" },
        { "label": "(GMT+06:00) Almaty, Novosibirsk", "value": "Asia/Almaty" },
        { "label": "(GMT+06:00) Astana, Dhaka", "value": "Asia/Dhaka" },
        { "label": "(GMT+06:30) Yangon (Rangoon)", "value": "Asia/Rangoon" },
        { "label": "(GMT+07:00) Bangkok, Hanoi, Jakarta", "value": "Asia/Bangkok" },
        { "label": "(GMT+07:00) Krasnoyarsk", "value": "Asia/Krasnoyarsk" },
        { "label": "(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi", "value": "Asia/Hong_Kong" },
        { "label": "(GMT+08:00) Kuala Lumpur, Singapore", "value": "Asia/Kuala_Lumpur" },
        { "label": "(GMT+08:00) Irkutsk, Ulaan Bataar", "value": "Asia/Irkutsk" },
        { "label": "(GMT+08:00) Perth", "value": "Australia/Perth" },
        { "label": "(GMT+08:00) Taipei", "value": "Asia/Taipei" },
        { "label": "(GMT+09:00) Osaka, Sapporo, Tokyo", "value": "Asia/Tokyo" },
        { "label": "(GMT+09:00) Seoul", "value": "Asia/Seoul" },
        { "label": "(GMT+09:00) Yakutsk", "value": "Asia/Yakutsk" },
        { "label": "(GMT+09:30) Adelaide", "value": "Australia/Adelaide" },
        { "label": "(GMT+09:30) Darwin", "value": "Australia/Darwin" },
        { "label": "(GMT+10:00) Brisbane", "value": "Australia/Brisbane" },
        { "label": "(GMT+10:00) Canberra, Melbourne, Sydney", "value": "Australia/Canberra" },
        { "label": "(GMT+10:00) Hobart", "value": "Australia/Hobart" },
        { "label": "(GMT+10:00) Guam, Port Moresby", "value": "Pacific/Guam" },
        { "label": "(GMT+10:00) Vladivostok", "value": "Asia/Vladivostok" },
        { "label": "(GMT+11:00) Magadan, Solomon Is., New Caledonia", "value": "Asia/Magadan" },
        { "label": "(GMT+12:00) Auckland, Wellington", "value": "Pacific/Auckland" },
        { "label": "(GMT+12:00) Fiji, Kamchatka, Marshall Is.", "value": "Pacific/Fiji" },
        { "label": "(GMT+13:00) Nuku'alofa", "value": "Pacific/Tongatapu" }
    ]
    return res.json({ 'status': 1, 'data':timezoneList, 'msg': 'Timezone List.' });
})


module.exports = router;
