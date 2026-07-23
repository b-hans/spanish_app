function verbOut (params) {
    const display = FORMSHEET.getRange(FORM_DISPLAY_RANGE_A1);
    let value;
    let verb_type;

    if (params.e) {
        const range = params.e.range;
        value = range.getValue();
        const a1 = range.getA1Notation();
        verb_type = null;
    }
    else if (params.verb) {
        value = params.verb.stem + params.verb.ending;
        verb_type = params.verb.type;
    }

    try {

        if (!value || value == "Select one") {
            return true;
        }

        display.setValue("Working....");

        const infinitive = value;
        const stem = infinitive.slice(0, -2);
        const ending = infinitive.slice(-2);

        const currentVerb = {
            infinitive:  infinitive,
            stem:        stem,
            ending:      ending,
            action:      "load_verb",
            type:        verb_type,
        }

        console.log ("test here1", currentVerb);
        
        CACHE.put('working_verb', JSON.stringify(currentVerb), 3600);

        resetBody();

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


        CACHE.put('CURRENT_TYPE', 'regular_verb', 3600);

        // TENSE_VERB_LABEL.setBackground('#E4C2B2')
        //     .setHorizontalAlignment("right")
        //     .setValue("Current verbs: ");

        // TENSE_VERB_DROPDOWN.merge()
        //     .setBackground('#E5E5EF')
        //     .setValue("Select one");

        display.setValue ("");
        return true;
    }
    catch (error) {
        display.setValue ("Error getting verb information: " + error);
        return false;
    }
}