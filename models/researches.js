//methods for fetching mysql data
var connection = require('../config/database');
var env = require('../config/env');
var asyn = require('async');

function Researches() {
    connection.init();

    this.getAllAdminResearches = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM researches order by researches_id desc', function (err, result) {
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

    this.changeResearchesStatus = function (record, researches_id, callback) {
        connection.acquire(function (err, con) {
            con.query("UPDATE researches SET status =$1 WHERE researches_id = $2", [record.status, researches_id], function (err, result) {
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
  

    function updateProductByID(researches_content_id, cols) {
        // Setup static beginning of query
        var query = ['UPDATE researches_content'];
        query.push('SET');

        // Create another array storing each set command
        // and assigning a number value for parameterized query
        var set = [];
        
        Object.keys(cols).map(function (key, i) {
            set.push(key + ' = ($' + (i + 1) + ')');
        });
        query.push(set.join(', '));
        
        // Add the WHERE statement to look up by id
        query.push('WHERE researches_content_id = ' + researches_content_id);

        // Return a complete query string
        return query.join(' ');
    }

    this.updateResearchesByadmin = function (record, researches_content_id, update_value, callback) {
        connection.acquire(function (err, con) {            
            var query = updateProductByID(researches_content_id, record);
            con.query(query, update_value, function (err, result) {                
                con.release()
                console.log(err);
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

    this.changeDraftBlogStatus = function (record, blog_id, callback) {
        connection.acquire(function (err, con) {
            con.query("UPDATE blog SET draft_status =$1 WHERE blog_id = $2", [record.status, blog_id], function (err, result) {
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

    this.getResearchesDataById = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM researches_content where researches_content_id = $1', [1], function (err, result) {
                con.release();
                if (err) {                    
                    callback(err, null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    }

    this.getFutureParticipateResearchesList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM researches inner join users on users.id = researches.created_by inner join user_role on user_role.role_id = users.role where researches.status = $1 order by researches_id DESC',[1], function (err, result) {
                con.release();
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    }
   
}
module.exports = new Researches();