# Training Institute Management Platform

A full-stack web-based management system designed to digitize and streamline the day-to-day operations of a training institute.

The platform provides a centralized workflow for managing students, trainers, courses, enrollments, attendance, and payments. It replaces fragmented manual processes with a structured system that supports data management, validation, persistent storage, authentication, and operational tracking.

---

## Overview

Training institutes handle a large amount of operational data, including student records, trainer information, course details, enrollments, attendance, and payments.

Managing these activities manually can result in:

- Duplicate or inconsistent records
- Difficulty tracking student information
- Manual attendance management
- Payment tracking challenges
- Limited visibility into institute operations
- Increased administrative effort

The **Training Institute Management Platform** addresses these challenges through a centralized full-stack application with a React frontend, Node.js/Express backend, and MySQL database.

---

## Objectives

The primary objectives of the platform are to:

- Centralize training institute data management
- Digitize student and trainer records
- Manage courses and trainer assignments
- Manage student enrollments
- Track student attendance
- Record and manage payments
- Provide secure user authentication
- Maintain persistent relational data
- Provide RESTful APIs for application operations
- Provide a scalable foundation for future production enhancements

---

## Key Features

### Authentication & Authorization

- User registration and login
- JWT-based authentication
- Password hashing using bcrypt
- Role-based user information
- Protected backend operations

### Student Management

- Add student records
- View student information
- Update student details
- Delete student records
- Maintain contact and personal information

### Trainer Management

- Add trainers
- View trainer information
- Update trainer details
- Delete trainer records
- Maintain trainer specialization
- Assign trainers to courses

### Course Management

- Create and manage courses
- Update course information
- Delete courses
- Maintain course description and duration
- Manage course fees
- Assign trainers to courses

### Enrollment Management

- Enroll students into courses
- View enrollment records
- Update enrollment status
- Delete enrollments
- Track enrollment dates
- Maintain student-course relationships

### Attendance Management

- Record student attendance
- Track attendance by course and date
- Mark students as present or absent
- Update attendance records
- Delete attendance records

### Payment Management

- Record student payments
- Track payment amount
- Track payment date
- Maintain payment method
- Maintain payment status
- Store transaction references
- Update and delete payment records

##Technology Stack

| Layer             | Technology   |
| ----------------- | ------------ |
| Frontend          | React.js     |
| Build Tool        | Vite         |
| Backend           | Node.js      |
| API Framework     | Express.js   |
| Database          | MySQL        |
| Database Driver   | mysql2       |
| Authentication    | JWT          |
| Password Security | bcrypt       |
| API Architecture  | REST         |
| Styling           | CSS          |
| Version Control   | Git / GitHub |

##Prerequisites:
Make sure the following software is installed:
Node.js 18+
npm
MySQL 8+
Git
VS Code or another code editor

##Validation & Business Rules:
The backend validates core operations before modifying database records.
Examples include:

Required fields must be provided.
Student records must exist before creating related attendance, enrollment, or payment records.
Course records must exist before creating related enrollments, attendance, or payments.
Trainer references are validated before course assignment.
User email addresses must be unique.
Passwords are stored using secure hashing.
Foreign key constraints maintain relational integrity.
Invalid record IDs return appropriate API errors.

##Error Handling:
The application handles common operational errors including:

Invalid request data
Missing required fields
Invalid authentication credentials
Duplicate email registration
Non-existent student records
Non-existent trainer records
Non-existent course records
Invalid enrollment references
Invalid attendance references
Invalid payment references
Database operation failures

API responses use appropriate HTTP status codes and JSON response messages.

##Testing:
The application can be tested at three levels:
Frontend Testing
Login workflow
CRUD interfaces
Form validation
Navigation
User interaction
API Testing
Authentication endpoints
CRUD endpoints
Invalid request handling
Database operations
Foreign key validation
Database Testing
Table creation
Primary keys
Foreign keys
Data insertion
Data updates
Data deletion
Referential integrity

##Future Enhancements:
The platform can be extended with:
Online payment gateway integration
Automated email and SMS notifications
Student performance tracking
Certificate generation
PDF and Excel report generation
Advanced dashboard analytics
Trainer performance analytics
Student progress tracking
Cloud deployment
Cloud database integration
Document and file management
Automated attendance reports
Audit logging
Multi-institute support
Advanced role-based access control
Automated scheduled reports

##Repository
GitHub:
https://github.com/tanushriraut045-source/Training-Institute-Management-Platform
##License
This project is developed for educational, internship evaluation, and demonstration purposes.
