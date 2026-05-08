# Task Management System

Simple Fullstack Task Management Application built using MERN Stack.

## Features

### Authentication
- Register User
- Login User
- JWT Authentication
- Password Hashing using bcrypt
- Logout
- Protected Routes

### Task Management
- Create Task
- Read Task List
- Update Task
- Delete Task
- Filter Task by Status

### Task Attributes
- Title
- Description
- Status
- Deadline
- User Relation


# 🛠 Tech Stack

## Frontend
- React.js
- Axios
- CSS

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs


# Project Structure

```bash
task-manager-app/
│
├── backend/
│   ├── src/
│   ├── .env.example
│   ├── package.json
│
├── frontend/
│   ├── src/
│   ├── package.json
│
├── README.md
```

---

# Backend Setup

## Open backend folder

```bash
cd backend
```

---

## Install dependencies

```bash
npm install
```

---

## Create .env file

Create `.env` file inside backend folder.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key
```

---

## Run backend

```bash
npm run dev
```

Backend running at:

```bash
http://localhost:5000
```

---

# ⚙️ Frontend Setup

## 1️⃣ Open frontend folder

```bash
cd frontend
```

---

## 2️⃣ Install dependencies

```bash
npm install
```

---

## 3️⃣ Run frontend

```bash
npm run dev
```

Frontend running at:

```bash
http://localhost:5173
```

---

# API Endpoints

## Authentication

### Register

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```


## Tasks

### Get Tasks

```http
GET /api/tasks
```

### Filter Tasks

```http
GET /api/tasks?status=pending
```

### Create Task

```http
POST /api/tasks
```

### Update Task

```http
PUT /api/tasks/:id
```

### Delete Task

```http
DELETE /api/tasks/:id
```

---

# Screenshots

## Login Page

![Login Page](./screenshots/Login.png)

---

## Register Page

![Register Page](./screenshots/Register.png)

---

## Dashboard

![Dashboard](./screenshots/Dashboard.png)

---

# Author

Developed by Hafizh Syafiqh