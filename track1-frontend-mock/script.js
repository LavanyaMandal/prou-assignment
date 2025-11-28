// Mock JSON data (NO database / NO API)
let employees = [
  { id: 1, name: "Lavanya", role: "Frontend Developer" },
  { id: 2, name: "Alex", role: "Backend Engineer" }
];

// Load employee table when page starts
function loadTable() {
  const table = document.getElementById("employeeTable");
  table.innerHTML = "";

  employees.forEach(emp => {
    table.innerHTML += `
      <tr>
        <td>${emp.id}</td>
        <td>${emp.name}</td>
        <td>${emp.role}</td>
      </tr>`;
  });
}

// Add new employee
function addEmployee() {
  const name = document.getElementById("name").value;
  const role = document.getElementById("role").value;

  if (!name || !role) return alert("Please enter all fields!");

  const newEmp = {
    id: employees.length + 1,
    name,
    role
  };

  employees.push(newEmp);
  loadTable();
}

loadTable();
