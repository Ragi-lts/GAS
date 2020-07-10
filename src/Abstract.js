class Meeting {
    constructor() {
        this.HEADER = {
            'Id': "id",       //連番
            'UserId': "USERId",   //固有ID
            'Name': "Name",     //参加者名
            'Authcode': "AuthCode",    //認証コード
            'ResTime': "ResTime"       // 参加登録時間 
        }    //シートヘッダ
    }
}


function postBackAnalyze(source) {
    let types = source.events[0].postback.data.split("="); /*属性と値が分けられる。*/
    let dict =
    {
        'kindof': types[0].replace("?", ""),
        'value': types[1]
    };
    return dict;
}