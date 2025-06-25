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