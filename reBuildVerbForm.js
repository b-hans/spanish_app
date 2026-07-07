function reBuildVerbForm () {

    try {

        resetSheetToDefaultDimensions();

        FORM_RANGE.setBackground(FORM_BACK);
        FORM_DISPLAY_RANGE.merge()
            .setVerticalAlignment("top")
            .setBackground('#ffffff')
            .setValue ("Booyah!");

        return true;
    }
    catch (error) {
        return false;
    }
}