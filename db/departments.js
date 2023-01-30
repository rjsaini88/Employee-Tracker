const db = require("./connection");
const { prompt } = require("inquirer");

//Async function that returns all the departments from the query.
// THEN I am presented with a formatted table showing department names and department ids
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

async function removeDepartment() {
  try {
    const departments = await viewAllDepartments();
    const { id } = await prompt([
      {
        type: "list",
        name: "id",
        message: "What is the name of the department you want to remove?",
        choices: departments.map((department) => {
          return {
            name: department.name,
            value: department.id,
          };
        }),
      },
    ]);
    await db.query(`DELETE FROM department WHERE id = ${id}`);
    const updatedDepartments = await viewAllDepartments();
    return updatedDepartments;
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  viewAllDepartments,
  addDepartment,
  removeDepartment,
};
