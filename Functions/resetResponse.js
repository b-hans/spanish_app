function resetResponse() {
    const display = FORMSHEET.getRange(FORM_DISPLAY_RANGE_A1);

    const status = CACHE.get('CURRENT_TYPE');

    try {

        display.setValue ("Resetting....");

        FORM_RESPONSE_RANGE.clearContent().clearDataValidations()
            .breakApart()
            .setBackground(FORM_BACK);

        FORM_SHORT_DISPLAY.setBorder(false, false, false, false, false, false)
            .setBackground(FORM_BACK)
            .setValue("")
            .breakApart();

        FORM_DISPLAY_RANGE.merge()
            .setBorder(
                FORM_DISPLAY_BORDERS[0],
                FORM_DISPLAY_BORDERS[1],
                FORM_DISPLAY_BORDERS[2],
                FORM_DISPLAY_BORDERS[3],
                FORM_DISPLAY_BORDERS[4],
                FORM_DISPLAY_BORDERS[5],
                FORM_DISPLAY_BORDERS[6],
                FORM_DISPLAY_BORDERS[7],
            )
            .setBackground('#ffffff')
            .setWrap(true)
            .setValue ("");


        if (status == "regular_verb") {
            VERB_ACTIONS_DROP_RANGE.activate();
        }
        else {
            INFINITIVE_INPUT_RANGE.activate();
        }
        
        return true;
    }
    catch (error) {
        display.setValue ("Error resetting response: " + error);
        return false;
    }
}