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
    return {'url':endpoint,'options':this.options};
  };

    //送信メッセージ用メソッド
    LINEAPI.prototype.PushMessage = function(UserId,Message){
    endpoint = this.endpoint + '/message/push'; 
    this.payload.to = UserId;
    this.payload.messages = [{
      "type": "text",
      "text":  Message
    }];
     this.options.payload = JSON.stringify(this.payload);
    return {'url':endpoint,'options':this.options};
  };

  //全体メッセージ用メソッド
  LINEAPI.prototype.BroadcastMessage = function(Message){
    endpoint  = this.endpoint + '/message/broadcast';
    this.payload.messages = [{
      "type": "text",
      "text": Message
    }];
     this.options.payload = JSON.stringify(this.payload);
    return {'url':endpoint,'options':this.options};
  };

  //動画像送信メソッド
  LINEAPI.prototype.ImageMessage = function(ImageType,OriginalURL,PreviewURL,Duration=0){
    this.payload.messages = [{
      "originalContentUrl": OriginalURL,
    }];
    switch (ImageType){
      case "Image":
      {
        this.payload.type = "image";
        this.payload.messages.previewImageUrl = PreviewURL;
        break;
      }
      case "Video":
      {
        this.payload.type = "video";
        this.payload.messages.previewImageUrl = PreviewURL;
        break;
      }  
      case "Audio":
      {
        this.payload.type = "audio";
        this.payload.duration = Duration;
        break;
      }
      default:
        console.error("Invlalid ImageType.")
    };
     this.options.payload = JSON.stringify(this.payload);
    return {'url':endpoint,'options':this.options};
  }
//////////////////////////////////////////////////////
  //LINE========GET
LINEAPI.prototype.GetUserProfile = function(userId)//ユーザーに対する情報取得
{   if (!userId) return null;
    endpoint += "/profile" + userId
     this.options.payload = JSON.stringify(this.payload);
    return {'endpoint':endpoint,'options':this.options};
};










