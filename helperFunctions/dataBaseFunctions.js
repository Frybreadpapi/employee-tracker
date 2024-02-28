const mysql = require('mysql');
const queryAsync = require('../config/connection')

const viewAllDepartments = async () => {
  try {
    const query = 'SELECT id, name FROM departments';
    const res = await queryAsync(query);
    console.table(res);
  } catch (err) {
    console.error(err);
  }
};

const viewAllRoles = async () => {
  try {
    const query = 'SELECT id, title, salary, department_id FROM roles';
    const res = await queryAsync(query);
    console.table(res);
  } catch (err) {
    console.error(err);
  }
};

const viewAllEmployees = async () => {
  try {
    const query = 'SELECT id, first_name, last_name, role_id, manager_id FROM employees';
    const res = await queryAsync(query);
    console.table(res);
  } catch (err) {
    console.error(err);
  }
};

const addDepartment = async (departmentName) => {
  try {
    const query = 'INSERT INTO departments (name) VALUES (?)';
    const res = await queryAsync(query, [departmentName]);
    console.log('Department added to the database');
  } catch (err) {
    console.error(err);
  }
};

const addRole = async (title, salary, departmentId) => {
  try {
    const query = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
    const res = await queryAsync(query, [title, salary, departmentId]);
    console.log('Role added to the database');
  } catch (err) {
    console.error(err);
  }
};

const addEmployee = async (firstName, lastName, roleId, managerId) => {
  try {
    const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    const res = await queryAsync(query, [firstName, lastName, roleId, managerId]);
    console.log('Employee added to the database');
  } catch (err) {
    console.error(err);
  }
};

const updateEmployeeRole = async (employeeId, newRoleId) => {
  try {
    const query = 'UPDATE employees SET role_id = ? WHERE id = ?';
    const res = await queryAsync(query, [newRoleId, employeeId]);
    console.log('Employee role updated in the database');
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};