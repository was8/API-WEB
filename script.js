document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('posts');
    const addPostButton = document.getElementById('addPost');
    const postTitleInput = document.getElementById('postTitle');
    const postBodyInput = document.getElementById('postBody');

    // Função para carregar posts do localStorage
    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <img src="https://picsum.photos/200/100?random=${post.id}" alt="Random Image">
                <button onclick="deletePost(${post.id})">Deletar</button>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    // Função para adicionar um novo post ao localStorage
    addPostButton.addEventListener('click', function() {
        const title = postTitleInput.value.trim();
        const body = postBodyInput.value.trim();

        if (!title || !body) {
            alert('Erro: O título e o corpo do post não podem estar vazios.');
            return;
        }

        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const newPost = {
            id: Date.now(),
            title: title,
            body: body
        };
        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));
        alert('Post adicionado com sucesso!');
        loadPosts();
    });

    // Função para deletar um post do localStorage
    window.deletePost = function(postId) {
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts = posts.filter(post => post.id !== postId);
        localStorage.setItem('posts', JSON.stringify(posts));
        alert('Post deletado com sucesso!');
        loadPosts();
    };

    // Função para buscar múltiplos dados da API e adicionar ao contêiner de posts
    function fetchData() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((json) => {
                const posts = json.slice(0, 5); // Limitar a 5 posts
                posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.className = 'post';
                    postElement.innerHTML = `
                        <h2>${post.title}</h2>
                        <p>${post.body}</p>
                        <img src="https://picsum.photos/200/100?random=${post.id}" alt="Random Image">
                        <button onclick="deleteApiPost(${post.id})">Deletar</button>
                    `;
                    postElement.querySelector('button').addEventListener('click', function() {
                        postElement.remove();
                    });
                    postsContainer.appendChild(postElement);
                });
            })
            .catch((error) => console.error('Erro:', error));
    }

    // Carregar posts ao carregar a página
    loadPosts();
    fetchData();
});