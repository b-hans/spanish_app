function regularVerbOut(params) {
    const display = params.display;
    const verbStem = params.verb.stem;
    const verbEnding = params.verb.ending;

    try {

        display.setValue ("Regular out: " + verbStem + verbEnding);
        return true;
    }
    catch (error) {
        display.setValue ("Error getting regular verb: " + error);
        return false;
    }
}