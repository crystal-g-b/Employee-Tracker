const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Gisselle12#',
  database: 'employee_trackerDB',
});

connection.connect((err) => {
    if (err) throw err;
    startApp();
});

const startApp = () => {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Welcome! What would you like to do?",
            choices: [
                'View all Departments',
                'View all Employees',
                'View all Employees By Manager',
                'View all Employees By Department',
                'View Employee Role',
                'Add Departments',
                'Add Role',
                'Add Employee',
                'Update Employee role',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View all Departments':
                    allDept();
                    break; 
                case 'View all Employees':
                    allEmployees();
                    break;
                case 'View all Employees By Manager':
                    EmployeesByManager();
                    break;
                case 'View all Employees By Department':
                    EmployeesByDept();
                    break;
                case 'View Employee Role':
                    employeeRole();
                    break;
                case 'Add Departments':
                    addDept();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee role':
                    updateRole();
                    break;  
            }
        });
};

const allDept = () => {
    inquirer
        .prompt({
            
        })
}

