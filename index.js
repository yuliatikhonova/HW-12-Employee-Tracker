const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table")


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
            "Add Department",
            "Add Role",
            "Remove employee",
            "Update employee role",
            "Update employee manager"
        ]

    }).then(function (userInput) {
        switch (userInput.choice) {
            case "View All Employees":
                viewEmployees();
                displayMenu();
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

                break;

            case "Add Department":

                break;

            case "Add Role":

                break;

            case "Remove employee":

                break;

            case "Update employee role":

                break;

            case "Update employee manager":

                break;
        };
    });
};



app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});

