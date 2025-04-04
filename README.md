## Portfólio para Fotógrafos com Integração de Conteúdo

### Descrição do Projeto

O **Portfólio para Fotógrafos** é uma aplicação web Full Stack desenvolvida para fotógrafos exibirem seus portfólios de forma profissional e interativa. Este repositório contém o código do **front-end**, responsável por renderizar a interface de usuário, gerenciar interações como envio de formulários e exibição de galerias de fotos, e se comunicar com o back-end via API. A aplicação é composta por três camadas: front-end, back-end e banco de dados.

O front-end utiliza HTML, CSS e JavaScript puro, com integração ao Cloudinary para carregar fotos dinamicamente e um formulário de contato para receber mensagens de clientes.

**Status do Projeto**: Este projeto está em desenvolvimento ativo. Algumas funcionalidades, como o formulário de contato e a galeria com lightbox, estão implementadas, mas outras (como login e carrossel) estão pendentes.

---

## Funcionalidades

### Front-end

- **Página Inicial**: Base para navegação com menu full-screen e apresentação visual (em desenvolvimento).
- **Galeria de Fotos**: Exibição dinâmica de fotos do Cloudinary, com paginação e lightbox interativo.
- **Formulário de Contato**: Permite que visitantes enviem mensagens ao fotógrafo, com feedback visual.
- **Design Responsivo**: Layout adaptável para desktop, tablet e mobile, usando media queries.

### Back-end (Relacionado)

- **API**: Desenvolvida em Flask, gerencia requisições como envio de contatos e recuperação de fotos do Cloudinary.
- **Integração**: Conecta o front-end ao Cloudinary para carregamento de imagens.

### Banco de Dados (Relacionado)

- **Armazenamento**: PostgreSQL guarda mensagens de contato e logs (gerenciado pelo back-end).

---

## Tecnologias Utilizadas

- **Front-end**: HTML5, CSS3 (Flexbox, Grid, variáveis CSS), JavaScript (ES6+)
- **Estilização**: CSS Modules (arquivos separados), Google Fonts ("Work Sans", "Unlock")
- **Integração**: Fetch API para comunicação com o back-end
- **Hospedagem**: Vercel
- **Ferramentas**: Git, GitHub, VS Code

---

## Status de Desenvolvimento

- **Etapas Concluídas**:

  - Estrutura inicial HTML e CSS, com formulário de contato funcional (AC1).
  - Galeria de fotos com paginação e lightbox, integrada ao Cloudinary (parcialmente AC2).
  - Menu full-screen com animações para navegação (AC1).
  - Design responsivo básico com tipografia e cores definidas (AC1).

- **Próximas Etapas**:

  - **AC2 (06/04)**:
    - Finalizar páginas específicas (Projetos, Retratos, Colabs) com integração à galeria existente.
    - Garantir que cada página exiba fotos de pastas específicas do Cloudinary (ex.: "projetos", "retratos").
  - **AC3 (04/05)**:
    - Implementar página de login para o fotógrafo com opção "esqueci minha senha".
    - Criar formulário de gerenciamento de dados do fotógrafo (nome, email, telefone, biografia, rede social).
    - Otimizar responsividade com testes em mais dispositivos.
  - **Entrega Final (08/06)**:
    - Adicionar carrossel de imagens na página inicial, consumindo fotos do Cloudinary.
    - Implementar filtros de fotos por metadados (se suportado pelo back-end).
    - Finalizar testes de acessibilidade (WCAG) e performance.

- **Riscos Conhecidos**:
  - Dependência do back-end; falhas na API podem afetar o formulário e a galeria.
  - Compatibilidade limitada em navegadores antigos (ex.: Fetch API).

---

## Estrutura do Projeto

```
portfolio-fotografo-frontend/
├── colabs.html
├── contato.html
├── index.html
├── projetos.html
├── retratos.html
├── sobre.html
├── css/
│   ├── reset.css
│   ├── global.css
│   ├── tipografia.css
│   ├── cores.css
│   ├── container.css
│   ├── menu.css
│   ├── pagina-inicial.css
│   ├── contato.css
│   ├── galeria.css
│   ├── style.css
├── js/
│   ├── script.js
│   ├── contato.js
│   ├── fotos.js
├── img/
│   ├── logo.svg
│   ├── favicon.svg
├── .gitignore
├── README.md
```

- **HTMLs na raiz**: Páginas específicas (`colabs.html`, `contato.html`, `index.html`, `projetos.html`, `retratos.html`, `sobre.html`) para diferentes seções do site.
- **`css/`**: Estilos modulares, incluindo `style.css` como arquivo adicional.
- **`js/`**: Scripts separados para interatividade geral (`script.js`), formulário (`contato.js`) e galeria (`fotos.js`).
- **`img/`**: Recursos visuais como logotipo (`logo.svg`) e favicon (`favicon.svg`).

---

## Como Executar Localmente

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/bruclares/portfolio-fotografo-frontend.git
   cd portfolio-fotografo-frontend
   ```

2. **Pré-requisitos**:

   - Certifique-se de que o back-end está rodando em `https://portfolio-fotografo-backend.vercel.app` ou localmente (ajuste as URLs nos arquivos JavaScript se necessário).

3. **Execute o projeto**:

   - Abra qualquer arquivo HTML (ex.: `index.html`) em um navegador moderno (Chrome, Firefox, Edge) ou use um servidor local:
     ```bash
     # Exemplo com Live Server no VS Code
     code . && live-server
     ```

4. **Teste a integração**:
   - Verifique o envio do formulário em `contato.html` e o carregamento da galeria em `projetos.html`, `retratos.html` ou `colabs.html`.

---

## Links

- **GitHub Project**: [Link do Projeto](https://github.com/users/bruclares/projects/3)
- **Repositório Front-end**: [portfolio-fotografo-frontend](https://github.com/bruclares/portfolio-fotografo-frontend)
- **Repositório Back-end**: [portfolio-fotografo-backend](https://github.com/bruclares/portfolio-fotografo-backend)
- **Hospedagem na Vercel**: [Portfólio Fotógrafo](https://portfolio-fotografo.vercel.app/)
- **Design no Canva**: [Link do Design](https://www.canva.com/design/DAGdA_GiiT4/Cwp1Fd92u-JSd0oN7unAgg/view?utm_content=DAGdA_GiiT4&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h0d9a7d5038)
- **Vídeo de Apresentação**: [Link do Vídeo](https://www.youtube.com/watch?v=LxZCA7SuQ8Y)

---

## Diferenciais do Projeto

1. **Integração com Cloudinary**: Carregamento dinâmico de fotos via API externa.
2. **Design Responsivo**: Experiência adaptável a diferentes dispositivos.
3. **Interatividade**: Lightbox e menu full-screen para uma navegação moderna.
4. **Boas Práticas**: Commits semânticos, modularidade CSS e versionamento no GitHub.
