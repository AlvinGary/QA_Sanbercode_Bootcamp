class LoginPage {
    // selectors
    usernameInput = "input[placeholder='Username']";
    passwordInput = "input[placeholder='Password']";
    loginBtn = "button[type='submit']";
    dashboardUrl = "/dashboard/index";
    loginUrl = "/auth/login";
    successLoginUrl = "**/dashboard/employees/action-summary";
    errMessageUrl = "**/core/i18n/messages";
    errorAlert = ".oxd-alert-content.oxd-alert-content--error";
    requiredFieldMsg = "span.oxd-input-field-error-message";

    // actions
    visit() {
        cy.visit(
            "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
        );
        cy.get("body").should("be.visible");
    }

    enterUsername(username) {
        cy.get(this.usernameInput)
            .type(username)
            .should("have.value", username);
    }

    enterPassword(password) {
        cy.get(this.passwordInput)
            .type(password)
            .should("have.value", password);
    }

    clickLogin() {
        cy.get(this.loginBtn).click();
    }

    // assertions
    verifyDashboard() {
        cy.url().should("include", this.dashboardUrl);
    }

    verifyStayOnLogin() {
        cy.url().should("include", this.loginUrl);
    }

    verifyInvalidCredentials() {
        cy.get(this.errorAlert).should("be.visible");
        cy.get(this.errorAlert).should("contain.text", "Invalid credentials");
    }

    verifyRequiredMessage(fieldPlaceholder) {
        cy.get(`input[placeholder='${fieldPlaceholder}']`)
            .parent()
            .siblings(this.requiredFieldMsg)
            .should("be.visible")
            .and("contain.text", "Required");
    }

    // api
    interceptLogin() {
        cy.intercept("GET", this.successLoginUrl).as("getDashboard");
    }

    responseLoginSuccess() {
        cy.wait("@getDashboard").then((intercept) => {
            expect(intercept.response.statusCode).to.eq(200);
        });
    }

    interceptErrMessage() {
        cy.intercept("GET", this.errMessageUrl).as("getErrMessage");
    }

    responseErrMessageAppear() {
        cy.wait("@getErrMessage").then((intercept) => {
            expect(intercept.response.statusCode).to.eq(304);
        });
    }
}

export default new LoginPage();
