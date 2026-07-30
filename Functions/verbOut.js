function verbOut () {
    const display = FORM_DISPLAY_RANGE;

    let CURRENT_TYPE = JSON.parse(CACHE.get('CURRENT_TYPE'));

    try {

        display.setValue("Working....");

        // from dropdown or from new enter
        if (CURRENT_TYPE.status == "form") {

            if (!CURRENT_TYPE.stem && (!CURRENT_TYPE.value || CURRENT_TYPE.value == "Select one")) {
                return true;
            }

            CURRENT_TYPE = (new typeObject (CURRENT_TYPE)).current_type;

        }
        // new verb
        else if (CURRENT_TYPE.status == "new_verb") {
            display.setValue (CURRENT_TYPE.status);
        }

        // change the status here to read_verb
        CURRENT_TYPE.status = "read_verb";

        CACHE.put('CURRENT_TYPE', JSON.stringify(CURRENT_TYPE), 3600);

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

        VERB_INFINITIVE.setValue(CURRENT_TYPE.infinitive);
        VERB_PARTICIPLE.setValue (CURRENT_TYPE.participle);
        VERB_PAST_PARTICIPLE.setValue (CURRENT_TYPE.past_participle);

        TENSE_VERB_LABEL.setBackground('#E4C2B2')
            .setHorizontalAlignment("right")
            .setValue("Current verbs: ");

        TENSE_VERB_DROPDOWN.merge()
            .setBackground('#E5E5EF')
            .setValue("Select one");

        getVerbDropdown(CURRENT_TYPE);

        switch (CURRENT_TYPE.tense) {

            case "Indicative":
                if (CURRENT_TYPE.type == "regular") {
                    return loadIndicative(CURRENT_TYPE);
                }
                else {
                    return loadIrrIndicative(CURRENT_TYPE);
                }

            case "Subjunctive":
            case "Imperative":
            case "Progressive":
            case "Perfect":
            case "Perfect Subjunctive:":
                display.setValue ("Tense: " + CURRENT_TYPE.tense);
                return true;

            default:
                display.setValue ("Verb loaded");
                return true;
        }

    }
    catch (error) {
        display.setValue ("Error getting verb information: " + error);
        return false;
    }
}