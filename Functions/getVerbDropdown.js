function getVerbDropdown (params) {
    let verb;
    if (params.verb) {
        verb = params.verb;
    }
    else {
        verb = null;
    }

    const display = FORM_DISPLAY_RANGE;

    try {

        let data = REGULAR_VERBS.getDataRange().getValues();
        data.shift();
        let verbDropdown = data.map (row => row[1] + row[2]);
        verbDropdown.sort();
        verbDropdown.unshift("Select one");

        let verbRule = SpreadsheetApp.newDataValidation()
            .requireValueInList(verbDropdown, true)
            .setAllowInvalid(false)
            .build();
        
        if (verb) {
            TENSE_VERB_DROPDOWN.setDataValidation(verbRule)
                .setValue(verb);
        }

        return true;
    }
    catch (error) {
        display.setValue ("Error getting verbs for dropdown: " + error);
        return false;
    }
}