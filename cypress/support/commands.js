// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('getByTestId', (selector, ...args) => {
    return cy.get(`[data-testid=${selector}]`, ...args);
});

Cypress.Commands.add('login', (username, password) => {
    const apiBase = Cypress.env('apiServer');
    cy.intercept('POST', `${apiBase}authenticate`).as('loginUser');

    cy.getByTestId('login-username').type(username);
    cy.getByTestId('login-password').type(password);

    cy.getByTestId('login-button').click();
    cy.wait('@loginUser').then(() => {
        cy.location('pathname').should('eq', '/');
    });
});
