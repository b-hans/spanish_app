function menuEdit(e) {

    const CURRENT_TYPE = CACHE.get('CURRENT_TYPE');
    const display = FORM_DISPLAY_RANGE;
    const range = e.range;
    const a1 = range.getA1Notation();
    
    try {

        switch (CURRENT_TYPE) {

            case "form1":
                switch (a1) {
                    case VERB_TYPE_INPUT_A1:                        
                        return verbType(e);

                    case RESPONSE_A1:
                        return responseAction(e);
                        
                    default:
                        return true;
                }

                return true;

            default: 
                display.setValue("Default: " + CURRENT_TYPE);
        }

        return true;
    }
    catch (error) {
        FORM_DISPLAY_RANGE.setValue ("Error: " + error);
        return false;
    }
}