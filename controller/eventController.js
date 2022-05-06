var env = require("../config/env");
var Event = require("../models/event");
var path = require("path");
var fs = require("fs");
var asyn = require("async");
var moment = require("moment");
var formidable = require("formidable");
const gm = require("gm");
var mustache = require("mustache");
var nodemailer = require("nodemailer");
const nodeMailerCredential = require("./../EmailCredential");
const requestPromise = require("request-promise");
const jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");
const crypto = require("crypto");
const {
  createzoom,
  filterkeyObject,
  createzoomsession,
} = require("./function/eventfunction");

const EVENT_PATH = "/../routes/uploads/event/";
const EVENT_PATH_THUMB = "/../routes/uploads/event/thumbnails/";
const insertCohost = async (formdata, event_id, role) => {
  var cohost_name = await Object.keys(formdata[0]).filter((k) =>
    k.startsWith("co_host_speaker")
  );
  var cohost_email = await Object.keys(formdata[0]).filter((k) =>
    k.startsWith("co_host_emai")
  );
  const co_speaker = await filterkeyObject(formdata, cohost_name);
  const co_email = await filterkeyObject(formdata, cohost_email);
  const check = Object.values(co_speaker[0]);
  if (check.length > 0) {
    if (
      co_speaker[0].co_host_speaker_0 == null ||
      co_speaker[0].co_host_speaker_0 == undefined
    ) {
      return true;
    }
    console.log("/////////////////");
    console.log({ co_speaker, co_email, event_id });
    if (role == 1) {
      Event.insertCohost({ co_speaker, co_email, event_id });
    } else {
      Event.updateCohost({ co_speaker, co_email, event_id });
    }
  } else {
    return false;
  }
};

const insertReflective = async (parsed, event_id, role) => {
  var record = [];
  var parsed = await parsed[0];
  var event_id = await event_id;
  if (
    typeof parsed.sessionStartTime == undefined ||
    parsed.sessionStartTime == null ||
    !parsed.sessionStartTime
  ) {
    return;
  }

  for (let i = 0; i < parsed.sessionStartTime.length; i++) {
    if (parsed.sessionStartTime[i]?.value != undefined) {
      var session_d = [];
      for (let m = 0; m < parsed.time[i]?.nestedArray.length; m++) {
        if (parsed.time[i]?.nestedArray[m].value != undefined) {
          var datas = {
            value: parsed.time[i]?.nestedArray[m].value,
            zoom_link: await createzoomsession(
              `group_${i + 1}`,
              parsed.time[i]?.nestedArray[m].value,
              3
            ),
          };
        }
        session_d.push(datas);
      }
      let data = {
        session_start_time: parsed.sessionStartTime[i]?.value
          ? moment(parsed.sessionStartTime[i].value).format("h:mm a")
          : "",
        session_end_time: parsed.sessionEndTime[i]?.value
          ? moment(parsed.sessionEndTime[i].value).format("h:mm a")
          : "",
        session_no_of_participate: parsed.sessionNoOfParticipate[i]?.value,
        session_timezone: parsed.sessionTimezone[i]?.value,
        session_data: session_d,
        event_id: event_id,
        group_number: `group_${i + 1}`,
      };

      await record.push(data);
    }
  }
  console.log("================");
  console.log(record);
  if (role == 1) {
    Event.insertReflective(await record);
  } else {
    Event.updateReflective(await record);
  }
};

const imageUpload = async (files) => {
  var filename = "";
  if (typeof files != "undefined") {
    let file_ext = files?.originalFilename.split(".").pop();
    filename = Date.now() + "-" + files?.originalFilename.split(" ").join("");
    let tmp_path = files?.filepath;
    if (
      file_ext == "png" ||
      file_ext == "PNG" ||
      file_ext == "jpg" ||
      file_ext == "JPG" ||
      file_ext == "jpeg" ||
      file_ext == "JPEG"
    ) {
      await fs.rename(
        tmp_path,
        path.join(__dirname, EVENT_PATH + filename),
        function (err) {
          gm(__dirname + EVENT_PATH + filename)
            .gravity("Center")
            .thumb(
              258,
              195,
              __dirname + EVENT_PATH_THUMB + filename,
              100,
              async function (err, data) {
                console.log(filename);
              }
            );
        }
      );
    }
  }
  return await filename;
};

const addEventByadmin = async (req, res) => {
  var form = new formidable.IncomingForm();
  form.multiples = true;
  var resources = [];

  form.on("file", function (name, file) {
    if (name == "resources[]") {
      var type = file.name.split(".").pop(),
        filename = Date.now() + "-" + file.name;
      if (
        type !== null &&
        (type == "png" || type == "PNG" || type == "jpg" || type == "jpeg")
      ) {
        fs.rename(
          file.path,
          path.join(__dirname, EVENT_PATH + filename),
          function (err) {
            gm(__dirname + EVENT_PATH + filename)
              .gravity("Center")
              .thumb(
                258,
                195,
                __dirname + EVENT_PATH_THUMB + filename,
                100,
                function (err, data) {
                  if (err) {
                  } else {
                    let data = {
                      path: filename,
                      type: "fileUpload",
                      file_type: "image",
                    };
                    resources.push(data);
                  }
                }
              );
          }
        );
      } else {
        fs.rename(
          file.path,
          path.join(__dirname, EVENT_PATH + filename),
          function (err) {
            if (err) {
            } else {
              let data = {
                path: filename,
                type: "fileUpload",
                file_type: "doc",
              };
              resources.push(data);
            }
          }
        );
      }
    }
  });

  var formdata = [];
  form.parse(req, async (err, fields, files) => {
    if (err) return res.json({ status: 1, response: { msg: err } });
    var validationErrors = false;
    if (validationErrors == false) {
      let parsed = JSON.parse(fields.data);
      var start_date = moment(parsed.start_date).format("YYYY-MM-DD h:mm a");
      var end_date = moment(parsed.end_date).format("YYYY-MM-DD h:mm a");
      formdata.push(parsed);
      var record = {
        title: parsed.title,
        start_date: start_date,
        end_date: end_date,
        timezone: parsed.event_timezone,
        description: parsed.description,
        speaker_name: parsed.speaker_name,
        speaker_email: parsed.speaker_email,
        about_speaker: parsed.about_speaker,
        event_type: parsed.event_type,
        location: parsed.location ? parsed.location : "",
        speaker_image: "",
        image: "",
        session_image: parsed.session_image,
        purchase_type: parsed.purchase_type,
        cost: parsed.cost,
        zoom_host_link: "",
        zoom_join_link: "",
        group_session: [],
        status: parsed.status,
        session_title: parsed.session_title,
        session_about: parsed.session_about,
        session_group_count: parsed.no_of_group,
        session_type: parsed.session_type,
        session_location: parsed.session_location,
        session_purchase_type: parsed.session_purchase_type,
        session_cost: parsed.session_cost,
        created_at: moment().format("YYYY-MM-DD"),
      };

      //console.log(parsed.sessionStartTime);
      for (let i = 0; i < parsed.sessionStartTime.length; i++) {
        var session_d = [];
        for (let m = 0; m < parsed.time[i].nestedArray.length; m++) {
          let datas = {
            value: parsed.time[i].nestedArray[m].value,
          };
          session_d.push(datas);
        }
        var ciphertext = CryptoJS.AES.encrypt(
          JSON.stringify(session_d),
          "mypassword"
        ).toString();

        let data = {
          session_start_time: parsed.sessionStartTime[i].value
            ? moment(parsed.sessionStartTime[i].value).format("h:mm a")
            : "",
          session_end_time: parsed.sessionEndTime[i].value
            ? moment(parsed.sessionEndTime[i].value).format("h:mm a")
            : "",
          session_no_of_participate: parsed.sessionNoOfParticipate[i].value,
          session_timezone: parsed.sessionTimezone[i].value,
          session_data: ciphertext,
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

      // console.log(Object.values(cohostemail.co_email));
      const options = await createzoom(parsed.title, start_date, end_date);
  
      await requestPromise(options).then(async (res) => {
        console.log(res);
        record.zoom_host_link = res?.start_url;
        record.zoom_join_link = res?.join_url;
      });

      record.image = await imageUpload(files?.image);
      record.session_image = await imageUpload(files?.session_image);
      record.speaker_image = await imageUpload(files?.speaker_image);
    }
    const OtherTable = async (error, data) => {
      if (error) {
        console.log(error);
        return res.json({ status: 0, response: { msg: error } });
      } else {
        await insertCohost(formdata, data.event_id, 1);
        await insertReflective(formdata, data.event_id, 1);
        return res.json({
          status: 1,
          response: { msg: "Event added successfully.", data: data },
        });
      }
    };
    setTimeout(() => {
      Event.addEventByadmin(record, resources, function (err, data) {
        if (err) {
          OtherTable(err, data);
        } else {
          OtherTable(err, data);
        }
      });
    }, 100);
  });
};

const updataEventByadmin = (req, res) => {
  var form = new formidable.IncomingForm();
  form.multiples = true;
  form.uploadDir = path.join(__dirname, env.EVENT_PATH);
  var overview = {};
  var resources = [];
  var videoURL = [];
  var webPageUrl = [];
  var formdata = [];

  form.on("file", function (name, file) {
    if (name == "resources[]") {
      var type = file.name.split(".").pop(),
        filename = Date.now() + "-" + file.name;
      // Check the file type as it must be either png,jpg or jpeg
      if (
        type !== null &&
        (type == "png" || type == "PNG" || type == "jpg" || type == "jpeg")
      ) {
        fs.rename(
          file.path,
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
                  } else {
                    let data = {
                      path: filename,
                      type: "fileUpload",
                      file_type: "image",
                    };
                    resources.push(data);
                  }
                }
              );
          }
        );
      } else {
        fs.rename(
          file.path,
          path.join(__dirname, env.EVENT_PATH + filename),
          function (err) {
            if (err) {
            } else {
              let data = {
                path: filename,
                type: "fileUpload",
                file_type: "doc",
              };
              resources.push(data);
            }
          }
        );
      }
    }
  });

  form.parse(req, function (err, fields, files) {
    if (err) return res.json({ status: 1, response: { msg: err } });
    let obj = JSON.parse(fields.data);
    var start_date = moment(obj.start_date).format("YYYY-MM-DD h:mm a");
    var end_date = moment(obj.end_date).format("YYYY-MM-DD h:mm a");
    formdata.push(obj);

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
    };

    var promo_record = {
      promo_title: obj.promo_title,
      promo_description: obj.promo_description,
    };

    var update_value = [
      obj.title,
      obj.description,
      obj.location,
      obj.speaker_name,
      obj.about_speaker,
      obj.purchase_type,
      obj.cost,
      start_date,
      end_date,
      obj.timezone,
      obj.event_type,
    ];
    var group_session = [];
    if (obj.sessionTitle.length > 0) {
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
        if (el.value) {
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
      [
        function (done) {
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
                          console.log(err);
                          record.image = filename;
                          update_value.push(filename);
                          done("Image upload error", overview);
                        } else {
                          record.image = filename;
                          update_value.push(filename);
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
                    promo_record.promo_image = filename;
                    done1("Image upload error", overview);
                  } else {
                    promo_record.promo_image = filename;
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
            overview["promo_image"] = "";
            done1(err, overview);
          }
        },
        function (overview, done1) {
          if (typeof files.speaker_image !== "undefined") {
            let file_ext = files.speaker_image.name.split(".").pop();
            let filename =
              Date.now() + "-" + files.speaker_image.name.split(" ").join("");
            let tmp_path = files.speaker_image.path;

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
                    record.speaker_image = filename;
                    update_value.push(filename);
                    done1("Image upload error", overview);
                  } else {
                    record.speaker_image = filename;
                    update_value.push(filename);
                    overview["speaker_image"] = filename;
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
            overview["speaker_image"] = "";
            done1(err, overview);
          }
        },
        function (overview, done2) {
          setTimeout(() => {
            Event.NewupdateEventByadmin(
              event_id,
              record,
              update_value,
              function (err, data) {
                if (err) {
                  done2(err, overview);
                } else {
                  done2(err, overview);
                }
              }
            );
          }, 200);
        },
      ],
      function (error, data) {
        if (error) {
          return res.json({ status: 0, response: { msg: error } });
        } else {
          insertCohost(formdata, data.event_id, 2);

          insertReflective(formdata, data.event_id, 2);
          return res.json({
            status: 1,
            response: { msg: "Event updated successfully.", data: data },
          });
        }
      }
    );
  });
};

module.exports = {
  addEventByadmin,
  updataEventByadmin,
};
