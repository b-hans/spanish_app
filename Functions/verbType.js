function verbType() {

    const display = FORM_DISPLAY_RANGE;

    let CURRENT_TYPE = getCurrentType();
    let verb_type = CURRENT_TYPE.value;
    CURRENT_TYPE.type = CURRENT_TYPE.value.toLowerCase();
    const a1 = CURRENT_TYPE.a1;

    try {

        display.setValue ("Working....");

        if (verb_type == "Select one") {
            display.setValue ("Do nothing");
            return true;
        }

        // reset the menu dropdown
        VERB_TYPE_INPUT_RANGE.setValue ("Select one");

        // validate input
        const infinitive = INFINITIVE_INPUT_RANGE.getValue().toLowerCase();
        CURRENT_TYPE.infinitive = infinitive;


        // checking the input here (from C5)
        const validCheck = validateVerb({display: display, verb: infinitive});

        if (!validCheck.valid) {
            // not valid
            display.setValue(validCheck.message);
            return true;
        }
        else {
            // asign the input verb
            CURRENT_TYPE.value = infinitive.toLowerCase();
            
            let currentInputObj = new typeObject(CURRENT_TYPE);

            if (currentInputObj.current_type.verb_id) {
                CURRENT_TYPE = currentInputObj.current_type;
                // CURRENT_TYPE = currentInputObj.current_type;
                CURRENT_TYPE.value = verb_type;
                CURRENT_TYPE.a1 = a1;
                verb_type = CURRENT_TYPE.type;
            }
            else {
                // CURRENT_TYPE.infinitive = infinitive.toLowerCase();
                CURRENT_TYPE.stem = validCheck.stem;
                CURRENT_TYPE.ending = validCheck.ending;
                // CURRENT_TYPE.type = verb_type;
            }

            INFINITIVE_INPUT_RANGE.setValue("");
            CACHE.put('CURRENT_TYPE', JSON.stringify(CURRENT_TYPE), 3600);

        }

        switch (verb_type) {

            case "Regular":
            case "regular":
            case "Irregular":
            case "irregular":
                return typeVerbOut();

            // // future development here
            // case "Irregular":
            //     display.setValue ("Irregular: " +
            //         validCheck.stem + " : " + validCheck.ending
            //     );
            //     break;

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