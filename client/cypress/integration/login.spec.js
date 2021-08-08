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

  it('Should login successfully as guest', function () {
    cy.loginAs('guest');
  });

  it('Should not login as nonexistent user', function () {
    cy.loginAs('', {
      isValid: false,
      password: 'invalid',
      username: 'nonexistent',
    });
  });
});
