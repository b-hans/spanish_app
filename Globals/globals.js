// sheets
const FORMSHEET = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("Forms");

const AR_REGULAR = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("AR Regular Endings");

const ER_REGULAR = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("ER Regular Endings");

const IR_REGULAR = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("IR Regular Endings");

const TEST_SHEET = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("Test Form");

// Regular verbs
const REGULAR_VERBS = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("Regular verbs");
const REGULAR_VERBS_HEADINGS = ['ID', 'Stem', 'Ending', 'Type'];


// displays
const INITIAL_DISPLAY = FORMSHEET.getRange("A1");
const FORM_DISPLAY_RANGE = FORMSHEET.getRange("B20:F21");
const FORM_DISPLAY_RANGE_A1 = "B20";

const FORM_SHORT_DISPLAY = FORMSHEET.getRange("B7:F9");

const FORM_RESPONSE_RANGE = FORMSHEET.getRange("E10:F11");


// form ranges
const FORM_RANGE = FORMSHEET.getRange("A1:G22");
const FORM_TITLE_RANGE = FORMSHEET.getRange("B2:F2");
const INFINITIVE_TITLE_RANGE = FORMSHEET.getRange("B5");
const INFINITIVE_INPUT_RANGE = FORMSHEET.getRange("C5");
const VERB_TYPE_TITLE_RANGE =  FORMSHEET.getRange("E5");
const VERB_TYPE_INPUT_RANGE = FORMSHEET.getRange("F5");
const CURRENT_VERBS_TITLE_RANGE = FORMSHEET.getRange("B7");
const CURRENT_VERBS_INPUT_RANGE = FORMSHEET.getRange("C7:D8");
const PRONOUN_RANGE = FORMSHEET.getRange(8, 1, 6, 1);
const PRONOUN_RANGE_ARRAY = [
    ['yo'],
    ['tú'],
    ['él/ella/Ud.'],
    ['nosotros'],
    ['vosotros'],
    ['ellos/ellas/Uds.']
];
const TENSE_HEADING_RANGE = FORMSHEET.getRange("B7:F7");
const TENSE_ARRAY = ['Present', 'Preterite', 'Imperfect', 'Conditional', 'Future'];
const VERB_HEADING_RANGE = FORMSHEET.getRange(4, 2, 1, 3);
const VERB_HEADING_ARRAY = [
    'Infinitive',
    'Participle',
    'Past Participle'
];
const VERB_VALUE_RANGE = FORMSHEET.getRange(5, 2, 1, 3);
const VERB_ACTIONS_RANGE = FORMSHEET.getRange("E4:F4");
const VERB_ACTIONS_DROP_RANGE = FORMSHEET.getRange("E5:F5");
const VERB_ACTIONS = [
    'Select one',
    'Cancel',
    'Indicative',
    'Subjunctive',
    'Imperative',
    'Progressive',
    'Perfect',
    'Perfect Subjunctive'
];
const VERB_ACTIONS_RULE = SpreadsheetApp.newDataValidation()
    .requireValueInList(VERB_ACTIONS, true)
    .setAllowInvalid(false)
    .build();

const VERB_INFINITIVE = FORMSHEET.getRange("B5");
const VERB_PARTICIPLE = FORMSHEET.getRange("C5");
const VERB_PAST_PARTICIPLE = FORMSHEET.getRange("D5");

const TENSE_VERB_LABEL = FORMSHEET.getRange("B18");
const TENSE_VERB_DROPDOWN = FORMSHEET.getRange("C18:D18");

// range a1 notation
const FORM_RANGE_A1 = "A1:G22";
const FORM_TITLE_RANGE_A1 = "B2";
const INFINITIVE_TITLE_RANGE_A1 = "B5";
const VERB_TYPE_INPUT_A1 = "F5";
const RESPONSE_A1 = "E10";
const CURRENT_VERBS_INPUT_A1= "C7";
const VERB_ACTIONS_A1 = "E5";
const NEW_VERB_A1 = "C18";

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
const CURRENT_VERB_DROPDOWN_BACK = "#fce5cd";

// input validations
const VERB_TYPE_RULE = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Select one', 'Regular', 'Irregular'])
    .setAllowInvalid(false)
    .build();

const ADD_VERB_RULE = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Select one', "Yes, add this verb", "No, return"], true)
    .setAllowInvalid(false)
    .build();

const CANCEL_RULE = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Select one', 'Yes, cancel', 'No, return'], true)
    .setAllowInvalid(false)
    .build();

const CACHE = CacheService.getScriptCache();


