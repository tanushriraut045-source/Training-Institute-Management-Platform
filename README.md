# Training Institute Management Platform

A web-based Training Institute Management Platform designed to manage students, trainers, courses, enrollments, payments, and attendance through a centralized dashboard.

## Features

- Admin login and authentication
- Dashboard with institute statistics
- Student management
- Trainer management
- Course management
- Student enrollment management
- Payment management
- Attendance management
- Enrollment status tracking
- Responsive user interface
- MySQL database integration
- REST API based backend

## Technology Stack

### Frontend

- React.js
- Vite
- HTML5
- CSS3
- JavaScript

### Backend

- Node.js
- Express.js
- REST API

### Database

- MySQL

### Authentication

- JWT (JSON Web Token)

## Project Structure

```text
Training-Institute-Management-Platform/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
├── server.env
└── README.md

Prerequisites

Before running the project, make sure the following software is installed:

Node.js (LTS version recommended)
npm
MySQL Server
MySQL Workbench or another MySQL client
Git (optional)

Check Node.js and npm versions:

node -v
npm -v
Installation
1. Navigate to the project directory
cd Training-Institute-Management-Platform
2. Install backend dependencies
cd server
npm install
3. Install frontend dependencies
cd ../client
npm install
Environment Variables

The backend uses environment variables for database configuration and authentication.

Configure the environment file used by the server.

Example:

PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=training_institute

JWT_SECRET=your_secure_jwt_secret
Environment Variable Description
Variable	Description
PORT	Port number used by the backend server
DB_HOST	MySQL server host
DB_USER	MySQL username
DB_PASSWORD	MySQL password
DB_NAME	Database name
JWT_SECRET	Secret key used for JWT authentication

Important: Do not upload real passwords, JWT secrets, or other sensitive credentials to GitHub.

Database Setup
1. Start MySQL

Make sure the MySQL server is running.

2. Create the database

Open MySQL Workbench or MySQL command line:

CREATE DATABASE training_institute;
3. Select the database
USE training_institute;
4. Create the required tables

Run the SQL table creation queries provided with the project/database setup.

The database contains data related to:

Users
Students
Trainers
Courses
Enrollments
Payments
Attendance

Make sure the database name and credentials in the environment configuration match the MySQL setup.

Running the Application

The project contains two parts:

Backend server
Frontend client
Start Backend

Open a terminal:

cd server
npm start

Backend:

http://localhost:5000
Start Frontend

Open another terminal:

cd client
npm run dev

Frontend:

http://localhost:5173

Open the displayed frontend URL in a web browser.

Authentication

The application uses JWT-based authentication.

Users must log in using their registered email and password.

After successful login:

Authentication token is stored locally.
User information is maintained for the current session.
The dashboard becomes accessible.
Logout removes the stored authentication information.
Dashboard

The dashboard provides an overview of the institute, including:

Total Students
Total Trainers
Total Courses
Total Enrollments
Total Payments
Attendance Records
Enrollment Workflow

A student can be enrolled in a course through the Enrollment Management section.

The current workflow is:

Student
   ↓
Course Enrollment
   ↓
Active
   ↓
Course Completed
   ↓
Completed
   ↓
New Course Enrollment

A student can have one active course at a time in the current system.

Completed enrollment records are retained for historical reference.

Testing

The application can be tested manually using the following workflow:

Open the application.
Login using a registered user.
Verify dashboard statistics.
Add a student.
Verify the student record.
Add a trainer.
Verify the trainer record.
Add/manage courses.
Enroll a student in a course.
Verify enrollment status.
Add payment information.
Verify attendance records.
Refresh the application and confirm that saved data remains available.
Logout.
Verify that the user is returned to the login page.
Login again and verify dashboard access.
Deployment Instructions
Backend Deployment

The backend can be deployed to a Node.js-compatible hosting platform.

Before deployment:

Upload the backend source code.
Install dependencies:
npm install
Configure production environment variables.
Configure the production MySQL database.
Start the server:
npm start

Do not hard-code database passwords or JWT secrets in the source code.

Frontend Deployment

Build the React application:

cd client
npm run build

The production files will be generated in the dist directory.

The dist folder can be deployed to a static hosting platform.

Production Configuration

For production deployment:

Use a production MySQL database.
Update the frontend API URL to point to the deployed backend.
Configure CORS for the production frontend domain.
Use strong JWT secrets.
Keep environment variables private.
Enable HTTPS.
Do not commit .env or secret configuration files to GitHub.
API

The backend provides REST API endpoints for the main modules.

Example endpoint structure:

/api/auth
/api/students
/api/trainers
/api/courses
/api/enrollments
/api/payments
/api/attendance

Authentication endpoints:

POST /api/auth/register
POST /api/auth/login
Known Limitations
A student can have only one active course at a time.
Edit and Delete functionality is not currently available for student and trainer records.
Dashboard statistics are basic and do not include advanced analytics or charts.
Online payment gateway integration is not available.
Email and SMS notification functionality is not currently implemented.
Deployment configuration may require environment-specific setup.
Future Enhancements
Add Edit and Delete functionality for student and trainer records.
Support multiple active courses for a student if required.
Implement advanced role-based access control.
Add charts, analytics, and detailed dashboard reports.
Integrate online payment gateways.
Add email and SMS notifications and reminders.
Provide export options for attendance, payment, and student reports.
Add automated testing and CI/CD pipeline.
Implement database backup and recovery mechanisms.
Improve production-level security and cloud deployment.
Security Notes
Never commit passwords or secret keys to GitHub.
Use environment variables for sensitive configuration.
Use strong JWT secrets in production.
Use HTTPS when deploying the application.
Restrict database access in production environments.
License

This project is developed for educational and project demonstration purposes.
```
