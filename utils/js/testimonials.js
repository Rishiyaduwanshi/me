async function loadTestimonials() {
    try {
        const response = await fetch('/data/testimonial.json');
        const data = await response.json();
        
        const testimonialGrid = document.getElementById('testimonialGrid');
        
        data.testimonials.forEach(testimonial => {
            const card = document.createElement('div');
            card.className = 'testimonial-card wow fadeInUp';
            
            const websiteLink = testimonial.website || testimonial.relation || '#';
            
            card.innerHTML = `
                <div class="testimonial-message">
                    "${testimonial.message}"
                </div>
                <div class="testimonial-author">
                    <div class="author-info">
                        <h4>${testimonial.name}</h4>
                        <a href="${websiteLink}" target="_blank" rel="noopener noreferrer">
                            ${websiteLink.replace('https://', '')}
                        </a>
                    </div>
                </div>
            `;
            
            testimonialGrid.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error loading testimonials:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadTestimonials);