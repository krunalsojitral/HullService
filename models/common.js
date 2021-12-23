//methods for fetching mysql data
var connection = require('../config/database');
var env = require('../config/env');
var asyn = require('async');

function Common() {
    connection.init();

    this.getRoleList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM user_role where role_id != $1', [1], function (err, result) {
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

    this.getRoleAllList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM user_role', function (err, result) {
                con.release();
                if (err) {
                    if (env.DEBUG) { console.log(err); }
                    callback(err, null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    }

    this.getTagList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM tag where status = $1', [1], function (err, result) {
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

    this.getHeadingList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM forumheading where status = $1', [1], function (err, result) {
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

    this.getCategoryList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM category where status = $1', [1], function (err, result) {
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

    this.getAcademicDisciplineList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM academic_discipline where status = $1 order by name ASC', [1], function (err, result) {
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

    this.getOccupationList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM occupation where status = $1 order by name ASC', [1], function (err, result) {
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

    this.getSectorList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM sector where status = $1 order by name ASC', [1], function (err, result) {
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

    this.getProfessionalInterestAreaList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM professional_interest_area where status = $1 order by name ASC', [1], function (err, result) {
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
    
    this.getResearcherInterestAreaList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM researcher_interest_area where status = $1 order by name ASC', [1], function (err, result) {
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
    

    
    this.addPreview = function (record, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM preview', function (err, result) {                
                if (err) {
                    if (env.DEBUG) { console.log(err); }
                    callback(err, null);
                } else {
                    if (result){
                        
                        const values = [record.title, record.image, record.description, record.module_type, record.created_at, record.videoId, 1]
                        con.query("UPDATE preview SET title = $1, image = $2, description = $3, module_type = $4, created_at = $5, videoId = $6  WHERE preview_id = $7", values, function (err, result) {
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
                        
                    }else{

                        const sql = 'INSERT INTO preview(title,image,description,module_type,videoId,created_at) VALUES($1,$2,$3,$4,$5,$6) RETURNING *'
                        const values = [record.title, record.image, record.description, record.module_type, record.videoId, record.created_at]
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


    this.getPreview = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM preview', function (err, result) {
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
module.exports = new Common();