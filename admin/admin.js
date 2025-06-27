const API_URL = "https://portfolio-website-hyiq.onrender.com/admin/projects";

let adminPassword = "Ninjastar123";
const adminUsername = "nevens2003"; 

window.addEventListener("DOMContentLoaded", () => {
  const overlayButton = document.getElementById("overlay-submit");
  if (overlayButton) {
    overlayButton.addEventListener("click", submitOverlayPassword);
  }

  // Support pressing "Enter" inside the password field
  const passwordInput = document.getElementById("overlay-password");
  if (passwordInput) {
    passwordInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submitOverlayPassword();
      }
    });
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

      const authHeader = "Basic " + btoa(`${adminUsername}:${adminPassword}`);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": authHeader,
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
  const username = document.getElementById("overlay-username").value;
  adminPassword = document.getElementById("overlay-password").value;
  const authHeader = "Basic " + btoa(`${username}:${adminPassword}`);

  // Hide previous error
  const errorEl = document.getElementById("auth-error");
  errorEl.style.display = "none";

  try {
    const res = await fetch(API_URL, {
      headers: { "Authorization": authHeader }
    });

    if (!res.ok) {
      errorEl.style.display = "block";
      return;
    }

    const projects = await res.json();
    document.getElementById("blur-overlay").style.display = "none";
    document.getElementById("admin-panel").classList.remove("admin-hidden");
    renderProjects(projects);
  } catch (err) {
    console.error("Auth failed:", err);
    alert("Server error or connection issue.");
  }
}
