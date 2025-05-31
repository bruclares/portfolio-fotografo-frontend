import { apiRequest } from './api.js';

const formularioRecuperaSenha = document.getElementById('form-recuperar-senha');

formularioRecuperaSenha.addEventListener('submit', async function (event) {
  event.preventDefault();
  const dadosFormulario = new FormData(formularioRecuperaSenha);
  const dados = Object.fromEntries(dadosFormulario.entries());

  try {
    const resposta = await apiRequest(
      '/api/auth/recuperar-senha',
      'POST',
      false,
      dados
    );

    formularioRecuperaSenha.reset();

    const alerta = document.querySelector('.alert');
    alerta.innerText = resposta.sucesso;

    alerta.classList.remove('alert-error');
    alerta.classList.add('alert-success', 'show');
  } catch (erro) {
    const alerta = document.querySelector('.alert');
    alerta.innerText = erro.message || 'Erro ao recuperar senha';
    alerta.classList.add('alert-error', 'show');
  }
});
