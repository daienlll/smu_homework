USE employees_db;

SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Logistics");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Team Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Logistics Team Lead", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 250000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jane", "Doe", 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Eris", "Morn", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kate", "Miller", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rezyl", "Azzir", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Gary", "Garyson", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Kench", 4, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ikora", "Ray", 1, 2);