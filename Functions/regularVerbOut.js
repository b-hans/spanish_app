function regularVerbOut() {

    let CURRENT_TYPE = JSON.parse(CACHE.get('CURRENT_TYPE'));
    const display = FORM_DISPLAY_RANGE;

    const verbStem = CURRENT_TYPE.stem; //params.verb.stem;
    const verbEnding = CURRENT_TYPE.ending; // params.verb.ending;

    try {

        CURRENT_TYPE.type = "regular";

        // does it exists, if yes then it will have an id
        CURRENT_TYPE.verb_id = getVerbId(CURRENT_TYPE);

        if (CURRENT_TYPE.verb_id) {

            CURRENT_TYPE.status = "read_verb";

            switch (CURRENT_TYPE.ending) {
                case "ar":
                    CURRENT_TYPE.participle = CURRENT_TYPE.stem + "ando";
                    CURRENT_TYPE.past_participle = CURRENT_TYPE.stem + "ado";
                    break;

                default:
                    CURRENT_TYPE.participle = CURRENT_TYPE.stem + "iendo";
                    CURRENT_TYPE.past_participle = CURRENT_TYPE.stem + "ido";
                    break;

            }

            CACHE.put('CURRENT_TYPE', JSON.stringify(CURRENT_TYPE), 3600);

            return verbOut();
        }
        else {
            
            CURRENT_TYPE.status = 'new_verb';

            CACHE.put('CURRENT_TYPE', JSON.stringify(CURRENT_TYPE), 3600);

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