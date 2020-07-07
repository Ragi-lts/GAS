class MeetingMember {
    constructor(MeetingId,UserId,Name,RecieveTime,DATABASEKEY) {//ここに書かれているインスタンスをすべてヘッダとする
        this.MeetingId = MeetingId; //会議コード( ZoomAPI)
        this.Id = UserId;           //ユーザーID
        this.Name = Name;           //ユーザー名
        this.AuthCode = "";         //参加認証用コード(LINEに送信してこれを入力することで自動参加にする)
    /***********************************************************************************************/
        this.ResTime = this.DataStr(RecieveTime); //参加登録時間
          
    //初期化    (定義されたときに自動で実行)
        this.STORAGE = SpreadsheetApp.openById(DATABASEKEY);  
        if (!this.STORAGE) return null;                            //見つからなければ失敗
        this.HEADER = { 'Id'        :   "id",       //連番
                        'UserId'    :   "USERId",   //固有ID
                        'Name'      :   "Name",     //参加者名
                        'Authcode'  :   "AuthCode",    //認証コード
                        'ResTime'   :   "ResTime"       // 参加登録時間 
        }    //シートヘッダ
        this.SHEET = this.STORAGE.getSheetByName(this.MeetingId);   //会議参加情報を集めたシート
        if (!this.SHEET)  //このシートがなかったら
        {
            this.SHEET = this.STORAGE.insertSheet(this.MeetingId);    //新規作成する
            this.SHEET.appendRow(Object.keys(this.HEADER));                        //ヘッダも書き込む．
            let headerBorder = this.SHEET.getRange(`A1:A${this.HEADER.length}`);
                //setBorder(top, left, bottom, right, vertical, horizontal)
                headerBorder.setBorder(null, null, true, null, false, false);   //区切り線を入れておく
        }
        return true;
    }
}

MeetingMember.prototype.Regist = function()
{    //参加の登録を行う関数
    let number = this.SHEET.getLastRow();
    this.AuthCode = this.createAuthCode();
    let data = [number,this.Id,this.Name,this.AuthCode,this.ResTime]; //コンストラクタで書き込む
    if (this.SHEET.appendRow(data)){
        return true;
    }  
    return false;
}
MeetingMember.prototype.DataStr = function(RecieveTime) {
        var y = RecieveTime.getFullYear();
        var m = ("00" + (RecieveTime.getMonth() + 1)).slice(-2);
        var d = ("00" + RecieveTime.getDate()).slice(-2);
        var h = ("00" + RecieveTime.getHours()).slice(-2);
        var min = ("00" + RecieveTime.getMinutes()).slice(-2);
        var sec = ("00" + RecieveTime.getSeconds()).slice(-2);
        return `${y}/${m}/${d} ${h}:${min}:${sec}`;
}

MeetingMember.prototype.getList = function()
{
    let Data = [];  //格納する辞書
    let SOURCE = this.SHEET.getDataRange().getValues();   //全データを一括取得(2次元配列)
        if (!SOURCE) return [];
    let DataAmount = SOURCE.length;
    let DataColumn = SOURCE[0].length; 

    let HEADER = SOURCE[0];     //ヘッダ読みこみ
    for(let i=1; i<DataAmount; i++)       
    { 
        let temp = {};
        for(let j=0; j<DataColumn;  j++){ 
            temp[ HEADER[j] ] = SOURCE[i][j];
        }  
        Data.push(temp);
    }
    return Data;    //辞書型の配列
}

MeetingMember.prototype.SearchMember = function ()  //すでにResistされているか
{
    let MemberList = this.getList();
    for(let i=0; i<MemberList.length; i++)
    {
        if (MemberList[i][this.HEADER.UserId] == this.Id)
        {
            return i;   メンバーの辞書配列の該当要素の番号を返す
        }
    }
    return null;
}

MeetingMember.prototype.Cancel = function ()
{
    let tag = this.SearchMember(this.Id);
    if (tag != null) 
    {
        this.SHEET.deleteRows(tag+1);
        return true;
    }
    return false;
}

MeetingMember.prototype.createAuthCode = function ()
    {
        return Math.random().toString(36).slice(-4);
}//認証コードを作成
