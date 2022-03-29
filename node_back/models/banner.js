//methods for fetching mysql data
var connection = require('../config/database');
var env = require('../config/env');
var asyn = require('async');

function Banner() {
    connection.init();  

    this.getAllAdminBanner = function (status, callback) {
        connection.acquire(function (err, con) {
            var sql = '';
            var array = [];
            if (status) {
                sql = 'SELECT * FROM banner where status = $1 order by banner_order ASC';
                array = [status];
            } else {
                sql = 'SELECT * FROM banner order by banner_order ASC';
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
    }

    this.getUserBannerList = function (callback) {
        connection.acquire(function (err, con) {
            var sql = 'SELECT * FROM banner where status = $1 order by banner_order ASC';
            con.query(sql,[1], function (err, result) {
                con.release()
                if (err) {
                    if (env.DEBUG) { console.log(err); }
                    callback(err, null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    }
    
    this.addbannerByadmin = function (record, callback) {
        connection.acquire(function (err, con) {
            const sql = 'INSERT INTO banner(title,description,created_at,button_text,button_url,banner_image,status) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *'
            const values = [record.title, record.description, record.created_at, record.button_text, record.button_url, record.banner_image,1]
            con.query(sql, values, function (err, result) {  
                con.release()
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
    

    function updateProductByID(banner_id, cols) {
        // Setup static beginning of query
        var query = ['UPDATE banner'];
        query.push('SET');

        // Create another array storing each set command
        // and assigning a number value for parameterized query
        var set = [];
        
        Object.keys(cols).map(function (key, i) {
            set.push(key + ' = ($' + (i + 1) + ')');
        });
        query.push(set.join(', '));
        
        // Add the WHERE statement to look up by id
        query.push('WHERE banner_id = ' + banner_id);

        // Return a complete query string
        return query.join(' ');
    }

    this.updatebannerByadmin = function (record, banner_id, update_value, callback) {
        connection.acquire(function (err, con) {
            var query = updateProductByID(banner_id, record);
            con.query(query, update_value, function (err, result) {                
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

    this.changebannerStatus = function (record, banner_id, callback) {
        connection.acquire(function (err, con) {
            con.query("UPDATE banner SET status =$1 WHERE banner_id = $2", [record.status, banner_id], function (err, result) {
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

    this.getbannerDataById = function (id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM banner where banner_id = $1', [id], function (err, result) {
                con.release();
                if (err) {                    
                    callback(err, null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    }    

    this.changeDraftbannerStatus = function (record, banner_id, callback) {
        connection.acquire(function (err, con) {
            con.query("UPDATE banner SET draft_status =$1 WHERE banner_id = $2", [record.status, banner_id], function (err, result) {
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

   
    
    this.deletebanner = function (banner, callback) {
        connection.acquire(function (err, con) {
            banner.map(data => {
                con.query('DELETE FROM banner where banner_id = $1', [data.banner_id], function (err, results) {});
            });
            con.release()
            callback(null, banner);
        });
    };

    this.updateBannerOrder = function (banner, callback) {
        connection.acquire(function (err, con) {
            banner.map(data => {
                con.query("UPDATE banner SET banner_order =$1 WHERE banner_id = $2", [data.index, data.banner_id], function (err, result) {
                });
            });
            con.release()
            callback(null, banner);
        });
    };

    

 
}
module.exports = new Banner();