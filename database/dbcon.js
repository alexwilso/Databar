var mysql = require('mysql');
// Sets up connection credentials
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_ruarke',
  password        : '1188',
  database        : 'cs340_ruarke',
});
module.exports.pool = pool;
