
    document.addEventListener('DOMContentLoaded', function () {
        const sections = document.querySelectorAll('section');

        const observerOptions = {
            threshold: 0.1 // Trigger when 10% of the section is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-in'); // Animate in when visible
                    entry.target.classList.remove('section-out');
                } else {
                    entry.target.classList.remove('section-in');
                    entry.target.classList.add('section-out'); // Optional: Animate out when invisible
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section); // Observe each section
        });
    });

