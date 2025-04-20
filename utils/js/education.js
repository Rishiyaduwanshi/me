async function displayEducation() {
    const container = document.getElementById('educationContainer');
    try {
        const response = await fetch('data/education.json');
        const data = await response.json();
        
        let educationHTML = '';
        data.education.forEach(edu => {
            educationHTML += `
                <div class="education-item wow fadeInUp">
                    <div class="education-content">
                        <h3>${edu.degree}</h3>
                        <div class="institution">${edu.institution}</div>
                        <div class="location">${edu.location}</div>
                        <div class="duration">${edu.duration}</div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = educationHTML;
    } catch (error) {
        console.error('Error loading education:', error);
        container.innerHTML = '<p class="error-message">Failed to load education details</p>';
    }
}

document.addEventListener('DOMContentLoaded', displayEducation);