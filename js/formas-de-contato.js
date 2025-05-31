import getBackendURL, { formatarTelefone } from './utils.js';
import { apiRequest } from './api.js';

let token = null;
let id = null;

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const resposta = await apiRequest('/api/formas-contato/admin', 'GET', true);

    if ('erro' in resposta) {
      throw new Error(resposta.erro);
    }

    const redesocialNome = document.getElementById('redesocial_nome');
    const redesocialPerfil = document.getElementById('redesocial_perfil');
    const email = document.getElementById('email');
    const telefone = document.getElementById('telefone');
    const telefoneFormatado = formatarTelefone(resposta.telefone);

    redesocialNome.value = resposta.redesocial_nome;
    redesocialPerfil.value = resposta.redesocial_perfil;
    email.value = resposta.email;
    telefone.value = telefoneFormatado;
    id = resposta.id;
  } catch (erro) {
    const alerta = document.querySelector('.alert');
    alerta.innerText = erro;
    alerta.classList.add('alert-error');

    if (!alerta.classList.contains('show')) {
      alerta.classList.add('show');
    }
  }
});

document.getElementById('telefone').addEventListener('input', (event) => {
  event.target.value = formatarTelefone(event.target.value);
});

const formularioFormasContato = document.getElementById('formas-contato');

formularioFormasContato.addEventListener('submit', async (event) => {
  event.preventDefault();
  const dadosFormulario = new FormData(formularioFormasContato);
  const dados = Object.fromEntries(dadosFormulario.entries());

  try {
    const resposta = await apiRequest(
      `/api/formas-contato/${id}`,
      'POST',
      true,
      dados
    );
    const alerta = document.querySelector('.alert');
    alerta.innerText = resposta.sucesso;
    alerta.classList.remove('alert-error');
    alerta.classList.add('alert-success', 'show');
  } catch (erro) {
    const alerta = document.querySelector('.alert');
    alerta.innerText = erro.message || 'Erro ao salvar';
    alerta.classList.add('alert-error', 'show');
  }
});
