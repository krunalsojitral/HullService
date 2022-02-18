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
var Nylas = require("nylas");

Nylas.config({
  clientId: env.NYLAS_CLIENT_ID,
  clientSecret: env.NYLAS_CLIENT_SECRET,
});
var nylas = Nylas.with(env.NYLAS_TOKEN);

function loggerData(req) {
  if (env.DEBUG) {
    var URL = "Url:-" + JSON.stringify(req.originalUrl, null, 4) + "\n";
    //  console.log(moment().format('YYYY-MM-DD h:m:s A') + ": " + URL);
  }
}

router.post("/addEventByadmin", function (req, res) {
  var form = new formidable.IncomingForm();
  form.multiples = true;
  form.parse(req, function (err, fields, files) {
    if (err) return res.json({ status: 1, response: { msg: err } });
    var validationErrors = false;
    if (validationErrors == false) {
      let parsed = JSON.parse(fields.data);
      var record = {
        title: parsed.title,
        description: parsed.description,
        status: parsed.status,
        location: parsed.location,
        category: parsed.category,
        organization: parsed.organization,
        start_date: parsed.start_date,
        end_date: parsed.end_date,
        created_at: moment().format("YYYY-MM-DD"),
        group_session: [],
        resources: [],
        image: "",
      };
      for (let i = 0; i < parsed.sessionTitle.length; i++) {
        let data = {
          title: parsed.sessionTitle[i].value,
          description: parsed.sessionDescription[i].value,
          url: parsed.sessionURL[i].value,
        };
        record.group_session.push(data);
      }
      parsed.videoURL.map((el) => {
        let data = {
          path: el.value,
          type: "videoURL",
        };
        record.resources.push(data);
      });
      parsed.webPageUrl.map((el) => {
        let data = {
          path: el.value,
          type: "webPageUrl",
        };
        record.resources.push(data);
      });
      var filenames = Object.entries(files).filter((el) => el[0] != "image");
    }
     const start_time = new Date(record.start_date).getTime() / 1000,
      end_time = new Date(record.end_date).getTime() / 1000;
    asyn.waterfall(
      [
        function (done) {
          if(filenames.length>0){
            filenames[0][1].forEach((el) => {
              let file_ext = el.name.split(".").pop();
              let filename = Date.now() + "-" + el.name.split(" ").join("");
              let tmp_path = el.path.replace("\\","/");

              fs.rename(
                tmp_path,
                path.join(__dirname, env.EVENT_PATH + filename),
                function (err) {
                  let data = {
                    path: filename,
                    type: "fileUpload",
                  };
                  record.resources.push(data);
                }
              );
            });
          }
          let overview = {};
          if (typeof files.image !== "undefined") {
            let file_ext = files.image.name.split(".").pop();
            let filename =
              Date.now() + "-" + files.image.name.split(" ").join("");
            let tmp_path = files.image.path;
            if (
              file_ext == "png" ||
              file_ext == "PNG" ||
              file_ext == "jpg" ||
              file_ext == "JPG" ||
              file_ext == "jpeg" ||
              file_ext == "JPEG"
            ) {
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

        function (overview, done1) {
          Event.addEventByadmin(record, function (err, data) {
            if (err) {
              done1(err, data);
            } else {
              done1(err, data);
            }
          });
        },
        function (data, done2) {
          const event = nylas.events.build({
            title: record.title,
            calendarId:  env.NYLAS_CALENDAR_ID,
            when: { start_time: start_time, end_time: end_time },
            participants: env.NYLAS_PARTICIPANTS,
            location: fields.location,
          });
          event.save({ notify_participants: true }).then((event) => {
            done2(err, data);
          });
        },
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
      }
    );
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
        return res.json({ status: 1, 'response': { msg: 'Event deleted successfully', data: result } });
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
            event['event_id'] = result[0].event_id;
            event['title'] = result[0].title;
            event['description'] = result[0].description;            
            event['start_date'] = (result[0].start_date) ? moment(result[0].start_date).format('YYYY/MM/DD') :'';
            event['end_date'] = (result[0].end_date) ? moment(result[0].end_date).format('YYYY/MM/DD') : '';
            event['location'] = result[0].location;
            event['organization'] = result[0].organization;
            event['image'] = (result[0].image) ? imageLink + env.EVENT_VIEW_PATH + result[0].image : '';
            event['status'] = result[0].status;  
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
                retObj['path'] = (data.path) ? imageLink + env.EVENT_VIEW_PATH + data.path : '';
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

module.exports = router;
