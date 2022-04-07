//methods for fetching mysql data
var connection = require("../config/database");
var env = require("../config/env");
var asyn = require("async");
var moment = require("moment");

function User() {
  connection.init();

  this.addEventByadmin = function (record, resources, callback) {
    connection.acquire(function (err, con) {
      const sql =
        "INSERT INTO event(title,description,location,image,speaker_name,speaker_image,start_date,end_date,purchase_type,cost,about_speaker,status,created_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *";
      const values = [
        record.title,
        record.description,
        record.location,
        record.image,
        record.speaker_name,
        record.speaker_image,
        //record.category,
        record.start_date,
        record.end_date,
        record.purchase_type,
        record.cost,
        record.about_speaker,
        1,
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
          if (resources.length > 0) {
            resources.map((data) => {
              var records = {
                path: data.path,
                type: data.type,
                event_id: result.rows[0].event_id,
                file_type:''
              };
              if (data.type == "fileUpload"){
                records.file_type = (data.file_type) ? data.file_type : 'image'
              }
              const sql =
                "INSERT INTO event_resource(path,type,file_type,event_id) VALUES($1,$2,$3,$4) RETURNING *";
              const values = [records.path, records.type, records.file_type, records.event_id];
              con.query(sql, values, function (err, result) {});
            });
          }

          if (resources.length > 0) {
            const promosql ="INSERT INTO event_promo(promo_title,promo_image,promo_description,event_id) VALUES($1,$2,$3,$4) RETURNING *";
            const promovalues = [record.promo_title, record.promo_image, record.promo_description, result.rows[0].event_id];
            con.query(promosql, promovalues, function (err, result) { });
          }

          con.release();
          callback(null, result.rows[0]);
        }
      });
    });
  };

  function updateProductByID(event_id, cols) {
    // Setup static beginning of query
    var query = ['UPDATE event'];
    query.push('SET');

    // Create another array storing each set command
    // and assigning a number value for parameterized query
    var set = [];

    Object.keys(cols).map(function (key, i) {
      set.push(key + ' = ($' + (i + 1) + ')');
    });
    query.push(set.join(', '));

    // Add the WHERE statement to look up by id
    query.push('WHERE event_id = ' + event_id);

    // Return a complete query string
    return query.join(' ');
  }

  this.updateEventByadmin = function (record, promo_record, event_id, update_value, group_session, resources, deleteresources, videoURL, webPageUrl, callback) {
      connection.acquire(function (err, con) {

        
        
        if (err) {
          callback(err, null);
        } else {
          var query = updateProductByID(event_id, record);
          con.query(query, update_value, function (err, result) { 
            console.log(err);
            if (err){
              callback(err, null);
            }else{

              var sqlevent = "UPDATE event_promo SET promo_title =$1,promo_description =$2,promo_image=$3 where event_id = $3";
              con.query(sqlevent, [promo_record.promo_title, promo_record.promo_description, promo_record.promo_image, event_id], function (err, results) {});

              if (group_session.length > 0) {
                sqlq = 'SELECT * FROM event_group_session where event_id = $1';
                con.query(sqlq, [event_id], function (err, groupresult) {
                  if (groupresult.rows.length > 0){
                    con.query('DELETE FROM event_group_session where event_id = $1', [event_id], function (err, results) { 
                      group_session.map((data) => {
                        var records = { title: data.title, description: data.description, url: data.url, event_id: event_id, };
                        const sql = "INSERT INTO event_group_session(title,description,url,event_id) VALUES($1,$2,$3,$4) RETURNING *";
                        const values = [records.title, records.description, records.url, event_id,];
                        con.query(sql, values, function (err, result) { });
                      });
                    });
                  }else{
                    group_session.map((data) => {
                      var records = { title: data.title, description: data.description, url: data.url, event_id: event_id, };
                      const sql = "INSERT INTO event_group_session(title,description,url,event_id) VALUES($1,$2,$3,$4) RETURNING *";
                      const values = [records.title, records.description, records.url, event_id,];
                      con.query(sql, values, function (err, result) { });
                    });
                  }
                  
                });
              }

              if (deleteresources.length > 0) { 
                deleteresources.map((data) => {
                  con.query('DELETE FROM event_resource where event_resource_id = $1', [data[0].event_resource_id], function (err, results) {});
                });
              }

              
              if (resources.length > 0) {

                resources.map((data) => {
                  var records = { path: data.path, type: data.type, file_type: (data.file_type) ? data.file_type : 'image', event_id: event_id, };
                  const sql = "INSERT INTO event_resource(path,type,file_type,event_id) VALUES($1,$2,$3,$4) RETURNING *";
                  const values = [records.path, records.type, records.file_type, event_id];
                  con.query(sql, values, function (err, result) { });
                });

              }

              if (videoURL.length > 0){
                sql = 'SELECT * FROM event_resource where event_id = $1 and type = $2';
                con.query(sql, [event_id,"videoURL"], function (err, resourceresult) {
                  if (resourceresult.rows.length > 0) {
                    con.query('DELETE FROM event_resource where event_id = $1 and type = $2', [event_id, "videoURL"], function (err, results) {
                      videoURL.map((data) => {
                        var records = { path: data.path, type: data.type, file_type: (data.file_type) ? data.file_type:'image', event_id: event_id, };
                        const sql = "INSERT INTO event_resource(path,type,file_type,event_id) VALUES($1,$2,$3,$4) RETURNING *";
                        const values = [records.path, records.type, records.file_type, event_id];
                        con.query(sql, values, function (err, result) { });
                      });
                    });
                  }else{
                    videoURL.map((data) => {
                      var records = { path: data.path, type: data.type, file_type: (data.file_type) ? data.file_type : 'image', event_id: event_id, };
                      const sql = "INSERT INTO event_resource(path,type,file_type,event_id) VALUES($1,$2,$3,$4) RETURNING *";
                      const values = [records.path, records.type, records.file_type, event_id];
                      con.query(sql, values, function (err, result) { });
                    });
                  }
                });
              }

              if (webPageUrl.length > 0) {
                sql = 'SELECT * FROM event_resource where event_id = $1 and type = $2';
                con.query(sql, [event_id, "webPageUrl"], function (err, resourceresult) {
                  if (resourceresult.rows.length > 0) {
                    con.query('DELETE FROM event_resource where event_id = $1 and type = $2', [event_id, "webPageUrl"], function (err, results) {
                      webPageUrl.map((data) => {
                        var records = { path: data.path, type: data.type, file_type: (data.file_type) ? data.file_type : 'image', event_id: event_id, };
                        const sql = "INSERT INTO event_resource(path,type,file_type,event_id) VALUES($1,$2,$3,$4) RETURNING *";
                        const values = [records.path, records.type, records.file_type, event_id];
                        con.query(sql, values, function (err, result) { });
                      });
                    });
                  } else {
                    webPageUrl.map((data) => {
                      var records = { path: data.path, type: data.type, file_type: (data.file_type) ? data.file_type : 'image', event_id: event_id, };
                      const sql = "INSERT INTO event_resource(path,type,file_type,event_id) VALUES($1,$2,$3,$4) RETURNING *";
                      const values = [records.path, records.type, records.file_type, event_id];
                      con.query(sql, values, function (err, result) { });
                    });
                  }
                });
              }

              con.release();
              callback(null, result);
            }
          });
        }
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
      con.query('SELECT * FROM event left join event_promo on event.event_id = event_promo.event_id where event.event_id = $1', [id], function (err, result) {
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

  this.getAllAdminEventPromoList = function (status, callback) {
    connection.acquire(function (err, con) {
      var sql = '';
      var array = [];
      if (status) {
        sql = 'SELECT * FROM event_promo where status = $1 order by event_promo_id DESC';
        array = [status];
      } else {
        sql = 'SELECT * FROM event_promo order by event_promo_id DESC';
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

  this.getEventPromoList = function (callback) {
    connection.acquire(function (err, con) {
      sql = 'SELECT * FROM event where status = $1 order by event_id DESC';
      con.query(sql, [1], function (err, result) {
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

  this.addPromoEventByadmin = function (record, callback) {
    connection.acquire(function (err, con) {
      const promosql = "INSERT INTO event_promo(event_id,promo_title,promo_image,promo_description,status) VALUES($1,$2,$3,$4,$5) RETURNING *";
      const promovalues = [record.event_id,record.promo_title, record.promo_image, record.promo_description,1];
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
      var sqlevent = "UPDATE event_promo SET promo_title =$1,promo_description =$2,promo_image=$3,event_id=$4 where event_promo_id = $5";
      con.query(sqlevent, [record.promo_title, record.promo_description, record.promo_image, record.event_id, event_promo_id], function (err, results) {
        if (err) {
          if (env.DEBUG) {
            console.log(err);
          }
          con.release();
          callback(err, null);
        } else {
          callback(null, results);
        }
      });
      
    });
  };

  
  this.getEventPromoDataById = function (id, callback) {
    connection.acquire(function (err, con) {
      con.query('SELECT * FROM event_promo where event_promo_id = $1', [id], function (err, result) {
        con.release();
        if (err) {
          callback(err, null);
        } else {
          callback(null, result.rows);
        }
      });
    });
  }

  
  this.deletePromoEvent = function (event, callback) {
    connection.acquire(function (err, con) {
      event.map(data => {
        con.query('DELETE FROM event_promo where event_promo_id = $1', [data.event_promo_id], function (err, results) {
         
        });
      });
      con.release()
      callback(null, event);
    });
  };
  
  this.getUnpaidEventList = function (search, callback) {
    connection.acquire(function (err, con) {
      var sql = '';
      var array = [];
      if (search.today){
        sql = 'SELECT * FROM event where start_date::date = now()::date and status = $1 order by event_id DESC';
        array = [1];
      } if (search.search) {        
        sql = 'SELECT * FROM event where start_date::date >= now() and title ILIKE $1  and status = $2 order by event_id DESC';
        array = ['%' + search.search + '%', 1];
      } else{
        //sql = `SELECT DATE_TRUNC('month', "created_at") AS "month", COUNT(*) FROM event GROUP BY DATE_TRUNC('month', "created_at")`;
        sql = 'SELECT * FROM event where start_date::date >= now() and status = $1 order by event_id DESC';
        array = [1];
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

  this.addEventPurchase = function (record, callback) {
    connection.acquire(function (err, con) {
      const eventsql = "INSERT INTO event_purchase(user_id,event_id,payment_id,event_purchase_date,status) VALUES($1,$2,$3,$4,$5) RETURNING *";
      const eventvalues = [record.user_id, record.event_id, record.payment_id, record.event_purchase_date, 1];
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
