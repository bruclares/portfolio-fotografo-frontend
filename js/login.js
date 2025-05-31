import getBackendURL from './utils.js';
import { apiRequest } from './api.js';

const formularioLogin = document.getElementById('form-autenticacao');
formularioLogin.addEventListener('submit', async function (event) {
  event.preventDefault();
  const dadosFormulario = new FormData(formularioLogin);
  const dados = Object.fromEntries(dadosFormulario.entries());

  try {
    const resposta = await apiRequest('/api/auth/login', 'POST', false, dados);

    formularioLogin.reset();

    localStorage.setItem('token', resposta.token);
    window.location.href = 'mensagens.html';
  } catch (erro) {
    const alerta = document.querySelector('.alert');
    alerta.innerText = erro.message || 'Erro no login';
    alerta.classList.add('alert-error', 'show');
  }
});
