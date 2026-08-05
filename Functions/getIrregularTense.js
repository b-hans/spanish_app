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

        // con struct the data
        let cols = 4;
        let rows = 6;
        let outData = Array.from ({length: rows}, () => new Array(cols));

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

        return outData;
    }
    catch (error) {
        display.setValue ("Error getting irregular tense: " + error);
        return false;
    }
}