/// <reference types="Cypress" />

context('Login y Logout', () => {
  beforeEach(() => {
    cy.visit('')
  })

  it('Hacer login', () => {
    cy.get('#email').should('be.visible')
    cy.get('#email').should('be.enabled')

    cy.get('#password').should('be.visible')
    cy.get('#password').should('be.enabled')

    cy.get('#email').type('cristian.alvarado@ucr.ac.cr')
    cy.get('#password').type('prueba1234')
    cy.get('#boton').click()

    // Validar que si hice log in
    cy.get('.navbar').should('contain.text', 'Cristian Alvarado')

    cy.get('#userDropdown').click()
    cy.get('.dropdown-item').contains('Cerrar sesión').click()
    cy.get('.btn').contains('Salir').click()

  })
})
