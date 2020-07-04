
//受信したら動作する
function doPost(e){
  const ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty('CHANNNELACCESSTOKEN');
  const SECRET = PropertiesService.getScriptProperties().getProperty('CHANNNEL_SECRET'); 
  const BASE_URL = 'https://api.line.me/v2/bot/';
 
  //var replyToken = JSON.parse(e.postData.contents).events[0].replyToken;
  //var message = JSON.parse(e.postData.contents).events[0].message.text;
  
  let line_api = new LINEAPI(BASE_URL,ACCESS_TOKEN);
  
  let res = line_api.BroadcastMessage("TestMessage");
  
}

