function loadSubjunctive (CURRENT_TYPE) {

    let display = FORM_DISPLAY_RANGE;

    try {

        CURRENT_TYPE.data = getTenseData(CURRENT_TYPE);

        CACHE.put('CURRENT_TYPE', JSON.stringify(CURRENT_TYPE), 3600);

        PRONOUN_RANGE.setValues(PRONOUN_RANGE_ARRAY)
            .setBackground('#3c78d8')
            .setFontColor('#ffffff')
            .setHorizontalAlignment('right');

        FORMSHEET.getRange("B7:E7")
            .setBackground('#000000')
            .setFontColor('#ffffff')
            .setHorizontalAlignment('center');

        FORMSHEET.getRange("B7").setValue("Present");
        FORMSHEET.getRange("E7").setValue ("Future");

        FORMSHEET.getRange("C7:D7").merge()
            .setValue("Imperfect");

        for (let i=8; i<14; i++) {
            FORMSHEET.getRange(i, 3, 1, 2).merge()
                .setHorizontalAlignment('left');
        }

        FORMSHEET.getRange("B8:E13")
            .setValues(CURRENT_TYPE.data)
            .setBackground('#f3f3f3');


        display.setValue ("Subjunctive loaded");

        return true;

    }
    catch (error) {
        display.setValue ("Error loading subjunctive: " + error);
        return false;
    }
}