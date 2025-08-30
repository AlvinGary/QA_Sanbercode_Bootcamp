import login_page from "../../support/project_support/orangehrm_login_support";
import login_data from "../../fixtures/orangehrm_data/project_data/orangehrm_login_data.json";
import directory_data from "../../fixtures/orangehrm_data/project_data/orangehrm_directory_data.json";
import directory_page from "../../support/project_support/orangehrm_directory_support";

describe("Directory Feature OrangeHRM", () => {
    beforeEach(() => {
        login_page.visit();
        login_page.enterUsername(login_data.ValidUsername);
        login_page.enterPassword(login_data.ValidPassword);
        login_page.interceptLogin();
        login_page.clickLogin();
        login_page.responseLoginSuccess();
        login_page.verifyDashboard();
    });

    context("Navigation & Page Load", () => {
        it("TC_DIRECTORY_001-Navigate to Directory Page", () => {
            directory_page.checkModuleVisibility("Directory");
            directory_page.verifyDirectoryPage();
            directory_page.verifyDirectoryPageTitle();
        });

        it("TC_DIRECTORY_002-Verify Directory search form elements", () => {
            directory_page.checkModuleVisibility("Directory");
            directory_page.verifyInputNameField();
            directory_page.verifyJobTitleDropdown();
            directory_page.verifyLocationDropdown();
            directory_page.verifySearchBtn();
            directory_page.verifyResetBtn();
        });
    });

    context("Name Input Field", () => {
        it("TC_DIRECTORY_003 - Search with empty name input", () => {
            directory_page.checkModuleVisibility("Directory");
            directory_page.interceptDirectoryRequest();
            directory_page.clickSearchBtn();
            directory_page.interceptDirectoryResponse();
            directory_page.verifyRecordsAvailable();
        });

        it("TC_DIRECTORY_004 - Search with partial text (employee available)", () => {
            directory_page.checkModuleVisibility("Directory");
            directory_page.interceptDirectoryRequest();
            directory_page.enterEmployeeName(directory_data.partialName);
            directory_page.interceptDirectoryResponse();
            directory_page.verifyAutoCompleDropdown();
            directory_page.clickSearchBtn();
            directory_page.verifyInvalidMessage();
        });

        it("TC_DIRECTORY_005 - Search with partial text (employee not available)", () => {
            directory_page.checkModuleVisibility("Directory");
            directory_page.interceptDirectoryRequest();
            directory_page.enterEmployeeName(directory_data.invalidName);
            directory_page.interceptDirectoryResponse();
            directory_page.verifyAutoCompleNoRecord();
            directory_page.clickSearchBtn();
            directory_page.verifyInvalidMessage();
        });
    });

    context("Job Title Dropdown", () => {
        it("TC_DIRECTORY_006 - Search by job title only", () => {
            directory_page.checkModuleVisibility("Directory");
            directory_page.clickFieldDropdown(directory_data.jobTitleField);
            directory_page.clickSrollDropdown(directory_data.jobTitleSample);
            directory_page.interceptDirectoryRequest();
            directory_page.clickSearchBtn();
            directory_page.interceptDirectoryResponse();
            directory_page.verifyRecordsAvailable();
        });

        it("TC_DIRECTORY_007 - Reset clears job title filter", () => {
            directory_page.checkModuleVisibility("Directory");
            directory_page.clickFieldDropdown(directory_data.jobTitleField);
            directory_page.clickSrollDropdown(directory_data.jobTitleSample);
            directory_page.interceptDirectoryRequest();
            directory_page.clickSearchBtn();
            directory_page.interceptDirectoryResponse();
            directory_page.verifyRecordsAvailable();
            directory_page.interceptDirectoryRequest();
            directory_page.clickResetBtn();
            directory_page.interceptDirectoryResponse();
            directory_page.verifyFieldDefault("Job Title");
        });
    });

    context("Location Dropdown", () => {
        it("TC_DIRECTORY_008 - Search by location only", () => {
            directory_page.checkModuleVisibility("Directory");
            directory_page.clickFieldDropdown(directory_data.locationField);
            directory_page.clickSrollDropdown(directory_data.locationSample);
            directory_page.interceptDirectoryRequest();
            directory_page.clickSearchBtn();
            directory_page.interceptDirectoryResponse();
            directory_page.verifyRecordsAvailable();
        });

        it("TC_DIRECTORY_009 - Reset clears location filter", () => {
            directory_page.checkModuleVisibility("Directory");
            directory_page.clickFieldDropdown(directory_data.locationField);
            directory_page.clickSrollDropdown(directory_data.locationSample);
            directory_page.interceptDirectoryRequest();
            directory_page.clickSearchBtn();
            directory_page.interceptDirectoryResponse();
            directory_page.verifyRecordsAvailable();
            directory_page.interceptDirectoryRequest();
            directory_page.clickResetBtn();
            directory_page.interceptDirectoryResponse();
            directory_page.verifyFieldDefault(directory_data.locationField);
        });
    });

    context("Combined Filters", () => {
        it("TC_DIRECTORY_010 - Search with name + job title", () => {
            directory_page.checkModuleVisibility("Directory");
            directory_page.interceptDirectoryRequest();
            directory_page.enterEmployeeName(
                directory_data.directoryNameSample
            );
            directory_page.interceptDirectoryResponse();
            directory_page.clickAutoCompleteName(
                directory_data.directoryNameSample
            );
            directory_page.clickFieldDropdown(directory_data.jobTitleField);
            directory_page.clickSrollDropdown(directory_data.jobTitleSample);
            directory_page.interceptDirectoryRequest();
            directory_page.clickSearchBtn();
            directory_page.interceptDirectoryResponse();
            directory_page.verifyDirectoryCardHeader(
                directory_data.directoryNameSample
            );
        });

        it("TC_DIRECTORY_011 - Search with name + location", () => {
            directory_page.checkModuleVisibility("Directory");
            directory_page.interceptDirectoryRequest();
            directory_page.enterEmployeeName(
                directory_data.directoryNameSample
            );
            directory_page.interceptDirectoryResponse();
            directory_page.clickAutoCompleteName(
                directory_data.directoryNameSample
            );
            directory_page.clickFieldDropdown(directory_data.locationField);
            directory_page.clickSrollDropdown(directory_data.locationSample);
            directory_page.interceptDirectoryRequest();
            directory_page.clickSearchBtn();
            directory_page.interceptDirectoryResponse();
            directory_page.verifyDirectoryCardHeader(
                directory_data.directoryNameSample
            );
        });

        it("TC_DIRECTORY_012 - Search with job title + location", () => {
            directory_page.checkModuleVisibility("Directory");
            directory_page.clickFieldDropdown(directory_data.jobTitleField);
            directory_page.clickSrollDropdown(directory_data.jobTitleSample);
            directory_page.clickFieldDropdown(directory_data.locationField);
            directory_page.clickSrollDropdown(directory_data.locationSample);
            directory_page.interceptDirectoryRequest();
            directory_page.clickSearchBtn();
            directory_page.interceptDirectoryResponse();
            directory_page.verifyDirectoryCardHeader(
                directory_data.directoryNameSample
            );
        });

        it("TC_DIRECTORY_013 - Search with all three filters", () => {
            directory_page.checkModuleVisibility("Directory");
            directory_page.interceptDirectoryRequest();
            directory_page.enterEmployeeName(
                directory_data.directoryNameSample
            );
            directory_page.interceptDirectoryResponse();
            directory_page.clickAutoCompleteName(
                directory_data.directoryNameSample
            );
            directory_page.clickFieldDropdown(directory_data.jobTitleField);
            directory_page.clickSrollDropdown(directory_data.jobTitleSample);
            directory_page.clickFieldDropdown(directory_data.locationField);
            directory_page.clickSrollDropdown(directory_data.locationSample);
            directory_page.interceptDirectoryRequest();
            directory_page.clickSearchBtn();
            directory_page.interceptDirectoryResponse();
            directory_page.verifyDirectoryCardHeader(
                directory_data.directoryNameSample
            );
        });
    });
});
