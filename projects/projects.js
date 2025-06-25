console.log("✅ JS connected");

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("dynamic-projects");

  fetch("https://portfolio-website-hyiq.onrender.com/projects")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('dynamic-projects');
      if (!container) return;

      data.projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
          <h3>${project.title}</h3>
          <p><strong>${project.type}</strong></p>
          <p>${project.description}</p>
        `;
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error fetching projects:', error);
    });
});
