const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
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
                    "View department",
                    "Add department",
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
                case 'View department':
                    viewDepartments();
                    break;
                case 'Add department':
                    addDepartment();
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
                    removeDepartment();
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
const viewDepartments = () => {
    myDataBase.query(`SELECT department.id AS id, department.name AS department FROM department`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        init();
    });
};
const viewAllEmployees = () => {
    myDataBase.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        init();
    });
};
const addDepartment = () => {
    inquirer
        .prompt(
            {
                type: 'input',
                name: 'newdepartment',
                message: 'Name of department'
            })
        .then((answer) => {
            myDataBase.query(`INSERT INTO department(name) VALUES (?);`, answer.newdepartment, (err, result) => {
                if (err) throw err;
                console.log(`Added ${answer.newdepartment} to the database!`)
                viewDepartments();
            })
        }
        )
};
const removeDepartment = () => {
    inquirer
        .prompt(
            {
                type: 'input',
                name: 'department_id',
                message: 'Department ID'
            })
        .then((answer) => {
            myDataBase.query(`DELETE FROM department WHERE id = ${answer.department_id};`, (err, result) => {
                if (err) throw err;
                console.log(`Deleted department with the ID ${answer.department_id} from the database!`)
                viewDepartments();
            })
        }
        )
};

init();