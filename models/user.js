
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

const users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },name: {
        type: Sequelize.STRING,
        field: 'name',
        allowNull: false
    },email: {
        type: Sequelize.STRING,
        field: 'email',
        allowNull: false
    }, password: {
        type: Sequelize.STRING,
        field: 'password',
        allowNull: false
    },id:{
        type: Sequelize.STRING,
        field: 'id',
        allowNull: false
    },
}, { freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,}
)

module.exports = users