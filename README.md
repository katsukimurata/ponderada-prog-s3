# ponderada-prog-s3

## Descrição

Este repositório contém uma aplicação simples de CRUD desenvolvida em Node.js, com um front-end básico em HTML, CSS e JavaScript. A aplicação utiliza o banco de dados PostgreSQL hospedado em um RDS da AWS e o front-end no AWS S3.

## Estrutura do Repositório

### 1. Back-End (Node.js)
O back-end é uma API RESTful criada em Node.js que interage com um banco de dados PostgreSQL. A API oferece três rotas principais:

- **POST /users**: Cria um novo usuário no banco de dados.
- **GET /users**: Retorna uma lista de todos os usuários.
- **DELETE /users/:id**: Deleta um usuário específico com base no ID.

#### Arquivo Principal:
- `index.js`: Contém a configuração do servidor Express, as rotas da API e a conexão com o banco de dados PostgreSQL.

### 2. Front-End (HTML/CSS/JavaScript)
O front-end é uma interface simples que permite interagir com a API back-end. Ele permite criar novos usuários, listar todos os usuários e deletar usuários pelo ID.

#### Arquivos Principais:
- `index.html`: Estrutura principal do front-end com os elementos de formulário e botões de interação.
- `styles.css`: Estilos CSS para formatar a aparência do front-end.
- `app.js`: Arquivo JavaScript que usa Axios para fazer requisições à API back-end.

### 3. Hospedagem no S3
O front-end está hospedado no Amazon S3, onde pode ser acessado como um site estático. 

### 4. Configuração do Servidor EC2
O back-end é configurado para rodar em uma instância EC2 da AWS utilizando `screen` para manter o servidor rodando em segundo plano.


