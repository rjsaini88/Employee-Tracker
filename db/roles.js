const db = require('./connection');
const { prompt } = require("inquirer");
const {viewAllDepartments} = require('./departments');


async function viewAllRoles() {
try {
    const roles = 
    await db.query('SELECT * FROM role')
    return roles
} catch (err) {
    console.error(err)
}
}

async function addRole() {
    const departments =  await viewAllDepartments();
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
            message: "What is the department id for the role?",
            choices: departments.map(department => {
                return{
                    name: department.name,
                    value: department.id
                };
            })
          },
      ]);
      // console.log(deptName)
      await db.query(`INSERT into role (title, salary, department_id) VALUES ("${title}, ${salary}, ${department_id}")`);
      const newRole = await viewAllRoles();
      console.log(newRole);
      return newRole;
    } catch (err) {
      console.log(err);
    }
  }

//   async function removeRole(){
//     try {


//   }
// }





module.exports = {viewAllRoles, addRole, }