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
            display.setValue ("boo");
            return getResponse({message: "Verb is not in the system, we need to add it"});
        }
        return true;
    }
    catch (error) {
        display.setValue ("Error getting regular verb: " + error);
        return false;
    }
}