const API_URL = "https://portfolio-website-hyiq.onrender.com/admin/projects";
const ADMIN_PASSWORD = prompt("Enter admin password:");

async function fetchProjects() {
  try {
    const response = await fetch(API_URL, {
      headers: { "X-Admin-Password": ADMIN_PASSWORD }
    });
    const projects = await response.json();
    const list = document.getElementById("project-list");
    list.innerHTML = "";

    projects.forEach((project) => {
      const div = document.createElement("div");
      div.className = "project-entry";
      div.innerHTML = `
        <strong>${project.title}</strong> <em>(${project.type})</em>
        <p>${project.description}</p>
        <button onclick="deleteProject(${project.id})">Delete</button>
      `;
      list.appendChild(div);
    });
  } catch (err) {
    console.error("Error loading projects:", err);
    alert("Failed to load projects. Check password or server.");
  }
}

async function addProject() {
  const title = document.getElementById("title").value;
  const type = document.getElementById("type").value;
  const description = document.getElementById("description").value;

  if (!title || !type || !description) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Admin-Password": ADMIN_PASSWORD,
      },
      body: JSON.stringify({ title, type, description })
    });

    if (!response.ok) throw new Error("Request failed");

    alert("Project added!");
    document.getElementById("title").value = "";
    document.getElementById("type").value = "";
    document.getElementById("description").value = "";

    fetchProjects();
  } catch (err) {
    console.error("Error adding project:", err);
    alert("Failed to add project.");
  }
}

async function deleteProject(id) {
  if (!confirm("Are you sure you want to delete this project?")) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "X-Admin-Password": ADMIN_PASSWORD
      }
    });

    if (!response.ok) throw new Error("Delete failed");

    alert("Deleted!");
    fetchProjects();
  } catch (err) {
    console.error("Error deleting project:", err);
    alert("Failed to delete project.");
  }
}

// Load projects on page load
window.onload = fetchProjects;
