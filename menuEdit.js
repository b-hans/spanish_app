function menuEdit(e) {

    const CURRENT_TYPE = CACHE.get('CURRENT_TYPE');
    const display = FORM_DISPLAY_RANGE;
    const range = e.range;
    
    try {

        switch (CURRENT_TYPE) {

            case "form1":
                if (range.getA1Notation() == VERB_TYPE_INPUT_A1) {
                    return verbType(e); 
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