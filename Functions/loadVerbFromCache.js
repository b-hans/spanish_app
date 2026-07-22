function loadVerbFromCache() {
    const working_verb = JSON.parse(CACHE.get('working_verb'));
    const display = FORM_DISPLAY_RANGE;

    try {

        regularOut({e: null});
        
        return true;
    }
    catch (error) {
        display.setValue("Error loading verb from cache: " + error);
        return false;
    }
}