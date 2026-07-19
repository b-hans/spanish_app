function verbAction (e) {
    const range = e.range;
    const value = range.getValue();
    const a1 = range.getA1Notation();

    const display = FORM_DISPLAY_RANGE;

    const infinitive = VERB_INFINITIVE.getValue();
    const stem = infinitive.slice(0, -2);
    const ending = infinitive.slice(-2);

    const currentVerb = {
        infinitive:  infinitive,
        stem:        stem,
        ending:      ending,
        action:      value,
    }

    try {

        switch (value) {
            case "Cancel":
                return getResponse({message: "Cancel, are you sure?", rule: CANCEL_RULE});

            default:
                CACHE.put('working_verb', JSON.stringify(currentVerb), 3600);
                break;
        }

        display.setValue("doit: " + value + " : " + infinitive + " : " + stem + " : " + ending);
        return true;
    }
    catch (error) {
        display.setValue("Error in verb action: " + error);
        return false;
    }

}