function regularVerbOut(params) {
    const display = params.display;
    const verbStem = params.verb.stem;
    const verbEnding = params.verb.ending;

    try {

        let myVerb = new Verb({
            stem:    verbStem, 
            ending:  verbEnding,
            type:    "regular"
        });

        if (myVerb.id) {
            display.setValue ("Verb in the system. Display details");
        }
        else {
            console.log ('check 1');
            return getResponse({message: "'" + verbStem + 
                verbEnding + "' is not in the system, would you like to add it?",
                rule: ADD_VERB_RULE});
        }
        return true;
    }
    catch (error) {
        display.setValue ("Error getting regular verb: " + error);
        return false;
    }
}