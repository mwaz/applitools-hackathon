'use strict';
import * as pageObjects from '../pageObjects/TraditionalTestObjects';

describe('ACME app', () => {
    describe('Login Page UI Elements Test:', () => {
        beforeEach(() => {
            pageObjects.actions.goToAppUrl();
        })
        it('can get all form elements on login page', () => {
            cy.eyesOpen({
                testName: 'Login Page UI Elements Test: can get all form elements on login page',
            });

            cy.eyesCheckWindow({
                sizeMode: 'selector',
                selector: '.auth-box-w'
            });
        });
    })

    describe('Data-Driven Test', () => {
        beforeEach(() => {
            pageObjects.actions.goToAppUrl();
        });
        it('cannot login user without both username and password', () => {
            cy.eyesOpen({
                testName: 'Data-Driven Test: cannot login user without both username and password',
            });

            pageObjects.actions.clickLoginButton();
            cy.eyesCheckWindow({
                sizeMode: 'selector',
                selector: '.alert-warning'
            });
        });
        it('cannot login user without password', () => {
            cy.eyesOpen({
                testName: 'Data-Driven Test: cannot login user without password',
            });

            pageObjects.actions.populateUsernameField('test');
            pageObjects.actions.clickLoginButton();

            cy.eyesCheckWindow({
                sizeMode: 'selector',
                selector: '.alert-warning'
            });
        });

        it('cannot login user without username', () => {
            cy.eyesOpen({
                testName: 'Data-Driven Test: cannot login user without username',
            });

            pageObjects.actions.populatePasswordField('testPassword');
            pageObjects.actions.clickLoginButton();

            cy.eyesCheckWindow({
                sizeMode: 'selector',
                selector: '.alert-warning'
            });
        });

        it('can successfully log in user', () => {
            cy.eyesOpen({
                testName: 'Data-Driven Test: can successfully log in user',
            });

            pageObjects.actions.populateUsernameField('test');
            pageObjects.actions.populatePasswordField('testPassword');
            pageObjects.actions.clickLoginButton();
            cy.eyesCheckWindow('Dashboard');
        });
    });

    describe('Table Sort Test', () => {
        beforeEach(() => {
            pageObjects.actions.goToAppUrl();
            cy.login('test', 'user123');
        });
        it('can verify amounts are sorted in ascending order', () => {
            cy.eyesOpen({
                testName: 'Table Sort Test: can verify amounts are sorted in ascending order',
            });

            cy.eyesCheckWindow('Unsorted Amounts');
            pageObjects.actions.clickAmountHeader()
            cy.eyesCheckWindow('Sorted Amounts on Click');
        });
    });

    describe('Canvas Chart Test', () => {
        beforeEach(() => {
            pageObjects.actions.goToAppUrl();
            cy.login('test', 'user123');
        })
        it('can show expenses and forecast comparison chart', () => {
            cy.eyesOpen({
                testName: 'Canvas Chart Test: can show expenses and forecast comparison charts',
            });

            pageObjects.actions.clickCompareExpensesButton();
            cy.eyesCheckWindow('expenses and forecast chart');
            pageObjects.actions.clickDatasetButton();
            cy.eyesCheckWindow('expenses and forecast chart with 2019 comparison');
        });
    });

    describe('Dynamic Content Test', () => {
        beforeEach(() => {
            pageObjects.actions.goToAppUrlWithAds();
            cy.login('test', 'user123');
        });
        it('can verify that the add section is visible and dynamic', () => {
            cy.eyesOpen({
                testName: 'Dynamic Content Test: can verify that the ads section is visible and dynamic',
                matchLevel: 'Layout'
            });

            cy.eyesCheckWindow({
                sizeMode: 'selector',
                selector: '.element-balances',
            });
        })
    });

    afterEach(() => {
        cy.logout('test');
        cy.eyesClose();
    });
});
