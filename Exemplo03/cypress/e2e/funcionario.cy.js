
/// <reference types="cypress" />

describe('Validação cadastro de funcionário', function () {
  beforeEach(function () {
    cy.restoreLocalStorage();
    cy.visit('./../src/index.html')
  })

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Primeira validação', function () {
    cy.title().should('be.equal', 'Cadastro de Funcionários')
    cy.get('.header span').should('have.text', 'Cadastro de Funcionários')
    cy.get('.header').within(() => {
      cy.get('span').should('have.text', 'Cadastro de Funcionários')
    })
  })

  it('Novo funcionário', function () {
    cy.get('#new').click()
    cy.get('#m-nome').type('KOZAMELIO PAULO')
    cy.get('#m-funcao').type('MARRETEIRO')
    cy.get('#m-salario').type('1560.00')
    cy.get('#btnSalvar').click()

    cy.get('.divTable tbody tr')
      .within(() => {
        cy.get('td').eq(0).contains('KOZAMELIO PAULO')
        cy.get('td').eq(1).contains('MARRETEIRO')
        cy.get('td').eq(2).contains('1560.00')       
        cy.get('td').eq(3).get('button i').should('have.class', 'bx bx-edit')
        cy.get('td').eq(4).get('button i').should('have.class', 'bx bx-trash')
      })
  })

  it('Editar funcionário', function () {
    cy.get('.divTable tbody tr')
      .within(() => {
        cy.get('td').eq(3).click()
      })
    cy.get('#m-nome').clear()
    cy.get('#m-nome').type('KOZAMELIO PAULO SILVA')
    cy.get('td').eq(1).contains('MARRETEIRO')
    cy.get('td').eq(2).contains('560.00')
    cy.get('#btnSalvar').click()

    cy.get('.divTable tbody tr')
      .within(() => {
        cy.get('td').eq(0).contains('KOZAMELIO PAULO SILVA')
        cy.get('td').eq(1).contains('MARRETEIRO')
        cy.get('td').eq(2).contains('560.00')
      })

  })

  it('Segundo funcionário', function () {
    cy.get('#new').click()
    cy.get('#m-nome').type('GUSTAFONTE MELO')
    cy.get('#m-funcao').type('GUINDASTISTA')
    cy.get('#m-salario').type('1850.00')
    cy.get('#btnSalvar').click()

    cy.get('.divTable tbody').get('tr').eq(2)
      .within(() => {
        cy.get('td').eq(0).contains('GUSTAFONTE MELO')
        cy.get('td').eq(1).contains('GUINDASTISTA')
        cy.get('td').eq(2).contains('1850.00')
        cy.get('td').eq(3).get('button i').should('have.class', 'bx bx-edit')
        cy.get('td').eq(4).get('button i').should('have.class', 'bx bx-trash')
      })
  })

  it('Terceiro funcionário', function () {
    cy.get('#new').click()
    cy.get('#m-nome').type('TEMAKINDO COSTA')
    cy.get('#m-funcao').type('MARTELADOR')
    cy.get('#m-salario').type('2341.44')
    cy.get('#btnSalvar').click()

    cy.get('.divTable tbody').get('tr').eq(3)
      .within(() => {
        cy.get('td').eq(0).contains('TEMAKINDO COSTA')
        cy.get('td').eq(1).contains('MARTELADOR')
        cy.get('td').eq(2).contains('2341.44')
        cy.get('td').eq(3).get('button i').should('have.class', 'bx bx-edit')
        cy.get('td').eq(4).get('button i').should('have.class', 'bx bx-trash')
      })
  })

  it('Deletar segundo funcionário', function () {
    cy.get('.divTable tbody').get('tr').eq(2)
      .within(() => {
        cy.get('td').eq(4).click()
      })
  })

  it('Total registros depois deletar', function () {
    cy.get('.divTable tbody').find('tr').should('have.length', 2)
  })

  it('Terceiro funcionário após delete', function () {
    cy.get('#new').click()
    cy.get('#m-nome').type('MIROBANDO TUKUNARES')
    cy.get('#m-funcao').type('BRINQUEIRO')
    cy.get('#m-salario').type('1341.44')
    cy.get('#btnSalvar').click()

    cy.get('.divTable tbody').get('tr').eq(3)
      .within(() => {
        cy.get('td').eq(0).contains('MIROBANDO TUKUNARES')
        cy.get('td').eq(1).contains('BRINQUEIRO')
        cy.get('td').eq(2).contains('1341.44')
        cy.get('td').eq(3).get('button i').should('have.class', 'bx bx-edit')
        cy.get('td').eq(4).get('button i').should('have.class', 'bx bx-trash')
      })
  })

  it('Total registros', function () {
    cy.get('.divTable tbody').find('tr').should('have.length', 3)
  })


})