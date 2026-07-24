function regularVerbMenu () {

    let CURRENT_TYPE = JSON.parse(CACHE.get('CURRENT_TYPE'));

    const range = CURRENT_TYPE.range;
    const value = CURRENT_TYPE.value
    const a1 = CURRENT_TYPE.a1

    // const working_verb = JSON.parse(CACHE.get('working_verb'));
    // const working_action = CACHE.get('working_action');

    try {

        let display = FORM_DISPLAY_RANGE;

        // if (value == working_action) {
        //     console.log ("here1", value);
        //     return true;
        // }

        switch (a1) {
            case VERB_ACTIONS_A1:
                switch (value) {
                    case "Select one":
                        display.setValue("");
                        return true;

                    case "Cancel":
                        range.setValue("Select one");
                        return getResponse({message: "Cancel, are you sure?", rule: CANCEL_RULE});

                    default:
                        display.setValue ("VERB ACTIOn: " + value);
                        console.log (CURRENT_TYPE);
                        return true;
                        // return regularOut({e: e, verb: null});

                }
                break;

            case RESPONSE_A1:
                display = FORM_SHORT_DISPLAY;
                switch (value) {

                    case "No, return":
                        resetResponse();
                        verbOut({verb: working_verb, e: null});                        
                        loadVerbFromCache();
                        let current_action = CACHE.get('working_action');                        
                        VERB_ACTIONS_DROP_RANGE.setValue(current_action);
                        return true;

                    case "Yes, cancel":
                        reBuildVerbForm();
                        FORM_DISPLAY_RANGE.setValue ("Canceled");
                        return true;

                    default:
                        return true;
                }

                break;

            default:
                display.setValue("case " + a1);
        }

        return true;
    }
    catch (error) {
        display.setValue ("Error in regular verb menu action: " + error);
        return false;
    }
}