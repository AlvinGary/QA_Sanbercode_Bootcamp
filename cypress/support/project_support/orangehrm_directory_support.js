class DirectoryPage {
    // actions
    clickSearchBtn() {
        cy.contains(".oxd-button--secondary", "Search").click();
    }

    clickResetBtn() {
        cy.contains(".oxd-button--ghost", "Reset").click();
    }

    clickCancelBtn() {
        cy.contains("button[type='button']", "Cancel").click();
    }

    clickFieldDropdown(name) {
        cy.contains(".oxd-input-group", name)
            .should("contain.text", "-- Select --")
            .click();
    }

    clickSrollDropdown(name) {
        cy.get(".oxd-select-dropdown").contains(name).scrollIntoView().click();
    }

    clickAutoCompleteName(name) {
        cy.contains(".oxd-autocomplete-option", name).should("exist").click();
    }

    enterEmployeeName(name) {
        cy.get('input[placeholder="Type for hints..."]').type(name);
    }

    // assertions
    verifyDirectoryPage() {
        cy.url().should("include", "/directory");
    }

    verifyInvalidMessage() {
        cy.get(".oxd-input-group")
            .contains(".oxd-text", "Invalid")
            .should("be.visible");
    }

    verifyDirectoryPageTitle() {
        cy.get("h6.oxd-topbar-header-breadcrumb-module").should(
            "have.text",
            "Directory"
        );
    }

    verifyInputNameField() {
        cy.get('input[placeholder="Type for hints..."]').should("exist");
    }

    verifyJobTitleDropdown() {
        cy.contains(".oxd-input-group", "Job Title")
            .should("contain.text", "-- Select --")
            .and("exist");
    }

    verifyLocationDropdown() {
        cy.contains(".oxd-input-group", "Location")
            .should("contain.text", "-- Select --")
            .and("exist");
    }

    verifySearchBtn() {
        cy.contains(".oxd-button--secondary", "Search").should("exist");
    }

    verifyResetBtn() {
        cy.contains(".oxd-button--ghost", "Reset").should("exist");
    }

    verifyRecordsAvailable() {
        cy.get(".oxd-sheet").should("exist");
    }

    verifyAutoCompleDropdown() {
        cy.get(".oxd-autocomplete-dropdown").should("exist");
    }

    verifyAutoCompleNoRecord() {
        cy.get(".oxd-autocomplete-dropdown")
            .should("exist")
            .and("have.text", "No Records Found");
    }

    verifyFieldDefault(name) {
        cy.contains(".oxd-input-group", name).should(
            "contain.text",
            "-- Select --"
        );
    }

    verifyDirectoryCardHeader(name) {
        cy.contains(".orangehrm-directory-card-header", name).should("exist");
    }

    // intercept
    interceptRequestPage() {
        cy.intercept("GET", "**/core/i18n/messages").as("requestResponse");
    }

    interceptResponsePage() {
        cy.wait("@requestResponse").then((intercept) => {
            expect(intercept.response.statusCode).to.eq(304);
        });
    }

    interceptDirectoryRequest() {
        cy.intercept("GET", "**/web/index.php/api/v2/directory/employees**").as(
            "searchRequest"
        );
    }

    interceptDirectoryResponse() {
        cy.wait("@searchRequest").then((intercept) => {
            expect(intercept.response.statusCode).to.eq(200);
        });
    }

    // enable toggle for Directory menu in side navigation
    checkModuleVisibility(menuName) {
        cy.get("body").then((body) => {
            if (
                body.find(`.oxd-main-menu-item:contains("${menuName}")`).length
            ) {
                this.interceptRequestPage();
                cy.contains(".oxd-main-menu-item", menuName).click();
                this.interceptResponsePage();
            } else {
                this.enableModule(menuName);
                this.interceptRequestPage();
                cy.contains(".oxd-main-menu-item", menuName).click();
                this.interceptResponsePage();
            }
        });
    }

    enableModule(moduleName) {
        // Open Admin menu from top nav
        this.interceptRequestPage();
        cy.contains(".oxd-main-menu-item", "Admin").click();
        this.interceptResponsePage();
        // Click "More" dropdown (three dots)
        cy.contains(".oxd-topbar-body-nav-tab", "More").click();
        // Click "Configuration"
        cy.contains(".oxd-topbar-body-nav-tab-link", "Configuration").click();
        // Click "Modules"
        this.interceptRequestPage();
        cy.contains("ul.oxd-topbar-body-nav-tab-accordian", "Modules").click();
        this.interceptResponsePage();
        // Assert on the viewModules page
        cy.url().should("include", "/viewModules");
        // Locate Directory Module toggle
        cy.contains(".orangehrm-module-field-row", `${moduleName} Module`)
            .find("span.oxd-switch-input")
            .click();
        // Save change
        this.interceptRequestPage();
        cy.contains("button[type='submit']", "Save").click();
        this.interceptResponsePage();
    }
}

export default new DirectoryPage();
