const db = require("./connection");

async function viewAllDepartments() {
  try {
    const departments = await db.promise().query("Select * from department").promise();

    return departments[0];
  } catch (err) {
    console.log(err);
  }
}


module.exports = {viewAllDepartments}