function menuEdit(e) {

    let CURRENT_TYPE = JSON.parse(CACHE.get('CURRENT_TYPE'));
    const display = FORM_DISPLAY_RANGE;
    const range = e.range;
    const a1 = range.getA1Notation();
    const value = range.getValue();
    
    try {

        if (range.getSheet().getName() != "Forms") {
            return true;
        }

        CURRENT_TYPE.a1 = a1;
        CURRENT_TYPE.value = value;

        CACHE.put('CURRENT_TYPE', JSON.stringify(CURRENT_TYPE), 3600);

        if (CURRENT_TYPE.responseStatus) {
            return responseAction();
        }

        switch (CURRENT_TYPE.status) {

            case "add_type":
                return addVerb();

            case "read_verb":
                return regularVerbMenu();

            case "form":
                switch (a1) {
                    case VERB_SEARCH_INPUT_A1:                        
                        return verbSearch();

                    case CURRENT_VERBS_INPUT_A1:
                        return verbOut();

                    default:
                        return true;
                }

                return true;

            case "new_verb":
            case "new_irr_one":
            case "new_irr_indicative":
                switch(a1) {
                    case VERB_SEARCH_INPUT_A1:
                        return irregularAction()

                    default:
                        return true;
                }
                
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