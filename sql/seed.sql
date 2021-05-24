USE Employees;

INSERT INTO `department` (name) VALUES ("Sales");
INSERT INTO `department` (name) VALUES ("Warehouse");
INSERT INTO `department` (name) VALUES ("Marketing");

INSERT INTO `role` (title, salary, department_id) 
VALUES ("Sales Staff", 95000, 1);
INSERT INTO `role` (title, salary, department_id) 
VALUES ("Sales Manager", 200000, 1);
INSERT INTO `role` (title, salary, department_id) 
VALUES ("Warehouse Staff", 50000, 2);
INSERT INTO `role` (title, salary, department_id) 
VALUES ("Commercial Driver", 75000, 2);
INSERT INTO `role` (title, salary, department_id) 
VALUES ("Creative Director", 140000, 3);
INSERT INTO `role` (title, salary, department_id) 
VALUES ("Digital Marketing Manager", 155000, 3);

INSERT INTO `employee` (first_name, last_name, role_id, manager_id)
VALUES ("George", "Washington", 1, 1);
INSERT INTO `employee` (first_name, last_name, role_id, manager_id)
VALUES ("John", "Adams", 2, 2);
INSERT INTO `employee` (first_name, last_name, role_id, manager_id)
VALUES ("Thomas", "Jefferson", 3, 3);
INSERT INTO `employee` (first_name, last_name, role_id, manager_id)
VALUES ("James", "Madison", 4, 4);
INSERT INTO `employee` (first_name, last_name, role_id, manager_id)
VALUES ("John", "Quincy", 5, 5);
INSERT INTO `employee` (first_name, last_name, role_id, manager_id)
VALUES ("Andrew", "Jackson", 6, 6);