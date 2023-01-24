const db = require("./connection");
const { prompt } = require("inquirer");
const { viewAllDepartments } = require("./departments");
const { up } = require("inquirer/lib/utils/readline");

async function viewAllRoles() {
  try {
    const roles = await db.query("SELECT * FROM role");
    return roles;
  } catch (err) {
    console.error(err);
  }
}

async function addRole() {
  const departments = await viewAllDepartments();
  try {
    const { title, salary, department_id } = await prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of the new role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for the role?",
      },
      {
        type: "list",
        name: "department_id",
        message: "What is the department for this role?",
        choices: departments.map((department) => {
          return {
              value: department.id,
            name: department.name
          };
        }),
      },
    ]);
    // console.log(deptName)
    await db.query(
      `INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${department_id}")`)
    const newRole = await viewAllRoles();
    console.log(newRole);
    return newRole;
  } catch (err) {
    console.log(err);
  }
}

async function removeRole() {
  try {const roles = await viewAllRoles();
    const { title } = await prompt([
      {
        type: "list",
        name: "title",
        message: "What is the title for the role you want to remove?",
        choices: roles.map((role) => {
          return {
            name: role.title,
          };
        }),
      },
    ]);
    await db.query(`DELETER FROM role WHERE title = ${title}`);
    const updatedRoles = await viewAllRoles();
    console.log(updatedRoles);
    return updatedRoles;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { viewAllRoles, addRole, removeRole };
