/// <reference types="cypress" />

import { faker } from '@faker-js/faker/locale/en'


describe('Cadastro de conta', function() {
   beforeEach(function() {
        cy.visit('./../src/index.html')
   })

   
   it('Primeira validação', function() {
      cy.title().should('be.equal', 'Nova Conta - Teste Cypress')
   })

   it('Validação cadastro com novidade', function() {
      cy.get('[data-test="name"]').type('KITAMERIO SILVA')
      cy.get('[data-test="userName"]').type('KITAMERIO55')
      cy.get('[data-test="email"]').type('kitamerio_silva@email89757.com')
      cy.get('[data-test="password"]').type('7984@rRTA', {log:false})
      cy.get('[data-test="password-confirmation"]').type('7984@rRTA', {log:false})
      cy.get('[data-test="seletores"]').check()
      cy.get('[data-test="buttonSubmit"]').click()
      cy.on('window:alert', (str) => {
         expect(str).to.equal('Cadastro realizado com sucesso e novidades.')
       })
   })

   it('Validação cadastro sem novidade', function() {
      cy.get('[data-test="name"]').type('KITAMERIO SILVA')
      cy.get('[data-test="userName"]').type('KITAMERIO55')
      cy.get('[data-test="email"]').type('kitamerio_silva@email89757.com')
      cy.get('[data-test="password"]').type('7984@rRTA', {log:false})
      cy.get('[data-test="password-confirmation"]').type('7984@rRTA', {log:false})
      cy.get('[data-test="buttonSubmit"]').click()
      cy.on('window:alert', (str) => {
         expect(str).to.equal('Cadastro realizado com sucesso.')
       })
   })
   
   it('Validação cadastro sem preechimento nome', function() {
      cy.get('[data-test="buttonSubmit"]').click()
      cy.get('[data-test="ms-name"]').should('be.visible')
      cy.get('[data-test="ms-name"]').should('have.text', 'Preencha o nome.')
   })

   it('Validação cadastro sem preechimento nome maior que 60', function() {
      cy.get('[data-test="name"]').type(faker.string.alpha(61))
      cy.get('[data-test="buttonSubmit"]').click()
      cy.get('[data-test="ms-name"]').should('be.visible')
      cy.get('[data-test="ms-name"]').should('have.text', 'Quantidade de caracteres deverá ser menor que 60.')
   })

   it('Validação cadastro sem preechimento usuário', function() {
      cy.get('[data-test="name"]').type('KITAMERIO SILVA')
      cy.get('[data-test="buttonSubmit"]').click()
      cy.get('[data-test="ms-username"]').should('be.visible')
      cy.get('[data-test="ms-username"]').should('have.text', 'Preencha um nome de usuário.')
   })

   it('Validação cadastro usuário maior que 15', function() {
      cy.get('[data-test="name"]').type('KITAMERIO SILVA')
      cy.get('[data-test="userName"]').type('KITAMERIO5589321')
      cy.get('[data-test="buttonSubmit"]').click()
      cy.get('[data-test="ms-username"]').should('be.visible')
      cy.get('[data-test="ms-username"]').should('have.text', 'Quantidade de caracteres deverá ser menor que 15.')
   })

   it('Validação email sem e-mail', function() {
      cy.get('[data-test="name"]').type('KITAMERIO SILVA')
      cy.get('[data-test="userName"]').type('KITAMERIO55')
      cy.get('[data-test="buttonSubmit"]').click()
      cy.get('[data-test="ms-email"]').should('be.visible')
      cy.get('[data-test="ms-email"]').should('have.text', 'O email é obrigatório.')
   })

   it('Validação email inválido sem arroba', function() {
      cy.get('[data-test="name"]').type('KITAMERIO SILVA')
      cy.get('[data-test="userName"]').type('KITAMERIO55')
      cy.get('[data-test="email"]').type('kitamerio_silvaemail89757.com')
      cy.get('[data-test="buttonSubmit"]').click()
      cy.get('[data-test="ms-email"]').should('be.visible')
      cy.get('[data-test="ms-email"]').should('have.text', 'Informe um e-mail válido.')
   })

   it('Validação email inválido sem ponto com', function() {
      cy.get('[data-test="name"]').type('KITAMERIO SILVA')
      cy.get('[data-test="userName"]').type('KITAMERIO55')
      cy.get('[data-test="email"]').type('kitamerio_silva@email89757com')
      cy.get('[data-test="buttonSubmit"]').click()
      cy.get('[data-test="ms-email"]').should('be.visible')
      cy.get('[data-test="ms-email"]').should('have.text', 'Informe um e-mail válido.')
   })

   it('Validação senha vazia', function() {
      cy.get('[data-test="name"]').type('KITAMERIO SILVA')
      cy.get('[data-test="userName"]').type('KITAMERIO55')
      cy.get('[data-test="email"]').type('kitamerio_silva@email89757.com')
      cy.get('[data-test="buttonSubmit"]').click()
      cy.get('[data-test="ms-password"]').should('be.visible')
      cy.get('[data-test="ms-password"]').should('have.text', 'A senha é obrigatória.')
   })

   it('Validação senha menor que 8', function() {
      cy.get('[data-test="name"]').type('KITAMERIO SILVA')
      cy.get('[data-test="userName"]').type('KITAMERIO55')
      cy.get('[data-test="email"]').type('kitamerio_silva@email89757.com')
      cy.get('[data-test="password"]').type('7984@rR', {log:false})
      cy.get('[data-test="buttonSubmit"]').click()
      cy.get('[data-test="ms-password"]').should('be.visible')
      cy.get('[data-test="ms-password"]').should('have.text', 'A senha precisa ter no mínimo 8 caracteres.')
   })

   it('Validação confirma senha vazia', function() {
      cy.get('[data-test="name"]').type('KITAMERIO SILVA')
      cy.get('[data-test="userName"]').type('KITAMERIO55')
      cy.get('[data-test="email"]').type('kitamerio_silva@email89757.com')
      cy.get('[data-test="password"]').type('7984@rRTA', {log:false})
      cy.get('[data-test="buttonSubmit"]').click()
      cy.get('[data-test="ms-password-confirmation"]').should('be.visible')
      cy.get('[data-test="ms-password-confirmation"]').should('have.text', 'A confirmação de senha é obrigatória.')
   })

   it('Validação confirma senha diferente', function() {
      cy.get('[data-test="name"]').type('KITAMERIO SILVA')
      cy.get('[data-test="userName"]').type('KITAMERIO55')
      cy.get('[data-test="email"]').type('kitamerio_silva@email89757.com')
      cy.get('[data-test="password"]').type('7984@rRTA', {log:false})
      cy.get('[data-test="password-confirmation"]').type('7984@rR', {log:false})
      cy.get('[data-test="buttonSubmit"]').click()
      cy.get('[data-test="ms-password-confirmation"]').should('be.visible')
      cy.get('[data-test="ms-password-confirmation"]').should('have.text', 'As senhas não são iguais.')
   })
})

