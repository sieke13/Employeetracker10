import pkg from 'pg';
const { Pool } = pkg;

import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

export default pool;

export const getDepartments = async () => {
    const result = await pool.query('SELECT * FROM department');
    return result.rows;
};

export const getRoles = async () => {
    const query = `
        SELECT role.id, role.title, role.salary, department.name AS department
        FROM role
        JOIN department ON role.department_id = department.id;
    `;
    const result = await pool.query(query);
    return result.rows;
};

export const getEmployees = async () => {
    const query = `
        SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department, r.salary,
               m.first_name || ' ' || m.last_name AS manager
        FROM employee e
        LEFT JOIN role r ON e.role_id = r.id
        LEFT JOIN department d ON r.department_id = d.id
        LEFT JOIN employee m ON e.manager_id = m.id;
    `;
    const result = await pool.query(query);
    return result.rows;
};

export const addDepartment = async (name) => {
    await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
};

export const addRole = async (title, salary, departmentId) => {
    await pool.query(
        'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
        [title, salary, departmentId]
    );
};

export const addEmployee = async (firstName, lastName, roleId, managerId) => {
    await pool.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
        [firstName, lastName, roleId, managerId]
    );
};

export const updateEmployeeRole = async (employeeId, roleId) => {
    await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [roleId, employeeId]);
};

export const deleteEmployee = async (employeeId) => {
    await pool.query('DELETE FROM employee WHERE id = $1', [employeeId]);
};
