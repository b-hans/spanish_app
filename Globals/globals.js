// sheets
const FORMSHEET = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("Forms");

const AR_REGULAR = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("AR Regular Endings");

const TEST_SHEET = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("Test Form");

// Regular verbs
const REGULAR_VERBS = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("Regular verbs");
const REGULAR_VERBS_HEADINGS = ['ID', 'Stem', 'Ending'];


// displays
const INITIAL_DISPLAY = FORMSHEET.getRange("A1");
const FORM_DISPLAY_RANGE = FORMSHEET.getRange("B20:F21");
const FORM_DISPLAY_RANGE_A1 = "B20";


// form ranges
const FORM_RANGE = FORMSHEET.getRange("A1:G22");
const FORM_TITLE_RANGE = FORMSHEET.getRange("B2:F2");
const INFINITIVE_TITLE_RANGE = FORMSHEET.getRange("B5");
const INFINITIVE_INPUT_RANGE = FORMSHEET.getRange("C5");
const VERB_TYPE_TITLE_RANGE =  FORMSHEET.getRange("E5");
const VERB_TYPE_INPUT_RANGE = FORMSHEET.getRange("F5");

// range a1 notation
const FORM_RANGE_A1 = "A1:G22";
const FORM_TITLE_RANGE_A1 = "B2";
const INFINITIVE_TITLE_RANGE_A1 = "B5";
const VERB_TYPE_INPUT_A1 = "F5";

// form styles
const FORM_BACK = "#cfe2f3";
const FORM_DISPLAY_BORDERS = [
    true, true, true, true, false, false,
    "#000000",
    SpreadsheetApp.BorderStyle.SOLID
];

const FORM_TITLE_ROWHEIGHT = 65;
const DISPLAY_FONT_COLOR = "#0b5394";

const TITLES_BACKGROUND = "#f3f3f3";

// input validations
const VERB_TYPE_RULE = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Select one', 'Regular', 'Irregular'])
    .setAllowInvalid(false)
    .build();

const CACHE = CacheService.getScriptCache();
