function regularVerbOut() {

    let CURRENT_TYPE = JSON.parse(CACHE.get('CURRENT_TYPE'));
    const display = FORM_DISPLAY_RANGE;

    const verbStem = CURRENT_TYPE.stem; //params.verb.stem;
    const verbEnding = CURRENT_TYPE.ending; // params.verb.ending;

    try {

        CURRENT_TYPE.type = "regular";

        CURRENT_TYPE.verb_id = getVerbId(CURRENT_TYPE);

        CACHE.put('CURRENT_TYPE', JSON.stringify(CURRENT_TYPE), 3600);


        if (CURRENT_TYPE.verb_id) {
            return verbOut();
        }
        else {
            return getResponse({message: "'" + verbStem + 
                verbEnding + "' is not in the system, would you like to add it?",
                rule: ADD_VERB_RULE});
        }
        return true;
    }
    catch (error) {
        display.setValue (display.getValue() + " Error getting regular verb: " + error);
        return false;
    }
}