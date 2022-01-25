//methods for fetching mysql data
var connection = require('../config/database');
var env = require('../config/env');
var asyn = require('async');

function Researches() {
    connection.init();

    this.getAllAdminResearches = function (status, callback) {
        connection.acquire(function (err, con) {

            var sql = '';
            var array = [];
            if (status) {                
                sql = 'SELECT * FROM researches as c left join users on users.id = c.created_by where c.user_status = $1 and c.status = $2 order by c.researches_id desc'
                array = [1, status];
            } else {
                sql = 'SELECT * FROM researches as c left join users on users.id = c.created_by where c.user_status = $1 order by c.researches_id desc'
                array = [1];
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

    this.changeResearchesStatus = function (record, researches_id, callback) {
        connection.acquire(function (err, con) {
            con.query("UPDATE researches SET status =$1 WHERE researches_id = $2", [record.status, researches_id], function (err, result) {
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
  

    function updateProductByID(researches_content_id, cols) {
        // Setup static beginning of query
        var query = ['UPDATE researches_content'];
        query.push('SET');

        // Create another array storing each set command
        // and assigning a number value for parameterized query
        var set = [];
        
        Object.keys(cols).map(function (key, i) {
            set.push(key + ' = ($' + (i + 1) + ')');
        });
        query.push(set.join(', '));
        
        // Add the WHERE statement to look up by id
        query.push('WHERE researches_content_id = ' + researches_content_id);

        // Return a complete query string
        return query.join(' ');
    }

    this.updateResearchesByadmin = function (record, researches_content_id, update_value, callback) {
        connection.acquire(function (err, con) {            
            var query = updateProductByID(researches_content_id, record);
            con.query(query, update_value, function (err, result) {                
                con.release()
                console.log(err);
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

    this.changeDraftBlogStatus = function (record, blog_id, callback) {
        connection.acquire(function (err, con) {
            con.query("UPDATE blog SET draft_status =$1 WHERE blog_id = $2", [record.status, blog_id], function (err, result) {
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

    this.getResearchesContentDataById = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM researches_content where researches_content_id = $1', [1], function (err, result) {
                con.release();
                if (err) {                    
                    callback(err, null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    }

    this.getResearchesDataById = function (id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT *,c.status as research_status FROM researches as c left join users on users.id = c.created_by where c.researches_id = $1', [id], function (err, result) {
                con.release();
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    }

    this.getFutureParticipateResearchesList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT *,academic_discipline.name as academic FROM researches inner join users on users.id = researches.created_by inner join user_role on user_role.role_id = users.role left join academic_discipline on academic_discipline.academic_discipline_id = users.academic_discipline where researches.status = $1 and researches.user_status = $2 order by researches_id DESC',[1,1], function (err, result) {
                con.release();
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    }

    this.addParticipate = function (record, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM researches_participate WHERE researches_id = $1 and LOWER(email) = $2', [record.researches_id, record.email.toLowerCase()], function (err, results) {
                if (err) {
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    callback(err, null);
                } else {
                    if (results.rows.length === 0) {
                        const sql = 'INSERT INTO researches_participate(name,dob,email,created_at,researches_id) VALUES($1,$2,$3,$4,$5) RETURNING *'
                        const values = [record.name, record.dob, record.email, record.created_at, record.researches_id]
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
                    } else {
                        con.release();
                        var msg = 'You are already participate in research.';
                        callback(msg, null);
                    }
                }
            });            
        });
    };

    
    this.participateList = function (id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM researches_participate where researches_id = $1 order by researches_participate_id DESC', [id], function (err, result) {
                con.release();
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    }

    this.getMyResearchesList = function (id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM researches where created_by = $1 and user_status = $2 order by researches_id DESC', [id, 1], function (err, result) {
                con.release();
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    }

    
    this.addResearchByuser = function (record, callback) {
        connection.acquire(function (err, con) {
            const sql = 'INSERT INTO researches(topic,start_date,created_by,status,created_at,description,user_status) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *'
            const values = [record.topic, record.start_date, record.created_by, record.status, record.created_at, record.description,0]
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

    this.researchRequestList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT *, researches.created_at as c_at,researches.user_status as researches_status, researches.start_date as start_date FROM researches left join users on users.id = researches.created_by where (researches.user_status = $1 or researches.user_status = $2) order by researches_id desc', [0, 2], function (err, result) {
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

    this.updateComment = function (record, callback) {
        connection.acquire(function (err, con) {
            const values = [record.status, record.user_status, record.admin_comment, record.id]
            console.log(values);
            con.query("UPDATE researches SET status =$1, user_status =$2,comment =$3 WHERE researches_id = $4", values, function (err, result) {
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


    this.changeResearchesStatus = function (record, researches_id, callback) {
        connection.acquire(function (err, con) {
            con.query("UPDATE researches SET status =$1 WHERE researches_id = $2", [record.status, researches_id], function (err, result) {
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

     
    this.addFutureResearchByuser = function (record, callback) {
        connection.acquire(function (err, con) {
            const sql = 'INSERT INTO future_research(name,dob,email,created_at) VALUES($1,$2,$3,$4) RETURNING *'
            const values = [record.name, record.dob, record.email, record.created_at]
            con.query(sql, values, function (err, result) {                
                if (err) {
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    con.release()
                    callback(err, null);
                } else {
                    var research_id = result.rows[0].future_research_id
                    if (record.child_first){
                        const sql = 'INSERT INTO future_research_child(future_research_id,child_dob) VALUES($1,$2) RETURNING *'
                        const values = [research_id, record.child_first]
                        con.query(sql, values, function (err, result) { });
                    }
                    if (record.child && record.child.length > 0) {
                        record.child.forEach(function (value) {
                            const sql = 'INSERT INTO future_research_child(future_research_id,child_dob) VALUES($1,$2) RETURNING *'
                            const values = [research_id, value.value]
                            con.query(sql, values, function (err, result) { });
                        });                        
                    }
                    con.release()
                    callback(null, result.rows);
                }
            });
        });
    };

    
    this.getFutureResearchList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM future_research order by future_research_id desc', function (err, result) {
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

    this.getFutureResearchByID = function (id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM future_research where future_research_id = $1',[id], function (err, result) {
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

    this.getResearchesChildDataById = function (id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM future_research_child where future_research_id = $1 order by future_research_child_id desc', [id], function (err, result) {
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
    
    this.deleteResearches = function (researches, callback) {
        connection.acquire(function (err, con) {
            researches.map(data => {
                con.query('DELETE FROM researches where researches_id = $1', [data.researches_id], function (err, results) {
                    con.query('DELETE FROM researches_participate where researches_id = $1', [data.researches_id], function (err, results) {});
                });
            });
            con.release()
            callback(null, researches);
        });
    };

    this.deleteFutureParticipate = function (researches, callback) {
        connection.acquire(function (err, con) {
            researches.map(data => {
                con.query('DELETE FROM future_research where future_research_id = $1', [data.future_research_id], function (err, results) {});
                con.query('DELETE FROM future_research_child where future_research_id = $1', [data.future_research_id], function (err, results) { });
            });
            con.release()
            callback(null, researches);
        });
    };

    
}
module.exports = new Researches();