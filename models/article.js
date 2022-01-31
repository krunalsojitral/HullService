//methods for fetching mysql data
var connection = require('../config/database');
var env = require('../config/env');
var asyn = require('async');

function User() {
    connection.init();  

    this.getAllAdminArticle = function (status, callback) {
        connection.acquire(function (err, con) {
            var sql = '';
            var array = [];
            if (status) {
                sql = 'SELECT * FROM article where status = $1 and draft_status IS NULL order by article_id DESC';
                array = [status];
            } else {
                sql = 'SELECT * FROM article where draft_status IS NULL order by article_id desc';
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
    }

    this.getArticleRoleName = function (id,role, callback) {
        connection.acquire(function (err, con) {

            if (role){
                var sql = "select string_agg(user_role.role, ',') from (select article_id, unnest(string_to_array(role, ',')):: INT as name_id from article) s1 join user_role on s1.name_id = user_role.role_id where s1.article_id = $1";
                con.query(sql, [id], function (err, result) {
                    con.release()
                    if (err) {
                        if (env.DEBUG) { console.log(err); }
                        callback(err, null);
                    } else {
                        callback(null, result.rows);
                    }
                });
            }else{
                con.release()
                callback(null, null);
            }
            
        });
    }

    
    
    this.addarticleByadmin = function (record, callback) {
        connection.acquire(function (err, con) {
            const sql = 'INSERT INTO article(title,description,created_at,role,purchase_type,image,draft_status,cost,status) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *'
            const values = [record.title, record.description, record.created_at, record.role, record.purchase_type, record.image, record.draft, record.cost, 1]
            con.query(sql, values, function (err, result) {                
                if (err) {
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    con.release()
                    callback(err, null);
                } else {
                    if (record.tag.length > 0) {
                        record.tag.map(data => {
                            var records = {
                                tag_id: data.value,
                                article_id: result.rows[0].article_id
                            }
                            const sql = 'INSERT INTO article_tag(article_id,tag_id) VALUES($1,$2) RETURNING *'
                            const values = [records.article_id, records.tag_id]
                            con.query(sql, values, function (err, result) { });
                        });
                    }
                    con.release()
                    callback(null, result.rows[0]);
                }
            });
        });
    };

    
    this.getTagByArticleId = function (id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM article_tag inner join tag on article_tag.tag_id = tag.tag_id where article_tag.article_id = $1', [id], function (err, result) {
                con.release();
                if (result.rows.length === 0) {
                    callback('Tag does not exist.', null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    }

    function updateProductByID(article_id, cols) {
        // Setup static beginning of query
        var query = ['UPDATE article'];
        query.push('SET');

        // Create another array storing each set command
        // and assigning a number value for parameterized query
        var set = [];
        
        Object.keys(cols).map(function (key, i) {
            set.push(key + ' = ($' + (i + 1) + ')');
        });
        query.push(set.join(', '));
        
        // Add the WHERE statement to look up by id
        query.push('WHERE article_id = ' + article_id);

        // Return a complete query string
        return query.join(' ');
    }

    this.updatearticleByadmin = function (record, article_id, update_value,tag, callback) {
        connection.acquire(function (err, con) {
            var query = updateProductByID(article_id, record);
            con.query(query, update_value, function (err, result) {                
                if (err) {
                    if (env.DEBUG) {
                        console.log(err);
                    }
                    con.release()
                    callback(err, null);
                } else {
                    if (tag.length > 0) {
                        const sql = 'DELETE FROM article_tag where article_id = $1'
                        const values = [article_id]
                        con.query(sql, values, function (err, results) {
                            tag.map(data => {
                                var records = {
                                    tag_id: data.value,
                                    article_id: article_id
                                }
                                const sql = 'INSERT INTO article_tag(article_id,tag_id) VALUES($1,$2) RETURNING *'
                                const values = [article_id, records.tag_id]
                                con.query(sql, values, function (err, result) { });
                            });
                        });
                    }else{
                        const sql = 'DELETE FROM article_tag where article_id = $1'
                        const values = [article_id]
                        con.query(sql, values, function (err, results) {});
                    }
                    con.release()
                    callback(null, record);
                }
            });

            // con.query("UPDATE article SET title =$1,description =$2,role =$3,purchase_type =$4,image =$5 WHERE article_id = $6", [record.title, record.description, record.role, record.purchase_type, record.image, article_id], function (err, result) {
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

    this.changearticleStatus = function (record, article_id, callback) {
        connection.acquire(function (err, con) {
            con.query("UPDATE article SET status =$1 WHERE article_id = $2", [record.status, article_id], function (err, result) {
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

    this.getarticleDataById = function (id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM article where article_id = $1', [id], function (err, result) {
                con.release();
                if (err) {                    
                    callback(err, null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    }    

    this.getPaidArticleList = function (user_id, role, callback) {
        connection.acquire(function (err, con) {
            console.log(role);
            con.query('SELECT *,article.article_id as art_id, article.created_at as article_date FROM article left join bookmark_article on article.article_id = bookmark_article.article_id and bookmark_article.user_id = $1 left join article_order on article.article_id = article_order.article_id and article_order.user_id = $2 where article.draft_status IS NULL and article.status = $3 and (role ILIKE $4 or role ILIKE $5) order by article.article_id desc', [user_id, user_id, 1, '%' + role + '%', '%4%'], function (err, result) {
            //con.query('SELECT *,article.article_id as art_id, article.created_at as article_date FROM article left join bookmark_article on article.article_id = bookmark_article.article_id and bookmark_article.user_id = $1 where article.draft_status IS NULL and article.status = $2 and (role ILIKE $3 or role ILIKE $4) order by article.article_id desc', [user_id, 1, '%' + role + '%', '%4%'], function (err, result) {
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

    this.getUnpaidArticleList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT *,article.created_at as article_date FROM article where article.draft_status IS NULL and article.status = $1 and (role ILIKE $2) order by article.article_id desc', [1,'%4%'], function (err, result) {
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


    this.getRelatedUnpaidArticleList = function (article_id, callback) {
        connection.acquire(function (err, con) {
            var sql = 'SELECT *,article.created_at as article_date FROM article where article.draft_status IS NULL and article.status = $1 and (role ILIKE $2) and article.article_id != $3 order by article.article_id desc limit 5';
            var values = [1, '%4%', article_id];
            con.query(sql, values, function (err, result) {
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

    this.getRelatedPaidArticleList = function (role, blog_id, callback) {
        connection.acquire(function (err, con) {
            var sql = 'SELECT *,article.created_at as article_date FROM article where article.draft_status IS NULL and article.status = $1 and (role ILIKE $2 or role ILIKE $3) and article.article_id != $4 order by article.article_id desc limit 5';
            var values = [1, '%' + role + '%', '%4%', blog_id];
            con.query(sql, values, function (err, result) {
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


    this.articleBookmark = function (user_id, article_id, callback) {
        connection.acquire(function (err, con) {
            var sql = 'SELECT * FROM bookmark_article where user_id=$1 and article_id = $2';
            var values = [user_id, article_id];
            var obj = {
                type: '',
                result: []
            }
            con.query(sql, values, function (err, result) { 
                if (result && result.rows && result.rows.length > 0){
                    const sql = 'DELETE FROM bookmark_article where user_id=$1 and article_id = $2'
                    con.query(sql, values, function (err, results) {
                        con.release()
                        if (err) {
                            if (env.DEBUG) {
                                console.log(err);
                            }
                            callback(err, null);
                        } else {
                            obj.type = 'remove';
                            obj.result = result.rows[0];
                            callback(null, obj);
                        }
                    });
                }else{
                    const sql = 'INSERT INTO bookmark_article(user_id,article_id) VALUES($1,$2) RETURNING *'
                    con.query(sql, values, function (err, result) {
                        con.release()
                        if (err) {
                            if (env.DEBUG) {
                                console.log(err);
                            }
                            callback(err, null);
                        } else {
                            obj.type = 'add';
                            obj.result = result.rows[0];
                            callback(null, obj);
                        }
                    });
                }
            });
        });
    };

    this.purchase_article = function (record, callback) {
        connection.acquire(function (err, con) {
            const sql = 'INSERT INTO article_order(user_id,order_id,article_id,created_at) VALUES($1,$2,$3,$4) RETURNING *'
            const values = [record.user_id, record.order_id, record.article_id, record.created_at]
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
    

    this.changeDraftArticleStatus = function (record, article_id, callback) {
        connection.acquire(function (err, con) {
            con.query("UPDATE article SET draft_status =$1 WHERE article_id = $2", [record.status, article_id], function (err, result) {
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
    

    this.draftarticleList = function (callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM article where draft_status = $1 order by article_id desc', [1], function (err, result) {
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

    this.getBookMarkArticle = function (user_id, role, callback) {
        connection.acquire(function (err, con) {
            console.log(role);
            //var sql = 'SELECT *,article.article_id as b_id, article.created_at as article_date FROM bookmark_article inner join article on article.article_id = bookmark_article.article_id where bookmark_article.user_id = $1 and article.status = $2 order by article.article_id desc';
            var sql = '(SELECT article.*,article.article_id as b_id, article.created_at as article_date,bookmark_article.bookmark_article_id as bookmark_article_id FROM bookmark_article inner join article on article.article_id = bookmark_article.article_id where bookmark_article.user_id = $2 and article.status = $3 UNION SELECT article.*,article.article_id as b_id, article.created_at as article_date,bookmark_article.bookmark_article_id as bookmark_article_id FROM article_order inner join article on article.article_id = article_order.article_id left join bookmark_article on article.article_id = bookmark_article.article_id and bookmark_article.user_id = $1 where article_order.user_id = $2 and article.status = $3)';
            con.query(sql, [user_id, user_id, 1], function (err, result) {
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

    this.getarticleDataByIdAfterLogin = function (id, user_id, callback) {
        connection.acquire(function (err, con) {
            con.query('SELECT *,article.article_id as b_id,article.created_at as article_date FROM article left join article_order on article.article_id = article_order.article_id and article_order.user_id = $1 where article.article_id = $2', [user_id, id], function (err, result) {
                con.release();
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result.rows);
                }
            });
        });
    }

    
    this.deleteArticle = function (article, callback) {
        connection.acquire(function (err, con) {
            article.map(data => {
                con.query('DELETE FROM article where article_id = $1', [data.article_id], function (err, results) {
                    con.query('DELETE FROM article_tag where article_id = $1', [data.article_id], function (err, results) {});
                    con.query('DELETE FROM bookmark_article where article_id = $1', [data.article_id], function (err, results) { });
                });
            });
            con.release()
            callback(null, article);
        });
    };

}
module.exports = new User();