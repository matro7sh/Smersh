describe('Test missions as admin', () => {
  beforeEach(() => {
    cy.loadData();
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Setup as admin', function () {
    cy.loginAs('admin');
    cy.waitForListRequest('missions');
  });

  it('Should be able to create a mission as an admin user', function () {
    cy.waitForListRequest('missions', [], () => {
      cy.clickOn('action-button-create');
      cy.urlInclude(
        `${this.data.routes.client.resources.missions.base}/create`
      );
    });
  });

  it('Should be able to show a mission as an admin user', function () {
    cy.waitForListRequest('missions', [], () => {
      cy.clickOn('action-button-show');
      cy.urlInclude(`${this.data.routes.client.resources.missions.base}/`);
    });
  });

  it('Should be able to edit a mission as an admin user', function () {
    cy.waitForListRequest('missions', [], () => {
      cy.clickOn('action-button-edit');
      cy.urlInclude('/edit');
    });
  });

  it('Should be able to delete a mission as an admin user', function () {
    cy.waitForListRequest('missions', ['delete']);
  });
});

describe('Test missions as manager', () => {
  beforeEach(() => {
    cy.loadData();
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Setup as manager', function () {
    cy.loginAs('manager');
    cy.waitForListRequest('missions');
  });

  it('Should be able to create a mission as a manager user', function () {
    cy.waitForListRequest('missions', [], () => {
      cy.clickOn('action-button-create');
      cy.urlInclude(
        `${this.data.routes.client.resources.missions.base}/create`
      );
    });
  });

  it('Should be able to show a mission as a manager user', function () {
    cy.waitForListRequest('missions', [], () => {
      cy.clickOn('action-button-show');
      cy.urlInclude(`${this.data.routes.client.resources.missions.base}/`);
    });
  });

  it('Should be able to edit a mission as a manager user', function () {
    cy.waitForListRequest('missions', [], () => {
      cy.clickOn('action-button-edit');
      cy.urlInclude('/edit');
    });
  });

  it('Should be able to delete a mission as a manager user', function () {
    cy.waitForListRequest('missions', ['delete']);
  });
});

describe('Test missions as pentester', () => {
  beforeEach(() => {
    cy.loadData();
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Setup as pentester', function () {
    cy.loginAs('pentester');
    cy.waitForListRequest('missions', []);
  });

  it('Should not be able to create a mission as a pentester user', function () {
    cy.waitForListRequest('missions', ['create'], () => undefined, true);
  });

  it('Should be able to show a mission as a pentester user', function () {
    cy.waitForListRequest('missions', [], () => {
      cy.clickOn('action-button-show');
      cy.urlInclude(`${this.data.routes.client.resources.missions.base}/`);
    });
  });

  it('Should be able to edit a mission as a pentester user', function () {
    cy.waitForListRequest('missions', [], () => {
      cy.clickOn('action-button-edit');
      cy.urlInclude('/edit');
    });
  });

  it('Should not be able to delete a mission as a pentester user', function () {
    cy.waitForListRequest('missions', ['delete'], () => undefined, true);
  });
});

describe('Test missions as an unassigned pentester', () => {
  beforeEach(() => {
    cy.loadData();
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Setup as unassigned_pentester', function () {
    cy.loginAs('unassigned_pentester');
  });

  it('Should not be able to see any mission as an unassigned pentester user', function () {
    cy.waitForListRequest('missions', undefined, () => undefined, true);
  });
});

describe('Test missions as guest', () => {
  beforeEach(() => {
    cy.loadData();
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Setup as guest', function () {
    cy.loginAs('guest');
  });

  it('Should not be able to see any mission as an unassigned pentester user', function () {
    cy.urlInclude('/login');
    cy.visit(this.data.routes.client.resources.missions.base);
    cy.urlInclude('/login');
  });
});
