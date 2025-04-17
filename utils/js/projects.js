async function displayProjects() {
    const container = document.getElementById("projectsContainer");
    try {
        const response = await fetch("data/projects.json");
        const data = await response.json();

        let projectsHTML = "";
        data.projects.forEach((project) => {
            projectsHTML += `
                <div class="project-item wow fadeInUp">
                    <div class="project-content">
                        <div class="project-header">
                            <h3 class="project-title">
                                ${project.name}
                            </h3>
                            <div class="grp">
                                <span class="project-duration">
                                    <i class="fa fa-calendar"></i> 
                                    ${project.duration}
                                </span>
                                <a href="${project.repo}" class="project-link" target="_blank">
                                    <i class="fa fa-github"></i> View Code
                                </a>
                                ${project.demo ? `
                                    <a href="${project.demo}" class="project-link" target="_blank">
                                        <i class="fa fa-external-link"></i> Live Demo
                                    </a>
                                ` : ''}
                            </div>
                        </div>
                        <p class="project-description">${project.description}</p>
                        <div class="tech-stack">
                            ${project.technologies.map(tech => 
                                `<span class="tech-tag">${tech}</span>`
                            ).join("")}
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = projectsHTML;
    } catch (error) {
        console.error("Error loading projects:", error);
        container.innerHTML = '<p class="error-message">Failed to load projects</p>';
    }
}

document.addEventListener("DOMContentLoaded", displayProjects);
