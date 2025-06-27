document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("dynamic-projects");

  fetch("https://portfolio-website-hyiq.onrender.com/projects")
    .then(response => response.json())
    .then(data => {
      if (!container) return;

      data.projects.forEach(project => {
        const entry = document.createElement("div");
        entry.className = "project-entry";

        entry.innerHTML = `
          <h2>${project.title}</h2>
          <p><strong>${project.type}</strong></p>
          <p>${project.description}</p>
        `;

        container.appendChild(entry);
      });
    })
    .catch(error => {
      console.error("Error fetching projects:", error);
    });
});
