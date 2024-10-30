async function fetchGitHubData() {
    const username = 'rishiyaduwanshi';
    
    // Show loading spinners
    ['repo-count', 'stars-count', 'followers-count'].forEach(id => {
        document.getElementById(id).innerHTML = '<i class="fa fa-spinner fa-spin"></i>';
    });
    
    try {
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();
        
        // Fetch all repositories to calculate total stars
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!reposResponse.ok) throw new Error('Failed to fetch repos');
        const reposData = await reposResponse.json();
        
        // Calculate total stars
        const totalStars = reposData.reduce((total, repo) => total + repo.stargazers_count, 0);
        
        // Update stats with animation
        setTimeout(() => {
            document.getElementById('repo-count').textContent = userData.public_repos || '0';
            document.getElementById('followers-count').textContent = userData.followers || '0';
            document.getElementById('stars-count').textContent = totalStars || '0';
        }, 500);
        
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        // Show error message in stats
        ['repo-count', 'stars-count', 'followers-count'].forEach(id => {
            document.getElementById(id).innerHTML = '<i class="fa fa-exclamation-circle"></i>';
        });
    }
}

// Call the function when page loads
document.addEventListener('DOMContentLoaded', fetchGitHubData);
