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

            let cols;
            let rows;

            // map to tense
            switch (CURRENT_TYPE.tense) {
                case "Subjunctive":
                    display.setValue ("Getting subjunctive tense data");
                    filteredData = tenseData.filter (
                        row => row[0].startsWith("Subjunctive ")
                    );

                    cols = 3;
                    rows = 6;

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

                case "Imperative":
                    display.setValue ("Getting imperative tense data here");
                    filteredData = tenseData.filter (
                        row => row[0].startsWith("Imperative ")
                    );

                    cols = 4;
                    rows = 6;

                    newData = Array.from ({length: rows}, () => new Array(cols));

                    for (let c=0; c<cols; c++) {
                        for (let r=0; r<rows; r++) {

                            if (c == 1 || c == 3 || r == 0) {
                                if (r == 0) {
                                    newData[r][c] = "-";
                                }
                                else {
                                    newData[r][c] = "";
                                }
                            }
                            else if (c == 2) {
                                // newData[r][c] = CURRENT_TYPE.stem + " r: " + (r+1) + " c: " + (c-1);
                                newData[r][c] = "no " + CURRENT_TYPE.stem + filteredData[c-1][r+1];
                            }
                            else {
                                newData[r][c] = CURRENT_TYPE.stem + filteredData[c][r+1];
                                // newData[r][c] = CURRENT_TYPE.stem + " r: " + (r+1) + " c: " + c;
                            }
                        }
                    }

                    CURRENT_TYPE.data = newData;
                    return CURRENT_TYPE;
                    
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