function addVerb() {

    let display = FORM_SHORT_DISPLAY;
    let CURRENT_TYPE = JSON.parse(CACHE.get('CURRENT_TYPE'));

    try {

        display.setValue("Working....");

        resetResponse();

        FORM_DISPLAY_RANGE.setValue ("Still working");

        console.log (CURRENT_TYPE);
        
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

        CURRENT_TYPE.verb_id = nextId;

        if (CURRENT_TYPE.type == "irregular") {
            CURRENT_TYPE.status = 'new_irr_one';
            CACHE.put('CURRENT_TYPE', JSON.stringify(CURRENT_TYPE), 3600);
            return irregularNew();
        }

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
    catch (error) {
        display.setValue ("Error adding verb: " + error);
        return false;
    }
}