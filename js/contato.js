import getBackendURL, { formatarTelefone } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    let resposta = await fetch(`${getBackendURL()}/api/formas-contato`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(resposta);

    resposta = await resposta.json();

    const redeSocial = document.getElementById('redesocial');
    let redeSocialPerfil = resposta.redesocial_perfil.slice(
      resposta.redesocial_perfil.lastIndexOf('/') + 1
    );

    if (!redeSocialPerfil.includes('@')) {
      redeSocialPerfil = '@' + redeSocialPerfil;
    }

    console.log(redeSocialPerfil);

    redeSocial.innerHTML = `${resposta.redesocial_nome}:<br>${redeSocialPerfil}`;
    redeSocial.href = resposta.redesocial_perfil;
  } catch {
    console.log('erro ao buscar trololo');
  }
});

const formulario = document.querySelector('#form-contato');

formulario.addEventListener('submit', async function (event) {
  event.preventDefault();

  const dadosFormulario = new FormData(formulario);
  const dados = Object.fromEntries(dadosFormulario.entries());

  try {
    let resposta = await fetch(`${getBackendURL()}/api/contatos`, {
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
  // Salva a posição do cursor
  const cursorPosition = e.target.selectionStart;

  // Aplica a formatação
  e.target.value = formatarTelefone(e.target.value);

  // Restaura a posição do cursor, ajustando para caracteres não numéricos
  let ajusteCursor = 0;
  const valor = e.target.value;

  // Conta quantos caracteres não numéricos existem antes da posição do cursor
  for (let i = 0; i < cursorPosition + ajusteCursor && i < valor.length; i++) {
    if (/\D/.test(valor[i])) ajusteCursor++;
  }

  e.target.setSelectionRange(
    cursorPosition + ajusteCursor,
    cursorPosition + ajusteCursor
  );
});
