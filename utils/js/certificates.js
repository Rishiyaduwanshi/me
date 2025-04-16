function createCertificateCard(certificate) {
    const card = document.createElement('div');
    card.innerHTML = `
        <div class="certificate-item wow fadeInUp">
            <img src="${certificate.image}" alt="${certificate.name}" class="cert-thumbnail lazy" data-src="${certificate.image}">
            <div class="cert-overlay">
                <h4>${certificate.name}</h4>
                <div class="cert-details">
                    <div class="cert-issuer">${certificate.issuer}   &nbsp;|&nbsp;
                        <span class="cert-date">   ${certificate.date}</span> 
                    </div>
                    <div class="cert-description">${certificate.description}</div>
                </div>
                <button class="view-cert-btn" onclick="openCertificate('${certificate.image}')">
                    View Certificate
                </button>
            </div>
        </div>
    `;
    return card;
}

function lazyLoadImages() {
    const images = document.querySelectorAll('img.lazy');
    images.forEach(img => {
        img.onerror = () => {
            img.src = 'images/fallback-image.jpg';
            img.alt = 'Image failed to load';
        };
    });
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

async function displayCertificates() {
    const container = document.getElementById('certificatesContainer');
    container.innerHTML = '<div class="loading-spinner"></div>';

    try {
        const response = await fetch('data/certificates.json');
        const data = await response.json();

        container.innerHTML = ''; 
        data.certificates.forEach(certificate => {
            const card = createCertificateCard(certificate);
            container.appendChild(card);
        });

        lazyLoadImages();

    } catch (error) {
        console.error('Error loading certificates:', error);
        container.innerHTML = '<p class="text-center">Failed to load certificates</p>';
    }
}

function openCertificate(imgSrc) {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('certModalImg');
    modal.style.display = "block";
    modalImg.src = imgSrc;
}

document.querySelector('.close-modal').onclick = function () {
    document.getElementById('certModal').style.display = "none";
}

document.getElementById('certModal').onclick = function (e) {
    if (e.target === this) {
        this.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    displayCertificates();

    const container = document.getElementById('certificatesContainer');
    const scrollLeftBtn = document.querySelector('.cert-scroll-left');
    const scrollRightBtn = document.querySelector('.cert-scroll-right');

    if (scrollLeftBtn && scrollRightBtn) {
        scrollLeftBtn.addEventListener('click', () => {
            if (container.scrollLeft === 0) {
                container.scrollTo({
                    left: container.scrollWidth,
                    behavior: 'smooth'
                });
            } else {
                container.scrollBy({
                    left: -360,
                    behavior: 'smooth'
                });
            }
        });

        scrollRightBtn.addEventListener('click', () => {
            if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
                container.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            } else {
                container.scrollBy({
                    left: 360,
                    behavior: 'smooth'
                });
            }
        });

        container.addEventListener('scroll', () => {
            scrollLeftBtn.style.opacity = '1';
            scrollRightBtn.style.opacity = '1';
        });
    }
});