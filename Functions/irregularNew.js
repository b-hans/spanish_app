function irregularNew () {
    let CURRENT_TYPE = JSON.parse(CACHE.get('CURRENT_TYPE'));

    console.log (CURRENT_TYPE);

    let display = FORM_DISPLAY_RANGE;

    try {
        display.setValue ("Irregular form");
        return true;
    }
    catch (error) {
        display.setValue ("Error getting irregular form: " + error);
        return false;
    }
}