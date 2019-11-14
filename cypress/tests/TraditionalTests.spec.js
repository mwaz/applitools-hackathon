'use strict';
import * as pageObjects from '../pageObjects/TraditionalTestObjects';

describe('ACME app', () => {
  describe('Login Page UI Elements Test:', () => {
    beforeEach(() => {
      pageObjects.actions.goToAppUrl();
    });
    it('can get all form elements on login page', () => {
      pageObjects.expects.logoPresent();
      pageObjects.expects.loginButtonPresent();
      pageObjects.expects.rememberMeCheckboxPresent();
      pageObjects.expects.usernameAndPasswordLabelsPresent();
      pageObjects.expects.usernameAndPasswordLoginIconsPresent();
      pageObjects.expects.socialMediaIconsPresent();
    });

    it('can get correct text for input labels', () => {
      pageObjects.expects.usernameLabelTextIsCorrect();
      pageObjects.expects.passwordLabelTextIsCorrect();
    });

    it('can get correct placeholder text for form input', () => {
      pageObjects.expects.passwordPlaceholderTextIsCorrect();
      pageObjects.expects.usernamePlaceholderTextIsCorrect();
    });

    it('can get correct form title headers', () => {
      pageObjects.expects.loginLabelTextIsCorrect();
    });

    it('can check that logo position is correct', () => {
      // Unable to write the test using assertions as 
      // various aspects of the position of the logo  can change
      // including the height of the logo, the width or even the 
      // dispalacement along x or y axis.
    });
    it('can check the position of items in the form group', () => {
      // Unable to write the test to check elements position using functional assertions as 
      // various aspects of the position  can change
      // including the height of the elements, the width or even the 
      // dispalacement along x or y axis.
    });
    it('can check the position of the button group', () => {
      // Unable to write functional tests to check the button group elements such as the checkbox.
      // It is difficult to determine the changes that can happen to the elements
      // including the height of the elements, the width, margin or even the 
      // dispalacement along x or y axis.
    });
  })

  describe('Data-Driven Test', () => {
    beforeEach(() => {
      pageObjects.actions.goToAppUrl();
    });
    it('cannot login user without both username and password', () => {
      pageObjects.actions.clickLoginButton();
      pageObjects.elements.alertWarning().contains("Please enter both username and password");
    });
    it('cannot login user without password', () => {
      pageObjects.actions.populateUsernameField('test');
      pageObjects.actions.clickLoginButton();
      pageObjects.elements.alertWarning().contains('Password must be present');
    });

    it('cannot login user without username', () => {
      pageObjects.actions.populatePasswordField('testPassword');
      pageObjects.actions.clickLoginButton();
      pageObjects.elements.alertWarning().contains('Username must be present');
    });

    it('can successfully log in user', () => {
      pageObjects.actions.populateUsernameField('test');
      pageObjects.actions.populatePasswordField('testPassword');
      pageObjects.actions.clickLoginButton();
      pageObjects.expects.dashboardIsPresent();
    });

    it('can successfully log in user with different login details', () => {
      pageObjects.actions.populateUsernameField('TestUser');
      pageObjects.actions.populatePasswordField('AnotherTestPassword');
      pageObjects.actions.clickLoginButton();
      pageObjects.expects.dashboardIsPresent();
    });
  });

  describe('Table Sort Test', () => {
    beforeEach(() => {
      pageObjects.actions.goToAppUrl();
      cy.login('test', 'user123');
    });
    it('can confirm amount details are correct and consistent over time', () => {
      // Unable to write functional tests to check the consistency over time as
      // It is difficult to determine the changes that can happen to all the rows of the table
      // which could even be a feature break of the sorting functionality
    });
    it('can verify amounts are sorted in ascending order', () => {
      pageObjects.expects.starbucksCoffeeIsPresent({ positionId: 1 });
      pageObjects.expects.stripePaymentProcessingIsPresent({ positionId: 2 });
      pageObjects.expects.mailChimpServicesIsPresent({ positionId: 3 });
      pageObjects.expects.shopifyProductIsPresent({ positionId: 4 });
      pageObjects.expects.ebayMarketplaceIsPresent({ positionId: 5 });
      pageObjects.expects.templatesIncIsPresent({ positionId: 6 });

      pageObjects.actions.clickAmountHeader()

      pageObjects.expects.mailChimpServicesIsPresent({ positionId: 1 });
      pageObjects.expects.ebayMarketplaceIsPresent({ positionId: 2 });
      pageObjects.expects.shopifyProductIsPresent({ positionId: 3 });
      pageObjects.expects.templatesIncIsPresent({ positionId: 4 });
      pageObjects.expects.stripePaymentProcessingIsPresent({ positionId: 5 });
      pageObjects.expects.starbucksCoffeeIsPresent({ positionId: 6 });
    });


  });

  describe('Canvas Chart Test', () => {
    beforeEach(() => {
      pageObjects.actions.goToAppUrl();
      cy.login('test', 'user123');
    });

    it('can get chart data labels', () => {
      pageObjects.actions.clickCompareExpensesButton();
      cy.window().then((win) => {
        let labels = win.myBar.data.labels
        expect(labels).contains('January');
        expect(labels).contains('February');
        expect(labels).contains('March');
        expect(labels).contains('April');
        expect(labels).contains('May');
        expect(labels).contains('June');
        expect(labels).contains('July');
      });
    });

    it('can show expenses and forecast comparison chart for 2017 and 2018', () => {
      pageObjects.actions.clickCompareExpensesButton();

      cy.window().then((win) => {

        // 2017 datasets 
        let january2017Data = win.myBar.data.datasets[0].data[0];
        let february2017Data = win.myBar.data.datasets[0].data[1];
        let march2017Data = win.myBar.data.datasets[0].data[2];
        let april2017Data = win.myBar.data.datasets[0].data[3];
        let may2017Data = win.myBar.data.datasets[0].data[4];
        let june2017Data = win.myBar.data.datasets[0].data[5];
        let july2017Data = win.myBar.data.datasets[0].data[6];

        // 2018 datasets 
        let january2018Data = win.myBar.data.datasets[1].data[0];
        let february2018Data = win.myBar.data.datasets[1].data[1];
        let march2018Data = win.myBar.data.datasets[1].data[2];
        let april2018Data = win.myBar.data.datasets[1].data[3];
        let may2018Data = win.myBar.data.datasets[1].data[4];
        let june2018Data = win.myBar.data.datasets[1].data[5];
        let july2018Data = win.myBar.data.datasets[1].data[6];

        // 2017 assertions
        expect(january2017Data).to.equal(10);
        expect(february2017Data).to.equal(20);
        expect(march2017Data).to.equal(30);
        expect(april2017Data).to.equal(40);
        expect(may2017Data).to.equal(50);
        expect(june2017Data).to.equal(60);
        expect(july2017Data).to.equal(70);

        // 2018  assertions
        expect(january2018Data).to.equal(8);
        expect(february2018Data).to.equal(9);
        expect(march2018Data).to.equal(-10);
        expect(april2018Data).to.equal(10);
        expect(may2018Data).to.equal(40);
        expect(june2018Data).to.equal(60);
        expect(july2018Data).to.equal(40);
      });
    });

    it('can show expenses and forecast comparison chart with year 2019', () => {
      pageObjects.actions.clickCompareExpensesButton();
      pageObjects.actions.clickDatasetButton();

      cy.window().then((win) => {

        // 2019 datasets 
        let january2019Data = win.myBar.data.datasets[2].data[0];
        let february2019Data = win.myBar.data.datasets[2].data[1];
        let march2019Data = win.myBar.data.datasets[2].data[2];
        let april2019Data = win.myBar.data.datasets[2].data[3];
        let may2019Data = win.myBar.data.datasets[2].data[4];
        let june2019Data = win.myBar.data.datasets[2].data[5];
        let july2019Data = win.myBar.data.datasets[2].data[6];

        // 2019  assertions
        expect(january2019Data).to.equal(5);
        expect(february2019Data).to.equal(10);
        expect(march2019Data).to.equal(15);
        expect(april2019Data).to.equal(20);
        expect(may2019Data).to.equal(25);
        expect(june2019Data).to.equal(30);
        expect(july2019Data).to.equal(35);

      });
    });
  });

  describe('Dynamic Content Test', () => {
    beforeEach(() => {
      pageObjects.actions.goToAppUrlWithAds();
      cy.login('test', 'user123');
    });

    it('can verify the ad sections are visible', () => {
      pageObjects.expects.dashboardIsPresent();
      pageObjects.expects.firstAdSectionIsVisible();
      pageObjects.expects.secondAdSectionIsVisible();
    });

    it('can verify that different shown ads can change and be dynamic', () => {
      // unable to write a functional test that can check the change of an ad 
      // as this requires being able to evaluate what has changed
      // and what it has changed to and make those assertions

    })
  });

  afterEach(() => {
    cy.logout('test');
  });
});

