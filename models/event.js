//methods for fetching mysql data
var connection = require("../config/database");
var env = require("../config/env");
var asyn = require("async");
var moment = require("moment");
var CryptoJS = require("crypto-js");
const rq = require("request-promise");
const {
  adduseronzoom,
  createzoomsession,
} = require("../controller/function/eventfunction");
function User() {
  connection.init();
  this.addEventByadmin = function (record, resources, callback) {
    connection.acquire(function (err, con) {
      const sql =
        "INSERT INTO event(title,description,location,event_type,zoom_host_link,zoom_join_link,timezone,image,speaker_name,speaker_email,speaker_image,start_date,end_date,purchase_type,cost,about_speaker,status,created_at,session_title,session_about,session_group_count,session_count,session_type,session_location,session_image,session_purchase_type,session_cost,reflective_expiry_date) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28) RETURNING *";
      const values = [
        record.title,
        record.description,
        record.location,
        record.event_type,
        record.zoom_host_link,
        record.zoom_join_link,
        record.timezone,
        record.image,
        record.speaker_name,
        record.speaker_email,
        record.speaker_image,
        //record.category,
        record.start_date,
        record.end_date,
        record.purchase_type,
        record.cost,
        record.about_speaker,
        1,
        record.created_at,
        record.session_title,
        record.session_about,
        record.session_group_count,
        record.session_count,
        record.session_type,
        record.session_location,
        record.session_image,
        record.session_purchase_type,
        record.session_cost,
        record.reflective_expiry_date,
      ];
      console.log(record.reflective_expiry_date);
      con.query(sql, values, function (err, result) {
        if (err) {
          if (env.DEBUG) {
            console.log(err);
          }
          con.release();
          callback(err, null);
        } else {
          if (record.group_session.length > 0) {
            record.group_session.map((data, index) => {
              var records = {
                session_start_time: data.session_start_time,
                session_end_time: data.session_end_time,
                session_timezone: data.session_timezone,
                session_no_of_participate: data.session_no_of_participate,
                session_data: data.session_data,
                group_number: index + 1,
                event_id: result.rows[0].event_id,
              };
              const sql =
                "INSERT INTO event_group_session(session_start_time,session_end_time,session_timezone,session_no_of_participate,session_data,event_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *";
              const values = [
                records.session_start_time,
                records.session_end_time,
                records.session_timezone,
                records.session_no_of_participate,
                records.session_data,
                records.event_id,
              ];
              con.query(sql, values, function (err, result) {});
            });
          }
          if (resources.length > 0) {
            resources.map((data) => {
              var records = {
                path: data.path,
                type: data.type,
                event_id: result.rows[0].event_id,
                file_type: "",
              };
              if (data.type == "fileUpload") {
                records.file_type = data.file_type ? data.file_type : "image";
              }
              const sql =
                "INSERT INTO event_resource(path,type,file_type,event_id) VALUES($1,$2,$3,$4) RETURNING *";
              const values = [
                records.path,
                records.type,
                records.file_type,
                records.event_id,
              ];
              con.query(sql, values, function (err, result) {});
            });
          }

          con.release();
          callback(null, result.rows[0]);
        }
      });
    });
  };

  this.listzoomuser = function (callback) {
    connection.acquire(function (err, con) {
      if (err) {
        callback(err, null);
      } else {
        var sql = "SELECT * FROM public.zoom ORDER BY zoom_id ASC";

        con.query(sql, function (err, result) {
          if (err) {
            callback(err, null);
          } else {
            callback(null, result.rows);
          }
        });
      }
    });
  };

  this.addzoomuser = (data, event_id, callback) => {
    connection.acquire(function (err, con) {
      if (err) {
        callback(err, null);
      } else {
        const sql =
          "INSERT INTO zoom(first_name,last_name,email,event_id) VALUES($1,$2,$3,$4) RETURNING *";
        const values = [
          data[0].speaker_name,
          data[0].speaker_name,
          data[0].speaker_email,
          event_id,
        ];
        adduseronzoom(data[0].speaker_email, data[0].speaker_name);
        con.query(sql, values, function (err, result) {
          if (err) {
            callback(err, null);
          } else {
            callback(null, result);
          }
        });
      }
    });
  };
  function updateProductByID(event_id, cols) {
    // Setup static beginning of query
    var query = ["UPDATE event"];
    query.push("SET");

    // Create another array storing each set command
    // and assigning a number value for parameterized query
    var set = [];

    Object.keys(cols).map(function (key, i) {
      set.push(key + " = ($" + (i + 1) + ")");
    });
    query.push(set.join(", "));
    // Add the WHERE statement to look up by id
    query.push("WHERE event_id = " + event_id);

    // Return a complete query string
    return query.join(" ");
  }

  this.updateEventByadmin = function (
    record,
    promo_record,
    event_id,
    update_value,
    group_session,
    resources,
    deleteresources,
    videoURL,
    webPageUrl,
    callback
  ) {
    connection.acquire(function (err, con) {
      if (err) {
        callback(err, null);
      } else {
        var query = updateProductByID(event_id, record);
        con.query(query, update_value, function (err, result) {
          console.log(err);
          if (err) {
            callback(err, null);
          } else {
            var sqlevent =
              "UPDATE event_promo SET promo_title =$1,promo_description =$2,promo_image=$3 where event_id = $3";
            con.query(
              sqlevent,
              [
                promo_record.promo_title,
                promo_record.promo_description,
                promo_record.promo_image,
                event_id,
              ],
              function (err, results) {}
            );

            if (group_session.length > 0) {
              sqlq = "SELECT * FROM event_group_session where event_id = $1";
              con.query(sqlq, [event_id], function (err, groupresult) {
                if (groupresult.rows.length > 0) {
                  con.query(
                    "DELETE FROM event_group_session where event_id = $1",
                    [event_id],
                    function (err, results) {
                      group_session.map((data) => {
                        var records = {
                          title: data.title,
                          description: data.description,
                          url: data.url,
                          event_id: event_id,
                        };
                        const sql =
                          "INSERT INTO event_group_session(title,description,url,event_id) VALUES($1,$2,$3,$4) RETURNING *";
                        const values = [
                          records.title,
                          records.description,
                          records.url,
                          event_id,
                        ];
                        con.query(sql, values, function (err, result) {});
                      });
                    }
                  );
                } else {
                  group_session.map((data) => {
                    var records = {
                      title: data.title,
                      description: data.description,
                      url: data.url,
                      event_id: event_id,
                    };
                    const sql =
                      "INSERT INTO event_group_session(title,description,url,event_id) VALUES($1,$2,$3,$4) RETURNING *";
                    const values = [
                      records.title,
                      records.description,
                      records.url,
                      event_id,
                    ];
                    con.query(sql, values, function (err, result) {});
                  });
                }
              });
            }

            if (deleteresources.length > 0) {
              deleteresources.map((data) => {
                con.query(
                  "DELETE FROM event_resource where event_resource_id = $1",
                  [data[0].event_resource_id],
                  function (err, results) {}
                );
              });
            }
            if (resources.length > 0) {
              resources.map((data) => {
                var records = {
                  path: data.path,
                  type: data.type,
                  file_type: data.file_type ? data.file_type : "image",
                  event_id: event_id,
                };
                const sql =
                  "INSERT INTO event_resource(path,type,file_type,event_id) VALUES($1,$2,$3,$4) RETURNING *";
                const values = [
                  records.path,
                  records.type,
                  records.file_type,
                  event_id,
                ];
                con.query(sql, values, function (err, result) {});
              });
            }
            if (videoURL.length > 0) {
              sql =
                "SELECT * FROM event_resource where event_id = $1 and type = $2";
              con.query(
                sql,
                [event_id, "videoURL"],
                function (err, resourceresult) {
                  if (resourceresult.rows.length > 0) {
                    con.query(
                      "DELETE FROM event_resource where event_id = $1 and type = $2",
                      [event_id, "videoURL"],
                      function (err, results) {
                        videoURL.map((data) => {
                          var records = {
                            path: data.path,
                            type: data.type,
                            file_type: data.file_type
                              ? data.file_type
                              : "image",
                            event_id: event_id,
                          };
                          const sql =
                            "INSERT INTO event_resource(path,type,file_type,event_id) VALUES($1,$2,$3,$4) RETURNING *";
                          const values = [
                            records.path,
                            records.type,
                            records.file_type,
                            event_id,
                          ];
                          con.query(sql, values, function (err, result) {});
                        });
                      }
                    );
                  } else {
                    videoURL.map((data) => {
                      var records = {
                        path: data.path,
                        type: data.type,
                        file_type: data.file_type ? data.file_type : "image",
                        event_id: event_id,
                      };
                      const sql =
                        "INSERT INTO event_resource(path,type,file_type,event_id) VALUES($1,$2,$3,$4) RETURNING *";
                      const values = [
                        records.path,
                        records.type,
                        records.file_type,
                        event_id,
                      ];
                      con.query(sql, values, function (err, result) {});
                    });
                  }
                }
              );
            }

            if (webPageUrl.length > 0) {
              sql =
                "SELECT * FROM event_resource where event_id = $1 and type = $2";
              con.query(
                sql,
                [event_id, "webPageUrl"],
                function (err, resourceresult) {
                  if (resourceresult.rows.length > 0) {
                    con.query(
                      "DELETE FROM event_resource where event_id = $1 and type = $2",
                      [event_id, "webPageUrl"],
                      function (err, results) {
                        webPageUrl.map((data) => {
                          var records = {
                            path: data.path,
                            type: data.type,
                            file_type: data.file_type
                              ? data.file_type
                              : "image",
                            event_id: event_id,
                          };
                          const sql =
                            "INSERT INTO event_resource(path,type,file_type,event_id) VALUES($1,$2,$3,$4) RETURNING *";
                          const values = [
                            records.path,
                            records.type,
                            records.file_type,
                            event_id,
                          ];
                          con.query(sql, values, function (err, result) {});
                        });
                      }
                    );
                  } else {
                    webPageUrl.map((data) => {
                      var records = {
                        path: data.path,
                        type: data.type,
                        file_type: data.file_type ? data.file_type : "image",
                        event_id: event_id,
                      };
                      const sql =
                        "INSERT INTO event_resource(path,type,file_type,event_id) VALUES($1,$2,$3,$4) RETURNING *";
                      const values = [
                        records.path,
                        records.type,
                        records.file_type,
                        event_id,
                      ];
                      con.query(sql, values, function (err, result) {});
                    });
                  }
                }
              );
            }

            con.release();
            callback(null, result);
          }
        });
      }
    });
  };

  this.NewupdateEventByadmin = async (
    event_id,
    record,
    update_value,
    callback
  ) => {
    connection.acquire(function (err, con) {
      if (err) {
        callback(err, null);
      } else {
        var query = updateProductByID(event_id, record);
        con.query(query, update_value, function (err, result) {
          con.release();
          callback(null, result);
        });
      }
    });
  };
  this.getAllAdminEvent = function (status, callback) {
    connection.acquire(function (err, con) {
      var sql = "";
      var array = [];
      if (status) {
        sql = "SELECT * FROM event where status = $1 order by event_id DESC";
        array = [status];
      } else {
        sql = "SELECT * FROM event order by event_id DESC";
      }
      con.query(sql, array, function (err, result) {
        con.release();
        if (err) {
          if (env.DEBUG) {
            console.log(err);
          }
          callback(err, null);
        } else {
          callback(null, result.rows);
        }
      });
    });
  };

  this.getmemeberlimit = async (event_id, callback) => {
    connection.acquire(function (err, con) {
      con.query(
        "SELECT * FROM reflective_session where event_id = $1",
        [event_id],
        function (err, result) {
          con.release();
          if (err) {
            callback(err, null);
          } else {
            callback(null, result.rows);
          }
        }
      );
    });
  };

  this.groupmember = async (event_id, callback) => {
    connection.acquire(function (err, con) {
      con.query(
        "SELECT * FROM reflective_session GROUP BY group_number where event_id = $1",
        [event_id],
        function (err, result) {
          con.release();
          if (err) {
            callback(err, null);
          } else {
            callback(null, result.rows);
          }
        }
      );
    });
  };
  this.alleventdata = async (event_id, callback) => {
    connection.acquire(function (err, con) {
      con.query(
        "SELECT * FROM event_purchase where event_id = $1",
        [event_id],
        function (err, result) {
          con.release();
          if (err) {
            callback(err, null);
          } else {
            callback(null, result.rows);
          }
        }
      );
    });
  };

  this.changeEventStatus = function (record, event_id, callback) {
    connection.acquire(function (err, con) {
      con.query(
        "UPDATE event SET status =$1 WHERE event_id = $2",
        [record.status, event_id],
        function (err, result) {
          con.release();
          if (err) {
            if (env.DEBUG) {
              console.log(err);
            }
            callback(err, null);
          } else {
            callback(null, record.rows);
          }
        }
      );
    });
  };

  this.getEventDataById = function (id, callback) {
    connection.acquire(function (err, con) {
      con.query(
        "SELECT * FROM event left join cohost on event.event_id = cohost.event_id where event.event_id = $1",
        [id],
        function (err, result) {
          con.release();
          if (err) {
            callback(err, null);
          } else {
            console.log(result.rows);
            callback(null, result.rows);
          }
        }
      );
    });
  };

  this.getEventDataByIdWithLogin = function (user_id, id, callback) {
    connection.acquire(function (err, con) {
      con.query(
        "SELECT * FROM event left join event_purchase on event.event_id = event_purchase.event_id left join reflective_session on event.event_id = reflective_session.event_id and event_purchase.user_id = $1 where event.event_id = $2",
        [user_id, id],
        function (err, result) {
          con.release();
          if (err) {
            callback(err, null);
          } else {
            console.log(result.rows);
            callback(null, result.rows);
          }
        }
      );
    });
  };

  this.checkuser = function (email, callback) {
    connection.acquire(function (err, con) {
      con.query(
        "SELECT * FROM users where LOWER(email)=$1",
        [email.toLowerCase()],
        function (err, results) {
          con.release();
          if (err) {
            callback(err, null);
          } else {
            callback(null, results.rows);
          }
        }
      );
    });
  };

  this.getGroupSessionByEventId = function (id, callback) {
    connection.acquire(function (err, con) {
      con.query(
        "SELECT * FROM event_group_session where event_id = $1",
        [id],
        function (err, result) {
          con.release();
          if (result.rows.length === 0) {
            callback("session does not exist.", null);
          } else {
            var array = result.rows.map((data) => {
              var bytes = CryptoJS.AES.decrypt(data.session_data, "mypassword");
              var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

              console.log(data.session_start_time);
              console.log(
                moment(data.session_start_time, "HH:mm:ss").format(
                  "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
                )
              );
              console.log(new Date());
              let retObj = {};
              retObj["event_resource_id"] = data.event_resource_id;
              retObj["session_no_of_participate"] =
                data.session_no_of_participate;
              retObj["session_timezone"] = data.session_timezone;
              retObj["group_number"] = data.group_number;
              //retObj['session_start_time'] = moment(data.session_start_time, 'HH:mm:ss').format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
              retObj["session_start_time"] = new Date();
              retObj["session_end_time"] = moment(
                data.session_end_time,
                "HH:mm:ss"
              ).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
              retObj["session_data"] = decryptedData;
              retObj["event_id"] = data.event_id;
              return retObj;
            });
            callback(null, array);
          }
        }
      );
    });
  };

  this.getResourceByEventId = function (id, callback) {
    connection.acquire(function (err, con) {
      con.query(
        "SELECT * FROM event_resource where event_id = $1 and type=$2",
        [id, "fileUpload"],
        function (err, result) {
          con.release();
          if (result.rows.length === 0) {
            callback("session does not exist.", null);
          } else {
            callback(null, result.rows);
          }
        }
      );
    });
  };

  this.getVideoByEventId = function (id, callback) {
    connection.acquire(function (err, con) {
      con.query(
        "SELECT * FROM event_resource where event_id = $1 and type=$2",
        [id, "videoURL"],
        function (err, result) {
          con.release();
          if (result.rows.length === 0) {
            callback("session does not exist.", null);
          } else {
            callback(null, result.rows);
          }
        }
      );
    });
  };

  this.getWebURLByEventId = function (id, callback) {
    connection.acquire(function (err, con) {
      con.query(
        "SELECT * FROM event_resource where event_id = $1 and type=$2",
        [id, "webPageUrl"],
        function (err, result) {
          con.release();
          if (result.rows.length === 0) {
            callback("session does not exist.", null);
          } else {
            callback(null, result.rows);
          }
        }
      );
    });
  };

  this.deleteEvent = function (event, callback) {
    connection.acquire(function (err, con) {
      event.map((data) => {
        con.query(
          "DELETE FROM event where event_id = $1",
          [data.event_id],
          function (err, results) {
            con.query(
              "DELETE FROM event_group_session where event_id = $1",
              [data.event_id],
              function (err, results) {}
            );
            con.query(
              "DELETE FROM event_resource where event_id = $1",
              [data.event_id],
              function (err, results) {}
            );
          }
        );
      });
      con.release();
      callback(null, event);
    });
  };

  this.getAllAdminEventPromoList = function (status, callback) {
    connection.acquire(function (err, con) {
      var sql = "";
      var array = [];
      if (status) {
        sql =
          "SELECT * FROM event_promo where status = $1 order by event_promo_id DESC";
        array = [status];
      } else {
        sql = "SELECT * FROM event_promo order by event_promo_id DESC";
      }
      con.query(sql, array, function (err, result) {
        con.release();
        if (err) {
          if (env.DEBUG) {
            console.log(err);
          }
          callback(err, null);
        } else {
          callback(null, result.rows);
        }
      });
    });
  };

  this.getEventPromoList = function (callback) {
    connection.acquire(function (err, con) {
      sql = "SELECT * FROM event where status = $1 order by event_id DESC";
      con.query(sql, [1], function (err, result) {
        con.release();
        if (err) {
          if (env.DEBUG) {
            console.log(err);
          }
          callback(err, null);
        } else {
          callback(null, result.rows);
        }
      });
    });
  };

  this.addPromoEventByadmin = function (record, callback) {
    connection.acquire(function (err, con) {
      const promosql =
        "INSERT INTO event_promo(event_id,promo_title,promo_image,promo_description,status) VALUES($1,$2,$3,$4,$5) RETURNING *";
      const promovalues = [
        record.event_id,
        record.promo_title,
        record.promo_image,
        record.promo_description,
        1,
      ];
      con.query(promosql, promovalues, function (err, result) {
        con.release();
        if (err) {
          if (env.DEBUG) {
            console.log(err);
          }
          callback(err, null);
        } else {
          callback(null, result);
        }
      });
    });
  };

  this.updateEventPromoByadmin = function (record, event_promo_id, callback) {
    connection.acquire(function (err, con) {
      var sqlevent =
        "UPDATE event_promo SET promo_title =$1,promo_description =$2,promo_image=$3,event_id=$4 where event_promo_id = $5";
      con.query(
        sqlevent,
        [
          record.promo_title,
          record.promo_description,
          record.promo_image,
          record.event_id,
          event_promo_id,
        ],
        function (err, results) {
          if (err) {
            if (env.DEBUG) {
              console.log(err);
            }
            con.release();
            callback(err, null);
          } else {
            callback(null, results);
          }
        }
      );
    });
  };

  this.getEventPromoDataById = function (id, callback) {
    connection.acquire(function (err, con) {
      con.query(
        "SELECT * FROM event_promo where event_promo_id = $1",
        [id],
        function (err, result) {
          con.release();
          if (err) {
            callback(err, null);
          } else {
            callback(null, result.rows);
          }
        }
      );
    });
  };

  this.deletePromoEvent = function (event, callback) {
    connection.acquire(function (err, con) {
      event.map((data) => {
        con.query(
          "DELETE FROM event_promo where event_promo_id = $1",
          [data.event_promo_id],
          function (err, results) {}
        );
      });
      con.release();
      callback(null, event);
    });
  };

  this.getUnpaidEventList = function (search, callback) {
    connection.acquire(function (err, con) {
      var sql = "";
      var array = [];
      if (search.today) {
        sql =
          "SELECT * FROM event where start_date::date = now()::date and status = $1 order by event_id DESC";
        array = [1];
      }
      if (search.search) {
        //start_date::date >= now() and
        sql =
          "SELECT * FROM event where title ILIKE $1 and status = $2 order by event_id DESC";
        array = ["%" + search.search + "%", 1];
      } else {
        //sql = `SELECT DATE_TRUNC('month', "created_at") AS "month", COUNT(*) FROM event GROUP BY DATE_TRUNC('month', "created_at")`;
        sql = "SELECT * FROM event where status = $1 order by event_id DESC";
        array = [1];
      }

      con.query(sql, array, function (err, result) {
        con.release();
        if (err) {
          if (env.DEBUG) {
            console.log(err);
          }
          callback(err, null);
        } else {
          callback(null, result.rows);
        }
      });
    });
  };

  this.getMyEventList = function (user_id, callback) {
    connection.acquire(function (err, con) {
      var sql = "";
      var array = [];
      sql =
        "SELECT * FROM event_purchase inner join event on event.event_id = event_purchase.event_id where event.status = $1 and event_purchase.user_id = $2 order by event.event_id DESC";
      array = [1, user_id];
      con.query(sql, array, function (err, result) {
        con.release();
        if (err) {
          if (env.DEBUG) {
            console.log(err);
          }

          callback(err, null);
        } else {
          callback(null, result.rows);
        }
      });
    });
  };

  this.updateCohost = async (dataObject) => {
    await connection.acquire(async function (err, con) {
      const co_speaker = Object.values(dataObject.co_speaker[0]);
      const co_email = Object.values(dataObject.co_email[0]);
      const event_id = dataObject.event_id;

      con.query(
        "DELETE FROM cohost where event_id = $1",
        [event_id],
        function (err, results) {
          // result
        }
      );

      const storedata = async (name, email, event_id) => {
        console.log(name);
        console.log(event_id);
        console.log(email);
        const cohostsql =
          "INSERT INTO cohost(cohost_name,cohost_email,event_id) VALUES($1,$2,$3) RETURNING *";
        const cohostvalues = [name, email, event_id];
        await con.query(cohostsql, cohostvalues, function (err, result) {
          console.log(result);
        });
      };

      for (let i = 0; i < co_email.length; i++) {
        storedata(co_speaker[i], co_email[i], event_id);
      }
    });
  };
  this.insertCohost = async (dataObject) => {
    await connection.acquire(async function (err, con) {
      const co_speaker = await Object.values(dataObject.co_speaker[0]);
      const co_email = await Object.values(dataObject.co_email[0]);
      const event_id = dataObject?.event_id;

      const storedata = async (name, email, event_id) => {
        const cohostsql =
          "INSERT INTO cohost(cohost_name,cohost_email,event_id) VALUES($1,$2,$3) RETURNING *";
        const cohostvalues = [name, email, event_id];
        await con.query(cohostsql, cohostvalues, function (err, result) {
          // console.log(result);
        });
      };

      for (let i = 0; i < co_email.length; i++) {
        storedata(co_speaker[i], co_email[i], event_id);
      }
    });
  };

  this.insertReflective = async (arr, presentuser) => {
    connection.acquire(async (err, con) => {
      const storedata = async (
        join_url,
        start_url,
        date,
        starttime,
        endtime,
        limit,
        name,
        event_id
      ) => {
        const sessionsql =
          "INSERT INTO reflective_session(join_url,zoom_url,session_start_time,session_end_time,event_id,session_no_of_participate,session_time_zone,group_number) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *";
        const sessionvalue = [
          join_url,
          start_url,
          starttime,
          endtime,
          event_id,
          limit,
          date,
          name,
        ];
        await con.query(sessionsql, sessionvalue, function (err, result) {});
      };
      if (presentuser == "true") {
        for (var i = 0; i < arr.length; i++) {
          for (var k = 0; k < arr[i].session_data.length; k++) {
            var Objectpara = await arr[i].session_data[k].zoom_link;
            await rq(Objectpara).then(async (res) => {
              await storedata(
                res?.start_url,
                res?.join_url,
                arr[i].session_data[k].value,
                arr[i].session_start_time,
                arr[i].session_end_time,
                arr[i].session_no_of_participate,
                arr[i].group_number,
                arr[i].event_id
              );
            });
          }
        }
      } else {
        for (var i = 0; i < arr.length; i++) {
          for (var k = 0; k < arr[i].session_data.length; k++) {
            var Objectpara = await arr[i].session_data[k].zoom_link;
            // await rq(Objectpara).then(async (res) => {
            await storedata(
              "res?.start_url",
              "res?.join_url",
              arr[i].session_data[k].value,
              arr[i].session_start_time,
              arr[i].session_end_time,
              arr[i].session_no_of_participate,
              arr[i].group_number,
              arr[i].event_id
            );
            // });
          }
        }
      }
    });
  };

  this.updateReflective = async (arr) => {
    connection.acquire(async (err, con) => {
      const event_id = dataObject.event_id;
      con.query(
        "DELETE FROM reflective_session where event_id =$1",
        [arr[0].event_id],
        function (err, results) {
          // result
        }
      );
      const storedata = async (
        join_url,
        start_url,
        date,
        starttime,
        endtime,
        limit,
        name,
        event_id
      ) => {
        const sessionsql =
          "INSERT INTO reflective_session(join_url,zoom_url,session_start_time,session_end_time,event_id,session_no_of_participate,session_time_zone,group_number) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *";
        const sessionvalue = [
          join_url,
          start_url,
          starttime,
          endtime,
          event_id,
          limit,
          date,
          name,
        ];
        await con.query(sessionsql, sessionvalue, function (err, result) {});
      };

      for (var i = 0; i < arr.length; i++) {
        for (var k = 0; k < arr[i].session_data.length; k++) {
          var Objectpara = await arr[i].session_data[k].zoom_link;
          await rq(Objectpara).then(async (res) => {
            await storedata(
              res?.start_url,
              res?.join_url,
              arr[i].session_data[k].value,
              arr[i].session_start_time,
              arr[i].session_end_time,
              arr[i].session_no_of_participate,
              arr[i].group_number,
              arr[i].event_id
            );
          });
        }
      }
    });
  };

  this.listEventPurchace = function (status, callback) {
    connection.acquire(function (err, con) {
      var sql = "";
      var array = [];
      if (status) {
        sql = "SELECT * FROM event_purchase";
        array = [status];
      } else {
        sql = "SELECT * FROM event_purchase";
      }
      con.query(sql, array, function (err, result) {
        con.release();
        if (err) {
          if (env.DEBUG) {
            console.log(err);
          }
          callback(err, null);
        } else {
          callback(null, result.rows);
        }
      });
    });
  };

  this.zoomsesssionEvent = async (event_id, email) => {
    connection.acquire(function (err, con) {
      const sql = "UPDATE event SET zoom_status =$1 WHERE event_id = $2";
      const values = [1, event_id];
      con.query(sql, values, function (err, result) {});
      const sql1 = "UPDATE zoom SET status = $1 WHERE event_id = $2";
      const values1 = [1, event_id];
      con.query(sql1, values1, function (err, result) {});
      const sql2 = "SELECT * FROM reflective_session where event_id = $1";
      const values2 = [event_id];
      console.log(event_id);
      con.query(sql2, values2, async (err, result) => {
        console.log(result.rows[0]);
        if (!err) {
          const session = createzoomsession(
            email,
            result.rows[0].group_number,
            result.rows[0].session_time_zone,
            1
          );
          await rq(session).then(async (res) => {
            const sql3 =
              "UPDATE reflective_session SET join_url = $1 zoom_url = $2 zoom_status = $3 WHERE event_id = $4";
            const values3 = [res?.join_url, res?.start_url, 1, event_id];
            con.query(sql3, values3, function (err, result) {
              if (!err) {
                console.log(err);
              } else {
                console.log("working");
              }
            });
          });
        } else {
          console.log(err);
        }
      });
    });
  };
  this.listUserEmail = function (status, callback) {
    connection.acquire(function (err, con) {
      var sql = "";
      var array = [];
      if (status) {
        sql = "SELECT email FROM users";
        array = [status];
      } else {
        sql = "SELECT email FROM users";
      }
      con.query(sql, array, function (err, result) {
        con.release();
        if (err) {
          if (env.DEBUG) {
            console.log(err);
          }
          callback(err, null);
        } else {
          callback(null, result.rows);
        }
      });
    });
  };
  this.addEventPurchase = function (record, callback) {
    connection.acquire(function (err, con) {
      const eventsql =
        "INSERT INTO event_purchase(user_id,event_id,payment_id,event_purchase_date,event_type,user_email,group_type,status) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *";
      const eventvalues = [
        record.user_id,
        record.event_id,
        record.payment_id,
        record.event_purchase_date,
        record.event_type,
        record.email,
        record.group_type,
        1,
      ];
      console.log("eventvalues : ", eventvalues);
      con.query(eventsql, eventvalues, function (err, result) {
        con.release();
        if (err) {
          if (env.DEBUG) {
            console.log(err);
          }
          callback(err, null);
        } else {
          callback(null, result);
        }
      });
    });
  };
}

module.exports = new User();
