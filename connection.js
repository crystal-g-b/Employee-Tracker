const mysql = require('mysql');
const inquirer = require('inquirer');
const { restoreDefaultPrompts } = require('inquirer');

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
    const query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.log('All Departments');
        console.table(res);
        startApp();
    });
};

const allEmployees = () => {
    const query = 'SELECT * FROM employee';
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.log('All Employees');
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
}

startApp();

