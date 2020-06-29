/// <reference types="Cypress" />

context('Formulario de Login', () => {
  beforeEach(() => {
    cy.visit('')
  })

  it('Revisar validaciones formulario login', () => {
    cy.title().should('eq', 'BlueTweet')

    cy.get('#email').should('be.visible')
    cy.get('#email').should('be.enabled')

    cy.get('#password').should('be.visible')
    cy.get('#password').should('be.enabled')

    cy.get('#boton').should('be.visible')
    // cy.get('button.botonbonito').should('not.be.enabled')

    // cy.get('#email').type('patito@patito.com')
    cy.get('#email').type('incorrecto@incorrecto.com')
    // cy.get('button.botonbonito').should('not.be.enabled')

    cy.get('#password').type('123456')

    // El boton se habilita hasta que el formulatio
    // sea valido
    cy.get('#boton').should('be.enabled')

    cy.get('#boton').click()

    // Mensaje de error
    cy.get('.toast-message').should('be.visible')
    cy.get('.toast-title').should('be.visible')
    cy.get('.toast-title').should('contain.text', 'Error iniciando sesión')
    cy.get('.toast-message').should('contain.text', 'There is no user record')

    // Otros errores
    cy.get('#email').clear()
    cy.get('#password').clear()
    cy.get('#email').type('incorrect')
    cy.get('#password').type('123456')
    cy.get('#boton').should('be.disabled')
  


    cy.get('#email').clear()
    cy.get('#password').clear()
    cy.get('#email').type('cristian.alvarado@ucr.ac.cr')
    cy.get('#password').type('incorrecto')
    cy.get('#boton').click()
    cy.get('.toast-message').should('be.visible')
    cy.get('.toast-title').should('be.visible')
    cy.get('.toast-title').should('contain.text', 'Error iniciando sesión')

  })
})
