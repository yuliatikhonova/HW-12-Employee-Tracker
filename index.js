const mysql = require("mysql");
const inquirer = require("inquirer");


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_tracker"
});

connection.connect(function (err) {
    if (err) throw err;

    console.log("connection id", connection.threadId);
    displayMenu()
});

function displayMenu() {
    inquirer.prompt({
        name: "choice",
        type: "list",
        message: "What would you like to to?",
        choices: [
            "View All Employees",
            "View All Employees by Department",
            "View All Employees by Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "View All Roles",
            "Add Role",
            "Remove Role",
            "View All Department",
            "Add Department",
            "Remove Department",
            "Quit"
        ]

    }).then(function (userInput) {
        switch (userInput.choice) {
            case "View All Employees":
                viewEmployees();
                break;

            case "View All Employees by Department":
                viewByDepartments();
                break;

            case "View All Employees by Manager":
                viewByManager();//have to finish
                break;

            case "Add Employee":
                addEmployee();//have to finish
                break;

            case "Remove Employee":
                removeEmployee();
                break;

            case "Update Employee Role":
                updateEmployeeRole();//have to finish
                break;

            case "Update Employee Manager":
                updateEmployeeManager();//have to finish
                break;

            case "View All Roles":
                viewAllRoles();
                break;

            case "Add Role":
                addRole();//have to finish
                break;

            case "Remove Role":
                removeRole();
                break;

            case "View All Department":
                break;
            case "Add Department":
                break;
            case "Remove Department":
                break;
        };
    });
};

function viewEmployees() {
    let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.d_name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;";

    connection.query(query, function (error, res) {
        if (error) throw error;
        console.table(res);
        displayMenu()
    });
};

function viewByDepartments() {
    inquirer.prompt([
        {
            name: "departmentChoice",
            type: "list",
            message: "Which department would you like to see employees for?",
            choices: [
                "Sales",
                "Engineering",
                "Finance",
                "Legal"
            ]
        }
    ]).then(function (userInput) {
        let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id WHERE department.d_name = ?;";

        connection.query(query, [userInput.departmentChoice], function (error, res) {
            if (error) throw error;
            console.table(res);
            displayMenu()
        });
    });
};

function viewByManager() {//need to create the query
    inquirer.prompt([
        {
            name: "managerChoice",
            type: "list",
            message: "Which employee do you want to see direct reports for?",
            choices: [
                "Haniya Farley",
                "Nazifa Begum",
                "Aran Akhtar",
                "Antonia Grey",
                "Hanan Pearson",
                "Sommer Stokes",
                "Olivia Cochran",
                "Isobella Munoz"
            ]
        }
    ]).then(function (userInput) {
        let query = "";

        connection.query(query, [userInput.managerChoice], function (error, res) {
            if (error) throw error;
            console.table(res);
            displayMenu()
        });
    });
};

function addEmployee() {//need to finish creating the query
    inquirer.prompt([
        {
            name: "employeeFirst",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "employeeLast",
            type: "input",
            message: "What is the employee's last name?"
        },
        {
            name: "department",
            type: "list",
            message: "What is the employee's role?",
            choices: [
                "Sales Lead",
                "Sales Person",
                "Lead Engineer",
                "Software Engineer",
                "Accounting Lead",
                "Accountant",
                "Legal Team Lead",
                "Lawyer"
            ]
        },
        {
            name: "manager",
            type: "list",
            message: "Who is the employee's manager?",
            choices: [
                "None",
                "Haniya Farley",
                "Nazifa Begum",
                "Aran Akhtar",
                "Antonia Grey",
                "Hanan Pearson",
                "Sommer Stokes",
                "Olivia Cochran",
                "Isobella Munoz"
            ]
        }

    ]).then(function (userInput) {
        let query = "INSERT INTO employee SET first_name = ?, last_name = ?";

        connection.query(query, [userInput.employeeFirst, userInput.employeeLast, userInput.department, userInput.manager], function (error, res) {
            if (error) throw error;
            console.log("Added the employee to the data base");
            displayMenu()

        });
    });
};

function removeEmployee() {
    inquirer.prompt([
        {
            name: "remove",
            type: "list",
            message: "Which employee do you want to remove?",
            choices: [
                "Haniya Farley",
                "Nazifa Begum",
                "Aran Akhtar",
                "Antonia Grey",
                "Hanan Pearson",
                "Sommer Stokes",
                "Olivia Cochran",
                "Isobella Munoz"
            ]
        }

    ]).then(function (userInput) {
        let query = "DELETE FROM employee WHERE CONCAT(employee.first_name, ' ', employee.last_name) = ?";

        connection.query(query, [userInput.remove], function (error, res) {
            if (error) throw error;
            console.log("Removed the employee from the data base");
            displayMenu()

        });
    });
};

function updateEmployeeRole() {//need to create the query
    inquirer.prompt([
        {
            name: "update",
            type: "list",
            message: "Which employee's role do you want to update?",
            choices: [
                "Haniya Farley",
                "Nazifa Begum",
                "Aran Akhtar",
                "Antonia Grey",
                "Hanan Pearson",
                "Sommer Stokes",
                "Olivia Cochran",
                "Isobella Munoz"
            ]
        },
        {
            name: "department",
            type: "list",
            message: "Which role do you want to assign the selected employee?",
            choices: [
                "Sales Lead",
                "Sales Person",
                "Lead Engineer",
                "Software Engineer",
                "Accounting Lead",
                "Accountant",
                "Legal Team Lead",
                "Lawyer"
            ]
        }

    ]).then(function (userInput) {
        let query = "";

        connection.query(query, [userInput.update, userInput.department], function (error, res) {
            if (error) throw error;
            console.log("Updated the employee's role");
            displayMenu()

        });
    });
};

function updateEmployeeManager() {//need to create the query
    inquirer.prompt([
        {
            name: "update",
            type: "list",
            message: "Which employee's manager do you want to update?",
            choices: [
                "Haniya Farley",
                "Nazifa Begum",
                "Aran Akhtar",
                "Antonia Grey",
                "Hanan Pearson",
                "Sommer Stokes",
                "Olivia Cochran",
                "Isobella Munoz"
            ]
        },
        {
            name: "manager",
            type: "list",
            message: "Which employee do you want to set as manager for the selected employee?",
            choices: [
                "Haniya Farley",
                "Nazifa Begum",
                "Aran Akhtar",
                "Antonia Grey",
                "Hanan Pearson",
                "Sommer Stokes",
                "Olivia Cochran",
                "Isobella Munoz"
            ]
        }

    ]).then(function (userInput) {
        let query = "";

        connection.query(query, [userInput.update, userInput.manager], function (error, res) {
            if (error) throw error;
            console.log("Updated the employee's manager");
            displayMenu()

        });
    });
};

function viewAllRoles() {
    let query = "SELECT role.id, role.title, department.d_name as department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;";

    connection.query(query, function (error, res) {
        if (error) throw error;
        console.table(res);
        displayMenu()
    });
};

function addRole() {//need to creating the query
    inquirer.prompt([
        {
            name: "newRole",
            type: "input",
            message: "What is the name of the role?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary of the role?"
        },
        {
            name: "department",
            type: "list",
            message: "Which department does the role belong to?",
            choices: [
                "Sales",
                "Engineering",
                "Finance",
                "Legal"
            ]
        }

    ]).then(function (userInput) {
        let query = "";

        connection.query(query, [userInput.newRole, userInput.salary, userInput.department], function (error, res) {
            if (error) throw error;
            console.log("Added the new role to the data base");
            displayMenu()

        });
    });
};

function removeRole() {
    inquirer.prompt([
        {
            name: "remove",
            type: "list",
            message: "Which role would you like to remove?",
            choices: [
                "Sales Lead",
                "Sales Person",
                "Lead Engineer",
                "Software Engineer",
                "Accounting Lead",
                "Accountant",
                "Legal Team Lead",
                "Lawyer"
            ]
        }

    ]).then(function (userInput) {
        let query = "DELETE FROM role WHERE role.title = ?";

        connection.query(query, [userInput.remove], function (error, res) {
            if (error) throw error;
            console.log("Removed the role from the data base");
            displayMenu()

        });
    });
};