const inquirer = require("inquirer");
const databaseFunctions = require('./helperFunctions/dataBaseFunctions');

const startApp = async () => {
  try {
    let exitFlag = false;

    while (!exitFlag) {
      const answer = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit'],
      });

      switch (answer.action) {
        case 'View all departments':
          await databaseFunctions.viewAllDepartments();
          break;

        case 'View all roles':
          await databaseFunctions.viewAllRoles();
          break;

        case 'View all employees':
          await databaseFunctions.viewAllEmployees();
          break;

        case 'Add a department':
          const departmentAnswer = await inquirer.prompt({
            type: 'input',
            name: 'departmentName',
            message: 'Enter the name of the department:',
          });
          await databaseFunctions.addDepartment(departmentAnswer.departmentName);
          break;

        case 'Add a role':
          const roleAnswer = await inquirer.prompt([
            {
              type: 'input',
              name: 'roleTitle',
              message: 'Enter the title of the role:',
            },
            {
              type: 'input',
              name: 'roleSalary',
              message: 'Enter the salary for the role:',
            },
            {
              type: 'input',
              name: 'roleDepartment',
              message: 'Enter the department ID for the role:',
            },
          ]);
          await databaseFunctions.addRole(roleAnswer.roleTitle, roleAnswer.roleSalary, roleAnswer.roleDepartment);
          break;

        case 'Add an employee':
          const employeeAnswer = await inquirer.prompt([
            {
              type: 'input',
              name: 'firstName',
              message: 'Enter the employees first name:',
            },
            {
              type: 'input',
              name: 'lastName',
              message: 'Enter the employees last name:',
            },
            {
              type: 'input',
              name: 'employeeRole',
              message: 'Enter the role ID for the employee:',
            },
            {
              type: 'input',
              name: 'employeeManager',
              message: 'Enter the manager ID for the employee (optional):',
            },
          ]);
          await databaseFunctions.addEmployee(employeeAnswer.firstName, employeeAnswer.lastName, employeeAnswer.employeeRole, employeeAnswer.employeeManager);
          break;

        case 'Update an employee role':
          const updateAnswer = await inquirer.prompt([
            {
              type: 'input',
              name: 'employeeId',
              message: 'Enter the ID of the employee to update:',
            },
            {
              type: 'input',
              name: 'newRoleId',
              message: 'Enter the new role ID for the employee:',
            },
          ]);
          await databaseFunctions.updateEmployeeRole(updateAnswer.employeeId, updateAnswer.newRoleId);
          break;

        case 'Exit':
          console.log('Exiting the application.');
          exitFlag = true;
          break;

        default:
          console.log('Invalid choice. Please try again.');
          await startApp();
          break;
      }
    }
  } catch (error) {
    console.error('Error in the application:', error);
  }
};

startApp(); 