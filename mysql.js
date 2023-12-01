var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'kmkmartin0302',
  database : 'data'
});
 
connection.connect();
 
connection.query('SELECT * from data', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});
 
connection.end();