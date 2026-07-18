function resetResponse() {
    const display = FORMSHEET.getRange(FORM_DISPLAY_RANGE_A1);

    try {

        display.setValue ("Resetting....");

        FORM_RESPONSE_RANGE.clearContent().clearDataValidations()
            .setBackground('#ffffff');

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
            .setWrap(true);


        INFINITIVE_INPUT_RANGE.activate();
        
        return true;
    }
    catch (error) {
        display.setValue ("Error resetting response: " + error);
        return false;
    }
}