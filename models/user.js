//methods for fetching mysql data
var connection = require('../config/database');
var env = require('../config/env');
var async = require('async');

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

    //check email User Token
    this.checkEmailVerifyUser = function (token, email, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM users where email_verification_token = $1 and LOWER(email)=$2', [token, email.toLowerCase()], function (err, results) {
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

    this.checkEmailVerify = function (token, callback) {
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

    this.getAdminUserByEmailToken = function (token, callback) {
        connection.acquire(function (err, con) {
            var sql = 'SELECT *, sector.name as sectorname, occupation.name as occupationname, academic_discipline.name as academicdisciplinename FROM users inner join user_role on users.role = user_role.role_id left join organization on users.organization = organization.organization_id left join sector on users.sector = sector.sector_id left join occupation on users.occupation = occupation.occupation_id left join academic_discipline on users.academic_discipline = academic_discipline.academic_discipline_id where users.email_verification_token = $1';
            con.query(sql, [token], function (err, result) {
                con.release();
                if (err) {
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    callback(err, null);
                } else {
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

    
    this.updateResearchRequestSignUpCount = function (callback) {
        connection.acquire(function (err, con) {
            con.query("UPDATE users SET user_read_status =$1", [1], function (err, result) {
                con.release()
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

    this.checkUserEditProfile = function (email,user_id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM users where LOWER(email) = $1 and (id NOT IN ($2::int))', [email.toLowerCase(), user_id], function (err, results) {
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

    this.getCSVAdminUser = function (search, callback) {
        connection.acquire(function (err, con) {
            var params = {
                city: (search.data && search.data.city) ? search.data.city : '',
                level_of_education: (search.data && search.data.level_of_education) ? search.data.level_of_education : '',
                occupation: (search.data && search.data.occupation) ? search.data.occupation : '',
                sector: (search.data && search.data.sector) ? search.data.sector : '',
                professional_interest_of_area: (search.data && search.data.professional_interest_of_area) ? search.data.professional_interest_of_area : '',
                research_interest_of_area: (search.data && search.data.research_interest_of_area) ? search.data.research_interest_of_area : '',
                organization: (search.data && search.data.organization) ? search.data.organization : '',
                academic_discipline: (search.data && search.data.academic_discipline) ? search.data.academic_discipline : '',
                role: (search.data.role) ? search.data.role : '',
                status: (search.data && search.data.status) ? search.data.status : ''
            }

            var user_id = [];
            async.waterfall([
                function (callback0) {
                    if (params.professional_interest_of_area) {
                        con.query("SELECT user_id FROM user_professional_interest_area where professional_interest_area_id = ANY($1::int[])", [params.professional_interest_of_area], function (err, result) {
                            if (err) {
                                callback0(null, user_id);
                            } else {
                                if (result.rows.length > 0) {
                                    result.rows.forEach(function (d) {
                                        user_id.push(d.user_id);
                                    });
                                    callback0(null, user_id);
                                } else {
                                    user_id.push(0)
                                    callback0(null, user_id);
                                }
                            }
                        });
                    } else {
                        callback0(null, user_id);
                    }
                },
                function (user_id, callback1) {
                    if (params.research_interest_of_area) {
                        con.query("SELECT user_id FROM user_researcher_interest_area where researcher_interest_area_id = ANY($1::int[])", [params.research_interest_of_area], function (err, result) {
                            if (err) {
                                callback1(null, user_id);
                            } else {
                                if (result.rows.length > 0) {
                                    result.rows.forEach(function (d) {
                                        user_id.push(d.user_id);
                                    });
                                    callback1(null, user_id);
                                } else {
                                    user_id.push(0)
                                    callback1(null, user_id);
                                }
                            }
                        });
                    } else {
                        callback1(null, user_id);
                    }
                }, function (arg1, callback2) {
                    params.user_id = user_id;
                    var conditions = csvbuildConditions(params);                    
                    var sql = 'SELECT *, sector.name as sectorname,organization.organization_name as organizationname, occupation.name as occupationname, academic_discipline.name as academicdisciplinename FROM users inner join user_role on users.role = user_role.role_id left join organization on users.organization = organization.organization_id left join sector on users.sector = sector.sector_id left join occupation on users.occupation = occupation.occupation_id left join academic_discipline on users.academic_discipline = academic_discipline.academic_discipline_id WHERE ' + conditions.where + ' ' + conditions.orderby;
                    con.query(sql, conditions.values, function (err, result) {
                        con.release();                        
                        if (err) {
                            console.log(err);
                            callback2(err, null);
                        } else {
                            callback2(null, result.rows);
                        }
                    });
                }
            ], function (err, result) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        });
    }

    function csvbuildConditions(params) {


        var conditions = [];
        var orderby_conditions = ["order by users.status ASC, users.id DESC"];
        var values = [];

        if (params.status) { 
            if (params.status == 2) {
                conditions.push("(users.email_verification_token IS NOT NULL and length(users.email_verification_token) > 0)");
            } else {
                conditions.push("(users.email_verification_token IS NULL or length(users.email_verification_token) = 0)");
            }
        }        

        conditions.push("users.role = $" + (values.length + 1));
        values.push(params.role);

        if (typeof params.level_of_education !== 'undefined' && params.level_of_education != '') {
            conditions.push("users.level_of_education = $" + (values.length + 1));
            values.push(params.level_of_education);
        }

        if (typeof params.occupation !== 'undefined' && params.occupation != '') {
            conditions.push("users.occupation = $" + (values.length + 1));
            values.push(params.occupation);
        }

        if (typeof params.sector !== 'undefined' && params.sector != '') {
            conditions.push("users.sector = $" + (values.length + 1));
            values.push(params.sector);
        }

        if (typeof params.organization !== 'undefined' && params.organization != '') {
            conditions.push("users.organization = $" + (values.length + 1));
            values.push(params.organization);
        }

        if (typeof params.academic_discipline !== 'undefined' && params.academic_discipline != '') {
            conditions.push("users.academic_discipline = $" + (values.length + 1));
            values.push(params.academic_discipline);
        }

        if (typeof params.city !== 'undefined' && params.city != '') {
            conditions.push("users.city ILIKE $" + (values.length + 1));
            values.push("%" + params.city + "%");
        }

        if (typeof params.status !== 'undefined' && params.status != '' && params.status != 2) {
            conditions.push("users.status = $" + (values.length + 1));
            values.push(params.status);
        }

        if (params.user_id.length > 0) {
            conditions.push("users.id = ANY($" + (values.length + 1) + "::int[])");
            values.push(params.user_id);
        }

        return {
            where: conditions.length ? conditions.join(' AND ') : '1',
            values: values,
            orderby: orderby_conditions
        };
    }

    this.getFilterAdminUsers = function (search, callback) {
        connection.acquire(function (err, con) {
            var params = {
                city: (search.data && search.data.city) ? search.data.city : '',
                level_of_education: (search.data && search.data.level_of_education) ? search.data.level_of_education : '',
                occupation: (search.data && search.data.occupation) ? search.data.occupation : '',
                sector: (search.data && search.data.sector) ? search.data.sector : '',
                professional_interest_of_area: (search.data && search.data.professional_interest_of_area) ? search.data.professional_interest_of_area : '',
                research_interest_of_area: (search.data && search.data.research_interest_of_area) ? search.data.research_interest_of_area : '',
                organization: (search.data && search.data.organization) ? search.data.organization : '',
                academic_discipline: (search.data && search.data.academic_discipline) ? search.data.academic_discipline : '',
                role: (search.data.role) ? search.data.role : '',
                status: (search.data && search.data.status) ? search.data.status : ''
            }

            var user_id = [];
            async.waterfall([
                function (callback0) {
                    if (params.professional_interest_of_area) {
                        con.query("SELECT user_id FROM user_professional_interest_area where professional_interest_area_id = ANY($1::int[])", [params.professional_interest_of_area], function (err, result) {
                            if (err) {
                                callback0(null, user_id);
                            } else {
                                if (result.rows.length > 0) {
                                    result.rows.forEach(function (d) {
                                        user_id.push(d.user_id);
                                    });
                                    callback0(null, user_id);
                                } else {
                                    user_id.push(0)
                                    callback0(null, user_id);
                                }
                            }
                        });
                    } else {
                        callback0(null, user_id);
                    }
                },
                function (user_id, callback1) {
                    if (params.research_interest_of_area) {
                        con.query("SELECT user_id FROM user_researcher_interest_area where researcher_interest_area_id = ANY($1::int[])", [params.research_interest_of_area], function (err, result) {
                            if (err) {
                                callback1(null, user_id);
                            } else {
                                if (result.rows.length > 0) {
                                    result.rows.forEach(function (d) {
                                        user_id.push(d.user_id);
                                    });
                                    callback1(null, user_id);
                                } else {
                                    user_id.push(0)
                                    callback1(null, user_id);
                                }
                            }
                        });
                    } else {
                        callback1(null, user_id);
                    }
                }, function (arg1, callback2) {
                    params.user_id = user_id;
                    var conditions = buildConditions(params);
                    var sql = 'SELECT * FROM users WHERE ' + conditions.where + ' ' + conditions.orderby;
                    console.log(sql);
                    con.query(sql, conditions.values, function (err, result) {
                        con.release();
                        
                        if (err) {
                            console.log(err);
                            callback2(err, null);
                        } else {
                            callback2(null, result.rows);
                        }
                    });
                }
            ], function (err, result) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        });
    }

    function buildConditions(params) {


        var conditions = [];
        var orderby_conditions = ["order by users.status ASC, users.id DESC"];
        var values = [];

        conditions.push("role = $" + (values.length + 1));
        values.push(params.role);

        if (params.status) {
            if (params.status == 2) {
                conditions.push("(users.email_verification_token IS NOT NULL and length(users.email_verification_token) > 0)");
            } else {
                conditions.push("(users.email_verification_token IS NULL or length(users.email_verification_token) = 0)");
            }
        }

        if (typeof params.level_of_education !== 'undefined' && params.level_of_education != '') {
            conditions.push("level_of_education = $" + (values.length + 1));
            values.push(params.level_of_education);
        }

        if (typeof params.occupation !== 'undefined' && params.occupation != '') {
            conditions.push("occupation = $" + (values.length + 1));
            values.push(params.occupation);
        }

        if (typeof params.sector !== 'undefined' && params.sector != '') {
            conditions.push("sector = $" + (values.length + 1));
            values.push(params.sector);
        }

        if (typeof params.organization !== 'undefined' && params.organization != '') {
            conditions.push("organization = $" + (values.length + 1));
            values.push(params.organization);
        }

        if (typeof params.academic_discipline !== 'undefined' && params.academic_discipline != '') {
            conditions.push("academic_discipline = $" + (values.length + 1));
            values.push(params.academic_discipline);
        }

        if (typeof params.city !== 'undefined' && params.city != '') {
            conditions.push("city ILIKE $" + (values.length + 1));
            values.push("%" + params.city + "%");
        }

        if (typeof params.status !== 'undefined' && params.status != '' && params.status != 2) {
            conditions.push("status = $" + (values.length + 1));
            values.push(params.status);
        }

        if (params.user_id.length > 0) {
            conditions.push("id = ANY($" + (values.length + 1) + "::int[])");
            values.push(params.user_id);
        }

        return {
            where: conditions.length ? conditions.join(' AND ') : '1',
            values: values,
            orderby: orderby_conditions
        };
    }


    // this.getCSVAdminUser = function (role, status, callback) {
    //     connection.acquire(function (err, con) {

    //         var sql = '';
    //         var array = [role];
    //         if (status) {
    //             if (status == 2) {
    //                 sql = 'SELECT *, sector.name as sectorname,organization.organization_name as organizationname, occupation.name as occupationname, academic_discipline.name as academicdisciplinename FROM users inner join user_role on users.role = user_role.role_id left join organization on users.organization = organization.organization_id left join sector on users.sector = sector.sector_id left join occupation on users.occupation = occupation.occupation_id left join academic_discipline on users.academic_discipline = academic_discipline.academic_discipline_id where users.role = $1 and (users.email_verification_token IS NOT NULL and length(users.email_verification_token) > 0) order by UPPER(users.first_name) ASC';
    //                 //sql = "SELECT * FROM users where users.role = $1 and (users.email_verification_token IS NOT NULL and length(users.email_verification_token) > 0) order by UPPER(first_name) ASC";
    //                 array = [role];
    //             } else {
    //                 sql = 'SELECT *, sector.name as sectorname,organization.organization_name as organizationname, occupation.name as occupationname, academic_discipline.name as academicdisciplinename FROM users inner join user_role on users.role = user_role.role_id left join organization on users.organization = organization.organization_id left join sector on users.sector = sector.sector_id left join occupation on users.occupation = occupation.occupation_id left join academic_discipline on users.academic_discipline = academic_discipline.academic_discipline_id where users.role = $1 and users.status = $2 and (users.email_verification_token IS NULL or length(users.email_verification_token) = 0) order by UPPER(users.first_name) ASC';
    //                 //sql = 'SELECT * FROM users where users.role = $1 and users.status = $2 and (users.email_verification_token IS NULL or length(users.email_verification_token) = 0) order by UPPER(first_name) ASC';
    //                 array = [role, status];
    //             }
    //         } else {
    //             sql = 'SELECT *, sector.name as sectorname,organization.organization_name as organizationname, occupation.name as occupationname, academic_discipline.name as academicdisciplinename FROM users inner join user_role on users.role = user_role.role_id left join organization on users.organization = organization.organization_id left join sector on users.sector = sector.sector_id left join occupation on users.occupation = occupation.occupation_id left join academic_discipline on users.academic_discipline = academic_discipline.academic_discipline_id where users.role = $1 order by UPPER(users.first_name) ASC';
    //             //sql = 'SELECT * FROM users where users.role = $1 order by UPPER(first_name) ASC';
    //         }

    //         //var sql = 'SELECT *, sector.name as sectorname, organization.organization_name as organizationname, occupation.name as occupationname, academic_discipline.name as academicdisciplinename FROM users inner join user_role on users.role = user_role.role_id left join organization on users.organization = organization.organization_id left join sector on users.sector = sector.sector_id left join occupation on users.occupation = occupation.occupation_id left join academic_discipline on users.academic_discipline = academic_discipline.academic_discipline_id where users.role = $1 order by UPPER(first_name) ASC';
            
    //         con.query(sql, array, function (err, result) {
    //             con.release();
    //             if (err){
    //                 console.log(err);
    //                 callback(err, null);
    //             }else{
    //                 callback(null, result.rows);
    //             }                
    //         });
    //     });
    // }


    this.adduserByadmin = function (record, callback) {
        connection.acquire(function (err, con) {

            const sql = 'INSERT INTO users(first_name,last_name,phone,email,password,created_at,role, status, first_time_login) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *'
            const values = [record.first_name, record.last_name, record.phone, record.email, record.password, record.created_at, record.role, 1, 1]
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

    this.checkUserSubscribtion = function (email, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM subscribe where LOWER(email) = $1', [email.toLowerCase()], function (err, results) {
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

    this.subscribeUser = function (record, callback) {
        connection.acquire(function (err, con) {            
            const sql = 'INSERT INTO subscribe(email,created_at) VALUES($1,$2) RETURNING *'
            const values = [record.email, record.created_at]
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

    this.contactUs = function (record, callback) {
        connection.acquire(function (err, con) {            
            const sql = 'INSERT INTO contact(first_name,last_name,phone,email,description,created_at) VALUES($1,$2,$3,$4,$5,$6) RETURNING *'
            const values = [record.first_name,record.last_name,record.phone,record.email,record.description, record.created_at]
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

    
    this.userSubscribeList = function ( callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM subscribe', function (err, result) {
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
                var sql = 'INSERT INTO users("first_name","last_name","email","phone","city","lat","long","country","academic_discipline","password","status","role","email_verification_token","created_at","organization","other_sector","other_academic_discipline","other_occupation","other_professional_interest_area","other_research_interest_area","payment_id","joined_date","renewal_date","subscribe","about_us","research_description") VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26) RETURNING *'
                var values = [record.first_name, record.last_name, record.email, record.phone, record.city, record.lat, record.long, record.country, record.academic_discipline, record.password, record.status, record.role, record.email_verification_token, record.created_at, record.organization, record.other_sector, record.other_academic_discipline, record.other_occupation, record.other_professional_interest_area, record.other_research_interest_area, record.payment_id, record.joined_date, record.renewal_date, record.subscribe, record.about_us, record.research_description]
            } else if (record.role == 2) {
                var sql = 'INSERT INTO users("first_name","last_name","email","phone","city","lat","long","country", "level_of_education","occupation","sector","password","status","role","email_verification_token","created_at","organization","other_sector","other_academic_discipline","other_occupation","other_professional_interest_area","other_research_interest_area","payment_id","joined_date","renewal_date","subscribe","about_us","research_description") VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28) RETURNING *'
                var values = [record.first_name, record.last_name, record.email, record.phone, record.city, record.lat, record.long, record.country, record.level_of_education, record.occupation, record.sector, record.password, record.status, record.role, record.email_verification_token, record.created_at, record.organization, record.other_sector, record.other_academic_discipline, record.other_occupation, record.other_professional_interest_area, record.other_research_interest_area, record.payment_id, record.joined_date, record.renewal_date, record.subscribe, record.about_us, record.research_description]
            }else{
                var sql = 'INSERT INTO users("first_name","last_name","email","phone","password","status","role","email_verification_token","created_at","payment_id","joined_date","renewal_date","subscribe","about_us","research_description") VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *'
                var values = [record.first_name, record.last_name, record.email, record.phone, record.password, record.status, record.role, record.email_verification_token, record.created_at, record.payment_id, record.joined_date, record.renewal_date, record.subscribe, record.about_us, record.research_description]
            }
            
            
            con.query(sql, values, function (err, result) {
                
                if (err) {
                    if (env.DEBUG) {                        
                        console.log(err);
                    }
                    con.release()
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

    this.updateuserByadmin = function (record, user_id, update_value, professional_interest_of_area, researcher_interest_of_area, role, callback) {
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
                    if (role == 2) {
                        if (professional_interest_of_area && professional_interest_of_area.length > 0) {                            
                            con.query('SELECT * FROM user_professional_interest_area where user_id = $1', [user_id], function (err, result) {
                                if (result.rows.length > 0){
                                    con.query('DELETE FROM user_professional_interest_area where user_id = $1', [user_id], function (err, results) {});
                                    professional_interest_of_area.map(data => {
                                        if (data.value !== 0) {
                                            con.query('INSERT INTO user_professional_interest_area("user_id","professional_interest_area_id") VALUES($1,$2) RETURNING *', [user_id, data.value], function (err, result) {
                                                //console.log(err);
                                            });
                                        }
                                    });
                                }else{
                                    professional_interest_of_area.map(data => {
                                        if (data.value !== 0) {                                            
                                            con.query('INSERT INTO user_professional_interest_area("user_id","professional_interest_area_id") VALUES($1,$2) RETURNING *', [user_id, data.value], function (err, result) {
                                                //console.log(err);
                                            });
                                        }
                                    });
                                }                            
                            });
                        }
                    } else {
                        if (researcher_interest_of_area && researcher_interest_of_area.length > 0) {                            
                            con.query('SELECT * FROM user_researcher_interest_area where user_id = $1', [user_id], function (err, result) {
                                if (result.rows.length > 0) {                                    
                                    con.query('DELETE FROM user_researcher_interest_area where user_id = $1', [user_id], function (err, results) { });
                                    researcher_interest_of_area.map(data => {
                                        if (data.value !== 0) {                                                                                        
                                            con.query('INSERT INTO user_researcher_interest_area("user_id","researcher_interest_area_id") VALUES($1,$2) RETURNING *', [user_id, data.value], function (err, result) {
                                                //console.log(err);
                                            });
                                        }
                                    });
                                } else {
                                    researcher_interest_of_area.map(data => {
                                        if (data.value !== 0) {                                            
                                            con.query('INSERT INTO user_researcher_interest_area("user_id","researcher_interest_area_id") VALUES($1,$2) RETURNING *', [user_id, data.value], function (err, result) {
                                                //console.log(err);
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    }
                    con.release()
                    callback(null, record);
                }
            });
        });
    }

    // this.getAllAdminUsers = function (role, status, callback) {
    //     connection.acquire(function (err, con) {
    //         var sql = '';
    //         var array = [role];
    //         if (status) {
    //             if (status == 2){
    //                 sql = "SELECT * FROM users where users.role = $1 and (users.email_verification_token IS NOT NULL and length(users.email_verification_token) > 0) order by UPPER(first_name) ASC";
    //                 array = [role];
    //             }else{                   
    //                 sql = 'SELECT * FROM users where users.role = $1 and users.status = $2 and (users.email_verification_token IS NULL or length(users.email_verification_token) = 0) order by UPPER(first_name) ASC';
    //                 array = [role, status];
    //             }                
    //         } else {                
    //             sql = 'SELECT * FROM users where users.role = $1 order by UPPER(first_name) ASC';
    //         }
    //         con.query(sql, array, function (err, result) {
    //             con.release()
    //             if (err) {
    //                 if (env.DEBUG) { console.log(err); }
    //                 callback(err, null);
    //             } else {
    //                 callback(null, result.rows);
    //             }
    //         });
    //     });
    // };

    

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
                    if (results && results.rows.length === 0) {
                        msg = 'User does not exist.';
                        callback(msg, null);
                    } else {
                        if (results.rows[0].status == 0) {                                    
                            if (results.rows[0].email_verification_token) {
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
            var sql = 'SELECT *,users.status as user_status, sector.name as sectorname, occupation.name as occupationname, academic_discipline.name as academicdisciplinename FROM users inner join user_role on users.role = user_role.role_id left join organization on users.organization = organization.organization_id left join sector on users.sector = sector.sector_id left join occupation on users.occupation = occupation.occupation_id left join academic_discipline on users.academic_discipline = academic_discipline.academic_discipline_id where users.id = $1';
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
            console.log(role);
            if (role == 2){
                sql = 'SELECT *,professional_interest_area.professional_interest_area_id as p_id FROM user_professional_interest_area inner join professional_interest_area on user_professional_interest_area.professional_interest_area_id = professional_interest_area.professional_interest_area_id where user_professional_interest_area.user_id = $1';
            }else{
                sql = 'SELECT *,researcher_interest_area.researcher_interest_area_id as p_id FROM user_researcher_interest_area inner join researcher_interest_area on user_researcher_interest_area.researcher_interest_area_id = researcher_interest_area.researcher_interest_area_id where user_researcher_interest_area.user_id = $1';
            }
            con.query(sql, [id], function (err, result) {                
                con.release();
                if (err){
                    callback(err, null);
                }else{
                    if (result && result.rows && result.rows.length === 0) {
                        msg = 'Interest area does not exist.';
                        callback(msg, null);
                    } else {
                        callback(null, result.rows);
                    }
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

    this.updateFirstView = function ( user_id, callback) { 
        connection.acquire(function (err, con) { 
            con.query("UPDATE users SET first_time_login =$1 WHERE id = $2", [0, user_id], function (err, result) {
                con.release()
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
                            con.release()
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
                }
            });
        });
    };

    this.userStatusUpdate = function (record, user_id, callback) {
        connection.acquire(function (err, con) {
            const values = [record.status, user_id]
            con.query("UPDATE users SET status = $1 WHERE id = $2", values, function (err, result) {
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
    };    

   

    

}
module.exports = new User();