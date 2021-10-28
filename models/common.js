//methods for fetching mysql data
var connection = require('../config/database');
var env = require('../config/env');
var asyn = require('async');

function Common() {
    connection.init();

    this.getRoleList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM user_role where role_id != $1', [1], function (err, result) {
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

}
module.exports = new Common();