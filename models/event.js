//methods for fetching mysql data
var connection = require("../config/database");
var env = require("../config/env");
var asyn = require("async");

function User() {
  connection.init();

  this.addEventByadmin = function (record, callback) {
    connection.acquire(function (err, con) {
      const sql =
        "INSERT INTO event(title,description,location,image,organization,category,start_date,end_date,created_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *";
      const values = [
        record.title,
        record.description,
        record.location,
        record.image,
        record.organization,
        record.category,
        record.start_date,
        record.end_date,
        record.created_at,
      ];
      con.query(sql, values, function (err, result) {
        if (err) {
          if (env.DEBUG) {
            console.log(err);
          }
          con.release();
          callback(err, null);
        } else {
          if (record.group_session.length > 0) {
            record.group_session.map((data) => {
              var records = {
                title: data.title,
                description: data.description,
                url: data.url,
                event_id: result.rows[0].event_id,
              };
              const sql =
                "INSERT INTO group_session(title,description,url,event_id) VALUES($1,$2,$3,$4) RETURNING *";
              const values = [
                records.title,
                records.description,
                records.url,
                records.event_id,
              ];
              con.query(sql, values, function (err, result) {
              
              });
            });
          }
          if (record.resources.length > 0) {
            record.resources.map((data) => {
              var records = {
                path: data.path,
                type: data.type,
                event_id: result.rows[0].event_id,
              };
              const sql =
                "INSERT INTO resource(path,type,event_id) VALUES($1,$2,$3) RETURNING *";
              const values = [records.path, records.type, records.event_id];
              con.query(sql, values, function (err, result) {});
            });
          }

          con.release();
          callback(null, result.rows[0]);
        }
      });
    });
  };
}
module.exports = new User();
