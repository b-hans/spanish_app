function resetResponse() {
    const display = FORMSHEET.getRange(FORM_DISPLAY_RANGE_A1);
    const CURRENT_TYPE = JSON.parse(CACHE.get('CURRENT_TYPE'));

    try {


        if (CURRENT_TYPE.status == "new_verb") {
            return reBuildVerbForm();
        }

        CURRENT_TYPE.responseStatus = false;
        CACHE.put('CURRENT_TYPE', JSON.stringify(CURRENT_TYPE), 3600);

        display.setValue ("Resetting....");

        FORM_RESPONSE_RANGE.clearContent().clearDataValidations()
            .breakApart()
            .setBackground(FORM_BACK);

        FORM_SHORT_DISPLAY.setBorder(false, false, false, false, false, false)
            .setBackground(FORM_BACK)
            .setValue("")
            .breakApart();

        FORM_DISPLAY_RANGE.merge()
            .setBorder(
                FORM_DISPLAY_BORDERS[0],
                FORM_DISPLAY_BORDERS[1],
                FORM_DISPLAY_BORDERS[2],
                FORM_DISPLAY_BORDERS[3],
                FORM_DISPLAY_BORDERS[4],
                FORM_DISPLAY_BORDERS[5],
                FORM_DISPLAY_BORDERS[6],
                FORM_DISPLAY_BORDERS[7],
            )
            .setBackground('#ffffff')
            .setWrap(true)
            .setValue ("");

        if (CURRENT_TYPE.status == 'read_verb') {
            verbOut();
            VERB_ACTIONS_DROP_RANGE.activate();
            FORM_DISPLAY_RANGE.setValue ("");
        }
        if (CURRENT_TYPE.status == 'edit_verb') {
            verbOut();
            VERB_ACTIONS_DROP_RANGE.activate();
            FORM_DISPLAY_RANGE.setValue ("In edit mode");

        }
        else {
            FORM_DISPLAY_RANGE.setValue ('check');
            console.log (CURRENT_TYPE);
            INFINITIVE_INPUT_RANGE.activate();
        }
        
        return true;
    }
    catch (error) {
        display.setValue ("Error resetting response: " + error);
        return false;
    }
}