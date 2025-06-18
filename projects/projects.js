console.log("✅ JS connected");

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".project-grid");

  fetch("https://portfolio-website-hyiq.onrender.com/projects")
    .then(res => res.json())
    .then(data => {
      container.innerHTML = ""; // Clear hardcoded HTML (optional)

      data.projects.forEach(proj => {
        const card = document.createElement("div");
        card.className = "project-card";

        card.innerHTML = `
          <h3>${proj.title}</h3>
          <p><strong>Type:</strong> ${proj.type}</p>
          <p>${proj.description}</p>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Error loading projects:", err);
      container.innerHTML = "<p style='color:red;'>Failed to load projects.</p>";
    });
});
