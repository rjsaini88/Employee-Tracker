const db = require("./connection");
const { prompt } = require("inquirer");
const { viewAllDepartments } = require("./departments");
// const { up } = require("inquirer/lib/utils/readline");

async function viewAllRoles() {
  try {
    const roles = await db.query(`
        SELECT role.title, role.id, department.name 
        FROM role 
        LEFT JOIN department 
        ON role.department_id=department.id 
        ORDER by role.id`);
    return roles;
  } catch (err) {
    console.error(err);
  }
}

async function addRole() {
  try {
    const departments = await viewAllDepartments();
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
            name: department.name,
          };
        }),
      },
    ]);
    // console.log(deptName)
    await db.query(
      `INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${department_id}")`
    );
    const newRole = await viewAllRoles();
    console.log(newRole);
    return newRole;
  } catch (err) {
    console.log(err);
  }
}

async function removeRole() {
  try {
    const roles = await viewAllRoles();
    const { id } = await prompt([
      {
        type: "list",
        name: "id",
        message: "What is the title for the role you want to remove?",
        choices: roles.map((role) => {
          return {
            name: role.title,
            value: role.id,
          };
        }),
      },
    ]);
    await db.query(`DELETE FROM role WHERE id = ${id}`);
    const updatedRoles = await viewAllRoles();
    console.log(updatedRoles);
    return updatedRoles;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { viewAllRoles, addRole, removeRole };
