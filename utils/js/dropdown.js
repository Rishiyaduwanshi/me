document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    const navbar = document.getElementById('navbar');
    const blogLink = document.querySelector('.blog-link');

    // Toggle dropdown on mobile
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');

        link.addEventListener('click', function(e) {
            if (window.innerWidth < 991) {
                e.preventDefault();
                
                // Close other dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown && other.classList.contains('open')) {
                        other.classList.remove('open');
                        other.querySelector('.dropdown-menu').style.display = 'none';
                    }
                });

                // Toggle current dropdown
                dropdown.classList.toggle('open');
                menu.style.display = dropdown.classList.contains('open') ? 'block' : 'none';
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('open');
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) menu.style.display = 'none';
            });
        }
    });

    // Close mobile menu and dropdowns when clicking menu items
    const menuItems = document.querySelectorAll('.navbar-nav a:not(.dropdown-toggle)');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth < 991) {
                // Close mobile menu
                navbar.classList.remove('in');
                
                // Close all dropdowns
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('open');
                    const menu = dropdown.querySelector('.dropdown-menu');
                    if (menu) menu.style.display = 'none';
                });
            }
        });
    });

    // Handle blog link click on mobile
    if (blogLink) {
        blogLink.addEventListener('click', function() {
            if (window.innerWidth < 991) {
                navbar.classList.remove('in');
                // Close all dropdowns
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('open');
                    const menu = dropdown.querySelector('.dropdown-menu');
                    if (menu) menu.style.display = 'none';
                });
            }
        });
    }

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth >= 991) {
                // Reset dropdown styles for desktop view
                dropdowns.forEach(dropdown => {
                    const menu = dropdown.querySelector('.dropdown-menu');
                    if (menu) menu.style.display = '';
                });
            }
        }, 250);
    });
});