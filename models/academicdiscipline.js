//methods for fetching mysql data
var connection = require('../config/database');
var env = require('../config/env');


function Academicdiscipline() {
    connection.init();

    this.getAllAdminacademicdiscipline = function (status, callback) {
        connection.acquire(function (err, con) {
            var sql = '';
            var array = [];
            if (status) {
                sql = 'SELECT * FROM academic_discipline where status = $1 order by UPPER(name) ASC';
                array = [status];
            } else {
                sql = 'SELECT * FROM academic_discipline order by UPPER(name) ASC';
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

    
    this.deleteAcademicdiscipline = function (academicdiscipline, callback) {
        connection.acquire(function (err, con) {
            academicdiscipline.map(data => {
                con.query('DELETE FROM academic_discipline where academic_discipline_id = $1', [data.academicdiscipline_id], function (err, results) {
                    con.query("UPDATE users SET academic_discipline = NULL WHERE academic_discipline = $1", [data.academicdiscipline_id], function (err, result) {
                    });
                });
            });
            con.release()
            callback(null, academicdiscipline);
        });
    };

    

}
module.exports = new Academicdiscipline();