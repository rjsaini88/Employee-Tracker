const db = require("./connection");

async function viewAllDepartments() {
  try {
    const departments = await db.query("Select * from department").promise();

    return departments;
  } catch (err) {
    console.log(err);
  }
}


module.exports = {viewAllDepartments}