function regularVerbMenu (e) {
    const range = e.range;
    const value = range.getValue();
    const a1 = range.getA1Notation();

    const working_verb = JSON.parse(CACHE.get('working_verb'));

    try {

        let display = FORM_DISPLAY_RANGE;

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
                        return regularOut(e);

                }
                break;

            case RESPONSE_A1:
                display = FORM_SHORT_DISPLAY;
                switch (value) {

                    case "No, return":
                        return resetResponse();

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