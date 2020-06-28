/// <reference types="Cypress" />


context('Crear publicacion', () => {
  beforeEach(() => {
    cy.visit('')
  })

  it('Hacer login y crear publicacion', () => {
    cy.get('#email').should('be.visible')
    cy.get('#email').should('be.enabled')

    cy.get('#password').should('be.visible')
    cy.get('#password').should('be.enabled')

    cy.get('#email').type('cristian.alvarado@ucr.ac.cr')
    cy.get('#password').type('prueba1234')
    cy.get('#boton').click()

    // Validar que si hice log in
    cy.get('.navbar').should('contain.text', 'Cristian Alvarado')

    const postContent = 'Texto  de prueba Cypress'

    cy.get('.texto').last().type(postContent)
    cy.get('#noModal').contains('Publicar').click()

  
    cy.get('.card-columns').should('contain.text', postContent)

    //logout
    cy.get('#userDropdown').click()
    cy.get('.dropdown-item').contains('Cerrar sesión').click()
    cy.get('.btn').contains('Salir').click()
  })
})
