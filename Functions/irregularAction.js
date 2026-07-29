function irregularAction () {
    let CURRENT_TYPE = JSON.parse(CACHE.get('CURRENT_TYPE'));
    let display = FORM_DISPLAY_RANGE;

    try {

        switch (CURRENT_TYPE.value) {

            case "Other":
                CURRENT_TYPE.status = "new_err_indicative";
                CACHE.put('CURRENT_TYPE', JSON.stringify(CURRENT_TYPE), 3600);
                return irrIndicativeOther();

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