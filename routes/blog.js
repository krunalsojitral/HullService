"use strict";

var express = require('express');
var { check, validationResult } = require("express-validator");

var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var env = require('../config/env');
var Blog = require('../models/blog');
var Common = require('../models/common');
var path = require('path');
var fs = require('fs');
var asyn = require('async');
var helper = require('../config/helper');
var moment = require('moment');
var formidable = require('formidable');
const gm = require('gm');

function loggerData(req) {
    if (env.DEBUG) {
        var URL = "Url:-" + JSON.stringify(req.originalUrl, null, 4) + "\n";
        //  console.log(moment().format('YYYY-MM-DD h:m:s A') + ": " + URL);
    }
}


// blog list
//passport.authenticate('jwt', { session: false }), 
// router.get('/blogList', function (req, res) {
//     loggerData(req);
//     Blog.getAllAdminBlog(function (err, result) {
//         if (err) {
//             return res.json({ status: 0, 'response': { msg: err } });
//         } else {
//             var blogList = result.map(data => {
//                 let retObj = {};
//                 retObj['blog_id'] = data.blog_id;
//                 retObj['title'] = data.title;
//                 retObj['description'] = data.description;
//                 retObj['created_at'] = moment(data.created_at).format('YYYY-MM-DD');
//                 retObj['role'] = data.role;
//                 retObj['status'] = data.status;
//                 return retObj;
//             });
//             return res.json({ status: 1, 'response': { data: blogList } });
//         }
//     });
// });

router.get('/blogList', function (req, res) {    
    var status = req.query.status;
    asyn.waterfall([
        function (done) {
            Blog.getAllAdminBlog(status, function (err, result) {
                if (err) {
                    return res.json({ status: 0, 'response': { msg: err } });
                } else {
                    if (result.length > 0) {
                        var response = [];
                        var final_response = [];
                        Promise.all(result.map(function (item) {
                            var temparray = new Promise(function (resolve, reject) {
                                Blog.getBlogRoleName(item.blog_id, item.role, function (err, data) {
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
                                    retObj['blog_id'] = data.blog_id;
                                    retObj['title'] = data.title;
                                    retObj['description'] = data.description;
                                    retObj['created_on'] = moment(data.created_at).format('YYYY-MM-DD');
                                    retObj['role'] = data.role;
                                    retObj['isChecked'] = false;
                                    retObj['status'] = data.status;
                                    retObj['views'] = (data.total_view) ? data.total_view : 0;
                                    return retObj;
                                }).sort(function (a, b) {
                                    return a.blog_id - b.blog_id;
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
            if (finalData){
                return res.json({ 'status': 1, 'response': { 'data': finalData, 'msg': 'data found' } });
            }else{
                return res.json({ 'status': 1, 'response': { 'data': [], 'msg': 'data found' } });
            }
        }
    });
});


//get blog data - adminside
router.post('/getBlogDataById', [check('blog_id', 'Blog is required').notEmpty()], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let blog_id = req.body.blog_id;
        asyn.waterfall([
            function (done) {

                Blog.getBlogDataById(blog_id, function (err, result) {
                    if (err) {
                        done({ 'status': 0, 'response': { 'msg': 'Something went wrong.' } });
                    } else {
                        var imageLink;
                        if (req.headers.host == env.ADMIN_LIVE_URL) {
                            imageLink = env.ADMIN_LIVE_URL;
                        } else {
                            imageLink = env.ADMIN_LIVE_URL;
                        }
                        let blog = {};
                        blog['blog_id'] = result[0].blog_id;
                        blog['title'] = result[0].title;
                        blog['description'] = result[0].description;
                        blog['created_at'] = moment(result[0].created_at).format('MMMM DD, YYYY');
                        blog['cost'] = result[0].cost;
                        blog['purchase_type'] = result[0].purchase_type;
                        blog['image'] = (result[0].image) ? imageLink + env.BLOG_VIEW_PATH + result[0].image : '';
                        blog['role'] = result[0].role;
                        blog['status'] = result[0].status;
                        blog['blog_order'] = '';
                        blog['tag'] = [];
                        blog['draft_status'] = result[0].draft_status;
                        done(err, blog)
                    }
                });           
            },
            function (blog, done1) {
                if (blog['blog_id'] != '') {
                    Blog.getTagByBlogId(blog['blog_id'], function (err, result) {
                        if (result && result.length > 0) {
                            var obj = result.map((data, index) => {
                                let retObj = {};
                                retObj['id'] = (index + 1);
                                retObj['label'] = data.tag_name;
                                retObj['value'] = data.tag_id;
                                return retObj;
                            });
                            blog['tag'] = obj;
                            done1(null, blog)
                        } else {
                            done1(null, blog)
                        }
                    });
                } else {
                    done1(null, blog)
                }
            },
            function (blog, done2) {
                if (blog['role']) {
                    var role = blog['role'];                    
                    Common.getRoleAllList(function (err, result) {
                        if (result && result.length > 0) {
                            var array = [];
                            result.find((o, i) => {                                   
                                if (role.includes(o.role_id)) {
                                    array.push(o);
                                }
                            });
                            blog['selected_role'] = array;                           
                            done2(null, blog)
                        } else {
                            blog['selected_role'] = [];
                            done2(null, blog)
                        }
                    });
                } else {
                    blog['selected_role'] = [];
                    done2(null, blog)
                }
            }, function (blog, done2) { 

                if (blog['selected_role'].length > 0){
                    blog['selected_role'] = blog['selected_role'].map((data, index) => {
                        let retObj = {};
                        retObj['id'] = (index + 1);
                        retObj['label'] = data.role;
                        retObj['value'] = data.role_id;
                        return retObj;
                    });
                    done2(null, blog)
                }else{
                    done2(null, blog)
                }                            
            }           

        ],
            function (error, blog) {
                if (error) {
                    return res.json({ 'status': 0, 'response': { 'msg': error } });
                } else {
                    return res.json({ 'status': 1, 'response': { 'data': blog, 'msg': 'data found' } });
                }
        });

    }
});

router.post('/getBlogDataByIdAfterLogin', passport.authenticate('jwt', { session: false }), [check('blog_id', 'Blog is required').notEmpty()], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let blog_id = req.body.blog_id;
        let user_id = req.user.id;
        asyn.waterfall([
            function (done) {

                Blog.getBlogDataByIdAfterLogin(blog_id, user_id, function (err, result) {
                    if (err) {
                        done({ 'status': 0, 'response': { 'msg': 'Something went wrong.' } });
                    } else {
                        var imageLink;
                        if (req.headers.host == env.ADMIN_LIVE_URL) {
                            imageLink = env.ADMIN_LIVE_URL;
                        } else {
                            imageLink = env.ADMIN_LIVE_URL;
                        }
                        let blog = {};
                        blog['blog_id'] = result[0].b_id;
                        blog['title'] = result[0].title;
                        blog['description'] = result[0].description;
                        blog['created_at'] = moment(result[0].blog_date).format('MMMM DD, YYYY');
                        blog['cost'] = result[0].cost;
                        blog['purchase_type'] = result[0].purchase_type;
                        blog['image'] = (result[0].image) ? imageLink + env.BLOG_VIEW_PATH + result[0].image : '';
                        blog['role'] = result[0].role;
                        blog['status'] = result[0].status;
                        blog['blog_order'] = result[0].blog_order_id;
                        blog['tag'] = [];
                        blog['draft_status'] = result[0].draft_status;
                        done(err, blog)
                    }
                });
            },
            function (blog, done1) {
                if (blog['blog_id'] != '') {
                    Blog.getTagByBlogId(blog['blog_id'], function (err, result) {
                        if (result && result.length > 0) {
                            var obj = result.map((data, index) => {
                                let retObj = {};
                                retObj['id'] = (index + 1);
                                retObj['label'] = data.tag_name;
                                retObj['value'] = data.tag_id;
                                return retObj;
                            });
                            blog['tag'] = obj;
                            done1(null, blog)
                        } else {
                            done1(null, blog)
                        }
                    });
                } else {
                    done1(null, blog)
                }
            },
            function (blog, done2) {
                if (blog['role']) {
                    var role = blog['role'];
                    Common.getRoleAllList(function (err, result) {
                        if (result && result.length > 0) {
                            var array = [];
                            result.find((o, i) => {
                                if (role.includes(o.role_id)) {
                                    array.push(o);
                                }
                            });
                            blog['selected_role'] = array;
                            done2(null, blog)
                        } else {
                            blog['selected_role'] = [];
                            done2(null, blog)
                        }
                    });
                } else {
                    blog['selected_role'] = [];
                    done2(null, blog)
                }
            }, function (blog, done2) {

                if (blog['selected_role'].length > 0) {
                    blog['selected_role'] = blog['selected_role'].map((data, index) => {
                        let retObj = {};
                        retObj['id'] = (index + 1);
                        retObj['label'] = data.role;
                        retObj['value'] = data.role_id;
                        return retObj;
                    });
                    done2(null, blog)
                } else {
                    done2(null, blog)
                }
            }

        ],
            function (error, blog) {
                if (error) {
                    return res.json({ 'status': 0, 'response': { 'msg': error } });
                } else {
                    return res.json({ 'status': 1, 'response': { 'data': blog, 'msg': 'data found' } });
                }
            });

    }
});


router.post('/changeBlogStatus', [
    check('blog_id', 'Blog id is required').notEmpty(),
    check('status', 'Please enter status').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let blog_id = req.body.blog_id;
        let record = {
            status: req.body.status
        }
        Blog.changeBlogStatus(record, blog_id, function (err, result) {
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

router.post('/changeDraftBlogStatus', [
    check('blog_id', 'Blog id is required').notEmpty(),
    check('draft_status', 'Please enter status').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let blog_id = req.body.blog_id;
        let record = {
            draft_status: req.body.draft_status
        }
        Blog.changeDraftBlogStatus(record, blog_id, function (err, result) {
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

router.post('/addBlogByadmin', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) return res.json({ status: 1, 'response': { msg: err } });
        var validationErrors = false;
        if (validationErrors == false) {

            var json = fields.data;
            let obj = JSON.parse(json);
           
            let record = {
                title: obj.title,
                tag: obj.tag,
                description: obj.description,
                created_at: moment().format('YYYY-MM-DD'),
                role: (obj.user_role.length > 0) ? obj.user_role : '',
                purchase_type: obj.purchase_type,
                cost: obj.cost,
                draft: obj.draft
            };
            asyn.waterfall([
                function (done) {
                    let overview = {};
                    
                    if (typeof files.image !== 'undefined') {
                        let file_ext = files.image.name.split('.').pop();
                        let filename = Date.now() + '-' + files.image.name.split(" ").join("");
                        let tmp_path = files.image.path;
                        if (file_ext == 'png' || file_ext == 'PNG' || file_ext == 'jpg' || file_ext == 'JPG' || file_ext == 'jpeg' || file_ext == 'JPEG') {
                            
                            fs.rename(tmp_path, path.join(__dirname,env.BLOG_PATH+filename), function (err) {
                                gm(__dirname+env.BLOG_PATH+filename).gravity('Center').thumb(258, 195, __dirname+env.BLOG_PATH_THUMB+filename, 100, function (err, data) {
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
                    
                    if (record.role.length > 0) {                        
                        record.role = record.role.map(data => {
                            return data.value
                        }).join(',');                                                 
                    }
                    
                    Blog.addBlogByadmin(record, function (err, data) {
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
                    return res.json({ 'status': 1, 'response': { 'msg': 'Blog added successfully.', data: userList } });
                }
            });
        }
    });
});

router.post('/updateBlogByadmin', function (req, res) {
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
            let blog_id = obj.blog_id;
            asyn.waterfall([
                function (done) {
                    let overview = {};
                    
                    if (typeof files.image !== 'undefined') {
                        let file_ext = files.image.name.split('.').pop();
                        let filename = Date.now() + '-' + files.image.name.split(" ").join("");
                        let tmp_path = files.image.path;
                        if (file_ext == 'png' || file_ext == 'PNG' || file_ext == 'jpg' || file_ext == 'JPG' || file_ext == 'jpeg' || file_ext == 'JPEG') {
                            // fs.rename(tmp_path, path.join(__dirname, env.BLOG_PATH + ProfileImage), function (err) {
                            //     overview['image'] = ProfileImage;
                            //     done(err, overview)
                            //     fs.unlink(tmp_path, function () {
                            //         if (err) {
                            //             return res.json({ status: 1, 'response': { msg: err } });
                            //         }
                            //     });
                            // });

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
                    if (overview.image != '') { 
                        record.image = overview.image;
                        update_value.push(overview.image);
                    }                   
                    
                    let tag = (obj.tag) ? obj.tag : [];
                    Blog.updateBlogByadmin(record, blog_id, update_value, tag, function (err, data) {
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
                    return res.json({ 'status': 1, 'response': { 'msg': 'Blog updated successfully.', data: userList } });
                }
            });
        }
    });
});

router.post('/getPaidBlogList', passport.authenticate('jwt', { session: false }),  function (req, res) {
    loggerData(req);    
    var user_role = req.user.userrole;
    var user_id = req.user.id;
    Blog.getPaidBlogList(user_role, user_id, function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var imageLink;
            if (req.headers.host == env.ADMIN_LIVE_URL) {
                imageLink = env.ADMIN_LIVE_URL;
            } else {
                imageLink = env.ADMIN_LIVE_URL;
            }            
            var blogList = result.map(data => {
                let retObj = {};
                retObj['blog_id'] = data.b_id;
                retObj['title'] = data.title;
                retObj['blog_order_id'] = data.blog_order_id;                
                retObj['description'] = data.description;
                retObj['created_at'] = moment(data.blog_date).format('MMMM DD, YYYY');
                retObj['role'] = data.role;
                retObj['bookmark_blog_id'] = data.bookmark_blog_id;
                retObj['image'] = (data.image) ? imageLink + env.BLOG_VIEW_PATH + data.image : '';                
                retObj['image_thumb'] = (data.image) ? imageLink + env.BLOG_VIEW_PATH_THUMB + data.image : '';                
                retObj['status'] = data.status;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: blogList } });
        }
    });
});

router.post('/getUnpaidBlogList', function (req, res) {
    loggerData(req);
    Blog.getUnpaidBlogList(function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var imageLink;
            if (req.headers.host == env.ADMIN_LIVE_URL) {
                imageLink = env.ADMIN_LIVE_URL;
            } else {
                imageLink = env.ADMIN_LIVE_URL;
            }
            var blogList = result.map(data => {
                let retObj = {};
                retObj['blog_id'] = data.blog_id;
                retObj['title'] = data.title;
                retObj['description'] = data.description;
                retObj['created_at'] = moment(data.blog_date).format('MMMM DD, YYYY');
                retObj['role'] = data.role;
                retObj['image'] = (data.image) ? imageLink + env.BLOG_VIEW_PATH + data.image : '';
                retObj['image_thumb'] = (data.image) ? imageLink + env.BLOG_VIEW_PATH_THUMB + data.image : '';
                retObj['status'] = data.status;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: blogList } });
        }
    });
});

router.post('/getRelatedUnpaidBlogList',  function (req, res) {
    loggerData(req);    
    let blog_id = req.body.blog_id;
    Blog.getRelatedUnpaidBlogList(blog_id, function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var imageLink;
            if (req.headers.host == env.ADMIN_LIVE_URL) {
                imageLink = env.ADMIN_LIVE_URL;
            } else {
                imageLink = env.ADMIN_LIVE_URL;
            }
            var blogList = result.map(data => {
                let retObj = {};
                retObj['blog_id'] = data.blog_id;
                retObj['title'] = data.title;
                retObj['description'] = data.description;
                retObj['created_at'] = moment(data.blog_date).format('MMMM DD, YYYY');
                retObj['role'] = data.role;
                retObj['image'] = (data.image) ? imageLink + env.BLOG_VIEW_PATH + data.image : '';
                retObj['status'] = data.status;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: blogList } });
        }
    });
});

router.post('/getRelatedPaidBlogList', passport.authenticate('jwt', { session: false }), function (req, res) {
    loggerData(req);
    var user_role = req.user.userrole;
    let blog_id = req.body.blog_id;
    Blog.getRelatedPaidBlogList(user_role, blog_id, function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var imageLink;
            if (req.headers.host == env.ADMIN_LIVE_URL) {
                imageLink = env.ADMIN_LIVE_URL;
            } else {
                imageLink = env.ADMIN_LIVE_URL;
            }
            var blogList = result.map(data => {
                let retObj = {};
                retObj['blog_id'] = data.blog_id;
                retObj['title'] = data.title;
                retObj['description'] = data.description;
                retObj['created_at'] = moment(data.blog_date).format('MMMM DD, YYYY');
                retObj['role'] = data.role;
                retObj['image'] = (data.image) ? imageLink + env.BLOG_VIEW_PATH + data.image : '';
                retObj['status'] = data.status;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: blogList } });
        }
    });
});

router.post('/blogBookmark', passport.authenticate('jwt', { session: false }), function (req, res) {
    loggerData(req);
    var user_id = req.user.id;
    let blog_id = req.body.blog_id;
    Blog.blogBookmark(user_id, blog_id, function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            return res.json({ status: 1, 'response': { data: result } });
        }
    });
});

router.post('/purchase_blog', [
    check('user_id', 'User is required').notEmpty(),
    check('order_id', 'Order id is required').notEmpty(),
    check('blog_id', 'blog is required').notEmpty()
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        var obj = {
            user_id: req.body.user_id,
            order_id: req.body.order_id,
            blog_id: req.body.blog_id,
            created_at: moment().format('YYYY-MM-DD')
        }

        Blog.purchase_blog(obj, function (err, result) {
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

router.post('/getBookMarkBlog', passport.authenticate('jwt', { session: false }), function (req, res) {

    var user_id = req.user.id;
    var user_role = req.user.userrole;
    Blog.getBookMarkBlog(user_id, user_role, function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var imageLink;
            if (req.headers.host == env.ADMIN_LIVE_URL) {
                imageLink = env.ADMIN_LIVE_URL;
            } else {
                imageLink = env.ADMIN_LIVE_URL;
            }
            var blogList = result.map(data => {
                let retObj = {};
                retObj['blog_id'] = data.b_id;
                retObj['title'] = data.title;
                retObj['description'] = data.description;
                retObj['created_at'] = moment(data.blog_date).format('MMMM DD, YYYY');
                retObj['role'] = data.role;                
                retObj['image'] = (data.image) ? imageLink + env.BLOG_VIEW_PATH + data.image : '';
                retObj['status'] = data.status;
                retObj['bookmark_blog_id'] = data.bookmark_blog_id;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: blogList } });
        }
    });
});

router.get('/draftblogList', function (req, res) {
    loggerData(req);
    asyn.waterfall([
        function (done) {
            Blog.draftblogList(function (err, result) {
                if (err) {
                    return res.json({ status: 0, 'response': { msg: err } });
                } else {
                    if (result.length > 0) {
                        var response = [];
                        var final_response = [];
                        Promise.all(result.map(function (item) {
                            var temparray = new Promise(function (resolve, reject) {
                                Blog.getBlogRoleName(item.blog_id, item.role, function (err, data) {                                    
                                    if (data && data.length > 0) {                                        
                                        item.role = data[0].string_agg
                                    }else{
                                        item.role = ''
                                    }
                                    setTimeout(() => resolve(item), 50)
                                });
                            });
                            return temparray.then(result => {
                                response.push(result);
                                var commentList = response.map(data => {
                                    let retObj = {};
                                    retObj['blog_id'] = data.blog_id;
                                    retObj['title'] = data.title;
                                    retObj['description'] = data.description;
                                    retObj['created_on'] = moment(data.created_at).format('YYYY-MM-DD');
                                    retObj['role'] = (data.role) ? data.role : '';
                                    retObj['status'] = data.status;
                                    retObj['purchase_type'] = data.purchase_type;
                                    retObj['cost'] = data.cost;
                                    return retObj;
                                }).sort(function (a, b) {
                                    return a.blog_id - b.blog_id;
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

router.post('/deleteBlog', [
    check('blog', 'Blog is required').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else { 
        loggerData(req);
        let blog = req.body.blog;
        Blog.deleteBlog(blog, function (err, result) {
            if (err) {
                return res.json({ status: 0, 'response': { msg: err } });
            } else {
                return res.json({ status: 1, 'response': { msg: 'Blog deleted successfully', data: result } });
            }
        });
    }    
});

router.post('/addView', [
    check('blog_id', 'Blog is required').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        loggerData(req);
        let blog_id = req.body.blog_id;
        Blog.addView(blog_id, function (err, result) {
            if (err) {
                return res.json({ status: 0, 'response': { msg: err } });
            } else {
                return res.json({ status: 1, 'response': { msg: 'Blog view successfully', data: result } });
            }
        });
    }
});



module.exports = router;