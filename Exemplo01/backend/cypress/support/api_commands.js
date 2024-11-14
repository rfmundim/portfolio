Cypress.Commands.add('addClientes', (clienteData) => {
    clienteData.forEach((cliente, token) => {

        cy.request({
            method: 'POST',
            url: '/clientes',
            body: cliente,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
    })
})

Cypress.Commands.add('delClientes', (token) => {
    cy.request({
        method: 'GET',
        url: '/clientes',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => 
        response.body.forEach(cliente => {

            cy.request({
                method: 'DELETE',
                url: `/clientes/${cliente.id}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })          
            
        })
    )
}) 