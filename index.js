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
                displayMenu()
                break;

            case "View All Employees by Department":
                viewByDepartments();
                displayMenu();
                break;

            case "View All Employees by Manager":
                viewByManager();
                displayMenu();
                break;

            case "Add Employee":
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
                        type: "input",
                        message: "Please enter manager name",
                    }

                ]).then(function (userInput) {
                    addEmployee(userInput.employeeFirst, userInput.employeeLast, userInput.department, userInput.manager);
                    displayMenu();
                });
                break;

            case "Remove Employee":

                break;

            case "Update Employee Role":

                break;

            case "Update Employee Manager":

                break;

            case "View All Roles":

                break;

            case "Add Role":

                break;

            case "Remove Role":

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
    let data = connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.d_name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;",

    function (error, data) {
        if (error) throw error;
        console.table(data);
    });
};





