function getNewData (CURRENT_TYPE) {
    let display = FORM_DISPLAY_RANGE;

    try {

        if (CURRENT_TYPE.tense) {
            display.setValue (CURRENT_TYPE.tense)

            let newData = FORMSHEET.getRange("B8:F13").getValues();

            CURRENT_TYPE.data = newData;

        }

        // get the participles
        CURRENT_TYPE.participle = FORMSHEET.getRange("C5").getValue();
        CURRENT_TYPE.past_participle = FORMSHEET.getRange("D5").getValue();

        CURRENT_TYPE.status = "edit_verb";

        display.setValue (display.getValue() + " Getting new data");
        return CURRENT_TYPE;
    }
    catch (error) {
        display.setValue("Error getting new data: " + error);
        return false;
    }
}