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

        this.current_type = {
            status:             "read_verb",
            type:               type,
            tense:              null,
            data:               null,
            stem:               stem,
            ending:             ending,
            infinitive:         params.value,
            a1:                 params.a1,
            value:              params.value,
            verb_id:            verb_id,
            participle:         null,
            past_participle:    null,
            tenses:             [],
        }

        if (type == "regular"){
            switch (ending) {
                case "ar":
                    this.current_type.participle = stem + "ando";
                    this.current_type.past_participle = stem + "ado";
                    break;

                default:
                    this.current_type.participle = stem + "iendo";
                    this.current_type.past_participle = stem + "ido";
                    break;

            }
        }
        else {
            let participles = IRREGULAR_PARTICIPLES.getDataRange().getValues();
            let myParticiples = participles.filter (row => row[0] == verb_id)[0];

            this.current_type.participle = myParticiples[1];
            this.current_type.past_participle = myParticiples[2];

            let tenses = IRREGULAR_TENSES.getDataRange().getValues();
            this.current_type.tenses = tenses.filter(row => row[0] == verb_id);

        }

    }
}