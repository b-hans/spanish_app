function regularVerbMenu () {

    let CURRENT_TYPE = getCurrentType();

    const value = CURRENT_TYPE.value
    const a1 = CURRENT_TYPE.a1

    let display = FORM_DISPLAY_RANGE;

    try {

        switch (a1) {
            case VERB_ACTIONS_A1:
                switch (value) {
                    case "Select one":
                        display.setValue("");
                        return true;

                    case "Cancel":
                        FORMSHEET.getRange(CURRENT_TYPE.a1).setValue("Select one");

                        CURRENT_TYPE.responseStatus = true;
                        CACHE.put('CURRENT_TYPE', JSON.stringify(CURRENT_TYPE), 3600);

                        return getResponse({message: "Cancel, are you sure?", rule: CANCEL_RULE});

                    case "Edit":

                        CURRENT_TYPE = getNewData(CURRENT_TYPE);
                        console.log (CURRENT_TYPE);
                        return true;

                        CURRENT_TYPE.responseStatus = true;
                        CACHE.put ('CURRENT_TYPE', JSON.stringify(CURRENT_TYPE), 3600);

                        console.log (CURRENT_TYPE);

                        return getResponse ({
                            message:    "Make these edits?",
                            rule:       EDIT_RULE
                        });

                    default:
                        CURRENT_TYPE.tense = value;
                        CACHE.put('CURRENT_TYPE', JSON.stringify(CURRENT_TYPE), 3600);
                        return verbOut();

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

            case NEW_VERB_A1:
                // the object is only reading value at this point
                let current = new typeObject({value: value});
                CURRENT_TYPE = current.current_type;

                CACHE.put('CURRENT_TYPE', JSON.stringify(CURRENT_TYPE), 3600);
                return verbOut()

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