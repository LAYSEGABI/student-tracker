// Array de usuários com URLs específicas
const users = [
  {
    email: "teste1@email.com",
    password: "123",
    redirectURL: "src/pages/home/home.html",
  },
  {
    email: "admin@email.com",
    password: "123",
    redirectURL: "src/adm/pages/home/home_adm.html",
  },
  {
    email: "teste3@email.com",
    password: "123",
    redirectURL: "src/pages/home/home.html",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const errorMessage = document.getElementById("errorMessage");

      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        errorMessage.textContent = "";
        window.location.href = user.redirectURL;
      } else {
        errorMessage.textContent = "Email ou senha incorretos.";
      }
    });
  }
});

// Lista de imagens
const images = [
  "src/assets/img/fundo-banner.png",
  "src/assets/img/fundo-banner2.png",
  "src/assets/img/fundo-banner3.png",
];

// Selecionar o elemento com a classe "container_geral"
const container = document.getElementsByClassName("container_geral")[0];

let currentIndex = 0;

// Definir o fundo inicial sem delay
if (container) {
  container.style.backgroundImage = `url(${images[currentIndex]})`;
}

// Função para trocar a imagem de fundo com efeito
function changeBackground() {
  if (container) {
    // Adicionar a classe de fade-out
    container.classList.add("hidden");

    setTimeout(() => {
      // Mudar a imagem quando estiver invisível
      currentIndex = (currentIndex + 1) % images.length; // Próxima imagem no loop
      container.style.backgroundImage = `url(${images[currentIndex]})`;

      // Remover a classe de fade-out para o fade-in
      container.classList.remove("hidden");
    }, 1000); // Tempo de transição igual ao do CSS
  }
}

// Trocar a imagem de fundo a cada 5 segundos
setInterval(changeBackground, 5000);
