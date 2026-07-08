function validateVerb (params) {

    const display = params.display;
    const verb = params.verb.toLowerCase();

    try {

        let returnObject = {
            valid:      true,
            message:    "All good: " + verb,
        }

        // missing required imput
        if (!verb) {
            returnObject.valid = false;
            returnObject.message = "Infinitive input is required.";

            return returnObject;
        }

        // get stem and end
        const stem = verb.slice(0, -2);
        const ending = verb.slice(-2);

        if (ending != "ar" && ending != "er" && ending != "ir") {
            returnObject.valid = false;
            returnObject.message = "Not a valid spanish verb.";

            return returnObject;
        }

        returnObject.stem = stem;
        returnObject.ending = ending;

        return returnObject;
    }
    catch (error) {

        return { valid: false, message: "Error validating verb: " + error }
    }
}