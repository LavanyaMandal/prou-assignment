import { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000/api";

function App() {
  // Employees
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  // Tasks
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskStatus, setTaskStatus] = useState("Pending");
  const [taskEmployeeId, setTaskEmployeeId] = useState("");

  // Search
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEmployees();
    fetchTasks();
  }, []);

  async function fetchEmployees() {
    try {
      const res = await fetch(`${API_BASE}/employees`);
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load employees");
    }
  }

  async function fetchTasks() {
    try {
      const res = await fetch(`${API_BASE}/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load tasks");
    }
  }

  async function addEmployee() {
    if (!name || !role || !email) {
      alert("Please fill all employee fields");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, email }),
      });

      if (!res.ok) throw new Error("Failed to add employee");

      const newEmp = await res.json();
      setEmployees((prev) => [newEmp, ...prev]);
      setName("");
      setRole("");
      setEmail("");
    } catch (err) {
      console.error(err);
      alert("Error adding employee");
    }
  }

  async function addTask() {
    if (!taskTitle) {
      alert("Task title required");
      return;
    }

    try {
      const body = {
        title: taskTitle,
        status: taskStatus,
      };

      if (taskEmployeeId) {
        body.employeeId = taskEmployeeId;
      }

      const res = await fetch(`${API_BASE}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to add task");

      const newTask = await res.json();
      setTasks((prev) => [newTask, ...prev]);
      setTaskTitle("");
      setTaskStatus("Pending");
      setTaskEmployeeId("");
    } catch (err) {
      console.error(err);
      alert("Error adding task");
    }
  }

  const filteredEmployees = employees.filter((e) =>
    (e.name + e.role + e.email).toLowerCase().includes(search.toLowerCase())
  );

  const statusClass = (status) => {
    if (status === "Completed") return "badge badge-success";
    if (status === "In Progress") return "badge badge-warn";
    return "badge badge-neutral";
  };

  return (
    <div className="app-root">
      <div className="app-shell">
        {/* Header */}
        <header className="app-header">
          <div>
            <h1 className="app-title">EchoVerse HR Dashboard</h1>
            <p className="app-subtitle">
              Track 3 • Fullstack: React + Node/Express + MongoDB Atlas
            </p>
          </div>
          <div className="pill">
            Fullstack&nbsp;·&nbsp;Employees&nbsp;+&nbsp;Tasks
          </div>
        </header>

        {/* Search */}
        <div className="search-wrapper">
          <input
            className="input search-input"
            placeholder="Search employees by name, role, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Main layout */}
        <div className="grid">
          {/* Left column – Employees */}
          <div className="column">
            <div className="card">
              <h2 className="card-title">Add Employee</h2>
              <div className="form-row">
                <input
                  className="input"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="input"
                  placeholder="Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
                <input
                  className="input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="btn primary" onClick={addEmployee}>
                  Save
                </button>
              </div>
            </div>

            <div className="card card-scroll">
              <h2 className="card-title">Employees</h2>
              {filteredEmployees.length === 0 ? (
                <p className="empty-text">No employees yet. Add from above.</p>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((emp) => (
                      <tr key={emp._id}>
                        <td>{emp.name}</td>
                        <td>{emp.role}</td>
                        <td>{emp.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Right column – Tasks */}
          <div className="column">
            <div className="card">
              <h2 className="card-title">Add Task</h2>
              <div className="form-col">
                <input
                  className="input"
                  placeholder="Task title"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                />
                <select
                  className="input"
                  value={taskStatus}
                  onChange={(e) => setTaskStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>

                <select
                  className="input"
                  value={taskEmployeeId}
                  onChange={(e) => setTaskEmployeeId(e.target.value)}
                >
                  <option value="">Unassigned</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.name}
                    </option>
                  ))}
                </select>

                <button className="btn success" onClick={addTask}>
                  Create Task
                </button>
              </div>
            </div>

            <div className="card card-scroll">
              <h2 className="card-title">Tasks</h2>
              {tasks.length === 0 ? (
                <p className="empty-text">No tasks yet.</p>
              ) : (
                <div className="task-list">
                  {tasks.map((task) => (
                    <div key={task._id} className="task-card">
                      <div className="task-row">
                        <span className="task-title">{task.title}</span>
                        <span className={statusClass(task.status)}>
                          {task.status}
                        </span>
                      </div>
                      <div className="task-meta">
                        {task.employeeId
                          ? `Assigned to: ${
                              task.employeeId.name || "Employee"
                            }`
                          : "Unassigned"}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
