// sheets
const FORMSHEET = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("Forms");

const AR_REGULAR = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("AR Regular Endings")


// displays
const INITIAL_DISPLAY = FORMSHEET.getRange("A1");
