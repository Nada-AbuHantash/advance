
const mysql = require("mysql");
const util = require("util");
var express = require('express');
var session = require('express-session');
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
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

console.log("hii");
pool.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
  });
  
////////////////////////////////////////////////
app.get('/www.linkedin.com', async (req, res) => {
   
  return res.status(400).json({ message: 'Welcome to the LinkedIn application' });
    
          });


app.post('/www.linkedin.com/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(200).json({ error: 'Name, email, and password are required' });
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
                      req.session.useremail =email ;
                       req.session.pass=password;
                       return res.status(200).json({ message: 'Login successful' });
            });
      } catch (error) {
        console.error('Error in database:', error);
        return res.status(500).json({ error: 'An error occurred while retrieving user data' });
      }
    });

    app.get('/www.linkedin.com/logout', (req, res) => {
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
        }
        res.send('Logged out successfully.');
      });
    });
    
    


    app.put('/www.linkedin.com/profile', async (req, res) => {
      const { name, password,email } = req.body;
      const emailuser = req.session.useremail;
      if (!email ) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
      try{
        pool.query('SELECT * FROM login WHERE email = ?', emailuser, async (err, results) => {
          if (err) {
           console.error('Error in database:', err);
           return res.status(500).json({ error: 'An error occurred while retrieving user data' });
                   }
                   if (results.length === 0) {
                    return res.status(404).json({ error: 'User not found' });
                                             }
                                             const id=results[0].id;
                                             const saltRounds = 10;
                                             const salt = await bcrypt.genSalt(saltRounds);
                                             const hashedPassword = await bcrypt.hash(password, salt);
                                             let query='UPDATE login SET name=? , password=? , email=? WHERE id=? ';
                                             pool.query(query, [name,hashedPassword,email,id], function(err) {
                                                   if (err) {
                                                       console.error('Error storing user in database:', err);
                                                       return res.status(500).json({ error: 'An error occurred while Update profile' });
                                                            }
                                                            req.session.useremail =email ;
                                                             req.session.id=id;
                                             console.log( "Update profile successfully");
                                             return res.status(201).json({ message: 'Update profile successfully' });
                              });                       


});


      }catch (error) {
        console.error('Error in database:', error);
        return res.status(500).json({ error: 'An error occurred while retrieving user data' });
      } 
    
                  
        
              });



  ////////////////////////////////////////////add job --marah
  
  app.post('/www.linkedin.com/addjob', async (req, res) => {
    const { title, description, requirements,salary,location,companyname,emailcompany } = req.body;
    if (!title || !description || !requirements ||!salary || !location || !companyname ||!emailcompany) {
      return res.status(200).json({ error: 'More information needed to added this job !' });
                              }
                              let query="INSERT INTO jobs (title, description, requirements,salary,location,companyname,emailcompany)VALUES (?, ?,?,?,?,?,?) ";
                              pool.query(query, [title, description, requirements,salary,location,companyname,emailcompany], function(err) {
                                    if (err) {
                                        console.error('Error storing user in database:', err);
                                        return res.status(500).json({ error: 'An error occurred while creating the user' });
                                             }
                              console.log( "User created successfully");
                              return res.status(201).json({ message: 'User created successfully' });
               });
                              
    });
    /////=====add cv (rahaf)==============
  app.post('/www.linkedin.com/addCv', async (req, res) => {
    const { idjob, idcustmer, cv,coverletterm} = req.body;
    if (!idjob || !idcustmer || !cv ||!coverletterm )
     {
      return res.status(200).json({ error: 'erorr to add cv??!' });
                              }
     let query="INSERT INTO submission (idjob, idcustmer,  cv,coverletterm)VALUES (?, ?,?,?) ";
       pool.query(query, [idjob, idcustmer,  cv,coverletterm], function(err) {
                                    if (err) {
        console.error('Error add cv in database:', err);
             return res.status(500).json({ error: 'An error occurred while add cv' });
                                             }
                              console.log( "ADD CV successfully");
                              return res.status(201).json({ message: 'ADD successfully' });
               });
                              
    });
    ///=== see thw cv and updat it rah
    app.put('/www.linkedin.com/showcv', async (req, res) => {
      const {idjob, idcustmer, cv,coverletterm,id } = req.body;
      const idc = req.session.iidcustmer;
      if (!idcustmer ) {
        return res.status(400).json({ error: 'id are required' });
      }
      try{
        pool.query('SELECT * FROM submission WHERE id = ?', idc, async (err, results) => {
          if (err) {
           console.error('Error in database:', err);
           return res.status(500).json({ error: 'An error occurred while retrieving cv ' });
                   }
                   if (results.length === 0) {
                    return res.status(404).json({ error: 'error not found ' });
                                             }
                                             const id=results[0].id;
                                             const saltRounds = 10;
                                             const salt = await bcrypt.genSalt(saltRounds);
                                             let query='UPDATE submission SET cv=? , coverletterm=?  WHERE id=? ';
                                             pool.query(query, [cv,coverletterm,id], function(err) {
                                                   if (err) {
                                                       console.error('Error storing user in database:', err);
                                                       return res.status(500).json({ error: 'An error occurred while Update cv' });
                                                            }
                                                            req.session.iidcustmer =idcustmer ;
                                                             req.session.id=id;
                                             console.log( "Update cv successfully");
                                             return res.status(201).json({ message: 'Update cv successfully' });
                              });                       


});


      }catch (error) {
        console.error('Error in database:', error);
        return res.status(500).json({ error: 'An error occurred while retrieving user data' });
      } 
    
                  
        
              });


 

/////////////////////////////////////////////////////
  app.listen(3000, function () {
    console.log('Express server is listening on port 3000');
});