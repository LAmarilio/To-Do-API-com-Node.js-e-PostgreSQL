const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'tarefas',
    password: 'sua_senha',
    port: 5432
})

client.connect()

module.exports = client