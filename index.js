const mysql = require('mysql2');
const inquirer = require('inquirer');
// const cTable = require('console.table');
const figlet = require('figlet')

const myDataBase = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'casino_db'
    },
    console.log(`Successfully connected to the casino_db database.`)
);
// initial function
const init = () => {
    inquirer
        .prompt(
            {
                type: "list",
                message: "Please select one",
                name: "initial",
                choices: [
                    "Add department",
                    "Delete department",
                    "View department",
                    "Add role",
                    "Delete role",
                    "View all role",
                    "View all employees",
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
                case 'Delete department':
                    removeDepartment();
                    break;
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'Add role':
                    addRole();
                    break;
                case 'View all role':
                    viewAllRole();
                    break;
                case 'Delete role':
                    removeRole();
                    break;
                case 'EXIT':
                    console.log('Exiting Casino Tracker System.');
                    figlet('Farewell', (err, result) => {
                        if (err) {
                            console.log(err)
                        }
                        console.log(result);
                    })
                    myDataBase.end();
                    break;

            }

        })
}
// start of all function
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
        })
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
        })
};
const addRole = () => {
    myDataBase.query(`SELECT * FROM department`, (err, result) => {
        if (err) throw err;
        result = result.map((department) => {
            return {
                name: department.name,
                value: department.id,
            };
        });
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'role',
                    message: 'What is the role?',
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary?',
                    validate: function (input) {
                        validation = isNaN(input);
                        if (validation) {
                            console.log(`
                        -----ERROR-----
                        Please enter a valid number.`)
                            return false;
                        } else {
                            return true;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'departmentRole',
                    message: 'Which department does the role belong to?',
                    choices: result
                }
            ])
            .then((answer) => {
                myDataBase.query(`INSERT INTO role SET ?`,
                    {
                        title: answer.role,
                        salary: answer.salary,
                        department_id: answer.departmentRole,
                    },
                    (err) => {
                        if (err) throw err;
                    }
                );
                console.log(`Added ${answer.role} to the database!`)
                viewAllRole();
            })
    });
};
const viewAllRole = () => {
    myDataBase.query(`SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id;`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        init();
    });
};
const removeRole = () => {
    inquirer
        .prompt(
            {
                type: 'input',
                name: 'role_id',
                message: 'ID of the role you wish to delete'
            })
        .then((answer) => {
            myDataBase.query(`DELETE FROM role WHERE id = ${answer.role_id};`, (err, result) => {
                if (err) throw err;
                console.log(`Deleted role with the ID ${answer.role_id} from the database!`)
                viewAllRole();
            })
        })
};
// end of function data

// initial call function
init();