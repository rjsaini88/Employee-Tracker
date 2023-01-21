const db = require('./connection');

async function viewAllEmployees() {
try {
    const employees = 
    await db.query('SELECT * FROM employee')
    return employees
} catch (err) {
    console.error(err)
}
}

module.exports = {viewAllEmployees}