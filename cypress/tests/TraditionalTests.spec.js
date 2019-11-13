'use strict';
import * as pageObjects from '../pageObjects/TraditionalTestObjects';

describe('ACME app', () => {
  describe('ACME app User login', () => {
    beforeEach(() => {
      pageObjects.actions.goToAppUrl();
    });
    describe('Login Page UI Elements Test:', () => {
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

    it('can get correct text headers', () => {
      pageObjects.expects.loginLabelTextIsCorrect(); 
    });

    it('can get correct a snapshot of the logo section', () => {
      cy.get('.logo-w').toMatchSnapshot();
    });
    it('can get correct a snapshot of the form group', () => {
      cy.get('.form-group').toMatchSnapshot();
    });
    it('can get correct a snapshot of the auth header', () => {
      cy.get('.auth-header').toMatchSnapshot();

    });
    it('can get correct a snapshot of the button group', () => {
      cy.get('.buttons-w').toMatchSnapshot();
    });
  })

    describe('Data-Driven Test', () => {
      beforeEach(() => {
        pageObjects.actions.goToAppUrl();
      });
      it('cannot login user without both username and password', () => {
        pageObjects.actions.clickLoginButton();
        pageObjects.expects.matchImageSnapshot('.alert-warning', 'cannot login user without both username and password')
        pageObjects.elements.alertWarning().contains("Both Username and Password must be present");
      });
      it('cannot login user without password', () => {
        pageObjects.actions.populateUsernameField('test');
        pageObjects.actions.clickLoginButton();
        pageObjects.expects.matchImageSnapshot('.alert-warning', 'cannot login user without password')
        pageObjects.elements.alertWarning().contains('Password must be present');
      });

      it('cannot login user without username', () => {
        pageObjects.actions.populatePasswordField('testPassword');
        pageObjects.actions.clickLoginButton();
        pageObjects.expects.matchImageSnapshot('.alert-warning', 'cannot login user without username')
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
         pageObjects.actions.clickAmountHeader()
         cy.get('#transactionsTable').toMatchSnapshot();
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

    it('can show expenses and forecast comparison chart consistency in different app versions',  () => {
       pageObjects.actions.clickCompareExpensesButton();
       pageObjects.expects.canvasChartIsPresent();
       pageObjects.expects.matchImageSnapshot('#canvas', 'expenses and forecast chart')
    });

    it('can show expenses and forecast comparison chart with 2019 comparison',  () => {
      pageObjects.actions.clickCompareExpensesButton();
      pageObjects.expects.canvasChartIsPresent();
      pageObjects.actions.clickDatasetButton();
      pageObjects.expects.matchImageSnapshot('#canvas', 'expenses and forecast chart with 2019 comparison');
   });

    });

    describe.only('Dynamic Content Test', () => {
      beforeEach(() => {
        pageObjects.actions.goToAppUrlWithAds();
        cy.login('test', 'user123');
    });
    
    it('can verify the ad section is visible', () => {
      pageObjects.expects.dashboardIsPresent();
      pageObjects.expects.firstAdSectionIsVisible();
      pageObjects.expects.secondAdSectionIsVisible();
      cy.get('.element-balances').toMatchSnapshot();
    });

    it('can verify that ad can change and be dynamic', () => {
      // currently unable to expect an unknown element id and snapshot it in cypress to ensure the test passes
      // We cannot mock an element that does not exist in our application yet
    })
  });
  

  afterEach(() => {
     cy.logout('test');
  });
});
});
