import { requestApi } from './helpers';

describe('Should test vulns', () => {
  beforeEach(() => {
    cy.loadData();
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Should add a vulnurability then delete the added one', function () {
    const {
      api,
      client: {
        resources: {
          missions: { base },
          vulnerabilities,
        },
      },
    } = this.data.routes;
    cy.loginAs('pentester');
    cy.visit(base);

    cy.get(`a[data-cy=links][href="${vulnerabilities}"]`).last().click();
    cy.url().should('include', vulnerabilities);

    cy.get('[data-cy=action-button-create]').should(
      'contains.text',
      'Add Vulnerability'
    );
    cy.clickOn('action-button-create');
    cy.urlInclude(`${vulnerabilities}/create`);

    const name = 'Test name';
    const description = 'I describe the test';
    const remediation = 'This is the remediation input';
    cy.get('input[name=name]').type(name);
    cy.get('input[name=description]').type(description);
    cy.get('input[name=remediation]').type(remediation);

    // click the impact select
    cy.selectValueIn('impact');

    // click the type select
    cy.selectValueIn('type');

    cy.get('button[type=submit]').click();

    // should go to vulnerabilities after creating
    cy.urlInclude(vulnerabilities);
    cy.get('mat-row').last().contains(name);
    cy.get('mat-row').last().contains(description);
    cy.get('mat-row').last().contains(remediation);
    cy.get('mat-row').last().contains('/api/vuln_types/2');

    // delete the added vuln
    cy.get('[data-cy=action-button-delete]').last().click();

    cy.waitForRequest(
      {
        method: 'GET',
        url: requestApi(api, api['vulnerabilities']),
      },
      () => {
        cy.on('window:confirm', () => true);
      },
      () => {
        // check if deleted
        cy.get('mat-row').last().should('not.include.text', name);
        cy.get('mat-row').last().should('not.include.text', description);
        cy.get('mat-row').last().should('not.include.text', remediation);
      }
    );
  });
});
