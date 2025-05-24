import getBackendURL, { formatarTelefone } from './utils.js';
let token = null;
let id = null;

document.addEventListener('DOMContentLoaded', async () => {
  try {
    let resposta = await fetch(`${getBackendURL()}/api/formas-contato`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    resposta = await resposta.json();

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
    let resposta = await fetch(`${getBackendURL()}/api/formas-contato/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(dados),
    });

    resposta = await resposta.json();
    if ('erro' in resposta) {
      throw new Error(resposta.erro);
    }

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
