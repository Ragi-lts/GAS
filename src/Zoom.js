class Zoom{
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
        let d = startTime.getDate()+1;
        let h = startTime.getHours();
        let min = startTime.getMinutes();
        let sec = startTime.getSeconds();
        return `${y}-${m}-${d}T${h}:${min}:${sec}Z`;
    }
    let PostJson = {
            "topic": Topic,
            "start_time": DateFormat(startTime),
            "timezone": "Asia/Tokyo",
            "password": "",
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
           console.log("会議が作成できました")
            return true;   
        }
        return console.error("会議の作成ができませんでした");
}
