const API_URL = "https://portfolio-website-hyiq.onrender.com/admin/projects";

let adminPassword = "";

window.addEventListener("DOMContentLoaded", () => {
  const overlayButton = document.getElementById("overlay-submit");
  if (overlayButton) {
    overlayButton.addEventListener("click", submitOverlayPassword);
  }

  const addForm = document.getElementById("add-form");
  if (addForm) {
    addForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const newProject = {
        title: document.getElementById("title").value,
        type: document.getElementById("type").value,
        description: document.getElementById("description").value,
      };
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Password": adminPassword,
        },
        body: JSON.stringify(newProject),
      });
      if (res.ok) {
        document.getElementById("title").value = "";
        document.getElementById("type").value = "";
        document.getElementById("description").value = "";
        fetchProjects();
      } else {
        alert("Error adding project.");
      }
    });
  }
});

async function submitOverlayPassword() {
  adminPassword = document.getElementById("overlay-password").value;

  try {
    const res = await fetch(API_URL, {
      headers: { "X-Admin-Password": adminPassword }
    });

    if (!res.ok) {
      document.getElementById("auth-error").style.display = "block";
      return;
    }

    const projects = await res.json();
    document.getElementById("blur-overlay").style.display = "none";
    document.getElementById("admin-panel").classList.remove("admin-hidden");
    renderProjects(projects);
  } catch (err) {
    console.error("Auth failed:", err);
    alert("Server error or incorrect password.");
  }
}

async function fetchProjects() {
  try {
    const response = await fetch(API_URL, {
      headers: { "X-Admin-Password": adminPassword }
    });
    const projects = await response.json();
    renderProjects(projects);
  } catch (err) {
    console.error("Error loading projects:", err);
    alert("Failed to load projects.");
  }
}

function renderProjects(projects) {
  const projectList = document.getElementById("project-list");
  projectList.innerHTML = "";
  projects.forEach(p => {
    const div = document.createElement("div");
    div.className = "project-card";
    div.innerHTML = `
      <h4>${p.title}</h4>
      <p><strong>${p.type}</strong></p>
      <p>${p.description}</p>
      <button onclick="deleteProject(${p.id})">Delete</button>
    `;
    projectList.appendChild(div);
  });
}

async function deleteProject(id) {
  if (!confirm("Are you sure you want to delete this project?")) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { "X-Admin-Password": adminPassword },
    });
    if (res.ok) fetchProjects();
    else alert("Error deleting project.");
  } catch (err) {
    console.error("Error deleting project:", err);
    alert("Failed to delete project.");
  }
}
