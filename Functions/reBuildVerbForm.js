function reBuildVerbForm () {

    try {

        resetSheetToDefaultDimensions();

        FORM_RANGE.setBackground(FORM_BACK);

        // title
        FORMSHEET.setRowHeight(FORM_TITLE_RANGE.getRow(), FORM_TITLE_ROWHEIGHT);
        FORM_TITLE_RANGE.merge()
            .setHorizontalAlignment('center')
            .setVerticalAlignment('middle')
            .setBackground('#ffffff')
            .setFontFamily('DynaPuff')
            .setFontSize(18)
            .setFontColor(DISPLAY_FONT_COLOR)
            .setValue ("Spanish Verbs Exercises")
            .setBorder(
                FORM_DISPLAY_BORDERS[0],
                FORM_DISPLAY_BORDERS[1],
                FORM_DISPLAY_BORDERS[2],
                FORM_DISPLAY_BORDERS[3],
                FORM_DISPLAY_BORDERS[4],
                FORM_DISPLAY_BORDERS[5],
                FORM_DISPLAY_BORDERS[6],
                SpreadsheetApp.BorderStyle.SOLID_MEDIUM
            );

        // form titles
        INFINITIVE_TITLE_RANGE.setBackground(TITLES_BACKGROUND)
            .setHorizontalAlignment('right')
            .setVerticalAlignment('top')
            .setValue("Infinitive: ");

        INFINITIVE_INPUT_RANGE.setBackground('#ffffff');

        VERB_TYPE_TITLE_RANGE.setBackground(TITLES_BACKGROUND)
            .setHorizontalAlignment('right')
            .setVerticalAlignment('top')
            .setValue("Type: ");

        VERB_TYPE_INPUT_RANGE.setBackground('#ffffff')
            .setVerticalAlignment('top')
            .setHorizontalAlignment('center');

        SpreadsheetApp.flush();

        VERB_TYPE_INPUT_RANGE.setDataValidation(VERB_TYPE_RULE)
            .setValue("Select one");

        // display
        FORM_DISPLAY_RANGE.merge()
            .setVerticalAlignment("top")
            .setBackground('#ffffff')
            .setBorder(
                FORM_DISPLAY_BORDERS[0],
                FORM_DISPLAY_BORDERS[1],
                FORM_DISPLAY_BORDERS[2],
                FORM_DISPLAY_BORDERS[3],
                FORM_DISPLAY_BORDERS[4],
                FORM_DISPLAY_BORDERS[5],
                FORM_DISPLAY_BORDERS[6],
                FORM_DISPLAY_BORDERS[7],

            )
            .setFontColor(DISPLAY_FONT_COLOR)
            .setWrap(true)
            .setValue ("Messages here");

        // get the current verbs

        CURRENT_VERBS_TITLE_RANGE.setBackground(TITLES_BACKGROUND)
            .setHorizontalAlignment('right')
            .setVerticalAlignment('top')
            .setValue("Current verbs: ");

        CURRENT_VERBS_INPUT_RANGE.merge()
            .setHorizontalAlignment("center")
            .setVerticalAlignment("middle")
            .setBackground(CURRENT_VERB_DROPDOWN_BACK)
            .setBorder(
                true, true, true, true,
                false, false,
                '#000000',
                SpreadsheetApp.BorderStyle.DOUBLE
            );

        // get current data
        let verbData = REGULAR_VERBS.getDataRange().getValues();
        let verbHeaders = verbData.shift();
        let dropData = verbData.map (
            row => row[verbHeaders.indexOf('Stem')] + row[verbHeaders.indexOf('Ending')]
        );

        dropData.sort();
        dropData.unshift("Select one");

        const currentVerbRule = SpreadsheetApp.newDataValidation()
            .requireValueInList(dropData, true)
            .setAllowInvalid(false)
            .build();

        CURRENT_VERBS_INPUT_RANGE.setDataValidation(currentVerbRule)
            .setValue(dropData[0]);

        console.log (dropData);

        CACHE.put("CURRENT_TYPE", "form1", 3600);

        let tester = CACHE.get("CURRENT_TYPE");

        // FORM_DISPLAY_RANGE.setValue(
        //     TEST_SHEET.getRange("C7").getBackground()
        // );

        // FORM_DISPLAY_RANGE.setValue (FORM_DISPLAY_RANGE.getValue() + " : " +
        //     tester);

        FORM_DISPLAY_RANGE.setValue ("Initialized! 55");

        INFINITIVE_INPUT_RANGE.activate();
        
        return true;
    }
    catch (error) {
        return false;
    }
}