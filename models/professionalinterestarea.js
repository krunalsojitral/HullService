//methods for fetching mysql data
var connection = require('../config/database');
var env = require('../config/env');


function Professionalinterestarea() {
    connection.init();

    this.getAllAdminprofessionalinterestarea = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM professional_interest_area order by professional_interest_area_id desc', function (err, result) {
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

    
    this.addprofessionalinterestareaByadmin = function (record, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM professional_interest_area where name=$1', [record.name], function (err, result) {
                if (result.rows.length === 0) { 
                    const sql = 'INSERT INTO professional_interest_area(name,status) VALUES($1,$2) RETURNING *'
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
                    callback('professionalinterestarea name is already exist.', null);
                }
            });
            
        });
    };

    function updateProductByID(professional_interest_area_id, cols) {
        // Setup static beginning of query
        var query = ['UPDATE professional_interest_area'];
        query.push('SET');

        // Create another array storing each set command
        // and assigning a number value for parameterized query
        var set = [];
        
        Object.keys(cols).map(function (key, i) {
            set.push(key + ' = ($' + (i + 1) + ')');
        });
        query.push(set.join(', '));
        
        // Add the WHERE statement to look up by id
        query.push('WHERE professional_interest_area_id = ' + professional_interest_area_id);

        // Return a complete query string
        return query.join(' ');
    }

    this.updateprofessionalinterestareaByadmin = function (record, professional_interest_area_id, update_value, callback) {
        connection.acquire(function (err, con) {

            var query = updateProductByID(professional_interest_area_id, record);
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

            // con.query("UPDATE professionalinterestarea SET title =$1,description =$2,role =$3,purchase_type =$4,image =$5 WHERE professional_interest_area_id = $6", [record.title, record.description, record.role, record.purchase_type, record.image, professional_interest_area_id], function (err, result) {
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

    this.changeprofessionalinterestareaStatus = function (record, professional_interest_area_id, callback) {
        connection.acquire(function (err, con) {
            con.query("UPDATE professional_interest_area SET status =$1 WHERE professional_interest_area_id = $2", [record.status, professional_interest_area_id], function (err, result) {
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

    this.getprofessionalinterestareaDataById = function (id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM professional_interest_area where professional_interest_area_id = $1', [id], function (err, result) {
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
module.exports = new Professionalinterestarea();