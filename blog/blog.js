async function fetchGists() {
    try {
        const response = await fetch('https://api.github.com/users/rishiyaduwanshi/gists');
        const gists = await response.json();
        
        const blogPosts = document.getElementById('blogPosts');
        blogPosts.innerHTML = ''; 
        
        gists.forEach(gist => {
            if (gist.description) {
                const firstFile = Object.values(gist.files)[0];
                const updateDate = new Date(gist.updated_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                const blogCard = document.createElement('article');
                blogCard.className = 'blog-card';
                blogCard.innerHTML = `
                    <h2>${gist.description}</h2>
                    <div class="meta">
                        <span class="date"><i class="fa fa-calendar"></i> ${updateDate}</span>
                    </div>
                    <p class="preview">${getPreview(firstFile.filename)}</p>
                    <a href="post/?id=${gist.id}" class="read-more">
                        Read More <i class="fa fa-arrow-right"></i>
                    </a>
                `;
                
                blogPosts.appendChild(blogCard);
            }
        });
    } catch (error) {
        console.error('Error fetching gists:', error);
        document.getElementById('blogPosts').innerHTML = `
            <div class="error"><i class="fa fa-exclamation-triangle"></i> Failed to load blog posts. Please try again later.</div>
        `;
    }
}

function getPreview(filename) {
    // Generate a preview based on the filename
    return `Click to read the full article about ${filename.replace(/\.[^/.]+$/, "")}...`;
}

// Load blogs when page loads
document.addEventListener('DOMContentLoaded', fetchGists);