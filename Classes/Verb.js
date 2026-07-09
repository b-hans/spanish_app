class Verb {
    constructor (params) {

        this.new = false;

        if (params.stem) {
            this.stem = params.stem;
        }

        if (params.ending) {
            this.ending = params.ending;
        }

        if (params.type == "regular") {
            this.type = "regular";
        }
        else if (params.type == "irregular") {
            this.type = "irregular";
        }

        const verbData = REGULAR_VERBS.getDataRange().getValues();
        verbData.shift();

        this.id = null;

        for (let i=0; i<verbData.length; i++) {
            if (verbData[i][REGULAR_VERBS_HEADINGS.indexOf('Stem')] == this.stem &&
                verbData[i][REGULAR_VERBS_HEADINGS.indexOf('Ending')] == this.ending) {
                    this.id = verbData[i][REGULAR_VERBS_HEADINGS.indexOf('ID')];
                    break;
                }
        }

    }
}