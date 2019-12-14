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
});

var notDone = true;
function startApp(cb) {
  if(notDone) {
    return cb();
  } else {
    connection.end();
  }
}



function questions() {
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
      inquirer
        .prompt([
          {
            message: 'WOULD YOU LIKE TO ADD OR VIEW DEPARTMENTS?',
            name: 'addorview'
          }
        ]).then(x => {
          if(x.addorview === 'ADD'){
            inquirer.prompt([
              {
                message: 'WHAT DEPARTMENT WOULD YOU LIKE TO ADD?',
                name: 'add_dept'
              }
            ]).then(x => {
              if(x.add_dept)
              connection.query("INSERT INTO department(name) VALUES (?)", [x.add_dept]);
              inquirer.prompt([
                {
                  type: 'confirm',
                  message: 'WOULD YOU LIKE TO DO ANYTHING ELSE?',
                  name: 'restart'
                }
              ]).then(answer => {
                notDone = answer.restart;
                startApp(questions);
              });
            });
          };
          });


    } else if (answer.init_question === 'ADD ROLE') {
      inquirer.prompt([
        {
          message: 'WHAT ROLE WOULD YOU LIKE TO ADD?',
          name: 'addrole'
        }
      ])
      .then(answer => {
        connection.query("INSERT INTO employee(role_id) VALUES (?)", [answer.addrole]);
        inquirer.prompt([
          {
            type: 'confirm',
            message: 'WOULD YOU LIKE TO DO ANYTHING ELSE?',
            name: 'restart'
          }
        ])
        .then(answer => {
          notDone = answer.restart;
          startApp(questions);
        });
      })
    }
    });
  
  
  
  
  
  
  
  };

startApp(questions);