function verbSearch() {

    const display = FORM_DISPLAY_RANGE;

    let CURRENT_TYPE = getCurrentType();

    // let verb_type = CURRENT_TYPE.value;
    // CURRENT_TYPE.type = CURRENT_TYPE.value.toLowerCase();
    const a1 = CURRENT_TYPE.a1;
    const value = CURRENT_TYPE.value;

    try {

        if (value == "Select one") {
            display.setValue ("Do nothing");
            return true;
        }

        display.setValue ("Working....");

        // reset the menu dropdown
        VERB_SEARCH_INPUT_RANGE.setValue ("Select one");

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

            // we just need the valid here
            let currentInputObj = new typeObject({value: infinitive});

            if (currentInputObj.current_type.verb_id) {
                CURRENT_TYPE = currentInputObj.current_type;
                CURRENT_TYPE.value = value
                CURRENT_TYPE.a1 = a1;

                CACHE.put('CURRENT_TYPE', JSON.stringify(CURRENT_TYPE), 3600);

                return verbOut();
            }
            else {

                CURRENT_TYPE.status = 'new_verb';
                CURRENT_TYPE.responseStatus = true;

                CACHE.put('CURRENT_TYPE', JSON.stringify(CURRENT_TYPE), 3600);

                return getResponse({message: "'" + infinitive + 
                    "' is not in the system, would you like to add it?",
                    rule: ADD_VERB_RULE});

            }


        }

    }
    catch (error) {
        display.setValue ("Error searching verb: " + error);
        return false;
    }
}