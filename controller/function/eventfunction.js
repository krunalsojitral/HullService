const rp = require("request-promise");
const jwt = require("jsonwebtoken");

var apiSecret = "tKJtw9Q5yMmFgQORQ8JDCZLhp2VdoOrEMCgS";
var apiKey = "pDT7IgL_RvuyrIuJpxlmKg";

const email = "mentors@hullservices.ca";
const payload = {
  iss: apiKey,
  exp: new Date().getTime() + 500000000000,
};
const token = jwt.sign(payload, apiSecret);

const checkUserPresent = () => {
  const payload = {
    iss: apiKey,
    exp: new Date().getTime() + 500000000000,
  };
  const token = jwt.sign(payload, apiSecret);
  var options = {
    method: "GET",
    uri: `https://api.zoom.us/v2/users`,
    auth: {
      bearer: token,
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    json: true, //Parse the JSON string in the response
  };

  return options;
};

const addzoomuser = (email) => {
  var options = {
    method: "POST",
    uri: `https://api.zoom.us/v2/users`,
    body: {
      action: "create",
      user_info: {
        email: email,
        type: 1,
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
  rp(options)
    .then(function (response) {
      return false;
    })
    .catch(function (err) {
      return false;
    });
};

const createzoomsession = (title, time, role) => {
  var options = {
    method: "POST",
    uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
    body: {
      topic: title,
      type: role,
      start_time: time,
      settings: {
        host_video: "true",
        participant_video: "true",
        // alternative_hosts: cohostemail,
        // alternative_host_update_polls: true,
      },
    },
    auth: {
      bearer: token,
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    json: true,
  };
  return options;
};


///testing 
//zoom webinar creation...
const createzoom = (title, time, endtime) => {
  // await getUsers();
  const payload = {
    iss: apiKey,
    exp: new Date().getTime() + 500000000000,
  };
  var token = jwt.sign(payload, apiSecret);
  var options = {
    method: "POST",
    uri: `https://api.zoom.us/v2/users/8IiR_EQ1TMaTdOxgLM6-5g/webinars`,
    body: {
      agenda: title,
      duration: 60,
      password: "123456",
      start_time: time,
      timezone: "America/Los_Angeles",
      recurrence: {
        end_date_time: endtime,
        end_times: 7,
        repeat_interval: 1,
        type: 1,
      },
      settings: {
        allow_multiple_devices: true,
        approval_type: 0,
        attendees_and_panelists_reminder_email_notification: {
          enable: true,
          type: 1,
        },
        audio: "telephony",
        //"authentication_domains": "example.com",
        //"authentication_option": "signIn_D8cJuqWVQ623CI4Q8yQK0Q",
        //"auto_recording": "cloud",
        //"close_registration": true,
        //"contact_email": "jchill@example.com",
        //"contact_name": "Jill Chill",
        email_language: "en-US",
        //"enforce_login": true,
        //"enforce_login_domains": "example.com",
        follow_up_absentees_email_notification: {
          enable: true,
          type: 1,
        },
        // "follow_up_attendees_email_notification": {
        //   "enable": true,
        //   "type": 0
        // },
        // "global_dial_in_countries": [
        //   "US"
        // ],
        // "hd_video": false,
        // "hd_video_for_attendees": false,
        // "host_video": true,
        // "language_interpretation": {
        //   "enable": true,
        //   "interpreters": [
        //     {
        //       "email": "interpreter@example.com",
        //       "languages": "US,CN"
        //     }
        //   ]
        // },
        // "meeting_authentication": true,
        // "on_demand": false,
        panelists_invitation_email_notification: true,
        panelists_video: true,
        // "post_webinar_survey": true,
        // "practice_session": false,
        // "question_and_answer": {
        //   "allow_anonymous_questions": true,
        //   "answer_questions": "all",
        //   "attendees_can_comment": true,
        //   "attendees_can_upvote": true,
        //   "enable": true
        // },
        registrants_email_notification: true,
        registrants_restrict_number: 100,
        registration_type: 1,
        // "send_1080p_video_to_attendees": false,
        // "show_share_button": true,
        // "survey_url": "https://example.com",
        // "enable_session_branding": true
      },

      type: 5,
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

  return options;
  // rp(options)
  //   .then(function (response) {
  //     //console.log("response is: ", response.join_url);
  //     webinarID = response.id;
  //     res.send(response);
  //     console.log(`Webinar ID ${webinarID}`);

  //     batchRegistration(response.id);

  //     // res.status(200).json(dataRes);

  //     // res.send("create meeting result: " + JSON.stringify(response));
  //   })
  //   .catch(function (err) {});
};

const batchRegistration = (webID) => {
  const payload = {
    iss: apiKey,
    exp: new Date().getTime() + 500000000000,
  };
  const token = jwt.sign(payload, apiSecret);
  var options = {
    method: "POST",
    uri: `https://api.zoom.us/v2/webinars/${webID}/batch_registrants`,
    body: {
      auto_approve: false,
      // registrants: [
      //   {
      //     email: "muazzim.hussain.dev@gmail.com",
      //     first_name: "Muaz",
      //     last_name: "Gmail"
      //   },
      //   {
      //     email: "duraibabu200@gmail.com",
      //     first_name: "Durai",
      //     last_name: "QC"
      //   }
      // ]
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

  rp(options)
    .then(function (response) {})
    .catch(function (err) {});
};

//zoom Panelist similar to Co-Host...
// app.post("/createWebinarPanelist", (req, res) => {

//   //})
//   const payload = {
//     iss: apiKey,
//     exp: new Date().getTime() + 500000000000,
//   };
//   const token = jwt.sign(payload, apiSecret);
//   const email = "muazzim@qcodesinfotech.com";
//   const webinarId = "23";
//   var options = {
//     method: "POST",
//     uri: `https://api.zoom.us/v2/webinars/${webinarId}/panelists`,
//     body: {
//       panelists: [
//         {
//           email: "muazzim.hussain.dev@gmail.com",
//           name: "Muaz"
//         }
//       ]

//     },
//     auth: {
//       bearer: token,
//     },
//     headers: {
//       "User-Agent": "Zoom-api-Jwt-Request",
//       "content-type": "application/json",
//     },
//     json: true, //Parse the JSON string in the response
//   };

//   rp(options)
//     .then(function (response) {
//       console.log(response);
//       console.log("response is: ", response.join_url);
//       // response.status(200).json(response);
//       let dataRes = {
//         join_url: response.join_url,
//       };
//       res.status(200).json(dataRes);

//       // res.send("create meeting result: " + JSON.stringify(response));
//     })
//     .catch(function (err) {
//       // API call failed...
//       console.log("API call failed, reason ", err.message);
//     });
// });

//   method: "POST",
//   uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
//    body: {
//   topic: title,
//   type: role,
//   start_time: time,
//   timezone: "America/Los_Angeles",
//   duration : 60,
//   settings: {
//     host_video: true,
//     participant_video: false,
//     allow_multiple_devices: true,
//     // alternative_hosts: "co_host",
//     alternative_hosts_email_notification: true,
//     join_before_host: false,
//   },
// },
//   auth: {
//     bearer: token,
//   },
//   headers: {
//     "User-Agent": "Zoom-api-Jwt-Request",
//     "content-type": "application/json",
//   },
//   json: true,
// };
// return options;

const filterkeyObject = async (arr, filter) => {
  const keys_to_keep = filter;
  const result = arr.map((e) => {
    const obj = {};
    keys_to_keep.forEach((k) => (obj[k] = e[k]));
    return obj;
  });

  await result.reduce(function (r, a) {
    r[a.direction] = r[a.direction] || [];
    r[a.direction].push(a);
    return r;
  }, Object.create(null));
  return result;
};

module.exports = {
  createzoom,
  filterkeyObject,
  checkUserPresent,
  addzoomuser,
  createzoomsession,
};
