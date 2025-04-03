// Variável global para armazenar o cursor da próxima página
let proximaPagina = null;

// Array para armazenar todas as fotos carregadas
let todasFotos = [];

// Índice da foto atual no lightbox
let fotoAtualIndex = 0;

// Função para obter as fotos do servidor
function obterFotos(pasta) {
  // Criando o objeto de dados para enviar ao servidor - Dados da requisição
  const dados = {
    next_cursor: proximaPagina,
    pasta: pasta, // Adiciona o nome da pasta ao objeto de dados
  };

  // Exibir indicador de carregamento
  const botao = document.querySelector(".proxima-pagina");
  botao.textContent = "Carregando...";

  // Fazendo a requisição para o servidor
  fetch("https://portfolio-fotografo-backend.vercel.app/api/cloudinary/fotos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  })
    .then(function (resposta) {
      // Converte a resposta para JSON
      return resposta.json();
    })
    .then(function (dados) {
      // Obtém o elemento da galeria onde as fotos serão exibidas
      const galeria = document.getElementById("galeria-imagens");

      // Para cada foto retornada, cria os elementos HTML
      dados.fotos.forEach(function (foto) {
        // Adiciona foto ao array de todas as fotos
        todasFotos.push(foto);

        // Cria uma div para conter a imagem
        const divImagem = document.createElement("div");
        divImagem.className = "card-imagem";

        // Cria o elemento de imagem
        const imagem = document.createElement("img");
        imagem.src = foto.url;
        imagem.alt = foto.nome;

        // Adiciona evento de clique na imagem
        divImagem.addEventListener("click", function () {
          // Encontra o índice da foto no array de todas as fotos
          const index = todasFotos.findIndex((item) => item.url === foto.url);
          abrirLightbox(index);
        });

        // Adiciona a imagem dentro da div
        divImagem.appendChild(imagem);

        // Adiciona a div na galeria
        galeria.appendChild(divImagem);
      });

      // Armazena o cursor para a próxima página
      proximaPagina = dados.proxima_pagina;

      // Restaura o texto do botão
      botao.textContent = "Carregar mais";

      // Se não houver mais fotos, esconde o botão
      if (!proximaPagina) {
        botao.style.display = "none";
      }
    })
    .catch(function (erro) {
      // Em caso de erro, mostra no console
      console.error("Erro ao carregar as fotos:", erro);

      // Restaura o texto do botão
      const botao = document.querySelector(".proxima-pagina");
      botao.textContent = "Carregar mais";

      // Cria um elemento para mostrar o erro (se não existir)
      if (!document.getElementById("mensagem-erro")) {
        const mensagemErro = document.createElement("div");
        mensagemErro.id = "mensagem-erro";
        mensagemErro.style.color = "red";
        mensagemErro.style.margin = "20px 0";
        document.querySelector(".pagina-conteudo").appendChild(mensagemErro);
      }

      // Exibe a mensagem de erro
      document.getElementById("mensagem-erro").textContent =
        "Não foi possível carregar as fotos. Verifique se o servidor está rodando.";
    });
}

// Função para abrir o lightbox
function abrirLightbox(index) {
  // Atualiza o índice da foto atual
  fotoAtualIndex = index;

  // Cria o lightbox se ele não existir
  if (!document.getElementById("lightbox")) {
    criarLightbox();
  }

  // Obtém o lightbox e o mostra
  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "flex";

  // Carrega a foto atual no lightbox
  atualizarFotoLightbox();

  // Desabilita o scroll da página
  document.body.style.overflow = "hidden";
}

// Função para criar o lightbox
function criarLightbox() {
  // Cria o container do lightbox
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";

  // Adiciona o HTML interno do lightbox
  lightbox.innerHTML = `
    <div class="lightbox-conteudo">
      <button class="lightbox-fechar">&times;</button>
      <button class="lightbox-anterior">&larr;</button>
      <div class="lightbox-imagem-container">
        <img src="" alt="" class="lightbox-imagem">
      </div>
      <button class="lightbox-proxima">&rarr;</button>
    </div>
  `;

  // Adiciona eventos

  // Fechar ao clicar no botão de fechar
  lightbox
    .querySelector(".lightbox-fechar")
    .addEventListener("click", function () {
      fecharLightbox();
    });

  // Fechar ao clicar fora da imagem
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      fecharLightbox();
    }
  });

  // Navegar para a foto anterior
  lightbox
    .querySelector(".lightbox-anterior")
    .addEventListener("click", function () {
      navegarLightbox(-1);
    });

  // Navegar para a próxima foto
  lightbox
    .querySelector(".lightbox-proxima")
    .addEventListener("click", function () {
      navegarLightbox(1);
    });

  // Adicionar eventos de teclado
  document.addEventListener("keydown", function (e) {
    if (
      !document.getElementById("lightbox") ||
      document.getElementById("lightbox").style.display === "none"
    ) {
      return;
    }

    if (e.key === "Escape") {
      fecharLightbox();
    } else if (e.key === "ArrowLeft") {
      navegarLightbox(-1);
    } else if (e.key === "ArrowRight") {
      navegarLightbox(1);
    }
  });

  // Adiciona o lightbox ao body
  document.body.appendChild(lightbox);
}

// Função para fechar o lightbox
function fecharLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "none";

  // Reabilita o scroll da página
  document.body.style.overflow = "auto";
}

// Função para navegar entre as fotos
function navegarLightbox(direcao) {
  // Calcula o novo índice
  fotoAtualIndex += direcao;

  // Se chegou ao início, volta para o final
  if (fotoAtualIndex < 0) {
    fotoAtualIndex = todasFotos.length - 1;
  }

  // Se chegou ao final, volta para o início
  if (fotoAtualIndex >= todasFotos.length) {
    fotoAtualIndex = 0;
  }

  // Atualiza a foto no lightbox
  atualizarFotoLightbox();
}

// Função para atualizar a foto no lightbox
function atualizarFotoLightbox() {
  // Obtém a foto atual
  const foto = todasFotos[fotoAtualIndex];

  // Atualiza a imagem
  const imagem = document.querySelector(".lightbox-imagem");
  imagem.src = foto.url;
  imagem.alt = foto.nome;
}

// Quando a página for carregada
document.addEventListener("DOMContentLoaded", function () {
  const galeria = document.getElementById("galeria-imagens");
  const pasta = galeria.getAttribute("data-pasta"); // Obtém o nome da pasta

  obterFotos(pasta); // Passa o nome da pasta para a função

  const botaoCarregar = document.querySelector(".proxima-pagina");
  botaoCarregar.addEventListener("click", function () {
    // Quando o botão for clicado, carrega mais fotos
    obterFotos(pasta); // Passa o nome da pasta ao carregar mais fotos
  });
});
