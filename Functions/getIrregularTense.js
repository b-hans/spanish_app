function getIrregularTense (CURRENT_TYPE) {

    let display = FORM_DISPLAY_RANGE;

    try {

        //get subjunctive ids
        let allData = CONJUGATION_TYPES.getDataRange().getValues();
        let allHeaders = allData.shift();

        let filteredData = allData.filter (
            row => row[allHeaders.indexOf('conjugation type')].startsWith(CURRENT_TYPE.tense)
        );

        let mappedData = filteredData.map (
            row => row[allHeaders.indexOf('conjugation_type_id')]
        ).flat();
    
        let myTenses = CURRENT_TYPE.tenses.filter(
            row => mappedData.includes(row[1])
        );

        if (myTenses.length < 1) {
            return [];
        }


        // here is where we need to make a change based on tense type
        // con struct the data

        let cols;
        let rows;
        let outData;

        cols = 4;
        rows = 6;
        outData = Array.from ({length: rows}, () => new Array(cols));

        switch (CURRENT_TYPE.tense) {
            case "Subjunctive":
                for (let c=0; c<cols; c++) {
                    for (let r=0; r<rows; r++) {
                        if (c == 2) {
                            outData[r][c] = "";
                        }
                        else if (c == 3) {
                            // outData[r][3] = (c-1) + " " + (r+2);
                            outData[r][3] = myTenses[c-1][r+2];
                        }
                        else {
                            outData[r][c] = myTenses[c][r+2]; //c + " " + (r+2);  //myTenses[c][r+2];
                        }
                    }
                }

                break;
    
            case "Imperative":
                for (let c=0; c<cols; c++) {
                    for (let r=0; r<rows; r++) {
                        if (c == 1 || c == 3) {
                            outData[r][c] = "";
                        }
                        else if (c == 2) {
                            // outData[r][c] = " c1: " + (c-1) + " r: " + (r+2);
                            outData[r][c] = myTenses[c-1][r+2];
                        }
                        else {
                            // outData[r][c] = " c0: " + c + " r: " + (r+2);
                            outData[r][c] = myTenses[c][r+2];

                            // outData[r][c] = myTenses[c][r+2]; //c + " " + (r+2);  //myTenses[c][r+2];
                        }
                    }
                }

                break;
        }

        return outData;
    }
    catch (error) {
        display.setValue ("Error getting irregular tense: " + error);
        return false;
    }
}