DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department (
    id INT AUTO_INCREMENT,
    d_name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    PRIMARY KEY (id)
)

INSERT INTO department (d_name) values ('Sales'),('Engineering'),('Finance'),('Legal');

INSERT INTO role (title, salary, department_id) values ('Sales Lead', 100000, 1);
INSERT INTO role (title, salary, department_id) values ('Sales Person', 80000, 1);
INSERT INTO role (title, salary, department_id) values ('Lead Engineer', 170000, 2);
INSERT INTO role (title, salary, department_id) values ('Software Engineer', 120000, 2);
INSERT INTO role (title, salary, department_id) values ('Accounting Lead', 170000, 3),
INSERT INTO role (title, salary, department_id) values ('Accountant', 125000, 3);
INSERT INTO role (title, salary, department_id) values ('Legal Team Lead', 200000, 4);
INSERT INTO role (title, salary, department_id) values ('Lawyer', 190000, 4);

INSERT INTO employee 
(first_name, last_name, role_id, manager_id)
VALUES 
('','', , ,),
('','', , ,),
('','', , ,),
('','', , ,),
('','', , ,),
('','', , ,)
--have to fill this row in