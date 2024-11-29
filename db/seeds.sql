-- Clear existing data
TRUNCATE TABLE employee RESTART IDENTITY CASCADE;
TRUNCATE TABLE role RESTART IDENTITY CASCADE;
TRUNCATE TABLE department RESTART IDENTITY CASCADE;

-- Insert sample data into department table
INSERT INTO department (name)
VALUES 
    ('Engineering'), 
    ('Sales'), 
    ('HR');

-- Insert sample data into role table
INSERT INTO role (title, salary, department_id)
VALUES
    ('Software Engineer', 100000, 1),
    ('Sales Associate', 60000, 2),
    ('HR Manager', 80000, 3),
    ('IT Specialist', 90000, 1),
    ('Finance Analyst', 70000, 3),
    ('Marketing Manager', 85000, 2);

-- Insert sample data into employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Betty', 'Avendano', 1, NULL),
    ('Juan', 'Calderon', 2, 1),
    ('Jose', 'Garcia', 3, 1),
    ('Maria', 'Gonzalez', 4, 1),
    ('Carlos', 'Hernandez', 5, 1),
    ('Luis', 'Lopez', 6, 1);
