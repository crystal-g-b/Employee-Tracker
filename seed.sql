/**USE employee_trackerDB

INSERT INTO department (id, department_name) values (1, 'Human Resources');
INSERT INTO department (id, department_name) values (2, 'Accounting');
INSERT INTO department (id, department_name) values (3, 'Marketing');
INSERT INTO department (id, department_name) values (4, 'Wholesale Design');
INSERT INTO department (id, department_name) values (5, 'Production Team');

INSERT INTO role (id, title, salary, department_id) values (1,'HR Director', 90000, 1);
INSERT INTO role (title, salary, department_id) values (2, 'Assistant Director', 70000, 1);
INSERT INTO role (title, salary, department_id) values (3, 'Controller', 120000, 2);
INSERT INTO role (title, salary, department_id) values (4, 'Accountant', 95000, 2);
INSERT INTO role (title, salary, department_id) values (5, 'Marketing Director', 100000, 3);
INSERT INTO role (title, salary, department_id) values (6, 'Marketing Assistant', 75000, 3);
INSERT INTO role (title, salary, department_id) values (7, 'Creative Director', 130000, 4);
INSERT INTO role (title, salary, department_id) values (8, 'Production Manager', 95000, 5);
INSERT INTO role (title, salary, department_id) values (9, 'SVP', 150000, 4);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id) values (1, 'Shana', 'Wayne', 2, 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) values (2, 'Matthew', 'Carp', 4, 3);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) values (3, 'Kayla', 'Mathis', 6, 5);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) values (4, 'Mary', 'Goliath', 7, 9);*/