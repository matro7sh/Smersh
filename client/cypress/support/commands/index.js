import { requestBaseApi } from '../../integration/helpers';

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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add('saveLocalStorage', () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add('restoreLocalStorage', () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});

Cypress.Commands.add('loadData', function () {
  cy.fixture('data.json').as('data');
});

Cypress.Commands.add('fillInput', (input, value) => {
  cy.get(`[data-cy=${input}]`).type(value);
});

Cypress.Commands.add(
  'waitForRequest',
  (request, action = () => undefined, callback = () => undefined) => {
    const timestamp = Date.now();
    cy.intercept(request).as(`handleRequest-${timestamp}`);
    action();
    cy.wait(`@handleRequest-${timestamp}`).should(callback);
  }
);

Cypress.Commands.add('clickOn', (input) => {
  cy.get(`[data-cy=${input}]`).first().click();
});

Cypress.Commands.add('urlInclude', (url) => {
  cy.url().should('include', url);
});

Cypress.Commands.add(
  'loginAs',
  function (
    user,
    { isValid = true, password, username } = {
      isValid: true,
      password: '',
      username: '',
    }
  ) {
    const {
      routes: { api, client },
      storage: { token },
    } = this.data;
    cy.visit(client.login);
    cy.fillInput('login', user || username);
    cy.fillInput('password', user || password);
    cy.waitForRequest(
      {
        method: 'POST',
        url: requestBaseApi(api, api.login),
      },
      () => {
        cy.get('[data-cy=submit]').click();
      },
      () => {
        if (!isValid) {
          expect(localStorage.getItem(token)).to.not.exist;
        } else {
          expect(localStorage.getItem(token)).to.exist;
        }
      }
    );
  }
);
