//受信したら動作する
//function doPost(e){

function test(){    //LocalTest

  const ACCESS_TOKEN  = PropertiesService.getScriptProperties().getProperty('CHANNNELACCESSTOKEN');
  const SECRET        = PropertiesService.getScriptProperties().getProperty('CHANNNEL_SECRET'); 
  const DATABASE      = PropertiesService.getScriptProperties().getProperty('DATABASEKEY');
  const BASE_URL      = 'https://api.line.me/v2/bot';
  const Zoom_BaseURL  = "https://api.zoom.us/v2";

  //const  line_api = new LINEAPI(BASE_URL,ACCESS_TOKEN);   /*LINEAPI操作用インスタンス作成*/
  //const  zoom_api = new Zoom(Zoom_BaseURL);             /*Zoomの操作用インスタンス作成*/
 
  
  var userId        = JSON.parse(e.postData.contents).events[0].source.userId;
  var replyToken    = JSON.parse(e.postData.contents).events[0].replyToken;
  var message       = JSON.parse(e.postData.contents).events[0].message.text;
  var RecieveData = {
    'userId': userId,
    'ReplyToken':replyToken,
    'Message': message
  };
  

 
}

//送信したら動作する
/*
function doGet(e){

}
*/