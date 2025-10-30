const http = require('node:http')
const client = require('./database')
const { operations } = require('./operacoes')

const server = http.createServer((req, res) => {
    const method = req.method
    const route = req.url

    if (method === "GET" && route === "/tarefas") {
        operations.operGet(req, res)
    }

    if (method == "POST" && route == "/tarefas") {
        operations.operPost(req, res)
    }

    if (method == "PUT" && route.startsWith("/tarefas/") && route.endsWith("/concluir")) {
        operations.operPut(req, res, route)
    }

    if (method == "DELETE" && route.startsWith("/tarefas/")) {
        operations.operDelete(req, res, route)
    }
})

server.listen(3000, 'localhost', () => {
    console.log('Servidor rodando na porta 3000')
})