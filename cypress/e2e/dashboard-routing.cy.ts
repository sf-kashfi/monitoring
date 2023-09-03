import cypress = require("cypress");

describe('dashboard routing', () => {
  const baseUrl = Cypress.config().baseUrl
  const visitDashboardAndClickMenuItem = (menuItem: string) => {
    cy.visit('/');
    cy.get(`[data-cy="dashboard-sidemenu-${menuItem}"]`).click();
    }
  describe('indicator', () => {
    it('shows indicator path in addressbar', () => {
      visitDashboardAndClickMenuItem('indicators');
      cy.url().should("eq",baseUrl+"/dashboard/indicator")
    })
    it('shows indicator grid page ', () => {
      visitDashboardAndClickMenuItem('indicators');
      cy.get('[data-cy="indicators-container"').should("exist")
    })
  })
  describe('financial-relations', () => {
    it('shows financial relations path in addressbar', () => {
      visitDashboardAndClickMenuItem('financial-relations');
      cy.url().should("eq",baseUrl+"/dashboard/financial-relations")
    })
    it('shows dps grid page ', () => {
      visitDashboardAndClickMenuItem('financial-relations');
      cy.get('[data-cy="financial-relations-container"').should("exist")
    })
  })
  describe('dps', () => {
    it('shows dps path in addressbar', () => {
      visitDashboardAndClickMenuItem('dps');
      cy.url().should("eq",baseUrl+"/dashboard/dps")
    })
    it('shows dps grid page ', () => {
      visitDashboardAndClickMenuItem('dps');
      cy.get('[data-cy="dps-container"').should("exist")
    })
  })
  })