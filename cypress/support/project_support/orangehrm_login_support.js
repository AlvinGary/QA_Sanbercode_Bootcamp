class LoginPage {
    // actions
    visit() {
        const firstVisitUrl = Cypress.env("orangehrmBaseUrl");
        cy.visit(`${firstVisitUrl}/auth/login`);
        cy.get("body").should("be.visible");
    }

    enterUsername(username) {
        cy.get("input[placeholder='Username']")
            .type(username)
            .should("have.value", username);
    }

    enterPassword(password) {
        cy.get("input[placeholder='Password']")
            .type(password)
            .should("have.value", password);
    }

    clickLogin() {
        cy.get("button[type='submit']").click();
    }

    // assertions
    verifyDashboard() {
        cy.url().should("include", "/dashboard/index");
    }

    verifyStayOnLogin() {
        cy.url().should("include", "/auth/login");
    }

    verifyInvalidCredentials() {
        cy.get(".oxd-alert-content.oxd-alert-content--error")
            .should("be.visible")
            .and("contain.text", "Invalid credentials");
    }

    verifyRequiredMessage(fieldPlaceholder) {
        cy.get(`input[placeholder='${fieldPlaceholder}']`)
            .parent()
            .siblings("span.oxd-input-field-error-message")
            .should("be.visible")
            .and("contain.text", "Required");
    }

    // api intercept
    interceptLogin() {
        cy.intercept("GET", "**/dashboard/employees/action-summary").as(
            "getDashboard"
        );
    }

    responseLoginSuccess() {
        cy.wait("@getDashboard").then((intercept) => {
            expect(intercept.response.statusCode).to.eq(200);
        });
    }

    interceptErrMessage() {
        cy.intercept("GET", "**/core/i18n/messages").as("getErrMessage");
    }

    responseErrMessageAppear() {
        cy.wait("@getErrMessage").then((intercept) => {
            expect(intercept.response.statusCode).to.eq(304);
        });
    }
}

export default new LoginPage();
