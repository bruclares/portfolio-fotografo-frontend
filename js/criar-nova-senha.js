import getBackendURL from './utils.js';
let token = null;

document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  token = urlParams.get('token');
});

const formularioNovaSenha = document.getElementById('form-nova-senha');
formularioNovaSenha.addEventListener('submit', async function (event) {
  event.preventDefault();
  const dadosFormulario = new FormData(formularioNovaSenha);
  const dados = Object.fromEntries(dadosFormulario.entries());

  dados.token = token;

  try {
    let resposta = await fetch(`${getBackendURL()}/api/auth/resetar-senha`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    });

    resposta = await resposta.json();

    if ('erro' in resposta) {
      throw new Error(resposta.erro);
    }

    formularioNovaSenha.reset();

    const alerta = document.querySelector('.alert');
    alerta.innerText = resposta.sucesso;

    if (alerta.classList.contains('alert-error')) {
      alerta.classList.remove('alert-error');
    }
    alerta.classList.add('alert-success');

    if (!alerta.classList.contains('show')) {
      alerta.classList.add('show');
    }

    setTimeout(() => {
      window.location.href = 'login.html';
    }, 3000);
  } catch (erro) {
    const alerta = document.querySelector('.alert');
    alerta.innerText = erro;
    alerta.classList.add('alert-error');

    if (!alerta.classList.contains('show')) {
      alerta.classList.add('show');
    }
  }
});
