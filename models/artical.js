//methods for fetching mysql data
var connection = require('../config/database');
var env = require('../config/env');
var asyn = require('async');

function User() {
    connection.init();

    
    this.getUserById = function (id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM users where id = $1', [id], function (err, result) {
                con.release();
                if (result.rows.length === 0) {
                    msg = 'User does not exist.';
                    callback(msg, null);
                }else{
                    callback(null, result.rows);
                }                
            });
        });
    }

    this.getAllAdminArtical = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM artical order by artical_id desc', function (err, result) {
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

    
    this.addarticalByadmin = function (record, callback) {
        connection.acquire(function (err, con) {
            const sql = 'INSERT INTO artical(title,description,created_at,role,purchase_type,image,cost,status) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *'
            const values = [record.title, record.description, record.created_at, record.role, record.purchase_type, record.image, record.cost, 1]
            con.query(sql, values, function (err, result) {
                con.release()
                if (err) {
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    callback(err, null);
                } else {
                    if (record.tag.length > 0) {
                        record.tag.map(data => {
                            var records = {
                                tag_id: data.value,
                                article_id: result.rows[0].article_id
                            }
                            const sql = 'INSERT INTO article_tag(article_id,tag_id) VALUES($1,$2) RETURNING *'
                            const values = [records.article_id, records.tag_id]
                            con.query(sql, values, function (err, result) { });
                        });
                    }
                    callback(null, result.rows[0]);
                }
            });
        });
    };

    
    this.getTagByArticalId = function (id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM article_tag inner join tag on article_tag.tag_id = tag.tag_id where article_tag.article_id = $1', [id], function (err, result) {
                con.release();
                if (result.rows.length === 0) {
                    callback('Tag does not exist.', null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    }

    function updateProductByID(artical_id, cols) {
        // Setup static beginning of query
        var query = ['UPDATE artical'];
        query.push('SET');

        // Create another array storing each set command
        // and assigning a number value for parameterized query
        var set = [];
        
        Object.keys(cols).map(function (key, i) {
            set.push(key + ' = ($' + (i + 1) + ')');
        });
        query.push(set.join(', '));
        
        // Add the WHERE statement to look up by id
        query.push('WHERE artical_id = ' + artical_id);

        // Return a complete query string
        return query.join(' ');
    }

    this.updatearticalByadmin = function (record, artical_id, update_value,tag, callback) {
        connection.acquire(function (err, con) {
            var query = updateProductByID(artical_id, record);
            con.query(query, update_value, function (err, result) {                
                if (err) {
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    con.release()
                    callback(err, null);
                } else {
                    if (tag.length > 0) {
                        const sql = 'DELETE FROM article_tag where article_id = $1'
                        const values = [artical_id]
                        con.query(sql, values, function (err, results) {
                            tag.map(data => {
                                var records = {
                                    tag_id: data.value,
                                    article_id: artical_id
                                }
                                const sql = 'INSERT INTO article_tag(article_id,tag_id) VALUES($1,$2) RETURNING *'
                                const values = [artical_id, records.tag_id]
                                con.query(sql, values, function (err, result) { });
                            });
                        });
                    }
                    con.release()
                    callback(null, record);
                }
            });

            // con.query("UPDATE artical SET title =$1,description =$2,role =$3,purchase_type =$4,image =$5 WHERE artical_id = $6", [record.title, record.description, record.role, record.purchase_type, record.image, artical_id], function (err, result) {
            //     if (err) {
            //         if (env.DEBUG) {
            //             console.log(err);
            //         }
            //         callback(err, null);
            //     } else {
            //         callback(null, record);
            //     }
            // });
        });
    }

    this.changearticalStatus = function (record, artical_id, callback) {
        connection.acquire(function (err, con) {
            con.query("UPDATE artical SET status =$1 WHERE artical_id = $2", [record.status, artical_id], function (err, result) {
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

    this.getarticalDataById = function (id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM artical where artical_id = $1', [id], function (err, result) {
                con.release();
                if (result.rows.length === 0) {
                    msg = 'User does not exist.';
                    callback(msg, null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    }

    

}
module.exports = new User();