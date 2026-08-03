function irregularAction () {
    let CURRENT_TYPE = JSON.parse(CACHE.get('CURRENT_TYPE'));
    let display = FORM_DISPLAY_RANGE;

    try {

        VERB_SEARCH_INPUT_RANGE.setValue("Select one");

        switch (CURRENT_TYPE.value) {

            case "Select one":
                return true;

            case "Enter indicative":
                return enterIrrIndicative()

            case "Cancel":
                return getResponse({
                    message: "Cancel, are you sure?", 
                    rule: CANCEL_RULE
                });

            // case "Other":
            //     CURRENT_TYPE.status = "new_irr_indicative";
            //     CACHE.put('CURRENT_TYPE', JSON.stringify(CURRENT_TYPE), 3600);
            //     return irrIndicativeOther();

            default:
                display.setValue ("Irregular: " + CURRENT_TYPE.status + " : " + CURRENT_TYPE.value);
                return true;
        }

    }
    catch (error) {
        display.setValue ("Error getting irregular action: " + error);
        return false;
    }
}