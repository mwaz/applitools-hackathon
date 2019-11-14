'use strict';

Cypress.Commands.add('login', (username, password) => {
  cy.server();
  cy.wait(1000);
  cy.get('#username', { timeout: 10000 }).then($UserName => {
    if ($UserName) {
      cy.get('#username').type(username, { force: true });
      cy.get('#password').type(password, { force: true });
      cy.get('#log-in').click({ force: true });
    }
  });
});

Cypress.Commands.add('logout', () => {
  cy.wait(500);
  cy.visit(`https://demo.applitools.com/hackathon.html`);
});
