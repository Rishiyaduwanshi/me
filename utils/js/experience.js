async function displayExperience() {
    const container = document.getElementById("experienceContainer");
    const tabsContainer = document.getElementById("experienceTabs");
    
    try {
        const response = await fetch("data/experience.json");
        const data = await response.json();
        
        let tabsHTML = "";
        data.freelanceExperience.forEach((exp, index) => {
            tabsHTML += `
                <button class="experience-tab ${index === 0 ? 'active' : ''}" 
                        onclick="switchTab('${exp.name}')">${exp.name}</button>
            `;
        });
        tabsContainer.innerHTML = tabsHTML;
        
        let experienceHTML = "";
        data.freelanceExperience.forEach((exp, index) => {
            experienceHTML += `
                <div class="experience-container ${index === 0 ? 'active' : ''}" id="${exp.name}">
                    <div class="experience-card wow fadeInUp">
                        <div class="experience-header">
                            <h3 class="experience-title">${exp.name}</h3>
                            <a href="${exp.website}" class="experience-website" target="_blank">
                                <i class="fa fa-external-link"></i> Visit Website
                            </a>
                        </div>
                        <p class="experience-description">${exp.description}</p>
                        <div class="experience-tasks">
                            <h4>Key Achievements</h4>
                            <ul class="task-list">
                                ${exp.tasks.map(task => `<li>${task}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="tech-stack">
                            ${exp.tech_stack.map(tech => 
                                `<span class="tech-tag">${tech}</span>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            `;
        });
        container.innerHTML = experienceHTML;
    } catch (error) {
        console.error("Error loading experience:", error);
        container.innerHTML = '<p class="error-message">Failed to load experience data</p>';
    }
}

function switchTab(projectName) {
    document.querySelectorAll('.experience-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.experience-container').forEach(cont => cont.classList.remove('active'));
    
    document.querySelector(`.experience-tab[onclick="switchTab('${projectName}')"]`).classList.add('active');
    document.getElementById(projectName).classList.add('active');
}

document.addEventListener('DOMContentLoaded', displayExperience);