function enterIrrTense (CURRENT_TYPE) {

    let display = FORM_DISPLAY_RANGE;

    try {

        CURRENT_TYPE.responseStatus = false;

        let topHeaders;
        let sideHeaders = PRONOUN_RANGE_ARRAY;

        let conjugationData;
        let conjugationHeaders;
        let subIds;

        let newData;

        let irrData;
        let irrHeaders
        let irrFiltOne;
        let irrEdited;


        switch (CURRENT_TYPE.tense) {
            case "Subjunctive":

                conjugationData = CONJUGATION_TYPES.getDataRange().getValues();
                conjugationHeaders = conjugationData.shift();

                subIds = conjugationData.filter(
                    row => row[conjugationHeaders.indexOf('conjugation type')]
                        .startsWith ("Subjunctive ")
                ).map(row => row[0]).flat();

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

                newData = new Array();

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

                // search for existing first
                irrData = IRREGULAR_TENSES.getDataRange().getValues();
                irrHeaders = irrData.shift();

                irrFiltOne = irrData.filter (
                    row => row[0] != CURRENT_TYPE.verb_id || 
                        (row[0] == CURRENT_TYPE.verb_id && !subIds.includes(row[1]))
                );

                irrEdited = [...irrFiltOne, ...newData];
                irrEdited.unshift(irrHeaders);

                IRREGULAR_TENSES.clearContents();
                IRREGULAR_TENSES.getRange (1, 1, irrEdited.length, irrEdited[0].length)
                    .setValues(irrEdited);

                break;

            case "Imperative":

                conjugationData = CONJUGATION_TYPES.getDataRange().getValues();
                conjugationHeaders = conjugationData.shift();

                subIds = conjugationData.filter(
                    row => row[conjugationHeaders.indexOf('conjugation type')]
                        .startsWith (CURRENT_TYPE.tense)
                ).map(row => row[0]).flat();

                console.log (subIds);

                topHeaders = [
                    { 
                        tense:  'Affirmative',
                        column: 0,
                        id:     conjugationData.filter(
                                    row => row[conjugationHeaders
                                        .indexOf('conjugation type')] == "Imperative affirmative"
                                )[0][conjugationHeaders.indexOf('conjugation_type_id')],
                    }, 
                    {
                        tense:  'Negative',
                        column: 2,
                        id:     conjugationData.filter(
                                    row => row[conjugationHeaders
                                        .indexOf('conjugation type')] == "Imperative negative"
                                )[0][conjugationHeaders.indexOf('conjugation_type_id')],
                    },
                ];

                console.log (topHeaders);

                newData = new Array();

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

                console.log (newData);

                // search for existing first
                irrData = IRREGULAR_TENSES.getDataRange().getValues();
                irrHeaders = irrData.shift();

                irrFiltOne = irrData.filter (
                    row => row[0] != CURRENT_TYPE.verb_id || 
                        (row[0] == CURRENT_TYPE.verb_id && !subIds.includes(row[1]))
                );

                irrEdited = [...irrFiltOne, ...newData];
                irrEdited.unshift(irrHeaders);

                IRREGULAR_TENSES.clearContents();
                IRREGULAR_TENSES.getRange (1, 1, irrEdited.length, irrEdited[0].length)
                    .setValues(irrEdited);

                break;
        }

        CURRENT_TYPE.status = "read_verb";
        CURRENT_TYPE.data = null;
        CURRENT_TYPE.tense = null;
        CURRENT_TYPE.tenseEmpty = false;

        let tenses = IRREGULAR_TENSES.getDataRange().getValues();
        CURRENT_TYPE.tenses = tenses.filter(row => row[0] == CURRENT_TYPE.verb_id);

        CACHE.put('CURRENT_TYPE', JSON.stringify(CURRENT_TYPE), 3600);

        verbOut();

        display.setValue ("Tense updated!");
        return true;
    }
    catch (error) {
        display.setValue ("Error entering irregular tense data: " + error);
        return false;
    }
}