"use strict";

var express = require('express');
var { check, validationResult } = require("express-validator");

var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var env = require('../config/env');
var Article = require('../models/article');
var path = require('path');
var fs = require('fs');
var asyn = require('async');
var helper = require('../config/helper');
var moment = require('moment');
var formidable = require('formidable');
var Common = require('../models/common');
const gm = require('gm');

function loggerData(req) {
    if (env.DEBUG) {
        var URL = "Url:-" + JSON.stringify(req.originalUrl, null, 4) + "\n";
        //  console.log(moment().format('YYYY-MM-DD h:m:s A') + ": " + URL);
    }
}


// article list
//passport.authenticate('jwt', { session: false }), 

router.get('/articleList', function (req, res) {
    var status = req.query.status;
    asyn.waterfall([
        function (done) {            
            Article.getAllAdminArticle(status, function (err, result) {
                if (err) {
                    return res.json({ status: 0, 'response': { msg: err } });
                } else {
                    if (result.length > 0) {
                        var response = [];
                        var final_response = [];
                        Promise.all(result.map(function (item) {
                            var temparray = new Promise(function (resolve, reject) {
                                Article.getArticleRoleName(item.article_id, item.role, function (err, data) {
                                    if (data && data.length > 0) {
                                        item.role = data[0].string_agg
                                    }
                                    setTimeout(() => resolve(item), 50)
                                });

                            });
                            return temparray.then(result => {
                                response.push(result);
                                var commentList = response.map(data => {
                                    let retObj = {};
                                    retObj['article_id'] = data.article_id;
                                    retObj['title'] = data.title;
                                    retObj['description'] = data.description;
                                    retObj['created_on'] = moment(data.created_at).format('YYYY-MM-DD');
                                    retObj['role'] = data.role;
                                    retObj['status'] = data.status;
                                    return retObj;
                                }).sort(function (a, b) {
                                    return a.article_id - b.article_id;
                                });
                                final_response = commentList.reverse();
                            })
                        })).then(function () {
                            done(null, final_response);
                        })
                    } else {
                        done(null, final_response);
                    }
                }
            });
        }
    ],
    function (error, finalData) {
        if (error) {
            return res.json({ 'status': 0, 'response': { 'msg': error } });
        } else {
            return res.json({ 'status': 1, 'response': { 'data': finalData, 'msg': 'data found' } });
        }
    });
});

router.get('/draftarticleList', function (req, res) {
    loggerData(req);
    asyn.waterfall([
        function (done) {
            Article.draftarticleList(function (err, result) {
                if (err) {
                    return res.json({ status: 0, 'response': { msg: err } });
                } else {
                    if (result.length > 0) {
                        var response = [];
                        var final_response = [];
                        Promise.all(result.map(function (item) {
                            var temparray = new Promise(function (resolve, reject) {
                                Article.getArticleRoleName(item.article_id, item.role, function (err, data) {
                                    if (data && data.length > 0) {
                                        item.role = data[0].string_agg
                                    }
                                    setTimeout(() => resolve(item), 50)
                                });

                            });
                            return temparray.then(result => {
                                response.push(result);
                                var commentList = response.map(data => {
                                    let retObj = {};
                                    retObj['article_id'] = data.article_id;
                                    retObj['title'] = data.title;
                                    retObj['description'] = data.description;
                                    retObj['created_on'] = moment(data.created_at).format('YYYY-MM-DD');
                                    retObj['role'] = data.role;
                                    retObj['status'] = data.status;
                                    retObj['purchase_type'] = data.purchase_type;
                                    retObj['cost'] = data.cost;
                                    return retObj;
                                }).sort(function (a, b) {
                                    return a.article_id - b.article_id;
                                });
                                final_response = commentList.reverse();
                            })
                        })).then(function () {
                            done(null, final_response);
                        })
                    } else {
                        done(null, final_response);
                    }
                }
            });
        }
    ],
    function (error, finalData) {
        if (error) {
            return res.json({ 'status': 0, 'response': { 'msg': error } });
        } else {
            return res.json({ 'status': 1, 'response': { 'data': finalData, 'msg': 'data found' } });
        }
    });
});

// router.get('/articleList', function (req, res) {
//     loggerData(req);
//     Article.getAllAdminArticle(function (err, result) {
//         if (err) {
//             return res.json({ status: 0, 'response': { msg: err } });
//         } else {
//             var articleList = result.map(data => {
//                 let retObj = {};
//                 retObj['article_id'] = data.article_id;
//                 retObj['title'] = data.title;
//                 retObj['description'] = data.description;
//                 retObj['created_at'] = moment(data.created_at).format('YYYY-MM-DD');
//                 retObj['role'] = data.role;
//                 retObj['status'] = data.status;
//                 return retObj;
//             });
//             return res.json({ status: 1, 'response': { data: articleList } });
//         }
//     });
// });

//get article data - adminside
router.post('/getarticleDataById', [check('article_id', 'article is required').notEmpty()], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let article_id = req.body.article_id;

        asyn.waterfall([
            function (done) {

                Article.getarticleDataById(article_id, function (err, result) {
                    if (err) {
                        done({ 'status': 0, 'response': { 'msg': 'Something went wrong.' } });
                    } else {
                        var imageLink;
                        if (req.headers.host == env.ADMIN_LIVE_URL) {
                            imageLink = env.ADMIN_LIVE_URL;
                        } else {
                            imageLink = env.ADMIN_LIVE_URL;
                        }
                        let article = {};
                        article['article_id'] = result[0].article_id;
                        article['title'] = result[0].title;
                        article['description'] = result[0].description;
                        article['created_at'] = moment(result[0].created_at).format('MMMM DD, YYYY');
                        article['purchase_type'] = result[0].purchase_type;
                        article['image'] = (result[0].image) ? imageLink + env.ARTICLE_VIEW_PATH + result[0].image : '';
                        article['role'] = result[0].role;
                        article['cost'] = result[0].cost;
                        article['status'] = result[0].status;
                        article['tag'] = [];
                        article['draft_status'] = result[0].draft_status;
                        done(err, article)
                    }
                });

            },
            function (article, done) {
                if (article['article_id'] != '') {
                    Article.getTagByArticleId(article['article_id'], function (err, result) {

                        if (result && result.length > 0) {
                            var obj = result.map((data, index) => {
                                let retObj = {};
                                retObj['id'] = (index + 1);
                                retObj['label'] = data.tag_name;
                                retObj['value'] = data.tag_id;
                                return retObj;
                            });
                            article['tag'] = obj;
                            done(null, article)
                        } else {
                            done(null, article)
                        }
                    });
                } else {
                    done(null, article)
                }
            },
            function (article, done2) {
                if (article['role']) {
                    var role = article['role'];
                    Common.getRoleAllList(function (err, result) {
                        if (result && result.length > 0) {

                            var array = [];
                            result.find((o, i) => {                                
                                if (role.includes(o.role_id)) {
                                    array.push(o);                                    
                                }
                            });
                            article['selected_role'] = array;
                            done2(null, article)
                        } else {
                            article['selected_role'] = [];
                            done2(null, article)
                        }
                    });
                } else {
                    article['selected_role'] = [];
                    done2(null, article)
                }
            }, function (article, done2) {

                if (article['selected_role'].length > 0) {
                    article['selected_role'] = article['selected_role'].map((data, index) => {
                        let retObj = {};
                        retObj['id'] = (index + 1);
                        retObj['label'] = data.role;
                        retObj['value'] = data.role_id;
                        return retObj;
                    });
                    done2(null, article)
                } else {
                    done2(null, article)
                }
            }
        ],
            function (error, article) {
                if (error) {
                    return res.json({ 'status': 0, 'response': { 'msg': err } });
                } else {
                    return res.json({ 'status': 1, 'response': { 'data': article, 'msg': 'data found' } });
                }
        });
        
    }
});


router.post('/changearticleStatus', [
    check('article_id', 'article id is required').notEmpty(),
    check('status', 'Please enter status').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let article_id = req.body.article_id;
        let record = {
            status: req.body.status
        }
        Article.changearticleStatus(record, article_id, function (err, result) {
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

router.post('/addarticleByadmin', function (req, res) {
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
                role: (obj.user_role.length > 0) ? obj.user_role : '',
                tag: obj.tag,
                cost: obj.cost,
                purchase_type: obj.purchase_type,
                image:'',
                draft: (obj.draft) ? obj.draft : 0
            };
            asyn.waterfall([
                function (done) {
                    let overview = {};
                    if (typeof files.image !== 'undefined') {
                        let file_ext = files.image.name.split('.').pop();
                        let filename = Date.now() + '-' + files.image.name.split(" ").join("");
                        let tmp_path = files.image.path;
                        if (file_ext == 'png' || file_ext == 'PNG' || file_ext == 'jpg' || file_ext == 'JPG' || file_ext == 'jpeg' || file_ext == 'JPEG') {
                            // fs.rename(tmp_path, path.join(__dirname, env.ARTICLE_PATH + ProfileImage), function (err) {
                            //     overview['image'] = ProfileImage;
                            //     done(err, overview)
                            //     fs.unlink(tmp_path, function () {
                            //         if (err) {
                            //             return res.json({ status: 1, 'response': { msg: err } });
                            //         }
                            //     });
                            // });

                            fs.rename(tmp_path, path.join(__dirname, env.ARTICLE_PATH + filename), function (err) {
                                gm(__dirname + env.ARTICLE_PATH + filename).gravity('Center').thumb(258, 195, __dirname + env.ARTICLE_PATH_THUMB + filename, 100, function (err, data) {
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
                    Article.addarticleByadmin(record, function (err, data) {
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
                    return res.json({ 'status': 1, 'response': { 'msg': 'Article added successfully.', data: userList } });
                }
            });
        }
    });
});

router.post('/updatearticleByadmin', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) return res.json({ status: 1, 'response': { msg: err } });
        var validationErrors = false;
        if (validationErrors == false) {

            var json = fields.data;
            let obj = JSON.parse(json);

            var role = '';

            if (obj.user_role.length > 0) {
                role = obj.user_role.map(data => {
                    return data.value
                }).join(',');
            }

            let update_value = [obj.title, obj.description, moment().format('YYYY-MM-DD'), role, obj.purchase_type, obj.cost]
            let record = {
                title: obj.title,
                description: obj.description,
                created_at: moment().format('YYYY-MM-DD'),
                role: role,
                purchase_type: obj.purchase_type,
                cost: obj.cost
            };
            let article_id = obj.article_id;
            asyn.waterfall([
                function (done) {
                    let overview = {};
                    
                    if (typeof files.image !== 'undefined') {
                        let file_ext = files.image.name.split('.').pop();
                        let filename = Date.now() + '-' + files.image.name.split(" ").join("");
                        let tmp_path = files.image.path;
                        if (file_ext == 'png' || file_ext == 'PNG' || file_ext == 'jpg' || file_ext == 'JPG' || file_ext == 'jpeg' || file_ext == 'JPEG') {

                            fs.rename(tmp_path, path.join(__dirname, env.ARTICLE_PATH + filename), function (err) {
                                gm(__dirname + env.ARTICLE_PATH + filename).gravity('Center').thumb(258, 195, __dirname + env.ARTICLE_PATH_THUMB + filename, 100, function (err, data) {
                                    if (err) {
                                        done("Image upload error", overview)
                                    } else {
                                        overview['image'] = filename;
                                        done(err, overview)
                                    }
                                });
                            });

                            
                            // fs.rename(tmp_path, path.join(__dirname, env.ARTICLE_PATH + ProfileImage), function (err) {
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
                        overview['image'] = '';
                        done(err, overview);
                    }
                },
                function (overview, done1) {
                    if (overview.image != '') { 
                        record.image = overview.image;
                        update_value.push(overview.image);
                    }
                    let tag = (obj.tag) ? obj.tag : [];
                    Article.updatearticleByadmin(record, article_id, update_value, tag, function (err, data) {
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
                    return res.json({ 'status': 1, 'response': { 'msg': 'Article updated successfully.', data: userList } });
                }
            });
        }
    });
});

router.post('/getPaidArticleList', passport.authenticate('jwt', { session: false }), function (req, res) {
    loggerData(req);
    var user_role = req.user.userrole;
    var user_id = req.user.id;
    Article.getPaidArticleList(user_id, user_role, function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var imageLink;
            if (req.headers.host == env.ADMIN_LIVE_URL) {
                imageLink = env.ADMIN_LIVE_URL;
            } else {
                imageLink = env.ADMIN_LIVE_URL;
            }
            var articleList = result.map(data => {
                let retObj = {};
                retObj['article_id'] = data.art_id;
                retObj['title'] = data.title;
                retObj['description'] = data.description;
                retObj['created_at'] = moment(data.article_date).format('MMMM DD, YYYY');
                retObj['role'] = data.role;
                retObj['bookmark_article_id'] = data.bookmark_article_id;
                retObj['image'] = (data.image) ? imageLink + env.ARTICLE_VIEW_PATH + data.image : '';
                retObj['image_thumb'] = (data.image) ? imageLink + env.ARTICLE_VIEW_PATH_THUMB + data.image : '';
                retObj['status'] = data.status;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: articleList } });
        }
    });
});


router.post('/getUnpaidArticleList', function (req, res) {
    loggerData(req);
    Article.getUnpaidArticleList(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var imageLink;
            if (req.headers.host == env.ADMIN_LIVE_URL) {
                imageLink = env.ADMIN_LIVE_URL;
            } else {
                imageLink = env.ADMIN_LIVE_URL;
            }
            var articleList = result.map(data => {
                let retObj = {};
                retObj['article_id'] = data.article_id;
                retObj['title'] = data.title;
                retObj['description'] = data.description;
                retObj['created_at'] = moment(data.article_date).format('MMMM DD, YYYY');
                retObj['role'] = data.role;
                retObj['image'] = (data.image) ? imageLink + env.ARTICLE_VIEW_PATH + data.image : '';
                retObj['image_thumb'] = (data.image) ? imageLink + env.ARTICLE_VIEW_PATH_THUMB + data.image : '';
                retObj['status'] = data.status;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: articleList } });
        }
    });
});


router.post('/getRelatedUnpaidArticleList', function (req, res) {
    loggerData(req);
    let article_id = req.body.article_id;
    Article.getRelatedUnpaidArticleList(article_id, function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var imageLink;
            if (req.headers.host == env.ADMIN_LIVE_URL) {
                imageLink = env.ADMIN_LIVE_URL;
            } else {
                imageLink = env.ADMIN_LIVE_URL;
            }
            var articleList = result.map(data => {
                let retObj = {};
                retObj['article_id'] = data.article_id;
                retObj['title'] = data.title;
                retObj['description'] = data.description;
                retObj['created_at'] = moment(data.article_date).format('MMMM DD, YYYY');
                retObj['role'] = data.role;
                retObj['image'] = (data.image) ? imageLink + env.ARTICLE_VIEW_PATH + data.image : '';
                retObj['status'] = data.status;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: articleList } });
        }
    });
});


router.post('/getRelatedPaidArticleList', passport.authenticate('jwt', { session: false }), function (req, res) {
    loggerData(req);
    var user_role = req.user.userrole;
    let article_id = req.body.article_id;
    Article.getRelatedPaidArticleList(user_role, article_id, function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var imageLink;
            if (req.headers.host == env.ADMIN_LIVE_URL) {
                imageLink = env.ADMIN_LIVE_URL;
            } else {
                imageLink = env.ADMIN_LIVE_URL;
            }
            var articleList = result.map(data => {
                let retObj = {};
                retObj['article_id'] = data.article_id;
                retObj['title'] = data.title;
                retObj['description'] = data.description;
                retObj['created_at'] = moment(data.article_date).format('MMMM DD, YYYY');
                retObj['role'] = data.role;
                retObj['image'] = (data.image) ? imageLink + env.ARTICLE_VIEW_PATH + data.image : '';
                retObj['status'] = data.status;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: articleList } });
        }
    });
});

router.post('/articleBookmark', passport.authenticate('jwt', { session: false }), function (req, res) {
    loggerData(req);
    var user_id = req.user.id;
    let article_id = req.body.article_id;    
    Article.articleBookmark(user_id, article_id, function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {            
            return res.json({ status: 1, 'response': { data: result } });
        }
    });
});


router.post('/purchase_article', [
    check('user_id', 'User is required').notEmpty(),
    check('order_id', 'Order id is required').notEmpty(),
    check('article_id', 'article is required').notEmpty()
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        var obj = {
            user_id: req.body.user_id,
            order_id: req.body.order_id,
            article_id: req.body.article_id
        }

        Article.purchase_article(obj, function (err, result) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                if (result) {
                    return res.json({ 'status': 1, 'response': { 'data': result, 'msg': 'Data found' } });
                } else {
                    return res.json({ 'status': 0, 'response': { 'data': [], 'msg': 'Data not found' } });
                }
            }
        });
    }
});

router.post('/changeDraftArticleStatus', [
    check('article_id', 'article id is required').notEmpty(),
    check('draft_status', 'Please enter status').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let article_id = req.body.article_id;
        let record = {
            draft_status: req.body.draft_status
        }
        Article.changeDraftArticleStatus(record, article_id, function (err, result) {
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



router.post('/getBookMarkArticle', passport.authenticate('jwt', { session: false }), function (req, res) {

    var user_id = req.user.id;
    var user_role = req.user.userrole;
    Article.getBookMarkArticle(user_id, user_role, function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var imageLink;
            if (req.headers.host == env.ADMIN_LIVE_URL) {
                imageLink = env.ADMIN_LIVE_URL;
            } else {
                imageLink = env.ADMIN_LIVE_URL;
            }
            var articleList = result.map(data => {
                let retObj = {};
                retObj['article_id'] = data.b_id;
                retObj['title'] = data.title;
                retObj['description'] = data.description;
                retObj['created_at'] = moment(data.article_date).format('MMMM DD, YYYY');
                retObj['role'] = data.role;
                retObj['image'] = (data.image) ? imageLink + env.ARTICLE_VIEW_PATH + data.image : '';
                retObj['status'] = data.status;
                retObj['bookmark_article_id'] = data.bookmark_article_id;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: articleList } });
        }
    });
});

module.exports = router;