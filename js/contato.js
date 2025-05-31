import { apiRequest } from './api.js';
import getBackendURL, { formatarTelefone } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const resposta = await apiRequest('/api/formas-contato', 'GET', false);
    // Verifica se a resposta tem a estrutura esperada
    if (
      !resposta ||
      !resposta.redesocial_perfil ||
      !resposta.email ||
      !resposta.telefone
    ) {
      throw new Error('Dados de contato incompletos na resposta da API');
    }

    const redeSocial = document.getElementById('redesocial');
    let redeSocialPerfil = resposta.redesocial_perfil.slice(
      resposta.redesocial_perfil.lastIndexOf('/') + 1
    );

    if (!redeSocialPerfil.includes('@')) {
      redeSocialPerfil = '@' + redeSocialPerfil;
    }

    const email = document.getElementById('email');
    const telefone = document.getElementById('contato-telefone');
    const telefoneFormatado = formatarTelefone(resposta.telefone);

    redeSocial.innerHTML = `${resposta.redesocial_nome}:<br>${redeSocialPerfil}`;
    redeSocial.href = resposta.redesocial_perfil;

    email.innerHTML = `email:<br>${resposta.email}`;
    telefone.innerHTML = `telefone:<br>${telefoneFormatado}`;
  } catch {
    console.log('Erro ao buscar os contatos');
  }
});

const formulario = document.querySelector('#form-contato');

formulario.addEventListener('submit', async function (event) {
  event.preventDefault();

  const dadosFormulario = new FormData(formulario);
  const dados = Object.fromEntries(dadosFormulario.entries());

  try {
    const resposta = await apiRequest('/api/contatos', 'POST', false, dados);

    if ('erro' in resposta) {
      throw new Error(resposta.erro);
    }

    formulario.reset();

    const alerta = document.querySelector('.alert');
    alerta.innerText = resposta.sucesso;

    if (alerta.classList.contains('alert-error')) {
      alerta.classList.remove('alert-error');
    }
    alerta.classList.add('alert-success');

    if (!alerta.classList.contains('show')) {
      alerta.classList.add('show');
    }
  } catch (erro) {
    const alerta = document.querySelector('.alert');
    alerta.innerText = erro;
    alerta.classList.add('alert-error');

    if (!alerta.classList.contains('show')) {
      alerta.classList.add('show');
    }
  }
});

document.getElementById('telefone').addEventListener('input', function (e) {
  e.target.value = formatarTelefone(e.target.value);
});
