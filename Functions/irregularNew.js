function irregularNew () {
    let CURRENT_TYPE = JSON.parse(CACHE.get('CURRENT_TYPE'));

    let display = FORM_DISPLAY_RANGE;

    try {

        resetBody();

        INFINITIVE_TITLE_RANGE.setBackground(TITLES_BACKGROUND)
            .setHorizontalAlignment('right')
            .setVerticalAlignment('top')
            .setValue("Infinitive: ");

        INFINITIVE_INPUT_RANGE.setBackground('#ffffff')
            .setValue(CURRENT_TYPE.infinitive);

        VERB_TYPE_TITLE_RANGE.setBackground(TITLES_BACKGROUND)
            .setHorizontalAlignment('right')
            .setVerticalAlignment('top')
            .setValue("Irregular type: ");

        VERB_TYPE_INPUT_RANGE.setBackground('#ffffff')
            .setVerticalAlignment('top')
            .setHorizontalAlignment('center');

        VERB_TYPE_INPUT_RANGE.setDataValidation(IRR_OPTIONS_RULE)
            .setValue('Select one');

        PRONOUN_RANGE.setValues(PRONOUN_RANGE_ARRAY)
            .setBackground('#3c78d8')
            .setFontColor('#ffffff')
            .setHorizontalAlignment('right');

        TENSE_HEADING_RANGE.setValues([TENSE_ARRAY])
            .setHorizontalAlignment('center')
            .setBackground('#000000')
            .setFontColor('#ffffff');

        return true;
    }
    catch (error) {
        display.setValue ("Error getting irregular form: " + error);
        return false;
    }
}