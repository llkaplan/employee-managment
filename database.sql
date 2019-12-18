
DROP DATABASE IF EXISTS employee_db;

-- Create the database day_planner_db and specified it for use.
CREATE DATABASE employee_db;

USE employee_db;

-- Create the table plans.
CREATE TABLE employee (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(100) NOT NULL,
  last_name varchar(100) NOT NULL,
  manager_id int,
  role_id int,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(100) NOT NULL,
  salary decimal,
  department_id int,
  PRIMARY KEY (id)
);

CREATE TABLE department (
  id int NOT NULL AUTO_INCREMENT,
  department_name varchar(100) NOT NULL,
  PRIMARY KEY (id)
);
