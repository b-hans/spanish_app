function regularOut (e) {

    const range = e.range;
    const value = range.getValue();

    let working_verb = JSON.parse(CACHE.get('working_verb'));
    let display = FORM_DISPLAY_RANGE;

    try {

        display.setValue("Working....");

        working_verb.action = value

        CACHE.put('working_verb', JSON.stringify(working_verb), 3600);

        return tenseOut();
    }
    catch (error) {
        display.setValue ("Error getting regular indicative: " + error);
        return false;
    }
}