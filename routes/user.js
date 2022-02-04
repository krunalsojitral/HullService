"use strict";

var express = require('express');
var { check, validationResult } = require("express-validator");

var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var env = require('../config/env');
var User = require('../models/user');
var mustache = require('mustache');
var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
const nodeMailerCredential = require('./../EmailCredential');
var shortid = require('shortid');
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

router.post('/login', [
    check('email', 'Please enter valid email').isEmail(),
    check('email', 'Please enter email').notEmpty(),
    check('password', 'Please enter password').notEmpty()
], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        var password = req.body.password;
        User.checkUser(req, function (err, data) {
            if (err) {
                res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                let totalrecord = data.length;
                if (totalrecord) {
                    let dbPassword = (data[0].password).trim();
                    password = req.body.password;
                    var jsonUser = JSON.stringify(data[0]);
                    var token = jwt.sign(jsonUser, env.SECRET, {});
                    bcrypt.compare(password, dbPassword, function (err, doesMatch) {
                        if (err) {
                            res.json({ 'status': 0, 'response': { 'msg': 'Error Occured.' } });
                        } else {
                            if (doesMatch) {
                                let userList = {};
                                userList = {
                                    'id': data[0].id,
                                    'first_name': data[0].first_name,
                                    'last_name': data[0].last_name,                                    
                                    // 'usertype': data[0].usertype,
                                    // 'country': data[0].country,
                                    'email': data[0].email,
                                    'userRole': (data[0].userrole) ? data[0].userrole : '',
                                };
                                res.json({ 'status': 1, 'response': { 'msg': 'Login successfully.', 'token': 'JWT ' + token, 'data': userList } });
                            } else {
                                res.json({ 'status': 0, 'response': { 'msg': 'Incorrect password.' } });
                            }
                        }
                    });
                } else {
                    return res.json({ 'status': 0, 'response': { 'msg': data } });
                }
            }
        });
    }
});


//forgot password send
router.post('/forgot-password', [
    check('email', 'Please enter valid email').isEmail(),
    check('email', 'Please enter email').notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        loggerData(req);
        var hostname = req.headers.host;
        var email = req.body.email;
        User.checkUserRegistration(email, (err, data) => {
            if (err) throw err;
            if (data.length) {
                var token = shortid.generate() + Date.now();
                var user_id = data[0].id;
                let record = {
                    reset_password_token: token
                }
                User.userProfileUpdate(record, user_id, function (req, result) {
                    var resetLink;
                    var logo;
                    var home_url;
                    if (hostname == env.LIVE_HOST_USER_APP) {
                        home_url = env.APP_URL
                        logo = env.APP_URL + '/assets/img/gatelogo.png';
                        resetLink = env.APP_URL + 'reset-password?resetcode=' + token
                    } else {
                        home_url = env.APP_URL
                        logo = env.APP_URL + '/assets/img/gatelogo.png';
                        resetLink = env.APP_URL + 'reset-password?resetcode=' + token
                    }

                    var htmlUser = fs.readFileSync(__dirname + '/templates/resetPassword/resetPassword.html', 'utf8');
                    var dynamicHtml = {
                        logo: logo,
                        resetLink: resetLink,
                        home_url: home_url
                    }
                    var view = { data: dynamicHtml };
                    var finalHtmlUser = mustache.render(htmlUser, view);

                    // send email via nodemailer
                    let transporter = nodemailer.createTransport(nodeMailerCredential); // node mailer credentials
                    let mailOptions = {
                        from: env.MAIL_FROM,
                        to: data[0].email,
                        subject: 'Password Reset',
                        html: finalHtmlUser.replace(/&#x2F;/g, '/')
                    };

                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {                            
                            return res.json({ status: 0, response: { msg: 'There was an email error', } });
                        } else {
                            return res.json({ status: 1, response: { msg: 'We have emailed you a link to reset your password.', } });
                        }
                    });
                });
            } else {
                return res.json({ status: 0, 'response': { msg: "We can't find a user with this Email" } });
            }
        });
    }
});

// Reset new Password from reset token
router.post('/reset-password', [
    check('reset_password_token', 'Reset password token is required').notEmpty(),
    check('password', 'New password is required').notEmpty()
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        loggerData(req);
        let password = req.body.password;
        let reset_password_token = req.body.reset_password_token;
        User.checkResetUser(reset_password_token, function (req, result) {
            if (result.length) {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        let record1 = {
                            'password': hash
                        }
                        User.passwordUpdate(record1, reset_password_token, function (err, data) {
                            if (err) {
                                return res.json({ status: 0, 'response': { msg: err } });
                            } else {
                                return res.json({ status: 1, 'response': { msg: 'Password is updated successfully.' } });
                            }
                        });
                    });
                });
            } else {
                return res.json({ status: 0, 'response': { msg: 'Password reset token is invalid or has expired.' } });
            }
        });
    }
});

router.post('/register', (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        
        let overview = {};
        asyn.waterfall([
            function (done) {
                var email = req.body.email;
                User.checkUserRegistration(email, function (err, data) {
                    let totalrecord = data.length;
                    if (totalrecord) {
                        return res.json({ status: 0, 'response': { msg: 'Email already exists.' } });
                    } else {
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(req.body.password, salt, (err, hash) => {
                                let record = {
                                    first_name: req.body.first_name,
                                    last_name: req.body.last_name,
                                    email: req.body.email,
                                    organization: (req.body.organization) ? req.body.organization :'',
                                    city: (req.body.city) ? req.body.city : '',
                                    lat: (req.body.latitude) ? req.body.latitude : '',
                                    long: (req.body.longitude) ? req.body.longitude : '',
                                    country: (req.body.country) ? req.body.country : '',
                                    level_of_education: (req.body.level_of_education) ? req.body.level_of_education : '',
                                    occupation: (req.body.occupation) ? req.body.occupation : '',
                                    sector: (req.body.sector) ? req.body.sector : '',
                                    academic_discipline: (req.body.academic_discipline) ? req.body.academic_discipline : '',
                                    password: hash,                                    
                                    status: 0,
                                    role: req.body.role,
                                    email_verification_token: shortid.generate() + Date.now(),
                                    created_at: moment.utc().format('YYYY-MM-DD'),
                                    professional_interest_of_area: req.body.professional_interest_of_area,
                                    researcher_interest_of_area: req.body.researcher_interest_of_area,
                                    other_sector: (req.body.other_sector) ? req.body.other_sector: '',
                                    other_academic_discipline: (req.body.other_academic_discipline) ? req.body.other_academic_discipline: '',
                                    other_occupation: (req.body.other_occupation) ? req.body.other_occupation: '',
                                    other_professional_interest_area: (req.body.other_professional_interest_area) ? req.body.other_professional_interest_area: '',
                                    other_research_interest_area: (req.body.other_research_interest_area) ? req.body.other_research_interest_area: '',
                                };
                                
                                overview['data'] = record;
                                done(err, overview);
                            })
                        })
                    }
                });
            },
            function (overview, done1) { 
                var organization = overview.data.organization;
                User.checkUserOrganization(organization, function (err, data) {
                    let org_record = data;
                    if (org_record) {
                        overview.data.organization = org_record[0].organization_id;
                        done1(err, overview);
                    } else {
                        overview.data.organization = '';
                        done1(err, overview);
                    }
                });
            },
            function (overview, done2) {                
                User.addUser(overview.data, async function (err, data) {
                    var hostname = req.headers.host;
                    var user_id = data[0].id;

                    User.getUserById(user_id, function (err, data) {

                        var resetLink;
                        var home_url;
                        var admin_app_url;

                        if (hostname == env.LOCAL_HOST_USER_APP) {
                            home_url = env.APP_URL;
                            resetLink = env.APP_URL + 'activation-account?activationcode=' + overview.data.email_verification_token;
                            admin_app_url = env.ADMIN_APP_URL
                        } else {
                            home_url = env.APP_URL;
                            resetLink = env.APP_URL + 'activation-account?activationcode=' + overview.data.email_verification_token
                            admin_app_url = env.ADMIN_APP_URL
                        }

                        var htmlUser = fs.readFileSync(__dirname + '/templates/userRegistration/userRegistration.html', 'utf8');

                        var dynamicHtml = {
                            home_url: home_url,
                            fullname: data[0].firstName,
                            resetLink: resetLink
                        }

                        var view = { data: dynamicHtml };
                        var finalHtmlUser = mustache.render(htmlUser, view);
                        let transporter = nodemailer.createTransport(nodeMailerCredential); // node mailer credentials
                        let mailOptions1 = {
                            from: env.MAIL_FROM, // sender address
                            to: data[0].email,
                            subject: 'Verify your email address',
                            html: finalHtmlUser.replace(/&#x2F;/g, '/')
                        };
                        transporter.sendMail(mailOptions1, (error, info) => {
                            if (error) {
                                console.log(error);
                                //return res.json({status: 0, response : { msg: 'There was an email error',}  });
                            } else {
                            }
                        });
                        return res.json({ status: 1, response: { msg: 'Your payment was successful. We have sent you a confirmation link to your email address. Please click on the link to verify/validate your account. Thank You!.', } });

                    });
                });
            }
        ]);
    }
});

router.post('/checkEmail', [
    check('email', 'Email is required').notEmpty(),
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        var email = req.body.email;
        User.checkUserRegistration(email, function (err, data) {
            if (err) {
                return res.json({ status: 0, 'response': { msg: err } });
            } else {
                let totalrecord = data.length;
                if (totalrecord) {
                    return res.json({ status: 0, 'response': { msg: 'Sorry, email already exists.' } });
                } else {
                    return res.json({ status: 1, response: { msg: 'Email is not exists.' } });
                }
            }
        });
       
    }
});



// user list
router.post('/userList', function (req, res) {
    loggerData(req);
    var role = req.body.role;
    var status = req.body.status;
    User.getAllAdminUsers(role,status, function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            var userList = result.map(data => {

                var first_name = ''
                if (data.first_name){ first_name = data.first_name }
                var last_name = ''
                if (data.last_name) { last_name = data.last_name }

                let retObj = {};
                retObj['id'] = data.id;
                retObj['name'] = first_name + ' ' + last_name;
                retObj['phone'] = data.phone;
                retObj['created_at'] = moment(data.created_at).format('YYYY-MM-DD');
                retObj['joining_date'] = moment(data.created_at).format('YYYY-MM-DD');
                retObj['role'] = data.role;
                retObj['email_verification_token'] = data.email_verification_token;                
                retObj['email'] = data.email;                
                retObj['status'] = data.status;
                return retObj;
            });
            return res.json({ status: 1, 'response': { data: userList } });
        }
    });
});


router.post('/csvuserList', function (req, res) {
    loggerData(req);
    var role = req.body.role;
    var status = req.body.status;
    User.getCSVAdminUser(role, status, function (err, result) {
        if (err) {
            return res.json({ status: 0, 'response': { msg: err } });
        } else {
            let temparray = new Promise(async (resolve, reject) => {
                for (let userdata of result) {
                    await User.getUserInterestAreaById(userdata.id, userdata.role_id, function (err, interestresult) {                        
                        if (interestresult && interestresult.length > 0) {
                            userdata.csvString = Array.from(interestresult.values(), v => v.name).join(", ");
                        } else {
                            userdata.csvString = '';
                        }
                    });
                }
                setTimeout(() => resolve(result), 40)
            });
            temparray.then(result => {

                var participateList = result.map((data, index) => {
                    let retObj = {};
                    retObj['id'] = data.id;
                    retObj['no'] = index + 1;
                    retObj['name'] = data.first_name + ' ' + data.last_name;
                    retObj['email'] = data.email;
                    retObj['city'] = data.city;
                    retObj['organization'] = data.organizationname;
                    retObj['rinterestarea'] = data.rinterestarea;
                    retObj['sectorname'] = data.sectorname;
                    retObj['occupationname'] = data.occupationname;
                    retObj['academicdisciplinename'] = data.academicdisciplinename;
                    retObj['level_of_education'] = data.level_of_education;
                    retObj['pinterestarea'] = data.csvString;
                    return retObj;
                });
                if (participateList.length > 0){
                    return res.json({ status: 1, 'response': { data: participateList } });
                }else{
                    return res.json({ status: 1, 'response': { data: [] } });
                }
            })
        }
    });
});


// Email Varification
router.post('/email-varification', [
    check('email_verify_token', 'Reset password token is required').notEmpty()
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        loggerData(req);
        let email_verify_token = req.body.email_verify_token;
        User.checkEmailVerifyUser(email_verify_token, function (req, result) {
            if (result.length) {
                let record1 = { 'status': 1 }
                User.emailTokenUpdate(record1, email_verify_token, function (err, data) {
                    if (err) {
                        return res.json({ status: 0, 'response': { msg: err } });
                    } else {
                        return res.json({ status: 1, 'response': { msg: 'Verification Successfully.' } });
                    }
                });
            } else {
                return res.json({ status: 0, 'response': { msg: 'Reset token is invalid.' } });
            }
        });

    }
});


//get user data - adminside
router.post('/getuserData', [
    check('user_id', 'User is required').notEmpty(),
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let user_id = req.body.user_id;
        User.getUserById(user_id, function (err, result) {        
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                if (result != '') {
                    let userList = {};
                    userList['id'] = result[0].id;
                    userList['name'] = result[0].name;
                    userList['phone'] = result[0].phone;
                    userList['email'] = result[0].email;
                    userList['password'] = result[0].password;
                    return res.json({ 'status': 1, 'response': { 'data': userList, 'msg': 'data found' } });
                } else {
                    return res.json({ 'status': 1, 'response': { 'data': {}, 'msg': 'data found' } });
                }
            }
        });
    }
});

router.post('/getAdminUserById', [
    check('user_id', 'User is required').notEmpty(),
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let user_id = req.body.user_id;
        User.getAdminUserById(user_id, function (err, result) {
            if (err) {
                return res.json({ 'status': 0, 'response': { 'msg': err } });
            } else {
                if (result != '') {

                    User.getUserInterestAreaById(user_id, result[0].role_id, function (err, interestresult) {
                        var csvString = '';
                        if (interestresult && interestresult.length > 0){
                            csvString = Array.from(interestresult.values(), v => v.name).join(", "); 
                        } else{
                            csvString = '';
                        }

                        let userList = {};
                        userList['id'] = result[0].id;
                        userList['first_name'] = result[0].first_name;
                        userList['last_name'] = result[0].last_name;
                        userList['email'] = result[0].email;
                        userList['city'] = result[0].city;
                        userList['organization'] = result[0].organization_name;
                        userList['rinterestarea'] = result[0].rinterestarea;
                        userList['sectorname'] = result[0].sectorname;
                        userList['occupationname'] = result[0].occupationname;
                        userList['academicdisciplinename'] = result[0].academicdisciplinename;
                        userList['level_of_education'] = result[0].level_of_education;
                        userList['other_sector'] = result[0].other_sector;
                        userList['other_academic_discipline'] = result[0].other_academic_discipline;
                        userList['other_occupation'] = result[0].other_occupation;
                        userList['other_professional_interest_area'] = result[0].other_professional_interest_area;
                        userList['other_research_interest_area'] = result[0].other_research_interest_area;
                        userList['pinterestarea'] = csvString;
                        return res.json({ 'status': 1, 'response': { 'data': userList, 'msg': 'data found' } });
                    });                    
                } else {
                    return res.json({ 'status': 1, 'response': { 'data': {}, 'msg': 'data found' } });
                }
            }
        });
    }
});


router.post('/changeuserStatus', [
    check('id', 'User id is required').notEmpty(),
    check('status', 'Please enter status').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {
        let id = req.body.id;
        let record = {
            status: req.body.status
        }
        User.userStatusUpdate(record, id, function (err, result) {
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



router.post('/adduserByadmin', [
    // check('name', 'Name is required').notEmpty(),
    check('email', 'Email is required').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {

        let overview = {};
        asyn.waterfall([
            function (done) {
                var email = req.body.email;
                User.checkUserRegistration(email, function (err, data) {
                    let totalrecord = data.length;
                    if (totalrecord) {
                        return res.json({ status: 0, 'response': { msg: 'Sorry, email already exists.' } });
                    } else {
                        let password = bcrypt.hashSync(req.body.password, 10);
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(req.body.password, salt, (err, hash) => {
                                let record = {
                                    first_name: req.body.first_name,
                                    last_name: req.body.last_name,
                                    phone: (req.body.phone) ? req.body.phone : '',
                                    email: (req.body.email) ? req.body.email : '',
                                    password: hash,
                                    created_at: moment().format('YYYY-MM-DD'),
                                    role: req.body.role
                                };
                                overview['data'] = record;
                                done(err, overview);
                            })
                        })
                    }
                });
            },
            function (overview, done1) {
                User.adduserByadmin(overview.data, function (err, data) {
                    if (err) {
                        return res.json({ 'status': 0, 'response': { 'msg': error } });
                    } else {
                        return res.json({ 'status': 1, 'response': { 'msg': 'User added successfully.', data: data } });
                    }
                });
            }
        ]);
    }
});

// router.post('/updateuserByadmin', function (req, res) {
//     var user_id = req.body.user_id;
//     let update_value = [req.body.name, req.body.phone]
//     let record = {
//         name: req.body.name,
//         phone: (req.body.phone) ? req.body.phone : ''
//     };
//     User.updateuserByadmin(record, user_id, update_value, function (err, data) {
//         if (err) {
//             return res.json({ 'status': 0, 'response': { 'msg': err } });
//         } else {
//             return res.json({ 'status': 1, 'response': { 'msg': 'User updated successfully.', data: data } });
//         }
//     });
// });

router.post('/updateuserByadmin', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        
        if (err) return res.json({ status: 1, 'response': { msg: err } });
        var validationErrors = false;

        let first_name = (obj.first_name !== undefined) ? obj.first_name : "";
        let last_name = (obj.last_name !== undefined) ? obj.last_name : "";
        let email = (obj.email !== undefined) ? obj.email : "";
        let organization = (obj.organization !== undefined) ? obj.organization : "";
        let level_of_education = (obj.level_of_education !== undefined) ? obj.level_of_education : "";
        let occupation = (obj.occupation !== undefined) ? obj.occupation : "";
        let sector = (obj.sector !== undefined) ? obj.sector : "";
        let academic_discipline = (obj.academic_discipline !== undefined) ? obj.academic_discipline : "";
        let sector = (obj.sector !== undefined) ? obj.sector : "";

        if (first_name == "") {
            return res.json({ status: 0, response: { msg: 'First name is required' } });
            validationErrors = true;
        }

        if (last_name == "") {
            return res.json({ status: 0, response: { msg: 'Last name is required' } });
            validationErrors = true;
        }

        if (email == "") {
            return res.json({ status: 0, response: { msg: 'Email is required' } });
            validationErrors = true;
        }

        if (organization == "") {
            return res.json({ status: 0, response: { msg: 'Organization is required' } });
            validationErrors = true;
        }

        if (validationErrors == false) {

            var json = fields.data;                 
            let obj = JSON.parse(json);
            
            var user_id = obj.user_id;
            var first_name = obj.first_name;            
            var last_name = obj.last_name;
            var email = (obj.email) ? obj.email : '';
            var organization = (obj.organization) ? obj.organization : '';
            var level_of_education = (obj.level_of_education) ? obj.level_of_education : '';
            var occupation = (obj.occupation) ? obj.occupation : '';
            var sector = (obj.sector) ? obj.sector : '';
            var academic_discipline = (obj.academic_discipline) ? obj.academic_discipline : '';
            var professional_interest_of_area = obj.professional_interest_of_area;
            var researcher_interest_of_area = obj.researcher_interest_of_area;
            var other_sector = (obj.other_sector) ? obj.other_sector : '';
            var other_academic_discipline = (obj.other_academic_discipline) ? obj.other_academic_discipline : '';
            var other_occupation = (obj.other_occupation) ? obj.other_occupation : '';
            var other_professional_interest_area = (obj.other_professional_interest_area) ? obj.other_professional_interest_area : '';
            var other_research_interest_area = (obj.other_research_interest_area) ? obj.other_research_interest_area : '';

            var update_value = [];
            var overview = {
                first_name: first_name,
                last_name: last_name,
                email: email,
                organization: organization,
                level_of_education: level_of_education,
                occupation: occupation,
                sector: sector,
                other_sector: other_sector,
                other_occupation: other_occupation,
                other_professional_interest_area: other_professional_interest_area,                
                user_image: ''
            }        
            var final_obj = {}
            asyn.waterfall([
                function (done) {
                    if (typeof files.image !== 'undefined') {
                        let file_ext = files.image.name.split('.').pop();
                        let filename = Date.now() + '-' + files.image.name.split(" ").join("");
                        let tmp_path = files.image.path;
                        if (file_ext == 'png' || file_ext == 'PNG' || file_ext == 'jpg' || file_ext == 'JPG' || file_ext == 'jpeg' || file_ext == 'JPEG') {
                            fs.rename(tmp_path, path.join(__dirname, env.USER_PATH + filename), function (err) {
                                if (err) {
                                    done("Image upload error", overview)
                                } else {
                                    overview.user_image = filename;                                    
                                    done(err, overview)
                                }
                            });

                        } else {
                            return res.json({ status: 0, response: { msg: 'Only image with jpg, jpeg and png format are allowed', } });
                        }
                    } else {                        
                        overview.user_image = '';
                        done(err, overview);
                    }
                },
                function (overview, done1) {
                    if (email){                        
                        User.checkUserEditProfile(email, user_id, function (err, data) {                            
                            if (data.length > 0) {
                                done1('Email already exists.', null);
                            } else {                                
                                done1(err, overview);
                            }
                        });
                    }else{                        
                        done1(err, overview);
                    }
                },
                function (overview, done1) {
                    var organization = overview.organization;                    
                    User.checkUserOrganization(organization, function (err, data) {
                        let org_record = data;
                        if (org_record) {
                            overview.organization = parseInt(org_record[0].organization_id);
                            done1(err, overview);
                        } else {
                            overview.organization = '';
                            done1(err, overview);
                        }
                    });
                },
                function (overview, done2) {
                    if (obj.role == 2) {
                        update_value = [first_name, last_name, email, overview.organization, level_of_education, occupation, sector, other_sector, other_occupation, other_professional_interest_area]
                        final_obj = {
                            first_name: first_name,
                            last_name: last_name,
                            email: email,
                            organization: overview.organization,
                            level_of_education: level_of_education,
                            occupation: occupation,
                            sector: sector,
                            other_sector: other_sector,
                            other_occupation: other_occupation,
                            other_professional_interest_area: other_professional_interest_area
                        };
                        if (overview.user_image){
                            update_value.push(overview.user_image)
                            final_obj.user_image = overview.user_image;
                        }                        
                    } else if (obj.role == 3) {
                        update_value = [first_name, last_name, email, overview.organization, academic_discipline, other_academic_discipline, other_research_interest_area]
                        final_obj = {
                            first_name: first_name,
                            last_name: last_name,
                            email: email,
                            organization: overview.organization,
                            academic_discipline: academic_discipline,
                            other_academic_discipline: other_academic_discipline,
                            other_research_interest_area: other_research_interest_area
                        };
                        if (overview.user_image) {
                            update_value.push(overview.user_image)
                            final_obj.user_image = overview.user_image;
                        }
                    } else if (obj.role == 4) {
                        update_value = [first_name, last_name, email]
                        final_obj = {
                            first_name: first_name,
                            last_name: last_name,
                            email: email
                        };
                        if (overview.user_image) {
                            update_value.push(overview.user_image)
                            final_obj.user_image = overview.user_image;
                        }
                    } else {
                        update_value = [first_name, last_name, email]
                        final_obj = {
                            first_name: first_name,
                            last_name: last_name,
                            email: email
                        };
                        if (overview.user_image) {
                            update_value.push(overview.user_image)
                            final_obj.user_image = overview.user_image;
                        }
                    }
                    User.updateuserByadmin(final_obj, user_id, update_value, professional_interest_of_area, researcher_interest_of_area, async function (err, data) {
                        User.getUserById(user_id, function (err, data) {
                            if (err){
                                done2(err, null);
                            }else{
                                done2(err, overview);
                            }
                        });
                    });
                }
            ],function (error, finalData) {
                if (error) {
                    return res.json({ 'status': 0, 'response': { 'msg': error } });
                } else {
                    if (finalData) {
                        return res.json({ 'status': 1, 'response': { 'data': finalData, 'msg': 'data found' } });
                    } else {
                        return res.json({ 'status': 1, 'response': { 'data': [], 'msg': 'data found' } });
                    }
                }
            });
        }
    });
});

//get user data - userSide
router.get('/getuserDetail', passport.authenticate('jwt', { session: false }), function (req, res) {
    loggerData(req);
    let user_id = req.user.id;
    User.getUserById(user_id, function (err, result) {
        if (err) {
            return res.json({ 'status': 0, 'response': { 'msg': err } });
        } else {
            if (result != '') {
                let userList = {};
                userList['id'] = result[0].id;
                userList['first_name'] = result[0].first_name;
                userList['last_name'] = result[0].last_name;
                userList['email'] = result[0].email;
                userList['password'] = result[0].password;
                userList['role'] = result[0].userrole;
                return res.json({ 'status': 1, 'response': { 'data': userList, 'msg': 'data found' } });
            } else {
                return res.json({ 'status': 0, 'response': { 'data': {}, 'msg': 'data found' } });
            }
        }
    });
});

router.post('/added_deactivate_reason', [    
    check('user_id', 'user id is required').notEmpty(),
    check('deactive_reason', 'reason is required').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var error = errors.array();
        res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
    } else {

        var user_id = req.body.user_id;
        let update_value = [req.body.title, req.body.deactive_reason]
        let record = {
            deactive_title: (req.body.title) ? req.body.title: '',
            deactive_reason: (req.body.deactive_reason) ? req.body.deactive_reason : ''
        };        
        var reason = req.body.deactive_reason;
        var name = req.body.name;        
        var email = req.body.email;
        User.updateuserByadmin(record, user_id, update_value, function (err, data) { 
            if (err) {
                return res.json({ status: 0, 'msg': err, 'response': { msg: err } });
            } else {
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
                var htmlUser = fs.readFileSync(__dirname + '/templates/userRegistration/deactiveUser.html', 'utf8');
                var dynamicHtml = {
                    logo: logo,
                    home_url: home_url,
                    reason: reason,
                    fullName: name,
                }
                var view = { data: dynamicHtml };
                var finalHtmlUser = mustache.render(htmlUser, view);
                let transporter = nodemailer.createTransport(nodeMailerCredential); // node mailer credentials
                let mailOptions = {
                    from: env.MAIL_FROM,
                    to: email,
                    subject: 'Your Hull Services account has been de-activated.',
                    html: finalHtmlUser.replace(/&#x2F;/g, '/')                   
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                    } else {
                    }
                });
                return res.json({ status: 1, 'msg': 'User deactivated successfully.', 'response': { data: data } });
            }
        });
        
    }
});




module.exports = router;

