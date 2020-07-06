
//受信したら動作する
function doPost(e){
  const ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty('CHANNNELACCESSTOKEN');
  const SECRET = PropertiesService.getScriptProperties().getProperty('CHANNNEL_SECRET'); 
  const DATABASE = PropertiesService.getScriptProperties().getProperty('DATABASEKEY');
  const BASE_URL = 'https://api.line.me/v2/bot/';
  const Zoom_BaseURL = "https://api.zoom.us/v2/";
  //var replyToken = JSON.parse(e.postData.contents).events[0].replyToken;
  //var message = JSON.parse(e.postData.contents).events[0].message.text;
  
 // const line_api = new LINEAPI(BASE_URL,ACCESS_TOKEN);

  let  Zoom_api = new Zoom(Zoom_BaseURL);
  Zoom_api.CreateMeeting("any", new Date());
}

