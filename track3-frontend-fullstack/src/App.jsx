import { useState, useMemo } from "react";
import "./index.css";

// ---------- CONSTANTS ----------

const EMPLOYEE_STATUSES = ["Active", "On Leave", "Inactive"];
const TASK_STATUSES = ["Todo", "In Progress", "Done"];

const DEFAULT_EMPLOYEES = [
  {
    id: 1,
    name: "Anu Sharma",
    role: "SDE",
    email: "anu.sharma@example.com",
    status: "On Leave",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Lavanya",
    role: "Frontend Engineer",
    email: "lavanya@example.com",
    status: "Active",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Rohit Kumar",
    role: "Backend Engineer",
    email: "rohit.kumar@example.com",
    status: "Active",
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Sara Ali",
    role: "UI Designer",
    email: "sara.ali@example.com",
    status: "Inactive",
    createdAt: new Date().toISOString(),
  },
];

const DEFAULT_TASKS = [
  {
    id: 101,
    title: "Build employee API",
    status: "In Progress",
    assigneeId: 3, // Rohit
    createdAt: new Date().toISOString(),
  },
  {
    id: 102,
    title: "Design dashboard UI",
    status: "Todo",
    assigneeId: 4, // Sara
    createdAt: new Date().toISOString(),
  },
  {
    id: 103,
    title: "Fix login bug",
    status: "Done",
    assigneeId: 2, // Lavanya
    createdAt: new Date().toISOString(),
  },
  {
    id: 104,
    title: "Update leave page",
    status: "Todo",
    assigneeId: 1, // Anu
    createdAt: new Date().toISOString(),
  },
];

// ---------- APP ----------

function App() {
  const [theme, setTheme] = useState("dark");
  const [activeSection, setActiveSection] = useState("Dashboard");

  // Employees
  const [employees, setEmployees] = useState(DEFAULT_EMPLOYEES);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(
    DEFAULT_EMPLOYEES.length ? DEFAULT_EMPLOYEES[0].id : null
  );
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Employee form
  const [isEmpFormOpen, setIsEmpFormOpen] = useState(false);
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [empFormData, setEmpFormData] = useState({
    name: "",
    role: "",
    email: "",
    status: "Active",
  });

  // Tasks
  const [tasks, setTasks] = useState(DEFAULT_TASKS);
  const [selectedTaskId, setSelectedTaskId] = useState(
    DEFAULT_TASKS.length ? DEFAULT_TASKS[0].id : null
  );

  // Task form
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [taskFormData, setTaskFormData] = useState({
    title: "",
    status: "Todo",
    assigneeId: "",
  });

  const selectedEmployee =
    employees.find((e) => e.id === selectedEmployeeId) || null;

  const selectedTask = tasks.find((t) => t.id === selectedTaskId) || null;

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const query = search.toLowerCase();
      const matchesSearch =
        emp.name.toLowerCase().includes(query) ||
        emp.role.toLowerCase().includes(query) ||
        (emp.email || "").toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ? true : emp.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [employees, search, statusFilter]);

  // Stats
  const totalEmployees = employees.length;
  const activeCount = employees.filter((e) => e.status === "Active").length;
  const leaveCount = employees.filter((e) => e.status === "On Leave").length;
  const inactiveCount = employees.filter((e) => e.status === "Inactive").length;

  const totalTasks = tasks.length;
  const todoTasks = tasks.filter((t) => t.status === "Todo").length;
  const inProgressTasks = tasks.filter(
    (t) => t.status === "In Progress"
  ).length;
  const doneTasks = tasks.filter((t) => t.status === "Done").length;

  const hasEmployees = employees.length > 0;
  const hasTasks = tasks.length > 0;

  const getEmployeeName = (id) =>
    employees.find((e) => e.id === id)?.name || "Unassigned";

  // ---------- Theme ----------

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // ---------- Employee handlers ----------

  const openCreateEmployeeForm = () => {
    setEditingEmployeeId(null);
    setEmpFormData({
      name: "",
      role: "",
      email: "",
      status: "Active",
    });
    setIsEmpFormOpen(true);
  };

  const openEditEmployeeForm = () => {
    if (!selectedEmployee) return;
    setEditingEmployeeId(selectedEmployee.id);
    setEmpFormData({
      name: selectedEmployee.name,
      role: selectedEmployee.role,
      email: selectedEmployee.email || "",
      status: selectedEmployee.status,
    });
    setIsEmpFormOpen(true);
  };

  const closeEmpForm = () => setIsEmpFormOpen(false);

  const handleEmpFormChange = (e) => {
    const { name, value } = e.target;
    setEmpFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmpFormSubmit = (e) => {
    e.preventDefault();

    if (!empFormData.name.trim() || !empFormData.role.trim()) {
      alert("Name and role are required.");
      return;
    }

    if (editingEmployeeId) {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === editingEmployeeId ? { ...emp, ...empFormData } : emp
        )
      );
    } else {
      const newEmployee = {
        id: Date.now(),
        ...empFormData,
        createdAt: new Date().toISOString(),
      };
      setEmployees((prev) => [newEmployee, ...prev]);
      setSelectedEmployeeId(newEmployee.id);
    }

    setIsEmpFormOpen(false);
  };

  const handleSelectEmployee = (id) => {
    setSelectedEmployeeId(id);
    setActiveSection("Employees");
  };

  const handleClearAllEmployees = () => {
    if (window.confirm("Clear all employees from this mock list?")) {
      setEmployees([]);
      setSelectedEmployeeId(null);
    }
  };

  const handleExportEmployees = () => {
    console.log("Employees:", employees);
    alert("Employees exported to console as JSON (mock).");
  };

  // ---------- Task handlers ----------

  const openCreateTaskForm = () => {
    setEditingTaskId(null);
    setTaskFormData({
      title: "",
      status: "Todo",
      assigneeId: "",
    });
    setIsTaskFormOpen(true);
  };

  const openEditTaskForm = () => {
    if (!selectedTask) return;
    setEditingTaskId(selectedTask.id);
    setTaskFormData({
      title: selectedTask.title,
      status: selectedTask.status,
      assigneeId: selectedTask.assigneeId || "",
    });
    setIsTaskFormOpen(true);
  };

  const closeTaskForm = () => setIsTaskFormOpen(false);

  const handleTaskFormChange = (e) => {
    const { name, value } = e.target;
    setTaskFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTaskFormSubmit = (e) => {
    e.preventDefault();

    if (!taskFormData.title.trim()) {
      alert("Task title is required.");
      return;
    }

    if (editingTaskId) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingTaskId
            ? {
                ...t,
                ...taskFormData,
                assigneeId: taskFormData.assigneeId || "",
              }
            : t
        )
      );
    } else {
      const newTask = {
        id: Date.now(),
        ...taskFormData,
        assigneeId: taskFormData.assigneeId || "",
        createdAt: new Date().toISOString(),
      };
      setTasks((prev) => [newTask, ...prev]);
      setSelectedTaskId(newTask.id);
    }

    setIsTaskFormOpen(false);
  };

  const handleSelectTask = (id) => {
    setSelectedTaskId(id);
    setActiveSection("Tasks");
  };

  const handleClearAllTasks = () => {
    if (window.confirm("Clear all tasks from this mock list?")) {
      setTasks([]);
      setSelectedTaskId(null);
    }
  };

  // ---------- JSX ----------

  return (
    <div className={`app-shell ${theme === "dark" ? "app-shell--dark" : ""}`}>
      {/* Sidebar */}
      <aside className="sidebar slide-in-left">
        <div>
          <div className="sidebar__brand">
            <div className="brand-dot" />
            <div className="brand-text">
              <span className="brand-title">Employee Board</span>
              <span className="brand-subtitle">Web assignment</span>
            </div>
          </div>

          <nav className="sidebar__nav">
            <p className="sidebar__section-label">Main</p>
            <button
              className={`nav-item ${
                activeSection === "Dashboard" ? "nav-item--active" : ""
              }`}
              onClick={() => setActiveSection("Dashboard")}
            >
              <span className="nav-pill" />
              Dashboard
            </button>

            <p className="sidebar__section-label">People</p>
            <button
              className={`nav-item ${
                activeSection === "Employees" ? "nav-item--active" : ""
              }`}
              onClick={() => setActiveSection("Employees")}
            >
              Employees
            </button>

            <p className="sidebar__section-label">Work</p>
            <button
              className={`nav-item ${
                activeSection === "Tasks" ? "nav-item--active" : ""
              }`}
              onClick={() => setActiveSection("Tasks")}
            >
              Tasks
            </button>
          </nav>
        </div>

        <div className="sidebar__bottom fade-in">
          <button className="theme-toggle" onClick={toggleTheme}>
            <span className="theme-toggle__label">
              {theme === "light" ? "Light mode" : "Dark mode"}
            </span>
            <span className="theme-toggle__switch">
              <span
                className={`theme-toggle__thumb ${
                  theme === "dark" ? "theme-toggle__thumb--right" : ""
                }`}
              />
            </span>
          </button>
          <div className="sidebar__profile-mini">
            <div className="avatar-circle avatar-circle--sm">
              {selectedEmployee && selectedEmployee.name
                ? selectedEmployee.name.charAt(0)
                : "E"}
            </div>
            <div>
              <p className="profile-mini__name">
                {selectedEmployee ? selectedEmployee.name : "No employee"}
              </p>
              <p className="profile-mini__role">
                {selectedEmployee ? selectedEmployee.role : "Select or add one"}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main panel */}
      <main className="main-panel fade-in">
        <header className="main-panel__topbar">
          <div>
            <h1 className="title-glow">
              {activeSection === "Dashboard"
                ? "Dashboard"
                : activeSection === "Employees"
                ? "Employees"
                : "Tasks"}
            </h1>
            <p className="main-panel__subtitle">
              {activeSection === "Dashboard" &&
                "Overview of your people and work."}
              {activeSection === "Employees" &&
                (hasEmployees
                  ? `Showing ${filteredEmployees.length} of ${employees.length} employees`
                  : "No employees created yet")}
              {activeSection === "Tasks" &&
                (hasTasks
                  ? `You have ${totalTasks} tasks in the list`
                  : "No tasks created yet")}
            </p>
          </div>

          {/* Top-right actions depend on section */}
          {activeSection === "Employees" && (
            <div className="topbar-actions">
              <div className="topbar-search">
                <input
                  type="text"
                  placeholder="Search name, role, email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <select
                className="select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                {EMPLOYEE_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <button
                className="btn btn--ghost"
                onClick={handleExportEmployees}
                disabled={!hasEmployees}
              >
                Export
              </button>
              <button
                className="btn btn--primary"
                type="button"
                onClick={openCreateEmployeeForm}
              >
                + Add
              </button>
            </div>
          )}

          {activeSection === "Tasks" && (
            <div className="topbar-actions">
              <button
                className="btn btn--outline"
                type="button"
                onClick={() => setSelectedTaskId(null)}
              >
                Clear selection
              </button>
              <button
                className="btn btn--primary"
                type="button"
                onClick={openCreateTaskForm}
              >
                + Add task
              </button>
            </div>
          )}
        </header>

        <section className="main-panel__content">
          {/* DASHBOARD */}
          {activeSection === "Dashboard" && (
            <>
              <section className="stat-grid">
                <article className="stat-card card-animate">
                  <p className="stat-card__label">Employees</p>
                  <p className="stat-card__value">{totalEmployees}</p>
                  <p className="stat-card__meta">
                    Active {activeCount} · On leave {leaveCount} · Inactive{" "}
                    {inactiveCount}
                  </p>
                </article>

                <article className="stat-card card-animate">
                  <p className="stat-card__label">Tasks</p>
                  <p className="stat-card__value">{totalTasks}</p>
                  <p className="stat-card__meta">
                    Todo {todoTasks} · In progress {inProgressTasks} · Done{" "}
                    {doneTasks}
                  </p>
                </article>
              </section>

              <section className="card-grid">
                <article className="employee-card card-animate">
                  <h3 style={{ marginBottom: 8 }}>How to use this demo</h3>
                  <p className="employee-card__role">
                    Use the sidebar to switch between <b>Dashboard</b>,{" "}
                    <b>Employees</b>, and <b>Tasks</b>. All data is mock but
                    fully interactive – ideal for your internship assignment
                    showcase.
                  </p>
                </article>
              </section>
            </>
          )}

          {/* EMPLOYEES */}
          {activeSection === "Employees" && (
            <>
              {selectedEmployee ? (
                <section className="profile-card card-animate">
                  <div className="profile-card__left">
                    <div className="avatar-circle avatar-circle--lg">
                      {selectedEmployee.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="profile-card__name">
                        {selectedEmployee.name}
                      </h2>
                      <p className="profile-card__role">
                        {selectedEmployee.role}
                      </p>
                      {selectedEmployee.email && (
                        <p className="profile-card__email">
                          {selectedEmployee.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="profile-card__right">
                    <p className="profile-card__label">Status</p>
                    <span
                      className={`status-pill status-pill--${
                        selectedEmployee.status === "Active"
                          ? "green"
                          : selectedEmployee.status === "On Leave"
                          ? "orange"
                          : "grey"
                      }`}
                    >
                      {selectedEmployee.status}
                    </span>

                    <div className="profile-card__actions">
                      <button
                        className="btn btn--outline"
                        onClick={openEditEmployeeForm}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn--primary"
                        onClick={() =>
                          alert(
                            `Message ${selectedEmployee.name} (demo only).`
                          )
                        }
                      >
                        Message
                      </button>
                    </div>
                  </div>
                </section>
              ) : (
                <section className="profile-card profile-card--empty card-animate">
                  <div>
                    <h2 className="profile-card__name">
                      No employee selected yet
                    </h2>
                    <p className="profile-card__role">
                      Create a new employee or select one from the grid below.
                    </p>
                  </div>
                </section>
              )}

              <section className="card-grid">
                {!hasEmployees && (
                  <p className="empty-text">
                    No employees to display. Add some employees to see cards
                    here.
                  </p>
                )}

                {filteredEmployees.map((emp, index) => (
                  <article
                    key={emp.id}
                    className={`employee-card card-animate ${
                      emp.id === selectedEmployeeId
                        ? "employee-card--selected"
                        : ""
                    }`}
                    style={{ animationDelay: `${index * 35}ms` }}
                    onClick={() => handleSelectEmployee(emp.id)}
                  >
                    <div className="employee-card__header">
                      <div className="avatar-circle avatar-circle--sm">
                        {emp.name.charAt(0)}
                      </div>
                      <div>
                        <h3>{emp.name}</h3>
                        <p className="employee-card__role">{emp.role}</p>
                        {emp.email && (
                          <p className="employee-card__email">{emp.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="employee-card__footer">
                      <span
                        className={`status-dot status-dot--${
                          emp.status === "Active"
                            ? "green"
                            : emp.status === "On Leave"
                            ? "orange"
                            : "grey"
                        }`}
                      />
                      <span className="employee-card__status-text">
                        {emp.status}
                      </span>
                      <button
                        className="btn btn--ghost btn--sm"
                        type="button"
                      >
                        View
                      </button>
                    </div>
                  </article>
                ))}
              </section>

              {hasEmployees && (
                <button
                  className="btn btn--ghost"
                  type="button"
                  onClick={handleClearAllEmployees}
                  style={{ alignSelf: "flex-start", marginTop: 4 }}
                >
                  Clear all employees (mock)
                </button>
              )}
            </>
          )}

          {/* TASKS */}
          {activeSection === "Tasks" && (
            <>
              {selectedTask ? (
                <section className="profile-card card-animate">
                  <div className="profile-card__left">
                    <div className="avatar-circle avatar-circle--lg task-avatar">
                      {selectedTask.title.charAt(0)}
                    </div>
                    <div>
                      <h2 className="profile-card__name">
                        {selectedTask.title}
                      </h2>
                      <p className="profile-card__role">
                        {selectedTask.assigneeId
                          ? getEmployeeName(selectedTask.assigneeId)
                          : "Unassigned"}
                      </p>
                    </div>
                  </div>

                  <div className="profile-card__right">
                    <p className="profile-card__label">Status</p>
                    <span
                      className={`status-pill task-status-pill--${selectedTask.status
                        .toLowerCase()
                        .replace(" ", "")}`}
                    >
                      {selectedTask.status}
                    </span>

                    <div className="profile-card__actions">
                      <button
                        className="btn btn--outline"
                        onClick={openEditTaskForm}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </section>
              ) : (
                <section className="profile-card profile-card--empty card-animate">
                  <div>
                    <h2 className="profile-card__name">
                      No task selected yet
                    </h2>
                    <p className="profile-card__role">
                      Create a new task or select one from the list below.
                    </p>
                  </div>
                </section>
              )}

              <section className="card-grid card-grid--tasks">
                {!hasTasks && (
                  <p className="empty-text">
                    No tasks to display. Add some tasks to see cards here.
                  </p>
                )}

                {tasks.map((task, index) => (
                  <article
                    key={task.id}
                    className={`employee-card card-animate ${
                      task.id === selectedTaskId
                        ? "employee-card--selected"
                        : ""
                    }`}
                    style={{ animationDelay: `${index * 35}ms` }}
                    onClick={() => handleSelectTask(task.id)}
                  >
                    <div className="employee-card__header">
                      <div className="avatar-circle avatar-circle--sm task-avatar">
                        {task.title.charAt(0)}
                      </div>
                      <div>
                        <h3>{task.title}</h3>
                        <p className="employee-card__role">
                          {task.assigneeId
                            ? getEmployeeName(task.assigneeId)
                            : "Unassigned"}
                        </p>
                      </div>
                    </div>

                    <div className="employee-card__footer">
                      <span
                        className={`status-dot task-status-dot--${task.status
                          .toLowerCase()
                          .replace(" ", "")}`}
                      />
                      <span className="employee-card__status-text">
                        {task.status}
                      </span>
                      <button
                        className="btn btn--ghost btn--sm"
                        type="button"
                      >
                        View
                      </button>
                    </div>
                  </article>
                ))}
              </section>

              {hasTasks && (
                <button
                  className="btn btn--ghost"
                  type="button"
                  onClick={handleClearAllTasks}
                  style={{ alignSelf: "flex-start", marginTop: 4 }}
                >
                  Clear all tasks (mock)
                </button>
              )}
            </>
          )}
        </section>
      </main>

      {/* EMPLOYEE MODAL */}
      {isEmpFormOpen && (
        <div className="modal-backdrop" onClick={closeEmpForm}>
          <div
            className="modal"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h2 className="modal__title">
              {editingEmployeeId ? "Edit Employee" : "Add New Employee"}
            </h2>
            <form className="modal__form" onSubmit={handleEmpFormSubmit}>
              <div className="modal__grid">
                <label className="modal__field">
                  <span>Name*</span>
                  <input
                    type="text"
                    name="name"
                    value={empFormData.name}
                    onChange={handleEmpFormChange}
                    required
                  />
                </label>

                <label className="modal__field">
                  <span>Role*</span>
                  <input
                    type="text"
                    name="role"
                    value={empFormData.role}
                    onChange={handleEmpFormChange}
                    required
                  />
                </label>

                <label className="modal__field">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    value={empFormData.email}
                    onChange={handleEmpFormChange}
                    placeholder="name@example.com"
                  />
                </label>

                <label className="modal__field">
                  <span>Status</span>
                  <select
                    name="status"
                    value={empFormData.status}
                    onChange={handleEmpFormChange}
                  >
                    {EMPLOYEE_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="modal__actions">
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={closeEmpForm}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn--primary">
                  {editingEmployeeId ? "Save changes" : "Create employee"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TASK MODAL */}
      {isTaskFormOpen && (
        <div className="modal-backdrop" onClick={closeTaskForm}>
          <div
            className="modal"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h2 className="modal__title">
              {editingTaskId ? "Edit Task" : "Add Task"}
            </h2>
            <form className="modal__form" onSubmit={handleTaskFormSubmit}>
              <div className="modal__grid">
                <label className="modal__field">
                  <span>Title*</span>
                  <input
                    type="text"
                    name="title"
                    value={taskFormData.title}
                    onChange={handleTaskFormChange}
                    required
                  />
                </label>

                <label className="modal__field">
                  <span>Status</span>
                  <select
                    name="status"
                    value={taskFormData.status}
                    onChange={handleTaskFormChange}
                  >
                    {TASK_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="modal__field">
                  <span>Assigned to</span>
                  <select
                    name="assigneeId"
                    value={taskFormData.assigneeId}
                    onChange={handleTaskFormChange}
                  >
                    <option value="">Unassigned</option>
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="modal__actions">
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={closeTaskForm}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn--primary">
                  {editingTaskId ? "Save changes" : "Create task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
