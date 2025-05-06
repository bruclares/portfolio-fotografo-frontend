import getBackendURL, { getHtmlMensagem } from './utils.js';

document.addEventListener('DOMContentLoaded', async function () {
  // Elementos da página
  const mensagensContainer = document.getElementById('mensagens-container');
  const primeiroBtn = document.getElementById('primeiro-btn');
  const anteriorBtn = document.getElementById('anterior-btn');
  const proximoBtn = document.getElementById('proximo-btn');
  const ultimoBtn = document.getElementById('ultimo-btn');
  const infoPagina = document.getElementById('info-pagina');
  const alerta = document.querySelector('.alert');

  // Configurações de paginação
  const mensagensPorPagina = 5;
  let mensagens = [];
  let paginaAtual = 1;
  let totalPaginas = 1;

  // Função para carregar mensagens da API
  async function carregarMensagens() {
    try {
      let resposta = await fetch(
        `${getBackendURL()}/api/contatos?pagina=${paginaAtual}&por_pagina=${mensagensPorPagina}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      resposta = await resposta.json();

      if ('erro' in resposta) {
        throw new Error(resposta.erro);
      }

      // atualizar com dados paginados
      mensagens = resposta.dados;
      totalPaginas = resposta.total_paginas;

      // Atualizar a exibição
      atualizarPaginacao();
      exibirMensagens();
    } catch (erro) {
      alerta.innerText = erro;
      alerta.classList.add('alert-error');

      if (!alerta.classList.contains('show')) {
        alerta.classList.add('show');
      }
    }
  }

  // Função para exibir as mensagens da página atual
  function exibirMensagens() {
    // Limpar container
    mensagensContainer.innerHTML = '';

    // Adicionar mensagens ao container
    mensagens.forEach((mensagem) => {
      mensagensContainer.insertAdjacentHTML(
        'beforeend',
        getHtmlMensagem(mensagem)
      );
    });
  }

  // Função para atualizar os controles de paginação
  function atualizarPaginacao() {
    // Atualizar texto da página
    infoPagina.textContent = `Página ${paginaAtual} de ${totalPaginas}`;

    // Habilitar/desabilitar botões
    primeiroBtn.disabled = paginaAtual === 1;
    anteriorBtn.disabled = paginaAtual === 1;
    proximoBtn.disabled = paginaAtual === totalPaginas;
    ultimoBtn.disabled = paginaAtual === totalPaginas;
  }

  // Event listeners para os botões de paginação
  primeiroBtn.addEventListener('click', () => {
    paginaAtual = 1;
    carregarMensagens();
  });

  anteriorBtn.addEventListener('click', () => {
    if (paginaAtual > 1) {
      paginaAtual--;
      carregarMensagens();
    }
  });

  proximoBtn.addEventListener('click', () => {
    if (paginaAtual < totalPaginas) {
      paginaAtual++;
      carregarMensagens();
    }
  });

  ultimoBtn.addEventListener('click', () => {
    paginaAtual = totalPaginas;
    carregarMensagens();
  });

  // Carregar mensagens quando a página é aberta
  carregarMensagens();
});
