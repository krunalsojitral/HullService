//methods for fetching mysql data
var connection = require('../config/database');
var env = require('../config/env');
var asyn = require('async');

function CMS() {
    connection.init();

    
    this.getHomeContentData = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM home_content where home_content_id = $1', [1], function (err, result) {                
                con.release();
                if (err) {
                    callback(err, null);
                }else{
                    callback(null, result.rows);
                }                
            });
        });
    }

    

    function updateProductByID(id, cols) {        
        var query = ['UPDATE home_content'];
        query.push('SET');        
        var set = [];        
        Object.keys(cols).map(function (key, i) {
            set.push(key + ' = ($' + (i + 1) + ')');
        });
        query.push(set.join(', '));               
        query.push('WHERE home_content_id = ' + id);        
        return query.join(' ');
    }

    this.updatecontentByadmin = function (record, id, update_value, callback) {
        connection.acquire(function (err, con) {
            var query = updateProductByID(id, record);
            con.query(query, update_value, function (err, result) {                
                console.log(err);
                console.log(result);
                con.release()
                if (err) {
                    if (env.DEBUG) { console.log(err); }                    
                    callback(err, null);
                } else {                                        
                    callback(null, record);
                }
            });
        });
    }


    this.getAllAdminpartner = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM partner order by partner_id desc', function (err, result) {
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


    this.addpartnerByadmin = function (record, callback) {
        connection.acquire(function (err, con) {
            const sql = 'INSERT INTO partner(name) VALUES($1) RETURNING *'
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

    this.deletepartner = function (partner_id, callback) {
        connection.acquire(function (err, con) {
            const sql = 'DELETE FROM partner where partner_id = $1'
            const values = [partner_id]
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
module.exports = new CMS();