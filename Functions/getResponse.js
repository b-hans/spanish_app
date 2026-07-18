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

        display.setValue ("Response required");

        return true;
    }
    catch (error) {
        display.setValue ("Error getting response: " + error);
        return false;
    }
}