function regularOut (e) {

    const range = e.range;
    const value = range.getValue();

    let working_verb = JSON.parse(CACHE.get('working_verb'));
    let display = FORM_DISPLAY_RANGE;

    try {

        display.setValue("Working....");

        working_verb.action = value

        // PRONOUN_RANGE.setValues(PRONOUN_RANGE_ARRAY)
        //     .setBackground('#3c78d8')
        //     .setFontColor('#ffffff')
        //     .setHorizontalAlignment('right');

        // TENSE_HEADING_RANGE.setValues([TENSE_ARRAY])
        //     .setHorizontalAlignment('center')
        //     .setBackground('#000000')
        //     .setFontColor('#ffffff');

        CACHE.put('working_verb', JSON.stringify(working_verb), 3600);

        return tenseOut();
    }
    catch (error) {
        display.setValue ("Error getting regular indicative: " + error);
        return false;
    }
}