(function (global){

  let LINEAPI =  function(BASE_URL,SECRET,TOKEN){//初期化することで最低限の情報を確保
    /*コンストラクタ(初期化メソッド)*/
    this.endpoint = BASE_URL; //ENDPOINT  
    //////////////////////////////////////////////////////////////////////////
    this.send = function(){//送信メソッド
          endpoint += 'message/' ;
          options = {
            "method":"post",
            "headers":{
              "Content-Type": "application/json",
              "Authorization":"Bearer "+ TOKEN
            }};
     //<==LINE ==> SEND ==>
        this.prototype.ReplyMessage = function(ReplyToken,Message){
          //リプライメッセージ用メソッド
          endpoint += 'reply';
          options = this.options;
          options.replyToken = ReplyToken;
          options.messages = [{
            "type":"text",
            "text":Message
          }];
          return UrlFetchApp.fetch(endpoint,options);
        };
        this.prototype.PushMessage = function(UserId,Message){
          //送信メッセージ用メソッド
          endpoint += 'push'; 
          options = this.options;
          options.to = UserId;
          options.messages = [{
            "type":"text",
            "text":Message
          }];
          return UrlFetchApp.fetch(endpoint,options);
        };
        this.prototype.BroadcastMessage = function(Message){
          //全体メッセージ用メソッド
          endpoint += 'broadcast';
          options = this.options;
          options.messages = [{
            "type":"text",
            "text":Message
          }];
          return UrlFetchApp.fetch(endpoint,options);
        };
      /*     LINE.send.prototype.ImageMessage = function(Type,OriginalURL,PreviewURL){
      //画像・動画メソッド
      };
      */
    };//LINE.send Class
    
    //////////////////////////////////////////////////////
    this.get = function(){ //受信メソッド
      options = {
        "method":"post",
        "headers":{
          "Authorization":"Bearer "+ TOKEN
        }};
        
        //LINE========GET
        this.prototype.UserProfile = function(userId)//ユーザーに対する情報取得
        {
          endpoint += "/profile" + userId
          options = this.options;
          return UrlFetchApp.fetch(endpoint,options);
        };
      
    };//LINE.get Class 
  };//LINE Class  
  return global.LINEAPI = LINEAPI;  
})(this);
