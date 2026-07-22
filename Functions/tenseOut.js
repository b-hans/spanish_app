function tenseOut () {
    let working_verb = JSON.parse(CACHE.get('working_verb'));
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

        let sheet;
        let tense = working_verb.action;

        switch (working_verb.ending) {
            case "ar":
                sheet = AR_REGULAR;
                break;

            case "er":
                sheet = ER_REGULAR;
                break;

            case "ir":
                sheet = IR_REGULAR;
                break;

            default:
                display.setValue (working_verb.ending + " sheet not there yet");
                return true;
        }


        const data = sheet.getDataRange().getValues();
        const headers = data[0];
        const sideMenu = data.map(row => row[0]);

        const formTop = FORMSHEET.getRange("B7:F7").getValues();
        const formSide = FORMSHEET.getRange("A8:A13").getValues();

        let tenseRangeData = [];

        for (let i=1; i<headers.length; i++) {
            let search1 = headers[i];

            let row = {
                type: search1,
            }

            for (let j=1; j<sideMenu.length; j++) {
                let search2 = sideMenu[j];
                row[search2] = working_verb.stem + data[j][i];
            }
            
            tenseRangeData.push(row);
        }

        let outRowData = [];

        let yoOut = tenseRangeData.filter(row => row.type == "yo")[0];
        let yoRow = [
            yoOut['Indicative present'],
            yoOut['Indicative preterite'],
            yoOut['Indicative imperfect'],
            yoOut['Indicative conditional'],
            yoOut['Indicative future'],
        ];
        outRowData.push(yoRow);

        let tuOut = tenseRangeData.filter(row => row.type == "tú")[0];
        let tuRow = [
            tuOut['Indicative present'],
            tuOut['Indicative preterite'],
            tuOut['Indicative imperfect'],
            tuOut['Indicative conditional'],
            tuOut['Indicative future'],

        ];
        outRowData.push(tuRow);

        let elOut = tenseRangeData.filter(row => row.type == 'él/ella/Ud.')[0];
        let elRow = [
            elOut['Indicative present'],
            elOut['Indicative preterite'],
            elOut['Indicative imperfect'],
            elOut['Indicative conditional'],
            elOut['Indicative future'],

        ];
        outRowData.push(elRow);

        let nosotrosOut = tenseRangeData.filter(row => row.type == "nosotros")[0];
        let nosotrosRow = [
            nosotrosOut['Indicative present'],
            nosotrosOut['Indicative preterite'],
            nosotrosOut['Indicative imperfect'],
            nosotrosOut['Indicative conditional'],
            nosotrosOut['Indicative future'],

        ];
        outRowData.push(nosotrosRow);

        let vosotrosOut = tenseRangeData.filter(row => row.type == "vosotros")[0];
        let vosotrosRow = [
            vosotrosOut['Indicative present'],
            vosotrosOut['Indicative preterite'],
            vosotrosOut['Indicative imperfect'],
            vosotrosOut['Indicative conditional'],
            vosotrosOut['Indicative future'],

        ];
        outRowData.push(vosotrosRow);

        let ellosOut = tenseRangeData.filter(row => row.type == "ellos/ellas/Uds.")[0];
        let ellosRow = [
            ellosOut['Indicative present'],
            ellosOut['Indicative preterite'],
            ellosOut['Indicative imperfect'],
            ellosOut['Indicative conditional'],
            ellosOut['Indicative future'],
        ];
        outRowData.push(ellosRow);

        FORMSHEET.getRange("B8:F13").setValues(outRowData)
            .setHorizontalAlignment("left")
            .setBackground('#f3f3f3');

        display.setValue ("Done!");
        // console.log (outRowData);

        // display.setValue ("check console 12");

        return true;
    }
    catch (error) {
        display.setValue ("Error getting verb tense: " + error);
        return false;
    }
}