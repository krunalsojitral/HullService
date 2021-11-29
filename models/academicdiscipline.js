//methods for fetching mysql data
var connection = require('../config/database');
var env = require('../config/env');


function Academicdiscipline() {
    connection.init();

    this.getAllAdminacademicdiscipline = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM academic_discipline order by academic_discipline_id desc', function (err, result) {
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

    
    this.addacademicdisciplineByadmin = function (record, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM academic_discipline where name=$1', [record.academicdiscipline_name], function (err, result) {
                if (result.rows.length === 0) { 
                    const sql = 'INSERT INTO academic_discipline(name,status) VALUES($1,$2) RETURNING *'
                    const values = [record.academicdiscipline_name, 1]
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
                    callback('Name is already exist.', null);
                }
            });
            
        });
    };

    function updateProductByID(academicdiscipline_id, cols) {
        // Setup static beginning of query
        var query = ['UPDATE academic_discipline'];
        query.push('SET');

        // Create another array storing each set command
        // and assigning a number value for parameterized query
        var set = [];
        
        Object.keys(cols).map(function (key, i) {
            set.push(key + ' = ($' + (i + 1) + ')');
        });
        query.push(set.join(', '));
        
        // Add the WHERE statement to look up by id
        query.push('WHERE academic_discipline_id = ' + academicdiscipline_id);

        // Return a complete query string
        return query.join(' ');
    }

    this.updateacademicdisciplineByadmin = function (record, academicdiscipline_id, update_value, callback) {
        connection.acquire(function (err, con) {

            var query = updateProductByID(academicdiscipline_id, record);
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

            // con.query("UPDATE academicdiscipline SET title =$1,description =$2,role =$3,purchase_type =$4,image =$5 WHERE academicdiscipline_id = $6", [record.title, record.description, record.role, record.purchase_type, record.image, academicdiscipline_id], function (err, result) {
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

    this.changeacademicdisciplineStatus = function (record, academicdiscipline_id, callback) {
        connection.acquire(function (err, con) {
            con.query("UPDATE academic_discipline SET status =$1 WHERE academic_discipline_id = $2", [record.status, academicdiscipline_id], function (err, result) {
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

    this.getacademicdisciplineDataById = function (id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM academic_discipline where academic_discipline_id = $1', [id], function (err, result) {
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
module.exports = new Academicdiscipline();