function irrIndicativeOther () {
    let CURRENT_TYPE = getCurrentType();
    let display = FORM_DISPLAY_RANGE;

    try {

        console.log (CURRENT_TYPE);

        populateRegular(CURRENT_TYPE);

        let participle;
        let past_participle;

        switch (CURRENT_TYPE.ending) {
            case "ar":
                participle = CURRENT_TYPE.stem + "ando";
                past_participle = CURRENT_TYPE.stem + "ado";
                break;

            default:
                participle = CURRENT_TYPE.stem + "iendo";
                past_participle = CURRENT_TYPE.stem + "ido";
                break;

        }

        CURRENT_TYPE.participle = participle;
        CURRENT_TYPE.past_participle = past_participle;

        CACHE.put('CURRENT_TYPE', JSON.stringify(CURRENT_TYPE), 3600);

        FORMSHEET.getRange("B16").setValue (CURRENT_TYPE.infinitive);
        FORMSHEET.getRange("C16").setValue (participle);
        FORMSHEET.getRange("D16").setValue (past_participle);

        const newActions = [
            'Select one',
            'Enter indicative',
            'Cancel'
        ];

        const newRule = SpreadsheetApp.newDataValidation()
            .requireValueInList(newActions, true)
            .setAllowInvalid(false)
            .build();

        FORMSHEET.getRange("F5")
            .setDataValidation(newRule)
            .setValue("Select one");

        display.setValue ("Make irregular changes");

        return true;
    }
    catch (error) {
        display.setValue ("Error getting irregular other indicative: " + error);
        return false;
    }
}