  var LINEAPI = class{
    constructor(BASE_URL,SECRET,TOKEN){//初期化することで最低限の情報を確保
    /*コンストラクタ(初期化メソッド)*/
    this.endpoint = BASE_URL; //ENDPOINT
    this.options = {
      "method":"post",
      "headers":{
        "Content-Type": "application/json",
        "Authorization":"Bearer "+ TOKEN
      }};
      this.data = {};   //ここに送信データを格納する(JSON)
    }
  }
    LINEAPI.prototype.ReplyMessage = function(ReplyToken,Message){
      //リプライメッセージ用メソッド
      endpoint = this.endpoint + 'reply';
      options = this.options;
      options.replyToken = ReplyToken;
      options.messages = [{
        "type":"text",
        "text":Message
      }];
      return UrlFetchApp.fetch(endpoint,options);
    };
    LINEAPI.prototype.PushMessage = function(UserId,Message){
      //送信メッセージ用メソッド
      endpoint = this.endpoint + 'push'; 
      options = this.options;
      options.to = UserId;
      options.messages = [{
        "type":"text",
        "text":Message
      }];
      return UrlFetchApp.fetch(endpoint,options);
    };
    LINEAPI.prototype.BroadcastMessage = function(Message){
      //全体メッセージ用メソッド
      endpoint = this.endpoint + 'broadcast';
      this.data.messages = [{
        "type":"text",
        "text":Message
      }];
      this.options.payload = JSON.stringify(this.data.messages);
      return UrlFetchApp.fetch(endpoint,options);
    };
  /*     LINE.send.prototype.ImageMessage = function(Type,OriginalURL,PreviewURL){
  //画像・動画メソッド
  };
  */

//////////////////////////////////////////////////////
    //LINE========GET
    LINEAPI.prototype.GetUserProfile = function(userId)//ユーザーに対する情報取得
    {
      endpoint += "/profile" + userId
      options = this.options;
      return UrlFetchApp.fetch(endpoint,options);
    };