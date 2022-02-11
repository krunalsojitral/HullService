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

module.exports = router;
