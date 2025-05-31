import getBackendURL from './utils.js';
import { apiRequest } from './api.js';

// Variável global para armazenar o cursor da próxima página
let proximaPagina = null;

// Array para armazenar todas as fotos carregadas
let todasFotos = [];

// Índice da foto atual no lightbox
let fotoAtualIndex = 0;

// Função para obter as fotos do servidor
function obterFotos(pasta) {
  async function obterFotos(pasta) {
    const dados = {
      next_cursor: proximaPagina,
      pasta: pasta,
    };

    const botao = document.querySelector('.proxima-pagina');
    botao.textContent = 'Carregando...';

    try {
      const dadosResposta = await apiRequest(
        '/api/cloudinary/fotos',
        'POST',
        false,
        dados
      );

      const galeria = document.getElementById('galeria-imagens');

      dadosResposta.fotos.forEach((foto) => {
        todasFotos.push(foto);

        const divImagem = document.createElement('div');
        divImagem.className = 'card-imagem';

        const imagem = document.createElement('img');
        imagem.src = foto.url;
        imagem.alt = foto.nome;

        divImagem.addEventListener('click', () => {
          const index = todasFotos.findIndex((item) => item.url === foto.url);
          abrirLightbox(index);
        });

        divImagem.appendChild(imagem);
        galeria.appendChild(divImagem);
      });

      proximaPagina = dadosResposta.proxima_pagina;
      botao.textContent = 'Carregar mais';

      if (!proximaPagina) {
        botao.style.display = 'none';
      }
    } catch (erro) {
      console.error('Erro ao carregar as fotos:', erro);
      botao.textContent = 'Carregar mais';

      if (!document.getElementById('mensagem-erro')) {
        const mensagemErro = document.createElement('div');
        mensagemErro.id = 'mensagem-erro';
        mensagemErro.style.color = 'red';
        mensagemErro.style.margin = '20px 0';
        document.querySelector('.pagina-conteudo').appendChild(mensagemErro);
      }

      document.getElementById('mensagem-erro').textContent =
        'Não foi possível carregar as fotos. Verifique se o servidor está rodando.';
    }
  }
}

// Função para abrir o lightbox
function abrirLightbox(index) {
  // Atualiza o índice da foto atual
  fotoAtualIndex = index;

  // Cria o lightbox se ele não existir
  if (!document.getElementById('lightbox')) {
    criarLightbox();
  }

  // Obtém o lightbox e o mostra
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'flex';

  // Carrega a foto atual no lightbox
  atualizarFotoLightbox();

  // Desabilita o scroll da página
  document.body.style.overflow = 'hidden';
}

// Função para criar o lightbox
function criarLightbox() {
  // Cria o container do lightbox
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';

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
    .querySelector('.lightbox-fechar')
    .addEventListener('click', function () {
      fecharLightbox();
    });

  // Fechar ao clicar fora da imagem
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      fecharLightbox();
    }
  });

  // Navegar para a foto anterior
  lightbox
    .querySelector('.lightbox-anterior')
    .addEventListener('click', function () {
      navegarLightbox(-1);
    });

  // Navegar para a próxima foto
  lightbox
    .querySelector('.lightbox-proxima')
    .addEventListener('click', function () {
      navegarLightbox(1);
    });

  // Adicionar eventos de teclado
  document.addEventListener('keydown', function (e) {
    if (
      !document.getElementById('lightbox') ||
      document.getElementById('lightbox').style.display === 'none'
    ) {
      return;
    }

    if (e.key === 'Escape') {
      fecharLightbox();
    } else if (e.key === 'ArrowLeft') {
      navegarLightbox(-1);
    } else if (e.key === 'ArrowRight') {
      navegarLightbox(1);
    }
  });

  // Adiciona o lightbox ao body
  document.body.appendChild(lightbox);
}

// Função para fechar o lightbox
function fecharLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'none';

  // Reabilita o scroll da página
  document.body.style.overflow = 'auto';
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
  const imagem = document.querySelector('.lightbox-imagem');
  imagem.src = foto.url;
  imagem.alt = foto.nome;
}

// Quando a página for carregada
document.addEventListener('DOMContentLoaded', function () {
  const galeria = document.getElementById('galeria-imagens');
  const pasta = galeria.getAttribute('data-pasta'); // Obtém o nome da pasta

  obterFotos(pasta); // Passa o nome da pasta para a função

  const botaoCarregar = document.querySelector('.proxima-pagina');
  botaoCarregar.addEventListener('click', function () {
    // Quando o botão for clicado, carrega mais fotos
    obterFotos(pasta); // Passa o nome da pasta ao carregar mais fotos
  });
});
