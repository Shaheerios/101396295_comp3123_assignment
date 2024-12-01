# 101396295_COMP3123_ASSIGNMENT

## Description

This project is a **Full Stack Employee Management Application** built with **ReactJS (Frontend)** and **Node.js/Express.js (Backend)**, using **MongoDB** as the database. The application is containerized using **Docker** and supports full CRUD operations, user authentication, and search functionality.

---

## Table of Contents

1. [Features](#features)
2. [Setup Instructions](#setup-instructions)
3. [Running the Application](#running-the-application)
4. [Folder Structure](#folder-structure)
5. [API Endpoints](#api-endpoints)
6. [Screenshots](#screenshots)

---

## Features

- **User Authentication**:
  - Signup and Login with JWT-based authentication.
  - Logout functionality.
- **Employee Management**:
  - Add, view, update, and delete employees.
  - Search employees by position or department.
- **Modern UI**: Responsive and styled frontend using CSS.
- **Dockerized Deployment**: Easy setup and deployment using Docker.

---

## Setup Instructions

### Prerequisites

- Install **Docker** and **Docker Compose**.
- Ensure MongoDB credentials are configured in `.env`.

---

## 3. Running the Application

### Prerequisites

- Install **Docker** and **Docker Compose**.
- Ensure MongoDB credentials are configured in the `.env` file located in the `backend` folder.

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/<your-username>/101396295_comp3123_assignment.git
   cd 101396295_comp3123_assignment
   ```

2. **Configure `.env` File in Backend:**

   Navigate to the `backend` folder and add the following to the `.env` file:

   ```env
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   ```

3. **Build and Run Using Docker:**

   Build and run the containers with Docker Compose:

   ```bash
   docker-compose up --build
   ```

4. **Access the Application:**

   - **Frontend**: Navigate to `http://localhost:3000` in your browser.
   - **Backend API**: Access backend APIs via Postman or `http://localhost:5000`.

---

## 4. Folder Structure

```plaintext
101396295_comp3123_assignment/
├── docker-compose.yml  # Docker Compose configuration
├── backend/            # Backend Node.js/Express app
│   ├── config/         # MongoDB connection logic
│   ├── controllers/    # Handles API requests
│   ├── models/         # Mongoose schemas for User and Employee
│   ├── routes/         # API endpoints
│   ├── .env            # Backend environment variables
│   ├── Dockerfile      # Backend Docker configuration
│   ├── package.json    # Backend dependencies
├── frontend/           # React app for frontend
│   ├── public/         # Static assets
│   ├── src/            # React components and logic
│   ├── Dockerfile      # Frontend Docker configuration
│   ├── package.json    # Frontend dependencies
```

---

## 5. API Endpoints

### User Endpoints

1. **POST** `/api/v1/user/signup`:

   - **Description**: Register a new user.
   - **Request Body**:
     ```json
     {
       "username": "john_doe",
       "email": "john.doe@example.com",
       "password": "securepassword123"
     }
     ```

2. **POST** `/api/v1/user/login`:
   - **Description**: Login to obtain a JWT token.
   - **Request Body**:
     ```json
     {
       "email": "john.doe@example.com",
       "password": "securepassword123"
     }
     ```

---

### Employee Endpoints

1. **GET** `/api/v1/emp/employees`:

   - **Description**: Retrieve all employees.

2. **POST** `/api/v1/emp/employees`:

   - **Description**: Add a new employee.
   - **Request Body**:
     ```json
     {
       "first_name": "John",
       "last_name": "Doe",
       "email": "john.doe@example.com",
       "position": "Manager",
       "salary": 80000,
       "date_of_joining": "2024-01-01",
       "department": "IT"
     }
     ```

3. **GET** `/api/v1/emp/employees/:id`:

   - **Description**: Retrieve employee details by ID.

4. **PUT** `/api/v1/emp/employees/:id`:

   - **Description**: Update an employee's details.
   - **Request Body**:
     ```json
     {
       "position": "Senior Manager",
       "salary": 90000
     }
     ```

5. **DELETE** `/api/v1/emp/employees/:id`:

   - **Description**: Delete an employee by ID.

6. **GET** `/api/v1/emp/employees/search`:
   - **Description**: Search employees by department or position.
   - **Query Parameters**:
     - `department` (optional)
     - `position` (optional)

---

## 6. Screenshots

Screenshots can be found in the provided 101396295_comp3123_assignment Screenshots.docx
