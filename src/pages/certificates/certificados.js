const container_certificados = document.getElementById("container_itens");
let certificadosPagina = []; // Declarar como variável global

// Função para buscar o JSON de certificados
async function fetchCertificados(caminho) {
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
function filterCertificados(certificados, category) {
  const filtrados =
    category === "all"
      ? certificados
      : certificados.filter((certificado) => certificado.type === category);

  renderizarCertificados(filtrados);
  updateActiveButton(category);
}

function updateActiveButton(activeCategory) {
  document.querySelectorAll(".filter-btn").forEach((button) => {
    button.classList.remove("selected");
  });

  const activeButton = document.querySelector(
    `.filter-btn[onclick="filterCertificados('${activeCategory}')"]`
  );
  if (activeButton) {
    activeButton.classList.add("selected");
  }
}


// Renderizar certificados no DOM
function renderizarCertificados(certificados) {
  clearContainerList();
  certificados.forEach((item) => {
    const itemCertificado = document.createElement("div");
    itemCertificado.classList.add("item");

    itemCertificado.innerHTML = `
      <embed src="../../assets/certificados/${item.pdf}" class="pdf" type="application/pdf">
      <h3>${item.titulo}</h3>
      <p>Data: ${item.data}</p>
    `;
    container_certificados.appendChild(itemCertificado);
  });
}

// Contar certificados por categoria
function getTotalCertificadosByCategory(certificados, category) {
  return certificados.filter((it) => it.type === category).length;
}

// Limpar o container de certificados
function clearContainerList() {
  container_certificados.innerHTML = "";
}

// Carregar certificados e armazenar em certificadosPagina
fetchCertificados("../../assets/certificados/certificados.json").then((dados) => {
  certificadosPagina = dados.map((certificado) => ({
    pdf: certificado.pdf,
    titulo: certificado.titulo,
    data: certificado.data,
    type: certificado.type,
  }));

  // Atualizar contadores nos botões
  document.getElementById("btn-all").innerText = `Todas ${certificadosPagina.length}`;
  document.getElementById(
    "btn-eventos"
  ).innerText = `Eventos ${getTotalCertificadosByCategory(certificadosPagina, "eventos")}`;
  document.getElementById(
    "btn-alura"
  ).innerText = `Alura ${getTotalCertificadosByCategory(certificadosPagina, "alura")}`;
  document.getElementById(
    "btn-rocketseat"
  ).innerText = `Rocketseat ${getTotalCertificadosByCategory(certificadosPagina, "rocketseat")}`;
  document.getElementById(
    "btn-faculdade"
  ).innerText = `Faculdade ${getTotalCertificadosByCategory(certificadosPagina, "faculdade")}`;

  renderizarCertificados(certificadosPagina);
});

