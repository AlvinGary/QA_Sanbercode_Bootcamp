const baseUrl = Cypress.env("reqresBaseUrl");
const apiKey = Cypress.env("reqresApiKey");

class AuthApi {
    register(value) {
        return cy.request({
            method: "POST",
            url: `${baseUrl}/register`,
            headers: {
                "x-api-key": apiKey,
            },
            body: value,
            failOnStatusCode: false,
        });
    }

    login(value) {
        return cy.request({
            method: "POST",
            url: `${baseUrl}/login`,
            headers: {
                "x-api-key": apiKey,
            },
            body: value,
            failOnStatusCode: false,
        });
    }

    logout() {
        return cy.request({
            method: "POST",
            url: `${baseUrl}/logout`,
            headers: {
                "x-api-key": apiKey,
            },
            failOnStatusCode: false,
        });
    }
}

export default new AuthApi();
