//methods for fetching mysql data
var connection = require('../config/database');
var env = require('../config/env');
var asyn = require('async');

function User() {
    connection.init();

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
                        const values = [record.resetPasswordToken, user_id]
                        con.query("UPDATE users SET resetpasswordtoken =$1 WHERE id = $2", values, function (err, result) {
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

    // add user
    this.addUser = function (record, callback) {
        connection.acquire(function (err, con) {
            const sql = 'INSERT INTO users("full_name","user_name","phone","twitteraccount","usertype","portfoliourl","email","status","password","userrole","emailverification","createdAt") VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *'
            const values = [record.fullName, record.userName, record.phone, record.twitteraccount, record.usertype, record.portfoliourl, record.email, record.status, record.password, record.userRole, record.emailVerificationToken, record.createdAt]
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

    this.userUpdate = function (record, user_id, callback) {
        connection.acquire(function (err, con) {
            var sql = "UPDATE users SET phone=$1,twitteraccount=$2,portfoliourl=$3,full_name=$4,user_name=$5 WHERE id = $6";
            con.query(sql, [record.phone, record.twitteraccount, record.portfoliourl, record.fullName, record.userName, user_id], function (err, result) {
                console.log(err);
                if (err) {
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    callback(err, null);
                } else {
                    console.log(result);
                    callback(null, record);
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
            con.query('SELECT * FROM users where resetPasswordToken = $1', [token], function (err, results) {
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
            con.query('SELECT * FROM users where resetPasswordToken = $1', [reset_password_token], function (err, results) {
                if (err) {
                    con.release();
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    callback(err, null);
                } else {
                    let user_id = results.rows[0].id;
                    const values = ['', user_id]
                    con.query("UPDATE users SET resetPasswordToken = $1 WHERE id = $2", values, function (err, result) {
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

    this.getAllAdminUsers = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM users where users.userRole = $1',[2], function (err, result) {
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

    

}
module.exports = new User();