var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'svc.sel5.cloudtype.app',
  user     : 'root',
  password : 'kmkmartin0302',
  database : 'data',
  port : 31576
});
 
connection.connect();
 
connection.query('SELECT * from data', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});
 
connection.end();