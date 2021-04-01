describe('Should test vulns', () => {
  it('Should add a vulnurability then delete the added one', () => {
    cy.visit('http://localhost:4200/login');
    cy.get('[data-cy=login]').type('jenaye');
    cy.get('[data-cy=password]').type('jenaye');
    cy.get('[data-cy=submit]').click();

    cy.get('[data-cy=links]').last().click();
    cy.url().should('include', '/vulnerabilities');

    cy.get('[data-cy=add-item]').click();

    cy.get('[data-cy=create-vuln]').should('have.text', 'Create Vuln');

    cy.get('[data-cy=name]').type('test name');
    cy.get('[data-cy=description]').type('test description');
    cy.get('[data-cy=remediation]').type('test remediation');

    // click the impact select
    cy.get('[data-cy=impact-select]').click();
    cy.get('[data-cy=impact-items]').last().click();

    // click the type select
    cy.get('[data-cy=type-select]').click();
    cy.get('[data-cy=type-items]').last().click();

    cy.get('[data-cy=create]').click();

    // should go to vulnerabilities after creating
    cy.url().should('include', '/vulnerabilities');
    cy.get('mat-table mat-row mat-cell').contains('/api/vuln_types/2');
    cy.get('mat-table mat-row mat-cell').contains('test description');
    cy.get('mat-table mat-row mat-cell').contains('test name');
    cy.get('mat-table mat-row mat-cell').contains('test remediation');

    // delete the added vuln
    cy.get('[data-cy=action-buttons]').last().click();
    cy.on('window:confirm', () => true);

    // check if deleted
    cy.get('mat-table mat-row mat-cell').should('not.contain', 'test name');

  });
});
