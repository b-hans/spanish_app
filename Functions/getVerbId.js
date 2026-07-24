function getVerbId(params) {

    const verbData = REGULAR_VERBS.getDataRange().getValues();
    verbData.shift();

    for (let i=0; i<verbData.length; i++) {
        if (verbData[i][REGULAR_VERBS_HEADINGS.indexOf('Stem')] == params.stem &&
            verbData[i][REGULAR_VERBS_HEADINGS.indexOf('Ending')] == params.ending) {
                return verbData[i][REGULAR_VERBS_HEADINGS.indexOf('ID')];
            }
    }

    return null;

}