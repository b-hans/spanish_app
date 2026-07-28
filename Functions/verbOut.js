function verbOut () {
    const display = FORM_DISPLAY_RANGE;

    let CURRENT_TYPE = JSON.parse(CACHE.get('CURRENT_TYPE'));

    try {

        display.setValue("Working....");

        if (CURRENT_TYPE.status == "form") {

            if (!CURRENT_TYPE.stem && (!CURRENT_TYPE.value || CURRENT_TYPE.value == "Select one")) {
                return true;
            }

            // assign infinitive, stem, ending, type
            CURRENT_TYPE.infinitive = CURRENT_TYPE.value;

            CURRENT_TYPE.stem = CURRENT_TYPE.infinitive.slice (0, -2);
            CURRENT_TYPE.ending = CURRENT_TYPE.infinitive.slice (-2);


            switch (CURRENT_TYPE.ending) {
                case "ar":
                    CURRENT_TYPE.participle = CURRENT_TYPE.stem + "ando";
                    CURRENT_TYPE.past_participle = CURRENT_TYPE.stem + "ado";
                    break;

                default:
                    CURRENT_TYPE.participle = CURRENT_TYPE.stem + "iendo";
                    CURRENT_TYPE.past_participle = CURRENT_TYPE.stem + "ido";
                    break;

            }

            // get id and type
            let current_id = getVerbId(CURRENT_TYPE);
            CURRENT_TYPE.type = current_id.type;
            CURRENT_TYPE.verb_id = current_id.id;

            console.log (CURRENT_TYPE);
            display.setValue ("from form");

        }
        else if (CURRENT_TYPE.status == "new_verb") {
            console.log (CURRENT_TYPE);
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

        // CACHE.put('CURRENT_TYPE', JSON.stringify(CURRENT_TYPE), 3600);

        TENSE_VERB_LABEL.setBackground('#E4C2B2')
            .setHorizontalAlignment("right")
            .setValue("Current verbs: ");

        TENSE_VERB_DROPDOWN.merge()
            .setBackground('#E5E5EF')
            .setValue("Select one");

        getVerbDropdown(CURRENT_TYPE);

        display.setValue ("");

        return true;
    }
    catch (error) {
        display.setValue ("Error getting verb information: " + error);
        return false;
    }
}