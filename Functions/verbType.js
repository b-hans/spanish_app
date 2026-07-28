function verbType() {

    const display = FORM_DISPLAY_RANGE;

    let CURRENT_TYPE = JSON.parse(CACHE.get('CURRENT_TYPE'));
    const verb_type = CURRENT_TYPE.value;

    try {

        display.setValue ("Working....");

        if (verb_type == "Select one") {
            display.setValue ("Do nothing");
            return true;
        }

        // reset the menu dropdown
        VERB_TYPE_INPUT_RANGE.setValue ("Select one");

        // validate input
        const infinitive = INFINITIVE_INPUT_RANGE.getValue();

        // checking the input here (from C5)
        const validCheck = validateVerb({display: display, verb: infinitive});

        if (!validCheck.valid) {
            // not valid
            display.setValue(validCheck.message);
            return true;
        }
        else {
            // asign the input verb
            INFINITIVE_INPUT_RANGE.setValue("");
            CURRENT_TYPE.infinitive = infinitive.toLowerCase();
            CURRENT_TYPE.stem = validCheck.stem;
            CURRENT_TYPE.ending = validCheck.ending;

            CACHE.put('CURRENT_TYPE', JSON.stringify(CURRENT_TYPE), 3600);
        }

        switch (verb_type) {

            case "Regular":
                return regularVerbOut();

            // future development here
            case "Irregular":
                display.setValue ("Irregular: " +
                    validCheck.stem + " : " + validCheck.ending
                );
                break;

            default:
                display.setValue("Default: " + verb_type + " : " + 
                    validCheck.stem + " : " + validCheck.ending
                );
        }

        
        return true;
    }
    catch (error) {
        return false;
    }
}