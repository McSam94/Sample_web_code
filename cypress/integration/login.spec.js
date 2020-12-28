describe('Login', () => {
    const apiBase = Cypress.env('apiServer');

    it('login redirect', () => {
        cy.visit('/');
        cy.location('pathname').should('eq', '/login');
    });

    it('login empty', () => {
        cy.intercept('GET', `${apiBase}version`).as('getVersion');

        cy.wait('@getVersion');

        cy.getByTestId('login-button').click();
        cy.contains('Username field is required').should('be.visible');
        cy.contains('Password field is required').should('be.visible');
    });

    it('login action', () => {
        cy.intercept('POST', `${apiBase}authenticate`).as('loginUser');

        cy.getByTestId('login-username').type('saikhuan');
        cy.getByTestId('login-password').type('password');

        cy.getByTestId('login-button').click();
        cy.wait('@loginUser').then(() => {
            cy.location('pathname').should('eq', '/');
        });
    });
});
