import login_page from "../../support/project_support/orangehrm_login_support";
import login_data from "../../fixtures/orangehrm_data/project_data/orangehrm_login_data.json";
import forgotpass_page from "../../support/project_support/orangehrm_forgot_pass_support";

describe("Forgot Password Feature OrangeHRM", () => {
    beforeEach(() => {
        login_page.visit();
    });

    it("TC_FORGOT_PASS_001-To Reset Password Page", () => {
        forgotpass_page.interceptRequest();
        forgotpass_page.clickForgotPassLink();
        forgotpass_page.interceptResponse();
        forgotpass_page.verifyResetPasswordPage();
        forgotpass_page.verifyResetPassPageTitle("Reset Password");
    });

    it("TC_FORGOT_PASS_002-Reset Password Success (Valid Username)", () => {
        forgotpass_page.interceptRequest();
        forgotpass_page.clickForgotPassLink();
        forgotpass_page.interceptResponse();
        forgotpass_page.enterUsername(login_data.ValidUsername);
        forgotpass_page.interceptRequest();
        forgotpass_page.clickResetBtn();
        forgotpass_page.interceptResponse();
        forgotpass_page.verifySendResetSuccess();
        forgotpass_page.verifyResetPassPageTitle(
            "Reset Password link sent successfully"
        );
    });

    it("TC_FORGOT_PASS_003-Reset Password (Empty Username)", () => {
        forgotpass_page.interceptRequest();
        forgotpass_page.clickForgotPassLink();
        forgotpass_page.interceptResponse();
        // intercept not used because the validation from the ui rather than api request
        forgotpass_page.clickResetBtn();
        forgotpass_page.verifyResetPasswordPage();
        forgotpass_page.verifyRequiredMessage();
    });

    it("TC_FORGOT_PASS_004-Reset Password Cancel ", () => {
        forgotpass_page.interceptRequest();
        forgotpass_page.clickForgotPassLink();
        forgotpass_page.interceptResponse();
        forgotpass_page.interceptRequest();
        forgotpass_page.clickCancelBtn();
        forgotpass_page.interceptResponse();
        forgotpass_page.verifyLoginPage();
    });
});
