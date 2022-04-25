const mysql = require('mysql');

const conn = mysql.createConnection({
      host : "localhost",
      user : "root",
      password : "",
      database : "college"
});

module.exports = conn;