//methods for fetching mysql data
var connection = require('../config/database');
var env = require('../config/env');

function Media() {
    connection.init();

    this.getAllAdminMedia = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM media order by media_id desc', function (err, result) {
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

    
    this.addMediaByadmin = function (record, callback) {
        connection.acquire(function (err, con) {
            const sql = 'INSERT INTO media(name) VALUES($1) RETURNING *'
            const values = [record.name]
            con.query(sql, values, function (err, result) {
                con.release()
                if (err) {
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    callback(err, null);
                } else {
                    callback(null, result.rows[0]);
                }
            });
        });
    };

    this.deleteMedia = function (media_id, callback) {
        connection.acquire(function (err, con) {
            const sql = 'DELETE FROM media where media_id = $1'
            const values = [media_id]
            con.query(sql, values, function (err, result) {
                con.release()
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
module.exports = new Media();