import login_data from "../../fixtures/orangehrm_data/project_data/orangehrm_login_data.json";
import login_page from "../../support/project_support/orangehrm_login_support";

describe("Login Feature OrangeHRM", () => {
    beforeEach(() => {
        login_page.visit();
    });
    context("Positive Test Cases", () => {
        [login_data.ValidUsername, login_data.ValidUserLowercase].forEach(
            (username) => {
                it(`TC_LOGIN_001-Success Login (Valid Input) With User '${username}'`, () => {
                    login_page.enterUsername(username);
                    login_page.enterPassword(login_data.ValidPassword);
                    login_page.interceptLogin();
                    login_page.clickLogin();
                    login_page.responseLoginSuccess();
                    login_page.verifyDashboard();
                });
            }
        );
    });
    context("Negative Test Cases", () => {
        it("TC_LOGIN_002-Failed Login (invalid password input)", () => {
            login_page.enterUsername(login_data.ValidUsername);
            login_page.enterPassword(login_data.InvalidPasswordUppercase);
            login_page.interceptErrMessage();
            login_page.clickLogin();
            login_page.responseErrMessageAppear();
            login_page.verifyStayOnLogin();
            login_page.verifyInvalidCredentials();
        });
        it("TC_LOGIN_003-Failed Login (invalid username and password input)", () => {
            login_page.enterUsername(login_data.InvalidUsernameGeneral);
            login_page.enterPassword(login_data.InvalidPasswordGeneral);
            login_page.interceptErrMessage();
            login_page.clickLogin();
            login_page.responseErrMessageAppear();
            login_page.verifyStayOnLogin();
            login_page.verifyInvalidCredentials();
        });
        it("TC_LOGIN_004-Failed Login (empty username input)", () => {
            login_page.enterPassword(login_data.InvalidPasswordGeneral);
            login_page.clickLogin();
            login_page.verifyStayOnLogin();
            login_page.verifyRequiredMessage("Username");
        });
        it("TC_LOGIN_005-Failed Login (empty password input)", () => {
            login_page.enterUsername(login_data.InvalidUsernameGeneral);
            login_page.clickLogin();
            login_page.verifyStayOnLogin();
            login_page.verifyRequiredMessage("Password");
        });
        it("TC_LOGIN_006-Failed Login (empty username and password input)", () => {
            login_page.clickLogin();
            login_page.verifyStayOnLogin();
            login_page.verifyRequiredMessage("Username");
            login_page.verifyRequiredMessage("Password");
        });
    });
});

describe("Logout Feature OrangeHRM", () => {
    beforeEach(() => {
        login_page.visit();
    });
    it("TC-LOGOUT-001-Logout Success", () => {
        login_page.enterUsername(login_data.ValidUsername);
        login_page.enterPassword(login_data.ValidPassword);
        login_page.interceptLogin();
        login_page.clickLogin();
        login_page.responseLoginSuccess();
        login_page.verifyDashboard();
        cy.get(".oxd-userdropdown-tab").click();
        cy.contains("Logout").click();
        cy.url().should("include", "/login");
    });
});
