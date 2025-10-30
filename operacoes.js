const client = require('./database')

const operations = {
    operGet: (req, res) => {
        client.query('SELECT * FROM tarefas ORDER BY id ASC', (err, result) => {
            if (err) {
                res.statusCode = 500;
                return res.end("Erro ao buscar tarefas.")
            }
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify(result.rows));
        })
    },
    operPost: (req, res) => {
        let novaTarefa = ''
        req.on('data', chunk => {
            novaTarefa += chunk
        })
        req.on('end', () => {
            const dados = JSON.parse(novaTarefa)
            if (!dados.titulo || typeof dados.concluida !== "boolean") {
                res.statusCode = 400
                return res.end("Dados inválidos. Envie um 'titulo' e 'concluida'.")
            } else {
                client.query(`INSERT INTO tarefas (titulo, concluida) VALUES ($1, $2) RETURNING *`, [dados.titulo, dados.concluida], (err, result) => {
                    if (err) {
                        res.statusCode = 500
                        return res.end("Erro interno.")
                    }
                    res.setHeader('Content-Type', 'application/json')
                    res.statusCode = 201
                    return res.end(JSON.stringify(result.rows))
                })

            }
        })
    },
    operPut: (req, res, route) => {
        const partes = route.split("/")
        const id = parseInt(partes[2])

        client.query({ text: 'UPDATE tarefas SET concluida = $1 WHERE id = $2 RETURNING *', values: [true, id] }, (err, result) => {
            if (err) {
                res.statusCode = 500
                return res.end("Erro interno.")
            } else if (result.rows.length < 1) {
                res.statusCode = 404
                return res.end("ID nao encontrado no banco de dados.")
            } else {
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 202
                return res.end(JSON.stringify(result.rows))
            }
        })
    },
    operDelete: (req, res, route) => {
        const partes = route.split("/")
        const id = parseInt(partes[2])
        client.query({ text: 'SELECT 1 FROM tarefas WHERE id = $1', values: [id] }, (err, result) => {
            if (err) {
                res.statusCode = 500;
                return res.end("Erro ao buscar tarefas.")
            } else if (result.rows.length < 1) {
                res.statusCode = 404
                return res.end("ID nao encontrado no banco de dados.")
            } else {
                client.query({ text: 'DELETE FROM tarefas WHERE id = $1', values: [id] }, (err, result) => {
                    if (err) {
                        res.statusCode = 500
                        return res.end("Erro interno.")
                    }
                    operations.operGet(req, res)
                })
            }
        })
    }
}

module.exports = { operations }