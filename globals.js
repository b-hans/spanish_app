// sheets
const FORMSHEET = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("Forms");

const AR_REGULAR = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("AR Regular Endings")


// displays
const INITIAL_DISPLAY = FORMSHEET.getRange("A1");
const FORM_DISPLAY_RANGE = FORMSHEET.getRange("B20:F21");
const FORM_DISPLAY_RANGE_A1 = "B20";


// form ranges
const FORM_RANGE = FORMSHEET.getRange("A1:G22");

// range a1 notation
const FORM_RANGE_A1 = "A1:G22";

// form styles
const FORM_BACK = "#cfe2f3";
