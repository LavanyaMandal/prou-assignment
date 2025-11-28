# HR Management System – Employee & Task Dashboard

This project is submitted for **Prou Assignment – Track 1, Track 2 & Track 3**.

---

## 📌 Tracks Covered

| Track | Technology | Description |
|------|------------|-------------|
| **Track 1** | HTML, CSS, JavaScript | Frontend with mock JSON data (no DB) |
| **Track 2** | Node.js, Express, MongoDB | REST API + Cloud Database CRUD |
| **Track 3** | React + Express + MongoDB | Fully functional fullstack dashboard |

---

## 🧠 Problem Statement  

Most basic HR dashboards only show static data and charge money for premium features like:
- Cloud database
- Live task allocation  
- Search + filtering  
- CRUD operations  

➡️ **This project solves that issue** by giving a **FREE & fully working fullstack system**.

✔ Employee management  
✔ Task assignment  
✔ MongoDB Atlas (cloud DB)  
✔ Modern & responsive UI  
✔ Live filtering + CRUD  

---

## 🧱 Tech Stack

### 🔹 **Frontend – Track 1**
- HTML5, CSS3, JavaScript  
- Mock JSON data  
- No backend / No database

### 🔸 **Backend – Track 2**
- Node.js + Express.js  
- MongoDB Atlas (cloud DB)  
- Mongoose ODM  
- `.env` secured using `.gitignore`

### 🟢 **Fullstack – Track 3**
- React (Vite setup)  
- API Integration (Axios)  
- Glassmorphism UI + Animations  
- Status Badges + Live Search

---

## 📂 Folder Structure

```text
prou-assignment/
├── track1-frontend-mock/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── track2-backend-api/
│   ├── server.js
│   ├── models/
│   ├── routes/
│   ├── .env      # NOT committed (secured)
│   └── package.json
│
└── track3-frontend-fullstack/
    ├── src/
    │   ├── App.jsx
    │   └── index.css
    └── package.json
```


### Setup Instructions
```
▶ Track 2 – Backend API
cd track2-backend-api
npm install
npm start

Output expected:

Server running on port 5000
MongoDB connected

▶ Track 3 – Fullstack React App
cd track3-frontend-fullstack
npm install
npm run dev

Open in browser:

http://localhost:5173/
```


### API Routes (Track 2)
```
Employees – /api/employees
Method	Endpoint	Description
GET	/api/employees	Get all employees
POST	/api/employees	Create employee
PUT	/api/employees/:id	Update employee
DELETE	/api/employees/:id	Delete employee
Tasks – /api/tasks
Method	Endpoint	Description
GET	/api/tasks	Get all tasks
POST	/api/tasks	Create task
PUT	/api/tasks/:id	Update task
DELETE	/api/tasks/:id	Delete task
```

### Assumptions
```
No authentication required

Single organization usage

JSON-only API responses

Basic frontend validation

One-to-many = Employee → Tasks
```

### Bonus Features
```
✔ Light / Dark Mode
✔ Search + Filter
✔ Status Tags with Colors
✔ Modal-based Add/Edit Forms
✔ React State-Based Storage
✔ Animated Glassmorphism UI
✔ Cloud Database – MongoDB Atlas
✔ Deployed Version (optional)
```


### Future Enhancements
```
Idea	              Description
Authentication	      JWT login system
Role-based access	  HR privilege system
Analytics	          Pie charts for task status
Kanban Board	      Drag & drop task flow
Calendar View	      Task deadline timeline
Deployment	          Netlify + Render
```
