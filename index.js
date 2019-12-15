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
var role_list = [];

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
        'VIEW ALL DEPARTMENTS', 
        'ADD ROLE', 
        'VIEW ALL ROLES',
        'ADD EMPLOYEE',
        'VIEW ALL EMPLOYEES', 
        'UPDATE EMPLOYEE ROLE'
      ]
    }
  ]).then(answer => {
    if (answer.init_question === 'ADD DEPARTMENT') {
      inquirer
        .prompt([
          {
            message: 'WHAT DEPARTMENT WOULD YOU LIKE TO ADD?',
            name: 'add_dept'
          }
        ]).then(x => {
          if(x.add_dept){
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
            };
          });


    } else if (answer.init_question === 'VIEW ALL DEPARTMENTS') {
      connection.query(`SELECT * FROM department`, function(err, result) {
        if (err) throw err
        console.log(result)
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
    
    
    } else if (answer.init_question === 'ADD ROLE') {
      inquirer.prompt([
        {
          message: 'WHAT ROLE WOULD YOU LIKE TO ADD?',
          name: 'role'
        },
        {
          message: 'WHAT IS THE SALARY OF THIS POSITION?',
          name: 'salary'
        },
        {
          message: 'WHAT IS THE DEPARTMENT ID OF THIS ROLE?',
          name: 'department_id'
        }
      ]).then(answer => {
        connection.query(`INSERT INTO employee_role(title, salary, department_id) VALUES (???)`, [answer.role], [answer.salary], [answer.department_id])
        role_list.push(Object.assign({}, answer));
        console.log(role_list);
        if(answer) {
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
      }
      })
    
    
    } else if (answer.init_question === 'VIEW ALL ROLES') {
      connection.query(`SELECT * FROM employee_role`, function(err, result) {
        if (err) throw err
        console.log(result)
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
    
    
    } else if (answer.init_question === 'ADD EMPLOYEE') {
      inquirer.prompt([
        {
          message: 'PLEASE ENTER FIRST NAME',
          name: 'first_name'
        }, 
        {
          message: 'PLEASE ENTER LAST NAME',
          name: 'last_name'
        },
        {
          message: 'PLEASE ENTER ROLE ID',
          name: 'role_id'
        },
        {
          message: 'PLEASE ENTER MANAGER ID',
          name: 'manager_id'
        }
      ]).then(answer => {
          connection.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?)`, [answer.first_name], [answer.last_name], [answer.role_id], [answer.manager_id])
          console.log(answer)
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
        })
      } 
    })
  
  
  
  
};
startApp(questions);