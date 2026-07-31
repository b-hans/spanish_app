function responseAction () {
    
    const display = FORM_SHORT_DISPLAY;
    let CURRENT_TYPE = getCurrentType();

    try {

        display.setValue ("Working....");

        switch (CURRENT_TYPE.value) {

            case "No, return":
                return resetResponse();

            case "Yes, add this verb":
                return formVerbType();                
                return addVerb ();

            case "Yes, cancel":
                reBuildVerbForm();
                FORM_DISPLAY_RANGE.setValue ("Canceled");
                return true;

            default:
                return true;

        }

    }
    catch (error) {
        display.setValue ("Error in response action: " + error);
        return false;
    }
}