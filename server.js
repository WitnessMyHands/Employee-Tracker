const mysql = require('mysql');
const inquirer = require('inquirer');
require('console.table');

// const { question } = require('./question');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12345678',
    database: 'Employees'
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`Welcome to the Employee Manager`);
    startApp();
});

function startApp() {
    inquirer.prompt({
        type: 'list',
        name: 'user_selection',
        message: 'What would you like to do?',
        choices:
        [
            'View All Employees',
            'View All Employees by Department',
            'Add Employee',
            'Remove Employee',
            'Update Employee Role',
            'Add Role',
            'End',
        ],
    })
    .then(function ({ user_selection }) {
        switch (user_selection) {
            case 'View All Employees':
            viewEmployees();
            break;

            case 'View All Employees by Department':
            viewEmployeesByDepartment();
            break;

            case 'Add Employee':
            addEmployee();
            break;
            
            case 'Remove Employee':
            removeEmployee();
            break;

            case 'Update Employee Role':
            updateEmployeeRole();
            break;

            case 'Add Role':
            addRole();
            break;

            case 'End':
            connection.end();
            break;
        }
    });
}

function viewEmployees() {
    console.log('Viewing Employees.\n');

    let query =
    `SELECT e.id, e.first_name, e.last_name, r.title, r.department_id, r.salary, e.manager_id
    FROM employee e
    LEFT JOIN role r
	ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    LEFT JOIN employee m
	ON m.id = e.manager_id`

    connection.query(query, function (err,res) {
        if (err) throw err;

        console.table(res);
        console.table('Success!\n');

        startApp();
    });
};

function viewEmployeesByDepartment() {
    console.log('Viewing Employees by Department.\n');
    
    let query =
    `SELECT d.id, d.name, r.salary AS budget
    FROM employee e
    LEFT JOIN role r
    ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id`

    connection.query(query, function (err,res) {
        if (err) throw err;
        // Department Choice Array
        const departmentChoices = res.map(data => ({
            name: data.name,
            value: data.id
        }));

        console.table(res);
        console.table('Success!\n');

        promptDepartment(departmentChoices);
    });
};

    function promptDepartment(departmentChoices) {
        inquirer.prompt([
            {
                type: 'list',
                name: 'department_id',
                message: 'Select a Department:',
                choices: departmentChoices
            }
        ])
        .then(function (answer) {
            console.log('answer', answer.department_id);

            let query =
            `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department 
            FROM employee e
            JOIN role r
            ON e.role_id = r.id
            JOIN department d
            ON d.id = r.department_id
            WHERE d.id = ?`

            connection.query(query, answer.department_id, function (err, res) {
                if (err) throw err;

                console.table('response', res);
                console.log(res.affectedRows + 'Employees viewed.\n');

                startApp();
            });
        });
    };

function addEmployee() {
    console.log('Adding new Employee.\n')

    let query =
    `SELECT r.id, r.title, r.salary 
    FROM role r`

    connection.query(query, function (err,res) {
        if (err) throw err;

        const roleChoices = res.map(({ id, title, salary }) => ({
            value: id,
            title: `${title}`, 
            salary: `${salary}`
        }));

        console.table(res);
        console.log('Success!\n');

        promptRole(roleChoices);
    });
};

    function promptRole(roleChoices) {
        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'What is the Employees First Name?'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the Employees Last Name?'
            },
            {
                type: 'list',
                name: 'roleId',
                message: 'What is the Employees Role?',
                choicse: roleChoices
            },
        ])
        .then(function (answer) {
            console.log(answer);

            let query = `
            `

            connection.query(query,
            {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.roleId,
                manager_id: answer.managerId
            },
            function (err, res) {
                if (err) throw err;

                console.table(res);
                console.log(res.insertedRows + 'Inserted Information Successfully!\n');

                startApp();
            });
        });
    };

function removeEmployee() {
    console.log('Removing Employee.\n');

    let query =
    `SELECT e.id, e.first_name, e.last_name
    FROM employee e`

    connection.query(query, function (err, res) {
        if (err) throw err;

        const removeEmployeeChoice = res.map(({ id, first_name, last_name }) => ({
            value: id,
            name: `${id} ${first_name} ${last_name}`
        }));

        console.table(res);
        console.log('Success!\n');

        promptRemove(removeEmployeeChoice);
    });
};

    function promptRemove(removeEmployeeChoice) {
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee_id',
                message: 'Which Employee would you like to Remove?',
                choices: removeEmployeeChoice
            }
        ])
        .then(function (answer) {
            let query = `
            `

            connection.query(query, { id: answer.employee_id }, function (err, res) {
                if (err) throw err;

                console.table(res);
                console.log(res.affectedRows + 'Deleted.\n');

                startApp();
            });
        });
    }

function updateEmployeeRole() { 
    employeeArray();

};

function employeeArray() {
    console.log('Update an Employee.');

    let query =
    `SELECT e.id, e.first_name, e.last_name
    FROM employee e`

    connection.query(query, function (err,res) {
        if (err) throw err;

        const updatedEmployeeChoice = res.map(({ id, first_name, last_name }) => ({
            value: id,
            title: `${first_name}` `${last_name}`
        }));

        console.table(res);
        console.log('Success!\n')

        roleArray(updatedEmployeeChoice);
    });
}

function roleArray(updatedEmployeeChoice) {
    console.log('Updating ');

    let query =
    `SELECT e.id, e.first_name, e.last_name, r.title, r.department_id, r.salary, e.manager_id
    FROM employee e
    JOIN role r
    ON e.role_id = r.id
    JOIN department d
    ON d.id = r.department_id
    JOIN employee m
    ON m.id = e.manager_id`

    let roleChoices;

    connection.query(query, function (err, res) {
        if (err) throw err;

        roleChoices = res.map(({ id, title, salary }) => ({
            value: id,
            title: `${title}`,
            salary: `${salary}`
        }));

        console.table(res);
        console.log('Success!\n')

        promptEmployeeRole(updatedEmployeeChoice, roleChoices);
    });
}

    function promptEmployeeRole(updatedEmployeeChoice, roleChoices) {
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee_id',
                message: 'Select Employee to Set Role:',
                choices: updatedEmployeeChoice
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Which Role would you like to Update?',
                choices: roleChoices
            },
        ])
        .then(function (answer) {
            let query = `
            `

            connection.query(query,
            [
                answer.role_id,
                answer.employee_id
            ],
            function (err,res) {
                if (err) throw err;

                console.table(res);
                console.log(res.affectedRows + 'Update Success.');

                startApp();
            });
        });
    }

function addRole() {
    let query =
    `SELECT d.id, d.name, r.salary AS budget
    FROM employee e
    JOIN role r
    ON e.role_id = r.id
    JOIN department d
    ON d.id = r.department_id`

    connection.query(query, function (err,res) {
        if (err) throw err;

        const departmentChoices = res.map(({ id, name }) => ({
            value: id,
            name: `${name}`
        }));

        console.table(res);
        console.log('Department Array.');

        promptAddRole(departmentChoices);
    });
};

    function promptAddRole(departmentChoices) {
        inquirer.prompt([
            {
                type: 'input',
                name: 'role_title',
                message: 'Add Role Title?'
            },
            {
                type: 'input',
                name: 'role_salary',
                message: 'What is the Role Salary?'
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'Which Department?',
                choices: departmentChoices
            },
        ])
        .then(function (answer) {
            let query = `
            `

            connection.query(query, {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.department_id
            },
            function (err, res) {
                if (err) throw err;

                console.table(res);
                console.log('Success!\n');

                startApp();
            });
        });
    }