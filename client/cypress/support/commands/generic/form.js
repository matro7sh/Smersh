Cypress.Commands.add('fillInput', (input, value) => {
  cy.get(`[data-cy=${input}]`).type(value);
});

Cypress.Commands.add('selectValueIn', (input) => {
  cy.get(`input[name=${input}]`).click();
  cy.get(`[data-cy=${input}-item]`).last().click();
});
