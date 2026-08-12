function loadOtherTense (CURRENT_TYPE) {

    let display = FORM_DISPLAY_RANGE;

    try {

        PRONOUN_RANGE.setValues(PRONOUN_RANGE_ARRAY)
            .setBackground('#3c78d8')
            .setFontColor('#ffffff')
            .setHorizontalAlignment('right');

        let tenseNumCols;
        let helperVerb;
        let myParticiple;
        let myHeaders;
        let myHeaderRange = TENSE_HEADING_RANGE;

        switch (CURRENT_TYPE.tense) {
            case "Progressive":

                tenseNumCols = 5;
                helperVerb = new typeObject({value: 'estar'}).current_type;
                myParticiple = CURRENT_TYPE.participle;
                myHeaders = [
                    'Progressive present',
                    'Progressive preterite',
                    'Progressive imperfect',
                    'Progressive conditional',
                    'Progressive future'
                ];
                break;

            case "Perfect":
                tenseNumCols = 5;
                helperVerb = new typeObject({value: 'haber'}).current_type;
                myParticiple = CURRENT_TYPE.past_participle;
                myHeaders = [
                    'Perfect present',
                    'Perfect preterite',
                    'Perfect imperfect',
                    'Perfect conditional',
                    'Perfect future'
                ];
                break;

            case "Perfect Subjunctive":
                tenseNumCols = 3;
                helperVerb = new typeObject({value: 'haber'}).current_type;
                myParticiple = CURRENT_TYPE.past_participle;
                myHeaders = [
                    'Perfect subjunctive present',
                    'Perfect subjunctive past',
                    '',
                    'Perfect subjunctive future',
                    ''
                ];

                FORMSHEET.getRange("C7:D7").merge();
                FORMSHEET.getRange("E7:F7").merge();
                myHeaderRange = FORMSHEET.getRange("B7:F7");
                break;

            default:
                display.setValue (CURRENT_TYPE.tense);
                return true;
        }

        myHeaderRange.setValues([myHeaders])
            .setHorizontalAlignment('center')
            .setBackground('#000000')
            .setVerticalAlignment("middle")
            .setFontColor('#ffffff');


        // get helper verb
        let conjugationData = CONJUGATION_TYPES.getDataRange().getValues();
        let conjugationHeaders = conjugationData.shift();

        let helperTenseIds;

        if (CURRENT_TYPE.tense == "Perfect Subjunctive") {
            helperTenseIds = conjugationData.filter (
                row => row[conjugationHeaders.indexOf('conjugation type')]
                    .startsWith("Subjunctive")
            ).map(row => row[conjugationHeaders.indexOf('conjugation_type_id')]).flat();

        }
        else {
            helperTenseIds = conjugationData.filter (
                row => row[conjugationHeaders.indexOf('conjugation type')]
                    .startsWith("Indicative")
            ).map(row => row[conjugationHeaders.indexOf('conjugation_type_id')]).flat();
        }

        let helperTenses = helperVerb.tenses.filter(
            row => helperTenseIds.includes(row[1])
        );

        let cols = tenseNumCols;
        let rows = 6;

        let newData = Array.from ({length: rows}, () => new Array(cols));

        for (let c=0; c<cols; c++) {
            for (let r=0; r<rows; r++) {

                newData[r][c] = helperTenses[c][r+2] + " " + myParticiple;

            }
        }


        if (newData.length > 1) {

            if (CURRENT_TYPE.tense == "Perfect Subjunctive") {

                // get the past subjunctive variations
                newData = newData.map ( row => {
                    let newRow = [...row];

                    let workStr = newRow[1];

                    let workArray = workStr.split(' ');

                    workArray[0] = workArray[0].slice(0, -1);

                    newRow[1] = workArray[0] + " " + workArray[2] + ", " +
                        workArray[1] + " " + workArray[2];

                    return newRow;

                });

                newData.forEach ( row => {
                    row.splice(4, 0, "");
                    row.splice(2, 0, "");
                });

                CURRENT_TYPE.data = newData;

                for (let i=8; i<14; i++) {
                    FORMSHEET.getRange(i, 3, 1, 2).merge();
                    FORMSHEET.getRange(i, 5, 1, 2).merge();
                }

            }
            else {
                CURRENT_TYPE.data = newData;
            }

            FORMSHEET.getRange(8, 2, 6, 5).setValues(newData)
                .setBackground('#f3f3f3')
                .setWrap(true);

        }
        else {
            CURRENT_TYPE.data = null;
        }

        CACHE.put('CURRENT_TYPE', JSON.stringify(CURRENT_TYPE), 3600);

        display.setValue (CURRENT_TYPE.tense + " tense loaded");
        return true;
    }
    catch (error) {
        display.setValue ("Error loading " + CURRENT_TYPE.tense + " tenses: " + error);
        return false;
    }
}