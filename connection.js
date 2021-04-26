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
                    //'View all Employees By Manager',
                    //'View all Employees By Department',
                    'View Employee Role',
                    'Add Departments?',
                    'Add Role?',
                    'Add Employee?',
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
                /*case 'View all Employees By Manager':
                    EmployeesByManager();
                    break;
                case 'View all Employees By Department':
                    EmployeesByDept();
                    break;*/
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

/*.then((answer) => {
    let deptId = chooseDept().indexOf(answer.addDepartment) + 1
    connection.query(
        'INSERT INTO role SET ?',
        {
            title: answer.newTitle,
            salary: answer.newSalary,
            department_id: deptId,        
        },
        (err) => {
            if (err) throw err;
            console.log('Your Role was successfully created!');
            console.table(answer);
            startApp();
        },


let selectionArray = [];
function selectDept() {
    connection.query("SELECT department_name FROM department", function (err, res) {
        if (err) throw err
        for (let i = 0; i < res.length; i++) {
            selectionArray.push(res[i].department_name);
        }

    })
    return selectionArray;
}
function EmployeesByDept() {
    const query = 'SELECT employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on role.id = employee.role_id';
    connection.query(query, (err, res) => {
        inquirer
            .prompt([
                {
                    name: 'byDept',
                    type: 'list',
                    message: 'Please select a department',
                    choices: selectDept()
                }
            ])
            /*.then((answer) => {
                const query =
                    'SELECT employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on role.id = employee.role_id';
                    connection.query(query, (err, answer) => {
                        if(err) throw err;
                        console.table(answer);
                        startApp();
                    })
            })
    })
};*/

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
    const query = "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department_name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id";
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);
        startApp();
    });
};

const employeeRole = () => {
    const query = " SELECT role.title, role.salary, department.department_name FROM role LEFT JOIN department on department.id = role.department_id";
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);
        startApp();
    });
};

let roleArray = [];
function chooseRole() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err
        for (let i = 0; i < res.length; i++) {
            roleArray.push(res[i].title);
        }

    })
    return roleArray;
}

let managerArray = [];
function chooseManager() {
    connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function (err, res) {
        if (err) throw err
        for (let i = 0; i < res.length; i++) {
            managerArray.push(res[i].first_name);
        }

    })
    return managerArray;
};

function addEmployee () {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "Please enter Employees first name"
            },
            {
                name: "lastName",
                type: "input",
                message: "Please enter Employees last name"
            },
            {
                name: "role",
                type: "list",
                message: "Please pick Employees role",
                choices: chooseRole()
            },
            {
                name: "managerChoice",
                type: "list",
                message: "who is their manager?",
                choices: chooseManager() 
            },
        ])
        .then((answer) => {
            let roleId = chooseRole().indexOf(answer.role) + 1
            let managerId = chooseManager().indexOf(answer.managerChoice) + 1
            connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: roleId,
                    manager_id: managerId,
                },
                (err) => {
                    if (err) throw err;
                    console.table(answer);
                    startApp();
                }
            );

        });
            
};

function addDept() {
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
                    department_name: answer.newDepartment
                },
                (err) => {
                    if (err) throw err;
                    console.log('Your Department was successfully created!');
                    console.table(answer);
                    startApp();
                }
            );
        });
};

let deptArray = [];
function chooseDept() {
    connection.query("SELECT department_name FROM department", function (err, res) {
        if (err) throw err
        for (let i = 0; i < res.length; i++) {
            deptArray.push(res[i].department_name);
        }

    })
    return deptArray;
}

function addRole() {
    const query = 'SELECT role.title, role.salary, role.department_id AS Department FROM role';
    connection.query(query, (err, res) => {
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
                    message: 'Please select a Department:',
                    choices: chooseDept()   
                },

            ])
            .then((answer) => {
                let deptId = chooseDept().indexOf(answer.addDepartment) + 1
                connection.query(
                    'INSERT INTO role SET ?',
                    {
                        title: answer.newTitle,
                        salary: answer.newSalary,
                        department_id: deptId,        
                    },
                    (err) => {
                        if (err) throw err;
                        console.log('Your Role was successfully created!');
                        console.table(answer);
                        startApp();
                    },
                );
            });
    });
    
};

function updateRole() {
    const query = 'SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id';
    connection.query(query, function (err, res) {
        if (err) throw err
        console.log(res)
        inquirer.prompt([
            {
                name: "lastName",
                type: "list",
                choices: function () {
                    let lastName = [];
                    for (let i = 0; i < res.length; i++) {
                        lastName.push(res[i].last_name);
                    }
                    return lastName;
                },
                message: "What is the Employee's last name? ",
            },
            {
                name: "roleUpdate",
                type: "list",
                message: "What is the Employees new title? ",
                choices: chooseRole()
            },
        ]).then(function (answer) {
            let roleId = chooseRole().indexOf(answer.roleUpdate) + 1;

            connection.query(
                "UPDATE employee SET ?",
                    {
                        role_id: roleId

                    },
                    function (err) {
                        if (err) throw err
                        console.table(answer)
                        startApp()
                    }
            );

        });
    });

}


startApp();

