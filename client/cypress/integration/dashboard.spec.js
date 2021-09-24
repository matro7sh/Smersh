describe('Should test dashboard', () => {
  beforeEach(function () {
    cy.loadData();
  });

  it('Should not be redirect to login if I am not authenticated', function () {
    cy.visit(`${this.data.routes.client.dashboard}`);
    cy.url().should('include', `${this.data.routes.client.login}`);
  });

  it('Should be redirect if I am authenticated', function () {
    const {
      routes: {
        client: {
          dashboard,
          resources: {
            missions: { base },
          },
        },
      },
    } = this.data;
    cy.loginAs('admin');
    cy.visit(dashboard);
    cy.url().should('include', dashboard);
    cy.url().should('include', base);
  });
});
