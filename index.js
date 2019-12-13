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
})

inquirer
  .prompt([
    {
      type: 'list',
      message: 'WHAT WOULD YOU LIKE TO DO?',
      name: 'init_question',
      choices: [
        'ADD DEPARTMENT', 
        'ADD ROLE', 
        'ADD EMPLOYEE', 
        'VIEW DEPARTMENT', 
        'VIEW ROLE', 
        'VIEW EMPLOYEE', 
        'UPDATE EMPLOYEE ROLE'
      ]
    }
  ]).then(answer => {
    if (answer.init_question === 'ADD DEPARTMENT') {
      console.log('YOU HAVE BEEN SLAIN BY A GRU!' + '\n' + 'BUUUUUUT...');
      inquirer
        .prompt([
          {
            message: 'WHICH DEPARTMENT WOULD YOU LIKE TO ADD?',
            name: 'add_dept'
          }
        ]).then(x => {
          if(x.add_dept){
            console.log('HELL YEAH BROTHER');
            connection.query("INSERT INTO department(name) VALUES (?)", [x.add_dept]);
            connection.end();
          }
        });
    };
  })