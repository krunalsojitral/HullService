//methods for fetching mysql data
var connection = require('../config/database');
var env = require('../config/env');


function Researcherinterestarea() {
    connection.init();

    this.getAllAdminresearcherinterestarea = function (status,callback) {
        connection.acquire(function (err, con) {
            var sql = '';
            var array = [];
            if (status) {
                sql = 'SELECT * FROM researcher_interest_area where status = $1 order by UPPER(name) ASC';
                array = [status];
            } else {
                sql = 'SELECT * FROM researcher_interest_area order by UPPER(name) ASC';
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

    
    this.addresearcherinterestareaByadmin = function (record, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM researcher_interest_area where name=$1', [record.name], function (err, result) {
                if (result.rows.length === 0) { 
                    const sql = 'INSERT INTO researcher_interest_area(name,status) VALUES($1,$2) RETURNING *'
                    const values = [record.name, 1]
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
                }else{
                    con.release()
                    callback('Researcher interest area name is already exist.', null);
                }
            });
            
        });
    };

    function updateProductByID(researcher_interest_area_id, cols) {
        // Setup static beginning of query
        var query = ['UPDATE researcher_interest_area'];
        query.push('SET');

        // Create another array storing each set command
        // and assigning a number value for parameterized query
        var set = [];
        
        Object.keys(cols).map(function (key, i) {
            set.push(key + ' = ($' + (i + 1) + ')');
        });
        query.push(set.join(', '));
        
        // Add the WHERE statement to look up by id
        query.push('WHERE researcher_interest_area_id = ' + researcher_interest_area_id);

        // Return a complete query string
        return query.join(' ');
    }

    this.updateresearcherinterestareaByadmin = function (record, researcher_interest_area_id, update_value, callback) {
        connection.acquire(function (err, con) {

            var query = updateProductByID(researcher_interest_area_id, record);
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

            // con.query("UPDATE researcherinterestarea SET title =$1,description =$2,role =$3,purchase_type =$4,image =$5 WHERE researcher_interest_area_id = $6", [record.title, record.description, record.role, record.purchase_type, record.image, researcher_interest_area_id], function (err, result) {
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

    this.changeresearcherinterestareaStatus = function (record, researcher_interest_area_id, callback) {
        connection.acquire(function (err, con) {
            con.query("UPDATE researcher_interest_area SET status =$1 WHERE researcher_interest_area_id = $2", [record.status, researcher_interest_area_id], function (err, result) {
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

    this.getresearcherinterestareaDataById = function (id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM researcher_interest_area where researcher_interest_area_id = $1', [id], function (err, result) {
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
module.exports = new Researcherinterestarea();