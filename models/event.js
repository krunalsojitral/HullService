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
                "INSERT INTO event_group_session(title,description,url,event_id) VALUES($1,$2,$3,$4) RETURNING *";
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
                "INSERT INTO event_resource(path,type,event_id) VALUES($1,$2,$3) RETURNING *";
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

  this.getAllAdminEvent = function (status, callback) {
    connection.acquire(function (err, con) {
      var sql = '';
      var array = [];
      if (status) {
        sql = 'SELECT * FROM event where status = $1 order by event_id DESC';
        array = [status];
      } else {
        sql = 'SELECT * FROM event order by event_id DESC';
      }
      con.query(sql, array, function (err, result) {
        con.release()
        if (err) {
          if (env.DEBUG) { console.log(err); }
          callback(err, null);
        } else {
          callback(null, result.rows);
        }
      });
    });
  };


  this.changeEventStatus = function (record, event_id, callback) {
    connection.acquire(function (err, con) {
      con.query("UPDATE event SET status =$1 WHERE event_id = $2", [record.status, event_id], function (err, result) {
        con.release()
        if (err) {
          if (env.DEBUG) {
            console.log(err);
          }
          callback(err, null);
        } else {
          callback(null, record);
        }
      });
    });
  }

  this.getEventDataById = function (id, callback) {
    connection.acquire(function (err, con) {
      con.query('SELECT * FROM event where event_id = $1', [id], function (err, result) {
        con.release();
        if (err) {
          callback(err, null);
        } else {
          callback(null, result.rows);
        }
      });
    });
  }

  this.getGroupSessionByEventId = function (id, callback) {
    connection.acquire(function (err, con) {
      con.query('SELECT * FROM event_group_session where event_id = $1', [id], function (err, result) {
        con.release();
        if (result.rows.length === 0) {
          callback('session does not exist.', null);
        } else {
          callback(null, result.rows);
        }
      });
    });
  }

  this.getResourceByEventId = function (id, callback) {
    connection.acquire(function (err, con) {
      con.query('SELECT * FROM event_resource where event_id = $1 and type=$2', [id,"fileUpload"], function (err, result) {
        con.release();
        if (result.rows.length === 0) {
          callback('session does not exist.', null);
        } else {
          callback(null, result.rows);
        }
      });
    });
  }

  this.getVideoByEventId = function (id, callback) {
    connection.acquire(function (err, con) {
      con.query('SELECT * FROM event_resource where event_id = $1 and type=$2', [id,"videoURL"], function (err, result) {
        con.release();        
        if (result.rows.length === 0) {
          callback('session does not exist.', null);
        } else {
          callback(null, result.rows);
        }
      });
    });
  }

  this.getWebURLByEventId = function (id, callback) {
    connection.acquire(function (err, con) {
      con.query('SELECT * FROM event_resource where event_id = $1 and type=$2', [id,"webPageUrl"], function (err, result) {
        con.release();
        if (result.rows.length === 0) {
          callback('session does not exist.', null);
        } else {
          callback(null, result.rows);
        }
      });
    });
  }

  

  this.deleteEvent = function (event, callback) {
    connection.acquire(function (err, con) {
      event.map(data => {
        con.query('DELETE FROM event where event_id = $1', [data.event_id], function (err, results) {
          con.query('DELETE FROM event_group_session where event_id = $1', [data.event_id], function (err, results) { });
          con.query('DELETE FROM event_resource where event_id = $1', [data.event_id], function (err, results) { });
        });
      });
      con.release()
      callback(null, event);
    });
  };

}
module.exports = new User();
