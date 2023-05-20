
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



const app = express()
const PORT = process.env.PORT
const router = express.Router()




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
 
    app.post('/www.linkedin.com/login', async (req, res) => {
      const { email, password } = req.body;
    
     
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
    
      try {
        pool.query('SELECT * FROM login WHERE email = ?', email, async (err, results) => {
          if (err) {
            console.error('Error in database:', err);
            return res.status(500).json({ error: 'An error occurred while retrieving user data' });
          }
    
          if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
          }
          const pass = results[0].password;
          const isPasswordMatch = await bcrypt.compare(password, pass);
          if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
          }
          //console.log.(results);
          return res.status(200).send(results);
        });
      } catch (error) {
        console.error('Error in database:', error);
        return res.status(500).json({ error: 'An error occurred while retrieving user data' });
      }
    });
    
//////////
  app.listen(3000, function () {
    console.log('Express server is listening on port 3000');
});


//add new job
//idjob	idcustmer	cv	coverletter	id	

app.post('/www.linkedin.com/addcv', async (req, res) => {
  const { idjob, idcustmer, cv,coverletterm,id } = req.body;
  if (!idjob || !idcustmer || !cv  || !coverletterm || !id) {
    return res.status(400).json({ error: 'are required' });
  }

  try {
     
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(id, salt);
      let query1=`SELECT * FROM submission where id='${id}' and idcustmer='${idcustmer}'`;
      pool.query(query1, [idcustmer,id], function(err,results) {
        if (err) {
          console.error('Error storing user in database:', err);
          return res.status(500).json({ error: 'An error occurred while add cv' });
        }
        else if(results.length ===0){
      let query="INSERT INTO submission (idjob,idcustmer,cv,coverletterm,id)VALUES(?,?,? ,?,?,?) ";
      pool.query(query, [idcustmer,id,hashedPassword], function(err) {
        if (err) {
          console.error('Error storing user in database:', err);
          return res.status(500).json({ error: 'An error occurred while creating the user' });
        }
        console.log( "User add successfully");
        return res.status(201).json({ message: 'User add successfully' });
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