const mysql = require('mysql2');
const inquirer = require('inquirer');

inquirer.prompt([
    {
        type: "list",
        message: "Please select one",
        name: "initial",
        choices: [
            "View employees by manager",
            "View employees",
            "View total utilized budget of a department",
            "Update employee manager",
            "Delete department",
            "Delete role",
            "Delete employee"
        ]
    }
]);