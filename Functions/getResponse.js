function getResponse (params) {
    
    const display = FORMSHEET.getRange(FORM_DISPLAY_RANGE_A1);
  
    try {

        // break display apart
        FORM_DISPLAY_RANGE
            .setBorder(false, false, false, false, false, false)
            .setBackground(FORM_BACK)
            .breakApart();

        FORM_SHORT_DISPLAY.merge()
            .setBackground('#ffffff')
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

        FORM_RESPONSE_RANGE.merge()
            .setBackground("#e3c6c3")
            .setFontColor("#000000")
            .setVerticalAlignment("middle")
            .setHorizontalAlignment("center");

        FORM_RESPONSE_RANGE.setDataValidation(ADD_VERB_RULE)
            .setValue("Select one");

        display.setValue ("Response required\n" + params.message);

        return true;
    }
    catch (error) {
        display.setValue ("Error getting response: " + error);
        return false;
    }
}