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

        switch (CURRENT_TYPE.tense) {
            case "Progressive":

                tenseNumCols = 4;
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
                tenseNumCols = 4;
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

            default:
                display.setValue (CURRENT_TYPE.tense);
                return true;
        }

        TENSE_HEADING_RANGE.setValues([myHeaders])
            .setHorizontalAlignment('center')
            .setBackground('#000000')
            .setFontColor('#ffffff');

        // get estar
        // let estar = new typeObject({value: 'estar'}).current_type;
        let conjugationData = CONJUGATION_TYPES.getDataRange().getValues();
        let conjugationHeaders = conjugationData.shift();

        let indicativeIds = conjugationData.filter (
            row => row[conjugationHeaders.indexOf('conjugation type')]
                .startsWith("Indicative")
        ).map(row => row[conjugationHeaders.indexOf('conjugation_type_id')]).flat()

        let indicativeTenses = helperVerb.tenses.filter(
            row => indicativeIds.includes(row[1])
        );

        let cols = 5;
        let rows = 6;

        let newData = Array.from ({length: rows}, () => new Array(cols));

        for (let c=0; c<cols; c++) {
            for (let r=0; r<rows; r++) {

                newData[r][c] = indicativeTenses[c][r+2] + " " + myParticiple;

            }
        }

        if (newData.length > 1) {
            CURRENT_TYPE.data = newData;

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