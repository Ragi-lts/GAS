function LoadDataBase (LINEAPI,DATABASEKEY=null){
    var key = DATABASEKEY;
    if (!SpreadsheetApp.openById(DATABASEKEY)) 
    {
        key =  SpreadsheetApp.create("DATABASE").getId();
    }
    return key;
}

