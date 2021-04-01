describe('Should test missions', () => {
  it('Should add, edit, delete a mission', () => {
    cy.visit('http://localhost:4200/login');
    cy.get('[data-cy=login]').type('jenaye');
    cy.get('[data-cy=password]').type('jenaye');
    cy.get('[data-cy=submit]').click();
    cy.url().should('include', '/missions');
    cy.get('[data-cy=title]').should(
      'have.text',
      'Welcome to your dashaboard '
    );
    cy.get('[data-cy=mission]').should('have.length', 2);
    cy.get('[data-cy=show-mission]').first().click();
    
    cy.get('[data-cy=mission-name-type]').should(
      'have.text',
      'FAKE-MISSION-EXTERNE - interne'
    );
  });
});
