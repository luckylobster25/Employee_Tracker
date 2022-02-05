const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require ('console.table');
const { restoreDefaultPrompts } = require('inquirer');

const myDataBase = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'casino_db'
    },
    console.log(`Successfully connected to the casino_db database.`)
);

const init = () => {
    inquirer
        .prompt(
            {
                type: "list",
                message: "Please select one",
                name: "initial",
                choices: [
                    "View employees by manager",
                    "View all employees",
                    "View total utilized budget of a department",
                    "Update employee manager",
                    "Delete department",
                    "Delete role",
                    "Delete employee",
                    "EXIT"
                ]
            })
        .then((answer) => {
            switch (answer.initial) {
                case 'View employees by manager':
                    viewEmployees();
                    break;
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'View total utilized budget of a department':
                    addEmployees();
                    break;
                case 'Update employee manager':
                    updateRole();
                    break;
                case 'Delete department':
                    viewRoles();
                    break;
                case 'Delete role':
                    addRoles();
                    break;
                case 'Delete employee':
                    viewDepartments();
                    break;
                case 'Exit':
                    myDataBase.end();
                    console.log('GOODBYE!')
                    break;
            }

        })
}

const viewAllEmployees = () => {
    myDataBase.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id`, (err, result) => {
      if (err) {
        console.log(err);
      }  
        console.table(result);
        init();
    });
};

init();