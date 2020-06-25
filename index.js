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
            "View All Departments",
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
                viewByManager();//Bonus not done
                break;

            case "Add Employee":
                addEmployee();
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

            case "View All Departments":
                viewAllDepartments();//might need work
                break;

            case "Add Department":
                addDepartment();//have to finish
                break;

            case "Remove Department":
                removeDepartment();//have to finish
                break;

            case "Quit":
                console.log("Goodbye!");
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

function viewByManager() {//BONUS.
    // let managerArr = [];//empty array for the list

    // inquirer.prompt([
    //     {
    //         name: "managerChoice",
    //         type: "list",
    //         message: "Which employee do you want to see direct reports for?",
    //         choices: managerArr
    //     }
    // ]).then(function (userInput) {
    //     let query = "";

    //     connection.query(query, [userInput.managerChoice], function (error, res) {
    //         if (error) throw error;
    //         console.table(res);
    //         displayMenu()
    //     });
    // });
    console.log("Coming Soon!");
    displayMenu()

};

function addEmployee() {
    let titleList = [];
    let employeeList = [];

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
        }
    ]).then(function (userInput) {

        connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title  FROM employee LEFT JOIN role ON employee.role_id = role.id;", function (error, res) {
            if (error) throw error;

            for (let i = 0; i < res.length; i++) {
                titleList.push(res[i].title);
                employeeList.push(res[i].first_name + ' ' + res[i].last_name);
            };

            inquirer.prompt([
                {
                    name: "title",
                    type: "list",
                    message: "What is the employee's role?",
                    choices: titleList
                }
                // {
                //     name: "manager",
                //     type: "list",
                //     message: "Who is the employee's manager?",
                //     choices: employeeList
                // }

            ]).then(function (roleChoice) {
                connection.query("SELECT * FROM role WHERE title = ? ", [roleChoice.title], function (err, answer) {
                    if (err) throw err;
                    //got from employee ( first and last name aka answer.manager) need to convert to manager_id
                    let roleId = answer[0].id;


                    let query ="INSERT INTO employee SET first_name = ?, last_name = ?, role_id = ?;";

                    connection.query(query,[userInput.employeeFirst, userInput.employeeLast, roleId], function (errer, results) {
                        if (errer) throw errer;
                        console.log('Added the employee to the data base');
                        displayMenu();
                    });
                });
            });
        });
    });
};

function removeEmployee() {//BONUS. create the list for the choices
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

function updateEmployeeRole() {//NEED. need to create the query
    //create the empty lists

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

        //

        connection.query(query, [userInput.update, userInput.department], function (error, res) {
            if (error) throw error;
            console.log("Updated the employee's role");
            displayMenu()

        });
    });
};

function updateEmployeeManager() {//BONUS. need to create the query
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

function addRole() {//NEED. need to creating the query
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

function viewAllDepartments() {
    let query = "SELECT * FROM department";

    connection.query(query, function (error, res) {
        if (error) throw error;
        console.table(res);
        displayMenu()
    });
};

function addDepartment() {//NEED. need to creating the query
    inquirer.prompt([
        {
            name: "newDepartment",
            type: "input",
            message: "What is the name of the new department?"
        }

    ]).then(function (userInput) {
        let query = "";

        connection.query(query, [userInput.newDepartment], function (error, res) {
            if (error) throw error;
            console.log("Added the new department to the data base");
            displayMenu()

        });
    });
};

function removeDepartment() {//BONUS. need to test the query
    inquirer.prompt([
        {
            name: "remove",
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
        let query = "DELETE FROM department WHERE department.d_name = ?";

        connection.query(query, [userInput.remove], function (error, res) {
            if (error) throw error;
            console.log("Removed the department from the data base");
            displayMenu()

        });
    });
};





// let query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?),(?),(?),(?);";

// ,
// connection.query("SELECT * FROM role WHERE title = ?", [roleChoice.title], function (err, results) {
//     if (err) throw err;