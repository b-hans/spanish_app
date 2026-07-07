function resetSheetToDefaultDimensions() {
  // Get the active spreadsheet and current sheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Forms');
  
  // Find the maximum boundaries of the sheet
  var maxRows = sheet.getMaxRows();
  var maxColumns = sheet.getMaxColumns();
  
  // Select the entire area by defining the full range
  var fullRange = sheet.getRange(1, 1, maxRows, maxColumns);
  fullRange.clearContent();

  // 3. Find all merged cell groups within that range
  const mergedRanges = fullRange.getMergedRanges();
  
  // 4. Loop through each merge and unmerge them
  for (let i = 0; i < mergedRanges.length; i++) {
    mergedRanges[i].breakApart();
  }  

  sheet.setActiveRange(fullRange);
  
  // Reset all column widths to the default 100 pixels
  sheet.setColumnWidths(1, maxColumns, 100);
  
  // Reset all row heights to the default 21 pixels
  sheet.setRowHeights(1, maxRows, 21);

  fullRange.setBackground('#ffffff');

  sheet.getRange("A1").activate();
}
