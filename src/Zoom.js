class Zoom {
 constructor(BasePoint)    
 {  this.BasePoint = BasePoint;
    this.UserId  = PropertiesService.getScriptProperties().getProperty("Zoom_UserId");
    this.apikey = PropertiesService.getScriptProperties().getProperty("Zoom_APIKEY");
    this.secret = PropertiesService.getScriptProperties().getProperty("Zoom_APISECRET");
    this.Token = function(){                                //JWT Token の自動生成
        let header = {
            "alg":"HS256",
            "typ":"JWT"
        };
        let payload = {
            "iss":  this.apikey,
            "exp":  Date.now() + 3600
        };
        header = Utilities.base64Encode(JSON.stringify(header));
        payload = Utilities.base64Encode(JSON.stringify(payload));
        const encodeText = header + "." + payload;
        const signature =  Utilities.computeHmacSha256Signature(encodeText,this.secret);
        const JWT_Token = `${encodeText}.${Utilities.base64Encode(signature)}`;
        return JWT_Token;
    };
    

    this.header = {
        'content-type': 'application/json',
        'Authorization' : 'Bearer '+ this.Token()
    };
    this.options  =  {
        'method'    :   'GET',
        'headers'   :   this.header
    };

    /*****************************************************************:*/
    if (this.UserId == null){
            let url = `${this.BasePoint}/users?status=active`; 
            var Res = UrlFetchApp.fetch(url,this.options);
            var code = Res.getResponseCode();
            if (code != 200) return null;
            var ResData = JSON.parse(Res.getContentText('utf-8'));
            this.UserId = ResData.users[0].id;
        }
    }
}

Zoom.prototype.CreateMeeting = function(Topic,startTime)
{   
    let url = `${this.BasePoint}/users/${this.UserId}/meetings`;
    if(isType(startTime) != "Date")   
    {
        return console.error('データ型が正しくありません');
    }
   let DateFormat = function (startTime)
    {
        let y = startTime.getFullYear();
        let m = startTime.getMonth()+1;
        let d = startTime.getDate();
        let h = startTime.getHours()-9;
        let min = startTime.getMinutes();
        let sec = startTime.getSeconds();
        return `${y}-${m}-${d}T${h}:${min}:${sec}Z`;
    }
    let PostJson = {
            "topic": Topic,
            "start_time": DateFormat(startTime),
            "password": "",
            "timezone":"Asia/Tokyo",
            "settings": {
              "host_video": "true",
              "participant_video": "true",
              "waiting_room":"true"
            }};
    this.options.method = "POST";
    this.options.payload = JSON.stringify(PostJson);
    var Res = UrlFetchApp.fetch(url,this.options);
    var code = Res.getResponseCode();
    if (code== 201) 
        {
          let data = JSON.parse(Res.getContentText());
          console.log(data);
          var recieve ={
           'topic':data.topic,
           'MeetingId':data.id,
            'duration':data.duration,
            'startat':startTime,
            'joinurl':data.join_url,
            'password':data.password
            };
            if (this.PostDB(recieve,DATABASEKEY)) return recieve;
            else return console.error("Error");   
        }
        return console.error("会議の作成ができませんでした");
}


Zoom.prototype.PostDB = function (RecieveData)
{
    let STORAGE = SpreadsheetApp.openById(DATABASEKEY);  
    if (!STORAGE) return null;                            //見つからなければ失敗
    let CenterHEADER = ['Id', 'MeetingId', 'joinUrl','pass'];
    let SHEET = STORAGE.getSheetByName('Center');   //会議参加情報を集めたシート
    if (!SHEET)  //このシートがなかったら
    {
       SHEET = STORAGE.insertSheet('Center');    //新規作成する
        SHEET.appendRow(Object.keys(RecieveData));                        //ヘッダも書き込む．
    }
        SHEET.appendRow(Object.values(RecieveData));
    
    let HEADER = { 'Id'        :   "id",       //連番
                    'UserId'    :   "USERId",   //固有ID
                    'Name'      :   "Name",     //参加者名
                    'Authcode'  :   "AuthCode",    //認証コード
                    'ResTime'   :   "ResTime"       // 参加登録時間 
    }    //シートヘッダ
        
        SHEET = STORAGE.insertSheet(`${RecieveData.MeetingId}`);    //新規作成する
        SHEET.appendRow(Object.keys(HEADER));                        //ヘッダも書き込む．
       
        return true;
}



Zoom.prototype.checkMeeting = function ()
{
    let url = `${this.BasePoint}/users/${this.UserId}/meetings`;
    let Res = UrlFetchApp.fetch(url,this.options);
    let list = JSON.parse(Res.getContentText()).meetings;
    
    let Data = [];
    for(let i=0; i<list.length; i++)
    {   
         let a = Date.parse(list[i].start_time);
        if(new Date(a) > Date.now())
        {
        let detail  = {
            'meetingId':    list[i].id,
            'topic':        list[i].topic,
            'start_time':   list[i].start_time
            }
            Data.push(detail);        
        }
    }
    console.log("end");
    return Data;
}