function loadComponent(elementId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => document.getElementById(elementId).innerHTML = data)
        .catch(error => console.error('Erro ao carregar o componente:', error));
}

// Chame a função para carregar o menu lateral e a barra de navegação
loadComponent('navbar', 'src/pages/nav-bar/nav_bar.html');
loadComponent('sidebar', 'src/pages/side bar/side_bar.html');

const toggleButton = document.getElementById('toggleButton');
const sidebar = document.querySelector('.sidebar');

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('retracted');
});
