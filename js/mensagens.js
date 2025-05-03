import getBackendURL, { getHtmlMensagem } from './utils.js';

document.addEventListener('DOMContentLoaded', async function () {
  const navPaginacao = document.getElementById('mensagens-paginacao');

  console.log(localStorage.getItem('token'));

  try {
    let resposta = await fetch(`${getBackendURL()}/api/contatos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    resposta = await resposta.json();

    if ('erro' in resposta) {
      throw new Error(resposta.erro);
    }

    for (const mensagem of Object.values(resposta)) {
      navPaginacao.insertAdjacentHTML('beforebegin', getHtmlMensagem(mensagem));
      console.log(mensagem);
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
