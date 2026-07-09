function verbType(e) {

    const display = FORM_DISPLAY_RANGE;
    const range = e.range;
    const verb_type = range.getValue();

    try {

        display.setValue ("Working....");

        if (verb_type == "Select one") {
            display.setValue ("Do nothing");
            return true;
        }

        VERB_TYPE_INPUT_RANGE.setValue ("Select one");

        // validate input
        const infinitive = INFINITIVE_INPUT_RANGE.getValue();
        const validCheck = validateVerb({display: display, verb: infinitive});

        if (!validCheck.valid) {
            display.setValue(validCheck.message);
            return true;
        }
        else {
            INFINITIVE_INPUT_RANGE.setValue("");
        }

        switch (verb_type) {

            case "Regular":
                return regularVerbOut({display: display, verb: validCheck});

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