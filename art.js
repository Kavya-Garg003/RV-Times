async function fetchArticles() {
    // Replace this with your actual API endpoint
    const response = await fetch('/api/articles');

    if (response.ok) {
        const articles = await response.json();
        articles.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));

        const articlesSection = document.querySelector('.articles-section');
        articles.forEach((article) => {
            const articleElement = document.createElement('article');
            articleElement.innerHTML = `
        <h2>${article.title}</h2>
        <p>${article.excerpt}</p>
        <a href="/article/${article.id}">Read more</a>
      `;
            articlesSection.appendChild(articleElement);
        });
    } else {
        console.error('Could not fetch articles');
    }
}

fetchArticles();
