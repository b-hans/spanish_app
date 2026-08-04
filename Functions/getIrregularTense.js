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

        return myTenses;
    }
    catch (error) {
        display.setValue ("Error getting irregular tense: " + error);
        return false;
    }
}