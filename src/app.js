import inquirer from 'inquirer';
import dotenv from 'dotenv';
import { getDepartments, getRoles, getEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole, deleteEmployee } from './queries.js';

dotenv.config();

const mainMenu = async () => {
    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add Department',
            'Add Role',
            'Add Employee',
            'Update Employee Role',
            'Delete Employee',
            'Exit',
        ],
    });

    switch (action) {
        case 'View All Departments':
            console.table(await getDepartments());
            break;
        case 'View All Roles':
            console.table(await getRoles());
            break;
        case 'View All Employees':
            console.table(await getEmployees());
            break;
        case 'Add Department':
            const { departmentName } = await inquirer.prompt({
                type: 'input',
                name: 'departmentName',
                message: 'Enter the name of the department:',
            });
            await addDepartment(departmentName);
            console.log('Department added!');
            break;
        case 'Add Role':
            const departments = await getDepartments();
            const departmentChoices = departments.map(department => ({
                name: department.name,
                value: department.id
            }));
            const { title, salary, departmentId } = await inquirer.prompt([
                { type: 'input', name: 'title', message: 'Enter the role title:' },
                { type: 'number', name: 'salary', message: 'Enter the role salary:' },
                { type: 'list', name: 'departmentId', message: 'Select the department:', choices: departmentChoices },
            ]);
            await addRole(title, salary, departmentId);
            console.log('Role added!');
            break;
        case 'Add Employee':
            const roles = await getRoles();
            const roleChoices = roles.map(role => ({
                name: role.title,
                value: role.id
            }));
            const employees = await getEmployees();
            const employeeChoices = employees.map(employee => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            }));
            const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
                { type: 'input', name: 'firstName', message: 'Enter the employee\'s first name:' },
                { type: 'input', name: 'lastName', message: 'Enter the employee\'s last name:' },
                { type: 'list', name: 'roleId', message: 'Select the role:', choices: roleChoices },
                { type: 'list', name: 'managerId', message: 'Select the manager (or leave blank):', choices: [{ name: 'None', value: null }, ...employeeChoices], default: null },
            ]);
            await addEmployee(firstName, lastName, roleId, managerId);
            console.log('Employee added!');
            break;
        case 'Update Employee Role':
            const { employeeId, newRoleId } = await inquirer.prompt([
                { type: 'number', name: 'employeeId', message: 'Enter the employee ID to update:' },
                { type: 'number', name: 'newRoleId', message: 'Enter the new role ID:' },
            ]);
            await updateEmployeeRole(employeeId, newRoleId);
            console.log('Employee role updated!');
            break;
        case 'Delete Employee':
            const { deleteEmployeeId } = await inquirer.prompt({
                type: 'number',
                name: 'deleteEmployeeId',
                message: 'Enter the employee ID to delete:',
            });
            await deleteEmployee(deleteEmployeeId);
            console.log('Employee deleted!');
            break;
        case 'Exit':
            console.log('Goodbye!');
            process.exit();
    }

    mainMenu();
};

mainMenu();
