require ("dotenv").config()

const db = require("./db")

const express = require("express")

const app = express()

app.use(express.json())

app.delete("/clientes/:id", (request, response) => {
    const id = parseInt(request.params.id)
    const authorization = request.headers.authorization

    try {

        if (!authorization) {
           return response.status(403).send({id: 455, erro: "Credencial não informada" });
        }

        if (authorization !== process.env.TOKEN) {
          return response.status(403).send({id: 455, erro: "Não autorizado"});
        }

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
    const { id, nome, tipo, documento, contato, email } = cliente

    try {
        if (parseInt(id) === 999)
           id = parseInt(id) 

        if (parseInt(id) !== idParam)
            return response.status(400).send({ id: 455, erro: "Código cliente está diferente" })

        if (!db.selectCliente(parseInt(id)))
          return response.status(400).send({ id: 456, erro: "Cliente não existe" })

        if (nome.length < 1)
          return response.status(400).send({ id: 457, erro: "Nome do cliente esta vazio" })

        if (documento.length < 1)
          return response.status(400).send({ id: 458, erro: "Documento do cliente esta vazio" })
       
        db.updateCliente(idParam, cliente)
        
        return response.status(200).send({ id: 1, mensagem: "Cliente atualizado com sucesso" })     
           
        } catch (err) {
          return response.status(500).send({ id: 999, mensagem: "Ocorreu um erro ao atualizar o cliente", erro: err.message });
        }
})

app.post("/clientes", (request, response) => {
    const cliente = request.body
    const { id, nome, tipo, documento, contato, email } = cliente

    try {
        if (parseInt(id) === 999)
           id = parseInt(id) 

        if (parseInt(id) === 0)
            return response.status(400).send({ id: 455, erro: "Código não pode ser zero" })

        if (db.selectCliente(parseInt(id)))
          return response.status(400).send({ id: 456, erro: "Cliente já existe" })

        if (nome.length < 1)
          return response.status(400).send({ id: 457, erro: "Nome do cliente esta vazio" })

        if (documento.length < 1)
          return response.status(400).send({ id: 458, erro: "Documento do cliente esta vazio" })
       
        db.insertCliente(cliente)
        
        return response.status(201).send({ id: 1, mensagem: "Cliente cadastrado com sucesso" })     
           
        } catch (err) {
          return response.status(500).send({ id: 999, mensagem: "Ocorreu um erro ao cadastrar o cliente", erro: err.message });
        }
})

 app.get("/clientes/:id", (request, response) => {
    const id = parseInt(request.params.id)
    try {
        return response.json(db.selectCliente(id))
        } catch (err) {
          return response.status(500).send({ id: 999, mensagem: "Ocorreu um erro ao buscar o cliente", erro: err.message });
        }
 
})

app.get("/clientes/nome/:nome", (request, response) => {
  const nome = request.params.nome
  return response.json(db.selectClienteByName(nome))
})

app.get("/clientes/documento/:documento", (request, response) => {
  const documento = request.params.documento
  return response.json(db.selectClienteByDocument(documento))
})

app.get("/clientes", (request, response) => {
    return response.json(db.selectClientes())
})
  
app.get("/", (request, response, next) => {
    return response.status(200).send({ id: 1, mensagem: "Sucesso" })
})

app.listen(process.env.PORT, () => {
    console.log("App is running.")
})