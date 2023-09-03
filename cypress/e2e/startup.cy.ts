describe('startup', () => {
  it('opens the app', () => {
    cy.visit('/')
  })

  it('redirect to dashboard', () => {
    cy.visit('/')
    cy.url().should('eq', Cypress.config().baseUrl + '/dashboard')
  })
})