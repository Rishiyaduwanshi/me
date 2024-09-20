
  // JavaScript to show/hide the button and scroll to top
  document.addEventListener('DOMContentLoaded', function () {
    const goTopBtn = document.getElementById('goTopBtn');

    // Show or hide the button based on scroll position
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) { // Show button if scrolled more than 300px
        goTopBtn.style.display = 'flex';
      } else {
        goTopBtn.style.display = 'none';
      }
    });

    // Scroll to top on button click
    goTopBtn.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default anchor behavior
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

