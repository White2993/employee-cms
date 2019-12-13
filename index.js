const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    database: 'db_employeetracker',
    password: 'Goldensphinx596!'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("CONNECTED AS ID: " + connection.threadId);
})