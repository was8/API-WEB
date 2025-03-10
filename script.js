document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('posts');
    const addPostButton = document.getElementById('addPost');
    const postTitleInput = document.getElementById('postTitle');
    const postBodyInput = document.getElementById('postBody');

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

    addPostButton.addEventListener('click', function() {
        const title = postTitleInput.value.trim();
        const body = postBodyInput.value.trim();

        if (!title || !body) {
            alert('Erro: O título e o corpo do post não podem estar vazios.');
            return;
        }

        const newPost = {
            title: title,
            body: body
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
            let posts = JSON.parse(localStorage.getItem('posts')) || [];
            posts.push(post);
            localStorage.setItem('posts', JSON.stringify(posts));
            alert('Post adicionado com sucesso! Atualize a página para ver todos os posts.');
            loadPosts();
        })
        .catch(error => console.error('Erro:', error));
    });

    window.deletePost = function(postId) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: 'DELETE'
        })
        .then(() => {
            let posts = JSON.parse(localStorage.getItem('posts')) || [];
            posts = posts.filter(post => post.id !== postId);
            localStorage.setItem('posts', JSON.stringify(posts));
            alert('Post deletado com sucesso! Atualize a página para ver as mudanças.');
            loadPosts();
        })
        .catch(error => console.error('Erro:', error));
    };

    function fetchData() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((json) => {
                const posts = json.slice(0, 10); 
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

    loadPosts();
    fetchData();
});