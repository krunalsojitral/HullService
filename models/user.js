//methods for fetching mysql data
var connection = require('../config/database');
var env = require('../config/env');
var asyn = require('async');

function User() {
    connection.init();

    //check User reset password token
    this.checkUserRegistration = function (email, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM users where email = $1', [email], function (err, results) {
                con.release()
                if (err) {
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    callback(err, null);
                } else {
                    callback(null, results.rows);
                }
            });
        });
    };


    this.adduserByadmin = function (record, callback) {
        connection.acquire(function (err, con) {

            const sql = 'INSERT INTO users(name,phone,email,password,created_at,role, status) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *'
            const values = [record.name, record.phone, record.email, record.password, record.created_at, record.role, 1]
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

    this.addUser = function (record, callback) {
        connection.acquire(function (err, con) {
            const sql = 'INSERT INTO users("first_name","last_name","email","city","lat","long","level_of_education","occupation","sector","password","status","role","email_verification_token","created_at") VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *'
            const values = [record.first_name, record.last_name, record.email, record.city, record.lat, record.long, record.level_of_education, record.occupation, record.sector, record.password, record.status, record.role, record.email_verification_token, record.created_at]
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


    function updateProductByID(user_id, cols) {
        // Setup static beginning of query
        var query = ['UPDATE users'];
        query.push('SET');

        // Create another array storing each set command
        // and assigning a number value for parameterized query
        var set = [];

        Object.keys(cols).map(function (key, i) {
            set.push(key + ' = ($' + (i + 1) + ')');
        });
        query.push(set.join(', '));

        // Add the WHERE statement to look up by id
        query.push('WHERE id = ' + user_id);

        // Return a complete query string

        return query.join(' ');
    }

    this.updateuserByadmin = function (record, user_id, update_value, callback) {
        connection.acquire(function (err, con) {
            var query = updateProductByID(user_id, record);
            con.query(query, update_value, function (err, result) {
                if (err) {
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    con.release()
                    callback(err, null);
                } else {                   
                    con.release()
                    callback(null, record);
                }
            });
        });
    }

    this.getAllAdminUsers = function (role,callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM users where users.role = $1', [role], function (err, result) {
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



    //normal login
    this.checkUser = function (req, callback) {
        var email = req.body.email;
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM users WHERE email = $1', [email], function (err, results) {
                con.release();
                if (err) {
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    callback(err, null);
                } else {
                    if (results.rows.length === 0) {
                        msg = 'User does not exist.';
                        callback(msg, null);
                    } else {
                        if (results.rows[0].status == 0) {
                            var msg = 'Your account has not been activated. Please verify your account by clicking on the verification link in the email you received from us.';
                            callback(msg, null);
                        } else {
                            callback(null, results.rows);
                        }
                    }
                }
            });
        });
    };

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

    

    //user Profile update
    this.userProfileUpdate = function (record, user_id, callback) {
        connection.acquire(function (err, con) {            
            con.query('SELECT * FROM users where id = $1', [user_id], function (err, results) {
                if (err) {
                    con.release();
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    callback(err, null);
                } else {
                    if (results.rows.length) {
                        const values = [record.reset_password_token, user_id]
                        con.query("UPDATE users SET reset_password_token =$1 WHERE id = $2", values, function (err, result) {
                            if (err) {
                                if (env.DEBUG) {
                                    console.log(err);
                                }
                                callback(err, null);
                            } else {
                                callback(null, result);
                            }
                        });
                    } else {
                        let err = 'User Not Found.';
                        if (env.DEBUG) {
                            console.log(err);
                        }
                        callback(err, null);
                    }
                }
            });
        });
    }
    //check email User Token
    this.checkEmailVerifyUser = function (token, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM users where emailverification = $1', [token], function (err, results) {
                con.release()
                if (err) {
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    callback(err, null);
                } else {
                    callback(null, results.rows);
                }
            });
        });
    };

    //user email verify token update
    this.emailTokenUpdate = function (record, email_verify_token, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM users where emailverification = $1', [email_verify_token], function (err, results) {
                if (err) {
                    con.release();
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    callback(err, null);
                } else {
                    let user_id = results.rows[0].id;
                    const values = [1, '', user_id]
                    con.query("UPDATE users SET status = $1 , emailverification = $2 WHERE id = $3", values, function (err, result) {
                        if (err) {
                            if (env.DEBUG) {
                                console.log(err);
                            }
                            callback(err, null);
                        } else {
                            callback(null, record);
                        }
                    });

                    
                }
            });
        });
    };


    //check reset User Token
    this.checkResetUser = function (token, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM users where reset_password_token = $1', [token], function (err, results) {
                con.release()
                if (err) {
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    callback(err, null);
                } else {
                    callback(null, results.rows);
                }
            });
        });
    };

    //user reset password token update
    this.passwordUpdate = function (record, reset_password_token, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM users where reset_password_token = $1', [reset_password_token], function (err, results) {
                if (err) {
                    con.release();
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    callback(err, null);
                } else {
                    let user_id = results.rows[0].id;
                    const values = [record.password,'', user_id]
                    con.query("UPDATE users SET password = $1, reset_password_token = $2 WHERE id = $3", values, function (err, result) {
                        if (err) {
                            if (env.DEBUG) {
                                console.log(err);
                            }
                            callback(err, null);
                        } else {
                            callback(null, record);
                        }
                    });             
                }
            });
        });
    };

    this.userStatusUpdate = function (record, user_id, callback) {
        connection.acquire(function (err, con) {
            const values = [record.status, user_id]
            con.query("UPDATE users SET status = $1 WHERE id = $2", values, function (err, result) {
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
    };    

   

    

}
module.exports = new User();