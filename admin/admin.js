const API_URL = "https://portfolio-website-hyiq.onrender.com/admin/projects";

let adminPassword = "";

window.submitOverlayPassword = async function () {
  adminPassword = document.getElementById("overlay-password").value;

  try {
    const res = await fetch("https://portfolio-website-hyiq.onrender.com/admin/projects", {
      headers: { "X-Admin-Password": adminPassword }
    });

    if (!res.ok) {
      document.getElementById("auth-error").style.display = "block";
      return;
    }

    const projects = await res.json();
    renderProjects(projects);

    document.getElementById("blur-overlay").style.display = "none";
    document.getElementById("admin-panel").classList.remove("admin-hidden");
  } catch (err) {
    console.error("Auth failed:", err);
    alert("Server error or incorrect password.");
  }
};

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
        "X-Admin-Password": adminPassword
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
        "X-Admin-Password": adminPassword
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
