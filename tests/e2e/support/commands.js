// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (username, password) => {
  cy.visit('http://localhost:8080/#/login')
  cy.get('#userName').type(username)
  cy.get('#password').type(password)
  cy.server()
  cy.route({
    method: 'POST',
    url: 'http://localhost:8080/api/v1/user/login'
  }).as('login')
  cy.get('button').click()
  cy.wait('@login').then(res => {
    expect(res.response.body.error).to.eq(0)
  })
})
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
