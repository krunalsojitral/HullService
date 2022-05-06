"use strict";
var express = require("express");
const rp = require("request-promise");
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
var passport = require("passport");
var mustache = require("mustache");
var nodemailer = require("nodemailer");
const nodeMailerCredential = require("./../EmailCredential");
var User = require("../models/user");
var shortid = require("shortid");
const requestPromise = require("request-promise");
const jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");
const crypto = require("crypto");
const {
  checkUserPresent,
  addzoomuser,
} = require("../controller/function/eventfunction");

const {
  addEventByadmin,
  updataEventByadmin,
} = require("../controller/eventController");

const {
  sendmail,
  getInformations,
  addMembers,
} = require("../config/mailchimp");

function loggerData(req) {
  if (env.DEBUG) {
    var URL = "Url:-" + JSON.stringify(req.originalUrl, null, 4) + "\n";
    //  console.log(moment().format('YYYY-MM-DD h:m:s A') + ": " + URL);
  }
}
router.post("/addEventByadmin", addEventByadmin);
router.post("/updateEventByadmin", updataEventByadmin);
router.get("/addmember", sendmail);

router.post("/checkalreadyzoom", async (req, res) => {
  const options = await checkUserPresent();
  rp(options)
    .then(async (response) => {
      var userArray = response.users;
      const already = userArray.find((user) => user.email == req.body.email);
      if (already) {
        return res.status(200).send({ status: true, message: "user exist" });
      } else {
        await addzoomuser(req.body.email);
        return res
          .status(404)
          .send({ status: true, message: "user not exist" });
      }
    })
    .catch(function (err) {});
});
router.get("/getEventList", function (req, res) {
  loggerData(req);
  var status = req.query.status;
  Event.getAllAdminEvent(status, function (err, result) {
    if (err) {
      return res.json({ status: 0, response: { msg: err } });
    } else {
      var eventList = result.map((data) => {
        let retObj = {};
        retObj["event_id"] = data.event_id;
        retObj["title"] = data.title;
        retObj["start_date"] = data.start_date
          ? moment(data.start_date).format("YYYY-MM-DD")
          : "";
        retObj["end_date"] = data.end_date
          ? moment(data.end_date).format("YYYY-MM-DD")
          : "";
        retObj["status"] = data.status;
        return retObj;
      });
      return res.json({ status: 1, response: { data: eventList } });
    }
  });
});

router.get("/listEventPurchace", function (req, res) {
  loggerData(req);
  var status = req.query.status;
  Event.listEventPurchace(status, function (err, result) {
    if (err) {
      return res.json({ status: 0, response: { msg: err } });
    } else {
      var eventList = result.map((data) => {
        let retObj = data;
        return retObj;
      });
      return res.json({ status: 1, response: { data: eventList } });
    }
  });
});

router.get("/listUserEmail", function (req, res) {
  loggerData(req);
  var status = req.query.status;
  Event.listUserEmail(status, function (err, result) {
    if (err) {
      return res.json({ status: 0, response: { msg: err } });
    } else {
      var eventList = result.map((data) => {
        let retObj = data;
        return retObj;
      });
      return res.json({ status: 1, response: { data: eventList } });
    }
  });
});

router.post(
  "/changeEventStatus",
  [
    check("event_id", "Event id is required").notEmpty(),
    check("status", "Please enter status").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      var error = errors.array();
      res.json({
        status: 0,
        response: { msg: error[0].msg, dev_msg: error[0].msg },
      });
    } else {
      let event_id = req.body.event_id;
      let record = {
        status: req.body.status,
      };
      Event.changeEventStatus(record, event_id, function (err, result) {
        if (err) {
          return res.json({ status: 0, response: { msg: "Error Occured." } });
        } else {
          if (result) {
            return res.json({
              status: 1,
              response: { msg: "Status Changed successfully." },
            });
          } else {
            return res.json({
              status: 0,
              response: { msg: "Data not found." },
            });
          }
        }
      });
    }
  }
);

router.post(
  "/deleteEvent",
  [check("event", "Event is required").notEmpty()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      var error = errors.array();
      res.json({
        status: 0,
        response: { msg: error[0].msg, dev_msg: error[0].msg },
      });
    } else {
      loggerData(req);
      let event = req.body.event;
      Event.deleteEvent(event, function (err, result) {
        if (err) {
          return res.json({ status: 0, response: { msg: err } });
        } else {
          return res.json({
            status: 1,
            response: { msg: "Event(s) deleted successfully", data: result },
          });
        }
      });
    }
  }
);

router.post(
  "/getEventDataById",
  [check("event_id", "Event is required").notEmpty()],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      var error = errors.array();
      res.json({
        status: 0,
        response: { msg: error[0].msg, dev_msg: error[0].msg },
      });
    } else {
      let event_id = req.body.event_id;
      asyn.waterfall(
        [
          function (done) {
            Event.getEventDataById(event_id, function (err, result) {
              if (err) {
                done({ status: 0, response: { msg: "Something went wrong." } });
              } else {
                var imageLink;
                if (req.headers.host == env.ADMIN_LIVE_URL) {
                  imageLink = env.ADMIN_LIVE_URL;
                } else {
                  imageLink = env.ADMIN_LIVE_URL;
                }
                let event = {};

                if (result.length > 0) {
                  event["event_id"] = event_id;
                  event["title"] = result[0]?.title;
                  event["description"] = result[0]?.description;
                  event["start_date"] = result[0]?.start_date
                    ? moment(result[0].start_date).format("YYYY/MM/DD h:mm a")
                    : "";
                  event["end_date"] = result[0].end_date
                    ? moment(result[0].end_date).format("YYYY/MM/DD h:mm a")
                    : "";
                  event["user_start_date"] = result[0].start_date
                    ? moment(result[0].start_date).format("MMM Do YYYY h:mm a")
                    : "";
                  event["user_end_date"] = result[0].end_date
                    ? moment(result[0].end_date).format("MMM Do YYYY h:mm a")
                    : "";
                  event["start_time"] = result[0].start_date
                    ? moment(result[0].start_date).format("h:mm a")
                    : "";
                  event["end_time"] = result[0].end_date
                    ? moment(result[0].end_date).format("h:mm a")
                    : "";
                  event["location"] = result[0].location;
                  event["about_speaker"] = result[0].about_speaker;
                  event["event_type"] = result[0].event_type;
                  event["video_link"] = result[0].video_link;
                  event["timezone"] = result[0].timezone;
                  event["speaker_name"] = result[0].speaker_name;
                  event["speaker_image"] = result[0].speaker_image
                    ? imageLink + env.EVENT_VIEW_PATH + result[0].speaker_image
                    : "";
                  event["image"] = result[0].image
                    ? imageLink + env.EVENT_VIEW_PATH + result[0].image
                    : "";
                  event["status"] = result[0].status;
                  event["cost"] = result[0].cost;
                  event["purchase_type"] = result[0].purchase_type;
                  event["event_purchase_id"] = result[0].event_purchase_id;
                  event["session_title"] = result[0].session_title;
                  event["session_image"] = result[0].session_image
                    ? imageLink + env.EVENT_VIEW_PATH + result[0].session_image
                    : "";
                  event["session_about"] = result[0].session_about;
                  event["session_group_count"] = result[0].session_group_count;
                  event["session_count"] = result[0].session_count;
                  event["session_type"] = result[0].session_type;
                  event["session_location"] = result[0].session_location;
                  event["session_purchase_type"] =
                    result[0].session_purchase_type;
                  event["session_cost"] = result[0].session_cost;
                  event["cohost"] = result;
                  event["group_session"] = [];
                  event["videoURL"] = [];
                  event["webPageUrl"] = [];
                  event["resource"] = [];
                }
                done(err, event);
              }
            });
          },
          function (event, done1) {
            if (event["event_id"] != "") {
              Event.getGroupSessionByEventId(
                event["event_id"],
                function (err, result) {
                  if (result && result.length > 0) {
                    event["group_session"] = result;
                    done1(null, event);
                  } else {
                    done1(null, event);
                  }
                }
              );
            } else {
              done1(null, event);
            }
          },
          function (event, done2) {
            if (event["event_id"] != "") {
              Event.getVideoByEventId(
                event["event_id"],
                function (err, result) {
                  if (result && result.length > 0) {
                    event["videoURL"] = result;
                    done2(null, event);
                  } else {
                    done2(null, event);
                  }
                }
              );
            } else {
              done2(null, event);
            }
          },
          function (event, done3) {
            if (event["event_id"] != "") {
              Event.getWebURLByEventId(
                event["event_id"],
                function (err, result) {
                  if (result && result.length > 0) {
                    event["webPageUrl"] = result;
                    done3(null, event);
                  } else {
                    done3(null, event);
                  }
                }
              );
            } else {
              done3(null, event);
            }
          },
          function (event, done4) {
            if (event["event_id"] != "") {
              Event.getResourceByEventId(
                event["event_id"],
                function (err, result) {
                  if (result && result.length > 0) {
                    var imageLink;
                    if (req.headers.host == env.ADMIN_LIVE_URL) {
                      imageLink = env.ADMIN_LIVE_URL;
                    } else {
                      imageLink = env.ADMIN_LIVE_URL;
                    }
                    var obj = result.map((data, index) => {
                      let retObj = {};
                      retObj["event_resource_id"] = data.event_resource_id;
                      retObj["file"] = data.path
                        ? imageLink + env.EVENT_VIEW_PATH + data.path
                        : "";
                      retObj["name"] = data.path;
                      retObj["type"] = data.file_type;
                      retObj["event_id"] = data.event_id;
                      return retObj;
                    });
                    event["resource"] = obj;
                    done4(null, event);
                  } else {
                    done4(null, event);
                  }
                }
              );
            } else {
              done4(null, event);
            }
          },
        ],
        function (error, event) {
          if (error) {
            return res.json({ status: 0, response: { msg: error } });
          } else {
            return res.json({
              status: 1,
              response: { data: event, msg: "data found" },
            });
          }
        }
      );
    }
  }
);

router.post(
  "/getEventDataByIdWithLogin",
  passport.authenticate("jwt", { session: false }),
  [check("event_id", "Event is required").notEmpty()],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      var error = errors.array();
      res.json({
        status: 0,
        response: { msg: error[0].msg, dev_msg: error[0].msg },
      });
    } else {
      let event_id = req.body.event_id;
      asyn.waterfall(
        [
          function (done) {
            var user_id = req.user.id;
            Event.getEventDataByIdWithLogin(
              user_id,
              event_id,
              function (err, result) {
                if (err) {
                  done({
                    status: 0,
                    response: { msg: "Something went wrong." },
                  });
                } else {
                  var imageLink;
                  if (req.headers.host == env.ADMIN_LIVE_URL) {
                    imageLink = env.ADMIN_LIVE_URL;
                  } else {
                    imageLink = env.ADMIN_LIVE_URL;
                  }
                  let event = {};
                  event["event_id"] = event_id;
                  event["title"] = result[0].title;
                  event["description"] = result[0].description;
                  event["start_date"] = result[0].start_date
                    ? moment(result[0].start_date).format("YYYY/MM/DD h:mm a")
                    : "";
                  event["end_date"] = result[0].end_date
                    ? moment(result[0].end_date).format("YYYY/MM/DD h:mm a")
                    : "";
                  event["user_start_date"] = result[0].start_date
                    ? moment(result[0].start_date).format("MMM Do YYYY h:mm a")
                    : "";
                  event["user_end_date"] = result[0].end_date
                    ? moment(result[0].end_date).format("MMM Do YYYY h:mm a")
                    : "";
                  event["start_time"] = result[0].start_date
                    ? moment(result[0].start_date).format("h:mm a")
                    : "";
                  event["end_time"] = result[0].end_date
                    ? moment(result[0].end_date).format("h:mm a")
                    : "";
                  event["location"] = result[0].location;
                  event["about_speaker"] = result[0].about_speaker;
                  event["event_type"] = result[0].event_type;
                  event["video_link"] = result[0].video_link;
                  event["timezone"] = result[0].timezone;
                  event["speaker_name"] = result[0].speaker_name;
                  event["speaker_image"] = result[0].speaker_image
                    ? imageLink + env.EVENT_VIEW_PATH + result[0].speaker_image
                    : "";
                  event["image"] = result[0].image
                    ? imageLink + env.EVENT_VIEW_PATH + result[0].image
                    : "";
                  event["status"] = result[0].status;
                  event["cost"] = result[0].cost;
                  event["zoom_link"] = result[0]?.zoom_join_link;
                  event["purchase_type"] = result[0].purchase_type;
                  event["event_purchase_id"] = result[0].event_purchase_id;
                  event["session_title"] = result[0].session_title;
                  event["session_image"] = result[0].session_image
                    ? imageLink + env.EVENT_VIEW_PATH + result[0].session_image
                    : "";
                  event["session_about"] = result[0].session_about;
                  event["session_group_count"] = result[0].session_group_count;
                  event["session_count"] = result[0].session_count;
                  event["session_type"] = result[0].session_type;
                  event["session_location"] = result[0].session_location;
                  event["session_purchase_type"] =
                    result[0].session_purchase_type;
                  event["session_cost"] = result[0].session_cost;
                  event["group_session"] = [];
                  event["videoURL"] = [];
                  event["webPageUrl"] = [];
                  event["resource"] = [];
                  done(err, event);
                }
              }
            );
          },
          function (event, done1) {
            if (event["event_id"] != "") {
              Event.getGroupSessionByEventId(
                event["event_id"],
                function (err, result) {
                  if (result && result.length > 0) {
                    event["group_session"] = result;
                    done1(null, event);
                  } else {
                    done1(null, event);
                  }
                }
              );
            } else {
              done1(null, event);
            }
          },
          function (event, done2) {
            if (event["event_id"] != "") {
              Event.getVideoByEventId(
                event["event_id"],
                function (err, result) {
                  if (result && result.length > 0) {
                    event["videoURL"] = result;
                    done2(null, event);
                  } else {
                    done2(null, event);
                  }
                }
              );
            } else {
              done2(null, event);
            }
          },
          function (event, done3) {
            if (event["event_id"] != "") {
              Event.getWebURLByEventId(
                event["event_id"],
                function (err, result) {
                  if (result && result.length > 0) {
                    event["webPageUrl"] = result;
                    done3(null, event);
                  } else {
                    done3(null, event);
                  }
                }
              );
            } else {
              done3(null, event);
            }
          },
          function (event, done4) {
            if (event["event_id"] != "") {
              Event.getResourceByEventId(
                event["event_id"],
                function (err, result) {
                  if (result && result.length > 0) {
                    var imageLink;
                    if (req.headers.host == env.ADMIN_LIVE_URL) {
                      imageLink = env.ADMIN_LIVE_URL;
                    } else {
                      imageLink = env.ADMIN_LIVE_URL;
                    }
                    var obj = result.map((data, index) => {
                      let retObj = {};
                      retObj["event_resource_id"] = data.event_resource_id;
                      retObj["file"] = data.path
                        ? imageLink + env.EVENT_VIEW_PATH + data.path
                        : "";
                      retObj["name"] = data.path;
                      retObj["type"] = data.file_type;
                      retObj["event_id"] = data.event_id;
                      return retObj;
                    });
                    event["resource"] = obj;
                    done4(null, event);
                  } else {
                    done4(null, event);
                  }
                }
              );
            } else {
              done4(null, event);
            }
          },
        ],
        function (error, event) {
          if (error) {
            return res.json({ status: 0, response: { msg: error } });
          } else {
            return res.json({
              status: 1,
              response: { data: event, msg: "data found" },
            });
          }
        }
      );
    }
  }
);

router.post("/checkalreadylogin", (req, res) => {
  if (!req.body.email) {
    return res.status(404).send({ message: "failure" });
  }
  Event.checkuser(req.body.email, function (err, result) {
    if (err) {
      if (err?.password) {
        res.status(200).send({ message: "success" });
      } else {
        res.status(404).send({ message: "failure" });
      }
    } else {
      if (result?.password) {
        res.status(200).send({ message: "success" });
      } else {
        res.status(404).send({ message: "failure" });
      }
    }
  });
});

router.post("/getallevents", (req, res) => {
  Event.alleventdata(req.body.event_id, function (result) {
    res.send({ data: result });
  });
});

router.post("/getreflective", (req, res) => {
  Event.getmemeberlimit(req.body.event_id, function (result) {
    res.send({ data: result });
  });
});

router.get("/getAllAdminEventPromoList", function (req, res) {
  loggerData(req);
  var status = req.query.status;
  Event.getAllAdminEventPromoList(status, function (err, result) {
    if (err) {
      return res.json({ status: 0, response: { msg: err } });
    } else {
      var eventList = result.map((data) => {
        let retObj = {};
        retObj["event_promo_id"] = data.event_promo_id;
        retObj["title"] = data.promo_title;
        retObj["status"] = data.status;
        return retObj;
      });
      return res.json({ status: 1, response: { data: eventList } });
    }
  });
});

router.get("/getEventPromoList", function (req, res) {
  loggerData(req);
  Event.getEventPromoList(function (err, result) {
    if (err) {
      return res.json({ status: 0, response: { msg: err } });
    } else {
      var eventList = result.map((data) => {
        let retObj = {};
        retObj["event_id"] = data.event_id;
        retObj["title"] = data.title;
        retObj["status"] = data.status;
        return retObj;
      });
      return res.json({ status: 1, response: { data: eventList } });
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
      [
        function (done1) {
          if (typeof files.promo_image !== "undefined") {
            let file_ext = files.promo_image.name.split(".").pop();
            let filename =
              Date.now() + "-" + files.promo_image.name.split(" ").join("");
            let tmp_path = files.promo_image.path;
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
                  if (err) {
                    record.promo_image = filename;
                    done1("Image upload error", overview);
                  } else {
                    record.promo_image = filename;
                    overview["promo_image"] = filename;
                    done1(err, overview);
                  }
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
          return res.json({
            status: 1,
            response: { msg: "Event Promo added successfully.", data: data },
          });
        }
      }
    );
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
    let overview = {};
    asyn.waterfall(
      [
        function (done1) {
          if (typeof files.promo_image !== "undefined") {
            let file_ext = files.promo_image.name.split(".").pop();
            let filename =
              Date.now() + "-" + files.promo_image.name.split(" ").join("");
            let tmp_path = files.promo_image.path;
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
                  if (err) {
                    record.promo_image = filename;
                    done1("Image upload error", overview);
                  } else {
                    record.promo_image = filename;
                    overview["promo_image"] = filename;
                    done1(err, overview);
                  }
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
            done1(err, overview);
          }
        },
        function (overview, done2) {
          Event.updateEventPromoByadmin(
            record,
            event_promo_id,
            function (err, data) {
              if (err) {
                done2(err, null);
              } else {
                done2(err, data);
              }
            }
          );
        },
      ],
      function (error, data) {
        if (error) {
          return res.json({ status: 0, response: { msg: error } });
        } else {
          return res.json({
            status: 1,
            response: { msg: "Event Promo updated successfully.", data: data },
          });
        }
      }
    );
  });
});

router.post(
  "/getEventPromoDataById",
  [check("event_promo_id", "Event is required").notEmpty()],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      var error = errors.array();
      res.json({
        status: 0,
        response: { msg: error[0].msg, dev_msg: error[0].msg },
      });
    } else {
      let event_promo_id = req.body.event_promo_id;
      Event.getEventPromoDataById(event_promo_id, function (err, result) {
        if (err) {
          return res.json({ status: 0, response: { msg: error } });
        } else {
          var imageLink;
          if (req.headers.host == env.ADMIN_LIVE_URL) {
            imageLink = env.ADMIN_LIVE_URL;
          } else {
            imageLink = env.ADMIN_LIVE_URL;
          }
          let event = {};
          event["event_id"] = result[0].event_id;
          event["status"] = result[0].status;
          event["promo_title"] = result[0].promo_title;
          event["promo_image"] = result[0].promo_image
            ? imageLink + env.EVENT_VIEW_PATH + result[0].promo_image
            : "";
          event["promo_description"] = result[0].promo_description;
          return res.json({
            status: 1,
            response: { data: event, msg: "data found" },
          });
        }
      });
    }
  }
);

router.post(
  "/deletePromoEvent",
  [check("event", "Event is required").notEmpty()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      var error = errors.array();
      res.json({
        status: 0,
        response: { msg: error[0].msg, dev_msg: error[0].msg },
      });
    } else {
      loggerData(req);
      let event = req.body.event;
      Event.deletePromoEvent(event, function (err, result) {
        if (err) {
          return res.json({ status: 0, response: { msg: err } });
        } else {
          return res.json({
            status: 1,
            response: {
              msg: "Promo Event(s) deleted successfully",
              data: result,
            },
          });
        }
      });
    }
  }
);

router.post("/getUnpaidEventList", function (req, res) {
  loggerData(req);
  var search = {
    today: req.body.today,
    search: req.body.search,
    location: req.body.location,
  };
  Event.getUnpaidEventList(search, function (err, result) {
    if (err) {
      return res.json({ status: 0, response: { msg: err } });
    } else {
      var imageLink;
      if (req.headers.host == env.ADMIN_LIVE_URL) {
        imageLink = env.ADMIN_LIVE_URL;
      } else {
        imageLink = env.ADMIN_LIVE_URL;
      }
      var eventList = result.map((data) => {
        let retObj = {};
        retObj["event_id"] = data.event_id;
        retObj["title"] = data.title;
        retObj["description"] = data.description;
        retObj["location"] = data.location;
        retObj["purchase_type"] = data.purchase_type;
        retObj["speaker_name"] = data.speaker_name;
        retObj["speaker_image"] = data.speaker_image
          ? imageLink + env.EVENT_VIEW_PATH + data.speaker_image
          : "";
        retObj["cost"] = data.cost;
        retObj["image"] = data.image
          ? imageLink + env.EVENT_VIEW_PATH + data.image
          : "";
        retObj["day"] = data.start_date
          ? moment(data.start_date).format("ddd")
          : "";
        retObj["date"] = data.start_date
          ? moment(data.start_date).format("DD")
          : "";
        retObj["group_start_date"] = data.start_date
          ? moment(data.start_date).format("YYYY-MM-DD")
          : "";
        retObj["start_date"] = data.start_date
          ? moment(data.start_date).format("MM-DD-YYYY")
          : "";
        retObj["end_date"] = data.end_date
          ? moment(data.end_date).format("MM-DD-YYYY")
          : "";
        retObj["start_time"] = data.start_date
          ? moment(data.start_date).format("h:mm a")
          : "";
        retObj["end_time"] = data.end_date
          ? moment(data.end_date).format("h:mm a")
          : "";
        retObj["status"] = data.status;
        retObj["event_purchase_id"] = data.event_purchase_id;

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

      return res.json({ status: 1, response: { data: eventList } });
    }
  });
});

router.post(
  "/getMyEventList",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    loggerData(req);
    var user_id = req.user.id;
    Event.getMyEventList(user_id, function (err, result) {
      if (err) {
        return res.json({ status: 0, response: { msg: err } });
      } else {
        var imageLink;
        if (req.headers.host == env.ADMIN_LIVE_URL) {
          imageLink = env.ADMIN_LIVE_URL;
        } else {
          imageLink = env.ADMIN_LIVE_URL;
        }
        var eventList = result.map((data) => {
          let retObj = {};
          retObj["event_id"] = data.event_id;
          retObj["title"] = data.title;
          retObj["description"] = data.description;
          retObj["location"] = data.location;
          retObj["speaker_name"] = data.speaker_name;
          retObj["speaker_image"] = data.speaker_image
            ? imageLink + env.EVENT_VIEW_PATH + data.speaker_image
            : "";
          retObj["cost"] = data.cost;
          retObj["image"] = data.image
            ? imageLink + env.EVENT_VIEW_PATH + data.image
            : "";
          retObj["day"] = data.start_date
            ? moment(data.start_date).format("ddd")
            : "";
          retObj["date"] = data.start_date
            ? moment(data.start_date).format("DD")
            : "";
          retObj["group_start_date"] = data.start_date
            ? moment(data.start_date).format("YYYY-MM-DD")
            : "";
          retObj["start_date"] = data.start_date
            ? moment(data.start_date).format("MM-DD-YYYY")
            : "";
          retObj["end_date"] = data.end_date
            ? moment(data.end_date).format("MM-DD-YYYY")
            : "";
          retObj["start_time"] = data.start_date
            ? moment(data.start_date).format("h:mm a")
            : "";
          retObj["end_time"] = data.end_date
            ? moment(data.end_date).format("h:mm a")
            : "";
          retObj["status"] = data.status;
          return retObj;
        });
        return res.json({ status: 1, response: { data: eventList } });
      }
    });
  }
);

function getDateArr(arr) {
  var new_arr = {};
  for (var i = 0, len = arr.length; i < len; i++) {
    var Month_index = arr[i].group_start_date.lastIndexOf("-");
    var group_start_date = moment(
      arr[i].group_start_date.substr(0, Month_index)
    ).format("MMM YYYY");

    if (!new_arr[group_start_date]) {
      new_arr[group_start_date] = [];
      new_arr[group_start_date].push(arr[i]);
    } else {
      new_arr[group_start_date].push(arr[i]);
    }
  }
  return new_arr;
}

router.post(
  "/eventRegisterWithUser",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    loggerData(req);
    var imageLink;
    if (req.headers.host == env.ADMIN_LIVE_URL) {
      imageLink = env.ADMIN_LIVE_URL;
    } else {
      imageLink = env.ADMIN_LIVE_URL;
    }

    var event_id = req.body.event_id;
    var email = req.user.email;
    var first_name = req.user.first_name;
    var obj = {
      event_id: req.body.event_id,
      user_id: req.user.id,
      payment_id: req.body.payment_id ? req.body.payment_id : "",
      event_purchase_date: moment().format("YYYY-MM-DD"),
    };

    Event.addEventPurchase(obj, function (err, result) {
      if (err) {
        return res.json({ status: 0, response: { msg: err } });
      } else {
        Event.getEventDataById(event_id, function (err, eventdata) {
          var eventLink;
          var home_url;
          var admin_app_url;
          var hostname = req.headers.host;

          if (hostname == env.LOCAL_HOST_USER_APP) {
            home_url = env.APP_URL;
            eventLink = env.APP_URL + "event-promo?id=" + event_id;
            admin_app_url = env.ADMIN_APP_URL;
          } else {
            home_url = env.APP_URL;
            eventLink = env.APP_URL + "event-promo?id=" + event_id;
            admin_app_url = env.ADMIN_APP_URL;
          }

          var htmlUser = fs.readFileSync(
            __dirname + "/templates/event/EventInvitation.html",
            "utf8"
          );
          var dynamicHtml = {
            home_url: home_url,
            fullname: first_name,
            eventLink: eventLink,
            event_title: eventdata[0].title,
            start_date:
              moment(eventdata[0].start_date).format("MMM DD, YYYY") +
              " at " +
              moment(eventdata[0].start_date).format("hh:mm a") +
              "  -  " +
              moment(eventdata[0].end_date).format("MMM DD, YYYY") +
              " at " +
              moment(eventdata[0].end_date).format("hh:mm a"),
            event_price:
              eventdata[0].cost > 0 ? "$" + eventdata[0].cost : "Free",
            event_image: eventdata[0].image
              ? imageLink + env.EVENT_VIEW_PATH + eventdata[0].image
              : "",
          };
          var view = { data: dynamicHtml };

          var finalHtmlUser = mustache.render(htmlUser, view);

          let transporter = nodemailer.createTransport(nodeMailerCredential); // node mailer credentials

          let mailOptions1 = {
            from: env.MAIL_FROM, // sender address
            to: email,
            subject: "Your Tickets for" + eventdata[0].title,
            html: finalHtmlUser.replace(/&#x2F;/g, "/"),
          };

          transporter.sendMail(mailOptions1, (error, info) => {
            if (error) {
              //return res.json({status: 0, response : { msg: 'There was an email error',}  });
            } else {
            }
          });

          return res.json({ status: 1, response: { data: eventdata } });
        });
      }
    });
  }
);

router.post("/eventRegisterWithoutUser", function (req, res) {
  var imageLink;

  if (req.headers.host == env.ADMIN_LIVE_URL) {
    imageLink = env.ADMIN_LIVE_URL;
  } else {
    imageLink = env.ADMIN_LIVE_URL;
  }

  loggerData(req);

  var event_id = req.body.event_id;
  var email = req.body.email;
  var first_name = req.body.first_name;
  var event_title = req.body.event_title;

  var obj = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: email,
    email_verification_token: shortid.generate() + Date.now(),
    created_at: moment.utc().format("YYYY-MM-DD"),
    role: 4,
    status: 0,
    user_read_status: 0,
  };

  User.checkUserRegistration(email, function (err, data) {
    let totalrecord = data.length;
    if (totalrecord) {
      var eventobj = {
        event_id: event_id,
        user_id: data[0].id,
        payment_id: req.body.payment_id ? req.body.payment_id : "",
        event_purchase_date: moment().format("YYYY-MM-DD"),
      };
      Event.addEventPurchase(eventobj, function (err, result) {
        if (err) {
          return res.json({ status: 0, response: { msg: err } });
        } else {
          Event.getEventDataById(event_id, function (err, eventdata) {
            var eventLink;
            var registerURL;
            var home_url;
            var admin_app_url;
            var hostname = req.headers.host;

            if (hostname == env.LOCAL_HOST_USER_APP) {
              home_url = env.APP_URL;
              eventLink = env.APP_URL + "event-promo?id=" + event_id;
              registerURL =
                env.APP_URL +
                "register?code=" +
                data[0].email_verification_token;
              admin_app_url = env.ADMIN_APP_URL;
            } else {
              home_url = env.APP_URL;
              eventLink = env.APP_URL + "event-promo?id=" + event_id;
              registerURL =
                env.APP_URL +
                "register?code=" +
                data[0].email_verification_token;
              admin_app_url = env.ADMIN_APP_URL;
            }

            var htmlUser = fs.readFileSync(
              __dirname + "/templates/event/EventInvitation.html",
              "utf8"
            );

            var dynamicHtml = {
              home_url: home_url,
              fullname: first_name,
              eventLink: eventdata[0]?.zoom_join_link
                ? eventdata[0]?.zoom_join_link
                : eventLink,
              event_title: eventdata[0].title,
              start_date:
                moment(eventdata[0].start_date).format("MMM DD, YYYY") +
                " at " +
                moment(eventdata[0].start_date).format("hh:mm a") +
                "  -  " +
                moment(eventdata[0].end_date).format("MMM DD, YYYY") +
                " at " +
                moment(eventdata[0].end_date).format("hh:mm a"),
              event_price:
                eventdata[0].cost > 0 ? "$" + eventdata[0].cost : "Free",
              event_image: eventdata[0].image
                ? imageLink + env.EVENT_VIEW_PATH + eventdata[0].image
                : "",
            };

            console.log("allready user");
            console.log(dynamicHtml);

            if (data[0].role == 4 && data[0].email_verification_token) {
              dynamicHtml.registerURL = registerURL;
            }

            var view = { data: dynamicHtml };
            var finalHtmlUser = mustache.render(htmlUser, view);
            let transporter = nodemailer.createTransport(nodeMailerCredential); // node mailer credentials
            // let mailTransporter = nodemailer.createTransport();

            let mailOptions1 = {
              from: env.MAIL_FROM, // sender address
              to: email,
              subject: "Your Tickets for" + eventdata[0].title,
              html: finalHtmlUser.replace(/&#x2F;/g, "/"),
            };
            transporter.sendMail(mailOptions1, (error, info) => {
              if (error) {
                console.log(error);
              } else {
              }
            });
          });

          return res.json({ status: 1, response: { data: result } });
        }
      });
    } else {
      User.addUser(obj, async function (err, data) {
        var eventobj = {
          event_id: event_id,
          user_id: data[0].id,
          payment_id: req.body.payment_id ? req.body.payment_id : "",
          event_purchase_date: moment().format("YYYY-MM-DD"),
        };
        Event.addEventPurchase(eventobj, function (err, result) {
          if (err) {
            return res.json({ status: 0, response: { msg: err } });
          } else {
            Event.getEventDataById(event_id, function (err, eventdata) {
              var eventLink;
              var home_url;
              var admin_app_url;
              var hostname = req.headers.host;
              var registerURL;

              if (hostname == env.LOCAL_HOST_USER_APP) {
                home_url = env.APP_URL;
                eventLink = env.APP_URL + "event-promo?id=" + event_id;
                admin_app_url = env.ADMIN_APP_URL;
                registerURL =
                  env.APP_URL + "register?code=" + obj.email_verification_token;
              } else {
                home_url = env.APP_URL;
                eventLink = env.APP_URL + "event-promo?id=" + event_id;
                admin_app_url = env.ADMIN_APP_URL;
                registerURL =
                  env.APP_URL + "register?code=" + obj.email_verification_token;
              }
              var htmlUser = fs.readFileSync(
                __dirname + "/templates/event/EventInvitationNewUser.html",
                "utf8"
              );
              var dynamicHtml = {
                home_url: home_url,
                fullname: data[0].first_name,
                eventLink: eventdata[0]?.zoom_join_link
                  ? eventdata[0]?.zoom_join_link
                  : eventLink,
                registerURL: registerURL,
                event_title: eventdata[0].title,
                start_date:
                  moment(eventdata[0].start_date).format("MMM DD, YYYY") +
                  " at " +
                  moment(eventdata[0].start_date).format("hh:mm a") +
                  "  -  " +
                  moment(eventdata[0].end_date).format("MMM DD, YYYY") +
                  " at " +
                  moment(eventdata[0].end_date).format("hh:mm a"),
                event_price:
                  eventdata[0].cost > 0 ? "$" + eventdata[0].cost : "Free",
                event_image: eventdata[0].image
                  ? imageLink + env.EVENT_VIEW_PATH + eventdata[0].image
                  : "",
              };

              var view = { data: dynamicHtml };
              var finalHtmlUser = mustache.render(htmlUser, view);
              let transporter =
                nodemailer.createTransport(nodeMailerCredential); // node mailer credentials
              let mailOptions1 = {
                from: env.MAIL_FROM, // sender address
                to: email,
                subject: "Your Tickets for" + event_title,
                html: finalHtmlUser.replace(/&#x2F;/g, "/"),
              };
              transporter.sendMail(mailOptions1, (error, info) => {
                if (error) {
                  console.log(error);
                  //return res.json({status: 0, response : { msg: 'There was an email error',}  });
                } else {
                }
              });
              return res.json({ status: 1, response: { data: result } });
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
    signature = res;
  });

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
    });
  }, 100);
});

router.post("/newmeeting", function (req, res) {
  var apiSecret = "tKJtw9Q5yMmFgQORQ8JDCZLhp2VdoOrEMCgS";
  var apiKey = "pDT7IgL_RvuyrIuJpxlmKg";
  const email = "mentors@hullservices.ca";

  const payload = {
    iss: apiKey,
    exp: new Date().getTime() + 500000000000,
  };
  const token = jwt.sign(payload, apiSecret);

  var options = {
    method: "POST",
    uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
    body: {
      topic: record.title,
      type: 1,
      settings: {
        host_video: "true",
        participant_video: "true",
      },
    },
    auth: {
      bearer: token,
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    json: true, //Parse the JSON string in the response
  };

  requestPromise(options)
    .then(function (response) {
      return res.json({ status: 1, response: { data: response } });
      var signature = "";
    })
    .catch(function (err) {
      console.log("API call failed, reason ", err);
    });
});

module.exports = router;
