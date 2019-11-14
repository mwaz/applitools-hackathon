'use strict';

const elements = {
    logo: () => cy.get('body > div > div > div.logo-w > a > img'),
    logoUrl: () => cy.get('body > div > div > div.logo-w > a'),
    usernameLabel: () => cy.get('body > div > div > form > div:nth-child(1) > label'),
    passwordLabel: () => cy.get('body > div > div > form > div:nth-child(2) > label'),
    usernameField: () => cy.get('#username'),
    passwordField: () => cy.get('#password'),
    usernameIcon: () => cy.get('.form-group .os-icon-user-male-circle'),
    passwordIcon: () => cy.get('.form-group .os-icon-fingerprint'),
    loginButton: () => cy.get('#log-in'),
    rememberMeCheckBox: () => cy.get('body > div > div > form > div.buttons-w > div.form-check-inline > label > input, [type="checkbox"]'),
    twitterIcon: () => cy.get('body > div > div > form > div.buttons-w > div:nth-child(3) > a:nth-child(1) > img'),
    faceBookIcon: () => cy.get('body > div > div > form > div.buttons-w > div:nth-child(3) > a:nth-child(2) > img'),
    linkedInIcon: () => cy.get('body > div > div > form > div.buttons-w > div:nth-child(3) > a:nth-child(3)'),
    alertWarning: () => cy.get('.alert-warning'),
    userDashboard: () => cy.get('.element-balances'),
    amountsHeader: () => cy.get('#amount'),
    shopifyProduct: (positionId) => cy.get(`#transactionsTable > tbody > tr:nth-child(${positionId}) > td.cell-with-media > span`),
    mailChimpServices: (positionId) => cy.get(`#transactionsTable > tbody > tr:nth-child(${positionId}) > td.cell-with-media > span`),
    ebayMarketplace: (positionId) => cy.get(`#transactionsTable > tbody > tr:nth-child(${positionId}) > td.cell-with-media > span`),
    templatesInc: (positionId) => cy.get(`#transactionsTable > tbody > tr:nth-child(${positionId}) > td.cell-with-media > span`),
    stripePaymentProcessing: (positionId) => cy.get(`#transactionsTable > tbody > tr:nth-child(${positionId}) > td.cell-with-media > span`),
    starbucksCoffee: (positionId) => cy.get(`#transactionsTable > tbody > tr:nth-child(${positionId}) > td.cell-with-media > span`),
    expensesButton: () => cy.get('#showExpensesChart'),
    chartCanvas: () => cy.get('#canvas'),
    datasetButton: () => cy.get('#addDataset'),
    firstAdSection: () => cy.get('#flashSale'),
    secondAdSection: () => cy.get('#flashSale2'),
    authHeader: () => cy.get('.auth-header')
};

const expects = {
    usernameAndPasswordLabelsPresent() {
        elements.usernameLabel().should('be.visible');
        elements.passwordLabel().should('be.visible');
    },

    usernameAndPasswordLoginIconsPresent() {
        elements.usernameIcon().should('be.visible');
        elements.passwordIcon().should('be.visible');
    },

    loginButtonPresent() {
        elements.loginButton().should('be.visible')
    },
    rememberMeCheckboxPresent() {
        elements.rememberMeCheckBox().should('be.visible')
    },
    socialMediaIconsPresent() {
        elements.twitterIcon().should('be.visible');
        elements.faceBookIcon().should('be.visible');
        elements.linkedInIcon().should('be.visible');
    },
    logoPresent() {
        elements.logo().should('be.visible');
    },
    dashboardIsPresent() {
        elements.userDashboard().should('be.visible');
    },
    shopifyProductIsPresent({ positionId }) {
        elements.shopifyProduct(positionId).should('have.text', 'Shopify product');
    },
    mailChimpServicesIsPresent({ positionId }) {
        elements.mailChimpServices(positionId).should('have.text', 'MailChimp Services');
    },
    ebayMarketplaceIsPresent({ positionId }) {
        elements.ebayMarketplace(positionId).should('have.text', 'Ebay Marketplace');
    },
    templatesIncIsPresent({ positionId }) {
        elements.templatesInc(positionId).should('have.text', ' Templates Inc');
    },
    stripePaymentProcessingIsPresent({ positionId }) {
        elements.stripePaymentProcessing(positionId).should('have.text', 'Stripe Payment Processing');
    },
    starbucksCoffeeIsPresent({ positionId }) {
        elements.starbucksCoffee(positionId).should('have.text', 'Starbucks coffee');
    },
    canvasChartIsPresent() {
        elements.chartCanvas().should('be.visible');
    },
    firstAdSectionIsVisible(){
        let firstAdSection = elements.firstAdSection();
        firstAdSection.should('be.visible');
        firstAdSection.find('img').should('have.attr', 'src').should('include','flashSale')
    },
    secondAdSectionIsVisible(){
        let secondAdSection = elements.firstAdSection();
        secondAdSection.should('be.visible')
        secondAdSection.find('img').should('have.attr', 'src').should('include','flashSale')
    },
    usernameLabelTextIsCorrect(){
        elements.usernameLabel().should('have.text', 'Username');
    },
    passwordPlaceholderTextIsCorrect(){
        let passwordField= elements.passwordField();
        passwordField.should('have.attr', 'placeholder').should('include','Enter your password')
    },
    usernamePlaceholderTextIsCorrect(){
        let usernameField= elements.usernameField();
        usernameField.should('have.attr', 'placeholder').should('include','Enter your username')
    },
    passwordLabelTextIsCorrect(){
        elements.passwordLabel().should('have.text', 'Password');
    },
    loginLabelTextIsCorrect(){
        elements.authHeader().contains('Login Form');
    },
};

const actions = {
    clickLoginButton() {
        expects.usernameAndPasswordLabelsPresent();
        expects.loginButtonPresent();
        elements.loginButton().click();
    },
    clickRememberMeCheckBox() {
        expects.rememberMeCheckboxPresent();
        elements.rememberMeCheckBox().click()
            .check().should('be.checked')
    },
    populateUsernameField(username) {
        elements.usernameField().clear().type(username, { force: true });
    },
    clearUsernameField() {
        elements.usernameField().clear();
    },
    populatePasswordField(password) {
        elements.passwordField().clear().type(password, { force: true });
    },
    clickAmountHeader() {
        expects.dashboardIsPresent();
        elements.amountsHeader().click();
    },
    clickCompareExpensesButton() {
        expects.dashboardIsPresent();
        elements.expensesButton().click();
        cy.wait(1000)
    },
    clickDatasetButton() {
        expects.canvasChartIsPresent();
        elements.datasetButton().click();
        cy.wait(1000)
    },
    goToAppUrl(){
        cy.visit(`https://demo.applitools.com/hackathonV2.html`);
    },
    goToAppUrlWithAds(){
        cy.visit(`https://demo.applitools.com/hackathonV2.html?showAd=true`);
    }
}

module.exports = {
    expects,
    actions,
    elements
};
