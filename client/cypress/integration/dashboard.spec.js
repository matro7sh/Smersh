describe('Should test dashboard', () => {
  it('Should redirect to login if used not authenticated', () => {
    cy.visit('http://localhost:4200/dashboard');
    cy.url().should('include', '/login');
  });
});
