class LINEAPI{
    constructor(BASE_URL,TOKEN){//初期化することで最低限の情報を確保
    /*コンストラクタ(初期化メソッド)*/
    this.endpoint = BASE_URL; //  INITIAL_ENDPOINT
    this.headers = {
      "Content-Type": "application/json",
      "Authorization":'Bearer '+ TOKEN
    };
    this.payload = {};   //ここに送信データを格納する(JSON)
    this.options = {
      "method":   "POST",
      "headers":  this.headers
    };
  }
}//LINEAPI_BASECLASS;
 
//リプライメッセージ用メソッド   
  LINEAPI.prototype.ReplyMessage = function(ReplyToken,Message){
    endpoint  = this.endpoint + '/message/reply';
    options   = this.options; 
    this.payload.replyToken = ReplyToken;
    this.payload.messages = [{
      "type": "text",
      "text": Message
    }];
    this.options.payload = JSON.stringify(this.payload);
    return UrlFetchApp.fetch(endpoint,this.options);
  };

    //送信メッセージ用メソッド
    LINEAPI.prototype.PushMessage = function(UserId,Message){
    endpoint = this.endpoint + '/message/push'; 
    options = this.options;
    this.payload.to = UserId;
    options.messages = [{
      "type": "text",
      "text":  Message
    }];
    return UrlFetchApp.fetch(endpoint,this.options);
  };

  //全体メッセージ用メソッド
  LINEAPI.prototype.BroadcastMessage = function(Message){
    endpoint  = this.endpoint + '/message/broadcast';
    options   = this.options; 
    this.payload.messages = [{
      "type": "text",
      "text": Message
    }];
    this.options.payload = JSON.stringify(this.payload);
    return UrlFetchApp.fetch(endpoint,this.options);
  };

  //動画像送信メソッド
  LINEAPI.prototype.ImageMessage = function(SendType,ImageType,OriginalURL,PreviewURL,Duration=0){
    this.payload.messages = [{
      "originalContentUrl": OriginalURL,
    }];
    if (ImageType == "Image")
    {
      this.payload.type = "image";
      this.payload.messages.previewImageUrl = PreviewURL;
    }
    if (ImageType == "Video")
    {
      this.payload.type = "video";
      this.payload.messages.previewImageUrl = PreviewURL;
    }  
    if (ImageType == "Audio")
    {
      this.payload.type = "audio";
      this.payload.duration = Duration;
    }
  };


//////////////////////////////////////////////////////
  //LINE========GET
  /*LINEAPI.prototype.GetUserProfile = function(userId)//ユーザーに対する情報取得
  {
    endpoint += "/profile" + userId
    options = this.options;
    return UrlFetchApp.fetch(endpoint,options);
  };
  */