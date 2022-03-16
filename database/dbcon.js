var mysql = require('mysql');
// Sets up connection credentials
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_wilsoal9',
  password        : '0662',
  database        : 'cs340_wilsoal9',
});
module.exports.pool = pool;
