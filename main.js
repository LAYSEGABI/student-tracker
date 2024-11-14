const toggleButton = document.getElementById('toggleButton');
const sidebar = document.querySelector('.sidebar');
const container = document.querySelector('.container');

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('retracted');
    container.classList.toggle('retracted');

});

// Função para adicionar a classe "ativo" ao link correspondente à página
function setActivePage() {
    // Obtém todos os links do sidebar
    const links = document.querySelectorAll('.sidebar nav ul li a');
  
    // Verifica a URL atual da página
    const currentPage = window.location.pathname;
    console.log(currentPage)
  
    // Verifica cada link e adiciona/remover a classe ativo
    links.forEach(link => {
      const linkHref = link.getAttribute('href');
    console.log(linkHref)
      
      // Normaliza o link e a URL da página para comparações
      if (currentPage.includes(linkHref)) {
        link.classList.add('ativo');  // Adiciona a classe "ativo" ao link correspondente
      } else {
        link.classList.remove('ativo');  // Remove a classe "ativo" dos outros links
      }
    });
  }
  
  // Chama a função ao carregar a página
  window.addEventListener('load', setActivePage);
  