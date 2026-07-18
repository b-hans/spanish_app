function addVerb() {
    const verb = JSON.parse(CACHE.get('current_verb'));
    const display = FORMSHEET.getRange(FORM_DISPLAY_RANGE_A1);

    try {

        resetResponse();

        display.setValue("Working....");

        let verbData = REGULAR_VERBS.getDataRange().getValues();
        let verbHeadings = verbData.shift();

        let idColumn = verbHeadings.indexOf('ID');

        // get ids
        const idsFlat = verbData.map(row => row[idColumn]);
        const nextId = Math.max(...idsFlat) + 1;

        // new row
        const newRow = [nextId, verb.stem, verb.ending];

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

        display.setValue ("New verb added: " + verb.stem + verb.ending);
        
        return true;

    }
    catch (error) {
        display.setValue ("Error adding verb: " + error);
        return false;
    }
}