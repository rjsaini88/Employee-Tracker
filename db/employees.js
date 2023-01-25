const db = require("./connection");
const { prompt } = require("inquirer");
const { viewAllRoles } = require("./roles");

async function viewAllEmployees() {
  try {
    const employees = await db.query("SELECT * FROM employee");
    return employees;
  } catch (err) {
    console.error(err);
  }
}

async function addEmployee() {
  const roles = await viewAllRoles();
  const employees = await viewAllEmployees();
  try {
    const { firstName, lastName, role, manager } = await prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the first name of the employee?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the last name of the employee?",
      },
      {
        type: "list",
        name: "role",
        message: `What is role for this employee?`,
        choices: roles.map((role) => {
          return {
            value: role.id,
            name: role.title,
          };
        }),
      },
      {
        type: "list",
        name: "manager",
        message: "Who is the manager for this employee?",
        choices: [
          ...employees.map((employee) => {
            return {
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
            };
          }),

        //   {
        //       name: "No manager",
        //       value: null,
        //   },
        ],
      },
    ]);
    // console.log(deptName)
    await db.query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${role}", "${manager}")`
    );
    const newEmployee = await viewAllEmployees();
    // console.log(newEmployee);
    return newEmployee;
  } catch (err) {
    console.log(err);
  }
}

// async function removeEmployee() {
//   try {
//     const roles = await viewAllRoles();
//     const { id } = await prompt([
//       {
//         type: "list",
//         name: "id",
//         message: "What is the title for the role you want to remove?",
//         choices: roles.map((role) => {
//           return {
//             name: role.title,
//             value: role.id,
//           };
//         }),
//       },
//     ]);
//     await db.query(`DELETE FROM role WHERE id = ${id}`);
//     const updatedRoles = await viewAllRoles();
//     console.log(updatedRoles);
//     return updatedRoles;
//   } catch (err) {
//     console.log(err);
//   }
// }

module.exports = { viewAllEmployees, addEmployee };
