import auth_data from "../../fixtures/reqres.in_data/auth_data.json";
import auth_api from "../../support/reqres.in_support/api/auth_api";

describe("Reqres.in Auth Features API", () => {
    context("Register Account", () => {
        it("TC_Register_001-Valid Input", () => {
            auth_api.register(auth_data.validAuth).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.not.be.null;
                expect(response.body).to.have.property("token");
            });
        });
        it("TC_Register_002-Undefined Input", () => {
            auth_api.register(auth_data.authNotDefined).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.not.be.null;
                expect(response.body).to.have.property(
                    "error",
                    "Note: Only defined users succeed registration"
                );
            });
        });
        it("TC_Register_003-Input Miss Pass", () => {
            auth_api.register(auth_data.authMissPass).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.not.be.null;
                expect(response.body).to.have.property(
                    "error",
                    "Missing password"
                );
            });
        });
        it("TC_Register_004-Input Miss Username", () => {
            auth_api.register(auth_data.authMissUser).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.not.be.null;
                expect(response.body).to.have.property(
                    "error",
                    "Missing email or username"
                );
            });
        });
    });
    context("Request Login", () => {
        it("TC_Login_001-Valid Input", () => {
            auth_api.login(auth_data.validAuth).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.not.be.null;
                expect(response.body).to.have.property("token");
            });
        });
        it("TC_Login_002-Undefined Input", () => {
            auth_api.login(auth_data.authNotDefined).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.not.be.null;
                expect(response.body).to.have.property(
                    "error",
                    "user not found"
                );
            });
        });
        it("TC_Login_003-Input Miss Pass", () => {
            auth_api.login(auth_data.authMissPass).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.not.be.null;
                expect(response.body).to.have.property(
                    "error",
                    "Missing password"
                );
            });
        });
        it("TC_Login_004-Input Miss Username", () => {
            auth_api.login(auth_data.authMissUser).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.not.be.null;
                expect(response.body).to.have.property(
                    "error",
                    "Missing email or username"
                );
            });
        });
    });
    context("Request Logout", () => {
        it("TC_Logout_001-Logout Success", () => {
            auth_api.logout().then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.not.be.null;
            });
        });
    });
});
