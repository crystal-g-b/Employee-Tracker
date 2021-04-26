const express = require('express')
const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Gisselle12#',
  database: 'employee_trackerDB',
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected as ID ${connection.threadId}`);
    startApp();
});

function startApp() {
    inquirer
        .prompt([
            {
                name: "menu",
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
                    'Update Employee',
                ]
            },
        ])
        .then((answer) => {
            switch (answer.menu) {
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
                case 'Add Departments?':
                    addDept();
                    break;
                case 'Add Role?':
                    addRole();
                    break;
                case 'Add Employee?':
                    addEmployee();
                    break;
                case 'Update Employee':
                    updateRole();
                    break;  
            }
        });
};

const allDept = () => {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.log('All Departments');
        console.table(res);
        startApp();
    });
};


const allEmployees = () => {
    const query = "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id";
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);
        startApp();
    });
};

const employeeRole = () => {
    const query = " SELECT role.title, role.salary, AS Department FROM department INNER JOIN department on department.id = role.department_id";
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);
        startApp();
    });
};

const EmployeesByManager = () => {
    inquirer
        .prompt([
            {
                name: 'managerName',
                type: 'list',
                choices() {
                    const managerArray = [];
                    results.forEach(({last_name}) => {
                        managerArray.push(last_name);
                    });
                    return managerArray;
                },
                message: 'Please select manager name', 
            },
        ])
        .then((answer) => {
            let chosenManager = 
                `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name FROM employee LEFT JOIN role on role_id
                FROM employee LEFT JOIN role on role.id = employee.role_id
                LEFT JOIN department on department.id = r.department_id
                LEFT JOIN employee on employee.manager_id = employee.first_name and employee.last_name
                WHERE CONCAT (employee.first_name, ' ', employee.last_name = ?)
                ORDER BY emplpoyee.id`;
            connection.query(chosenManager, [answer.managerName], (err, res) => {
                if(err) throw err;
                console.table(res);
                startApp();
            }); 
        });
};

const addDept = () => {
    inquirer
        .prompt([
           {
                name: 'newDepartment',
                type: 'input',
               message: 'What is the name of the Department?',
           },
        ])
        .then((answer) => {
            connection.query(
                'INSERT INTO department SET ?',
                {
                    deparment_name: answer.newDepartment
                },
                (err) => {
                    if (err) throw err;
                    console.log('Your Department was successfully created!');
                    console.table(res);
                    startApp();
                }
            );
        });
};

const addRole = () => {
    const query = 'SELECT * FROM role; SELECT * FROM department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'newTitle',
                    type: 'input',
                    message: 'Please enter new Title:',  
                },
                {
                    name: 'newSalary',
                    type: 'input',
                    message: 'Please enter salary for new Title:',
                },
                {
                    name: 'addDepartment',
                    type: 'list',
                    choices: function() {
                        let choiceArray = results[1].map(choice => choice.department_name);
                        return choiceArray;
                    },
                    message: 'Please select a Department:'
                }

            ])
            .then((answer) => {
                connection.query(
                    'INSERT INTO role SET ?',
                    {
                        title: answer.newTitle,
                        salary: answer.newSalary,
                        department_id: answer.addDepartment        
                    },
                    (err) => {
                        if (err) throw err;
                        console.log('Your Role was successfully created!');
                        console.table(res);
                        startApp();
                    },
                );
            });
    });
    
};

startApp();

