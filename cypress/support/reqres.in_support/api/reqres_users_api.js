const baseUrl = Cypress.env("reqresBaseUrl");
const apiKey = Cypress.env("reqresApiKey");

class UsersAPI {
    getUser() {
        return cy.request({
            method: "GET",
            url: `${baseUrl}/users`,
            headers: {
                "x-api-key": apiKey,
            },
            failOnStatusCode: false,
        });
    }

    getUserById(id) {
        return cy.request({
            method: "GET",
            url: `${baseUrl}/users/${id}`,
            headers: {
                "x-api-key": apiKey,
            },
            failOnStatusCode: false,
        });
    }

    createUser(value) {
        return cy.request({
            method: "POST",
            url: `${baseUrl}/users`,
            headers: {
                "x-api-key": apiKey,
            },
            body: value,
            failOnStatusCode: false,
        });
    }

    updateUser(method, id, value) {
        return cy.request({
            method: method,
            url: `${baseUrl}/users/${id}`,
            headers: {
                "x-api-key": apiKey,
            },
            body: value,
            failOnStatusCode: false,
        });
    }

    deleteUser(id) {
        return cy.request({
            method: "DELETE",
            url: `${baseUrl}/users/${id}`,
            headers: {
                "x-api-key": apiKey,
            },
            failOnStatusCode: false,
        });
    }
}

export default new UsersAPI();
