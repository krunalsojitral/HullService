//methods for fetching mysql data
var connection = require('../config/database');
var env = require('../config/env');
var asyn = require('async');

function User() {
    connection.init();

    //check User reset password token
    this.checkUserRegistration = function (email, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM users where LOWER(email) = $1', [email.toLowerCase()], function (err, results) {
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


    this.getCSVAdminUser = function (role, callback) {
        connection.acquire(function (err, con) {
            var sql = 'SELECT *, sector.name as sectorname, occupation.name as occupationname, academic_discipline.name as academicdisciplinename FROM users inner join user_role on users.role = user_role.role_id left join sector on users.sector = sector.sector_id left join occupation on users.occupation = occupation.occupation_id left join academic_discipline on users.academic_discipline = academic_discipline.academic_discipline_id where users.role = $1 order by UPPER(first_name) ASC';
            var array = [role];
            con.query(sql, array, function (err, result) {
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


    this.adduserByadmin = function (record, callback) {
        connection.acquire(function (err, con) {

            const sql = 'INSERT INTO users(first_name,last_name,phone,email,password,created_at,role, status) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *'
            const values = [record.first_name, record.last_name, record.phone, record.email, record.password, record.created_at, record.role, 1]
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

    this.checkUserOrganization = function (organization, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM organization where LOWER(organization_name) = $1', [organization.toLowerCase()], function (err, results) {
                if (err) {
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    con.release()
                    callback(err, null);
                } else {
                    if (results.rows.length > 0){
                        con.release()
                        callback(null, results.rows);
                    }else{
                        const sql = 'INSERT INTO organization(organization_name,status) VALUES($1,$2) RETURNING *'
                        const values = [organization,1]
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
                    }
                }
            });
        });
    };

    this.addUser = function (record, callback) {
        connection.acquire(function (err, con) {
            if (record.role == 3){
                var sql = 'INSERT INTO users("first_name","last_name","email","city","lat","long","country","academic_discipline","password","status","role","email_verification_token","created_at","organization","other_sector","other_academic_discipline","other_occupation","other_professional_interest_area","other_research_interest_area") VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19) RETURNING *'
                var values = [record.first_name, record.last_name, record.email, record.city, record.lat, record.long, record.country, record.academic_discipline, record.password, record.status, record.role, record.email_verification_token, record.created_at, record.organization, record.other_sector, record.other_academic_discipline, record.other_occupation, record.other_professional_interest_area, record.other_research_interest_area]
            }else{
                var sql = 'INSERT INTO users("first_name","last_name","email","city","lat","long","country", "level_of_education","occupation","sector","password","status","role","email_verification_token","created_at","organization","other_sector","other_academic_discipline","other_occupation","other_professional_interest_area","other_research_interest_area") VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21) RETURNING *'
                var values = [record.first_name, record.last_name, record.email, record.city, record.lat, record.long, record.country, record.level_of_education, record.occupation, record.sector, record.password, record.status, record.role, record.email_verification_token, record.created_at, record.organization, record.other_sector, record.other_academic_discipline, record.other_occupation, record.other_professional_interest_area, record.other_research_interest_area]
            }
            
            
            con.query(sql, values, function (err, result) {
                
                if (err) {
                    if (env.DEBUG) {                        
                        console.log(err);
                    }
                    callback(err, null);
                } else {

                    if (record.role == 2) {                         
                        if (record.professional_interest_of_area && record.professional_interest_of_area.length > 0) {
                            record.professional_interest_of_area.map(data => {
                                if (data.value !== 0){
                                    var sql = 'INSERT INTO user_professional_interest_area("user_id","professional_interest_area_id") VALUES($1,$2) RETURNING *'
                                    var values = [result.rows[0].id, data.value]
                                    con.query(sql, values, function (err, result) {
                                        console.log(err);
                                    });
                                }
                            });
                        } 
                    }else{                        
                        if (record.researcher_interest_of_area && record.researcher_interest_of_area.length > 0) {
                            record.researcher_interest_of_area.map(data => {
                                if (data.value !== 0) { 
                                    var sql = 'INSERT INTO user_researcher_interest_area("user_id","researcher_interest_area_id") VALUES($1,$2) RETURNING *'
                                    var values = [result.rows[0].id, data.value]
                                    con.query(sql, values, function (err, result) {
                                        console.log(err);
                                    });
                                }
                            });
                        } 
                    }
                    con.release()

                    callback(null, result.rows);
                }
            });
        });
    };

    this.getuserData = function (user_id, callback) {
        connection.acquire(function (err, con) {
            let sql = 'SELECT u.* from users as u where u.id = ' + user_id;
            //let sql = 'SELECT u.*,uc.*,ur.*, (SELECT COUNT(*) FROM post WHERE post.userId=u.id) as post,(SELECT COUNT(*) FROM post_comment WHERE post_comment.userId=u.id) as postComment FROM users u inner join sport_category as uc on uc.cat_id = u.categoryId inner join user_role as ur on ur.role_id = u.userRole where u.id = ' + user_id;
            con.query(sql, function (err, result) {
                con.release();
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

    this.getAllAdminUsers = function (role, status, callback) {
        connection.acquire(function (err, con) {
            var sql = '';
            var array = [role];
            if (status) {
                sql = 'SELECT * FROM users where users.role = $1 and users.status = $2 order by UPPER(first_name) ASC';
                array = [role, status];
            } else {
                sql = 'SELECT * FROM users where users.role = $1 order by UPPER(first_name) ASC';
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



    //normal login
    this.checkUser = function (req, callback) {
        var email = req.body.email;
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM users WHERE LOWER(email) = $1', [email.toLowerCase()], function (err, results) {
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
                            if (results.rows[0].email_verification_token !== null) {
                                var msg = 'Your account has not been activated. Please verify your account by clicking on the verification link in the email you received from us.';
                                callback(msg, null);
                            }else{
                                var msg = 'Your account has been deactivated. Please contact system Administrator.';
                                callback(msg, null);
                            }
                        } else {
                            callback(null, results.rows);
                        }
                    }
                }
            });
        });
    };

    this.getAdminUserById = function (id, callback) {
        connection.acquire(function (err, con) {
            var sql = 'SELECT *, sector.name as sectorname, occupation.name as occupationname, academic_discipline.name as academicdisciplinename FROM users inner join user_role on users.role = user_role.role_id left join organization on users.organization = organization.organization_id left join sector on users.sector = sector.sector_id left join occupation on users.occupation = occupation.occupation_id left join academic_discipline on users.academic_discipline = academic_discipline.academic_discipline_id where users.id = $1';
            con.query(sql, [id], function (err, result) {
                con.release();
                if (err){
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    callback(err, null);
                }else{                                        
                    if (result.rows.length === 0) {
                        msg = 'User does not exist.';
                        callback(msg, null);
                    } else {
                        callback(null, result.rows);
                    }
                }
            });
        });
    }

    this.getUserInterestAreaById = function (id,role, callback) {
        connection.acquire(function (err, con) {            
            var sql = '';            
            if (role == 2){
                sql = 'SELECT name FROM user_professional_interest_area inner join professional_interest_area on user_professional_interest_area.professional_interest_area_id = professional_interest_area.professional_interest_area_id where user_professional_interest_area.user_id = $1';
            }else{
                sql = 'SELECT name FROM user_researcher_interest_area inner join researcher_interest_area on user_researcher_interest_area.researcher_interest_area_id = researcher_interest_area.researcher_interest_area_id where user_researcher_interest_area.user_id = $1';
            }
            con.query(sql, [id], function (err, result) {
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

    this.getUserById = function (id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT *, users.role as userrole FROM users inner join user_role on users.role = user_role.role_id where id = $1', [id], function (err, result) {
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
            con.query('SELECT * FROM users where email_verification_token = $1', [token], function (err, results) {
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
            con.query('SELECT * FROM users where email_verification_token = $1', [email_verify_token], function (err, results) {
                if (err) {
                    con.release();
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    callback(err, null);
                } else {
                    let user_id = results.rows[0].id;
                    const values = [1, '', user_id]
                    con.query("UPDATE users SET status = $1 , email_verification_token = $2 WHERE id = $3", values, function (err, result) {
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