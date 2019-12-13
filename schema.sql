DROP DATABASE IF EXISTS db_employeetracker;
CREATE DATABASE db_employeetracker;
USE db_employeetracker;

CREATE TABLE employee(
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100) NULL,
    last_name VARCHAR(100) NULL,
    role_id INT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee_role (
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NULL,
    salary DECIMAL NULL,
    department_id INT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100),
    PRIMARY KEY (id)
);