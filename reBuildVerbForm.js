function reBuildVerbForm () {

    try {

        resetSheetToDefaultDimensions();

        FORM_RANGE.setBackground(FORM_BACK);
        FORM_DISPLAY_RANGE.merge()
            .setVerticalAlignment("top")
            .setBackground('#ffffff')
            .setBorder(
                FORM_DISPLAY_BORDERS[0],
                FORM_DISPLAY_BORDERS[1],
                FORM_DISPLAY_BORDERS[2],
                FORM_DISPLAY_BORDERS[3],
            )
            .setValue ("Messages here");

        return true;
    }
    catch (error) {
        return false;
    }
}