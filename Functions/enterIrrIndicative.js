function enterIrrIndicative (params = null) {

    let CURRENT_TYPE = getCurrentType();
    let display = FORM_DISPLAY_RANGE;

    try {
        display.setValue ("Working....");

        // add the participles
        let participle = FORMSHEET.getRange("C16").getValue();
        let past_participle = FORMSHEET.getRange("D16").getValue();

        if (params && params.edit) {
            // participles first
            let participlesData = IRREGULAR_PARTICIPLES.getDataRange().getValues();
            let participleHeaders = participlesData.shift();

            let found = false;
            for (let i=0; i<participlesData.length; i++) {
                if (CURRENT_TYPE.verb_id == participlesData[i][participleHeaders.indexOf('verb_id')]) {
                    participlesData[i][participleHeaders.indexOf('participle')] = 
                        CURRENT_TYPE.participle;
                    participlesData[i][participleHeaders.indexOf('past participle')] = 
                        CURRENT_TYPE.past_participle;

                    found = true;
                    break;
                }
            }

            if (found) {
                IRREGULAR_PARTICIPLES.clearContents();

                participlesData.unshift(participleHeaders);

                IRREGULAR_PARTICIPLES.getRange(1, 1, participlesData.length, participlesData[0].length)
                    .setValues(participlesData);

            }
            else {
                // here we'll add the row
            }

            if (!CURRENT_TYPE.tense) {
                verbOut();
                display.setValue ("Edits done!");
                return true;
            }

        }
        else {
            let participle_row = [CURRENT_TYPE.verb_id, participle, past_participle];

            let currentParticiples = IRREGULAR_PARTICIPLES.getDataRange().getValues();
            currentParticiples.push(participle_row);

            IRREGULAR_PARTICIPLES.clearContents();
            IRREGULAR_PARTICIPLES.getRange(1, 1, currentParticiples.length, currentParticiples[0].length)
                .setValues(currentParticiples);

        }


        // get the tense ids
        let conjugation_types = CONJUGATION_TYPES.getDataRange().getValues();
        let conjugation_headers = conjugation_types.shift();

        // we start with indicative
        let indicative_types = conjugation_types.filter(
            row => row[conjugation_headers.indexOf('conjugation type')].startsWith("Indicative ")
        );

        let newData;
        if (params && params.edit) {
            newData = CURRENT_TYPE.data;
        }
        else {
            newData = FORMSHEET.getRange("B8:F13").getValues();
        }

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

        let newTense;
        if (params && params.edit) {
            let tenseData = IRREGULAR_TENSES.getDataRange().getValues();

            // get indicative numbers 

            let filteredOut = tenseData.filter(
                row => row[0] != CURRENT_TYPE.verb_id
            );

            newTense = [...filteredOut, ...rowTest];

        }
        else {
            // concat the data

            let tenseData = IRREGULAR_TENSES.getDataRange().getValues();
            newTense = [...tenseData, ...rowTest];
        }

        IRREGULAR_TENSES.clearContents();
        IRREGULAR_TENSES.getRange(1, 1, newTense.length, newTense[0].length)
            .setValues(newTense);

        CURRENT_TYPE = (new typeObject({value: CURRENT_TYPE.infinitive})).current_type;

        CURRENT_TYPE.status = 'read_verb';
        
        CACHE.put('CURRENT_TYPE', JSON.stringify(CURRENT_TYPE), 3600);

        verbOut();

        // reBuildVerbForm();

        if (params && params.edit) {
            display.setValue ("Edits done!");
        }
        else {
            display.setValue ("Irregular verb indicative added");
        }
        
        return true;
    }
    catch (error) {
        display.setValue ("Error entering indicative: " + error);
        return false;
    }
}