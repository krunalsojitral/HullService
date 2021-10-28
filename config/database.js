// establish Mysql Connection
//var mysql = require('mysql');

const { Pool } = require('pg')
var ip = require('ip');

function PostgresConnect() {
 // let DB_CREDENTIALS;
  this.pool = null;
  // Init postgres Connection Pool
  if (ip.address() == '172.31.18.120') {
      this.init = function () {
        this.pool = new Pool({
          user: 'postgres',
          host: 'localhost',
          database: 'hullservice',
          password: 'newpassword',
        // port: { port },
        })
      };

    }else{
    
      this.init = function () {
        this.pool = new Pool({
          user: 'postgres',
          host: 'localhost',
          database: 'hullservice',
          password: 'Letsdoit@3214',
          // port: { port },
        })
      };
    }

  // acquire connection and execute query on callbacks
  this.acquire = function (callback) {
    this.pool.connect(function (err, connection) { 
      callback(err, connection);
    });
  };
}

module.exports = new PostgresConnect();

