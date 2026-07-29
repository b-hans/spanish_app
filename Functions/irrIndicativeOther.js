function irrIndicativeOther () {
    let CURRENT_TYPE = getCurrentType();
    let display = FORM_DISPLAY_RANGE;

    try {

        console.log (CURRENT_TYPE);

        display.setValue ("Other indicative");
        return true;
    }
    catch (error) {
        display.setValue ("Error getting irregular other indicative: " + error);
        return false;
    }
}