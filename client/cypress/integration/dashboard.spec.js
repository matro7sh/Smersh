describe('Should test dashboard', () => {
  before(function () {
    cy.loadData();
  });

  it('Should be redirect to login if I am not authenticated', function () {
    cy.visit(`${this.data.routes.client.dashboard}`);
    cy.url().should('include', `${this.data.routes.client.login}`);
  });

  it('Should not be redirect if I am authenticated', function () {
    const {
      routes: {
        client: { dashboard },
      },
      client: { admin },
    } = this.data;
    cy.loginAs(admin);
    cy.visit(dashboard);
    cy.url().should('include', dashboard);
  });
});
