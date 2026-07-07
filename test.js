function test() {

    INITIAL_DISPLAY.setValue("Test31");

    const data = AR_REGULAR.getDataRange().getValues();

    console.log (data);
    
    return true;
}