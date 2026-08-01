function doEdits () {
    let display = FORM_SHORT_DISPLAY;

    let CURRENT_TYPE = getCurrentType();

    try {
        console.log (CURRENT_TYPE);
        resetResponse();
        resetOtherFormItems();

        return enterIrrIndicative({edit: true});

        return true;
    }
    catch (error) {
        display.setValue ("Error doing the edits: " + error);
        return false;
    }

}