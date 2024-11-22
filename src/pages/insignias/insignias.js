const container_insignias = document.getElementById("container_insignias");
let insigniasPagina = [];

console.log(container_insignias)

// Função para buscar o JSON de insígnias
async function fetchInsignias(caminho) {
  try {
    const response = await fetch(caminho);
    if (!response.ok) {
      throw new Error(`Erro ao carregar o arquivo: ${response.status}`);
    }
    return await response.json();
  } catch (erro) {
    console.error("Erro ao carregar o JSON:", erro);
    return [];
  }
}

// Função de filtro
function filterInsignias(insignias, category) {
  const filtrados =
    category === "all"
      ? insignias
      : insignias.filter((insignia) => insignia.category === category);

  renderizarInsignias(filtrados);
  updateActiveButton(category);
}

function updateActiveButton(activeCategory) {
  // Remover a classe 'selected' de todos os botões
  document.querySelectorAll(".filter-btn").forEach((button) => {
    button.classList.remove("selected");
  });

  // Selecionar o botão ativo pelo atributo 'data-category'
  const activeButton = document.querySelector(
    `.filter-btn[data-category="${activeCategory}"]`
  );
  console.log("Categoria ativa:", activeCategory);
  console.log("Botão ativo:", activeButton);

  // Adicionar a classe 'selected' ao botão ativo
  if (activeButton) {
    activeButton.classList.add("selected");
  }
}

document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");
    filterInsignias(insigniasPagina, category);
  });
});

// Função de renderização das insígnias
function renderizarInsignias(insignias) {
  clearContainerList();

  insignias.forEach((item) => {
    const itemInsignia = document.createElement("div");
    itemInsignia.classList.add("item_insignia");

    itemInsignia.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <h3>${item.title}</h3>
    `;

    // Adiciona o evento de clique para abrir o modal
    itemInsignia.addEventListener("click", () => {
      openModal(item);
    });

    container_insignias.appendChild(itemInsignia);
  });
}

// Função para abrir o modal com a descrição da insígnia
function openModal(insignia) {
  // Preenche os dados do modal
  document.getElementById("modalTitle").textContent = insignia.title;
  document.getElementById("modalDescription").textContent = insignia.description;

  // Mostra o modal
  document.getElementById("insigniaModal").style.display = "block";
}

// Fechar o modal ao clicar no botão de fechar
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("insigniaModal").style.display = "none";
});

// Fechar o modal quando clicar fora da área do conteúdo
window.addEventListener("click", (event) => {
  if (event.target === document.getElementById("insigniaModal")) {
    document.getElementById("insigniaModal").style.display = "none";
  }
});

// Contar insígnias por categoria
function getTotalInsigniasByCategory(insignias, category) {
  return insignias.filter((it) => it.category === category).length;
}

// Limpar o container de insígnias
function clearContainerList() {
  container_insignias.innerHTML = "";
}

// Carregar insígnias e armazenar em insigniasPagina
fetchInsignias("insignias.json").then((dados) => {
  insigniasPagina = dados.map((insignia) => ({
    title: insignia.title,
    image: insignia.image,
    description: insignia.description,
    category: insignia.category,
  }

));



  // Atualizar contadores nos botões
  document.getElementById("btn-all").innerText = `Todas (${insigniasPagina.length})`;
  document.getElementById(
    "btn-programming"
  ).innerText = `Programação (${getTotalInsigniasByCategory(insigniasPagina, "programming")})`;
  document.getElementById(
    "btn-design"
  ).innerText = `Design (${getTotalInsigniasByCategory(insigniasPagina, "design")})`;
  document.getElementById(
    "btn-marketing"
  ).innerText = `Marketing (${getTotalInsigniasByCategory(insigniasPagina, "marketing")})`;
  document.getElementById(
    "btn-empreendedorismo"
  ).innerText = `Empreendedorismo (${getTotalInsigniasByCategory(insigniasPagina, "empreendedorismo")})`;

  renderizarInsignias(insigniasPagina);

console.log(container_insignias)

});










/* Função para abrir o modal e alterar o conteúdo
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
  }*/
  