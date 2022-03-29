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

      var start_date = (parsed.start_date) ? moment(parsed.start_date, "YYYY-MM-DD").add(1, 'days').format("YYYY-MM-DD") : ''
      var end_date = (parsed.end_date) ? moment(parsed.end_date, "YYYY-MM-DD").add(1, 'days').format("YYYY-MM-DD") : ''

      var record = {
        title: parsed.title,
        description: parsed.description,
        status: parsed.status,
        location: parsed.location,
       // category: parsed.category,
        organization: parsed.organization,
        start_date: start_date,
        end_date: end_date,
        created_at: moment().format("YYYY-MM-DD"),
        group_session: [],
        image: "",
        promo_image:"",
        promo_title: parsed.promo_title,
        promo_description: parsed.promo_description,
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
     const start_time = new Date(record.start_date).getTime() / 1000,
      end_time = new Date(record.end_date).getTime() / 1000;
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
              if (typeof files.promo_image !== "undefined") {
                let file_ext = files.promo_image.name.split(".").pop();
                let filename = Date.now() + "-" + files.promo_image.name.split(" ").join("");
                let tmp_path = files.promo_image.path;
                if (file_ext == "png" || file_ext == "PNG" || file_ext == "jpg" || file_ext == "JPG" || file_ext == "jpeg" || file_ext == "JPEG") {
                  fs.rename(tmp_path, path.join(__dirname, env.EVENT_PATH + filename),function (err) {
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
                  return res.json({ status: 0,response: {msg: "Only image with jpg, jpeg and png format are allowed",} });
                }
              } else {
                overview["image"] = "";
                done1(err, overview);
              }
            },

            function (overview, done2) {
              setTimeout(() => {
                Event.addEventByadmin(record, resources, function (err, data) {
                  if (err) {
                    done2(err, data);
                  } else {
                    done2(err, data);
                  }
                });
              }, 100);          
            },
            function (data, done3) {
              const event = nylas.events.build({
                title: record.title,
                calendarId:  env.NYLAS_CALENDAR_ID,
                when: { start_time: start_time, end_time: end_time },
                participants: env.NYLAS_PARTICIPANTS,
                location: fields.location,
              });
              event.save({ notify_participants: true }).then((event) => {
                done3(err, data);
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
            event['event_id'] = result[0].event_id;
            event['title'] = result[0].title;
            event['description'] = result[0].description;            
            event['start_date'] = (result[0].start_date) ? moment(result[0].start_date).format('YYYY/MM/DD') :'';
            event['end_date'] = (result[0].end_date) ? moment(result[0].end_date).format('YYYY/MM/DD') : '';
            event['location'] = result[0].location;
            event['organization'] = result[0].organization;
            event['image'] = (result[0].image) ? imageLink + env.EVENT_VIEW_PATH + result[0].image : '';
            event['status'] = result[0].status;  
            event['promo_title'] = result[0].promo_title;
            event['promo_image'] = (result[0].promo_image) ? imageLink + env.EVENT_VIEW_PATH + result[0].promo_image : '';
            event['promo_description'] = result[0].promo_description;
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
    var start_date = (obj.start_date) ? moment(obj.start_date, "YYYY-MM-DD").add(1, 'days').format("YYYY-MM-DD") : ''
    var end_date = (obj.end_date) ? moment(obj.end_date, "YYYY-MM-DD").add(1, 'days').format("YYYY-MM-DD") : ''

    var event_id = obj.event_id;
    var deleteresources = obj.deleteresources;
    var record = {
      title: obj.title,
      description: obj.description,
      location: obj.location,
      organization: obj.organization,
      start_date: start_date,
      end_date: end_date,
    };

    var promo_record = {
      promo_title: obj.promo_title,
      promo_description: obj.promo_description,
    }

      var update_value = [obj.title, obj.description, obj.location, obj.organization, start_date, end_date];
      var group_session = []

      if (obj.sessionTitle.length > 0){
        for (let i = 0; i < obj.sessionTitle.length; i++) {
          let data = {
            title: obj.sessionTitle[i].value,
            description: obj.sessionDescription[i].value,
            url: obj.sessionURL[i].value,
          };
          group_session.push(data);
        }
      }
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
    
    
    const start_time = new Date(record.start_date).getTime() / 1000,
    end_time = new Date(record.end_date).getTime() / 1000;

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
        function (overview, done1) {
          if (typeof files.promo_image !== "undefined") {
            let file_ext = files.promo_image.name.split(".").pop();
            let filename = Date.now() + "-" + files.promo_image.name.split(" ").join("");
            let tmp_path = files.promo_image.path;

            if (file_ext == "png" || file_ext == "PNG" || file_ext == "jpg" || file_ext == "JPG" || file_ext == "jpeg" || file_ext == "JPEG") {
              fs.rename(tmp_path, path.join(__dirname, env.EVENT_PATH + filename), function (err) {
                if (err) {
                  promo_record.promo_image = filename;
                  done1("Image upload error", overview)
                } else {
                  promo_record.promo_image = filename;
                  overview["promo_image"] = filename;
                  done1(err, overview);
                }
              });
            } else {
              return res.json({ status: 0, response: { msg: "Only image with jpg, jpeg and png format are allowed" } });
            }
          } else {
            overview["promo_image"] = "";
            done1(err, overview);
          }
        },
        function (overview, done2) { 
          setTimeout(() => {
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
        retObj['image'] = (data.image) ? imageLink + env.EVENT_VIEW_PATH + data.image : '';
        retObj['day'] = (data.start_date) ? moment(data.start_date).format('ddd') : '';
        retObj['date'] = (data.start_date) ? moment(data.start_date).format('DD') : '';
        retObj['start_date'] = (data.start_date) ? moment(data.start_date).format('MMM Do YYYY') : '';
        retObj['end_date'] = (data.end_date) ? moment(data.end_date).format('MMM Do YYYY') : '';
        retObj['status'] = data.status;
        return retObj;
      });
      return res.json({ status: 1, 'response': { data: eventList } });
    }
  });
});

module.exports = router;
