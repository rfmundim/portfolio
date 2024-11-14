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

    const token = Cypress.env('TOKEN')

    before(() => {
        cy.delClientes(token)
        cy.addClientes(clientes)
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

    
})