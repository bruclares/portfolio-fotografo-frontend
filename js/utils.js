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
                formatarTelefone(mensagem.telefone) || 'Não informado'
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

export function formatarTelefone(telefone) {
  // Remove tudo que não é dígito e limita a 11 caracteres (DDD + 9 dígitos)
  let valor = telefone.replace(/\D/g, '').substring(0, 11);

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
  telefone = valorFormatado;
  return telefone;
}
