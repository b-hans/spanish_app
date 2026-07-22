function regularOut (params) {

    let value;

    let working_verb = JSON.parse(CACHE.get('working_verb'));
    let display = FORM_DISPLAY_RANGE;

    if (params.e) {
        const range = params.e.range;
        value = range.getValue();

        CACHE.put('working_action', value, 3600);

    }
    else {
        value = working_verb.action;
    }

    try {

        display.setValue("Working....");

        working_verb.action = value;

        CACHE.put('working_verb', JSON.stringify(working_verb), 3600);

        return tenseOut();
    }
    catch (error) {
        display.setValue ("Error getting regular indicative: " + error);
        return false;
    }
}