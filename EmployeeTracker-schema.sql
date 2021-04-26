DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(60) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(60) NOT NULL,
    salary DECIMAL(10,4) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES deparment (id) ON
    DELETE CASCADE
);

CREATE TABLE employee(
	id INT NOT NULL AUTO_INCREMENT,
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30) NOT NULL,
	role_id INT NOT NULL,
	manager_id INTEGER,
	PRIMARY KEY(id),
	FOREIGN KEY(role_id) REFERENCES role (id) ON 
    DELETE CASCADE,
	FOREIGN KEY (manager_id) REFERENCES employee (id) ON 
    DELETE CASCADE
);

--EMPLOYEE TRACKER SEEDS

INSERT INTO department (department_name) values ('Human Resources');
INSERT INTO department (department_name) values ('Accounting');
INSERT INTO department (department_name) values ('Marketing');
INSERT INTO department (department_name) values ('Wholesale Design');
INSERT INTO department (department_name) values ('Production Team');

INSERT INTO role (title, salary, department_id) values ('HR Director', 90000, 1);
INSERT INTO role (title, salary, department_id) values ('Assistant Director', 70000, 1);
INSERT INTO role (title, salary, department_id) values ('Controller', 120000, 2);
INSERT INTO role (title, salary, department_id) values ('Accountant', 95000, 2);
INSERT INTO role (title, salary, department_id) values ('Marketing Director', 100000, 3);
INSERT INTO role (title, salary, department_id) values ('Marketing Assistant', 75000, 3);
INSERT INTO role (title, salary, department_id) values ('Creative Director', 130000, 4);
INSERT INTO role (title, salary, department_id) values ('Production Manager', 95000, 5);
INSERT INTO role (title, salary, department_id) values ('SVP', 150000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Shana', 'Wayne', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Matthew', 'Carp', 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Kayla', 'Mathis', 5, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Mary', 'Goliath', 9, null);

SELECT * FROM department_id;
SELECT * FROM role;
SELECT * FROM employee
