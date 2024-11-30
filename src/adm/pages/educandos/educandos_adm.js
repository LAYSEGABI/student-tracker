const container_educandos = document.getElementById("container_educandos");
let educandosPagina = [];

console.log(container_educandos);

// Função para buscar o JSON de educandos
async function fetchEducandos(caminho) {
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
function filterEducandos(educandos, category) {
  const filtrados =
    category === "all"
      ? educandos
      : educandos.filter((educando) => educando.category === category);

  renderizarEducandos(filtrados);
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
    filterEducandos(educandosPagina, category);
  });
});

// Função de renderização dos educandos
function renderizarEducandos(educandos) {
  clearContainerList();

  educandos.forEach((item) => {
    const itemEducando = document.createElement("div");
    itemEducando.classList.add("item_educando");

    itemEducando.innerHTML = `
      <img src="${item.image}" alt="${item.nome}">
      <h3>${item.nome}</h3>
      <div class="item_tags">
                <p>${item.unidade}</p>
                <p>${item.curso}</p>
            </div>

    `;

    // Adiciona o evento de clique para abrir o modal
    itemEducando.addEventListener("click", () => {
      openModal(item);
    });

    container_educandos.appendChild(itemEducando);
  });
}

// Função para abrir o modal com a descrição do educando
function openModal(educando) {
  // Preenche os dados do modal
  document.getElementById("modalTitle").textContent = educando.title;
  document.getElementById("modalDescription").textContent =
    educando.description;

  // Mostra o modal
  document.getElementById("educandoModal").style.display = "block";
}

// Fechar o modal ao clicar no botão de fechar
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("educandoModal").style.display = "none";
});

// Fechar o modal quando clicar fora da área do conteúdo
window.addEventListener("click", (event) => {
  if (event.target === document.getElementById("educandoModal")) {
    document.getElementById("educandoModal").style.display = "none";
  }
});

// Contar educandos por categoria
function getTotalEducandosByCategory(educandos, category) {
  return educandos.filter((it) => it.category === category).length;
}

// Limpar o container de educandos
function clearContainerList() {
  container_educandos.innerHTML = "";
}

// Carregar educandos e armazenar em educandosPagina
fetchEducandos("educandos.json").then((dados) => {
  educandosPagina = dados.map((educando) => ({
    nome: educando.nome,
    image: educando.image,
    unidade: educando.unidade,
    curso: educando.curso,
    category: educando.category,
  }));

  // Atualizar contadores nos botões
  document.getElementById(
    "btn-all"
  ).innerText = `Todos (${educandosPagina.length})`;
  document.getElementById(
    "btn-pedra-branca"
  ).innerText = `Pedra branca (${getTotalEducandosByCategory(
    educandosPagina,
    "pedra-branca"
  )})`;
  document.getElementById(
    "btn-sc-401"
  ).innerText = `SC 401 (${getTotalEducandosByCategory(
    educandosPagina,
    "sc-401"
  )})`;

  renderizarEducandos(educandosPagina);

  console.log(container_educandos);
});
