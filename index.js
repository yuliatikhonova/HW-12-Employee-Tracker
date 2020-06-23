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
        type: "list",
        name: "choice",
        message: "What would you like to to?",
        choices: ["", "", "", ""]

    }).then(function (userInput) {
        switch (userInput.choice) {
            case "":
                searchByArtist()
                break
            case "":
                searchByOccurance()
                break
            case "":
                searchByRange()
                break
            case "":
                searchBySong()
                break
            case "":
                searchByAlbumAndSong()
                break
        };
    });
};