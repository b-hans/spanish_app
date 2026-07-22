function getResponse (params) {
    
    const display = FORMSHEET.getRange(FORM_DISPLAY_RANGE_A1);
    const rule = params.rule;
    const message = params.message;

    const status = CACHE.get("CURRENT_TYPE");

  
    try {

        if (status == "regular_verb") {
            let working_verb = JSON.parse(CACHE.get('working_verb'));
            resetBody();
        }

        // break display apart
        FORM_DISPLAY_RANGE
            .setBorder(false, false, false, false, false, false)
            .setBackground(FORM_BACK)
            .breakApart()
            .setValue("");

        FORM_SHORT_DISPLAY.merge()
            .setBackground('#ffffff')
            .setFontColor('#000000')
            .setHorizontalAlignment('left')
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

        FORM_RESPONSE_RANGE.merge()
            .setBackground("#e3c6c3")
            .setFontColor("#000000")
            .setVerticalAlignment("middle")
            .setHorizontalAlignment("center");

        FORM_RESPONSE_RANGE.setDataValidation(rule)
            .setValue("Select one");

        FORM_SHORT_DISPLAY.setValue ("Response required\n" + message);

        return true;
    }
    catch (error) {
        display.setValue ("Error getting response: " + error);
        return false;
    }
}