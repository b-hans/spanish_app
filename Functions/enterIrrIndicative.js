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

        let sideHeaders = FORMSHEET.getRange("A8:A13").getValues();
        let topHeaders = FORMSHEET.getRange("B7:F7").getValues()[0];

        let rowTest = [];

        for (let i=0; i<indicative_types.length; i++) {

            let item = indicative_types[i];
            let row = [CURRENT_TYPE.verb_id,
                item[conjugation_headers.indexOf('conjugation_type_id')],
                "",
                "",
                "",
                "",
                "",
                ""
            ];

            // first onee is present
            let tenseCase = item[conjugation_headers.indexOf('conjugation type')];
            tenseCase = tenseCase.slice(tenseCase.indexOf(" ") + 1);

            let position1;

            switch (tenseCase) {
                case "present":
                    position1 = 0;
                    break;

                case "preterite":
                    position1 = 1;
                    break;
                
                case "imperfect":
                    position1 = 2;
                    break;

                case "conditional":
                    position1 = 3;
                    break;

                case "future":
                    position1 = 4;
                    break;
            }

            console.log (i, tenseCase, row);

            // we have the row with verb_id and tense_id now add the 
            // yo tu etc.

            // console.log ("first break", tenseCase, position1, item, row);
            // break;
            // the data rows
            for (let j=0; j<newData.length; j++) {

                // here is a data row
                let newDataRow = newData[j];
                row[position1+2] = newDataRow[position1];
                console.log (j, position1, newDataRow[position1], row);

            }

            console.log ("after jfor", row);

            rowTest.push(row);

        }

        // console.log (rowTest);

        // console.log(indicative_types);
        // console.log(conjugation_headers);
        // console.log(newData);
        // console.log (sideHeaders);
        // console.log (topHeaders);

        display.setValue("Yes, enter 52");

        return true;
    }
    catch (error) {
        display.setValue ("Error entering indicative: " + error);
        return false;
    }
}