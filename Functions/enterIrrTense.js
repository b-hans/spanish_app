function enterIrrTense (CURRENT_TYPE) {

    let display = FORM_DISPLAY_RANGE;

    try {
        console.log (CURRENT_TYPE);

        display.setValue ("checkem");
        return true;
    }
    catch (error) {
        display.setValue ("Error entering irregular tense data: " + error);
        return false;
    }
}