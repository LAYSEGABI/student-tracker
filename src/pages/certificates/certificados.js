const container_certificados = document.getElementById("container_itens");

const certificados = [
  {
    pdf: "../../assets/certificados_pdf/Certificado Java Foundation.pdf",
    thumbnail: "../../assets/certificados_pdf//WhatsApp Image 2024-11-13 at 22.51.06.jpeg",
    titulo: "Java",
    data: "23/07",
    type: "eventos",
  },
  { 
    pdf: "../../assets/certificados_pdf/Cópia de Layse Gabrielly Silva Lima.pdf",
    titulo: "Design", 
    data: "23/07", 
    type: "alura" 
},
  { 
    pdf: "../../assets/certificados_pdf/Cópia de Layse Gabrielly Silva Lima.pdf",
    titulo: "Figma", 
    data: "23/07", 
    type: "rocketseat" 
},
  { 
    pdf: "../../assets/certificados_pdf/Cópia de Layse Gabrielly Silva Lima.pdf",
    titulo: "Html e css", 
    data: "29/07", 
    type: "alura" 
},
{ 
    pdf: "../../assets/certificados_pdf/Cópia de Layse Gabrielly Silva Lima.pdf",
    titulo: "Html e css", 
    data: "29/07", 
    type: "eventos" 
}
];

function filterCertificados(category) {
  const filterCertificado =
    category === "all"
      ? certificados
      : certificados.filter((certificado) => certificado.type === category);

  renderizarCertificados(filterCertificado);
}

function renderizarCertificados(certificadosParaRenderizar) {
  clearContainerList();

  certificadosParaRenderizar.forEach((item) => {
    const itemCertificado = document.createElement("div");
    itemCertificado.classList.add("item");

    itemCertificado.innerHTML = `
      <h3>Titulo: ${item.titulo}</h3>
      <p>Data: ${item.data}</p>
      <embed src="${item.pdf}" width="400px" height="300px" type="application/pdf">
    `;

    container_certificados.appendChild(itemCertificado);
  });
}

function getTotalCertificadosByCategory(category) {
  return certificados.reduce(
    (acc, it) => (it.type === category ? acc + 1 : acc),
    0
  );
}

function clearContainerList() {
  while (container_certificados.firstChild) {
    container_certificados.removeChild(container_certificados.firstChild);
  }
}

function updateButtonLabels() {
  const totalEventos = getTotalCertificadosByCategory("eventos");
  const totalAlura = getTotalCertificadosByCategory("alura");
  const totalRocketseat = getTotalCertificadosByCategory("rocketseat");
  const totalAll = certificados.length;

  document.getElementById("btn-all").innerText = `Todas (${totalAll})`;
  document.getElementById(
    "btn-eventos"
  ).innerText = `Eventos (${totalEventos})`;
  document.getElementById("btn-alura").innerText = `Alura (${totalAlura})`;
  document.getElementById(
    "btn-rocketseat"
  ).innerText = `Rocketseat (${totalRocketseat})`;
}

// Atualiza os rótulos dos botões com o total de certificados
updateButtonLabels();

// Renderiza todos os certificados inicialmente
renderizarCertificados(certificados);

