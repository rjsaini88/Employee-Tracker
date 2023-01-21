const db = require("./connection");
const { prompt } = require("inquirer");

//Async function that returns all the departments from the query.
async function viewAllDepartments() {
  try {
    const departments = await db.query("SELECT * FROM department");
    // console.log(departments)
    return departments;
  } catch (err) {
    console.log(err);
  }
}
async function addDepartment() {
  try {
   
    const { name } = await prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the new department?",
      },
    ]);
    // console.log(deptName)
    await db.query(`INSERT into department (name) VALUES ("${name}")`);
    const newDepartment = await viewAllDepartments();
    console.log(newDepartment);
    return newDepartment;
  } catch (err) {
    console.log(err);
  }
}

// async function removeDepartment(){
//   try {

// }
module.exports = { viewAllDepartments, addDepartment };
