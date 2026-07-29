function enterIrrIndicative () {

    let CURRENT_TYPE = getCurrentType();
    let display = FORM_DISPLAY_RANGE;

    try {
        console.log (CURRENT_TYPE);

        // get the tense ids
        let conjugation_types = CONJUGATION_TYPES.getDataRange().getValues();
        let conjugation_headers = conjugation_types.shift();

        console.log(conjugation_types, conjugation_headers);

        display.setValue("Yes, enter 01");

        return true;
    }
    catch (error) {
        display.setValue ("Error entering indicative: " + error);
        return false;
    }
}