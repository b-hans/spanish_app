function loadProgressive (CURRENT_TYPE) {

    let display = FORM_DISPLAY_RANGE;

    try {

        PRONOUN_RANGE.setValues(PRONOUN_RANGE_ARRAY)
            .setBackground('#3c78d8')
            .setFontColor('#ffffff')
            .setHorizontalAlignment('right');

        TENSE_HEADING_RANGE.setValues([[
            'Progressive present',
            'Progressive preterite',
            'Progressive imperfect',
            'Progressive conditional',
            'Progressive future'
            ]])
            .setHorizontalAlignment('center')
            .setBackground('#000000')
            .setFontColor('#ffffff');

        // get estar
        let estar = new typeObject({value: 'estar'}).current_type;
        let conjugationData = CONJUGATION_TYPES.getDataRange().getValues();
        let conjugationHeaders = conjugationData.shift();

        let indicativeIds = conjugationData.filter (
            row => row[conjugationHeaders.indexOf('conjugation type')]
                .startsWith("Indicative")
        ).map(row => row[conjugationHeaders.indexOf('conjugation_type_id')]).flat()

        let indicativeTenses = estar.tenses.filter(
            row => indicativeIds.includes(row[1])
        );

        let cols = 5;
        let rows = 6;

        let newData = Array.from ({length: rows}, () => new Array(cols));

        for (let c=0; c<cols; c++) {
            for (let r=0; r<rows; r++) {

                newData[r][c] = indicativeTenses[c][r+2] + " " + CURRENT_TYPE.participle;

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

        display.setValue ("Progressive tense loaded");
        return true;
    }
    catch (error) {
        display.setValue ("Error loading progressive tenses: " + error);
        return false;
    }
}