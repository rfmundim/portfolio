/// <reference types="cypress" />

import {clientes} from '../../fixtures/clientes.json';

describe('Validação API de cliente', () => {
    const cliente = {
        id: 6,
        nome: "OMOLETE KEND",
        tipo: "F",
        documento: "99999999986",
        contato: "9999998886",
        email: "omelete_kend@emailtopzeira.com"
    }

    const clienteAtualizado = {
        id: 6,
        nome: "OMOLETE KENDAMAR",
        tipo: "F",
        documento: "99999999986",
        contato: "9999998886",
        email: "omelete_kendmar@emailtopzeira.com"
    }

    const clienteSemNomeo = {
        id: 7,
        nome: "",
        tipo: "F",
        documento: "99999999987",
        contato: "9999998887",
        email: "semnome@emailtopzeira.com"
    }

    const token = Cypress.env('TOKEN')

    const clienteDeletado = 5

    before(() => {
        cy.delClientes(token)
        cy.addClientes(clientes)
    })

    it('Buscar todos os clientes', () => {
        cy.request({
            method: 'GET',
            url: '/clientes',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            expect(response.status).to.equal(200)
            expect(response.body.length).to.equal(5)
        }) 
    })

    it('Buscar cliente por inicial nome MAR', () => {
        cy.request({
            method: 'GET',
            url: '/clientes/nome/MAR',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            expect(response.status).to.equal(200)
            expect(response.body.length).to.equal(3)
        }) 
    })

    it('Criar cliente', () => {
        cy.request({
            method: 'POST',
            url: '/clientes',
            body: cliente,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            expect(response.status).to.equal(201)
            expect(response.body.id).to.equal(1)
            expect(response.body.mensagem).to.equal('Cliente cadastrado com sucesso')
        }) 
    })

    it('Criar cliente novamente', () => {
        cy.request({
            method: 'POST',
            url: '/clientes',
            body: cliente,
            headers: {
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        })
        .then(response => {
            expect(response.status).to.equal(400)
            expect(response.body.id).to.equal(456)
            expect(response.body.erro).to.equal('Cliente já existe')
        }) 
    })

    it('Criar cliente sem nome', () => {
        cy.request({
            method: 'POST',
            url: '/clientes',
            body: clienteSemNomeo,
            headers: {
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        })
        .then(response => {
            expect(response.status).to.equal(400)
            expect(response.body.id).to.equal(457)
            expect(response.body.erro).to.equal('Nome do cliente esta vazio')
        }) 
    })

    it('Consultar cliente anterior', () => {
        cy.request({
            method: 'GET',
            url: `/clientes/${cliente.id}`,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            const file1str = JSON.stringify(response.body)
            const file2str = JSON.stringify(cliente)
            expect(response.status).to.equal(200)
            expect(file1str).to.equal(file2str)
        }) 
    })

    it('Atualizar cliente anterior', () => {
        cy.request({
            method: 'PATCH',
            url: `/clientes/${cliente.id}`,
            body: clienteAtualizado,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            expect(response.status).to.equal(200)
            expect(response.body.mensagem).to.equal('Cliente atualizado com sucesso')
        }) 
    })
    
    it('Consultar cliente atualizado', () => {
        cy.request({
            method: 'GET',
            url: `/clientes/${clienteAtualizado.id}`,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            const file1str = JSON.stringify(response.body)
            const file2str = JSON.stringify(clienteAtualizado)
            expect(response.status).to.equal(200)
            expect(file1str).to.equal(file2str)
        }) 
    })

    it('Deletar cliente anterior', () => {
        cy.request({
            method: 'DELETE',
            url: `/clientes/${cliente.id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        .then(response => {
            expect(response.status).to.equal(204)
        }) 
    })

    it('Confirmar exclusão do cliente anterior', () => {
        cy.request({
            method: 'GET',
            url: `/clientes/${cliente.id}`,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            expect(response.status).to.equal(200)
            expect(response.body.length).to.eq(0)
        }) 
    })


    it('Deletar cliente existente', () => {
        cy.request({
            method: 'DELETE',
            url: `/clientes/${clienteDeletado}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        .then(response => {
            expect(response.status).to.equal(204)
        }) 
    })

    it('Confirmar exclusão do cliente existente', () => {
        cy.request({
            method: 'GET',
            url: `/clientes/${clienteDeletado}`,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            expect(response.status).to.equal(200)
            expect(response.body.length).to.eq(0)
        }) 
    })  
    
    it('Buscar todos os clientes depois exclusão', () => {
        cy.request({
            method: 'GET',
            url: '/clientes',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            expect(response.status).to.equal(200)
            expect(response.body.length).to.equal(4)
        }) 
    })

    it('Deletar cliente que não existente', () => {
        cy.request({
            method: 'DELETE',
            url: `/clientes/${clienteDeletado}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            failOnStatusCode: false
        })
        .then(response => {
            expect(response.status).to.equal(400)
            expect(response.body.id).to.equal(456)
            expect(response.body.erro).to.equal('Cliente não existe')
        }) 
    })

    it('Deletar cliente sem autorização', () => {
        cy.request({
            method: 'DELETE',
            url: `/clientes/${clienteDeletado}`,
            headers: {
                'Content-Type': 'application/json',
            },
            failOnStatusCode: false
        })
        .then(response => {
            expect(response.status).to.equal(403)
            expect(response.body.id).to.equal(455)
            expect(response.body.erro).to.equal('Credencial não informada')
        }) 
    })

    it('Deletar cliente com autorização errada', () => {
        cy.request({
            method: 'DELETE',
            url: `/clientes/${clienteDeletado}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'fadsfadsfadsfa'
            },
            failOnStatusCode: false
        })
        .then(response => {
            expect(response.status).to.equal(403)
            expect(response.body.id).to.equal(455)
            expect(response.body.erro).to.equal('Não autorizado')
        }) 
    })
   
})