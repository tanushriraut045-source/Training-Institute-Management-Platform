USE training_institute;

-- Users
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@training.com', '$2b$10$SampleHashedPassword123', 'admin'),
('Institute Manager', 'manager@training.com', '$2b$10$SampleHashedPassword456', 'manager');

-- Trainers
INSERT INTO trainers (name, email, phone, specialization) VALUES
('Rahul Sharma', 'rahul@training.com', '9876543210', 'Java Development'),
('Priya Patil', 'priya@training.com', '9876543211', 'Web Development'),
('Amit Kulkarni', 'amit@training.com', '9876543212', 'Python & Data Science');

-- Students
INSERT INTO students (name, email, phone, address, date_of_birth) VALUES
('Tanushri Raut', 'tanushri@example.com', '9876543201', 'Pune, Maharashtra', '2006-02-17'),
('Aarav Joshi', 'aarav@example.com', '9876543202', 'Pune, Maharashtra', '2005-08-12'),
('Sneha Patil', 'sneha@example.com', '9876543203', 'Mumbai, Maharashtra', '2006-03-25'),
('Rohan Deshmukh', 'rohan@example.com', '9876543204', 'Nashik, Maharashtra', '2005-11-10'),
('Neha Kulkarni', 'neha@example.com', '9876543205', 'Kolhapur, Maharashtra', '2006-06-18');

-- Courses
INSERT INTO courses
(course_name, description, duration, fees, trainer_id)
VALUES
('Core Java', 'Java programming and object oriented programming', '3 Months', 15000.00, 1),
('Full Stack Web Development', 'Frontend and backend web development', '6 Months', 30000.00, 2),
('Python & Data Science', 'Python programming, data analysis and visualization', '4 Months', 22000.00, 3);

-- Enrollments
INSERT INTO enrollments
(student_id, course_id, enrollment_date, status)
VALUES
(1, 1, '2026-06-01', 'active'),
(2, 1, '2026-06-05', 'active'),
(3, 2, '2026-06-10', 'active'),
(4, 2, '2026-06-15', 'completed'),
(5, 3, '2026-06-20', 'active');

-- Attendance
INSERT INTO attendance
(student_id, course_id, attendance_date, status)
VALUES
(1, 1, '2026-08-01', 'present'),
(2, 1, '2026-08-01', 'absent'),
(3, 2, '2026-08-01', 'present'),
(4, 2, '2026-08-01', 'present'),
(5, 3, '2026-08-01', 'present'),
(1, 1, '2026-08-03', 'present'),
(2, 1, '2026-08-03', 'present'),
(3, 2, '2026-08-03', 'present');

-- Payments
INSERT INTO payments
(student_id, course_id, amount, payment_date, payment_method, status, transaction_id)
VALUES
(1, 1, 15000.00, '2026-06-01', 'online', 'paid', 'TXN10001'),
(2, 1, 10000.00, '2026-06-05', 'cash', 'paid', 'TXN10002'),
(3, 2, 15000.00, '2026-06-10', 'upi', 'paid', 'TXN10003'),
(4, 2, 30000.00, '2026-06-15', 'online', 'paid', 'TXN10004'),
(5, 3, 12000.00, '2026-06-20', 'upi', 'paid', 'TXN10005');
