describe('Setting', () => {
    // const apiBase = Cypress.env('apiServer');

    it('init', () => {
        cy.visit('/');
        cy.login('saikhuan', 'password');
        cy.visit('/setting');
    });

    it('dark mode', () => {
        cy.getByTestId('toggle-darkmode').click();
        cy.getByTestId('app-container').should('have.class', 'theme--dark');

        cy.getByTestId('toggle-darkmode').click();
        cy.getByTestId('app-container').should('have.class', 'theme--light');
    });

    it('logoutt', () => {
        cy.getByTestId('logout-button').click();

        cy.location('pathname').should('eq', '/login');
    });
});
