import users_data from "../../fixtures/reqres.in_data/users_data.json";
import users_api from "../../support/reqres.in_support/api/users_api";

describe("Reqres.in Users Features API", () => {
    context("Get Users", () => {
        it("TC_GET_USER_001-Get User List", () => {
            users_api.getUser().then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.not.be.null;
                expect(response.body).to.have.property("data");
            });
        });
        [1, 3, 7].forEach((userId) => {
            it(`TC_GET_USER_002-Get User By Id ${userId}`, () => {
                users_api.getUserById(userId).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body).to.not.be.null;
                    expect(response.body).to.have.property("data");
                    expect(response.body.data.id).to.eq(userId);
                });
            });
        });
        it("TC_GET_USER_003-Get User By Id more than 12", () => {
            users_api.getUserById(30).then((response) => {
                expect(response.status).to.eq(404);
                expect(response.body).to.not.be.null;
            });
        });
    });
    context("Create Users", () => {
        it("TC_CREATE_USER_001-Create User Success", () => {
            users_api.createUser(users_data[0]).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.not.be.null;
                expect(response.body).to.have.property("createdAt");
            });
        });
        it("TC_CREATE_USER_002-Create Multiple Users", () => {
            users_api.createUser(users_data).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.not.be.null;
            });
        });
    });
    context("Update Users", () => {
        ["PUT", "PATCH"].forEach((method) => {
            it(`TC_UPDATE_USER_001-Update User Data Using ${method} Method`, () => {
                users_api
                    .updateUser(method, 12, users_data[3])
                    .then((response) => {
                        expect(response.status).to.eq(200);
                        expect(response.body).to.not.be.null;
                        expect(response.body).to.have.property("updatedAt");
                    });
            });
        });
    });
    context("Delete Users", () => {
        it("TC_DELETE_USER_001-Delete User Success", () => {
            users_api.deleteUser(8).then((response) => {
                expect(response.status).to.eq(204);
                expect(response.body).to.be.empty;
            });
        });
    });
});
