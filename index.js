const { prompt } = require("inquirer");
const db = require("./db/connection");
const { viewAllDepartments} = require("./db/departments");

const start = async () => {
  console.log("Welcome to the Employee Manager!");
  const { choice } = await prompt([
    {
      type: "list",
      name: "choices",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role, add an employee",
        "And update an employee role",
        "Exit",
      ],
    },
  ]);
//   console.log(choice);
switch(choice) {
    case 'View all department':
        console.table(viewAllDepartments())

};
}
start();
