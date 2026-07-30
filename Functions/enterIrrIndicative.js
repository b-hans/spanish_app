function enterIrrIndicative () {

    let CURRENT_TYPE = getCurrentType();
    let display = FORM_DISPLAY_RANGE;

    try {
        display.setValue ("Working....");

        // add the participles
        let participle = FORMSHEET.getRange("C16").getValue();
        let past_participle = FORMSHEET.getRange("D16").getValue();
        let participle_row = [CURRENT_TYPE.verb_id, participle, past_participle];

        let currentParticiples = IRREGULAR_PARTICIPLES.getDataRange().getValues();
        currentParticiples.push(participle_row);

        IRREGULAR_PARTICIPLES.clearContents();
        IRREGULAR_PARTICIPLES.getRange(1, 1, currentParticiples.length, currentParticiples[0].length)
            .setValues(currentParticiples);

        // get the tense ids
        let conjugation_types = CONJUGATION_TYPES.getDataRange().getValues();
        let conjugation_headers = conjugation_types.shift();

        let indicative_types = conjugation_types.filter(
            row => row[conjugation_headers.indexOf('conjugation type')].startsWith("Indicative ")
        );

        let newData = FORMSHEET.getRange("B8:F13").getValues();

        let sideHeaders = FORMSHEET.getRange("A8:A13").getValues().flat();
        let topHeaders = FORMSHEET.getRange("B7:F7").getValues()[0];

        let rowTest = [];

        for (let i=0; i<indicative_types.length; i++) {
            // first get the tense
            let tense = indicative_types[i];

            rowTest[i] = [
                CURRENT_TYPE.verb_id, 
                tense[conjugation_headers.indexOf('conjugation_type_id')]
            ];

            let tenseIndex = 2;
            for (let j=0; j<newData.length; j++) {
                let row = newData[j];
                rowTest[i][tenseIndex++] = row[i]
            }

        }

        // concat the data

        let tenseData = IRREGULAR_TENSES.getDataRange().getValues();
        let newTense = [...tenseData, ...rowTest];

        IRREGULAR_TENSES.clearContents();
        IRREGULAR_TENSES.getRange(1, 1, newTense.length, newTense[0].length)
            .setValues(newTense);

        CURRENT_TYPE = (new typeObject({value: CURRENT_TYPE.infinitive})).current_type;

        CURRENT_TYPE.status = 'read_verb';
        
        CACHE.put('CURRENT_TYPE', JSON.stringify(CURRENT_TYPE), 3600);

        verbOut();

        // reBuildVerbForm();

        display.setValue ("Irregular verb indicative added");
        
        return true;
    }
    catch (error) {
        display.setValue ("Error entering indicative: " + error);
        return false;
    }
}