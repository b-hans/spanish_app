function menuEdit(e) {

    const CURRENT_TYPE = CACHE.get('CURRENT_TYPE');
    const display = FORM_DISPLAY_RANGE;
    const range = e.range;
    const a1 = range.getA1Notation();
    const value = range.getValue();

    console.log ("check1", CURRENT_TYPE, a1, value);
    
    try {

        display.setValue ("Working....");

        switch (CURRENT_TYPE) {

            case "regular_verb":
                return regularVerbMenu(e);

            case "form1":
                switch (a1) {
                    case VERB_TYPE_INPUT_A1:                        
                        return verbType(e);

                    case CURRENT_VERBS_INPUT_A1:
                        return verbOut({e: e, verb: null});

                    case VERB_ACTIONS_A1:
                        if (VERB_ACTIONS.includes(value) && value != "Select one") {
                            return verbAction (e);
                        }
                        
                        return true;

                    case RESPONSE_A1:
                        return responseAction(e);
                        
                    default:
                        return true;
                }

                return true;

            default: 
                if (a1 == "A1" && value.toLowerCase() == "start"){
                    return reBuildVerbForm();
                }

                display.setValue("Default: " + CURRENT_TYPE);
        }

        return true;
    }
    catch (error) {
        FORM_DISPLAY_RANGE.setValue ("Error: " + error);
        return false;
    }
}