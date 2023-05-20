
const mysql = require("mysql");
const util = require("util");
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
const { log, count } = require("console");
const { request } = require("http");
const bcrypt = require('bcrypt');
// const { https } = require('https');
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

const pool = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'advance',
    dateStrings: true,
    // insecureAuth: false, 
    // ssl: {
    //   rejectUnauthorized: true, // Ignore certificate validation (for testing only)
    //   // other SSL/TLS options if needed
    // },
});

console.log("hii");
pool.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
  });
  
//////////marah
app.post('/www.linkedin.com/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }
  
    try {
       
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        let query1=`SELECT * FROM login where email='${email}' and name='${name}'`;
        pool.query(query1, [name,email], function(err,results) {
          if (err) {
            console.error('Error storing user in database:', err);
            return res.status(500).json({ error: 'An error occurred while creating the user' });
          }
          else if(results.length ===0){
        let query="INSERT INTO login (name,email,password)VALUES(?,?,?) ";
        pool.query(query, [name,email,hashedPassword], function(err) {
          if (err) {
            console.error('Error storing user in database:', err);
            return res.status(500).json({ error: 'An error occurred while creating the user' });
          }
          console.log( "User created successfully");
          return res.status(201).json({ message: 'User created successfully' });
        });
      }
      else {
        console.log( "The User already exists");
        return res.status(201).json({ message: 'The user already exists' });
      }
      });
      } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'An error occurred while creating the user' });
      }
    });
 

//////////
  app.listen(3000, function () {
    console.log('Express server is listening on port 3000');
});