const { prompt } = require("inquirer");
const db = require("./db/connection");
const {
  viewAllDepartments,
  addDepartment,
  removeDepartment,
} = require("./db/departments");
const {
  viewAllEmployees,
  addEmployee,
  updateEmployeeRole,
  removeEmployee
} = require("./db/employees");
const { viewAllRoles, addRole, removeRole } = require("./db/roles");

const start = async () => {
  console.log("Welcome to the Employee Manager!");
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Remove department",
        "Remove a role",
        "Remove an employee",
        "Exit",
      ],
    },
  ]);
  //   console.log(choice);
  switch (choice) {
    case "View all departments":
      const departments = await viewAllDepartments();
      console.table(departments);
      console.log(departments);
      break;

    case "View all roles":
      const roles = await viewAllRoles();
      console.table(roles);
      // console.log(roles);
      break;

    case "View all employees":
      const employees = await viewAllEmployees();
      console.table(employees);
      // console.log(employees);
      break;

    case "Add a department":
      const newDepartment = await addDepartment();
      console.table(newDepartment);
      break;

    case "Add a role":
      const newRole = await addRole();
      console.table(newRole);
      break;

    case "Add an employee":
      const newEmployee = await addEmployee();
      console.table(newEmployee);
      break;

    case "Remove department":
      const updatedDepartments = await removeDepartment();
      console.table(updatedDepartments);
      break;

    case "Remove a role":
      const updatedRole = await removeRole();
      console.table(updatedRole);
      break;

    case "Update an employee role":
      const updatedEmployeeRole = await updateEmployeeRole();
      console.table(updatedEmployeeRole);
      break;

    case "Remove an employee":
      const removedEmployee = await removeEmployee();
      console.table(removedEmployee);
      break;
  }
};
start();
