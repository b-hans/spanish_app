function onOpen() {
  // 1. Get the User Interface object for the active app
  const ui = SpreadsheetApp.getUi(); 
  // Use DocumentApp.getUi(), SlidesApp.getUi(), or FormApp.getUi() for other apps.

  // 2. Build and add the custom menu
  ui.createMenu('🛠️ Custom Tools')
    .addItem('Start', 'reBuildVerbForm')
    .addItem('Clear', 'test')
    .addToUi(); // Renders the menu on the toolbar
}
