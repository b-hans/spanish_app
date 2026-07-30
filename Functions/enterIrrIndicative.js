function enterIrrIndicative () {

    let CURRENT_TYPE = getCurrentType();
    let display = FORM_DISPLAY_RANGE;

    try {
        display.setValue ("Working....");

        // console.log (CURRENT_TYPE);

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

        display.setValue("Data entered");

        return true;
    }
    catch (error) {
        display.setValue ("Error entering indicative: " + error);
        return false;
    }
}