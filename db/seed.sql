DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department (
    id INT AUTO_INCREMENT,
    d_name VARCHAR(30),
    PRIMARY KEY (id)
);

INSERT INTO department (d_name) values ('Sales'),('Engineering'),('Finance'),('Legal');


CREATE TABLE role (
    id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO role (title, salary, department_id) values ('Sales Lead', 100000, 1);
INSERT INTO role (title, salary, department_id) values ('Sales Person', 80000, 1);
INSERT INTO role (title, salary, department_id) values ('Lead Engineer', 200000, 2);
INSERT INTO role (title, salary, department_id) values ('Software Engineer', 150000, 2);
INSERT INTO role (title, salary, department_id) values ('Accounting Lead', 170000, 3);
INSERT INTO role (title, salary, department_id) values ('Accountant', 125000, 3);
INSERT INTO role (title, salary, department_id) values ('Legal Team Lead', 150000, 4);
INSERT INTO role (title, salary, department_id) values ('Lawyer', 125000, 4);


CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)
);

INSERT INTO employee 
(first_name, last_name, role_id, manager_id)
VALUES 
('Haniya','Farley',1, NULL),
('Nazifa','Begum',2, 1),
('Aran','Akhtar',3, NULL),
('Antonia','Grey',4, 3),
('Hanan','Pearson',5, NULL),
('Sommer','Stokes',6, 5),
('Olivia','Cochran',7, NULL),
('Isobella','Munoz',8, 7)
