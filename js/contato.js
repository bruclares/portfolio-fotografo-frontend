import getBackendURL from './utils.js';

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

function formatarTelefone(input) {
  // Remove tudo que não é dígito e limita a 11 caracteres (DDD + 9 dígitos)
  let valor = input.value.replace(/\D/g, '').substring(0, 11);

  // Variável para o valor formatado
  let valorFormatado = '';

  // Aplica a formatação
  if (valor.length > 0) {
    valorFormatado = `(${valor.substring(0, 2)}`;
  }
  if (valor.length > 2) {
    valorFormatado += `) ${valor.substring(2, 7)}`;
  }
  if (valor.length > 7) {
    valorFormatado += `-${valor.substring(7)}`;
  }

  // Atualiza o campo
  input.value = valorFormatado;
}

document.getElementById('telefone').addEventListener('input', function (e) {
  // Salva a posição do cursor
  const cursorPosition = e.target.selectionStart;

  // Aplica a formatação
  formatarTelefone(e.target);

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
