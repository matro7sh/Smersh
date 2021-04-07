describe('Should test dashboard', () => {
  beforeEach(() => {
    // load data.json fixture file and store
    // in the test context object
    cy.fixture('data.json').as('data');
  });

  it('Should redirect to login if used not authenticated', function () {
    // can use test context object "this"
    cy.visit(`${this.data.baseUrl}${this.data.dashboardRoute}`);
    cy.url().should('include', `${this.data.loginRoute}`);
  })
});
