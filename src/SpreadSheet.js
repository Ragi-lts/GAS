function TestspreadSheet (DATABASEKEY,LINEAPI){
    if (!SpreadsheetApp.openById(DATABASEKEY)) 
    {
        DATABASEKEY =  SpreadsheetApp.create("DATABASE").getId();
    }
  


}