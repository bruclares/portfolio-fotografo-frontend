# Portfólio para Fotógrafos com Integração de Conteúdo

## Descrição do Projeto

O **Portfólio para Fotógrafos** é uma aplicação web Full Stack desenvolvida para fotógrafos exibirem seus portfólios de forma profissional e interativa. A aplicação permite a exibição de galerias de fotos, integração com a API do Google Fotos para gerenciamento dinâmico do conteúdo, e um formulário de contato para receber mensagens de clientes e visitantes.

O projeto é composto por três camadas principais:

- **Front-end**: Desenvolvido com HTML, CSS e JavaScript.
- **Back-end**: API RESTful desenvolvida em Flask (Python).
- **Banco de Dados**: Utiliza PostgreSQL para armazenar dados como mensagens de contato e informações do fotógrafo.

## Funcionalidades

### Front-end

- **Página Inicial**: Apresentação do fotógrafo com acesso ao menu de navegação.
- **Galeria de Fotos**: Exibição dinâmica de fotos, integrada à API do Google Fotos.
- **Formulário de Contato**: Permite que visitantes enviem mensagens diretamente pelo site.
- **Design Responsivo**: Layout adaptável para desktop e mobile, seguindo as práticas de UX/Design Thinking.

### Back-end

- **API RESTful**: Desenvolvida em Flask para gerenciar requisições do front-end, como o recebimento de mensagens de contato e integração com a API do Google Fotos.
- **Integração com API Externa**: Uso da API do Google Fotos para carregar as imagens do portfólio.

### Banco de Dados

- **Armazenamento de Dados**: Utiliza PostgreSQL para salvar informações como:
  - Dados do fotógrafo (nome, biografia, redes sociais).
  - Mensagens enviadas pelo formulário de contato.
  - Metadados das fotos (título, descrição, tags).

## Tecnologias Utilizadas

- **Front-end**: HTML, CSS (Flexbox, Grid), JavaScript (ES6+).
- **Back-end**: Python (Flask).
- **Banco de Dados**: PostgreSQL.
- **Integração com APIs**: Google Fotos API.
- **Hospedagem**: Vercel.
- **Ferramentas de Desenvolvimento**: Git, GitHub, VS Code, Canva (para design).

## Entregas por AC

### AC1 (09/03)

- **Front-end**: Estrutura inicial HTML e CSS do site, com foco no formulário de contato.
- **Back-end**: Desenvolvimento da API RESTful, com endpoints para gerenciar as requisições do formulário de contato.
- **Banco de Dados**: Configuração do PostgreSQL e conexão com o back-end.
- **Board do Projeto**: Criação do board no GitHub Projects com as tarefas planejadas.

### AC2 (06/04)

- **Front-end**: Desenvolvimento das páginas Projetos, Retratos e Colabs.
- **Back-end**: Integração inicial com a API do Google Fotos.
- **Banco de Dados**: Criação das tabelas `galerias` e `imagens`, armazenamento das imagens do Google Fotos associadas às galerias, e criação de um endpoint para fornecer as imagens com paginação.

### AC3 (04/05)

- **Design Responsivo**: Ajustes no layout para garantir a responsividade do site.
- **Página de Login**: Criação de uma página de login para o fotógrafo, com funcionalidades como "esqueci minha senha".
- **Gerenciamento de Dados**: Formulário para gerenciar informações do fotógrafo (nome, email, telefone, biografia, rede social principal).
- **Sistema de Autenticação**: Implementação de autenticação para login e endpoint para gravar os dados do fotógrafo.

### Entrega Final (08/06)

- **Hospedagem**: Deploy do front-end e back-end na Vercel.
- **Documentação**: Criação de um README detalhado no GitHub.
- **Diagramas**: Diagrama de caso de uso e diagrama de classe.
- **Nova Funcionalidade**: Carrossel de imagens, consumindo a API do Google Fotos e recebendo fotos de uma pasta específica.
- **Possível Nova Funcionalidade**: Filtro de fotos por metadados.

## Diferenciais do Projeto

1. **Integração com API Externa**: Uso da API do Google Fotos para carregar as fotos dinamicamente.
2. **Design Responsivo e Moderno**: Foco em UX/Design Thinking para criar uma experiência agradável para os usuários.
3. **Deploy Contínuo**: Utilização da Vercel para garantir que o site esteja sempre atualizado.
4. **Boas Práticas**: Uso de commits semânticos, versionamento no GitHub.

## Links

- **GitHub Project**: [Link do Projeto](https://github.com/users/bruclares/projects/3)
- **Repositório Front-end**: [portfolio-fotografo-frontend](https://github.com/bruclares/portfolio-fotografo-frontend)
- **Repositório Back-end**: [portfolio-fotografo-backend](https://github.com/bruclares/portfolio-fotografo-backend)
- **Hospedagem na Vercel**: [Portfólio Fotógrafo](https://portfolio-fotografo.vercel.app/)
- **Design no Canva**: [Link do Design](https://www.canva.com/design/DAGdA_GiiT4/Cwp1Fd92u-JSd0oN7unAgg/view?utm_content=DAGdA_GiiT4&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h0d9a7d5038)
- **Vídeo de Apresentação**: [Link do Vídeo](https://www.youtube.com/watch?v=LxZCA7SuQ8Y)
