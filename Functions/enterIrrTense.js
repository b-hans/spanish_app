function enterIrrTense (CURRENT_TYPE) {

    let display = FORM_DISPLAY_RANGE;

    try {

        CURRENT_TYPE.responseStatus = false;

        let topHeaders;
        let sideHeaders = PRONOUN_RANGE_ARRAY;

        switch (CURRENT_TYPE.tense) {
            case "Subjunctive":

                let conjugationData = CONJUGATION_TYPES.getDataRange().getValues();
                let conjugationHeaders = conjugationData.shift();

                topHeaders = [
                    { 
                        tense:  'Subjunctive present',
                        column: 0,
                        id:     conjugationData.filter(
                                    row => row[conjugationHeaders
                                        .indexOf('conjugation type')] == "Subjunctive present"
                                )[0][conjugationHeaders.indexOf('conjugation_type_id')],
                    }, 
                    {
                        tense:  'Subjunctive imperfect',
                        column: 1,
                        id:     conjugationData.filter(
                                    row => row[conjugationHeaders
                                        .indexOf('conjugation type')] == "Subjunctive imperfect"
                                )[0][conjugationHeaders.indexOf('conjugation_type_id')],
                    },
                    {
                        tense:  'Subjunctive future',
                        column: 3,
                        id:     conjugationData.filter(
                                    row => row[conjugationHeaders
                                        .indexOf('conjugation type')] == "Subjunctive future"
                                )[0][conjugationHeaders.indexOf('conjugation_type_id')],
                    }
                ];

                let newData = new Array();

                // create a row for each tense and push it onto the newData
                for (let i=0; i<topHeaders.length; i++) {
                    let item = topHeaders[i];
                    let row = [];

                    row.push(CURRENT_TYPE.verb_id);
                    row.push(item.id);

                    for (let j=0; j<sideHeaders.length; j++) {
                        row.push(CURRENT_TYPE.data[j][item.column])
                    }

                    newData.push(row);

                }

                IRREGULAR_TENSES.getRange(
                    IRREGULAR_TENSES.getLastRow() + 1,
                    1,
                    newData.length,
                    newData[0].length
                ).setValues(newData);
                break;
        }

        CURRENT_TYPE.status = "read_verb";
        CURRENT_TYPE.data = null;
        CURRENT_TYPE.tense = null;
        CURRENT_TYPE.tenseEmpty = false;

        CACHE.put('CURRENT_TYPE', JSON.stringify(CURRENT_TYPE), 3600);

        verbOut();

        display.setValue ("Tense added!");
        return true;
    }
    catch (error) {
        display.setValue ("Error entering irregular tense data: " + error);
        return false;
    }
}