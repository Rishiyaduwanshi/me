async function fetchPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const gistId = urlParams.get('id');
    
    if (!gistId) {
        // Change the redirect to absolute path
        window.location.href = '/blog';
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/gists/${gistId}`);
        const gist = await response.json();
        
        const firstFile = Object.values(gist.files)[0];
        const updateDate = new Date(gist.updated_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Update page title
        document.title = `${gist.description} - Abhinav's Blog`;

        const blogPost = document.getElementById('blogPost');
        blogPost.innerHTML = `
            <h1>${gist.description}</h1>
            <div class="meta">
                <span class="date">${updateDate}</span>
                <span class="filename">${firstFile.filename}</span>
            </div>
            <div class="blog-content">
                ${await fetchAndFormatContent(firstFile.raw_url)}
            </div>
        `;
    } catch (error) {
        console.error('Error fetching post:', error);
        document.getElementById('blogPost').innerHTML = `
            <div class="error">Failed to load blog post. Please try again later.</div>
        `;
    }
}

async function fetchAndFormatContent(rawUrl) {
    const response = await fetch(rawUrl);
    const content = await response.text();
    
    return content
        // Headers with emoji support
        .replace(/^### \*\*(.*?)\*\*$/gm, '<h3>$1</h3>')
        .replace(/^## \*\*(.*?)\*\*$/gm, '<h2>$1</h2>')
        .replace(/^# \*\*(.*?)\*\*$/gm, '<h1>$1</h1>')
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        
        // Tables - Fixed version
        .replace(/^\|([^\n]+)\|\s*$/gm, (match, content) => {
            const cells = content.split('|').map(cell => cell.trim());
            const isHeader = match.includes('---');
            if (isHeader) return '';
            
            const row = cells.map(cell => {
                // Handle special characters and emojis with smaller size
                const processedCell = cell
                    .replace(/✅/g, '<span class="emoji success">✓</span>')
                    .replace(/❌/g, '<span class="emoji error">×</span>')
                    .replace(/`([^`]+)`/g, '<code>$1</code>')
                    .replace(/📊/g, '<span class="emoji table">📊</span>')
                    .replace(/🤩/g, '<span class="emoji star">🤩</span>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                return `<td>${processedCell || '&nbsp;'}</td>`;
            }).join(''); 
            
            return `<tr>${row}</tr>`;
        })
        .replace(/(\|[-|\s]+\|\s*\n)/g, '')
        .replace(/((<tr>.*?<\/tr>\s*\n?)+)/g, (match) => {
            const rows = match.trim().split('\n');
            const headerRow = rows[0].replace(/<td>/g, '<th>').replace(/<\/td>/g, '</th>');
            const bodyRows = rows.slice(1).join('\n');
            return `<div class="table-container"><table><thead>${headerRow}</thead><tbody>${bodyRows}</tbody></table></div>`;
        })
        
        // Code blocks with enhanced styling
        .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
            const uniqueId = 'code-' + Math.random().toString(36).substring(2, 9);
            return `
                <div class="code-block ${lang || ''}">
                    <div class="code-block-header">
                        ${lang ? `<span class="language">${lang}</span>` : ''}
                        <button class="copy-btn" onclick="copyCode('${uniqueId}')">
                            <i class="fa fa-copy"></i>
                        </button>
                    </div>
                    <pre><code id="${uniqueId}">${code.trim()}</code></pre>
                </div>`;
        })
        
        // Emojis with better styling
        .replace(/:([\w+-]+):/g, '<span class="emoji">$1</span>')
        
        // Bold and Italic with preserved emojis
        .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        
        // Lists with better spacing
        .replace(/^\s*[-+*]\s+(.*)/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)\s+(?=<li>)/g, '$1</ul><ul>')
        .replace(/(?:^<li>)/m, '<ul><li>')
        .replace(/(?:<\/li>$)/m, '</li></ul>')
        
        // Links and Images
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="blog-image">')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
        
        // Horizontal rules with better styling
        .replace(/^---+$/gm, '<hr class="blog-divider">')
        .replace(/^--+$/gm, '<hr class="blog-divider light">')
        
        // Paragraphs with better spacing
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>')
        .trim();
}

// Add copy functionality
function copyCode(elementId) {
    const codeElement = document.getElementById(elementId);
    const text = codeElement.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        const btn = codeElement.parentElement.parentElement.querySelector('.copy-btn i');
        btn.className = 'fa fa-check';
        setTimeout(() => {
            btn.className = 'fa fa-copy';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Update meta tags when post loads
function updateMetaTags(title, content) {
    document.title = `${title} - Abhinav's Blog`;
    document.querySelector('meta[name="description"]').content = content.substring(0, 160);
    document.querySelector('meta[property="og:title"]').content = title;
    document.querySelector('meta[property="og:description"]').content = content.substring(0, 160);
}

document.addEventListener('DOMContentLoaded', fetchPost);