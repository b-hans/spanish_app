function loadIrrIndicative (CURRENT_TYPE) {

    let display = FORM_DISPLAY_RANGE;

    try {

        display.setValue("Loading the verb tense");

        PRONOUN_RANGE.setValues(PRONOUN_RANGE_ARRAY)
            .setBackground('#3c78d8')
            .setFontColor('#ffffff')
            .setHorizontalAlignment('right');

        TENSE_HEADING_RANGE.setValues([TENSE_ARRAY])
            .setHorizontalAlignment('center')
            .setBackground('#000000')
            .setFontColor('#ffffff');

        // get the headers
        let conjugationTypes = CONJUGATION_TYPES.getDataRange().getValues();
        let conjugationHeaders = conjugationTypes.shift();

        let tenseHeaders = IRREGULAR_TENSES.getRange(1, 1, 1, IRREGULAR_TENSES.getLastColumn())
            .getValues();

        let proNounHeaders = FORMSHEET.getRange("A8:A13").getValues().flat();

        // yo
        let valuesArray = [
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
        ];

        for (let i=0; i<CURRENT_TYPE.tenses.length; i++) {
            let tenseItem = CURRENT_TYPE.tenses[i];

            let myConjugationType = conjugationTypes.find(row => row[0] == tenseItem[1]);

            if (myConjugationType[1] == "Indicative present") {
                let startRow = 0;
                for (let j=2; j<tenseItem.length; j++) {
                    valuesArray[startRow++][0] = tenseItem[j];
                }
            }
            else if (myConjugationType[1] == "Indicative preterite") {
                let startRow = 0;
                for (let j=2; j<tenseItem.length; j++) {
                    valuesArray[startRow++][1] = tenseItem[j];
                }
            }
            else if (myConjugationType[1] == "Indicative imperfect") {
                let startRow = 0;
                for (let j=2; j<tenseItem.length; j++) {
                    valuesArray[startRow++][2] = tenseItem[j];
                }
            }
            else if (myConjugationType[1] == "Indicative conditional") {
                let startRow = 0;
                for (let j=2; j<tenseItem.length; j++) {
                    valuesArray[startRow++][3] = tenseItem[j];
                }
            }
            else if (myConjugationType[1] == "Indicative future") {
                let startRow = 0;
                for (let j=2; j<tenseItem.length; j++) {
                    valuesArray[startRow++][4] = tenseItem[j];
                }
            }

        }

        FORMSHEET.getRange("B8:F13").setValues(valuesArray)
            .setHorizontalAlignment("left")
            .setBackground('#f3f3f3');

        CURRENT_TYPE.data = valuesArray;

        CACHE.put('CURRENT_TYPE', JSON.stringify(CURRENT_TYPE), 3600);

        display.setValue ("");
        return true;
    }
    catch (error) {
        display.setValue ("Error loading irregular indicative: " + error);
        return false;
    }
}