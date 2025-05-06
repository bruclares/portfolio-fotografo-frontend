export default function getBackendURL() {
  const isLocalhost =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1';

  if (isLocalhost) {
    return 'http://127.0.0.1:5000';
  } else {
    return 'https://portfolio-fotografo-backend.vercel.app';
  }
}

export function getHtmlMensagem(mensagem) {
  const htmlMensagem = `<div>
        <article class="card">
          <header class="text-secondary font-primary-sm card-cabecalho">
            <h2>${mensagem.nome}</h2>
            <span>${mensagem.data_formatada}</span>
          </header>

          <div class="text-secondary">
            <div class="card-item">
              <span class="font-primary-sm">Telefone:</span>
              <a href="tel:+5511999999999">${
                mensagem.telefone || 'Não informado'
              }</a>
            </div>
            <div class="card-item">
              <span class="font-primary-sm">E-mail:</span>
              <a href="mailto:${mensagem.email}">${
    mensagem.email || 'Não informado'
  }</a>
            </div>
            <div class="card-item">
              <h3 class="font-primary-sm">Mensagem</h3>
              <p>${mensagem.mensagem}</p>
            </div>
          </div>
        </article>
      </div>`;

  return htmlMensagem;
}
