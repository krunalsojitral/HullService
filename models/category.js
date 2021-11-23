//methods for fetching mysql data
var connection = require('../config/database');
var env = require('../config/env');


function Category() {
    connection.init();

    this.getAllAdmincategory = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM category order by category_id desc', function (err, result) {
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

    
    this.addcategoryByadmin = function (record, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM category where category_name=$1', [record.category_name], function (err, result) {
                if (result.rows.length === 0) { 
                    const sql = 'INSERT INTO category(category_name,status) VALUES($1,$2) RETURNING *'
                    const values = [record.category_name, 1]
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
                    callback('category name is already exist.', null);
                }
            });
            
        });
    };

    function updateProductByID(category_id, cols) {
        // Setup static beginning of query
        var query = ['UPDATE category'];
        query.push('SET');

        // Create another array storing each set command
        // and assigning a number value for parameterized query
        var set = [];
        
        Object.keys(cols).map(function (key, i) {
            set.push(key + ' = ($' + (i + 1) + ')');
        });
        query.push(set.join(', '));
        
        // Add the WHERE statement to look up by id
        query.push('WHERE category_id = ' + category_id);

        // Return a complete query string
        return query.join(' ');
    }

    this.updatecategoryByadmin = function (record, category_id, update_value, callback) {
        connection.acquire(function (err, con) {

            var query = updateProductByID(category_id, record);
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

            // con.query("UPDATE category SET title =$1,description =$2,role =$3,purchase_type =$4,image =$5 WHERE category_id = $6", [record.title, record.description, record.role, record.purchase_type, record.image, category_id], function (err, result) {
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

    this.changecategoryStatus = function (record, category_id, callback) {
        connection.acquire(function (err, con) {
            con.query("UPDATE category SET status =$1 WHERE category_id = $2", [record.status, category_id], function (err, result) {
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

    this.getcategoryDataById = function (id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM category where category_id = $1', [id], function (err, result) {
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
module.exports = new Category();