function loadImperative (CURRENT_TYPE) {

    let display = FORM_DISPLAY_RANGE

    try {
        display.setValue ("Load imperative");

        // CURRENT_TYPE = getTenseData(CURRENT_TYPE);

        PRONOUN_RANGE.setValues(PRONOUN_RANGE_ARRAY)
            .setBackground('#3c78d8')
            .setFontColor('#ffffff')
            .setHorizontalAlignment('right');

        FORMSHEET.getRange("B7:E7")
            .setBackground('#000000')
            .setFontColor('#ffffff')
            .setHorizontalAlignment('center');

        FORMSHEET.getRange("B7:C7").merge()
            .setValue("Affirmative");

        FORMSHEET.getRange("D7:E7").merge()
            .setValue("Negative");

        for (let i=8; i<14; i++) {
            FORMSHEET.getRange(i, 2, 1, 2).merge()
                .setBackground('#f3f3f3');

            FORMSHEET.getRange(i, 4, 1, 2).merge()
                .setBackground('#f3f3f3');
        }

        return true;
    }
    catch (error) {
        display.setValue ("Error loading imperative: " + error);
        return false;
    }
}