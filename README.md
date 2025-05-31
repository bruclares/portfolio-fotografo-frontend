## Portfólio para Fotógrafos com Integração de Conteúdo

### Descrição do Projeto

O **Portfólio para Fotógrafos** é uma aplicação web Full Stack desenvolvida para fotógrafos exibirem seus portfólios de forma profissional e interativa. Este repositório contém o código do **front-end**, responsável por renderizar a interface de usuário, gerenciar interações como envio de formulários e exibição de galerias de fotos, e se comunicar com o back-end via API. A aplicação é composta por três camadas: front-end, back-end e banco de dados.

O front-end utiliza HTML, CSS e JavaScript puro, com integração ao Cloudinary para carregar fotos dinamicamente e um formulário de contato para receber mensagens de clientes.

---

## Funcionalidades do Frontend

- Galeria de fotos dinâmica, integrando com o **Cloudinary**
- Login de fotógrafa com autenticação via JWT
- Recuperação de senha ("Esqueci minha senha")
- Área administrativa:
  - Edição das informações de contato
  - Visualização das mensagens enviadas por visitantes
- Formulário de contato com envio e persistência de dados

---

## Tecnologias Utilizadas

- **HTML5** e **CSS3** (com responsividade manual)
- **JavaScript ES6**
- **Fetch API** para integração com o backend
- **Cloudinary** para hospedagem e exibição de imagens
- **LocalStorage** para controle de sessão (token JWT)
- Integração com API REST em **Flask**

---

## Estrutura de Pastas

```
portfolio-fotografo-frontend
├─ admin
│  ├─ criar-nova-senha.html
│  ├─ formas-de-contato.html
│  ├─ login.html
│  ├─ mensagens.html
│  └─ recuperar-senha.html
├─ colabs.html
├─ contato.html
├─ css
│  ├─ autenticacao.css
│  ├─ container.css
│  ├─ contato.css
│  ├─ cores.css
│  ├─ galeria.css
│  ├─ global.css
│  ├─ menu.css
│  ├─ pagina-inicial.css
│  ├─ painel-admin.css
│  ├─ reset.css
│  ├─ sobre.css
│  ├─ style.css
│  └─ tipografia.css
├─ img
│  ├─ favicon.svg
│  └─ logo
│     ├─ logo-large.svg
│     ├─ logo-md.svg
│     └─ logo-small.svg
├─ index.html
├─ js
│  ├─ api.js
│  ├─ auth-manager.js
│  ├─ contato.js
│  ├─ criar-nova-senha.js
│  ├─ formas-de-contato.js
│  ├─ fotos.js
│  ├─ login.js
│  ├─ mensagens.js
│  ├─ recuperar-senha.js
│  ├─ script.js
│  ├─ sobre.js
│  └─ utils.js
├─ projetos.html
├─ README.md
├─ retratos.html
└─ sobre.html

```

---

## Autenticação

A autenticação é feita com **JWT**, fornecido pela API Flask após o login. O token é armazenado no `localStorage` e incluído nas requisições subsequentes para acessar áreas protegidas do sistema (como o painel administrativo).

---

## Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/bruclares/portfolio-fotografo-frontend.git

cd portfolio-fotografo-frontend
```

### 2. Abra o projeto no navegador

Você pode abrir o arquivo index.html diretamente, ou usar uma extensão como Live Server (VSCode) para simular um ambiente local. Lembre-se de que as funcionalidades que consomem API precisam do backend Flask rodando.

### 3. **Execute o projeto**:

Abra qualquer arquivo HTML (ex.: `index.html`) em um navegador moderno (Chrome, Firefox, Edge) ou use um servidor local.

### 4. **Teste a integração**:

Verifique o envio do formulário em `contato.html` e o carregamento da galeria em `projetos.html`, `retratos.html` ou `colabs.html`.

---

## Links

- **GitHub Project**: [Link do Projeto](https://github.com/users/bruclares/projects/3)
- **Repositório Front-end**: [portfolio-fotografo-frontend](https://github.com/bruclares/portfolio-fotografo-frontend)
- **Repositório Back-end**: [portfolio-fotografo-backend](https://github.com/bruclares/portfolio-fotografo-backend)
- **Hospedagem na Vercel**: [Portfólio Fotógrafo](https://portfolio-fotografo.vercel.app/)

---
