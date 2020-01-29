const inquirer = require('inquirer');
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Slimy42?",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
});




const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'allOptions',
        choices: ["add employee", "edit employee", "add a department", "view all employees", "view employees in specific department"],
    },
    {
        type: 'list',
        message: 'Which department would you like to review?',
        name: 'viewingDepartment',
        choices: ["Other", "Marketing", "Administration"],
    }
];


const addEmployeeQuestions = [
    {
        type: 'name',
        name: 'employeeName',
        message: "What is their name?",
        default: 'Write here please',
    },
    {
        type: 'list',
        message: 'Which Position are they?',
        name: 'positionName',
        choices: ["administrator", "marketer", "manager"],
    },
    {
        type: 'name',
        name: 'managerName',
        message: "What is their manager's name?",
        default: 'Write here please',
    }

];


const departmentQuestions = [
    {
        type: 'name',
        name: 'departmentName',
        message: "What is the new department's name?",
        default: 'Write here please',
    },
    {
        type: 'name',
        name: 'moreEmployees',
        message: "Would you like to add employees?",
        default: 'Write here please',
    },

];


function addEmployeeFunction() {
    inquirer
        .prompt([
            addEmployeeQuestions[0],
            addEmployeeQuestions[1],
            addEmployeeQuestions[2],
        ])
        .then(answers => {
            connection.query("INSERT into employee (employeeName, role_id, manager_id) VALUES (?, ?, ?)", [answer.employeeName, answer.employeePosition, answer.managerName], function (err, res) {
                if (err) throw err;
                // Log all results of the SELECT statement
                console.log(answers.employeeName + " got added!");
                connection.end();
            });


        }
        )
}

function addDepartmentFunction() {
    inquirer
        .prompt([
            departmentQuestions[0],
            departmentQuestions[1],
        ])
        .then(answers => {
            console.log(answers)
        }
        )
}

function specificDepartmentFunction() {
    inquirer
        .prompt([
            questions[1],
            departmentQuestions[2],
        ])
        .then(answers => {
            // need to get information from database
            console.log(answers);
        }
        )
}


const editEmployeePositionQuestion = [
    {
        type: 'list',
        message: 'What is their new position?',
        name: 'positionName',
        choices: ["administrator", "marketer", "manager"],
    },
];

const newNameQuestions = [
    {
        type: 'name',
        name: 'firstName',
        message: "What's their firstname?",
        default: 'Write here please',
    },
    {
        type: 'name',
        name: 'lastName',
        message: "What's their lastname?",
        default: 'Write here please',
    },
    {
        type: 'list',
        message: 'Which Position are they?',
        name: 'positionName',
        choices: ["administrator", "marketer", "manager"],
    }
];


function editEmployee() {
    inquirer
        .prompt([
            {
                type: 'name',
                name: 'idNumber',
                message: "Which employee would you like to change (type ID number)?",
                default: 'Write here please',
            },
            {
                type: 'list',
                name: 'updateItem',
                message: "What would you like to update?",
                choices: ["name", "position"],
            }
        ])
        .then(answers => {

            let idNum = answers.idNumber;
            var sqlDB = `UPDATE employee SET role_ID id=${idNum}`;

            if (answer.updateItem === "position") {
                connection.query(sqlDB, function (err, result) {
                    if (err) throw err;
                    console.log(result);
                });

            }
            var sql = mysql.format(sqlDB, [id])
        
        }
        )
}



inquirer
    .prompt([
        questions[0]
    ])
    .then(answer => {
        switch (answer) {
            case "add employee":
                addEmployeeFunction();
                break;
            case "edit employee":
                //need to use mySQL npm for this part to pull and edit information based on employee input
                connection.query("SELECT * FROM employee", function (err, result) {
                    if (err) throw err;
                    console.log(result);
                });
                break;
            case "add a department":
                addDepartmentFunction();
                break;
            case "view all employees":
                // need to add in values from database to console.table
                //  console.table([john, jane, emily], ["firstName"]);
                break;
            case "view employees in specific department":
                specificDepartmentFunction();
                break;
            default:
                text = "How did you get this error from a multiple choice question?";
        }
    }
    )
