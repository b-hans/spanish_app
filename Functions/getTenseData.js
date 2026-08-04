function getTenseData (CURRENT_TYPE) {

    let display = FORM_DISPLAY_RANGE;

    try {

        let tenseDataSheet;
        let tenseData;
        let newData;
        let filteredData = [];
        let mappedData;
        let empty = false;

        if (CURRENT_TYPE.type == "irregular"){

            newData = getIrregularTense(CURRENT_TYPE);
            
            if (newData.length < 1) {
                CURRENT_TYPE.tenseEmpty = true;
                empty = true;
            }
            else {
                CURRENT_TYPE.tenseEmpty = false;
                CURRENT_TYPE.data = newData;
                return CURRENT_TYPE;
            }
        }

        if (CURRENT_TYPE.type == "regular" || empty) {

            switch (CURRENT_TYPE.ending) {
                case "ar":
                    tenseDataSheet = AR_REGULAR;
                    break;

                case "er":
                    tenseDataSheet = ER_REGULAR;
                    break;

                case "ir":
                    tenseDataSheet = IR_REGULAR;
                    break;
            }            

            tenseData = tenseDataSheet.getDataRange().getValues();
            let headers = tenseData.shift();

            // map to tense
            switch (CURRENT_TYPE.tense) {
                case "Subjunctive":
                    display.setValue ("get subjunctive tense data");
                    filteredData = tenseData.filter (
                        row => row[0].startsWith("Subjunctive ")
                    );

                    let cols = 3;
                    let rows = 6;

                    newData = Array.from ({length: rows}, () => new Array(cols));

                    for (let c=0; c<cols; c++) {
                        for (let r=0; r<rows; r++) {

                            if (c == 1) {

                                // get the string
                                let workStr = filteredData[c][r+1];

                                let workArray = workStr.split(', ');

                                let mWorkArray = workArray.map (
                                    row => CURRENT_TYPE.stem + row
                                );

                                let outStr = mWorkArray.join(', ');
                                

                                newData[r][c] = outStr;
                            }
                            else {
                                newData[r][c] = CURRENT_TYPE.stem + filteredData[c][r+1];
                            }
                        }
                    }

                    newData.forEach(row => row.splice(2, 0, ""));

                    CURRENT_TYPE.data = newData;

                    return (CURRENT_TYPE);

                default:
                    return true;
                    
            }

        }

    }
    catch (error) {
        display.setValue ("Error getting tense data: " + error);
        return false;
    }
}