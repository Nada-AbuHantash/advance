// const { DataTypes, Model} = require('@sequelize/core')
// const sequelize = require('../db/mysql')

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
class cv extends Model {}

cv.init({
    idjob:{
            type: DataTypes.INTEGER,
            field : 'idjob'
        },
        idcustmer: {
            type: DataTypes.STRING,
            field : 'idcustmer'
        },
        cv: {
            type: DataTypes.STRING,
            field : 'cv'
        },
        coverletter: {
            type: DataTypes.STRING,
            field : 'coverletter'
        },
        id:{
            type: DataTypes.INTEGER,
            field : 'id'
        }
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        modelName: 'cv',
        tableName: 'cvs',
        sequelize,
    })

module.exports = cv


