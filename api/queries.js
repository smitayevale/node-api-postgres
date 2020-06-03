const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api',
  password: 'root',
  port: 5432,
})

const getUsers = (request, response) => {
  pool.query('SELECT e.employee_id, e.name, e.salary, d.dept_name, d.location FROM employee e INNER JOIN department d on d.dept_no = e.dept_no ORDER BY e.employee_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT e.employee_id, e.name, e.salary, d.dept_name, d.location FROM employee e INNER JOIN department d on d.dept_no = e.dept_no WHERE e.employee_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
	getUsers,
	getUserById,
}