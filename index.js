const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); 

const pool = new Pool({
    user: 'postgres',
    host: 'database-1.c3nylx6njpgu.us-east-1.rds.amazonaws.com',
    database: 'postgres',
    password: '12345678',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados PostgreSQL na AWS.');
    
    // Criar a tabela se não existir
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            idade INT NOT NULL,
            cpf FLOAT NOT NULL
        );
    `;
    pool.query(createTableQuery, (err, result) => {
        if (err) {
            console.error('Erro ao criar tabela:', err);
            return;
        }
        console.log('Tabela "users" criada ou já existente.');
    });
});

app.post('/users', (req, res) => {
    const { nome, idade, cpf } = req.body;
    const query = 'INSERT INTO users (nome, idade, cpf) VALUES ($1, $2, $3) RETURNING *';
    pool.query(query, [nome, idade, cpf], (err, result) => {
        if (err) {
            console.error('Erro ao inserir usuário:', err);
            res.status(500).send('Erro ao inserir usuário.');
            return;
        }
        res.status(201).send(result.rows[0]);
    });
});

app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuários:', err);
            res.status(500).send('Erro ao buscar usuários.');
            return;
        }
        res.status(200).send(results.rows);
    });
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    pool.query(query, [id], (err, result) => {
        if (err) {
            console.error('Erro ao deletar usuário:', err);
            res.status(500).send('Erro ao deletar usuário.');
            return;
        }
        if (result.rowCount === 0) {
            res.status(404).send('Usuário não encontrado.');
            return;
        }
        res.status(200).send('Usuário deletado com sucesso.');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
