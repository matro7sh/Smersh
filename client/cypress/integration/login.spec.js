describe('Admin login', () => {
  beforeEach(function () {
    cy.loadData();
  });

  it('Should login successfully as admin', function () {
    cy.loginAs('admin');
  });

  it('Should login successfully as manager', function () {
    cy.loginAs('manager');
  });

  it('Should login successfully as client', function () {
    cy.loginAs('client');
  });

  it('Should not login as nonexistent user', function () {
    cy.loginAs('', {
      isValid: false,
      password: 'invalid',
      username: 'nonexistent',
    });
  });
});
