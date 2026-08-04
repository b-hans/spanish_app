function doEdits () {
    let display = FORM_SHORT_DISPLAY;

    let CURRENT_TYPE = getCurrentType();

    try {

        resetResponse();
        resetOtherFormItems();

        if (CURRENT_TYPE.tense == "Indicative") {
            return enterIrrIndicative({edit: true});
        }
        else {
            return enterIrrTense(CURRENT_TYPE);
        }

        return true;
    }
    catch (error) {
        display.setValue ("Error doing the edits: " + error);
        return false;
    }

}