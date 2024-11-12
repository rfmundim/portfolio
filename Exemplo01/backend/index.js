require ("dotenv").config()

const db = require("./db")

const express = require("express")

const app = express()

app.use(express.json())

app.delete("/clientes/:id", (request, response) => {
    const id = parseInt(request.params.id)

    try {
        if (id === 999)
           id = parseInt(id) 

        if (!db.selectCliente(id))
          return response.status(400).send({ id: 456, erro: "Cliente não existe" })

        db.deleteCliente(id)
        
        return response.status(204).send({ id: 1, mensagem: "Cliente deletado com sucesso" })     
           
        } catch (err) {
          return response.status(500).send({ id: 999, mensagem: "Ocorreu um erro ao deletar o cliente", erro: err.message });
        }
})

app.patch("/clientes/:id", (request, response) => {
    const idParam = parseInt(request.params.id)
    const cliente = request.body
    const { id, nome } = cliente

    try {
        if (parseInt(id) === 999)
           id = parseInt(id) 

        if (parseInt(id) !== idParam)
            return response.status(400).send({ id: 455, erro: "Código cliente está diferente" })

        if (!db.selectCliente(parseInt(id)))
          return response.status(400).send({ id: 456, erro: "Cliente não existe" })

        if (nome.length < 1)
          return response.status(400).send({ id: 457, erro: "Nome do cliente esta vazio" })
       
        db.updateCliente(idParam, cliente)
        
        return response.status(200).send({ id: 1, mensagem: "Cliente atualizado com sucesso" })     
           
        } catch (err) {
          return response.status(500).send({ id: 999, mensagem: "Ocorreu um erro ao atualizar o cliente", erro: err.message });
        }
})

app.post("/clientes", (request, response) => {
    const cliente = request.body
    const { id, nome } = cliente

    try {
        if (parseInt(id) === 999)
           id = parseInt(id) 

        if (parseInt(id) === 0)
            return response.status(400).send({ id: 455, erro: "Código não pode ser zero" })

        if (db.selectCliente(parseInt(id)))
          return response.status(400).send({ id: 456, erro: "Cliente já existe" })

        if (nome.length < 1)
          return response.status(400).send({ id: 457, erro: "Nome do cliente esta vazio" })
       
        db.insertCliente(cliente)
        
        return response.status(201).send({ id: 1, mensagem: "Cliente cadastrado com sucesso" })     
           
        } catch (err) {
          return response.status(500).send({ id: 999, mensagem: "Ocorreu um erro ao cadastrar o cliente", erro: err.message });
        }
 })

app.get("/clientes/:id", (request, response) => {
    const id = parseInt(request.params.id)
    response.json(db.selectCliente(id))
    response.sendStatus(200)
})

app.get("/clientes", (request, response) => {
    response.json(db.selectClientes())
    return response.status(200).send({ id: 1, erro: "Sucesso" })
})

app.get("/", (request, response, next) => {
    return response.status(200).send({ id: 1, erro: "Sucesso" })
})

app.listen(process.env.PORT, () => {
    console.log("App is running.")
})