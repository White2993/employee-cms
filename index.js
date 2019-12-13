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
      message: 'WHAT WOULD YOU LIKE TO DO?',
      name: 'init_question'
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