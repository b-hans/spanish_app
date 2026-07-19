function verbOut (e) {
    const range = e.range;
    const value = range.getValue();
    const a1 = range.getA1Notation();
    const display = FORMSHEET.getRange(FORM_DISPLAY_RANGE_A1);
    const stem = value.slice(0, -2);
    const ending = value.slice(-2);

    try {

        if (!value || value == "Select one") {
            return true;
        }

        resetBody();

        PRONOUN_RANGE.setValues(PRONOUN_RANGE_ARRAY)
            .setBackground('#3c78d8')
            .setFontColor('#ffffff')
            .setHorizontalAlignment('right');

        VERB_HEADING_RANGE.setValues([VERB_HEADING_ARRAY])
            .setBackground('#f3f3f3')
            .setHorizontalAlignment('center');

        VERB_ACTIONS_RANGE.merge()
            .setValue("Actions")
            .setBackground("#073763")
            .setFontColor("#ffffff")
            .setHorizontalAlignment("center");

        VERB_ACTIONS_DROP_RANGE.merge()
            .setBackground("#ffffff")
            .setDataValidation(VERB_ACTIONS_RULE)
            .setValue("Select one");

        VERB_VALUE_RANGE.setHorizontalAlignment("center")
            .setBackground('#fff2cc');

        VERB_ACTIONS_DROP_RANGE.activate()

        let participleEnd;
        let pastParticipleEnd;

        switch (ending) {
            case "ar":
                participleEnd = "ando";
                pastParticipleEnd = "ado";
                break;

            default:
                participleEnd = "iendo";
                pastParticipleEnd = "ido";
                break;

        }

        VERB_INFINITIVE.setValue(value);
        VERB_PARTICIPLE.setValue (stem + participleEnd);
        VERB_PAST_PARTICIPLE.setValue (stem + pastParticipleEnd);


        display.setValue ("Hey verb out: " + value);
        return true;
    }
    catch (error) {
        display.setValue ("Error getting verb information: " + error);
        return false;
    }
}