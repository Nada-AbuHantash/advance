
const mysql = require("mysql");
const util = require("util");
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
const { log, count } = require("console");
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
var TABLE = 'customer';
const pool = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'advance',
    dateStrings: true

});

console.log("hii");
pool.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
  });
//////////

//////////
  app.listen(3000, function () {
    console.log('Express server is listening on port 3000');
});