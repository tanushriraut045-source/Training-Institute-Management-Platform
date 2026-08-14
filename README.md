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

### Dashboard

The application provides a centralized interface for accessing major institute management modules and monitoring operational information.

---

## Application Workflow

```text
                    User Authentication
                           │
                           ▼
                       Dashboard
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
     Students           Trainers           Courses
        │                                     │
        └──────────────┐       ┌──────────────┘
                       ▼       ▼
                    Enrollments
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
        Attendance            Payments
