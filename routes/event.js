"use strict";

var express = require("express");
var { check, validationResult } = require("express-validator");
var router = express.Router();
var env = require("../config/env");
var Event = require("../models/event");
var path = require("path");
var fs = require("fs");
var asyn = require("async");
var moment = require("moment");
var formidable = require("formidable");
const gm = require("gm");
var passport = require('passport');
var mustache = require('mustache');
var nodemailer = require('nodemailer');
const nodeMailerCredential = require('./../EmailCredential');
var User = require('../models/user');
var shortid = require('shortid');
const requestPromise = require('request-promise');
const jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");
const crypto = require("crypto");


function loggerData(req) {
  if (env.DEBUG) {
    var URL = "Url:-" + JSON.stringify(req.originalUrl, null, 4) + "\n";
    //  console.log(moment().format('YYYY-MM-DD h:m:s A') + ": " + URL);
  }
}

router.post("/addEventByadmin", function (req, res) {
  var form = new formidable.IncomingForm();
  form.multiples = true;

  var resources = []

  form.on('file', function (name, file) {
    if (name == "resources[]") {
      var type = file.name.split('.').pop(),
        filename = Date.now() + '-' + file.name;
      // Check the file type as it must be either png,jpg or jpeg
      if (type !== null && (type == 'png' || type == 'PNG' || type == 'jpg' || type == 'jpeg')) {
        fs.rename(file.path, path.join(__dirname, env.EVENT_PATH + filename), function (err) {
          gm(__dirname + env.EVENT_PATH + filename).gravity("Center").thumb(258, 195, __dirname + env.EVENT_PATH_THUMB + filename, 100, function (err, data) {
            if (err) { } else {
              let data = {
                path: filename,
                type: "fileUpload",
                file_type: "image"
              };
              resources.push(data)
            }
          });
        });
      } else {
        fs.rename(file.path, path.join(__dirname, env.EVENT_PATH + filename), function (err) {
          if (err) { } else {
            let data = {
              path: filename,
              type: "fileUpload",
              file_type: "doc"
            };
            resources.push(data)
          }
        });
      }
    }
  });

  form.parse(req, function (err, fields, files) {
    if (err) return res.json({ status: 1, response: { msg: err } });
    var validationErrors = false;
    if (validationErrors == false) {
      let parsed = JSON.parse(fields.data);

      // var start_date = (parsed.start_date) ? moment(parsed.start_date, "YYYY-MM-DD h:mm a").add(1, 'days').format("YYYY-MM-DD h:mm a") : ''
      // var end_date = (parsed.end_date) ? moment(parsed.end_date, "YYYY-MM-DD h:mm a").add(1, 'days').format("YYYY-MM-DD h:mm a") : ''

      var start_date = moment(parsed.start_date).format("YYYY-MM-DD h:mm a");
      var end_date = moment(parsed.end_date).format("YYYY-MM-DD h:mm a");

      // const start_time = new Date(record.start_date).getTime() / 1000,
      // end_time = new Date(record.end_date).getTime() / 1000;

      var record = {
        title: parsed.title,
        start_date: start_date,
        end_date: end_date,
        timezone: parsed.event_timezone,
        description: parsed.description,
        speaker_name: parsed.speaker_name,
        speaker_email: parsed.speaker_email,
        speaker_image: '',        
        about_speaker: parsed.about_speaker,
        event_type: parsed.event_type,
        location: (parsed.location) ? parsed.location : '',
        image: "",
        purchase_type: parsed.purchase_type,
        cost: parsed.cost,
        zoom_host_link: '',
        zoom_join_link:'',
        status: parsed.status,        
        group_session: [],        
        session_title: parsed.session_title,
        session_about: parsed.session_about,
        session_group_count: parsed.no_of_group,
        session_type: parsed.session_type,
        session_location: parsed.session_location,
        session_image: parsed.session_image,
        session_purchase_type: parsed.session_purchase_type,
        session_cost: parsed.session_cost,
        created_at: moment().format("YYYY-MM-DD"),
      };

      //console.log(parsed.sessionStartTime);
      for (let i = 0; i < parsed.sessionStartTime.length; i++) {
        var session_d = [];
        for (let m = 0; m < parsed.time[i].nestedArray.length; m++) {
          let datas = {
            value: parsed.time[i].nestedArray[m].value  
          };
          session_d.push(datas);
        }
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(session_d), 'mypassword').toString();
        //console.log(parsed.sessionStartTime[i].value);
        let data = {
          session_start_time: (parsed.sessionStartTime[i].value) ? moment(parsed.sessionStartTime[i].value).format("h:mm a") : '' ,
          session_end_time: (parsed.sessionEndTime[i].value) ? moment(parsed.sessionEndTime[i].value).format("h:mm a") : '',
          session_no_of_participate: parsed.sessionNoOfParticipate[i].value,
          session_timezone: parsed.sessionTimezone[i].value,
          session_data: ciphertext
        };
        record.group_session.push(data);
      }
      // console.log(record);
      // console.log('=============');
      parsed.videoURL.map((el) => {
        let data = {
          path: el.value,
          type: "videoURL",
        };
        resources.push(data);
      });
      parsed.webPageUrl.map((el) => {
        let data = {
          path: el.value,
          type: "webPageUrl",
        };
        resources.push(data);
      });
     // var filenames = Object.entries(files).filter((el) => el[0] != "image");
    }

        let overview = {};
        asyn.waterfall(
          [
            function (done) {
              let overview = {};
              if (typeof files.image !== "undefined") {
                let file_ext = files.image.name.split(".").pop();
                let filename =
                  Date.now() + "-" + files.image.name.split(" ").join("");
                let tmp_path = files.image.path;
                if (file_ext == "png" || file_ext == "PNG" || file_ext == "jpg" || file_ext == "JPG" || file_ext == "jpeg" || file_ext == "JPEG") {
                  fs.rename(
                    tmp_path,
                    path.join(__dirname, env.EVENT_PATH + filename),
                    function (err) {
                      gm(__dirname + env.EVENT_PATH + filename)
                        .gravity("Center")
                        .thumb(
                          258,
                          195,
                          __dirname + env.EVENT_PATH_THUMB + filename,
                          100,
                          function (err, data) {
                            if (err) {
                              record.image = filename;
                              done("Image upload error", overview)
                            } else {
                              record.image = filename;
                              overview["image"] = filename;
                              done(err, overview);
                            }
                          }
                        );
                    }
                  );
                } else {
                  return res.json({
                    status: 0,
                    response: {
                      msg: "Only image with jpg, jpeg and png format are allowed",
                    },
                  });
                }
              } else {
                overview["image"] = "";
                done(err, overview);
              }
            },
            // function (overview, done1) {
            //   if (typeof files.promo_image !== "undefined") {
            //     let file_ext = files.promo_image.name.split(".").pop();
            //     let filename = Date.now() + "-" + files.promo_image.name.split(" ").join("");
            //     let tmp_path = files.promo_image.path;
            //     if (file_ext == "png" || file_ext == "PNG" || file_ext == "jpg" || file_ext == "JPG" || file_ext == "jpeg" || file_ext == "JPEG") {
            //       fs.rename(tmp_path, path.join(__dirname, env.EVENT_PATH + filename),function (err) {
            //         if (err) {
            //           record.promo_image = filename;
            //           done1("Image upload error", overview)
            //         } else {
            //           record.promo_image = filename;
            //           overview["promo_image"] = filename;
            //           done1(err, overview);
            //         }
            //       });
            //     } else {
            //       return res.json({ status: 0,response: {msg: "Only image with jpg, jpeg and png format are allowed",} });
            //     }
            //   } else {
            //     overview["image"] = "";
            //     done1(err, overview);
            //   }
            // },
            // function (overview, done1) {
            //   if (typeof files.session_image !== "undefined") {
            //     let file_ext = files.session_image.name.split(".").pop();
            //     let filename = Date.now() + "-" + files.session_image.name.split(" ").join("");
            //     let tmp_path = files.session_image.path;
            //     if (file_ext == "png" || file_ext == "PNG" || file_ext == "jpg" || file_ext == "JPG" || file_ext == "jpeg" || file_ext == "JPEG") {
            //       fs.rename(tmp_path, path.join(__dirname, env.EVENT_PATH + filename), function (err) {
            //         if (err) {
            //           record.session_image = filename;
            //           done1("Image upload error", overview)
            //         } else {
            //           record.session_image = filename;
            //           overview["session_image"] = filename;
            //           done1(err, overview);
            //         }
            //       });
            //     } else {
            //       return res.json({ status: 0, response: { msg: "Only image with jpg, jpeg and png format are allowed", } });
            //     }
            //   } else {
            //     overview["image"] = "";
            //     done1(err, overview);
            //   }
            // },
            function (overview, done2) {
              if (typeof files.speaker_image !== "undefined") {
                let file_ext = files.speaker_image.name.split(".").pop();
                let filename = Date.now() + "-" + files.speaker_image.name.split(" ").join("");
                let tmp_path = files.speaker_image.path;
                if (file_ext == "png" || file_ext == "PNG" || file_ext == "jpg" || file_ext == "JPG" || file_ext == "jpeg" || file_ext == "JPEG") {
                  fs.rename(tmp_path, path.join(__dirname, env.EVENT_PATH + filename), function (err) {
                    if (err) {
                      record.speaker_image = filename;
                      done2("Image upload error", overview)
                    } else {
                      record.speaker_image = filename;
                      overview["speaker_image"] = filename;
                      done2(err, overview);
                    }
                  });
                } else {
                  return res.json({ status: 0, response: { msg: "Only image with jpg, jpeg and png format are allowed", } });
                }
              } else {
                overview["speaker_image"] = "";
                done2(err, overview);
              }
            },
            function (overview, done3) { 

              if (record.event_type == 'online'){
                const payload = {
                  iss: 'o4xds6wbTjiKWl7swm19aA',
                  exp: ((new Date()).getTime() + 500000000000)
                };
                const token = jwt.sign(payload, 'vKLGTPvGdubOtar8VD4UlWmVhZTAyoZIK1Td');
                const email = "dipika.letsnurture@gmail.com";
                var options = {
                  method: "POST",
                  uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
                  body: {
                    topic: record.title,
                    type: 1,
                    settings: {
                      host_video: "true",
                      participant_video: "true"
                    }
                  },
                  auth: {
                    bearer: token
                  },
                  headers: {
                    "User-Agent": "Zoom-api-Jwt-Request",
                    "content-type": "application/json"
                  },
                  json: true //Parse the JSON string in the response
                };
                requestPromise(options).then(function (response) {
                  console.log('=================');
                  console.log(response);
                  record.zoom_host_link = response.start_url
                  record.zoom_join_link = response.join_url

                  var eventLink;
                  var home_url;
                  var hostname = req.headers.host;

                  if (hostname == env.LOCAL_HOST_USER_APP) {
                    home_url = env.APP_URL;
                    eventLink = response.start_url;
                  } else {
                    home_url = env.APP_URL;
                    eventLink = response.start_url;
                  }

                  var htmlUser = fs.readFileSync(__dirname + '/templates/event/EventSpeakerURL.html', 'utf8');
                  var dynamicHtml = {
                    home_url: home_url,
                    fullname: record.speaker_name,
                    eventLink: eventLink
                  }
                  var view = { data: dynamicHtml };
                  var finalHtmlUser = mustache.render(htmlUser, view);
                  let transporter = nodemailer.createTransport(nodeMailerCredential); // node mailer credentials
                  let mailOptions1 = {
                    from: env.MAIL_FROM, // sender address
                    to: record.speaker_email,
                    subject: 'Your Event Join Link',
                    html: finalHtmlUser.replace(/&#x2F;/g, '/')
                  };
                  transporter.sendMail(mailOptions1, (error, info) => {
                    if (error) {} else {}
                  });
                  done3(err, overview);
                })
                .catch(function (err) {
                  done3(err, overview);
                });
              }else{
                done3(err, overview);
              }
            },
            function (overview, done4) {
              setTimeout(() => {
                Event.addEventByadmin(record, resources, function (err, data) {
                  if (err) {
                    done4(err, data);
                  } else {
                    done4(err, data);
                  }
                });
              }, 100);
            }
          ],
        function (error, data) {
          if (error) {
            return res.json({ status: 0, response: { msg: error } });
          } else {
            return res.json({
              status: 1,
              response: { msg: "Event added successfully.", data: data },
            });
          }
        });
  });
});

router.get('/getEventList', function (req, res) {
  loggerData(req);
  var status = req.query.status;
  Event.getAllAdminEvent(status, function (err, result) {
    if (err) {
      return res.json({ status: 0, 'response': { msg: err } });
    } else {
      var eventList = result.map(data => {
        let retObj = {};
        retObj['event_id'] = data.event_id;
        retObj['title'] = data.title;
        retObj['start_date'] = (data.start_date) ? moment(data.start_date).format('YYYY-MM-DD') : '';
        retObj['end_date'] = (data.end_date) ? moment(data.end_date).format('YYYY-MM-DD') : '';
        retObj['status'] = data.status;
        return retObj;
      });
      return res.json({ status: 1, 'response': { data: eventList } });
    }
  });
});

router.post('/getUserPurchaseEventList', function (req, res) {
  loggerData(req);
  var event_id = req.body.event_id;
  Event.getUserPurchaseEventList(event_id, function (err, result) {
    if (err) {
      return res.json({ status: 0, 'response': { msg: err } });
    } else {
      var eventList = result.map((data,index) => {
        let retObj = {};
        retObj['s_no'] = index+1;
        retObj['name'] = (data.first_namse) ? data.first_namse : '' + ' ' + (data.last_name) ? data.last_name:'';
        retObj['email'] = data.email;
        retObj['payment_id'] = data.event_purchase_id;
        retObj['event_purchase_date'] = moment(data.event_purchase_date).format('YYYY-MM-DD');
        retObj['event_registration'] = (data.event_registration) ? 'Yes': 'No';
        retObj['session_registration'] = (data.session_registration)?'Yes':'No';
        retObj['member'] = data.role;
        return retObj;
      });
      return res.json({ status: 1, 'response': { data: eventList } });
    }
  });
});


router.post('/changeEventStatus', [
  check('event_id', 'Event id is required').notEmpty(),
  check('status', 'Please enter status').notEmpty(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var error = errors.array();
    res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
  } else {
    let event_id = req.body.event_id;
    let record = {
      status: req.body.status
    }
    Event.changeEventStatus(record, event_id, function (err, result) {
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

router.post('/deleteEvent', [
  check('event', 'Event is required').notEmpty(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var error = errors.array();
    res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
  } else {
    loggerData(req);
    let event = req.body.event;
    Event.deleteEvent(event, function (err, result) {
      if (err) {
        return res.json({ status: 0, 'response': { msg: err } });
      } else {
        return res.json({ status: 1, 'response': { msg: 'Event(s) deleted successfully', data: result } });
      }
    });
  }
});

router.post('/getEventDataById', [check('event_id', 'Event is required').notEmpty()], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var error = errors.array();
    res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
  } else {
    let event_id = req.body.event_id;
    asyn.waterfall([
      function (done) {
        Event.getEventDataById(event_id, function (err, result) {
          
          if (err) {
            done({ 'status': 0, 'response': { 'msg': 'Something went wrong.' } });
          } else {
            var imageLink;
            if (req.headers.host == env.ADMIN_LIVE_URL) {
              imageLink = env.ADMIN_LIVE_URL;
            } else {
              imageLink = env.ADMIN_LIVE_URL;
            }
            let event = {};
            event['event_id'] = event_id;
            event['title'] = result[0].title;
            event['description'] = result[0].description;
            event['start_date'] = (result[0].start_date) ? moment(result[0].start_date).format('YYYY/MM/DD h:mm a') :'';
            event['end_date'] = (result[0].end_date) ? moment(result[0].end_date).format('YYYY/MM/DD h:mm a') : '';
            event['user_start_date'] = (result[0].start_date) ? moment(result[0].start_date).format('MMM Do YYYY h:mm a') : '';
            event['user_end_date'] = (result[0].end_date) ? moment(result[0].end_date).format('MMM Do YYYY h:mm a') : '';
            event['start_time'] = (result[0].start_date) ? moment(result[0].start_date).format('h:mm a') : '';
            event['end_time'] = (result[0].end_date) ? moment(result[0].end_date).format('h:mm a') : '';
            event['location'] = result[0].location;
            event['about_speaker'] = result[0].about_speaker;
            event['event_type'] = result[0].event_type;
            event['video_link'] = result[0].video_link;
            event['timezone'] = result[0].timezone;
            event['speaker_name'] = result[0].speaker_name;
            event['speaker_image'] = (result[0].speaker_image) ? imageLink + env.EVENT_VIEW_PATH + result[0].speaker_image : '';
            event['image'] = (result[0].image) ? imageLink + env.EVENT_VIEW_PATH + result[0].image : '';
            event['status'] = result[0].status;
            event['cost'] = result[0].cost;
            event['purchase_type'] = result[0].purchase_type;
            event['event_purchase_id'] = result[0].event_purchase_id;
            event['session_title'] = result[0].session_title;
            event['session_image'] = (result[0].session_image) ? imageLink + env.EVENT_VIEW_PATH + result[0].session_image : '';
            event['session_about'] = result[0].session_about;
            event['session_group_count'] = result[0].session_group_count;
            event['session_count'] = result[0].session_count;
            event['session_type'] = result[0].session_type;
            event['session_location'] = result[0].session_location;
            event['session_purchase_type'] = result[0].session_purchase_type;
            event['session_cost'] = result[0].session_cost;
            event['group_session'] = [];
            event['videoURL'] = [];
            event['webPageUrl'] = [];
            event['resource'] = [];
            done(err, event)
          }
        });
      },
      function (event, done1) {
        if (event['event_id'] != '') {
          Event.getGroupSessionByEventId(event['event_id'], function (err, result) {
            if (result && result.length > 0) {
              event['group_session'] = result;
              done1(null, event)
            } else {
              done1(null, event)
            }
          });
        } else {
          done1(null, event)
        }
      },
      function (event, done2) {
        if (event['event_id'] != '') {
          Event.getVideoByEventId(event['event_id'], function (err, result) {
            if (result && result.length > 0) {
              event['videoURL'] = result;
              done2(null, event)
            } else {
              done2(null, event)
            }
          });
        } else {
          done2(null, event)
        }
      },
      function (event, done3) {
        if (event['event_id'] != '') {
          Event.getWebURLByEventId(event['event_id'], function (err, result) {
            if (result && result.length > 0) {
              event['webPageUrl'] = result;
              done3(null, event)
            } else {
              done3(null, event)
            }
          });
        } else {
          done3(null, event)
        }
      },
      function (event, done4) {
        if (event['event_id'] != '') {
          Event.getResourceByEventId(event['event_id'], function (err, result) {
            if (result && result.length > 0) {
              var imageLink;
              if (req.headers.host == env.ADMIN_LIVE_URL) {
                imageLink = env.ADMIN_LIVE_URL;
              } else {
                imageLink = env.ADMIN_LIVE_URL;
              }
              var obj = result.map((data, index) => {
                let retObj = {};
                retObj['event_resource_id'] = data.event_resource_id;
                retObj['file'] = (data.path) ? imageLink + env.EVENT_VIEW_PATH + data.path : '';
                retObj['name'] = data.path;
                retObj['type'] = data.file_type;
                retObj['event_id'] = data.event_id;
                return retObj;
              });
              event['resource'] = obj;
              done4(null, event)
            } else {
              done4(null, event)
            }
          });
        } else {
          done4(null, event)
        }
      }
    ],
    function (error, event) {
      if (error) {
        return res.json({ 'status': 0, 'response': { 'msg': error } });
      } else {
        return res.json({ 'status': 1, 'response': { 'data': event, 'msg': 'data found' } });
      }
    });

  }
});

router.post('/getEventDataByIdWithLogin', passport.authenticate('jwt', { session: false }), [check('event_id', 'Event is required').notEmpty()], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var error = errors.array();
    res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
  } else {
    let event_id = req.body.event_id;
    asyn.waterfall([
      function (done) {
        var user_id = req.user.id;
        Event.getEventDataByIdWithLogin(user_id, event_id, function (err, result) {

          if (err) {
            done({ 'status': 0, 'response': { 'msg': 'Something went wrong.' } });
          } else {
            var imageLink;
            if (req.headers.host == env.ADMIN_LIVE_URL) {
              imageLink = env.ADMIN_LIVE_URL;
            } else {
              imageLink = env.ADMIN_LIVE_URL;
            }
            let event = {};
            event['event_id'] = event_id;
            event['title'] = result[0].title;
            event['description'] = result[0].description;
            event['start_date'] = (result[0].start_date) ? moment(result[0].start_date).format('YYYY/MM/DD h:mm a') : '';
            event['end_date'] = (result[0].end_date) ? moment(result[0].end_date).format('YYYY/MM/DD h:mm a') : '';
            event['user_start_date'] = (result[0].start_date) ? moment(result[0].start_date).format('MMM Do YYYY h:mm a') : '';
            event['user_end_date'] = (result[0].end_date) ? moment(result[0].end_date).format('MMM Do YYYY h:mm a') : '';
            event['start_time'] = (result[0].start_date) ? moment(result[0].start_date).format('h:mm a') : '';
            event['end_time'] = (result[0].end_date) ? moment(result[0].end_date).format('h:mm a') : '';
            event['location'] = result[0].location;
            event['about_speaker'] = result[0].about_speaker;
            event['event_type'] = result[0].event_type;
            event['video_link'] = result[0].video_link;
            event['timezone'] = result[0].timezone;
            event['speaker_name'] = result[0].speaker_name;
            event['speaker_image'] = (result[0].speaker_image) ? imageLink + env.EVENT_VIEW_PATH + result[0].speaker_image : '';
            event['image'] = (result[0].image) ? imageLink + env.EVENT_VIEW_PATH + result[0].image : '';
            event['status'] = result[0].status;
            event['cost'] = result[0].cost;
            event['purchase_type'] = result[0].purchase_type;
            event['event_purchase_id'] = result[0].event_purchase_id;
            event['session_title'] = result[0].session_title;
            event['session_image'] = (result[0].session_image) ? imageLink + env.EVENT_VIEW_PATH + result[0].session_image : '';
            event['session_about'] = result[0].session_about;
            event['session_group_count'] = result[0].session_group_count;
            event['session_count'] = result[0].session_count;
            event['session_type'] = result[0].session_type;
            event['session_location'] = result[0].session_location;
            event['session_purchase_type'] = result[0].session_purchase_type;
            event['session_cost'] = result[0].session_cost;
            event['group_session'] = [];
            event['videoURL'] = [];
            event['webPageUrl'] = [];
            event['resource'] = [];
            done(err, event)
          }
        });
      },
      function (event, done1) {
        if (event['event_id'] != '') {
          Event.getGroupSessionByEventId(event['event_id'], function (err, result) {
            if (result && result.length > 0) {
              event['group_session'] = result;
              done1(null, event)
            } else {
              done1(null, event)
            }
          });
        } else {
          done1(null, event)
        }
      },
      function (event, done2) {
        if (event['event_id'] != '') {
          Event.getVideoByEventId(event['event_id'], function (err, result) {
            if (result && result.length > 0) {
              event['videoURL'] = result;
              done2(null, event)
            } else {
              done2(null, event)
            }
          });
        } else {
          done2(null, event)
        }
      },
      function (event, done3) {
        if (event['event_id'] != '') {
          Event.getWebURLByEventId(event['event_id'], function (err, result) {
            if (result && result.length > 0) {
              event['webPageUrl'] = result;
              done3(null, event)
            } else {
              done3(null, event)
            }
          });
        } else {
          done3(null, event)
        }
      },
      function (event, done4) {
        if (event['event_id'] != '') {
          Event.getResourceByEventId(event['event_id'], function (err, result) {
            if (result && result.length > 0) {
              var imageLink;
              if (req.headers.host == env.ADMIN_LIVE_URL) {
                imageLink = env.ADMIN_LIVE_URL;
              } else {
                imageLink = env.ADMIN_LIVE_URL;
              }
              var obj = result.map((data, index) => {
                let retObj = {};
                retObj['event_resource_id'] = data.event_resource_id;
                retObj['file'] = (data.path) ? imageLink + env.EVENT_VIEW_PATH + data.path : '';
                retObj['name'] = data.path;
                retObj['type'] = data.file_type;
                retObj['event_id'] = data.event_id;
                return retObj;
              });
              event['resource'] = obj;
              done4(null, event)
            } else {
              done4(null, event)
            }
          });
        } else {
          done4(null, event)
        }
      }
    ],
      function (error, event) {
        if (error) {
          return res.json({ 'status': 0, 'response': { 'msg': error } });
        } else {
          return res.json({ 'status': 1, 'response': { 'data': event, 'msg': 'data found' } });
        }
      });

  }
});


router.post("/updateEventByadmin", function (req, res) {
  var form = new formidable.IncomingForm();
  form.multiples = true;
  form.uploadDir = path.join(__dirname, env.EVENT_PATH);
  var overview = {}

  var resources = []
  var videoURL = []
  var webPageUrl = []

  form.on('file', function (name, file) {
    if (name =="resources[]"){
      var type = file.name.split('.').pop(),
        filename = Date.now() + '-' + file.name;
      // Check the file type as it must be either png,jpg or jpeg
      if (type !== null && (type == 'png' || type == 'PNG' || type == 'jpg' || type == 'jpeg')) {
        fs.rename(file.path, path.join(__dirname, env.EVENT_PATH + filename), function (err) {
          gm(__dirname + env.EVENT_PATH + filename).gravity("Center").thumb(258, 195, __dirname + env.EVENT_PATH_THUMB + filename, 100, function (err, data) {
            if (err) { } else {
              let data = {
                path: filename,
                type: "fileUpload",
                file_type: "image"
              };
              resources.push(data)
            }
          });
        });
      } else {
        fs.rename(file.path, path.join(__dirname, env.EVENT_PATH + filename), function (err) {
          if (err) { } else {
            let data = {
              path: filename,
              type: "fileUpload",
              file_type: "doc"
            };
            resources.push(data)
          }
        });
      }
    }
  });

  form.parse(req, function (err, fields, files) {
    if (err) return res.json({ status: 1, response: { msg: err } });

    let obj = JSON.parse(fields.data);

    var start_date = moment(obj.start_date).format("YYYY-MM-DD h:mm a");
    var end_date = moment(obj.end_date).format("YYYY-MM-DD h:mm a");

    // var start_date = (obj.start_date) ? moment(obj.start_date, "YYYY-MM-DD h:mm a").add(1, 'days').format("YYYY-MM-DD h:mm a") : ''
    // var end_date = (obj.end_date) ? moment(obj.end_date, "YYYY-MM-DD h:mm a").add(1, 'days').format("YYYY-MM-DD h:mm a") : ''

    var event_id = obj.event_id;
    var deleteresources = obj.deleteresources;
    var record = {
      title: obj.title,
      description: obj.description,
      location: obj.location,
      speaker_name: obj.speaker_name,
      about_speaker: obj.about_speaker,
      purchase_type: obj.purchase_type,
      cost: obj.cost,
      start_date: start_date,
      end_date: end_date,
      timezone: obj.timezone,
      event_type: obj.event_type,
      video_link: (obj.video_link) ? obj.video_link : '',
      group_session:[]
    };


    var promo_record = {
      promo_title: obj.promo_title,
      promo_description: obj.promo_description,
    }

    var update_value = [obj.title, obj.description, obj.location, obj.speaker_name, obj.about_speaker, obj.purchase_type, obj.cost, start_date, end_date, obj.timezone, obj.event_type, obj.video_link];
    var group_session = []

    for (let i = 0; i < obj.sessionStartTime.length; i++) {
      var session_d = [];
      for (let m = 0; m < obj.time[i].nestedArray.length; m++) {
        let datas = {
          value: obj.time[i].nestedArray[m].value
        };
        session_d.push(datas);
      }
      var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(session_d), 'mypassword').toString();
      //console.log(obj.sessionStartTime[i].value);
      let data = {
        session_start_time: (obj.sessionStartTime[i].value) ? moment(obj.sessionStartTime[i].value).format("h:mm a") : '',
        session_end_time: (obj.sessionEndTime[i].value) ? moment(obj.sessionEndTime[i].value).format("h:mm a") : '',
        session_no_of_participate: obj.sessionNoOfParticipate[i].value,
        session_timezone: obj.sessionTimezone[i].value,
        session_data: ciphertext
      };
      record.group_session.push(data);
    }

      // if (obj.sessionTitle.length > 0){
      //   for (let i = 0; i < obj.sessionTitle.length; i++) {
      //     let data = {
      //       title: obj.sessionTitle[i].value,
      //       description: obj.sessionDescription[i].value,
      //       url: obj.sessionURL[i].value,
      //     };
      //     group_session.push(data);
      //   }
      // }
      if (obj.videoURL.length > 0) {
        obj.videoURL.map((el) => {
          if (el.value){
            let data = {
              path: el.value,
              type: "videoURL",
            };
            videoURL.push(data);
          }
        });
      }
      if (obj.webPageUrl.length > 0) {
        obj.webPageUrl.map((el) => {
          if (el.value) {
            let data = {
              path: el.value,
              type: "webPageUrl",
            };
            webPageUrl.push(data);
          }
        });
      }


    asyn.waterfall(
      [ function (done) {
          if (typeof files.image !== "undefined") {
            let file_ext = files.image.name.split(".").pop();
            let filename = Date.now() + "-" + files.image.name.split(" ").join("");
            let tmp_path = files.image.path;

            if (file_ext == "png" || file_ext == "PNG" ||file_ext == "jpg" ||file_ext == "JPG" ||file_ext == "jpeg" ||file_ext == "JPEG") {
              fs.rename(tmp_path,path.join(__dirname, env.EVENT_PATH + filename),function (err) {
                  gm(__dirname + env.EVENT_PATH + filename).gravity("Center").thumb(258,195,__dirname + env.EVENT_PATH_THUMB + filename,100,function (err, data) {
                        if (err) {
                          console.log(err);
                          record.image = filename;
                          update_value.push(filename)
                          done("Image upload error", overview)
                        } else {
                          record.image = filename;
                          update_value.push(filename)
                          overview["image"] = filename;
                          done(err, overview);
                        }
                      }
                    );
                }
              );
            } else {
              return res.json({ status: 0,response: {msg: "Only image with jpg, jpeg and png format are allowed"} });
            }
          } else {
            overview["image"] = "";
            done(err, overview);
          }
        },
        // function (overview, done1) {
        //   if (typeof files.promo_image !== "undefined") {
        //     let file_ext = files.promo_image.name.split(".").pop();
        //     let filename = Date.now() + "-" + files.promo_image.name.split(" ").join("");
        //     let tmp_path = files.promo_image.path;

        //     if (file_ext == "png" || file_ext == "PNG" || file_ext == "jpg" || file_ext == "JPG" || file_ext == "jpeg" || file_ext == "JPEG") {
        //       fs.rename(tmp_path, path.join(__dirname, env.EVENT_PATH + filename), function (err) {
        //         if (err) {
        //           promo_record.promo_image = filename;
        //           done1("Image upload error", overview)
        //         } else {
        //           promo_record.promo_image = filename;
        //           overview["promo_image"] = filename;
        //           done1(err, overview);
        //         }
        //       });
        //     } else {
        //       return res.json({ status: 0, response: { msg: "Only image with jpg, jpeg and png format are allowed" } });
        //     }
        //   } else {
        //     overview["promo_image"] = "";
        //     done1(err, overview);
        //   }
        // },
        function (overview, done1) {
          if (typeof files.speaker_image !== "undefined") {
            let file_ext = files.speaker_image.name.split(".").pop();
            let filename = Date.now() + "-" + files.speaker_image.name.split(" ").join("");
            let tmp_path = files.speaker_image.path;

            if (file_ext == "png" || file_ext == "PNG" || file_ext == "jpg" || file_ext == "JPG" || file_ext == "jpeg" || file_ext == "JPEG") {
              fs.rename(tmp_path, path.join(__dirname, env.EVENT_PATH + filename), function (err) {
                if (err) {
                  record.speaker_image = filename;
                  update_value.push(filename)
                  done1("Image upload error", overview)
                } else {
                  record.speaker_image = filename;
                  update_value.push(filename)
                  overview["speaker_image"] = filename;
                  done1(err, overview);
                }
              });
            } else {
              return res.json({ status: 0, response: { msg: "Only image with jpg, jpeg and png format are allowed" } });
            }
          } else {
            overview["speaker_image"] = "";
            done1(err, overview);
          }
        },
        function (overview, done2) {
          setTimeout(() => {
            console.log(record);
            console.log(update_value);
            Event.updateEventByadmin(record, promo_record, event_id, update_value, group_session, resources, deleteresources, videoURL, webPageUrl, function (err, data) {
              if (err) {
                done2(err, overview);
              } else {
                done2(err, overview);
              }
            });
          }, 200);
        },
        // function (data, done2) {
        //   const event = nylas.events.build({
        //     title: record.title,
        //     calendarId: env.NYLAS_CALENDAR_ID,
        //     when: { start_time: start_time, end_time: end_time },
        //     participants: env.NYLAS_PARTICIPANTS,
        //     location: fields.location,
        //   });
        //   event.save({ notify_participants: true }).then((event) => {
        //     done2(err, data);
        //   });
        // },
      ],
      function (error, data) {
        if (error) {
          return res.json({ status: 0, response: { msg: error } });
        } else {
          return res.json({
            status: 1,
            response: { msg: "Event updated successfully.", data: data },
          });
        }
      }
    );
  });
});

router.get('/getAllAdminEventPromoList', function (req, res) {
  loggerData(req);
  var status = req.query.status;
  Event.getAllAdminEventPromoList(status, function (err, result) {
    if (err) {
      return res.json({ status: 0, 'response': { msg: err } });
    } else {
      var eventList = result.map(data => {
        let retObj = {};
        retObj['event_promo_id'] = data.event_promo_id;
        retObj['title'] = data.promo_title;
        retObj['status'] = data.status;
        return retObj;
      });
      return res.json({ status: 1, 'response': { data: eventList } });
    }
  });
});

router.get('/getEventPromoList', function (req, res) {
  loggerData(req);
  Event.getEventPromoList(function (err, result) {
    if (err) {
      return res.json({ status: 0, 'response': { msg: err } });
    } else {
      var eventList = result.map(data => {
        let retObj = {};
        retObj['event_id'] = data.event_id;
        retObj['title'] = data.title;
        retObj['status'] = data.status;
        return retObj;
      });
      return res.json({ status: 1, 'response': { data: eventList } });
    }
  });
});


router.post("/addEventPromoByadmin", function (req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (err) return res.json({ status: 1, response: { msg: err } });
    let parsed = JSON.parse(fields.data);
    var record = {
      event_id: parsed.event,
      promo_image: "",
      promo_title: parsed.promo_title,
      promo_description: parsed.promo_description,
    };
    let overview = {};
    asyn.waterfall(
      [function (done1) {
          if (typeof files.promo_image !== "undefined") {
            let file_ext = files.promo_image.name.split(".").pop();
            let filename = Date.now() + "-" + files.promo_image.name.split(" ").join("");
            let tmp_path = files.promo_image.path;
            if (file_ext == "png" || file_ext == "PNG" || file_ext == "jpg" || file_ext == "JPG" || file_ext == "jpeg" || file_ext == "JPEG") {
              fs.rename(tmp_path, path.join(__dirname, env.EVENT_PATH + filename), function (err) {
                if (err) {
                  record.promo_image = filename;
                  done1("Image upload error", overview)
                } else {
                  record.promo_image = filename;
                  overview["promo_image"] = filename;
                  done1(err, overview);
                }
              });
            } else {
              return res.json({ status: 0, response: { msg: "Only image with jpg, jpeg and png format are allowed", } });
            }
          } else {
            overview["image"] = "";
            done1(err, overview);
          }
        },
        function (overview, done2) {
          Event.addPromoEventByadmin(record, function (err, data) {
            if (err) {
              done2(err, data);
            } else {
              done2(err, data);
            }
          });
        },
      ],
      function (error, data) {
        if (error) {
          return res.json({ status: 0, response: { msg: error } });
        } else {
          return res.json({ status: 1, response: { msg: "Event Promo added successfully.", data: data } });
        }
      });
  });
});

router.post("/updateEventPromoByadmin", function (req, res) {

  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (err) return res.json({ status: 1, response: { msg: err } });
    let parsed = JSON.parse(fields.data);
    var event_promo_id = parsed.event_promo_id;
    var record = {
      event_id: parsed.event,
      promo_image: "",
      promo_title: parsed.promo_title,
      promo_description: parsed.promo_description,
    };
    console.log('in dfsdf');
    let overview = {};
    asyn.waterfall([
      function (done1) {
        if (typeof files.promo_image !== "undefined") {
          let file_ext = files.promo_image.name.split(".").pop();
          let filename = Date.now() + "-" + files.promo_image.name.split(" ").join("");
          let tmp_path = files.promo_image.path;
          if (file_ext == "png" || file_ext == "PNG" || file_ext == "jpg" || file_ext == "JPG" || file_ext == "jpeg" || file_ext == "JPEG") {
            fs.rename(tmp_path, path.join(__dirname, env.EVENT_PATH + filename), function (err) {
              if (err) {
                record.promo_image = filename;
                done1("Image upload error", overview)
              } else {
                record.promo_image = filename;
                overview["promo_image"] = filename;
                done1(err, overview);
              }
            });
          } else {
            return res.json({ status: 0, response: { msg: "Only image with jpg, jpeg and png format are allowed", } });
          }
        } else {
          overview["image"] = "";
          done1(err, overview);
        }
      },
      function (overview, done2) {
        Event.updateEventPromoByadmin(record, event_promo_id, function (err, data) {
          if (err) {
            done2(err, null);
          } else {
            done2(err, data);
          }
        });
      }],
      function (error, data) {
        if (error) {
          return res.json({ status: 0, response: { msg: error } });
        } else {
          return res.json({ status: 1,response: { msg: "Event Promo updated successfully.", data: data } });
        }
      });
  });
});


router.post('/getEventPromoDataById', [check('event_promo_id', 'Event is required').notEmpty()], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var error = errors.array();
    res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
  } else {
    let event_promo_id = req.body.event_promo_id;
    Event.getEventPromoDataById(event_promo_id, function (err, result) {
      if (err) {
        return res.json({ 'status': 0, 'response': { 'msg': error } });
      } else {
        var imageLink;
        if (req.headers.host == env.ADMIN_LIVE_URL) {
          imageLink = env.ADMIN_LIVE_URL;
        } else {
          imageLink = env.ADMIN_LIVE_URL;
        }
        let event = {};
        event['event_id'] = result[0].event_id;
        event['status'] = result[0].status;
        event['promo_title'] = result[0].promo_title;
        event['promo_image'] = (result[0].promo_image) ? imageLink + env.EVENT_VIEW_PATH + result[0].promo_image : '';
        event['promo_description'] = result[0].promo_description;
        return res.json({ 'status': 1, 'response': { 'data': event, 'msg': 'data found' } });
      }
    });

  }
});

router.post('/deletePromoEvent', [
  check('event', 'Event is required').notEmpty(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var error = errors.array();
    res.json({ 'status': 0, 'response': { 'msg': error[0].msg, 'dev_msg': error[0].msg } });
  } else {
    loggerData(req);
    let event = req.body.event;
    Event.deletePromoEvent(event, function (err, result) {
      if (err) {
        return res.json({ status: 0, 'response': { msg: err } });
      } else {
        return res.json({ status: 1, 'response': { msg: 'Promo Event(s) deleted successfully', data: result } });
      }
    });
  }
});


router.post('/getUnpaidEventList', function (req, res) {
  loggerData(req);
  var search = {
    today : req.body.today,
    search: req.body.search,
    location: req.body.location,
  }
  Event.getUnpaidEventList(search, function (err, result) {
    if (err) {
      return res.json({ status: 0, 'response': { msg: err } });
    } else {
      var imageLink;
      if (req.headers.host == env.ADMIN_LIVE_URL) {
        imageLink = env.ADMIN_LIVE_URL;
      } else {
        imageLink = env.ADMIN_LIVE_URL;
      }
      var eventList = result.map(data => {
        let retObj = {};
        retObj['event_id'] = data.event_id;
        retObj['title'] = data.title;
        retObj['description'] = data.description;
        retObj['location'] = data.location;
        retObj['purchase_type'] = data.purchase_type;
        retObj['speaker_name'] = data.speaker_name;
        retObj['speaker_image'] = (data.speaker_image) ? imageLink + env.EVENT_VIEW_PATH + data.speaker_image : '';
        retObj['cost'] = data.cost;
        retObj['image'] = (data.image) ? imageLink + env.EVENT_VIEW_PATH + data.image : '';
        retObj['day'] = (data.start_date) ? moment(data.start_date).format('ddd') : '';
        retObj['date'] = (data.start_date) ? moment(data.start_date).format('DD') : '';
        retObj['group_start_date'] = (data.start_date) ? moment(data.start_date).format('YYYY-MM-DD') : '';
        retObj['start_date'] = (data.start_date) ? moment(data.start_date).format('MM-DD-YYYY') : '';
        retObj['end_date'] = (data.end_date) ? moment(data.end_date).format('MM-DD-YYYY') : '';
        retObj['start_time'] = (data.start_date) ? moment(data.start_date).format('h:mm a') : '';
        retObj['end_time'] = (data.end_date) ? moment(data.end_date).format('h:mm a') : '';
        retObj['status'] = data.status;
        retObj['event_purchase_id'] = data.event_purchase_id;
        
        return retObj;
      });
    //  var newResult = getDateArr(eventList)

      // var newarry = [];
      // var subarry = [];
      // Object.keys(newResult).map(function (k, index) {
      //   subarry[k].push(newResult[k])
      //   newarry[index].push(subarry);
      //   console.log(index);
      //   console.log("key with value: " + k + " = " + newResult[k])

      // })

      // console.log(newarry);

      return res.json({ status: 1, 'response': { data: eventList } });
    }
  });
});

router.post('/getMyEventList', passport.authenticate('jwt', { session: false }), function (req, res) {
  loggerData(req);
  
  var user_id = req.user.id;
  Event.getMyEventList(user_id, function (err, result) {
    if (err) {
      return res.json({ status: 0, 'response': { msg: err } });
    } else {
      var imageLink;
      if (req.headers.host == env.ADMIN_LIVE_URL) {
        imageLink = env.ADMIN_LIVE_URL;
      } else {
        imageLink = env.ADMIN_LIVE_URL;
      }
      var eventList = result.map(data => {
        let retObj = {};
        retObj['event_id'] = data.event_id;
        retObj['title'] = data.title;
        retObj['description'] = data.description;
        retObj['location'] = data.location;
        retObj['speaker_name'] = data.speaker_name;
        retObj['speaker_image'] = (data.speaker_image) ? imageLink + env.EVENT_VIEW_PATH + data.speaker_image : '';
        retObj['cost'] = data.cost;
        retObj['image'] = (data.image) ? imageLink + env.EVENT_VIEW_PATH + data.image : '';
        retObj['day'] = (data.start_date) ? moment(data.start_date).format('ddd') : '';
        retObj['date'] = (data.start_date) ? moment(data.start_date).format('DD') : '';
        retObj['group_start_date'] = (data.start_date) ? moment(data.start_date).format('YYYY-MM-DD') : '';
        retObj['start_date'] = (data.start_date) ? moment(data.start_date).format('MM-DD-YYYY') : '';
        retObj['end_date'] = (data.end_date) ? moment(data.end_date).format('MM-DD-YYYY') : '';
        retObj['start_time'] = (data.start_date) ? moment(data.start_date).format('h:mm a') : '';
        retObj['end_time'] = (data.end_date) ? moment(data.end_date).format('h:mm a') : '';
        retObj['status'] = data.status;
        return retObj;
      });
      return res.json({ status: 1, 'response': { data: eventList } });
    }
  });
});




function getDateArr(arr) {
  var new_arr = {};
  for (var i = 0, len = arr.length; i < len; i++) {
    var Month_index = arr[i].group_start_date.lastIndexOf('-');
    var group_start_date = moment(arr[i].group_start_date.substr(0, Month_index)).format('MMM YYYY');

    if (!new_arr[group_start_date]) {
      new_arr[group_start_date] = [];
      new_arr[group_start_date].push(arr[i])
    } else {
      new_arr[group_start_date].push(arr[i])
    }

  }
  return new_arr
}

router.post('/eventRegisterWithUser', passport.authenticate('jwt', { session: false }), function (req, res) {
  loggerData(req);

  var imageLink;
  if (req.headers.host == env.ADMIN_LIVE_URL) {
    imageLink = env.ADMIN_LIVE_URL;
  } else {
    imageLink = env.ADMIN_LIVE_URL;
  }

  var event_id = req.body.event_id
  var email = req.user.email;
  var first_name = req.user.first_name;
  var obj = {
    event_id:req.body.event_id,
    user_id:req.user.id,
    payment_id: (req.body.payment_id) ? req.body.payment_id: '',
    event_purchase_date: moment().format('YYYY-MM-DD')
  }
  Event.addEventPurchase(obj, function (err, result) {
    if (err) {
      return res.json({ status: 0, 'response': { msg: err } });
    } else {
      Event.getEventDataById(event_id, function (err, eventdata) {
        var eventLink;
        var home_url;
        var admin_app_url;
        var hostname = req.headers.host;
        
        if (hostname == env.LOCAL_HOST_USER_APP) {
          home_url = env.APP_URL;
          eventLink = env.APP_URL + 'event-promo?id=' + event_id;
          admin_app_url = env.ADMIN_APP_URL;
        } else {
          home_url = env.APP_URL;
          eventLink = env.APP_URL + 'event-promo?id=' + event_id;
          admin_app_url = env.ADMIN_APP_URL;
        }

        var htmlUser = fs.readFileSync(__dirname + '/templates/event/EventInvitation.html', 'utf8');

        var dynamicHtml = {
          home_url: home_url,
          fullname: first_name,
          eventLink: eventLink,
          event_title: eventdata[0].title,
          start_date: moment(eventdata[0].start_date).format('MMM DD, YYYY') + " at " + moment(eventdata[0].start_date).format('hh:mm a') + "  -  " + moment(eventdata[0].end_date).format('MMM DD, YYYY') + " at " + moment(eventdata[0].end_date).format('hh:mm a') ,
          event_price: (eventdata[0].cost > 0) ? '$'+eventdata[0].cost : 'Free',
          event_image: (eventdata[0].image) ? imageLink + env.EVENT_VIEW_PATH + eventdata[0].image : ''
        }

        var view = { data: dynamicHtml };
        var finalHtmlUser = mustache.render(htmlUser, view);
        let transporter = nodemailer.createTransport(nodeMailerCredential); // node mailer credentials
        let mailOptions1 = {
          from: env.MAIL_FROM, // sender address
          to: email,
          subject: 'Your Tickets for' + eventdata[0].title,
          html: finalHtmlUser.replace(/&#x2F;/g, '/')
        };

       
        transporter.sendMail(mailOptions1, (error, info) => {
          if (error) {
            //return res.json({status: 0, response : { msg: 'There was an email error',}  });
          } else {
          }
        });

        return res.json({ status: 1, 'response': { data: eventdata } });
      });


    }
  });
});

router.post('/eventRegisterWithoutUser', function (req, res) {

  var imageLink;
  if (req.headers.host == env.ADMIN_LIVE_URL) {
    imageLink = env.ADMIN_LIVE_URL;
  } else {
    imageLink = env.ADMIN_LIVE_URL;
  }

  loggerData(req);
  var event_id = req.body.event_id
  var email = req.body.email;
  var first_name = req.body.first_name;
  var event_title = req.body.event_title;
  var obj = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: email,
    email_verification_token: shortid.generate() + Date.now(),
    created_at: moment.utc().format('YYYY-MM-DD'),
    role:4,
    status: 0,
    user_read_status: 0
  }

  User.checkUserRegistration(email, function (err, data) {
    let totalrecord = data.length;
    if (totalrecord) {

      var eventobj = {
        event_id: event_id,
        user_id: data[0].id,
        payment_id: (req.body.payment_id) ? req.body.payment_id: '',
        event_purchase_date: moment().format('YYYY-MM-DD')
      }
      Event.addEventPurchase(eventobj, function (err, result) {
        if (err) {
          return res.json({ status: 0, 'response': { msg: err } });
        } else {

          Event.getEventDataById(event_id, function (err, eventdata) { 
            var eventLink;
            var registerURL;
            var home_url;
            var admin_app_url;
            var hostname = req.headers.host;

            if (hostname == env.LOCAL_HOST_USER_APP) {
              home_url = env.APP_URL;
              eventLink = env.APP_URL + 'event-promo?id=' + event_id;
              registerURL = env.APP_URL + 'register?code=' + data[0].email_verification_token
              admin_app_url = env.ADMIN_APP_URL
            } else {
              home_url = env.APP_URL;
              eventLink = env.APP_URL + 'event-promo?id=' + event_id;
              registerURL = env.APP_URL + 'register?code=' + data[0].email_verification_token
              admin_app_url = env.ADMIN_APP_URL
            }

            var htmlUser = fs.readFileSync(__dirname + '/templates/event/EventInvitation.html', 'utf8');

            var dynamicHtml = {
              home_url: home_url,
              fullname: first_name,
              eventLink: (eventdata[0].zoom_join_link) ? eventdata[0].zoom_join_link: eventLink,
              event_title: eventdata[0].title,
              start_date: moment(eventdata[0].start_date).format('MMM DD, YYYY') + " at " + moment(eventdata[0].start_date).format('hh:mm a') + "  -  " + moment(eventdata[0].end_date).format('MMM DD, YYYY') + " at " + moment(eventdata[0].end_date).format('hh:mm a'),
              event_price: (eventdata[0].cost > 0) ? '$'+eventdata[0].cost : 'Free',
              event_image: (eventdata[0].image) ? imageLink + env.EVENT_VIEW_PATH + eventdata[0].image : ''
            }

            if (data[0].role == 4 && data[0].email_verification_token) {
              dynamicHtml.registerURL = registerURL;
            }

            var view = { data: dynamicHtml };
            var finalHtmlUser = mustache.render(htmlUser, view);
            let transporter = nodemailer.createTransport(nodeMailerCredential); // node mailer credentials
            let mailOptions1 = {
              from: env.MAIL_FROM, // sender address
              to: email,
              subject: 'Your Tickets for' + eventdata[0].title,
              html: finalHtmlUser.replace(/&#x2F;/g, '/')
            };
            transporter.sendMail(mailOptions1, (error, info) => {
              if (error) {
                console.log(error);
                //return res.json({status: 0, response : { msg: 'There was an email error',}  });
              } else {
              }
            });
          });
          return res.json({ status: 1, 'response': { data: result } });
        }
      });

    } else {

        User.addUser(obj, async function (err, data) {
          var eventobj = {
            event_id: event_id,
            user_id: data[0].id,
            payment_id: (req.body.payment_id) ? req.body.payment_id : '',
            event_purchase_date: moment().format('YYYY-MM-DD')
          }
          Event.addEventPurchase(eventobj, function (err, result) {
            if (err) {
              return res.json({ status: 0, 'response': { msg: err } });
            } else {

              Event.getEventDataById(event_id, function (err, eventdata) {
                var eventLink;
                var home_url;
                var admin_app_url;
                var hostname = req.headers.host;
                var registerURL;

                if (hostname == env.LOCAL_HOST_USER_APP) {
                  home_url = env.APP_URL;
                  eventLink = env.APP_URL + 'event-promo?id=' + event_id;
                  admin_app_url = env.ADMIN_APP_URL
                  registerURL = env.APP_URL + 'register?code=' + obj.email_verification_token
                } else {
                  home_url = env.APP_URL;
                  eventLink = env.APP_URL + 'event-promo?id=' + event_id;
                  admin_app_url = env.ADMIN_APP_URL
                  registerURL = env.APP_URL + 'register?code=' + obj.email_verification_token
                }
                var htmlUser = fs.readFileSync(__dirname + '/templates/event/EventInvitationNewUser.html', 'utf8');
                
                var dynamicHtml = {
                  home_url: home_url,
                  fullname: data[0].first_name,
                  eventLink: (eventdata[0].zoom_join_link) ? eventdata[0].zoom_join_link : eventLink, 
                  registerURL: registerURL,
                  event_title: eventdata[0].title,
                  start_date: moment(eventdata[0].start_date).format('MMM DD, YYYY') + " at " + moment(eventdata[0].start_date).format('hh:mm a') + "  -  " + moment(eventdata[0].end_date).format('MMM DD, YYYY') + " at " + moment(eventdata[0].end_date).format('hh:mm a'),
                  event_price: (eventdata[0].cost > 0) ? '$'+eventdata[0].cost : 'Free',
                  event_image: (eventdata[0].image) ? imageLink + env.EVENT_VIEW_PATH + eventdata[0].image : ''
                }

                var view = { data: dynamicHtml };
                var finalHtmlUser = mustache.render(htmlUser, view);
                let transporter = nodemailer.createTransport(nodeMailerCredential); // node mailer credentials
                let mailOptions1 = {
                  from: env.MAIL_FROM, // sender address
                  to: email,
                  subject: 'Your Tickets for' + event_title,
                  html: finalHtmlUser.replace(/&#x2F;/g, '/')
                };
                transporter.sendMail(mailOptions1, (error, info) => {
                  if (error) {
                    console.log(error);
                    //return res.json({status: 0, response : { msg: 'There was an email error',}  });
                  } else {
                  }
                });
                return res.json({ status: 1, 'response': { data: result } });
              });
            }
          });
        });
    }
  });
});

function generateSignature(apiKey, apiSecret, meetingNumber, role) {
  return new Promise((res, rej) => {
    // Prevent time sync issue between client signature generation and zoom
    const timestamp = new Date().getTime() - 30000;
    const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString(
      "base64"
    );
    const hash = crypto
      .createHmac("sha256", apiSecret)
      .update(msg)
      .digest("base64");
    const signature = Buffer.from(
      `${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`
    ).toString("base64");

    res(signature);
  });
}


function generateSignature(apiKey, apiSecret, meetingNumber, role) {
  return new Promise((res, rej) => {
    // Prevent time sync issue between client signature generation and zoom
    const timestamp = new Date().getTime() - 30000;
    const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString(
      "base64"
    );
    const hash = crypto
      .createHmac("sha256", apiSecret)
      .update(msg)
      .digest("base64");
    const signature = Buffer.from(
      `${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`
    ).toString("base64");

    res(signature);
  });
}






router.post("/createSignature", (req, res) => {
  var apiSecret = "vKLGTPvGdubOtar8VD4UlWmVhZTAyoZIK1Td";
  var apiKey = "o4xds6wbTjiKWl7swm19aA";
  var meetingNumber = req.body.meetingNumber;

  var signature = "";
  generateSignature(apiKey, apiSecret, meetingNumber, 0).then((res) => {
      signature = res
  });

  console.log("body", req.body);
  var userEmail = req.body.userEmail;
  var userName = req.body.userName;
  var passWord = req.body.passWord;

  setTimeout(() => {
    res.json({
      signature: signature,
      userName: userName,
      apiKey: apiKey,
      userEmail: userEmail,
      passWord: passWord,
      meetingNumber: meetingNumber,
    })  
  }, 100);
 
  
});




router.post('/newmeeting', function (req, res) {

  const payload = {
    iss: 'o4xds6wbTjiKWl7swm19aA',
    exp: ((new Date()).getTime() + 500000000000)
  };
  const token = jwt.sign(payload, 'vKLGTPvGdubOtar8VD4UlWmVhZTAyoZIK1Td');

  // var options = {
  //   method: "POST",
  //   uri: "https://api.zoom.us/v2/users",
  //   body: {
  //     "action": "create",
  //     "user_info": {
  //       "email": "jchill@example.com",
  //       "first_name": "Jill",
  //       "last_name": "Chill",
  //       "password": "if42!LfH@",
  //       "type": 1,
  //       "feature": {
  //         "zoom_phone": ""
  //       }
  //     }
  //   },  
  //   auth: {
  //     bearer: token
  //   },
  //   headers: {
  //     "content-type": "application/json"
  //   },
  //   json: true //Parse the JSON string in the response
  // };

  // requestPromise(options).then(function (user_res) { 
  //   console.log(user_res);

  // });

  var apiSecret = "vKLGTPvGdubOtar8VD4UlWmVhZTAyoZIK1Td";
  var apiKey = "o4xds6wbTjiKWl7swm19aA"; 
  const email = "dipika.letsnurture@gmail.com";
  
  var options = {
    method: "POST",
    uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
    body: {
      topic: "test meeting title",
      type: 1,
      settings: {
        host_video: "true",
        participant_video: "true"
      }
    },
    auth: {
      bearer: token
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json"
    },
    json: true //Parse the JSON string in the response
  };

  requestPromise(options).then(function (response) {

    return res.json({ status: 1, 'response': { data: (response) } });
      
    console.log(response.id);
    var signature = '';

    // generateSignature(apiKey, apiSecret, response.id, 0).then((res) => {
    //   signature = res
    // });

    // setTimeout(() => {
    //   return res.json({ status: 1, 'response': { data: (response), signatures: signature } });
    // }, 50);
    
    })
    .catch(function (err) {
      // API call failed...
      console.log("API call failed, reason ", err);
    });
});




module.exports = router;
