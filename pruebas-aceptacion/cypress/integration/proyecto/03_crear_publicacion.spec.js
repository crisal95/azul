/// <reference types="Cypress" />

import Chance from 'chance'
const chance = new Chance()

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
    cy.get('.navbar-brand').should('contain.text', 'Cristian Alvarado')

    const postTitle = chance.sentence({words: 3})
    const postContent = chance.paragraph({sentences: 3})

    cy.get('[data-test=post-title]').type(postTitle)
    cy.get('[data-test=post-content]').type(postContent)
    cy.get('[data-test=submit-post-button').click()

    cy.get('tbody').should('contain.text', postTitle)
    cy.get('tbody').should('contain.text', postContent)

    cy.get('#navbarsExampleDefault a').contains('Logout').click()
  })
})
