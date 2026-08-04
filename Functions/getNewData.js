function getNewData (CURRENT_TYPE) {
    let display = FORM_DISPLAY_RANGE;

    try {

        if (CURRENT_TYPE.tense) {
            display.setValue (CURRENT_TYPE.tense)

            let newData;

            switch (CURRENT_TYPE.tense) {
                case "Indicative":
                    newData = FORMSHEET.getRange("B8:F13").getValues();

                    // get the participles
                    CURRENT_TYPE.participle = FORMSHEET.getRange("C5").getValue();
                    CURRENT_TYPE.past_participle = FORMSHEET.getRange("D5").getValue();
                    break;

                case "Subjunctive":
                    newData = FORMSHEET.getRange("B8:E13").getValues();
                    break;
            }
            

            CURRENT_TYPE.data = newData;

        }


        CURRENT_TYPE.status = "edit_verb";

        return CURRENT_TYPE;
    }
    catch (error) {
        display.setValue("Error getting new data: " + error);
        return false;
    }
}