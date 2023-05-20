
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

const users = require('./models/user')
const jobs = require('./models/job')
const cvs = require('./models/cv')

const app = express()
const PORT = process.env.PORT
const router = express.Router()


app.use(cors())
app.use(express.json())

app.use(users)
app.use(jobs)
app.use(cvs)

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
  
//////////
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
///////////////////

//sign up
router.post("/sign/user",async (req,res)=>{
  const user = new users(req.body)
  try {
      await user.save()
      res.status(201).send({user})

  } catch (e) {
      res.status(400).send(e)
  }
});
//login
router.post("/login/user",async (req,res)=>{
  var _userName = req.body.name;
  var _password = req.body.password;
  try {
     const l1 = await users.findByPk(_userName);
     if(l1.password==_password)
      res.send("logged in successfully");
     else res.send("wrong username or password");
  } catch (e) {
      res.status(400).send(e)
  }
});

//add new job
router.post("/newjob",async (req,res)=>{
  const job = new jobs (req.body)
  try {
      await job.save()
      res.status(201).send({job})

  } catch (e) {
      res.status(400).send(e)
  }
});
//delete job
router.delete("/deletejob/:idjob",async (req,res)=>{
  const _jobid = req.params.idjob
  const count = await jobs.destroy({ where: { idjob: _jobid } });
  res.send(`deleted row(s): ${count}`);
});

// update one job
router.put('/updatejob/:idjob', async (req, res) => {
  const _jobid = req.params.idjob

  const Description = req.body.Description


  const [updatedRows] = await jobs.update(
      {
          Description: Description,
      },
      {
          where: { idjob: _jobid },
      }
  );

  if (updatedRows) {
      res.send(`Updated rows: ${updatedRows}`);
  } else {
      res.send("job not found");
  }
})
/////////
//change password
router.put('/changePassword/:id', async (req, res) => {
  const userid = req.params.id
  const newpass = req.body.new
  const oldpass = req.body.old


  const [updatedRows] = await users.update(
      {
          Password: newpass
      },
      {
          where: { id: userid , Password:oldpass },
      }
  );

  if (updatedRows) {
      res.send(`password changed`);
  } else {
      res.send("wrong password");
  }
})
//add cv
router.post("/addcv",async (req,res)=>{
  const cv = new cvs(req.body)
  try {
      await cv.save()
      res.status(201).send({cv})

  } catch (e) {
      res.status(400).send(e)
  }
});
//delete job
router.delete("/deletecv/:id",async (req,res)=>{
  const _id = req.params.id
  const count = await cvs.destroy({ where: { id: _jd } });
  res.send(`deleted row(s): ${count}`);
});

// update one job
router.put('/updatecv/:id', async (req, res) => {
  const _id = req.params.id

  const Description = req.body.Description


  const [updatedRows] = await cvs.update(
      {
          Description: Description,
      },
      {
          where: { id: _id },
      }
  );

  if (updatedRows) {
      res.send(`Updated rows: ${updatedRows}`);
  } else {
      res.send("job not found");
  }
})