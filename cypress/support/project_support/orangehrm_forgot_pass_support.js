class ForgotPassword {
    // actions
    clickForgotPassLink() {
        cy.contains(
            ".orangehrm-login-forgot-header",
            "Forgot your password?"
        ).click();
    }

    clickResetBtn() {
        cy.contains("button[type='submit']", "Reset Password").click();
    }

    clickCancelBtn() {
        cy.contains("button[type='button']", "Cancel").click();
    }

    enterUsername(username) {
        cy.get("input[placeholder='Username']")
            .type(username)
            .should("have.value", username);
    }

    // assertions
    verifyResetPasswordPage() {
        cy.url().should("include", "/requestPasswordResetCode");
    }

    verifySendResetSuccess() {
        cy.url().should("include", "auth/sendPasswordReset");
    }

    verifyLoginPage() {
        cy.url().should("include", "auth/login");
    }

    verifyRequiredMessage() {
        cy.get("span.oxd-input-field-error-message")
            .should("be.visible")
            .and("contain.text", "Required");
    }

    verifyResetPassPageTitle(titleValue) {
        cy.get("h6.orangehrm-forgot-password-title").should(
            "have.text",
            titleValue
        );
    }

    // intercept
    interceptRequest() {
        cy.intercept("GET", "**/core/i18n/messages").as("requestResponse");
    }

    interceptResponse() {
        cy.wait("@requestResponse").then((intercept) => {
            expect(intercept.response.statusCode).to.eq(304);
        });
    }
}

export default new ForgotPassword();
