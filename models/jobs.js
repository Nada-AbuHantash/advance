
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
class job extends Model {}
//idjob	title	description	requirements	salary	location	companyname	emailcompany
job.init({
    idjob:{
            type: DataTypes.INTEGER,
            field : 'idjob'
        },
        title: {
            type: DataTypes.STRING,
            field : 'title'
        },
        description: {
            type: DataTypes.STRING,
            field : 'description'
        },
        requirements: {
            type: DataTypes.STRING,
            field : 'requirements'
        },
        salary:{
            type: DataTypes.INTEGER,
            field : 'salary'
        },
        location:{
            type: DataTypes.INTEGER,
            field : 'location'
        },
        companyname:{
            type: DataTypes.INTEGER,
            field : 'companyname'
        },
        emailcompany:{
            type: DataTypes.INTEGER,
            field : 'emailcompany'
        }
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        modelName: 'job',
        tableName: 'jobs',
        sequelize,
    })

module.exports = job


