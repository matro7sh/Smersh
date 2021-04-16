describe('Should test login', () => {
  beforeEach(() => {
    // load data.json fixture file and store
    // in the test context object
    cy.fixture('data.json').as('data');
  });

  it('Should login with right credentials', function () {
    cy.visit(`${this.data.baseUrl}${this.data.loginRoute}`);
    cy.get('[data-cy=login]').type(this.data.username);
    cy.get('[data-cy=password]').type(this.data.password);
    cy.get('[data-cy=submit]')
      .click()
      .should(() => {
        expect(localStorage.getItem('token')).to.exist;
      });
  });
});
