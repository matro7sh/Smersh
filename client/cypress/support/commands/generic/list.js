import { requestApi } from '../../../integration/helpers';

Cypress.Commands.add(
  'waitForListRequest',
  function (resource, actions, callback = () => undefined, empty = false) {
    const {
      routes: {
        api,
        client: { resources },
      },
    } = this.data;
    cy.waitForRequest(
      {
        method: 'GET',
        url: requestApi(api, api[resource]),
      },
      () => {
        cy.visit(resources[resource].list);
      },
      () => {
        (actions ?? ['create', 'delete', 'edit', 'show']).forEach((action) => {
          expect(
            empty
              ? cy.get(`[data-cy=action-button-${action}]`).should('not.exist')
              : cy
                  .get(`[data-cy=action-button-${action}]`)
                  .should('have.not.length', 0)
          );
        });
        callback();
      }
    );
  }
);
