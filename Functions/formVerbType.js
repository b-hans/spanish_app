function formVerbType () {

    let display = FORM_SHORT_DISPLAY;
    let CURRENT_TYPE = getCurrentType();

    try {

        display.setValue ("Working....");

        CURRENT_TYPE.status = 'add_type';
        CURRENT_TYPE.responseStatus = false;

        resetResponse();
        resetOtherFormItems();

        display = FORM_DISPLAY_RANGE;

        // get stem and ending
        CURRENT_TYPE.ending = CURRENT_TYPE.infinitive.slice(-2);
        if (CURRENT_TYPE.ending == CURRENT_TYPE.infinitive) {
            CURRENT_TYPE.stem = null;
        }
        else {
            CURRENT_TYPE.stem = CURRENT_TYPE.infinitive.slice(0, -2);
        }

        CACHE.put('CURRENT_TYPE', JSON.stringify(CURRENT_TYPE), 3600);

        FORMSHEET.getRange("B5").setBackground(TITLES_BACKGROUND)
            .setHorizontalAlignment('right')
            .setValue("Infinitive: ");

        FORMSHEET.getRange("C5").setBackground("#ffffff")
            .setValue(CURRENT_TYPE.infinitive);

        FORMSHEET.getRange("B7").setBackground(TITLES_BACKGROUND)
            .setHorizontalAlignment('right')
            .setValue("Type: ");

        let rule = SpreadsheetApp.newDataValidation()
            .requireValueInList(['Select one', 'Regular', 'Irregular'], true)
            .setAllowInvalid(false)
            .build();

        FORMSHEET.getRange("C7").setBackground('#ffffff')
            .setDataValidation(rule)
            .setValue ("Select one");

        display.setValue ("Select the type");
        return true;
    }
    catch (error) {
        display.setValue ("Error getting the form type form: " + error);
        return false;
    }
}