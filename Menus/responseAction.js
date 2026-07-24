function responseAction (e) {
    const range = e.range;
    const value = range.getValue();
    
    const display = FORM_SHORT_DISPLAY;

    try {

        display.setValue ("Working....");

        switch (value) {

            case "No, return":
                return resetResponse();

            case "Yes, add this verb":
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