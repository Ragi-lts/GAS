class Zoom{
 constructor(BasePoint)    
 {  this.BasePoint = BasePoint;
    this.TOKEN = PropertiesService.getScriptProperties().getProperty("JWT_Token");
    this.UserId  = PropertiesService.getScriptProperties().getProperty("Zoom_UserId");
    this.apikey = PropertiesService.getScriptProperties().getProperty("Zoom_APIKEY");
    this.secret = PropertiesService.getScriptProperties().getProperty("Zoom_APISECRET");
    this.header = {
        "Authorization":'Bearer '+ this.TOKEN
    };
    this.options  =  {
        'method'    :   'POST',
        'headers'   :   this.header
    };
 /******************************** */
        if (this.UserId == null)    //HOSTIdが設定されていなければ自動で設定しておく
        {   let url = this.BasePoint + "users";
           
            let Res = UrlFetchApp.fetch(url,this.options);
                if (Res.getResponceCode != 200) return null;
            let ResData = JSON.parse(Res.getContentText());
            this.UserId = ResData.users.id;
            if (this.UserId)
            {
                PropertiesService.getScriptProperties().setProperty("Zoom_UserId",this.UserId);
            }
        }
    }
}

Zoom.prototype.CreateMeeting = function(Topic,startTime,duration="")
{   
    let url = this.BasePoint + "/"+ this.UserId + "/" +"meetings";
    if ((typeof startTime) != Date) return console.error('データ型が正しくありません');
    let DateFormat = function (dateObj)
    {
        let y = dateObj.getFullYear();
        let m = dateObj.getMonth();
        let d = dateObj.getDate();
        let h = dateObj.getHours();
        let min = dateObj.getMinutes();
        let sec = dateObj.getSeconds();
        return `${y}-${m}-${d}T${h}:${min}:${sec}Z`;
    }
    let PostJson = {
            "topic": Topic,
            "start_time": DateFormat(startTime),
            "duration": duration,
            "timezone": "Asia/Tokyo",
            "password": "",
            "settings": {
              "host_video": "true",
              "participant_video": "true",
              "waiting_room":"true"
            }
          };
    this.options["Content-Type"] = "application/json";
    this.options.payload = JSON.stringify(PostJson);
    let Res = UrlFetchApp.fetch(url,this.options);
          if (Res.getResponceCode == 201) return true;
    return console.error("会議の作成ができませんでした");
}