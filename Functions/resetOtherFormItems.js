function resetOtherFormItems () {
    
    let display = FORM_DISPLAY_RANGE;

    try {

        let otherRange = FORMSHEET.getRange("A5:F8")
            .clearDataValidations()
            .clearContent()
            .setBorder(false, false, false, false, false, false)
            .setBackground(FORM_BACK)
            .setHorizontalAlignment('left')
            .setVerticalAlignment('top')
            .setFontFamily("Arial")
            .setFontSize(10)
            .setFontColor ('#000000');

        // 3. Find all merged cell groups within that range
        const mergedRanges = otherRange.getMergedRanges();
        
        // 4. Loop through each merge and unmerge them
        for (let i = 0; i < mergedRanges.length; i++) {
            mergedRanges[i].breakApart();
        }  

        return true;
    }
    catch (error) {
        display.setValue ("Error reseting other form items: " + error);
        return false;
    }
}