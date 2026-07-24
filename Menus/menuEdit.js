function menuEdit(e) {

    let CURRENT_TYPE = JSON.parse(CACHE.get('CURRENT_TYPE'));
    const display = FORM_DISPLAY_RANGE;
    const range = e.range;
    const a1 = range.getA1Notation();
    const value = range.getValue();
    
    try {

        CURRENT_TYPE.range = range;
        CURRENT_TYPE.a1 = a1;
        CURRENT_TYPE.value = value;

        CACHE.put('CURRENT_TYPE', JSON.stringify(CURRENT_TYPE), 3600);

        switch (CURRENT_TYPE.status) {

            case "regular_verb":
                return regularVerbMenu(e);

            case "form":
                switch (a1) {
                    case VERB_TYPE_INPUT_A1:                        
                        return verbType();

                    case CURRENT_VERBS_INPUT_A1:
                        return verbOut();

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