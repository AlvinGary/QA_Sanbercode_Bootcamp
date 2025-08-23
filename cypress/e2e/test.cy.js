describe("Scenario Login", () => {
    beforeEach(() => {
        cy.visit("https://www.saucedemo.com/v1/index.html");
        cy.get("body").should("be.visible");
    });
    it("TC001-Login with valid username and password", () => {
        cy.get("#user-name")
            .type("standard_user")
            .should("have.value", "standard_user");
        cy.get("#password")
            .type("secret_sauce")
            .should("have.value", "secret_sauce");
        cy.get("#login-button").click();
        cy.url().should("include", "/inventory");
    });
    it("TC002-Login with invalid username and valid password", () => {
        cy.get("#user-name").type("wrong_user");
        cy.get("#password").type("secret_sauce");
        cy.get("#login-button").click();
        cy.get('[data-test="error"]').should("be.visible");
        cy.get('[data-test="error"]').should(
            "contain.text",
            "Epic sadface: Username and password do not match any user in this service"
        );
    });
    it("TC003-Login with valid username and invalid password", () => {
        cy.get("#user-name").type("standard_user");
        cy.get("#password").type("secret_wrong");
        cy.get("#login-button").click();
        cy.get('[data-test="error"]').should("be.visible");
        cy.get('[data-test="error"]').should(
            "contain.text",
            "Epic sadface: Username and password do not match any user in this service"
        );
    });
});
