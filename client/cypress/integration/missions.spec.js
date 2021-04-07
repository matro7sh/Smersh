describe('Should test missions', () => {
  before(() => {
    cy.fixture('data.json').as('data');
    cy.login();
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it('Should add, edit, delete a mission', function () {
    cy.visit(this.data.missionsRoute);
    cy.url().should('include', this.data.missionsRoute);
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
