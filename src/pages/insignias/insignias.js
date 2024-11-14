document.addEventListener('DOMContentLoaded', function () {
    filterCategory('all'); // Chama a função com a categoria 'all' ao carregar
});

function filterCategory(category) {
    const items = document.querySelectorAll('.item');
    const buttons = document.querySelectorAll('.filter-btn');  // Seleciona todos os botões

    // Remover a classe 'selected' de todos os botões
    buttons.forEach(button => {
        button.classList.remove('selected');
    });

    // Adicionar a classe 'selected' ao botão clicado
    const activeButton = document.querySelector(`.filter-btn[onclick="filterCategory('${category}')"]`);
    activeButton.classList.add('selected');

    // Filtrar os itens
    items.forEach(item => {
        if (category === 'all') {
            item.classList.add('visible');
        } else if (item.classList.contains(category)) {
            item.classList.add('visible');
        } else {
            item.classList.remove('visible');
        }
    });
}


// Função para abrir o modal e alterar o conteúdo
function openModal(title, description) {
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalDescription").textContent = description;
    document.getElementById("insigniaModal").style.display = "flex"; // Exibe o modal
  }
  
  // Função para fechar o modal
  function closeModal() {
    document.getElementById("insigniaModal").style.display = "none"; // Esconde o modal
  }
  
  // Fecha o modal se o usuário clicar fora dele
  window.onclick = function(event) {
    if (event.target == document.getElementById("insigniaModal")) {
      closeModal();
    }
  }
  