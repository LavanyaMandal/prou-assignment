# HR Management System – Employee & Task Management Dashboard

This project is submitted for **Prou Assignment – Track 1, Track 2 & Track 3**:

- **Track 1 – Frontend (Mock Data)**
- **Track 2 – Backend (API + MongoDB Database)**
- **Track 3 – Fullstack (React + API + Database)**

> **Common Problem Statement:**  
> Build an **Employee + Task Management System (HR Dashboard)** that supports employee CRUD, task allocation, cloud database storage, search functionality, and a modern web UI.  
> The same domain is implemented in **three different ways** as per the assignment requirements.

---

## 🚀 Features Overview

| Track      | Technologies Used                      | What Was Built                                         |
|------------|-----------------------------------------|--------------------------------------------------------|
| **Track 1** | HTML, CSS, JavaScript                  | Frontend with mock JSON data (no DB)                  |
| **Track 2** | Node.js, Express.js, MongoDB Atlas     | REST API with real database CRUD                      |
| **Track 3** | React + Express + MongoDB              | Fully functional fullstack dashboard                  |

---

## 🧠 Problem Statement

Many basic employee management websites only display static records and charge for premium features like task allocation, search, cloud storage, and CRUD operations.

**This project provides a free fullstack implementation** with the following capabilities:

✔ Employee Management  
✔ Task Management with Status & Assignment  
✔ MongoDB Atlas cloud integration  
✔ Live search filtering  
✔ Responsive, dashboard-style UI  

---

## 🧱 Tech Stack

### 🟦 Track 1 – Frontend (Mock)

- HTML5, CSS3, Vanilla JavaScript  
- In-memory mock JSON  
- No backend / No database  
- Basic employee table simulation

### 🟨 Track 2 – Backend API

- Node.js + Express.js  
- MongoDB Atlas (Cloud)  
- Mongoose ODM  
- CRUD REST APIs for:
  - Employees
  - Tasks  
- `.env` used & secured with `.gitignore`

### 🟩 Track 3 – Fullstack

- React (Vite Setup)  
- Integration with Track 2 backend API  
- Glassmorphism UI, hover effects, animations  
- Live search for employees  
- Task assignment & status badges  
- Clean component-based React design

---

## 📂 Folder Structure

```text
prou-assignment/
├── track1-frontend-mock/          # Track 1 – HTML/CSS/JS (mock data)
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── track2-backend-api/            # Track 2 – Express API + MongoDB
│   ├── server.js
│   ├── models/
│   │   ├── Employee.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── employeeRoutes.js
│   │   └── taskRoutes.js
│   ├── .env        # NOT committed (secured)
│   └── package.json
│
└── track3-frontend-fullstack/     # Track 3 – React App (Fullstack)
    ├── src/
    │   ├── App.jsx
    │   └── index.css
    └── package.json


🛠️ Setup Instructions
▶ Track 2 – Backend (API + DB)
cd track2-backend-api
npm install
npm start


Should show:

Server running on port 5000
MongoDB connected

▶ Track 3 – Fullstack (React + API + MongoDB Atlas)
cd track3-frontend-fullstack
npm install
npm run dev


Open in browser:

http://localhost:5173/


▶ Flow to Test

Add Employee → Table updates

Add Task → Assign to employee

LIVE search by name, role, email

MongoDB Atlas → Collections updated in real-time

📡 API Endpoints (Track 2)
Employees — /api/employees
Method	Endpoint	Description
GET	/api/employees	Get all employees
POST	/api/employees	Create employee
PUT	/api/employees/:id	Update employee
DELETE	/api/employees/:id	Delete employee
Tasks — /api/tasks
Method	Endpoint	Description
GET	/api/tasks	Get all tasks
POST	/api/tasks	Create task
PUT	/api/tasks/:id	Update task / status
DELETE	/api/tasks/:id	Delete task
📸 Screenshots

Screenshots included in a separate folder: /screenshots

Fullstack Dashboard (React + API)

dashboard-ui.png

Backend Running

backend-connected.png

MongoDB Collections

employees-collection.png
tasks-collection.png

Track 1 Mock Frontend

track1-mock-ui.png

💡 Unique / Bonus Features

✔ 3 Tracks successfully implemented
✔ Clean folder structure
✔ Cloud DB – no local setup needed
✔ Responsive + animated UI
✔ Employee search bar
✔ Task assignment & CRUD
✔ .env secured using .gitignore

🧠 Assumptions

No authentication required

Single organization use case

Minimal frontend validation

JSON-only API responses

🚀 Future Enhancements
Feature Idea	Description
Authentication	JWT-based login system
Role-based access	HR vs Employee permissions
Task analytics	Pie charts for status distribution
Calendar timeline	Deadline-based task view
Kanban board	Drag & drop task workflow
Deployment	Netlify + Render / Railway
🧾 Final Summary

This project satisfies ALL required tracks:

✔ Track 1 – Frontend (Mock Data)
✔ Track 2 – Backend (API + DB)
✔ Track 3 – Fullstack Integrated Web App

It demonstrates:

Fullstack integration with MongoDB

Modular code architecture

Professional animated dashboard UI

Complete CRUD functionality



