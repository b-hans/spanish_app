class typeObject {
    constructor (params) {

        const stem = params.value.slice(0, -2);
        const ending = params.value.slice(-2);

        const data = REGULAR_VERBS.getDataRange().getValues();
        const headers = data.shift();

        const foundVerb = data.filter(
            row => row[headers.indexOf('Stem')] == stem &&
                   row[headers.indexOf('Ending')] == ending
        );

        let verb_id = null;
        let type = null;
        let participle = null;
        let past_participle = null;

        if (foundVerb.length > 0) {
            verb_id = foundVerb[0][headers.indexOf('ID')];
            type = foundVerb[0][headers.indexOf('Type')];
        }

        switch (ending) {
            case "ar":
                participle = stem + "ando";
                past_participle = stem + "ado";
                break;

            default:
                participle = stem + "iendo";
                past_participle = stem + "ido";
                break;

        }

        this.current_type = {
            status:             "read_verb",
            type:               type,
            tense:              null,
            data:               null,
            stem:               stem,
            ending:             ending,
            infinitive:         params.value,
            a1:                 null,
            value:              null,
            verb_id:            verb_id,
            participle:         participle,
            past_participle:    past_participle,
        }

    }
}