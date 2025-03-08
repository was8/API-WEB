document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('posts');
    const addPostButton = document.getElementById('addPost');

    // Função para carregar posts
    function loadPosts() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(posts => {
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
            });
    }

    // Função para adicionar um novo post
    addPostButton.addEventListener('click', function() {
        const newPost = {
            title: 'Novo Post',
            body: 'Este é um novo post adicionado via JavaScript.',
            userId: 1
        };

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        })
        .then(response => response.json())
        .then(post => {
            alert('Post adicionado com sucesso!');
            loadPosts();
        });
    });

    // Função para deletar um post
    window.deletePost = function(postId) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Post deletado com sucesso!');
                loadPosts();
            }
        });
    };

    // Carregar posts ao carregar a página
    loadPosts();
});