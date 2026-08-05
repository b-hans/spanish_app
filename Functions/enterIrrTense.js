function enterIrrTense (CURRENT_TYPE) {

    let display = FORM_DISPLAY_RANGE;

    try {

        CURRENT_TYPE.responseStatus = false;

        let topHeaders;
        let sideHeaders = PRONOUN_RANGE_ARRAY;

        console.log (sideHeaders);

        let filteredConjugationTypes;

        switch (CURRENT_TYPE.tense) {
            case "Subjunctive":

                let conjugationData = CONJUGATION_TYPES.getDataRange().getValues();
                let conjugationHeaders = conjugationData.shift();

                filteredConjugationTypes = conjugationData.filter (
                    row => row[conjugationHeaders.indexOf('conjugation type')].
                    startsWith ("Subjunctive ")
                );

                console.log (filteredConjugationTypes);

                topHeaders = [
                    { 
                        tense:  'Subjunctive present',
                        column: 0,
                        id:     filteredConjugationTypes.filter(
                                    row => row[conjugationHeaders
                                        .indexOf('conjugation type')] == "Subjunctive present"
                                )[0][conjugationHeaders.indexOf('conjugation_type_id')],
                    }, 
                    {
                        tense:  'Subjunctive imperfect',
                        column: 1,
                        id:     filteredConjugationTypes.filter(
                                    row => row[conjugationHeaders
                                        .indexOf('conjugation type')] == "Subjunctive imperfect"
                                )[0][conjugationHeaders.indexOf('conjugation_type_id')],
                    },
                    {
                        tense:  'Subjunctive future',
                        column: 2,
                        id:     filteredConjugationTypes.filter(
                                    row => row[conjugationHeaders
                                        .indexOf('conjugation type')] == "Subjunctive future"
                                )[0][conjugationHeaders.indexOf('conjugation_type_id')],
                    }
                ];

                console.log (topHeaders);

                break;
        }

        // get the data and build rows
        console.log (CURRENT_TYPE);

        display.setValue ("checkem");
        return true;
    }
    catch (error) {
        display.setValue ("Error entering irregular tense data: " + error);
        return false;
    }
}