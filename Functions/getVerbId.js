function getVerbId(params) {

    const verbData = REGULAR_VERBS.getDataRange().getValues();
    const headings = verbData.shift();

    for (let i=0; i<verbData.length; i++) {
        if (verbData[i][headings.indexOf('Stem')] == params.stem &&
            verbData[i][headings.indexOf('Ending')] == params.ending) {

                return {
                    id:     verbData[i][headings.indexOf('ID')],
                    type:   verbData[i][headings.indexOf('Type')]
                }
            }
    }

    return null;

}