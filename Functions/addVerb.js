function addVerb() {
    // const verb = JSON.parse(CACHE.get('current_verb'));
    let display = FORM_SHORT_DISPLAY;

    let CURRENT_TYPE = JSON.parse(CACHE.get('CURRENT_TYPE'));

    try {

        display.setValue("Working....");

        resetResponse();

        FORM_DISPLAY_RANGE.setValue ("Still working");

        let verbData = REGULAR_VERBS.getDataRange().getValues();
        let verbHeadings = verbData.shift();

        let idColumn = verbHeadings.indexOf('ID');

        // get ids
        const idsFlat = verbData.map(row => row[idColumn]);
        const nextId = Math.max(...idsFlat) + 1;

        // new row
        const newRow = [nextId, CURRENT_TYPE.stem, CURRENT_TYPE.ending, CURRENT_TYPE.type];

        // add the new row to the data
        verbData.push(newRow);
        verbData.unshift(verbHeadings);

        // rebuild the sheet
        REGULAR_VERBS.clearContents();

        REGULAR_VERBS.getRange(
            1,
            1,
            verbData.length,
            verbData[0].length
        ).setValues(verbData);

        reBuildVerbForm();

        FORM_DISPLAY_RANGE.setValue ("New verb added: " + CURRENT_TYPE.infinitive);

        return true;

    }
    catch (error) {
        display.setValue ("Error adding verb: " + error);
        return false;
    }
}